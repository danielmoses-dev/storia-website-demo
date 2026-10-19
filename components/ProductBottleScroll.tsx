"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useScroll } from "framer-motion";
import { Product, products } from "@/data/products";
import ProductTextOverlays from "./ProductTextOverlays";

interface ProductBottleScrollProps {
  product: Product;
}

// Global persistent in-memory image cache across flavor switches
// Ensures previously visited flavors load in 0 milliseconds
const globalFrameCache: Record<string, HTMLImageElement[]> = {};
const globalLoadedSets: Record<string, Set<number>> = {};

// Background prefetcher for adjacent products
function prefetchProductFrames(folderPath: string, totalCount: number, priorityOnly = true) {
  if (!globalFrameCache[folderPath]) {
    globalFrameCache[folderPath] = new Array(totalCount);
  }
  if (!globalLoadedSets[folderPath]) {
    globalLoadedSets[folderPath] = new Set<number>();
  }

  const images = globalFrameCache[folderPath];
  const loadedSet = globalLoadedSets[folderPath];

  // Priority stride 4 for keyframes (instant playable base)
  const indices: number[] = [];
  if (priorityOnly) {
    for (let i = 1; i <= totalCount; i += 4) {
      if (!loadedSet.has(i)) indices.push(i);
    }
    if (!loadedSet.has(totalCount)) indices.push(totalCount);
  } else {
    for (let i = 1; i <= totalCount; i++) {
      if (!loadedSet.has(i)) indices.push(i);
    }
  }

  indices.forEach((frameNum) => {
    const idx = frameNum - 1;
    if (images[idx] && images[idx].complete) return;

    const img = new Image();
    img.src = `${folderPath}/${frameNum}.webp`;
    img.onload = () => {
      loadedSet.add(frameNum);
      images[idx] = img;
    };
    img.onerror = () => {
      // Fallback to PNG if WebP fails
      img.onerror = null;
      img.src = `${folderPath}/${frameNum}.png`;
      img.onload = () => {
        loadedSet.add(frameNum);
        images[idx] = img;
      };
    };
    images[idx] = img;
  });
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const totalFrames = product.totalFrames || 240;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Hook into scroll progress across the h-[200vh] wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Render a specific frame onto the responsive canvas with "contain" fit
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (displayWidth === 0 || displayHeight === 0) return;

      // Adjust internal buffer size to match display size * DPR for crisp rendering
      const targetWidth = Math.floor(displayWidth * dpr);
      const targetHeight = Math.floor(displayHeight * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      const images = imagesRef.current;
      let img = images[frameIndex];

      // Instant Nearest-frame lookup: if target frame is downloading, draw closest available frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = images[frameIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = images[frameIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        // "contain" fit calculation
        const hRatio = displayWidth / imgWidth;
        const vRatio = displayHeight / imgHeight;
        const ratio = Math.min(hRatio, vRatio);

        const renderWidth = imgWidth * ratio;
        const renderHeight = imgHeight * ratio;
        const renderX = (displayWidth - renderWidth) / 2;
        const renderY = (displayHeight - renderHeight) / 2;

        ctx.drawImage(img, renderX, renderY, renderWidth, renderHeight);
      } else {
        // Fallback procedural bottle visualization if image frames are not found
        drawProceduralBottle(ctx, displayWidth, displayHeight, product, frameIndex, totalFrames);
      }

      ctx.restore();
    },
    [product, totalFrames]
  );

  // Procedural artistic fallback for flavors awaiting custom frame sequences
  const drawProceduralBottle = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    prod: Product,
    frame: number,
    framesCount: number
  ) => {
    const cx = w / 2;
    const cy = h / 2;
    const bw = Math.min(w * 0.28, 220);
    const bh = bw * 2.8;

    // Glowing background aura
    const aura = ctx.createRadialGradient(cx, cy, 20, cx, cy, bw * 1.8);
    aura.addColorStop(0, prod.themeColor + "66");
    aura.addColorStop(0.6, prod.themeColor + "1a");
    aura.addColorStop(1, "transparent");
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, w, h);

    // Dynamic rotation & float based on frame
    const floatY = Math.sin((frame / framesCount) * Math.PI * 4) * 15;
    const tilt = Math.cos((frame / framesCount) * Math.PI * 2) * 0.05;

    ctx.save();
    ctx.translate(cx, cy + floatY);
    ctx.rotate(tilt);

    // Bottle Glass Body
    const bottleGrad = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
    bottleGrad.addColorStop(0, "rgba(255,255,255,0.4)");
    bottleGrad.addColorStop(0.2, prod.themeColor + "dd");
    bottleGrad.addColorStop(0.8, prod.themeColor + "ff");
    bottleGrad.addColorStop(1, "rgba(255,255,255,0.2)");

    ctx.fillStyle = bottleGrad;
    ctx.beginPath();
    ctx.roundRect(-bw * 0.2, -bh * 0.55, bw * 0.4, bh * 0.18, [12, 12, 0, 0]);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(-bw * 0.22, -bh * 0.6, bw * 0.44, bh * 0.08);
    ctx.fillStyle = bottleGrad;
    ctx.roundRect(-bw / 2, -bh * 0.4, bw, bh * 0.85, 36);
    ctx.fill();

    const reflex = ctx.createLinearGradient(-bw / 2, 0, -bw / 4, 0);
    reflex.addColorStop(0, "rgba(255,255,255,0.45)");
    reflex.addColorStop(1, "rgba(255,255,255,0.0)");
    ctx.fillStyle = reflex;
    ctx.roundRect(-bw * 0.45, -bh * 0.38, bw * 0.15, bh * 0.8, 10);
    ctx.fill();

    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.roundRect(-bw * 0.4, -bh * 0.12, bw * 0.8, bh * 0.3, 16);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${Math.round(bw * 0.13)}px Outfit, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("STORIA", 0, -bh * 0.02);

    ctx.fillStyle = prod.themeColor;
    ctx.font = `600 ${Math.round(bw * 0.09)}px Outfit, sans-serif`;
    ctx.fillText(prod.name.toUpperCase(), 0, bh * 0.08);

    ctx.restore();
  };

  // 3-Tier Multi-Priority Preloader + Global Memory Cache
  useEffect(() => {
    let isCancelled = false;

    // 1. Initialize or retrieve persistent cache array for this product
    if (!globalFrameCache[product.folderPath]) {
      globalFrameCache[product.folderPath] = new Array(totalFrames);
    }
    if (!globalLoadedSets[product.folderPath]) {
      globalLoadedSets[product.folderPath] = new Set<number>();
    }

    const images = globalFrameCache[product.folderPath];
    const loadedSet = globalLoadedSets[product.folderPath];
    imagesRef.current = images;

    // Helper to load an individual frame
    const loadFrame = (frameNum: number, onComplete?: () => void) => {
      const idx = frameNum - 1;
      if (images[idx] && images[idx].complete) {
        if (onComplete) onComplete();
        return;
      }

      const img = new Image();
      img.src = `${product.folderPath}/${frameNum}.webp`;

      img.onload = () => {
        if (isCancelled) return;
        loadedSet.add(frameNum);
        images[idx] = img;
        if (onComplete) onComplete();
      };

      img.onerror = () => {
        if (isCancelled) return;
        img.onerror = null;
        img.src = `${product.folderPath}/${frameNum}.png`;
        img.onload = () => {
          if (isCancelled) return;
          loadedSet.add(frameNum);
          images[idx] = img;
          if (onComplete) onComplete();
        };
      };

      images[idx] = img;
    };

    // TIER 1: Load Frame 1 immediately for instant hero display
    loadFrame(1, () => {
      if (!isCancelled && currentFrameRef.current === 0) {
        drawFrame(0);
      }
    });

    // TIER 2: Load Keyframes with stride 4 (60 keyframes total across full 360 timeline)
    // Makes the entire scroll animation playable in under ~100ms
    const keyframes: number[] = [];
    for (let i = 5; i <= totalFrames; i += 4) {
      keyframes.push(i);
    }
    if (!keyframes.includes(totalFrames)) keyframes.push(totalFrames);

    keyframes.forEach((fn) => {
      loadFrame(fn, () => {
        if (!isCancelled) {
          drawFrame(currentFrameRef.current);
        }
      });
    });

    // TIER 3: Fill in all remaining in-between frames in background
    const inBetweenFrames: number[] = [];
    for (let i = 2; i <= totalFrames; i++) {
      if (i % 4 !== 1 && i !== totalFrames) {
        inBetweenFrames.push(i);
      }
    }

    // Schedule remaining frames without blocking main thread
    const idleId = typeof window !== "undefined" && "requestIdleCallback" in window
      ? (window as any).requestIdleCallback(() => {
          inBetweenFrames.forEach((fn) => loadFrame(fn));
        })
      : setTimeout(() => {
          inBetweenFrames.forEach((fn) => loadFrame(fn));
        }, 100);

    // TIER 4: Background prefetch keyframes for all other flavors
    // So switching flavors is instantaneous
    const prefetchTimeout = setTimeout(() => {
      products.forEach((p) => {
        if (p.folderPath !== product.folderPath) {
          prefetchProductFrames(p.folderPath, p.totalFrames || 240, true);
        }
      });
    }, 300);

    // Initial draw (draws cached frame or keyframe immediately)
    drawFrame(currentFrameRef.current);

    return () => {
      isCancelled = true;
      if (typeof window !== "undefined" && "cancelIdleCallback" in window && idleId) {
        (window as any).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
      clearTimeout(prefetchTimeout);
    };
  }, [product.folderPath, totalFrames, drawFrame]);

  // RequestAnimationFrame scroll binding
  useEffect(() => {
    const handleScrollUpdate = (latest: number) => {
      const clamped = Math.min(1, Math.max(0, latest));
      // Calibrate so all frames complete by 95% of the hero scroll
      const normalized = Math.min(1, clamped / 0.95);
      const targetFrame = Math.min(
        totalFrames - 1,
        Math.floor(normalized * totalFrames)
      );

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        animationFrameIdRef.current = requestAnimationFrame(() => {
          drawFrame(targetFrame);
        });
      }
    };

    // Subscribe to framer-motion scroll progress
    const unsubscribe = scrollYProgress.on("change", handleScrollUpdate);

    // Initial render
    drawFrame(currentFrameRef.current);

    // Resize listener for responsive canvas contain fit
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [scrollYProgress, totalFrames, drawFrame]);

  return (
    <div
      ref={containerRef}
      id="scroll-engine-container"
      className="relative h-[200vh] w-full"
    >
      {/* Sticky Div (100vh / 100dvh on mobile) */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Glow matching current flavor */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-700 opacity-60"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.themeColor}33 0%, rgba(0,0,0,0.85) 85%)`,
          }}
        />

        {/* Ambient Floating Particle or Light Accent */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: `${product.themeColor}26` }}
        />

        {/* Canvas Engine */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full object-contain pointer-events-none select-none max-w-7xl mx-auto"
        />

        {/* Sync Text Overlays (Framer Motion 4-stage fades) */}
        <ProductTextOverlays
          scrollYProgress={scrollYProgress}
          product={product}
        />

        {/* Vertical Scroll Progress Pill on Right Edge */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2 z-20">
          <div className="w-1 h-32 rounded-full bg-white/10 relative overflow-hidden backdrop-blur-sm">
            <div
              className="w-full bg-gradient-to-b from-white via-orange-400 to-amber-300 rounded-full transition-all duration-75"
              style={{
                height: `${Math.round(
                  ((currentFrameRef.current + 1) / totalFrames) * 100
                )}%`,
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-white/40">
            {String(currentFrameRef.current + 1).padStart(3, "0")} / {totalFrames}
          </span>
        </div>
      </div>
    </div>
  );
}
