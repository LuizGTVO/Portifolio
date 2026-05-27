"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration Switch: Set to true to enable the 4-second calibration freeze at 67%
const ENABLE_CALIBRATION_FREEZE = false;

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const [hasFrozen, setHasFrozen] = useState(false);

  useEffect(() => {
    // Lock scrolling while loader is visible
    document.body.style.overflow = "hidden";
    
    let timer;
    const interval = setInterval(() => {
      if (isFrozen) return; // Pause updates while calibration freeze is active

      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait slightly after 100% to slide up
          setTimeout(() => {
            onComplete();
            document.body.style.overflow = "unset";
          }, 400);
          return 100;
        }

        // Intercept at 67% if enabled and we haven't frozen yet
        if (ENABLE_CALIBRATION_FREEZE && prev < 67 && !hasFrozen) {
          const nextVal = prev + Math.floor(Math.random() * 3) + 1;
          if (nextVal >= 67) {
            setIsFrozen(true);
            // Trigger 4-second freeze unblocker
            timer = setTimeout(() => {
              setIsFrozen(false);
              setHasFrozen(true);
            }, 4000);
            return 67;
          }
          return nextVal;
        }
        
        // Regular progression from 67% to 100%
        const increment = prev > 75 
          ? Math.floor(Math.random() * 10) + 5 
          : Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 35);

    return () => {
      clearInterval(interval);
      if (timer) clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete, isFrozen, hasFrozen]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Smooth slide-up transition
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col justify-between p-8 md:p-12 font-mono text-zinc-500 pointer-events-auto select-none"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-start text-[10px] tracking-widest uppercase">
        <span>PORTFOLIO OS v3.0</span>
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isFrozen ? "bg-amber-500 animate-ping" : "bg-indigo-500 animate-ping"}`} />
          {isFrozen ? "CALIBRATING CORE" : "SYSTEM BOOTING"}
        </span>
      </div>

      {/* Center Stylized "67" Animation (Only renders during the 10-second freeze) */}
      <AnimatePresence>
        {isFrozen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
          >
            <div className="relative flex flex-col items-center">
              {/* Glowing indigo backdrop halo */}
              <div className="absolute inset-0 w-72 h-72 rounded-full bg-indigo-500/10 blur-[80px] -translate-y-8" />
              
              <h2 className="flex items-center text-[9rem] md:text-[14rem] font-black tracking-tighter leading-none select-none relative z-10 filter drop-shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                <motion.span
                  animate={{ y: [0, -16, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-500 block"
                >
                  6
                </motion.span>
                <motion.span
                  animate={{ y: [0, 16, -16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-500 block"
                >
                  7
                </motion.span>
              </h2>
              <span className="block text-[8px] font-mono text-zinc-500 tracking-[0.4em] uppercase text-center mt-4 relative z-10 animate-pulse">
                SYSTEM CALIBRATION IN PROGRESS
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Middle Label (Fades down slightly if frozen to avoid overlap) */}
      <div className={`flex flex-col gap-1 max-w-md transition-opacity duration-500 ${isFrozen ? "opacity-20" : "opacity-100"}`}>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white text-xl md:text-2xl font-black tracking-tight font-sans"
        >
          LUIZ GUSTAVO
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs uppercase tracking-widest font-sans"
        >
          Full Stack Developer
        </motion.p>
      </div>

      {/* Bottom Progress */}
      <div className="flex justify-between items-end border-t border-white/5 pt-4">
        <span className="text-[9px] text-zinc-700 tracking-wider">EST. CARAGUATATUBA, SP</span>
        <div className="text-right flex items-baseline gap-2">
          {isFrozen && (
            <span className="text-[10px] text-amber-500/80 animate-pulse font-mono uppercase tracking-widest">
              LOCKED
            </span>
          )}
          <span className={`text-4xl md:text-6xl font-black font-mono tabular-nums leading-none transition-colors duration-300 ${isFrozen ? "text-amber-500" : "text-white"}`}>
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
