"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  Leaf,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";

import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import Footer from "@/components/Footer";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPack, setSelectedPack] = useState<"single" | "pack6" | "pack12">("single");
  const [cartCount, setCartCount] = useState<number>(0);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const currentProduct: Product = products[currentIndex];

  // Switch flavor safely
  const handlePrevFlavor = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNextFlavor = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const handleSelectFlavor = (index: number) => {
    setCurrentIndex(index);
  };

  // Scroll Reset on Flavor Switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  // Dynamically set CSS variables for background gradient & theme color
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(
        "--product-gradient",
        currentProduct.gradient
      );
      document.documentElement.style.setProperty(
        "--theme-color",
        currentProduct.themeColor
      );
      document.body.style.background = currentProduct.gradient;
    }
  }, [currentProduct]);

  // Trigger celebration on Add To Cart or Order Now
  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartCount((prev) => prev + quantity);
    setAddedAnimation(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.75 },
        colors: [currentProduct.themeColor, "#ffffff", "#f97316", "#fde047"],
      });
    } catch {
      // safe fallback if canvas-confetti context not yet mounted
    }

    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const scrollToCommerce = () => {
    const el = document.getElementById("buy-now-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-white select-none overflow-x-clip font-sans">
      {/* Dynamic Ambient Background Aura */}
      <div
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 -z-10 opacity-70"
        style={{
          background: `radial-gradient(1200px circle at 50% 20%, ${currentProduct.themeColor}30, #0a0a0c 90%)`,
        }}
      />

      {/* Global Navbar */}
      <Navbar
        currentProduct={currentProduct}
        onOrderClick={scrollToCommerce}
        cartCount={cartCount}
      />

      {/* Main Animated Flavor Stage */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="relative w-full"
        >
          {/* 1. SCROLL ENGINE: Canvas 120-frame animation + 4 text overlays */}
          <ProductBottleScroll product={currentProduct} />

          {/* 2. PRODUCT DETAILS SECTION */}
          <section
            id="product-details-section"
            className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left narrative */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>The Storia Promise • Honest Sourcing</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] md:leading-[1.08] text-white">
                  {currentProduct.detailsSection.title}
                </h2>

                <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  {currentProduct.detailsSection.description}
                </p>

                {/* 3 Core Stats Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 sm:pt-4">
                  {currentProduct.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all text-center"
                    >
                      <span className="block text-xl sm:text-2xl md:text-3xl font-black text-white">
                        {stat.val}
                      </span>
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/50 font-medium">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
                  {currentProduct.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/40 border border-white/10 text-xs md:text-sm font-medium text-white/90 backdrop-blur-md"
                    >
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right visual card with glass badge */}
              <div className="lg:col-span-5 relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-5 sm:p-8 md:p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 shadow-2xl space-y-4 sm:space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: currentProduct.themeColor }}
                    >
                      <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-950" />
                    </div>
                    <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#008744]/20 border border-[#008744]/40 text-emerald-300 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Storia Verified Purity</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                    Uncompromised Goodness
                  </h3>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                    At Storia, every batch is made with honesty. We never use
                    reconstituted shortcuts, artificial colors, or chemical preservatives.
                    Only real fruits, authentic ingredients, and pure taste.
                  </p>

                  <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4 border-t border-white/10 text-[11px] sm:text-xs text-white/80">
                    <div className="flex justify-between py-1">
                      <span className="text-white/50">Processing Technique</span>
                      <span className="font-semibold text-white">
                        Cold Isostatic HPP (6,000 bar)
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-white/50">Temperature Control</span>
                      <span className="font-semibold text-white">
                        Strict 4°C Cold-Chain
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-white/50">Bottle Material</span>
                      <span className="font-semibold text-white">
                        100% Recycled & BPA-Free
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* 3. FRESHNESS SECTION (Farm to Bottle) */}
          <section
            id="freshness-section"
            className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-3xl bg-neutral-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Background accent ring */}
              <div
                className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-40"
                style={{ backgroundColor: currentProduct.themeColor }}
              />

              <div className="max-w-3xl space-y-4 sm:space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Bio-Active Nutrient Retention</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
                  {currentProduct.freshnessSection.title}
                </h2>

                <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                  {currentProduct.freshnessSection.description}
                </p>

                {/* 3 step process pipeline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[10px] sm:text-xs font-mono text-orange-400">01 / ORCHARD</span>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Sun-Ripened</h4>
                    <p className="text-white/60 text-[11px] sm:text-xs">Hand-harvested at peak brix levels.</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[10px] sm:text-xs font-mono text-amber-400">02 / HYDRAULIC</span>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Gentle Press</h4>
                    <p className="text-white/60 text-[11px] sm:text-xs">Zero friction heat, zero bitterness.</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                    <span className="text-[10px] sm:text-xs font-mono text-pink-400">03 / HPP WATER</span>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Hyperbaric Seal</h4>
                    <p className="text-white/60 text-[11px] sm:text-xs">Preserved fresh with water pressure.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 4. BUY NOW / COMMERCE SECTION */}
          <section
            id="buy-now-section"
            className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-3xl bg-neutral-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Product Info & Pricing */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                      Storia Official
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                      Fresh Batch Dispatch
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                    {currentProduct.name}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/70 font-light">
                    {currentProduct.subName} • {currentProduct.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
                    {currentProduct.buyNowSection.price}
                  </span>
                  <span className="text-white/60 text-sm sm:text-base font-light">
                    {currentProduct.buyNowSection.unit}
                  </span>
                </div>

                {/* Pack Selection */}
                <div className="space-y-2.5 sm:space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Select Quantity Bundle:
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <button
                      onClick={() => setSelectedPack("single")}
                      className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all ${
                        selectedPack === "single"
                          ? "bg-white/15 border-orange-400 shadow-lg shadow-orange-500/10"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-white/70"
                      }`}
                    >
                      <div className="text-[10px] sm:text-xs text-white/50">Taster</div>
                      <div className="font-bold text-white text-xs sm:text-sm">Single Bottle</div>
                      <div className="text-[10px] sm:text-xs text-orange-400 font-mono mt-0.5 sm:mt-1">
                        {currentProduct.price}
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedPack("pack6")}
                      className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all relative ${
                        selectedPack === "pack6"
                          ? "bg-white/15 border-orange-400 shadow-lg shadow-orange-500/10"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-white/70"
                      }`}
                    >
                      <span className="absolute -top-2 right-1.5 sm:right-2 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-orange-500 text-[8px] sm:text-[10px] font-bold text-white uppercase">
                        Popular
                      </span>
                      <div className="text-[10px] sm:text-xs text-white/50">Weekly</div>
                      <div className="font-bold text-white text-xs sm:text-sm">Pack of 6</div>
                      <div className="text-[10px] sm:text-xs text-emerald-400 font-mono mt-0.5 sm:mt-1">
                        Save 10%
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedPack("pack12")}
                      className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all ${
                        selectedPack === "pack12"
                          ? "bg-white/15 border-orange-400 shadow-lg shadow-orange-500/10"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-white/70"
                      }`}
                    >
                      <div className="text-[10px] sm:text-xs text-white/50">Stock Up</div>
                      <div className="font-bold text-white text-xs sm:text-sm">Case of 12</div>
                      <div className="text-[10px] sm:text-xs text-emerald-400 font-mono mt-0.5 sm:mt-1">
                        Save 20%
                      </div>
                    </button>
                  </div>
                </div>

                {/* Processing Parameters Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                  {currentProduct.buyNowSection.processingParams.map((param, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-semibold text-white/80"
                    >
                      ⚡ {param}
                    </span>
                  ))}
                </div>
              </div>

              {/* Purchase Actions & Guarantees */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6 lg:border-l lg:border-white/10 lg:pl-10">
                {/* Quantity incrementor */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Units:
                  </label>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center rounded-xl sm:rounded-2xl bg-white/10 border border-white/15 p-1">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 sm:w-12 text-center font-bold text-base sm:text-lg text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-white/60">
                      Fresh batch bottled daily.
                    </div>
                  </div>
                </div>

                {/* Big Add To Cart & Instant Checkout */}
                <div className="space-y-3 pt-1 sm:pt-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    id="add-to-cart-btn"
                    className="w-full relative group overflow-hidden py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg text-neutral-950 flex items-center justify-center gap-2.5 sm:gap-3 transition-transform duration-200 shadow-xl"
                    style={{ backgroundColor: currentProduct.themeColor }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ShoppingBag className="w-5 h-5" />
                    <span>
                      {addedAnimation ? "Added to Fresh Bag! ✓" : `Order ${currentProduct.name}`}
                    </span>
                  </motion.button>
                </div>

                {/* Trust and Delivery Promises */}
                <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4 border-t border-white/10 text-xs text-white/75">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Truck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>{currentProduct.buyNowSection.deliveryPromise}</span>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{currentProduct.buyNowSection.returnPolicy}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 5. NEXT FLAVOR BUTTON (Large slanted-edge CTA) */}
          <section className="relative py-12 sm:py-16 md:py-20 px-4 max-w-5xl mx-auto z-20 text-center">
            {(() => {
              const nextIndex = (currentIndex + 1) % products.length;
              const nextProduct = products[nextIndex];
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-3 sm:space-y-4"
                >
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-mono">
                    Continue The Tasting Voyage
                  </span>

                  <button
                    onClick={handleNextFlavor}
                    id="next-flavor-cta-btn"
                    className="relative group inline-flex items-center gap-3 sm:gap-4 px-6 py-4 sm:px-10 sm:py-6 md:px-14 md:py-8 rounded-2xl sm:rounded-3xl bg-neutral-950 border border-white/20 hover:border-white/40 transition-all duration-300 shadow-2xl hover:scale-105 transform -skew-x-3 w-full sm:w-auto justify-between sm:justify-center"
                  >
                    <div
                      className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity rounded-2xl sm:rounded-3xl blur-xl"
                      style={{ backgroundColor: nextProduct.themeColor }}
                    />

                    <div className="flex flex-col items-start skew-x-3 text-left">
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60 font-medium">
                        Next Flavor
                      </span>
                      <span className="text-xl sm:text-2xl md:text-4xl font-black text-white">
                        {nextProduct.name}
                      </span>
                    </div>

                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-neutral-950 skew-x-3 transition-transform group-hover:translate-x-2"
                      style={{ backgroundColor: nextProduct.themeColor }}
                    >
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </button>
                </motion.div>
              );
            })()}
          </section>
        </motion.main>
      </AnimatePresence>

      {/* FLOATING NAVIGATION CONTROLS */}

      {/* Fixed Left Flavor Arrow */}
      <motion.button
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrevFlavor}
        id="nav-flavor-prev"
        aria-label="Previous Flavor"
        className="fixed left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white shadow-2xl transition-all"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
      </motion.button>

      {/* Fixed Right Flavor Arrow */}
      <motion.button
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextFlavor}
        id="nav-flavor-next"
        aria-label="Next Flavor"
        className="fixed right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white shadow-2xl transition-all"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
      </motion.button>

      {/* Fixed Bottom-Center Pill Menu to jump to specific flavors */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1rem)] sm:max-w-none">
        <motion.nav
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-neutral-950/85 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-x-auto"
        >
          {products.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectFlavor(idx)}
                className={`relative px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {/* Active indicator pill behind text */}
                {isActive && (
                  <motion.div
                    layoutId="active-flavor-pill"
                    className="absolute inset-0 rounded-full bg-white/20 border border-white/20 backdrop-blur-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full z-10 transition-transform"
                  style={{
                    backgroundColor: item.themeColor,
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                  }}
                />
                <span className="z-10 hidden sm:inline">{item.name}</span>
                <span className="z-10 sm:hidden">
                  {item.name.replace("Cream ", "").replace("Dutch ", "").replace("Ruby ", "")}
                </span>
              </button>
            );
          })}
        </motion.nav>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
