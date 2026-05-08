"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cosmos-800 via-cosmos-900 to-cosmos-800" />
          <div className="absolute inset-0 bg-gradient-to-r from-aurora-500/10 via-transparent to-ember-500/10" />
          <div className="absolute inset-0 dot-grid opacity-20" />

          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-aurora-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-ember-500/12 blur-3xl pointer-events-none" />

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-white/8" />

          <div className="relative z-10 text-center px-8 py-16 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-aurora-500/25">
              <Sparkles className="w-3.5 h-3.5 text-aurora-400" />
              <span className="text-xs font-medium text-aurora-300">Start your first trip free — no credit card</span>
            </div>

            <h2
              className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Your next adventure
              <br />
              <span className="gradient-aurora">starts in 4 seconds</span>
            </h2>

            <p className="text-cosmos-300 text-lg max-w-lg mx-auto leading-relaxed">
              Join 2.4 million travelers who plan smarter, spend less, and
              experience more with Wandr&apos;s AI travel engine.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/planner"
                className="group flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base text-cosmos-950 bg-aurora-400 hover:bg-aurora-300 transition-all duration-300 shadow-2xl shadow-aurora-500/40 hover:-translate-y-1"
              >
                <Sparkles className="w-4 h-4" />
                Plan My Trip
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-7 py-4 rounded-full text-base font-medium text-cosmos-200 glass border border-white/10 hover:border-white/20 hover:text-white transition-all"
              >
                Explore the app
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-4">
              {[
                { value: "Free forever", label: "Explorer plan" },
                { value: "No card needed", label: "To get started" },
                { value: "Cancel anytime", label: "Paid plans" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                  <p className="text-xs text-cosmos-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
