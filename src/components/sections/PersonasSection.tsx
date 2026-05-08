"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Users, Briefcase, Laptop, Gem, Backpack,
  Mountain, Heart, UsersRound, Compass
} from "lucide-react";

const personas = [
  {
    id: "solo",
    icon: User,
    label: "Solo Traveler",
    emoji: "🎒",
    color: "aurora",
    headline: "Freedom meets intelligence",
    description: "Wandr crafts flexible, spontaneous itineraries with safety alerts, social meetup suggestions, and solo-friendly accommodation picks.",
    features: ["Solo-safe routing", "Meetup events", "Flexible rebooking", "Emergency SOS"],
    destinations: ["Tokyo", "Medellín", "Lisbon"],
  },
  {
    id: "family",
    icon: Users,
    label: "Family Planner",
    emoji: "👨‍👩‍👧‍👦",
    color: "ember",
    headline: "Every family member thrilled",
    description: "Kid-friendly activity filters, pram-accessible routes, family meal planning, and schedule balancing for mixed-age groups.",
    features: ["Kid-friendly filters", "Accessible routes", "Group scheduling", "Family budgeting"],
    destinations: ["Orlando", "Bali", "Costa Rica"],
  },
  {
    id: "business",
    icon: Briefcase,
    label: "Business Traveler",
    emoji: "💼",
    color: "sapphire",
    headline: "Efficiency, elevated",
    description: "Corporate travel profiles, loyalty point optimization, meeting-adjacent hotel picks, and expense report generation.",
    features: ["Loyalty optimization", "Meeting sync", "Expense reports", "Fast-track routing"],
    destinations: ["Singapore", "NYC", "Frankfurt"],
  },
  {
    id: "nomad",
    icon: Laptop,
    label: "Digital Nomad",
    emoji: "💻",
    color: "aurora",
    headline: "Work anywhere, perfectly",
    description: "Co-working discovery, internet speed ratings, visa duration tracking, and cost-of-living comparisons across cities.",
    features: ["Co-working finder", "Visa tracker", "Internet ratings", "Cost comparison"],
    destinations: ["Chiang Mai", "Tbilisi", "Tallinn"],
  },
  {
    id: "luxury",
    icon: Gem,
    label: "Luxury Traveler",
    emoji: "✨",
    color: "ember",
    headline: "Curated beyond expectations",
    description: "Private villa curation, Michelin dining reservations, exclusive experience access, and personal concierge integration.",
    features: ["Private villas", "Michelin dining", "VIP experiences", "Concierge mode"],
    destinations: ["Maldives", "Monaco", "Kyoto"],
  },
  {
    id: "budget",
    icon: Backpack,
    label: "Budget Backpacker",
    emoji: "🪙",
    color: "sapphire",
    headline: "See the world, spend less",
    description: "Hostel & guesthouse matching, free attraction discovery, budget meal mapping, and real-time price comparison.",
    features: ["Hostel matching", "Free attractions", "Budget meals", "Price alerts"],
    destinations: ["Southeast Asia", "Eastern Europe", "South America"],
  },
  {
    id: "adventure",
    icon: Mountain,
    label: "Adventure Seeker",
    emoji: "🏔️",
    color: "aurora",
    headline: "Beyond the beaten path",
    description: "Trail difficulty mapping, gear rental networks, weather windows for extreme sports, and safety checkpoint planning.",
    features: ["Trail mapping", "Gear rental", "Weather windows", "Safety checkpoints"],
    destinations: ["Patagonia", "Nepal", "New Zealand"],
  },
  {
    id: "senior",
    icon: Heart,
    label: "Senior Traveler",
    emoji: "🌺",
    color: "ember",
    headline: "Comfortable, enriching, safe",
    description: "Accessibility-first planning, medical facility awareness, comfortable pace settings, and travel insurance integration.",
    features: ["Accessibility-first", "Medical awareness", "Comfort pace", "Insurance sync"],
    destinations: ["Italy", "Japan", "Switzerland"],
  },
  {
    id: "group",
    icon: UsersRound,
    label: "Group Organizer",
    emoji: "🎉",
    color: "sapphire",
    headline: "Everyone agrees, finally",
    description: "Preference aggregation across group members, split expense tracking, group booking coordination, and voting tools.",
    features: ["Preference merge", "Split expenses", "Group booking", "Voting tools"],
    destinations: ["Barcelona", "Bali", "Iceland"],
  },
  {
    id: "weekend",
    icon: Compass,
    label: "Weekend Explorer",
    emoji: "🗺️",
    color: "aurora",
    headline: "Maximum experience, minimal time",
    description: "48–72h intensive itineraries, early/late availability scheduling, and drive-distance destination suggestions from your city.",
    features: ["48h itineraries", "Drive-distance", "Early access", "Micro-trips"],
    destinations: ["Hudson Valley", "Cotswolds", "Burgundy"],
  },
];

const colorMap = {
  aurora: {
    border: "border-aurora-500/30",
    bg: "bg-aurora-500/10",
    text: "text-aurora-400",
    dot: "bg-aurora-400",
    active: "border-aurora-400/60 bg-aurora-500/10",
    tag: "text-aurora-400 bg-aurora-500/10",
  },
  ember: {
    border: "border-ember-500/30",
    bg: "bg-ember-500/10",
    text: "text-ember-400",
    dot: "bg-ember-400",
    active: "border-ember-400/60 bg-ember-500/10",
    tag: "text-ember-400 bg-ember-500/10",
  },
  sapphire: {
    border: "border-sapphire-500/30",
    bg: "bg-sapphire-500/10",
    text: "text-sapphire-400",
    dot: "bg-sapphire-400",
    active: "border-sapphire-400/60 bg-sapphire-500/10",
    tag: "text-sapphire-400 bg-sapphire-500/10",
  },
};

export default function PersonasSection() {
  const [active, setActive] = useState("solo");
  const activePersona = personas.find((p) => p.id === active)!;
  const colors = colorMap[activePersona.color as keyof typeof colorMap];

  return (
    <section id="personas" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmos-900/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-ember-500/20">
            <span className="text-xs font-medium text-ember-300">Built for every traveler</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Who are you{" "}
            <span className="gradient-sunset">traveling as?</span>
          </h2>
          <p className="text-cosmos-300 text-lg max-w-xl mx-auto">
            Wandr adapts to your travel archetype — 10 distinct personas, infinite personalization.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Persona grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3">
            {personas.map((persona, i) => {
              const Icon = persona.icon;
              const c = colorMap[persona.color as keyof typeof colorMap];
              const isActive = active === persona.id;
              return (
                <motion.button
                  key={persona.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setActive(persona.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? `${c.active} shadow-lg`
                      : "border-white/6 glass hover:border-white/15"
                  }`}
                >
                  <span className="text-2xl">{persona.emoji}</span>
                  <span className={`text-[11px] font-medium leading-tight text-center ${isActive ? c.text : "text-cosmos-400"}`}>
                    {persona.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`glass-card rounded-2xl p-6 border ${colors.border} space-y-5`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activePersona.emoji}</span>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-widest ${colors.text}`}>{activePersona.label}</p>
                  <h3
                    className="text-white font-display font-bold text-xl tracking-tight"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {activePersona.headline}
                  </h3>
                </div>
              </div>

              <p className="text-cosmos-300 text-sm leading-relaxed">{activePersona.description}</p>

              <div className="space-y-2">
                <p className="text-xs text-cosmos-500 font-mono uppercase tracking-widest">Features unlocked</p>
                <div className="flex flex-wrap gap-2">
                  {activePersona.features.map((f) => (
                    <span key={f} className={`text-xs px-2.5 py-1 rounded-full ${colors.tag} font-medium`}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-cosmos-500 font-mono uppercase tracking-widest">Top destinations</p>
                <div className="flex gap-2 flex-wrap">
                  {activePersona.destinations.map((d) => (
                    <span key={d} className="text-sm text-cosmos-200 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
