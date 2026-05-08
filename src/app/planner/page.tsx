"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, ArrowRight, ArrowLeft, MapPin, Calendar, Users, DollarSign,
  Heart, Mountain, Coffee, Waves, Building2, Utensils, Music, Camera,
  Plane, Train, Car, Ship, Home, Hotel, Tent, Star, Sparkles,
  Sun, Moon, Zap, Brain, Check, Globe
} from "lucide-react";
import Link from "next/link";

const steps = [
  { id: 1, label: "Destination", icon: MapPin },
  { id: 2, label: "Dates & Pace", icon: Calendar },
  { id: 3, label: "Travelers", icon: Users },
  { id: 4, label: "Budget", icon: DollarSign },
  { id: 5, label: "Interests", icon: Heart },
  { id: 6, label: "Transport & Stay", icon: Plane },
];

const destinations = [
  { name: "Bali, Indonesia", emoji: "🌴", climate: "Tropical", tag: "Trending" },
  { name: "Kyoto, Japan", emoji: "⛩️", climate: "Temperate", tag: "Cultural" },
  { name: "Patagonia", emoji: "🏔️", climate: "Cold", tag: "Adventure" },
  { name: "Santorini", emoji: "🏛️", climate: "Warm", tag: "Luxury" },
  { name: "Marrakech", emoji: "🕌", climate: "Hot", tag: "Exotic" },
  { name: "Iceland", emoji: "🌋", climate: "Arctic", tag: "Unique" },
  { name: "Costa Rica", emoji: "🦜", climate: "Tropical", tag: "Eco" },
  { name: "Tokyo, Japan", emoji: "🏙️", climate: "Varied", tag: "Urban" },
  { name: "Machu Picchu", emoji: "🗿", climate: "Altitude", tag: "Historic" },
];

const interests = [
  { id: "food", label: "Food & Dining", icon: Utensils, color: "ember" },
  { id: "nature", label: "Nature", icon: Mountain, color: "aurora" },
  { id: "culture", label: "Culture", icon: Building2, color: "sapphire" },
  { id: "adventure", label: "Adventure", icon: Zap, color: "aurora" },
  { id: "nightlife", label: "Nightlife", icon: Music, color: "ember" },
  { id: "wellness", label: "Wellness", icon: Sun, color: "sapphire" },
  { id: "shopping", label: "Shopping", icon: Star, color: "ember" },
  { id: "photography", label: "Photography", icon: Camera, color: "aurora" },
  { id: "beach", label: "Beach", icon: Waves, color: "sapphire" },
  { id: "coffee", label: "Cafés", icon: Coffee, color: "ember" },
];

const transportModes = [
  { id: "flight", label: "Flights", icon: Plane },
  { id: "train", label: "Train", icon: Train },
  { id: "car", label: "Car/Drive", icon: Car },
  { id: "boat", label: "Cruise/Ferry", icon: Ship },
];

const stayTypes = [
  { id: "hotel", label: "Hotels", icon: Hotel },
  { id: "hostel", label: "Hostels", icon: Home },
  { id: "airbnb", label: "Airbnb/Villa", icon: Home },
  { id: "camping", label: "Glamping", icon: Tent },
];

const paces = [
  { id: "relaxed", label: "Relaxed", desc: "2–3 activities/day, lots of downtime", icon: Moon },
  { id: "balanced", label: "Balanced", desc: "4–5 activities/day, some flex", icon: Globe },
  { id: "packed", label: "Packed", desc: "6+ activities/day, see everything", icon: Zap },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isDone = step.id < current;
        const isActive = step.id === current;
        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isDone
                    ? "bg-aurora-400 border-aurora-400 text-cosmos-950"
                    : isActive
                    ? "bg-aurora-500/20 border-aurora-400 text-aurora-400"
                    : "bg-cosmos-800 border-cosmos-700 text-cosmos-500"
                }`}
              >
                {isDone ? <Check className="w-4 h-4" strokeWidth={3} /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-[10px] font-mono hidden sm:block ${isActive ? "text-aurora-400" : "text-cosmos-500"}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-1 mt-[-14px] ${isDone ? "bg-aurora-400" : "bg-cosmos-700"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [selectedDest, setSelectedDest] = useState<string>("");
  const [customDest, setCustomDest] = useState("");
  const [days, setDays] = useState(7);
  const [pace, setPace] = useState("balanced");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState(2000);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [transport, setTransport] = useState<string[]>([]);
  const [stay, setStay] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const toggleInterest = (id: string) =>
    setSelectedInterests((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleTransport = (id: string) =>
    setTransport((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleStay = (id: string) =>
    setStay((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleNext = async () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      setGenerating(true);
      await new Promise((r) => setTimeout(r, 3000));
      window.location.href = "/dashboard";
    }
  };

  if (generating) {
    return (
      <div className="min-h-screen bg-cosmos-950 flex items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-md">
          {/* Orbiting rings animation */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full border border-aurora-400/20 animate-[orbit_4s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-ember-400/20 animate-[orbit_6s_linear_infinite_reverse]" />
            <div className="absolute inset-8 rounded-full border border-sapphire-400/20 animate-[orbit_3s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-12 h-12 text-aurora-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-display font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
              Building your itinerary…
            </h2>
            <p className="text-cosmos-400 text-sm">
              8 AI agents are collaborating to craft your perfect trip
            </p>
          </div>
          <div className="space-y-2 text-left glass rounded-xl p-4">
            {[
              "✓ Analyzing your preferences",
              "✓ Checking live weather windows",
              "⟳ Optimizing route sequence",
              "⟳ Curating local hidden gems",
              "⟳ Calculating budget allocation",
            ].map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
                className="text-xs font-mono text-cosmos-300"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmos-950 flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-aurora-400" />
            <span className="text-sm font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>Wandr</span>
          </Link>
          <span className="text-xs text-cosmos-400 font-mono">Step {step} of {steps.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="max-w-3xl mx-auto w-full space-y-8">
          {/* Step indicator */}
          <StepIndicator current={step} />

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* STEP 1: Destination */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                      Where to, explorer?
                    </h2>
                    <p className="text-cosmos-400 text-sm">Pick a destination or type your own dream location.</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Search any destination in the world…"
                    value={customDest}
                    onChange={(e) => { setCustomDest(e.target.value); setSelectedDest("custom"); }}
                    className="w-full px-4 py-3.5 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-cosmos-500 text-sm focus:outline-none focus:border-aurora-400/50"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    {destinations.map((d) => (
                      <button
                        key={d.name}
                        onClick={() => { setSelectedDest(d.name); setCustomDest(""); }}
                        className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                          selectedDest === d.name
                            ? "border-aurora-400/60 bg-aurora-500/10"
                            : "border-white/6 glass hover:border-white/15"
                        }`}
                      >
                        <div className="text-2xl mb-2">{d.emoji}</div>
                        <p className="text-xs font-semibold text-white leading-tight">{d.name}</p>
                        <p className="text-[10px] text-cosmos-500 mt-0.5">{d.tag}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Dates & Pace */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                      When & how long?
                    </h2>
                    <p className="text-cosmos-400 text-sm">Set your trip duration and preferred travel pace.</p>
                  </div>

                  <div className="glass-card rounded-2xl p-6 border border-white/8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cosmos-200 font-medium">Trip duration</span>
                      <span className="text-xl font-bold text-aurora-400" style={{ fontFamily: "Syne, sans-serif" }}>
                        {days} days
                      </span>
                    </div>
                    <input
                      type="range" min={1} max={30} value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full accent-aurora-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-cosmos-500">
                      <span>Weekend (2d)</span>
                      <span>2 weeks (14d)</span>
                      <span>Month (30d)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-cosmos-300 font-medium">Travel pace</p>
                    <div className="grid grid-cols-3 gap-3">
                      {paces.map((p) => {
                        const Icon = p.icon;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setPace(p.id)}
                            className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                              pace === p.id
                                ? "border-aurora-400/60 bg-aurora-500/10"
                                : "border-white/6 glass hover:border-white/15"
                            }`}
                          >
                            <Icon className={`w-5 h-5 mb-2 ${pace === p.id ? "text-aurora-400" : "text-cosmos-400"}`} />
                            <p className="text-sm font-semibold text-white">{p.label}</p>
                            <p className="text-[10px] text-cosmos-500 mt-1 leading-tight">{p.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Travelers */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                      Who&apos;s coming along?
                    </h2>
                    <p className="text-cosmos-400 text-sm">This helps us tailor activities, accommodation, and group dynamics.</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 border border-white/8 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-cosmos-200">Number of travelers</p>
                      <p className="text-xs text-cosmos-500 mt-0.5">Including yourself</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="w-9 h-9 rounded-full border border-white/15 text-white hover:bg-white/10 transition-colors text-lg font-bold"
                      >
                        −
                      </button>
                      <span className="text-3xl font-bold text-white w-8 text-center" style={{ fontFamily: "Syne, sans-serif" }}>
                        {travelers}
                      </span>
                      <button
                        onClick={() => setTravelers(Math.min(20, travelers + 1))}
                        className="w-9 h-9 rounded-full border border-aurora-400/40 bg-aurora-500/10 text-aurora-400 hover:bg-aurora-500/20 transition-colors text-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Just me", emoji: "🎒", desc: "Solo explorer" },
                      { label: "Couple", emoji: "💑", desc: "2 travelers" },
                      { label: "Family", emoji: "👨‍👩‍👧‍👦", desc: "Kids included" },
                      { label: "Friends", emoji: "🎉", desc: "Friend group" },
                      { label: "Business", emoji: "💼", desc: "Work trip" },
                      { label: "Custom", emoji: "⚙️", desc: "Mixed group" },
                    ].map((type) => (
                      <button
                        key={type.label}
                        className="p-4 rounded-xl border border-white/6 glass hover:border-white/15 text-left transition-all"
                      >
                        <span className="text-2xl">{type.emoji}</span>
                        <p className="text-sm font-medium text-white mt-2">{type.label}</p>
                        <p className="text-xs text-cosmos-500">{type.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Budget */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                      What&apos;s your budget?
                    </h2>
                    <p className="text-cosmos-400 text-sm">
                      Total budget per person for the entire trip (excluding flights if preferred).
                    </p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 border border-white/8 space-y-4">
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                        ${budget.toLocaleString()}
                      </span>
                      <span className="text-cosmos-400 text-sm mb-2">per person</span>
                    </div>
                    <input
                      type="range" min={200} max={20000} step={100} value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-aurora-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-cosmos-500">
                      <span>$200 Budget</span>
                      <span>$5k Mid-range</span>
                      <span>$20k Luxury</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Backpacker", range: "$200–$800", emoji: "🎒" },
                      { label: "Mid-range", range: "$800–$5,000", emoji: "🌍" },
                      { label: "Luxury", range: "$5,000+", emoji: "✨" },
                    ].map((tier) => (
                      <button
                        key={tier.label}
                        onClick={() => setBudget(tier.label === "Backpacker" ? 500 : tier.label === "Mid-range" ? 2000 : 10000)}
                        className="p-4 rounded-xl border border-white/6 glass hover:border-aurora-400/30 text-center transition-all"
                      >
                        <span className="text-xl">{tier.emoji}</span>
                        <p className="text-sm font-medium text-white mt-2">{tier.label}</p>
                        <p className="text-xs text-cosmos-500">{tier.range}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Interests */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                      What excites you?
                    </h2>
                    <p className="text-cosmos-400 text-sm">Select all your interests — Wandr balances them perfectly.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {interests.map((interest) => {
                      const Icon = interest.icon;
                      const isSelected = selectedInterests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                            isSelected
                              ? "border-aurora-400/60 bg-aurora-500/10 text-aurora-400"
                              : "border-white/6 glass hover:border-white/15 text-cosmos-400"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-medium text-center leading-tight">
                            {interest.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: Transport & Stay */}
              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                      How do you move & sleep?
                    </h2>
                    <p className="text-cosmos-400 text-sm">
                      Choose preferred transportation and accommodation types.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-cosmos-300 font-medium">Transportation modes</p>
                    <div className="grid grid-cols-4 gap-3">
                      {transportModes.map((t) => {
                        const Icon = t.icon;
                        const sel = transport.includes(t.id);
                        return (
                          <button
                            key={t.id}
                            onClick={() => toggleTransport(t.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                              sel
                                ? "border-aurora-400/60 bg-aurora-500/10 text-aurora-400"
                                : "border-white/6 glass hover:border-white/15 text-cosmos-400"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-medium">{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-cosmos-300 font-medium">Accommodation style</p>
                    <div className="grid grid-cols-4 gap-3">
                      {stayTypes.map((s) => {
                        const Icon = s.icon;
                        const sel = stay.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            onClick={() => toggleStay(s.id)}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                              sel
                                ? "border-ember-400/60 bg-ember-500/10 text-ember-400"
                                : "border-white/6 glass hover:border-white/15 text-cosmos-400"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-medium">{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5 border border-aurora-500/20 flex items-start gap-4">
                    <Sparkles className="w-5 h-5 text-aurora-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">Ready to generate your itinerary</p>
                      <p className="text-xs text-cosmos-400 mt-1 leading-relaxed">
                        8 AI agents will collaborate to build a personalized{" "}
                        {days}-day plan for {travelers} traveler{travelers > 1 ? "s" : ""} with a $
                        {budget.toLocaleString()} budget.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-cosmos-300 glass border border-white/8 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold text-cosmos-950 bg-aurora-400 hover:bg-aurora-300 transition-all shadow-lg shadow-aurora-500/25"
            >
              {step === 6 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Itinerary
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
