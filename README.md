# Damietta IP Portal

Intellectual Property (IP) registration portal for Damietta University — a full-featured system with dashboards for students, reviewers, and admins, plus an AI assistant powered by Groq.

## Live Demo

[https://damietta-blockchain.vercel.app](https://damietta-blockchain.vercel.app)

## Tech Stack

- **React 19** + **TypeScript** + **Vite 8**
- **React Router v7**
- **Tailwind CSS** + **lucide-react** for icons
- **Groq SDK** (Llama 3.3 70B) for the AI assistant
- **Vercel** for deployment

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

   Get a key from [console.groq.com](https://console.groq.com).

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:5173 in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production (`tsc -b && vite build`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the code with Oxlint |

## Deployment

```bash
npx vercel --prod
```

## Project Structure

```
src/
├── components/       # Navbar, Footer, Layout, AIAssistant, UI components
│   └── ui/           # Shared UI components
├── lib/              # groq.ts (AI integration), utils.ts
└── pages/            # Pages and dashboards (Student, Reviewer, Admin...)
```
