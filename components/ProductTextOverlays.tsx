"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Product } from "@/data/products";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

interface ProductTextOverlaysProps {
  scrollYProgress: MotionValue<number>;
  product: Product;
}

export default function ProductTextOverlays({
  scrollYProgress,
  product,
}: ProductTextOverlaysProps) {
  // Section 1: Hero entrance (0.00 to 0.22)
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.05, 0.15, 0.22], [1, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.22], [0, -60]);
  const scale1 = useTransform(scrollYProgress, [0.0, 0.22], [1, 0.95]);

  // Section 2: Left Callout (0.22 to 0.48)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.28, 0.40, 0.48], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.22, 0.28, 0.40, 0.48], [-60, 0, 0, -40]);

  // Section 3: Right Callout (0.48 to 0.74)
  const opacity3 = useTransform(scrollYProgress, [0.48, 0.54, 0.66, 0.74], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.48, 0.54, 0.66, 0.74], [60, 0, 0, 40]);

  // Section 4: Climax centered reveal - enters smoothly and stays persistently on screen
  const opacity4 = useTransform(scrollYProgress, [0.72, 0.80, 1.0], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.72, 0.80, 1.0], [50, 0, 0]);
  const scale4 = useTransform(scrollYProgress, [0.72, 0.80, 1.0], [0.94, 1, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 md:p-16 overflow-hidden">
      {/* SECTION 1: HERO TITLE & SUBTITLE */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="w-full h-full flex flex-col items-center justify-center text-center absolute inset-0 px-4"
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/60 md:bg-black/40 backdrop-blur-md border border-emerald-500/30 text-[10px] sm:text-xs md:text-sm font-medium tracking-wider sm:tracking-widest uppercase mb-3 sm:mb-4 text-white/90 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#008744] shadow-[0_0_8px_#008744]" />
          <span className="font-bold text-emerald-300 tracking-wider">STORIA</span>
          <span className="text-white/40">•</span>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
          <span>100% Real Fruit & Shakes</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)] leading-tight md:leading-none">
          {product.section1.title}
        </h1>

        <p className="mt-2 sm:mt-4 text-base sm:text-xl md:text-3xl font-light tracking-wide text-white/90 max-w-xl mx-auto drop-shadow-md px-2">
          {product.section1.subtitle}
        </p>

        {/* Scroll down prompt */}
        <div className="absolute bottom-20 sm:bottom-24 md:bottom-12 flex flex-col items-center gap-1.5 sm:gap-2 text-white/60 text-[10px] sm:text-xs tracking-widest uppercase animate-bounce">
          <span>Scroll to explore</span>
          <div className="w-4 h-7 rounded-full border border-white/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* SECTION 2: HIGHLIGHT (Top on Mobile, Left on Desktop) */}
      <motion.div
        style={{ opacity: opacity2, x: x2 }}
        className="absolute top-20 sm:top-24 md:top-1/3 left-4 right-4 md:right-auto md:left-16 lg:left-24 max-w-md mx-auto md:mx-0"
      >
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl bg-black/65 md:bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Pure Extraction</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {product.section2.title}
          </h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed font-light">
            {product.section2.subtitle}
          </p>
        </div>
      </motion.div>

      {/* SECTION 3: HIGHLIGHT (Bottom on Mobile, Right on Desktop) */}
      <motion.div
        style={{ opacity: opacity3, x: x3 }}
        className="absolute bottom-24 sm:bottom-28 md:bottom-auto md:top-1/3 left-4 right-4 md:left-auto md:right-16 lg:right-24 max-w-md mx-auto md:mx-0 text-left md:text-right flex flex-col items-start md:items-end"
      >
        <div className="p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl bg-black/65 md:bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl space-y-2 sm:space-y-3 text-left w-full">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Vitality Boost</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {product.section3.title}
          </h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed font-light">
            {product.section3.subtitle}
          </p>
          {/* Quick stats mini-bar */}
          <div className="pt-1.5 sm:pt-2 flex items-center gap-2 sm:gap-3">
            {product.stats.map((s, idx) => (
              <div
                key={idx}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-center flex-1 sm:flex-none"
              >
                <div className="text-[10px] sm:text-xs text-white/50">{s.label}</div>
                <div className="text-xs sm:text-sm font-bold text-white">{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 4: CLIMAX PUNCHLINE */}
      <motion.div
        style={{ opacity: opacity4, y: y4, scale: scale4 }}
        className="w-full h-full flex flex-col items-center justify-end pb-24 sm:pb-28 md:pb-24 text-center absolute inset-0 px-4"
      >
        <div className="p-5 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl bg-black/65 md:bg-black/50 backdrop-blur-2xl border border-white/20 shadow-2xl max-w-2xl w-full sm:w-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-tight md:leading-none">
            {product.section4.title}
          </h2>
          {product.section4.subtitle && (
            <p className="mt-2 sm:mt-3 text-xs sm:text-lg md:text-xl text-white/80 font-light">
              {product.section4.subtitle}
            </p>
          )}
          <div className="mt-3 sm:mt-4 flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
            {product.features.map((feat, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs font-medium text-white/90"
              >
                ✦ {feat}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
