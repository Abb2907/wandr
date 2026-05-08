"use client";

import { Compass, Globe, Mail, Rss, Share2 } from "lucide-react";
import Link from "next/link";

const links = {
  Product: ["Features", "How It Works", "AI Agents", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press Kit", "Partners"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Settings", "GDPR", "Security"],
  Support: ["Help Center", "Contact Us", "Status Page", "API Docs", "Community"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-aurora-400 to-aurora-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span
                className="text-lg font-display font-bold text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Wandr
              </span>
            </div>
            <p className="text-sm text-cosmos-400 leading-relaxed max-w-xs">
              AI-powered travel planning that adapts in real-time. Your proactive
              travel companion before, during, and after every trip.
            </p>
            <div className="flex items-center gap-3">
            {[Share2, Globe, Mail, Rss].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center text-cosmos-400 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h4
                className="text-sm font-display font-semibold text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-cosmos-400 hover:text-cosmos-100 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-cosmos-500">
            © 2025 Wandr Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="status-dot" />
            <span className="text-xs text-cosmos-500 font-mono">All systems operational</span>
          </div>
          <p className="text-xs text-cosmos-600">
            Built with ♥ for curious travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
