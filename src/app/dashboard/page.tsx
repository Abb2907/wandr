"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Compass, Bell, Sun, Cloud, Plane, MapPin, DollarSign,
  MessageSquare, Navigation, AlertTriangle, ChevronRight,
  Star, Coffee, Utensils, Mountain, Camera, Zap, TrendingDown,
  TrendingUp, Check, X, Menu, BarChart3, Map, Calendar, Settings,
  Home, LogOut, ArrowRight, CloudRain, RefreshCcw, CheckCircle2, ArrowRightLeft, Loader2
} from "lucide-react";
import Link from "next/link";
import GoogleMaps from "@/components/GoogleMaps";

const staticDays = [
  {
    id: 1,
    label: "Day 1",
    date: "Mon, Jun 9",
    theme: "Arrival & First Impressions",
    activities: [
      { time: "14:00", name: "Check in: Alaya Resort", type: "Stay", icon: Home, duration: "30m", cost: 0, tag: "aurora" },
      { time: "16:00", name: "Ubud Sacred Monkey Forest", type: "Attraction", icon: Camera, duration: "2h", cost: 640, tag: "aurora" },
      { time: "18:30", name: "Sunset at Campuhan Ridge Walk", type: "Nature", icon: Mountain, duration: "1.5h", cost: 0, tag: "aurora" },
      { time: "20:00", name: "Dinner: Locavore Restaurant", type: "Dining", icon: Utensils, duration: "2h", cost: 5200, tag: "ember" },
    ],
  },
  {
    id: 2,
    label: "Day 2",
    date: "Tue, Jun 10",
    theme: "Temples & Culture",
    activities: [
      { time: "07:30", name: "Sunrise yoga: Bali Spirit", type: "Wellness", icon: Sun, duration: "1.5h", cost: 1600, tag: "sapphire" },
      { time: "10:00", name: "Tirta Empul Water Temple", type: "Culture", icon: Star, duration: "2h", cost: 400, tag: "sapphire" },
      { time: "13:00", name: "Lunch: Warung Sopa", type: "Dining", icon: Utensils, duration: "1h", cost: 960, tag: "ember" },
      { time: "15:00", name: "Goa Gajah (Elephant Cave)", type: "Attraction", icon: Camera, duration: "1.5h", cost: 320, tag: "aurora" },
      { time: "19:30", name: "Kecak Fire Dance, Uluwatu", type: "Culture", icon: Zap, duration: "2h", cost: 1440, tag: "ember" },
    ],
  },
  {
    id: 3,
    label: "Day 3",
    date: "Wed, Jun 11",
    theme: "Adventure Day",
    activities: [
      { time: "05:00", name: "Mount Batur Sunrise Trek", type: "Adventure", icon: Mountain, duration: "6h", cost: 4400, tag: "aurora" },
      { time: "13:00", name: "Kintamani hot springs recovery", type: "Wellness", icon: Coffee, duration: "2h", cost: 1760, tag: "sapphire" },
      { time: "16:00", name: "Tegallalang Rice Terrace", type: "Nature", icon: Camera, duration: "2h", cost: 240, tag: "aurora" },
      { time: "19:00", name: "Dinner: Mozaic Restaurant", type: "Dining", icon: Utensils, duration: "2.5h", cost: 7600, tag: "ember" },
    ],
  },
];

const alerts = [
  { type: "warning", icon: AlertTriangle, color: "ember", title: "Rain expected tomorrow 14:00–17:00", desc: "Outdoor activities moved earlier. Plan updated.", time: "2m ago" },
  { type: "info", icon: Bell, color: "sapphire", title: "Flight BI347 on-time", desc: "Your Jun 15 departure is confirmed.", time: "1h ago" },
  { type: "success", icon: Check, color: "aurora", title: "Locavore booking confirmed", desc: "Table for 2, Jun 9 at 20:00", time: "3h ago" },
];

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

function DashboardContent() {
  const searchParams = useSearchParams();
  const itineraryId = searchParams.get("id");
  
  const [activeDay, setActiveDay] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hi! I'm your Wandr AI concierge for your trip. How can I help?" },
  ]);
  const [chaosMode, setChaosMode] = useState(false);
  const [diffView, setDiffView] = useState(false);
  
  // State for dynamic itinerary
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItinerary() {
      if (!itineraryId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("itineraries")
          .select("*")
          .eq("id", itineraryId)
          .single();

        if (error) throw error;
        
        // Parse the generated plan if it's a string, or use directly if it's an object
        let plan = data.plan;
        if (typeof plan === 'string') {
          try {
            plan = JSON.parse(plan);
          } catch (e) {
            console.error("Failed to parse plan JSON", e);
          }
        }
        
        setItinerary({
          ...data,
          parsedPlan: plan
        });
      } catch (err: any) {
        console.error("Error fetching itinerary:", err);
        setError(err.message || "Failed to load itinerary");
      } finally {
        setLoading(false);
      }
    }

    fetchItinerary();
  }, [itineraryId]);

  const triggerChaos = () => {
    setChaosMode(true);
    setDiffView(true);
    setActiveDay(3);
  };

  const acceptChanges = () => {
    setDiffView(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    const tempMessages = [
      ...chatMessages,
      { role: "user", text: userMessage },
      { role: "assistant", text: "..." },
    ];
    setChatMessages(tempMessages);
    setChatInput("");

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, itinerary })
      });
      const data = await res.json();
      
      setChatMessages(prev => {
        const newArr = [...prev];
        newArr[newArr.length - 1] = { role: "assistant", text: data.reply || data.error || "Sorry, I couldn't process that." };
        return newArr;
      });
    } catch (error) {
      setChatMessages(prev => {
        const newArr = [...prev];
        newArr[newArr.length - 1] = { role: "assistant", text: "Failed to connect to Wandr AI." };
        return newArr;
      });
    }
  };

  // Helper to map icon names from DB to components
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case "Home": return Home;
      case "Camera": return Camera;
      case "Mountain": return Mountain;
      case "Utensils": return Utensils;
      case "Sun": return Sun;
      case "Star": return Star;
      case "Zap": return Zap;
      case "Coffee": return Coffee;
      case "Plane": return Plane;
      case "MapPin": return MapPin;
      default: return MapPin;
    }
  };

  // Map database structure to our UI structure
  const displayDays = itinerary?.parsedPlan?.days?.map((d: any, index: number) => ({
    id: index + 1,
    label: `Day ${index + 1}`,
    date: `Day ${index + 1}`, // We don't have absolute dates in DB yet
    theme: d.theme || `Day ${index + 1}`,
    activities: d.activities?.map((a: any) => ({
      time: a.time,
      name: a.name,
      type: a.type,
      icon: getIconComponent(a.icon),
      duration: a.duration,
      cost: a.cost || 0,
      tag: "aurora" // Default tag
    })) || []
  })) || staticDays; // Fallback to static data if no itinerary loaded

  let dayData = displayDays.find((d: any) => d.id === activeDay);
  if (!dayData && displayDays.length > 0) {
    dayData = displayDays[0];
  }

  // Simplified disruption logic for demo purposes (only applies if using static data for now, or adapt dynamically)
  const disruptedDay3Activities = [
    { time: "05:00", name: "Mount Batur Sunrise Trek", type: "Adventure", icon: Mountain, duration: "6h", cost: 4400, tag: "aurora", status: "unchanged" },
    { time: "13:00", name: "Kintamani hot springs recovery", type: "Wellness", icon: Coffee, duration: "2h", cost: 1760, tag: "sapphire", status: "unchanged" },
    { time: "16:00", name: "Tegallalang Rice Terrace", type: "Nature", icon: Camera, duration: "2h", cost: 240, tag: "aurora", status: "cancelled", reason: "Severe thunderstorm warning" },
    { time: "16:30", name: "Puri Lukisan Art Museum", type: "Indoor Culture", icon: Star, duration: "2h", cost: 400, tag: "sapphire", status: "added", reason: "Indoor alternative nearby" },
    { time: "19:00", name: "Dinner: Mozaic Restaurant", type: "Dining", icon: Utensils, duration: "2.5h", cost: 7600, tag: "ember", status: "unchanged" },
  ];

  if (chaosMode && activeDay === 3 && itineraryId === null) { // Only show chaos on static demo
    dayData = {
      ...dayData,
      theme: diffView ? "Adventure Day (Re-optimizing...)" : "Adventure & Art (Adapted)",
      activities: diffView 
        ? disruptedDay3Activities 
        : disruptedDay3Activities.filter((a) => a.status !== "cancelled")
    };
  }

  const dynamicAlerts = [
    ...(chaosMode ? [{ type: "critical", icon: CloudRain, color: "ember", title: "Severe Thunderstorm Warning", desc: "Area alert starting 15:30. Itinerary re-optimization required.", time: "Just now" }] : []),
    ...alerts
  ];

  // Calculate budget from loaded itinerary if available
  const calculateBudget = () => {
    if (!itinerary) {
      return {
        total: 224000,
        spent: 99200,
        breakdown: [
          { label: "Accommodation", amount: 38400, percentage: 64, color: "aurora" },
          { label: "Activities", amount: 25600, percentage: 43, color: "sapphire" },
          { label: "Dining", amount: 22400, percentage: 37, color: "ember" },
          { label: "Transport", amount: 12800, percentage: 21, color: "aurora" },
        ],
      };
    }

    // Attempt to calculate based on parsed plan (simplified)
    const totalBudget = Number(itinerary.budget) || 160000;
    
    let activitiesSpent = 0;
    let diningSpent = 0;
    let transportSpent = 0;
    let accommodationSpent = 0;

    if (itinerary.parsedPlan?.days) {
      itinerary.parsedPlan.days.forEach((day: any) => {
        if (day.activities) {
          day.activities.forEach((act: any) => {
            const cost = Number(act.cost) || 0;
            if (act.type?.toLowerCase().includes("dining") || act.type?.toLowerCase().includes("food")) {
              diningSpent += cost;
            } else if (act.type?.toLowerCase().includes("stay") || act.type?.toLowerCase().includes("accommodation")) {
              accommodationSpent += cost;
            } else if (act.type?.toLowerCase().includes("transport")) {
              transportSpent += cost;
            } else {
              activitiesSpent += cost;
            }
          });
        }
      });
    }

    // Fill in mock values if the plan is completely missing them
    if (accommodationSpent === 0) accommodationSpent = totalBudget * 0.4;
    if (diningSpent === 0) diningSpent = totalBudget * 0.2;
    if (transportSpent === 0) transportSpent = totalBudget * 0.1;

    const totalSpent = activitiesSpent + diningSpent + transportSpent + accommodationSpent;

    return {
      total: totalBudget,
      spent: totalSpent,
      breakdown: [
        { label: "Accommodation", amount: accommodationSpent, percentage: Math.round((accommodationSpent / totalBudget) * 100), color: "aurora" },
        { label: "Activities", amount: activitiesSpent, percentage: Math.round((activitiesSpent / totalBudget) * 100), color: "sapphire" },
        { label: "Dining", amount: diningSpent, percentage: Math.round((diningSpent / totalBudget) * 100), color: "ember" },
        { label: "Transport", amount: transportSpent, percentage: Math.round((transportSpent / totalBudget) * 100), color: "aurora" },
      ],
    };
  };

  const currentBudget = calculateBudget();

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmos-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-aurora-400 mb-4" />
        <p className="text-cosmos-400">Loading your customized itinerary...</p>
      </div>
    );
  }

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
              <p className="text-sm font-semibold text-white">
                {itinerary ? `🌴 ${itinerary.destination}` : "🌴 Bali, Indonesia"}
              </p>
              <p className="text-xs text-cosmos-400 font-mono">
                {itinerary ? `${itinerary.duration} days trip` : "Jun 9–16, 2025 · 7 days"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-aurora-500/20">
              <div className="status-dot" />
              <span className="text-xs text-aurora-400 font-mono">AI Active</span>
            </div>
            <button
              onClick={() => setChatOpen(!chatOpen)}
              aria-label="Ask Wandr AI concierge"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-aurora-400 text-cosmos-950 text-xs font-semibold hover:bg-aurora-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {error && (
            <div className="m-6 p-4 bg-ember-500/10 border border-ember-500/20 rounded-xl flex items-center gap-3 text-ember-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p className="text-sm">Could not load custom itinerary. Showing demo content. ({error})</p>
            </div>
          )}
          
          <div className="p-6 grid xl:grid-cols-3 gap-6">
            {/* Left: Itinerary */}
            <div className="xl:col-span-2 space-y-5">
              {/* Day selector */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {displayDays.map((d: any) => (
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
                    <span className="text-sm font-medium text-white">{d.date.split(",")[1]?.trim() || d.date}</span>
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
                {dayData && (
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

                      {diffView && activeDay === 3 && !itineraryId && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="px-5 py-4 bg-ember-500/10 border-b border-ember-500/20"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-ember-500/20 text-ember-400 shrink-0">
                              <CloudRain className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                Disruption Detected
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-aurora-500/20 text-aurora-400 uppercase tracking-wider">Temporal Engine</span>
                              </h4>
                              <p className="text-xs text-cosmos-300 mt-1">
                                A severe thunderstorm is forecasted at 15:30. Outdoor activity violates comfort constraints. 
                                Found indoor alternative within 15 mins travel time and ₹160 budget delta.
                              </p>
                              <div className="flex items-center gap-3 mt-3">
                                <button onClick={acceptChanges} className="px-4 py-1.5 rounded-lg bg-sapphire-500 hover:bg-sapphire-400 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Accept AI Plan
                                </button>
                                <button onClick={() => { setChaosMode(false); setDiffView(false); }} className="px-4 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-white text-xs font-semibold transition-colors">
                                  Keep Original
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="divide-y divide-white/4">
                        {dayData.activities.map((act: any, i: number) => {
                          const Icon = act.icon || MapPin;
                          const isCancelled = act.status === "cancelled";
                          const isAdded = act.status === "added";
                          
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.07 }}
                              className={`flex items-center gap-4 px-5 py-4 transition-colors group ${
                                isCancelled ? "opacity-50" : 
                                isAdded ? "bg-sapphire-500/10 border-l-2 border-sapphire-400" : 
                                "hover:bg-white/2"
                              }`}
                            >
                              <div className="flex flex-col items-center w-12 shrink-0">
                                <span className={`text-xs font-mono leading-tight ${isCancelled ? 'line-through text-ember-400' : 'text-cosmos-400'}`}>
                                  {act.time}
                                </span>
                                {i < dayData.activities.length - 1 && (
                                  <div className="w-px flex-1 bg-cosmos-700 mt-1 min-h-[16px]" />
                                )}
                              </div>
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isCancelled ? "bg-ember-500/10 text-ember-500" :
                                act.tag === "aurora" ? "bg-aurora-500/15 text-aurora-400" :
                                act.tag === "ember" ? "bg-ember-500/15 text-ember-400" :
                                "bg-sapphire-500/15 text-sapphire-400"
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0 py-1">
                                <p className={`text-sm font-medium ${isCancelled ? 'line-through text-cosmos-500' : 'text-white'} truncate flex items-center gap-2`}>
                                  {act.name}
                                  {isAdded && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sapphire-500/20 text-sapphire-300 uppercase tracking-wider">AI Proposed</span>}
                                  {isCancelled && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-ember-500/20 text-ember-400 uppercase tracking-wider">Cancelled</span>}
                                </p>
                                <p className="text-xs text-cosmos-400 mt-0.5 flex items-center flex-wrap gap-x-2">
                                  <span>{act.type} · {act.duration}</span>
                                  {act.reason && (
                                    <span className={`flex items-center gap-1 ${isAdded ? 'text-sapphire-300' : 'text-ember-400'}`}>
                                      <ArrowRightLeft className="w-3 h-3" />
                                      {act.reason}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className={`text-sm font-medium ${isCancelled ? 'line-through text-cosmos-500' : 'text-white'}`}>
                                  {act.cost === 0 ? "Free" : `₹${act.cost}`}
                                </p>
                              </div>
                              {!isCancelled && <ChevronRight className="w-4 h-4 text-cosmos-600 group-hover:text-cosmos-400 transition-colors" />}
                            </motion.div>
                          );
                        })}
                        {dayData.activities.length === 0 && (
                          <div className="px-5 py-8 text-center text-cosmos-500 text-sm">
                            No activities scheduled for this day yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
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
                  {dynamicAlerts.map((alert, i) => {
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
                    <span className="text-white font-mono font-medium">₹{currentBudget.spent.toLocaleString()} / ₹{currentBudget.total.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-cosmos-700 overflow-hidden">
                    <div
                      className="h-full budget-bar"
                      style={{ width: `${(currentBudget.spent / currentBudget.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-cosmos-500">{Math.round((currentBudget.spent / currentBudget.total) * 100)}% used · ₹{(currentBudget.total - currentBudget.spent).toLocaleString()} remaining</p>
                </div>
                <div className="space-y-2.5">
                  {currentBudget.breakdown.map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-cosmos-400">{item.label}</span>
                        <span className="text-white font-mono">₹{item.amount.toLocaleString()}</span>
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

              {/* Map View */}
              <div className="glass-card rounded-2xl border border-white/8 overflow-hidden h-[300px]">
                <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Live Map Tracker</p>
                  <Map className="w-4 h-4 text-aurora-400" />
                </div>
                <GoogleMaps 
                  destination={itinerary?.destination} 
                  activities={dayData?.activities} 
                  className="h-[calc(300px-45px)] border-none rounded-none" 
                />
              </div>

              {/* Quick actions */}
              <div className="glass-card rounded-2xl border border-white/8 p-5 space-y-3">
                <p className="text-sm font-semibold text-white">Quick Actions</p>
                {[
                  { label: "Simulate Disruption", icon: RefreshCcw, color: "ember", action: triggerChaos },
                  { label: "Add activity", icon: Zap, color: "aurora" },
                  { label: "Find restaurants nearby", icon: Utensils, color: "ember" },
                  { label: "Book transfer", icon: Navigation, color: "sapphire" },
                ].map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={i}
                      onClick={action.action}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
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
              <button 
                onClick={() => setChatOpen(false)} 
                className="text-cosmos-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
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
                  aria-label="Send message"
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

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cosmos-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-aurora-400 mb-4" />
        <p className="text-cosmos-400">Loading Dashboard...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
