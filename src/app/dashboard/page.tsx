"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, Bell, Sun, Cloud, Plane, MapPin, DollarSign,
  MessageSquare, Navigation, AlertTriangle, ChevronRight,
  Star, Coffee, Utensils, Mountain, Camera, Zap, TrendingDown,
  TrendingUp, Check, X, Menu, BarChart3, Map, Calendar, Settings,
  Home, LogOut, ArrowRight
} from "lucide-react";
import Link from "next/link";

const days = [
  {
    id: 1,
    label: "Day 1",
    date: "Mon, Jun 9",
    theme: "Arrival & First Impressions",
    activities: [
      { time: "14:00", name: "Check in: Alaya Resort", type: "Stay", icon: Home, duration: "30m", cost: 0, tag: "aurora" },
      { time: "16:00", name: "Ubud Sacred Monkey Forest", type: "Attraction", icon: Camera, duration: "2h", cost: 8, tag: "aurora" },
      { time: "18:30", name: "Sunset at Campuhan Ridge Walk", type: "Nature", icon: Mountain, duration: "1.5h", cost: 0, tag: "aurora" },
      { time: "20:00", name: "Dinner: Locavore Restaurant", type: "Dining", icon: Utensils, duration: "2h", cost: 65, tag: "ember" },
    ],
  },
  {
    id: 2,
    label: "Day 2",
    date: "Tue, Jun 10",
    theme: "Temples & Culture",
    activities: [
      { time: "07:30", name: "Sunrise yoga: Bali Spirit", type: "Wellness", icon: Sun, duration: "1.5h", cost: 20, tag: "sapphire" },
      { time: "10:00", name: "Tirta Empul Water Temple", type: "Culture", icon: Star, duration: "2h", cost: 5, tag: "sapphire" },
      { time: "13:00", name: "Lunch: Warung Sopa", type: "Dining", icon: Utensils, duration: "1h", cost: 12, tag: "ember" },
      { time: "15:00", name: "Goa Gajah (Elephant Cave)", type: "Attraction", icon: Camera, duration: "1.5h", cost: 4, tag: "aurora" },
      { time: "19:30", name: "Kecak Fire Dance, Uluwatu", type: "Culture", icon: Zap, duration: "2h", cost: 18, tag: "ember" },
    ],
  },
  {
    id: 3,
    label: "Day 3",
    date: "Wed, Jun 11",
    theme: "Adventure Day",
    activities: [
      { time: "05:00", name: "Mount Batur Sunrise Trek", type: "Adventure", icon: Mountain, duration: "6h", cost: 55, tag: "aurora" },
      { time: "13:00", name: "Kintamani hot springs recovery", type: "Wellness", icon: Coffee, duration: "2h", cost: 22, tag: "sapphire" },
      { time: "16:00", name: "Tegallalang Rice Terrace", type: "Nature", icon: Camera, duration: "2h", cost: 3, tag: "aurora" },
      { time: "19:00", name: "Dinner: Mozaic Restaurant", type: "Dining", icon: Utensils, duration: "2.5h", cost: 95, tag: "ember" },
    ],
  },
];

const alerts = [
  { type: "warning", icon: AlertTriangle, color: "ember", title: "Rain expected tomorrow 14:00–17:00", desc: "Outdoor activities moved earlier. Plan updated.", time: "2m ago" },
  { type: "info", icon: Bell, color: "sapphire", title: "Flight BI347 on-time", desc: "Your Jun 15 departure is confirmed.", time: "1h ago" },
  { type: "success", icon: Check, color: "aurora", title: "Locavore booking confirmed", desc: "Table for 2, Jun 9 at 20:00", time: "3h ago" },
];

const budget = {
  total: 2800,
  spent: 1240,
  breakdown: [
    { label: "Accommodation", amount: 480, percentage: 64, color: "aurora" },
    { label: "Activities", amount: 320, percentage: 43, color: "sapphire" },
    { label: "Dining", amount: 280, percentage: 37, color: "ember" },
    { label: "Transport", amount: 160, percentage: 21, color: "aurora" },
  ],
};

const weather = [
  { day: "Mon", icon: Sun, temp: 29, rain: 5 },
  { day: "Tue", icon: Sun, temp: 31, rain: 10 },
  { day: "Wed", icon: Cloud, temp: 27, rain: 65 },
  { day: "Thu", icon: Sun, temp: 30, rain: 15 },
  { day: "Fri", icon: Sun, temp: 32, rain: 5 },
  { day: "Sat", icon: Cloud, temp: 28, rain: 45 },
  { day: "Sun", icon: Sun, temp: 29, rain: 20 },
];

const SidebarItem = ({
  icon: Icon, label, active, badge
}: {
  icon: React.ElementType; label: string; active?: boolean; badge?: number;
}) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
    active ? "bg-aurora-500/15 text-aurora-400 border border-aurora-500/25" : "text-cosmos-400 hover:text-white hover:bg-white/5"
  }`}>
    <Icon className="w-4 h-4" />
    <span className="flex-1 text-left font-medium">{label}</span>
    {badge && (
      <span className="w-5 h-5 rounded-full bg-ember-500 text-white text-[10px] flex items-center justify-center font-bold">{badge}</span>
    )}
  </button>
);

export default function DashboardPage() {
  const [activeDay, setActiveDay] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hi! I'm your Wandr AI concierge for your Bali trip. How can I help?" },
  ]);

  const dayData = days.find((d) => d.id === activeDay)!;

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const newMessages = [
      ...chatMessages,
      { role: "user", text: chatInput },
      { role: "assistant", text: "Great question! Based on your Day 3 schedule and the rain forecast, I'd suggest moving the Tegallalang Rice Terrace visit to 11:00 before the rain arrives. Want me to update the itinerary?" },
    ];
    setChatMessages(newMessages);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-cosmos-950 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-white/5 pt-5 pb-6 px-3">
        <Link href="/" className="flex items-center gap-2 px-3 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-aurora-400 to-aurora-600 flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>Wandr</span>
        </Link>

        <div className="space-y-1 flex-1">
          <SidebarItem icon={Home} label="Dashboard" active />
          <SidebarItem icon={Calendar} label="Itinerary" />
          <SidebarItem icon={Map} label="Map View" />
          <SidebarItem icon={DollarSign} label="Budget" />
          <SidebarItem icon={Navigation} label="Live Trip" />
          <SidebarItem icon={Bell} label="Alerts" badge={2} />
          <SidebarItem icon={BarChart3} label="Analytics" />
          <SidebarItem icon={MessageSquare} label="AI Chat" />
        </div>

        <div className="space-y-1 border-t border-white/5 pt-4 mt-4">
          <SidebarItem icon={Settings} label="Settings" />
          <SidebarItem icon={LogOut} label="Sign out" />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 glass-strong border-b border-white/5 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-white">🌴 Bali, Indonesia</p>
              <p className="text-xs text-cosmos-400 font-mono">Jun 9–16, 2025 · 7 days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-aurora-500/20">
              <div className="status-dot" />
              <span className="text-xs text-aurora-400 font-mono">AI Active</span>
            </div>
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-aurora-400 text-cosmos-950 text-xs font-semibold hover:bg-aurora-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Ask Wandr
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 grid xl:grid-cols-3 gap-6">
            {/* Left: Itinerary */}
            <div className="xl:col-span-2 space-y-5">
              {/* Day selector */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {days.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveDay(d.id)}
                    className={`flex flex-col items-center px-4 py-2.5 rounded-xl border shrink-0 transition-all ${
                      activeDay === d.id
                        ? "border-aurora-400/50 bg-aurora-500/10"
                        : "border-white/6 glass hover:border-white/15"
                    }`}
                  >
                    <span className={`text-xs font-mono ${activeDay === d.id ? "text-aurora-400" : "text-cosmos-500"}`}>{d.label}</span>
                    <span className="text-sm font-medium text-white">{d.date.split(",")[1]?.trim()}</span>
                  </button>
                ))}
                <Link
                  href="/planner"
                  className="flex flex-col items-center justify-center px-4 py-2.5 rounded-xl border border-dashed border-white/10 shrink-0 text-cosmos-500 hover:text-cosmos-300 hover:border-white/20 transition-all text-xs"
                >
                  + Add day
                </Link>
              </div>

              {/* Active day itinerary */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card rounded-2xl border border-white/8 overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-cosmos-400 font-mono">{dayData.date}</p>
                        <h3 className="text-white font-display font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
                          {dayData.theme}
                        </h3>
                      </div>
                      <span className="text-xs text-cosmos-400">{dayData.activities.length} activities</span>
                    </div>

                    <div className="divide-y divide-white/4">
                      {dayData.activities.map((act, i) => {
                        const Icon = act.icon;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors group"
                          >
                            <div className="flex flex-col items-center w-12 shrink-0">
                              <span className="text-xs font-mono text-cosmos-400 leading-tight">{act.time}</span>
                              {i < dayData.activities.length - 1 && (
                                <div className="w-px flex-1 bg-cosmos-700 mt-1 min-h-[16px]" />
                              )}
                            </div>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              act.tag === "aurora" ? "bg-aurora-500/15 text-aurora-400" :
                              act.tag === "ember" ? "bg-ember-500/15 text-ember-400" :
                              "bg-sapphire-500/15 text-sapphire-400"
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{act.name}</p>
                              <p className="text-xs text-cosmos-400">{act.type} · {act.duration}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-medium text-white">
                                {act.cost === 0 ? "Free" : `$${act.cost}`}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-cosmos-600 group-hover:text-cosmos-400 transition-colors" />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Weather strip */}
              <div className="glass-card rounded-2xl border border-white/8 p-5">
                <p className="text-xs text-cosmos-400 font-mono uppercase tracking-widest mb-4">7-Day Forecast</p>
                <div className="flex justify-between">
                  {weather.map((w, i) => {
                    const Icon = w.icon;
                    return (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <span className="text-xs text-cosmos-400">{w.day}</span>
                        <Icon className={`w-5 h-5 ${w.rain > 50 ? "text-sapphire-400" : "text-ember-400"}`} />
                        <span className="text-sm font-medium text-white">{w.temp}°</span>
                        <div className="w-1 h-4 rounded-full bg-cosmos-700 overflow-hidden">
                          <div
                            className="w-full bg-sapphire-400 rounded-full"
                            style={{ height: `${w.rain}%`, marginTop: `${100 - w.rain}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Widgets */}
            <div className="space-y-5">
              {/* Alerts */}
              <div className="glass-card rounded-2xl border border-white/8 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Live Alerts</p>
                  <span className="w-5 h-5 rounded-full bg-ember-500 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                </div>
                <div className="divide-y divide-white/4">
                  {alerts.map((alert, i) => {
                    const Icon = alert.icon;
                    return (
                      <div key={i} className="px-5 py-3.5 flex gap-3 items-start">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          alert.color === "ember" ? "bg-ember-500/15 text-ember-400" :
                          alert.color === "sapphire" ? "bg-sapphire-500/15 text-sapphire-400" :
                          "bg-aurora-500/15 text-aurora-400"
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white leading-snug">{alert.title}</p>
                          <p className="text-[11px] text-cosmos-500 mt-0.5">{alert.desc}</p>
                        </div>
                        <span className="text-[10px] text-cosmos-600 shrink-0">{alert.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget tracker */}
              <div className="glass-card rounded-2xl border border-white/8 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Budget Tracker</p>
                  <TrendingDown className="w-4 h-4 text-aurora-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-cosmos-400">Spent so far</span>
                    <span className="text-white font-mono font-medium">${budget.spent.toLocaleString()} / ${budget.total.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-cosmos-700 overflow-hidden">
                    <div
                      className="h-full budget-bar"
                      style={{ width: `${(budget.spent / budget.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-cosmos-500">{Math.round((budget.spent / budget.total) * 100)}% used · ${(budget.total - budget.spent).toLocaleString()} remaining</p>
                </div>
                <div className="space-y-2.5">
                  {budget.breakdown.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-cosmos-400">{item.label}</span>
                        <span className="text-white font-mono">${item.amount}</span>
                      </div>
                      <div className="h-1 rounded-full bg-cosmos-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.color === "aurora" ? "bg-aurora-400" :
                            item.color === "ember" ? "bg-ember-400" :
                            "bg-sapphire-400"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="glass-card rounded-2xl border border-white/8 p-5 space-y-3">
                <p className="text-sm font-semibold text-white">Quick Actions</p>
                {[
                  { label: "Add activity", icon: Zap, color: "aurora" },
                  { label: "Find restaurants nearby", icon: Utensils, color: "ember" },
                  { label: "Book transfer", icon: Navigation, color: "sapphire" },
                  { label: "Emergency contacts", icon: AlertTriangle, color: "ember" },
                ].map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                    >
                      <Icon className={`w-4 h-4 ${
                        action.color === "aurora" ? "text-aurora-400" :
                        action.color === "ember" ? "text-ember-400" :
                        "text-sapphire-400"
                      }`} />
                      <span className="text-sm text-cosmos-200">{action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cosmos-600 ml-auto" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat drawer */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 w-80 glass-strong border-l border-white/8 flex flex-col z-50"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <p className="text-sm font-semibold text-white">Wandr AI Concierge</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-cosmos-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-aurora-500/20 text-aurora-100 rounded-br-sm"
                      : "glass border border-white/8 text-cosmos-200 rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder="Ask anything about your trip…"
                  className="flex-1 px-3 py-2.5 rounded-xl glass border border-white/10 bg-transparent text-white placeholder-cosmos-500 text-sm focus:outline-none focus:border-aurora-400/50"
                />
                <button
                  onClick={sendChat}
                  className="px-3 py-2.5 rounded-xl bg-aurora-400 text-cosmos-950 font-semibold text-sm hover:bg-aurora-300 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {["Weather update", "Find dinner", "Emergency help"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setChatInput(s)}
                    className="text-[11px] px-2 py-1 rounded-full glass border border-white/8 text-cosmos-400 hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
