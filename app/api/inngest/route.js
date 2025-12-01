import { serve } from "inngest/next";
import { inngest } from "@/lib/inggest/client";
import { paymentReminders } from "@/lib/inggest/payment-reminders";
import { spendingInsights } from "@/lib/inggest/spending-insights";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    paymentReminders,
    spendingInsights,
  ],
});