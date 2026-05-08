"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Plane, MapPin, Sparkles, Zap, Globe, Brain, Shield, TrendingUp,
  ArrowRight, ChevronDown, Star, Users, Clock, DollarSign,
  Sun, Cloud, Navigation, Bell, Heart, Camera, Coffee, Mountain,
  Waves, Building2, Utensils, Music, Compass, BarChart3, MessageSquare,
  ChevronRight, Play, Check, X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PersonasSection from "@/components/sections/PersonasSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AgentsSection from "@/components/sections/AgentsSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cosmos-950">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PersonasSection />
      <HowItWorksSection />
      <AgentsSection />
      <SocialProofSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
