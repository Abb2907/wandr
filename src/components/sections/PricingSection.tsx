"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Building2 } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "explorer",
    name: "Explorer",
    icon: Sparkles,
    price: { monthly: 0, annual: 0 },
    color: "cosmos",
    description: "Start planning smarter for free.",
    features: [
      "3 AI-generated itineraries/month",
      "Basic destination discovery",
      "7-day weather intelligence",
      "Standard route optimization",
      "Community tips access",
      "Mobile app access",
    ],
    cta: "Start Free",
    href: "/planner",
    highlight: false,
  },
  {
    id: "nomad",
    name: "Nomad",
    icon: Zap,
    price: { monthly: 19, annual: 15 },
    color: "aurora",
    description: "For the serious traveler who wants an edge.",
    features: [
      "Unlimited AI itineraries",
      "Real-time trip adaptation",
      "All 8 AI agents active",
      "Budget intelligence & tracking",
      "AI concierge chat (24/7)",
      "Offline itinerary access",
      "Priority booking via partners",
      "Loyalty point optimization",
      "Group trip coordination (up to 6)",
    ],
    cta: "Start Free Trial",
    href: "/planner",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: { monthly: null, annual: null },
    color: "ember",
    description: "Corporate travel programs, managed at scale.",
    features: [
      "Everything in Nomad",
      "Corporate travel policies",
      "Automated expense reporting",
      "Duty of care & safety monitoring",
      "API access & integrations",
      "Dedicated account manager",
      "Custom AI training on company data",
      "SLA & compliance guarantees",
    ],
    cta: "Contact Sales",
    href: "#",
    highlight: false,
  },
];

const colorMap = {
  cosmos: {
    border: "border-white/8",
    cta: "bg-white/8 hover:bg-white/15 text-white",
  },
  aurora: {
    border: "border-aurora-500/40",
    cta: "bg-aurora-400 hover:bg-aurora-300 text-cosmos-950 shadow-lg shadow-aurora-500/30",
  },
  ember: {
    border: "border-ember-500/30",
    cta: "bg-ember-400 hover:bg-ember-300 text-cosmos-950",
  },
};

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-aurora-500/20">
            <span className="text-xs font-medium text-aurora-300">Pricing</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Start free,{" "}
            <span className="gradient-aurora">scale as you explore</span>
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!annual ? "text-white" : "text-cosmos-400"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? "bg-aurora-400" : "bg-cosmos-700"}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${annual ? "translate-x-7" : "translate-x-1"}`}
              />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${annual ? "text-white" : "text-cosmos-400"}`}>
              Annual
              <span className="text-xs text-aurora-400 font-medium px-1.5 py-0.5 rounded bg-aurora-500/15">Save 20%</span>
            </span>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const colors = colorMap[plan.color as keyof typeof colorMap];
            const price = annual ? plan.price.annual : plan.price.monthly;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative glass-card rounded-2xl p-7 border ${colors.border} ${
                  plan.highlight ? "ring-1 ring-aurora-400/30" : ""
                } flex flex-col`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-aurora-400 text-cosmos-950 text-xs font-bold">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <Icon className={`w-5 h-5 ${
                    plan.color === "aurora" ? "text-aurora-400" :
                    plan.color === "ember" ? "text-ember-400" :
                    "text-cosmos-300"
                  }`} />
                  <h3 className="text-white font-display font-bold text-xl" style={{ fontFamily: "Syne, sans-serif" }}>
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-4">
                  {price !== null ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-display font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                        ${price}
                      </span>
                      <span className="text-cosmos-400 text-sm mb-1">/mo</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-display font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                      Custom
                    </div>
                  )}
                  <p className="text-cosmos-400 text-sm mt-1">{plan.description}</p>
                </div>

                <div className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        plan.color === "aurora" ? "bg-aurora-500/20" :
                        plan.color === "ember" ? "bg-ember-500/20" :
                        "bg-white/10"
                      }`}>
                        <Check className={`w-2.5 h-2.5 ${
                          plan.color === "aurora" ? "text-aurora-400" :
                          plan.color === "ember" ? "text-ember-400" :
                          "text-cosmos-300"
                        }`} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-cosmos-200">{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-xl text-center text-sm font-semibold transition-all duration-200 ${colors.cta}`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
