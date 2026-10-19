"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";

interface NavbarProps {
  currentProduct: Product;
  onOrderClick?: () => void;
  cartCount?: number;
}

export default function Navbar({
  currentProduct,
  onOrderClick,
  cartCount = 0,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5 sm:py-3.5"
          : "bg-transparent border-b border-white/5 py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#"
          className="group flex items-center gap-2 sm:gap-3 cursor-pointer select-none"
        >
          <div className="relative p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/40">
            <img
              src="/logo.png"
              alt="Storia"
              className="h-8 sm:h-9 md:h-11 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(0,135,68,0.5)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-base sm:text-lg md:text-xl text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
              Storia
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold uppercase tracking-wider">
                Real
              </span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60 font-medium">
              100% Fruit & Shakes
            </span>
          </div>
        </a>

        {/* Current Flavor Badge (Desktop) */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
          <div
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: currentProduct.themeColor }}
          />
          <span className="text-xs font-semibold tracking-wide text-white/90">
            Current: {currentProduct.name}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
            {currentProduct.price}
          </span>
        </div>

        {/* Actions: Order Now with Storia Accent */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={onOrderClick}
            id="navbar-order-btn"
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-400 to-[#008744] rounded-full group-hover:opacity-100 transition-opacity duration-300 blur-[2px] opacity-80" />
            <span className="relative flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-full bg-neutral-950 font-semibold text-xs sm:text-sm text-white group-hover:bg-neutral-900 transition-colors shadow-xl">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              <span>Order Now</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
