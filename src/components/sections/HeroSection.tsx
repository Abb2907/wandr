"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles, ArrowRight, MapPin, Plane, Star, ChevronDown,
  Brain, Zap, Navigation, Sun, Play
} from "lucide-react";
import Link from "next/link";

const itinerarySteps = [
  { time: "08:00", activity: "Sunrise yoga at Ubud rice terraces", tag: "Wellness", color: "aurora" },
  { time: "10:30", activity: "Visit Tirta Empul water temple", tag: "Culture", color: "sapphire" },
  { time: "13:00", activity: "Lunch at Locavore – farm-to-table", tag: "Food", color: "ember" },
  { time: "15:30", activity: "Hidden waterfall trek (AI suggests bypass)", tag: "Adventure", color: "aurora" },
  { time: "18:00", activity: "Sunset at Tanah Lot sea temple", tag: "Scenic", color: "ember" },
  { time: "20:30", activity: "Night market – Jimbaran seafood", tag: "Food", color: "ember" },
];

const tagColors = {
  aurora: "text-aurora-400 bg-aurora-500/10 border-aurora-500/20",
  sapphire: "text-sapphire-400 bg-sapphire-500/10 border-sapphire-500/20",
  ember: "text-ember-400 bg-ember-500/10 border-ember-500/20",
};

const destinations = [
  { name: "Bali, Indonesia", temp: "29°C", emoji: "🌴" },
  { name: "Kyoto, Japan", temp: "18°C", emoji: "⛩️" },
  { name: "Santorini, Greece", temp: "24°C", emoji: "🏛️" },
  { name: "Patagonia, Argentina", temp: "12°C", emoji: "🏔️" },
];

const stats = [
  { value: "2.4M+", label: "Trips planned" },
  { value: "98.6%", label: "Satisfaction" },
  { value: "150+", label: "Countries" },
  { value: "4.2s", label: "Avg plan time" },
];

function AiItineraryCard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % itinerarySteps.length;
        setVisible((v) => [...v.slice(-5), next]);
        return next;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setVisible([0]);
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      {/* Glow */}
      <div className="absolute -inset-8 bg-aurora-500/8 rounded-3xl blur-3xl pointer-events-none" />

      <div className="glass-strong rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="status-dot" />
            <span className="text-xs font-mono text-cosmos-400">AI generating itinerary…</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-aurora-400 font-medium">Bali · 7 days</span>
            <span className="text-xs text-cosmos-500">✦</span>
          </div>
        </div>

        {/* Day header */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <div>
            <p className="text-xs text-cosmos-500 font-mono uppercase tracking-widest">Day 3</p>
            <h3 className="text-white font-display font-bold text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
              Cultural Immersion
            </h3>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-aurora-500/10 border border-aurora-500/20">
            <Sun className="w-3 h-3 text-ember-400" />
            <span className="text-xs text-cosmos-300">29°C · Sunny</span>
          </div>
        </div>

        {/* Itinerary items */}
        <div className="px-4 pb-4 space-y-2.5">
          {itinerarySteps.map((step, i) => {
            const isVisible = visible.includes(i);
            const isCurrent = currentStep === i;
            return (
              <AnimatePresence key={i}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: -12, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-300 ${
                      isCurrent
                        ? "bg-white/5 border border-white/8"
                        : "border border-transparent"
                    }`}
                  >
                    <span className="text-xs text-cosmos-500 font-mono mt-0.5 w-10 shrink-0">{step.time}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-cosmos-100 leading-relaxed">{step.activity}</p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                        tagColors[step.color as keyof typeof tagColors]
                      }`}
                    >
                      {step.tag}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Brain className="w-3 h-3 text-aurora-400" />
            <span className="text-[11px] text-cosmos-400">Optimized for your pace preference</span>
          </div>
          <Zap className="w-3.5 h-3.5 text-ember-400" />
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-3 glass rounded-xl px-3 py-2 border border-white/8"
      >
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-aurora-400" />
          <span className="text-xs text-cosmos-200 font-medium">Ubud, Bali</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-3 -left-3 glass rounded-xl px-3 py-2 border border-white/8"
      >
        <div className="flex items-center gap-1.5">
          <Star className="w-3 h-3 text-ember-400 fill-ember-400" />
          <span className="text-xs text-cosmos-200 font-medium">AI score: 9.7/10</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 60]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [destIndex, setDestIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDestIndex((i) => (i + 1) % destinations.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Nebula orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-aurora-500/15 blur-[80px]" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-ember-500/12 blur-[80px]" />
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, delay: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-sapphire-500/12 blur-[60px]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full"
      >
        {/* Left — copy */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-aurora-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-aurora-400" />
            <span className="text-xs font-medium text-aurora-300">
              Multi-Agent AI · Real-Time Adaptation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl font-display font-bold leading-[1.06] tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="text-white">Your AI</span>
              <br />
              <span className="gradient-aurora">Travel</span>
              <br />
              <span className="text-white">Companion</span>
            </h1>
          </motion.div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-cosmos-300 leading-relaxed max-w-md"
          >
            Wandr dynamically builds, adapts, and optimizes personalized travel
            itineraries in real-time — before, during, and after your trip.
          </motion.p>

          {/* Live destination ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-3"
          >
            <span className="text-sm text-cosmos-400">Trending now:</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={destIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/6"
              >
                <span className="text-base">{destinations[destIndex].emoji}</span>
                <span className="text-sm text-white font-medium">{destinations[destIndex].name}</span>
                <span className="text-xs text-cosmos-400">{destinations[destIndex].temp}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/planner"
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-cosmos-950 bg-aurora-400 hover:bg-aurora-300 transition-all duration-300 shadow-xl shadow-aurora-500/30 hover:shadow-aurora-400/40 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              Start Planning Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-cosmos-200 glass border border-white/8 hover:border-white/15 hover:text-white transition-all duration-200"
            >
              <Play className="w-3.5 h-3.5" />
              Watch demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="grid grid-cols-4 gap-6 pt-4 border-t border-white/6"
          >
            {stats.map((s, i) => (
              <div key={i} className="space-y-1">
                <p className="text-xl font-display font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                  {s.value}
                </p>
                <p className="text-xs text-cosmos-400 leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — live AI card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <AiItineraryCard />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-cosmos-500 font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-cosmos-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

