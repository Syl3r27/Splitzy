import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { inngest } from "./client";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

/* Set up Gemini client and model */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const spendingInsights = inngest.createFunction(
  { name: "Spending Insight Generator", id: "spending-insights-job" },
  { cron: "0 8 1 * *" }, // runs at 08:00 on the 1st of each month
  async ({ step }) => {
    /* ─── 1. Find users who had spending activity ───────────────────── */
    const users = await step.run("Load users with recent expenses", async () => {
      return await convex.query(api.inngest.getUsersWithExpenses);
    });

    /* ─── 2. Loop through users & create insight emails ─────────────── */
    const results = [];

    for (const user of users) {
      /* a. Get this user's expenses for the previous month */
      const expenses = await step.run(`Fetch expenses for ${user._id}`, () =>
        convex.query(api.inngest.getUserMonthlyExpenses, { userId: user._id })
      );
      if (!expenses?.length) continue;

      /* b. Prepare a compact JSON snapshot for the AI */
      const expenseData = JSON.stringify({
        expenses,
        totalSpent: expenses.reduce((sum, e) => sum + e.amount, 0),
        categories: expenses.reduce((cats, e) => {
          cats[e.category ?? "uncategorised"] =
            (cats[e.category] ?? 0) + e.amount;
          return cats;
        }, {}),
      });

      /* c. Build the AI prompt and call Gemini via step.ai.wrap */
      const prompt = `
You are a friendly spending coach. Look at this person's spending data for the past month and write a clear, helpful summary they can read in an email.

Keep the tone supportive and practical. Focus on:
- how much they spent overall,
- which categories took most of their money,
- any patterns or spikes that look interesting,
- a few specific ideas they could try next month.

Your reply must be HTML (no <html> or <body> tags, just the inner content).

Here is the JSON data:
${expenseData}

Organize your response using these sections:
1. Monthly Snapshot
2. Biggest Spending Areas
3. Notable Patterns or One-Offs
4. Ways to Save or Optimize
5. Suggestions for the Coming Month
      `.trim();

      try {
        const aiResponse = await step.ai.wrap(
          "gemini",
          async (p) => model.generateContent(p),
          prompt
        );

        const htmlBody =
          aiResponse.response.candidates[0]?.content.parts[0]?.text ?? "";

        /* d. Send the generated insight email to the user */
        await step.run(`Send email to ${user._id}`, () =>
          convex.action(api.email.sendEmail, {
            to: user.email,
            subject: "Your Monthly Spending Breakdown",
            html: `
              <h1>Hi ${user.name}, here's your spending recap 🔍</h1>
              <p>We’ve pulled together a quick summary of how you used your money over the last month.</p>
              ${htmlBody}
              <p style="margin-top: 16px;">
                Thanks for using Splitzy to keep an eye on your spending. Small improvements each month can make a big difference over time.
              </p>
            `,
            apiKey: process.env.RESEND_API_KEY,
          })
        );

        results.push({ userId: user._id, success: true });
      } catch (err) {
        results.push({
          userId: user._id,
          success: false,
          error: err.message,
        });
      }
    }

    /* ─── 3. Return a compact summary for logs / monitoring ─────────── */
    return {
      processed: results.length,
      success: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
    };
  }
);
