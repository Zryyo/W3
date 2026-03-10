# W3 - Financial Wallet Dashboard

A Vite + React financial dashboard prototype with individual, family, and advisor flows, sector drill-downs, and AI-assisted recommendations.

## Highlights
- Unified main login with individual and advisor tabs
- Individual dashboard with sector drill-down pages
- Advisor authentication flow with 2FA demo paths
- Advisor dashboard with client portfolio previews
- AI Recommendation Hub and sector-level AI insights
- AI Financial Advisor workspace with selective data sharing

## Tech Stack
- Vite 6 + React 18 (TypeScript)
- React Router 7
- Tailwind CSS 4
- Radix UI, MUI, Lucide
- Recharts
- OpenAI SDK (client-side demo)

## Getting Started

### Prerequisites
- Node.js 18+ and a package manager (npm, pnpm, or yarn)

### Install
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Environment Variables
The AI recommendations feature uses an API key. Create a `.env` file at the project root:

```bash
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

Notes:
- The current implementation is client-side for demo purposes only.
- Do not commit `.env` files to version control.

## App Routes
- `/` Main login (individual + advisor)
- `/dashboard` Individual dashboard
- `/dashboard/recommendations` Recommendation hub
- `/dashboard/ai-advisor` AI workspace
- `/sector/*` Sector drill-down pages
- `/advisor/*` Advisor authentication and advisor dashboard
- `/login` Legacy individual login (kept for reference)

## Demo Credentials
Main login:
- Individual: `user@financialwallet.com` / `user123`
- Advisor: `advisor@financialwallet.com` / `advisor123`

Legacy login page:
- `demo@financialwallet.com` / `demo123`

Advisor 2FA demo codes:
- Success: `123456`
- Denied: `000000`

## Docs
- `MAIN_LOGIN_GUIDE.md` Main login flow and states
- `USER_LOGIN_GUIDE.md` Legacy user login details
- `DASHBOARD_GUIDE.md` Dashboard and advisor flows
- `SECTOR_PAGES.md` Sector drill-down pages
- `AI_WORKSPACE_GUIDE.md` AI advisor workspace
- `AI_RECOMMENDATIONS_SETUP.md` AI recommendations setup

## Project Structure (High Level)
```
W3/
  src/
    app/
      layouts/
      pages/
      components/
      services/
    styles/
    main.tsx
  index.html
  package.json
```