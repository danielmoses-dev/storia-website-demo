"use client";

import React, { useState } from "react";
import { Send, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  return (
    <footer className="relative bg-neutral-950 border-t border-white/10 text-white overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 pb-10 sm:pb-16 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs sm:text-sm">
                100% Real Fruit & Pure Ingredients
              </h4>
              <p className="text-white/60 text-[11px] sm:text-xs">
                Honest sourcing with zero artificial colors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs sm:text-sm">
                Zero Added Preservatives
              </h4>
              <p className="text-white/60 text-[11px] sm:text-xs">
                Retaining original fruit nutrients and pure aroma.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs sm:text-sm">
                Chilled Cold-Chain Freshness
              </h4>
              <p className="text-white/60 text-[11px] sm:text-xs">
                Delivered under strict temperature protection.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 py-10 sm:py-16">
          {/* Column 1: Brand */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Storia"
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(0,135,68,0.4)]"
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-white">Storia</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">
                  Foods & Beverages
                </span>
              </div>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Crafting honest, wholesome shakes and cold-pressed juices made from
              pure real fruit, rich cocoa, and zero artificial shortcuts. Wholesome goodness for every moment.
            </p>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-500 pt-1 sm:pt-2 font-mono flex-wrap">
              <span>REAL FRUIT</span>
              <span>•</span>
              <span>HONEST TASTE</span>
              <span>•</span>
              <span>100% QUALITY</span>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90">
              Signature Shakes & Juices
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <a
                  href="#mango"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Storia Cream Mango Shake
                </a>
              </li>
              <li>
                <a
                  href="#chocolate"
                  className="hover:text-amber-600 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                  Storia Dutch Chocolate Shake
                </a>
              </li>
              <li>
                <a
                  href="#pomegranate"
                  className="hover:text-rose-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Storia Ruby Pomegranate Juice
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2 opacity-75"
                >
                  <span>Storia Discovery Pack (6x)</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2 opacity-75"
                >
                  <span>Monthly Fresh Subscription</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90">
              The Storia Promise
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-neutral-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Honest Ingredients Sourcing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cold-Chain Quality Control
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainable Packaging
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Nutrition Philosophy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Customer Care
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/90">
              Join The Storia Circle
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Receive seasonal harvest drops, wellness notes, and exclusive offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors pr-12"
                />
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#008744] hover:bg-emerald-600 text-white transition-colors flex items-center justify-center shadow-lg"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome to the Storia family! Honest goodness coming your way.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-neutral-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Storia Foods & Beverages Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Freshness
            </a>
            <a href="#" className="hover:text-white transition-colors">
              FSSAI & Quality Certifications
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
