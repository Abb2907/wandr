"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";

interface GoogleMapsProps {
  destination?: string;
  activities?: any[];
  className?: string;
}

export default function GoogleMaps({ destination, activities, className }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Google Maps loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/8 glass ${className}`}>
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cosmos-900/50 backdrop-blur-sm z-10">
          <Loader2 className="w-8 h-8 animate-spin text-aurora-400 mb-2" />
          <p className="text-xs text-cosmos-400 font-mono">Initializing Google Maps...</p>
        </div>
      ) : null}

      {/* Simulated Map Background */}
      <div className="absolute inset-0 bg-[#0b0e14] opacity-50">
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H800V600H0V0Z" fill="#131720" />
          <path d="M100 0V600M200 0V600M300 0V600M400 0V600M500 0V600M600 0V600M700 0V600" stroke="#1E232E" strokeWidth="0.5" />
          <path d="M0 100H800M0 200H800M0 300H800M0 400H800M0 500H800" stroke="#1E232E" strokeWidth="0.5" />
          {/* Main roads */}
          <path d="M0 250Q400 280 800 250" stroke="#2D3548" strokeWidth="4" />
          <path d="M350 0Q380 300 350 600" stroke="#2D3548" strokeWidth="4" />
        </svg>
      </div>

      {/* Markers */}
      {!loading && activities?.map((act, i) => (
        <div 
          key={i}
          className="absolute"
          style={{ 
            left: `${20 + (i * 15) % 60}%`, 
            top: `${30 + (i * 20) % 50}%` 
          }}
        >
          <div className="group relative flex flex-col items-center">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-aurora-500 text-cosmos-950 text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              {act.name}
            </div>
            <div className="w-8 h-8 rounded-full bg-aurora-500/20 border border-aurora-500/50 flex items-center justify-center animate-pulse">
              <MapPin className="w-4 h-4 text-aurora-400" />
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="px-3 py-1.5 rounded-lg glass-strong border border-white/10 text-[10px] text-cosmos-300 font-mono">
          {destination || "Bali, Indonesia"} · Google Maps Platform
        </div>
        <div className="flex gap-1">
          <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs">+</div>
          <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white text-xs">-</div>
        </div>
      </div>
    </div>
  );
}
