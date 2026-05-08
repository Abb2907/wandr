"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, DollarSign, Cloud, Compass, ShoppingBag,
  Bell, HeadphonesIcon, Shield, ArrowRight, Zap
} from "lucide-react";

const agents = [
  {
    id: "planner",
    name: "Trip Planner Agent",
    icon: Brain,
    color: "aurora",
    role: "Orchestrator",
    description:
      "The master coordinator. Decomposes user intent into structured goals, orchestrates other agents, and assembles the final itinerary from their outputs.",
    responsibilities: [
      "Intent decomposition from natural language",
      "Goal prioritization and constraint mapping",
      "Agent coordination and task delegation",
      "Final itinerary assembly and validation",
    ],
    communicates: ["Budget", "Weather", "Local", "Booking"],
    memory: "Long-term traveler profile + trip context",
  },
  {
    id: "budget",
    name: "Budget Optimizer",
    icon: DollarSign,
    color: "ember",
    role: "Financial AI",
    description:
      "Monitors spend vs. plan in real-time, predicts price fluctuations, suggests cost-effective alternatives, and generates expense reports.",
    responsibilities: [
      "Real-time spend tracking and alerts",
      "Dynamic price prediction modeling",
      "Cost-alternative ranking",
      "Currency conversion and hedging advice",
    ],
    communicates: ["Planner", "Booking", "Alert"],
    memory: "Budget constraints, historical spend patterns",
  },
  {
    id: "weather",
    name: "Weather Intelligence",
    icon: Cloud,
    color: "sapphire",
    role: "Climate AI",
    description:
      "Ingests 72-hour forecasts, historical climate data, and seasonal trends to pro-actively reschedule outdoor activities.",
    responsibilities: [
      "Hyper-local weather forecasting",
      "Activity-weather compatibility scoring",
      "Proactive rescheduling recommendations",
      "Seasonal trend analysis",
    ],
    communicates: ["Planner", "Alert", "Local"],
    memory: "User weather sensitivity preferences",
  },
  {
    id: "local",
    name: "Local Discovery Agent",
    icon: Compass,
    color: "aurora",
    role: "Discovery AI",
    description:
      "Surfaces hidden gems, local events, and crowd-sourced tips using collaborative filtering, geo-context, and sentiment analysis.",
    responsibilities: [
      "Hyper-local experience curation",
      "Crowd density and timing optimization",
      "Hidden gem discovery via social signals",
      "Event and festival awareness",
    ],
    communicates: ["Planner", "Booking", "Support"],
    memory: "Interest graph, past visit history",
  },
  {
    id: "booking",
    name: "Booking Assistant",
    icon: ShoppingBag,
    color: "ember",
    role: "Commerce AI",
    description:
      "Handles end-to-end booking across flights, hotels, and experiences — comparing prices across 500+ providers and managing cancellations.",
    responsibilities: [
      "Cross-provider price comparison",
      "Loyalty point optimization",
      "Cancellation and rebooking management",
      "Confirmation and document aggregation",
    ],
    communicates: ["Planner", "Budget", "Alert"],
    memory: "Loyalty memberships, payment preferences",
  },
  {
    id: "alert",
    name: "Real-Time Alert Agent",
    icon: Bell,
    color: "sapphire",
    role: "Monitoring AI",
    description:
      "Watches for disruptions — flight delays, venue closures, safety alerts, crowd surges — and triggers automated re-planning flows.",
    responsibilities: [
      "Flight and transport monitoring",
      "Venue status and crowd tracking",
      "Safety and travel advisory ingestion",
      "Disruption escalation to Planner",
    ],
    communicates: ["All agents"],
    memory: "Active trip context, disruption thresholds",
  },
  {
    id: "support",
    name: "Travel Support Agent",
    icon: HeadphonesIcon,
    color: "aurora",
    role: "Concierge AI",
    description:
      "24/7 NLP-powered conversational assistant providing local tips, translation, restaurant reservations, and general travel guidance.",
    responsibilities: [
      "Natural language Q&A for travel needs",
      "Real-time translation and language assist",
      "Restaurant and experience reservations",
      "Offline itinerary and content caching",
    ],
    communicates: ["Planner", "Local", "Booking"],
    memory: "Conversation history, user preferences",
  },
  {
    id: "safety",
    name: "Safety Monitor Agent",
    icon: Shield,
    color: "ember",
    role: "Safety AI",
    description:
      "Continuously monitors geopolitical events, crime indices, health advisories, and emergency services — proactively notifying and rerouting.",
    responsibilities: [
      "Government travel advisory monitoring",
      "Crime and safety index tracking",
      "Medical facility awareness",
      "Emergency SOS routing and escalation",
    ],
    communicates: ["Alert", "Support", "Planner"],
    memory: "User location, health requirements, emergency contacts",
  },
];

const colorMap = {
  aurora: {
    icon: "text-aurora-400",
    bg: "bg-aurora-500/10 border-aurora-500/20",
    border: "border-aurora-500/30",
    badge: "text-aurora-400 bg-aurora-500/10",
    dot: "bg-aurora-400",
    glow: "shadow-aurora-500/15",
  },
  ember: {
    icon: "text-ember-400",
    bg: "bg-ember-500/10 border-ember-500/20",
    border: "border-ember-500/30",
    badge: "text-ember-400 bg-ember-500/10",
    dot: "bg-ember-400",
    glow: "shadow-ember-500/15",
  },
  sapphire: {
    icon: "text-sapphire-400",
    bg: "bg-sapphire-500/10 border-sapphire-500/20",
    border: "border-sapphire-500/30",
    badge: "text-sapphire-400 bg-sapphire-500/10",
    dot: "bg-sapphire-400",
    glow: "shadow-sapphire-500/15",
  },
};

export default function AgentsSection() {
  const [active, setActive] = useState("planner");
  const agent = agents.find((a) => a.id === active)!;
  const colors = colorMap[agent.color as keyof typeof colorMap];

  return (
    <section id="agents" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmos-900/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-aurora-500/20">
            <Zap className="w-3 h-3 text-aurora-400" />
            <span className="text-xs font-medium text-aurora-300">Multi-Agent AI System</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            8 specialized AI agents,{" "}
            <span className="gradient-aurora">working in concert</span>
          </h2>
          <p className="text-cosmos-300 text-lg max-w-2xl mx-auto">
            Each agent is a domain expert. Together they form an orchestrated intelligence
            layer that handles every dimension of your journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Agent list */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
            {agents.map((a, i) => {
              const Icon = a.icon;
              const c = colorMap[a.color as keyof typeof colorMap];
              const isActive = active === a.id;
              return (
                <motion.button
                  key={a.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActive(a.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                    isActive
                      ? `${c.border} bg-white/5 shadow-lg ${c.glow}`
                      : "border-white/6 glass hover:border-white/12"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${c.bg}`}>
                    <Icon className={`w-4 h-4 ${c.icon}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold truncate ${isActive ? "text-white" : "text-cosmos-300"}`}>
                      {a.name.replace(" Agent", "").replace(" Assistant", "").replace(" Intelligence", "")}
                    </p>
                    <p className={`text-[10px] ${c.badge} mt-0.5 rounded px-1`}>{a.role}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Agent detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:col-span-3 glass-card rounded-2xl p-7 border ${colors.border} space-y-6`}
            >
              {/* Agent header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${colors.bg}`}>
                    {(() => {
                      const Icon = agent.icon;
                      return <Icon className={`w-6 h-6 ${colors.icon}`} />;
                    })()}
                  </div>
                  <div>
                    <p className={`text-xs font-mono uppercase tracking-widest ${colors.icon}`}>{agent.role}</p>
                    <h3
                      className="text-white font-display font-bold text-xl tracking-tight"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {agent.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="status-dot" />
                  <span className="text-xs text-cosmos-400 font-mono">Active</span>
                </div>
              </div>

              <p className="text-cosmos-300 text-sm leading-relaxed">{agent.description}</p>

              {/* Responsibilities */}
              <div className="space-y-3">
                <p className="text-xs text-cosmos-500 font-mono uppercase tracking-widest">Core Responsibilities</p>
                <div className="space-y-2">
                  {agent.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} />
                      <span className="text-sm text-cosmos-200">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs text-cosmos-500 font-mono uppercase tracking-widest">Communicates with</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.communicates.map((c) => (
                      <span key={c} className={`text-xs px-2 py-1 rounded-full ${colors.badge} font-medium`}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-cosmos-500 font-mono uppercase tracking-widest">Shared Memory</p>
                  <p className="text-xs text-cosmos-300 leading-relaxed">{agent.memory}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
