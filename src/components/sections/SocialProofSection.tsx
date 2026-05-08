"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Solo traveler · 28 countries",
    avatar: "SK",
    rating: 5,
    text: "Wandr planned my 3-week Southeast Asia solo trip in literally 4 seconds. When my Bali flight got cancelled, it rebooked me and reshuffled 6 days of itinerary before I even finished my coffee.",
    destination: "Bali → Lombok → Komodo",
    color: "aurora",
  },
  {
    name: "Marcus T.",
    role: "Family of 5 · Annual planner",
    avatar: "MT",
    rating: 5,
    text: "Getting 5 people to agree on anything is impossible. Wandr aggregated all our preferences, found the overlap, and built an itinerary where everyone was thrilled — kids and grandparents included.",
    destination: "Costa Rica Family Safari",
    color: "ember",
  },
  {
    name: "Priya M.",
    role: "Digital nomad · 18 months remote",
    avatar: "PM",
    rating: 5,
    text: "The co-working finder and visa duration tracker are game-changers. I've extended stays in 3 countries because Wandr flagged that I was approaching limits. Saved me from serious legal headaches.",
    destination: "EU Nomad Circuit",
    color: "sapphire",
  },
  {
    name: "James L.",
    role: "Business traveler · 80k miles/yr",
    avatar: "JL",
    rating: 5,
    text: "Wandr optimizes every booking for my United status. It saved me 42,000 miles on my last quarter by routing me through hubs I wouldn't have thought of. My CFO actually approved my travel budget.",
    destination: "APAC Business Circuit",
    color: "aurora",
  },
  {
    name: "Elena R.",
    role: "Luxury traveler · Frequent flyer",
    avatar: "ER",
    rating: 5,
    text: "The private villa curation is impeccable. Wandr found us a property in Positano that wasn't listed on any standard platform. The AI concierge handled every dinner reservation at 2-Michelin star restaurants.",
    destination: "Amalfi Coast & Sicily",
    color: "ember",
  },
  {
    name: "Tom & Alex",
    role: "Adventure seekers · Mountaineers",
    avatar: "TA",
    rating: 5,
    text: "Wandr tracked the perfect weather window for our Aconcagua summit attempt across a 3-week period. The real-time alerts kept us safe during an unexpected storm. We summited successfully.",
    destination: "Patagonia Expedition",
    color: "sapphire",
  },
];

const logos = [
  "TechCrunch", "Forbes Travel", "Condé Nast", "Skift", "The Points Guy",
  "Lonely Planet", "National Geographic", "Travel + Leisure",
];

const colorMap = {
  aurora: "border-aurora-500/20 bg-aurora-500/5",
  ember: "border-ember-500/20 bg-ember-500/5",
  sapphire: "border-sapphire-500/20 bg-sapphire-500/5",
};

const avatarColor = {
  aurora: "bg-aurora-500/20 text-aurora-300",
  ember: "bg-ember-500/20 text-ember-300",
  sapphire: "bg-sapphire-500/20 text-sapphire-300",
};

export default function SocialProofSection() {
  return (
    <section id="reviews" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-ember-500/20">
            <Star className="w-3 h-3 text-ember-400 fill-ember-400" />
            <span className="text-xs font-medium text-ember-300">4.9/5 from 140,000+ travelers</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Travelers who{" "}
            <span className="gradient-sunset">travel smarter</span>
          </h2>
        </motion.div>

        {/* As seen in marquee */}
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cosmos-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cosmos-950 to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
            {[...logos, ...logos].map((logo, i) => (
              <span
                key={i}
                className="text-sm text-cosmos-500 font-display font-semibold tracking-wide"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => {
            const cardColor = colorMap[t.color as keyof typeof colorMap];
            const avColor = avatarColor[t.color as keyof typeof avatarColor];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass-card rounded-2xl p-6 border space-y-4 ${cardColor}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-ember-400 fill-ember-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-cosmos-600" />
                </div>

                <p className="text-cosmos-200 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>

                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${avColor}`}>
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-cosmos-500 truncate">{t.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-cosmos-500 font-mono">{t.destination}</p>
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
