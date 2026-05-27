"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animations for the lagging outer circle
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Spring animations for the fast center dot
  const dotSpringConfig = { damping: 15, stiffness: 600 };
  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);

  // Spring animations for the slow-lagging ambient glow trail
  const glowSpringConfig = { damping: 50, stiffness: 90 };
  const glowXSpring = useSpring(cursorX, glowSpringConfig);
  const glowYSpring = useSpring(cursorY, glowSpringConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // Centered offset for 32px ring
      cursorY.set(e.clientY - 16);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <div className="hidden md:block">
      {/* 1. Slow Lagging Ambient Cursor Glow Trail */}
      <motion.div
        className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full bg-indigo-500/5 via-purple-500/5 to-transparent blur-3xl pointer-events-none z-30"
        style={{
          x: glowXSpring,
          y: glowYSpring,
          translateX: -84, // Centering 200px glow on 32px cursor area center (100 - 16)
          translateY: -84,
        }}
      />
      {/* Lagging Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* Fast Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          // Shift offset for 6px dot inside 32px cursor area
          translateX: 13,
          translateY: 13,
        }}
      />
    </div>
  );
}
