"use client";

import { motion } from "framer-motion";
import { MessageSquare, Wand2, Map, Plane, Star, Repeat } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell Wandr your vision",
    description:
      "Chat naturally or fill our smart wizard. Share your destination ideas, travel style, budget, dates, and any special needs.",
    color: "aurora",
    detail: "AI captures intent from free-form text — no rigid forms.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI builds your itinerary",
    description:
      "In under 5 seconds, 8 specialized AI agents collaborate to generate a fully optimized, day-by-day travel plan.",
    color: "ember",
    detail: "Multi-agent orchestration: planner, budget, weather, local discovery.",
  },
  {
    number: "03",
    icon: Map,
    title: "Explore & refine",
    description:
      "Interact with your itinerary on a live map timeline. Swap activities, adjust pacing, and get instant alternative suggestions.",
    color: "sapphire",
    detail: "Drag-and-drop timeline with real-time re-optimization.",
  },
  {
    number: "04",
    icon: Plane,
    title: "Book everything in one place",
    description:
      "Seamlessly book flights, hotels, experiences, and transfers through our integrated booking layer with price comparison.",
    color: "aurora",
    detail: "Connects to 500+ travel providers via unified APIs.",
  },
  {
    number: "05",
    icon: Star,
    title: "Travel with AI by your side",
    description:
      "Wandr monitors your trip live — proactive alerts, concierge chat, navigation, local tips, and emergency support.",
    color: "ember",
    detail: "Geo-fenced recommendations trigger as you move.",
  },
  {
    number: "06",
    icon: Repeat,
    title: "Learn & improve forever",
    description:
      "After every trip, Wandr updates your traveler profile, building richer personalization for every future adventure.",
    color: "sapphire",
    detail: "Continuous preference learning via feedback loops.",
  },
];

const colorMap = {
  aurora: {
    number: "text-aurora-400",
    icon: "text-aurora-400 bg-aurora-500/10 border-aurora-500/20",
    line: "bg-aurora-500/30",
    tag: "text-aurora-300 bg-aurora-500/8",
  },
  ember: {
    number: "text-ember-400",
    icon: "text-ember-400 bg-ember-500/10 border-ember-500/20",
    line: "bg-ember-500/30",
    tag: "text-ember-300 bg-ember-500/8",
  },
  sapphire: {
    number: "text-sapphire-400",
    icon: "text-sapphire-400 bg-sapphire-500/10 border-sapphire-500/20",
    line: "bg-sapphire-500/30",
    tag: "text-sapphire-300 bg-sapphire-500/8",
  },
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      {/* Center vertical line */}
      <div className="absolute left-1/2 top-32 bottom-32 w-px bg-gradient-to-b from-aurora-500/0 via-aurora-500/20 to-aurora-500/0 hidden lg:block pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sapphire-500/20">
            <span className="text-xs font-medium text-sapphire-300">How It Works</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            From idea to{" "}
            <span className="gradient-ocean">adventure in 5 steps</span>
          </h2>
          <p className="text-cosmos-300 text-lg max-w-xl mx-auto">
            Wandr handles every layer of travel planning so you can focus on the experience.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const colors = colorMap[step.color as keyof typeof colorMap];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-start gap-6 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} flex-row`}
              >
                {/* Number + icon column */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${colors.icon}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-px h-8 ${colors.line}`} />
                  )}
                </div>

                {/* Content */}
                <div className="glass-card rounded-2xl p-6 flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold ${colors.number}`}>{step.number}</span>
                    <h3
                      className="text-white font-display font-semibold text-xl tracking-tight"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-cosmos-300 text-sm leading-relaxed">{step.description}</p>
                  <div className={`inline-flex text-xs px-3 py-1.5 rounded-full ${colors.tag} font-mono`}>
                    ↳ {step.detail}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
