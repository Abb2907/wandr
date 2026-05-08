# 🌍 Wandr — AI Travel Planning & Experience Engine

> *Your intelligent travel companion. Plan smarter, explore deeper, wander further.*

Wandr is a premium, AI-powered travel planning ecosystem that transforms the way people discover destinations, craft itineraries, and experience the world. Built with a multi-agent AI concierge and a semantic knowledge graph at its core, Wandr delivers deeply personalized travel plans — from budget backpackers to luxury jet-setters.

---

## ✨ Features

- **AI Trip Planner** — A multi-step wizard that generates context-aware itineraries tailored to your travel style, budget, and pace.
- **Multi-Agent AI Concierge** — Specialized AI agents powered by **Google Gemini 1.5 Flash** (Local Expert, Budget Analyst, Safety Monitor, Cultural Guide) collaborate to craft the perfect plan.
- **Experience Knowledge Graph** — A semantic data layer that maps destinations, activities, and hidden gems for high-relevance recommendations.
- **Dynamic AI Chat** — Context-aware real-time chat API for itinerary adjustments, dining recommendations, and live assistance.
- **Supabase Integration** — Robust data persistence for user profiles, saved itineraries, and experience metadata.
- **Live Dashboard** — Real-time itinerary management with dynamic alerts, weather overlays, and budget tracking.
- **Glassmorphism UI** — Premium, dark-mode-first interface with fluid micro-animations powered by Framer Motion and Tailwind CSS v4.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL + Auth) |
| AI Engine | Google Generative AI (Gemini 1.5 Flash) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| UI Primitives | Radix UI |
| Testing | Jest + React Testing Library |
| Icons | Lucide React |
| Runtime | Node.js 20 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm
- Google Gemini API Key
- Supabase Project (URL + Anon Key)

### Local Development

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with the following:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
# Run the test suite
npm test
```

---

## 🐳 Docker

Build and run locally with Docker (standalone output optimized):

```bash
docker build -t wandr .
docker run -p 8080:8080 wandr
```

---

## ☁️ Deployment

Wandr is deployed on **Google Cloud Run** for high scalability.

| Property | Value |
|----------|-------|
| Project | `luminous-night-478402-r7` |
| Service | `wandr` |
| Region | `us-central1` |
| Platform | Google Cloud Run (managed) |

### Deployment Command

```bash
gcloud run deploy wandr \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --project=luminous-night-478402-r7
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/         # AI Chat API endpoint
│   ├── dashboard/        # Live travel dashboard
│   ├── planner/          # AI trip planner wizard
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # UI Components
│   ├── sections/         # Landing page sections
│   └── ai/               # AI Concierge components
├── data/
│   └── knowledgeGraph.ts # Semantic experience data
├── lib/
│   └── supabase.ts       # Supabase client config
└── __tests__/            # Comprehensive test suite
```

---

## 📄 License

MIT © 2026 Wandr
