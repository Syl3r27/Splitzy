<p align="center">
  <img src="/public/logos/logo.png" alt="Splitzy Logo" width="120" />
</p>

<h1 align="center">Splitzy 💸</h1>

<p align="center">Real-time expense tracking with AI-powered insights — fast, beautiful, modern.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/Convex-4B44E3?style=for-the-badge&logo=cloudflarepages&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn--ui-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Inngest-FF7E00?style=for-the-badge&logo=zap" />
  <img src="https://img.shields.io/badge/Clerk-333?style=for-the-badge&logo=clerk" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

## 🚀 Overview

**Splitzy** is a modern, full-stack expense management platform designed for groups, friends, roommates, and trips.  
Track shared expenses, split costs fairly, and understand settlements with AI-powered explanations.

Featuring **real-time sync**, **clean UI**, **background workflows**, and **instant clarity** for who owes what.

---

## ✨ Features

### 🔥 Core Functionality
- Add shared expenses with equal or custom splits  
- Automatic balance calculation  
- Real-time updates using Convex  
- Clean dashboards for groups, totals, and settlements  

### 🤖 AI-Powered Insights
- GPT-powered breakdowns of balances  
- Human-friendly settlement suggestions  
- Monthly or per-trip expense summaries  
- Automatic categorization (configurable)

### 🎨 Beautiful UI/UX
- Built using **shadcn/ui** + Tailwind  
- Smooth animations  
- Dark mode ready  
- Mobile-first responsive design  

### 🔐 Secure Authentication
- User accounts managed by Clerk  
- Protected dashboards and groups  

### 🧵 Background Workflows with Inngest
- AI summaries run asynchronously  
- Ready for reminders / digest reports  
- More workflow automation possible  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (App Router), JavaScript, Tailwind CSS, Shadcn/ui |
| **Backend** | Convex → database + server functions |
| **Auth** | Clerk |
| **AI** | OpenAI / any LLM provider |
| **Workflows** | Inngest |
| **Styling** | Tailwind CSS + custom design system |

---

## 📸 Screenshots (Add later)



<div align="center">
  <img src="/public/logos/image.png" width="80%"/>
  <br/>
  <em>Dashboard — balances & groups</em>
  <br/><br/>
</div>

---

## 🛠️ Getting Started

### 1️⃣ Clone the project

```bash
git clone https://github.com/Syl3r27/Splitzy.git
cd splitzy
2️⃣ Install dependencies
bash
Copy code
pnpm install
3️⃣ Configure environment variables
Create a .env.local:

env
Copy code
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Convex
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOY_KEY=
CONVEX_ADMIN_KEY=

# Inngest
INNGEST_EVENT_KEY=

# AI Provider
OPENAI_API_KEY=
4️⃣ Start Convex
bash
Copy code
npx convex dev
5️⃣ Run the development server
bash
Copy code
pnpm dev
Now open → http://localhost:3000


🗺️ Roadmap
 Add expense export / shareable links

 Add notifications & reminders via Inngest

 More AI analytics (categories, anomalies)

 Multi-currency support

 PWA for offline mobile use

 Group chat for notes & context

🤝 Contributing
Pull requests and issues are welcome!
Feel free to discuss ideas or propose new features.

📝 License
Licensed under the MIT License.

⭐ Support
If you like Splitzy, please ⭐ star the repo — it helps a lot!