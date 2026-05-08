"use client";

import { motion } from "framer-motion";
import {
  Brain, Zap, Shield, BarChart3, Navigation, Bell,
  MessageSquare, Globe, Compass, Heart, Camera, Coffee
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Itinerary Engine",
    description: "Multi-agent AI generates complete day-by-day itineraries in seconds, tailored to your exact preferences and pace.",
    color: "aurora",
    tag: "Core",
  },
  {
    icon: Zap,
    title: "Real-Time Adaptation",
    description: "Flight cancelled? Hotel closed? Wandr instantly re-plans your entire trip, preserving your priorities.",
    color: "ember",
    tag: "Live",
  },
  {
    icon: Navigation,
    title: "Smart Route Optimization",
    description: "Calculates optimal travel sequences factoring in opening hours, crowd data, transport modes, and your energy levels.",
    color: "sapphire",
    tag: "Smart",
  },
  {
    icon: Globe,
    title: "Global Discovery Engine",
    description: "Surface hidden gems, local experiences, and events through collaborative filtering and contextual ranking.",
    color: "aurora",
    tag: "Discovery",
  },
  {
    icon: BarChart3,
    title: "Budget Intelligence",
    description: "Real-time expense tracking, dynamic price predictions, and smart alerts when you're trending over budget.",
    color: "ember",
    tag: "Finance",
  },
  {
    icon: Bell,
    title: "Proactive Alerts",
    description: "Geo-fenced suggestions, safety alerts, currency fluctuations, and weather warnings before they impact your trip.",
    color: "sapphire",
    tag: "Safety",
  },
  {
    icon: MessageSquare,
    title: "AI Concierge Chat",
    description: "NLP-powered travel assistant available 24/7 — ask anything from local tips to emergency rebooking.",
    color: "aurora",
    tag: "Assistant",
  },
  {
    icon: Shield,
    title: "Privacy-First Design",
    description: "GDPR-compliant, end-to-end encrypted, with granular consent controls and explainable AI decisions.",
    color: "ember",
    tag: "Security",
  },
  {
    icon: Heart,
    title: "Continuous Personalization",
    description: "Learns from every trip, rating, and interaction to build a rich traveler profile that improves over time.",
    color: "sapphire",
    tag: "Personal",
  },
];

const colorMap = {
  aurora: {
    icon: "text-aurora-400",
    bg: "bg-aurora-500/10",
    border: "border-aurora-500/20",
    glow: "group-hover:shadow-aurora-500/20",
    tag: "text-aurora-400 bg-aurora-500/10 border-aurora-500/20",
  },
  ember: {
    icon: "text-ember-400",
    bg: "bg-ember-500/10",
    border: "border-ember-500/20",
    glow: "group-hover:shadow-ember-500/20",
    tag: "text-ember-400 bg-ember-500/10 border-ember-500/20",
  },
  sapphire: {
    icon: "text-sapphire-400",
    bg: "bg-sapphire-500/10",
    border: "border-sapphire-500/20",
    glow: "group-hover:shadow-sapphire-500/20",
    tag: "text-sapphire-400 bg-sapphire-500/10 border-sapphire-500/20",
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-aurora-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-aurora-500/20">
            <span className="text-xs font-medium text-aurora-300">Platform Features</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Everything you need to{" "}
            <span className="gradient-aurora">travel smarter</span>
          </h2>
          <p className="text-cosmos-300 text-lg max-w-2xl mx-auto leading-relaxed">
            A complete ecosystem combining AI intelligence, real-time data, and
            delightful design — from planning to post-trip memories.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color as keyof typeof colorMap];
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group glass-card rounded-2xl p-6 hover:shadow-2xl ${colors.glow} transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${colors.tag}`}>
                    {feature.tag}
                  </span>
                </div>
                <h3
                  className="text-white font-display font-semibold text-lg mb-2 tracking-tight"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-cosmos-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
