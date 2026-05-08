# 🌍 Wandr — AI Travel Planning & Experience Engine

> *Your intelligent travel companion. Plan smarter, explore deeper, wander further.*

Wandr is a premium, AI-powered travel planning ecosystem that transforms the way people discover destinations, craft itineraries, and experience the world. Built with a multi-agent AI concierge at its core, Wandr delivers deeply personalized travel plans — from budget backpackers to luxury jet-setters.

---

## ✨ Features

- **AI Trip Planner** — A multi-step wizard that generates context-aware itineraries tailored to your travel style, budget, and pace
- **Multi-Agent AI Concierge** — Specialized AI agents (Local Expert, Budget Analyst, Safety Monitor, Cultural Guide) collaborate to craft the perfect plan
- **Live Dashboard** — Real-time itinerary management with dynamic alerts, weather overlays, and budget tracking
- **Smart Budget Tracker** — Visual breakdowns of spend across flights, hotels, food, and experiences
- **Persona Matching** — Profiles for Solo Adventurers, Couples, Families, Digital Nomads, and Luxury Travelers
- **Glassmorphism UI** — Premium, dark-mode-first interface with fluid micro-animations powered by Framer Motion

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Runtime | Node.js 20 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🐳 Docker

Build and run locally with Docker:

```bash
docker build -t wandr .
docker run -p 8080:8080 wandr
```

---

## ☁️ Deployment

Wandr is deployed on **Google Cloud Run** and publicly accessible at:

🔗 **https://wandr-307184166110.us-central1.run.app**

| Property | Value |
|----------|-------|
| Project | `luminous-night-478402-r7` |
| Service | `wandr` |
| Region | `us-central1` |
| Platform | Google Cloud Run (managed) |

To redeploy:

```bash
gcloud run deploy wandr \
  --source . \
  --project luminous-night-478402-r7 \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── layout.tsx        # Root layout
│   ├── dashboard/        # Live travel dashboard
│   └── planner/          # AI trip planner wizard
└── components/
    ├── Navbar.tsx
    ├── Footer.tsx
    └── sections/         # Landing page sections
        ├── HeroSection.tsx
        ├── FeaturesSection.tsx
        ├── AgentsSection.tsx
        ├── HowItWorksSection.tsx
        ├── PersonasSection.tsx
        ├── PricingSection.tsx
        ├── SocialProofSection.tsx
        └── CTASection.tsx
```

---

## 📄 License

MIT © 2026 Wandr
