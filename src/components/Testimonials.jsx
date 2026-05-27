"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/portfolioData";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for Left/Prev, 1 for Right/Next
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Mouse spotlight tracking inside card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Slide navigation
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Autoplay effect - pauses when hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [isHovered, currentIndex]);

  // Framer motion variants for sliding transition
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : dir < 0 ? -100 : 0,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : dir < 0 ? 100 : 0,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    }),
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 px-4 w-full max-w-4xl mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">DEPOIMENTOS</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
          Recomendações &amp; Feedbacks
        </h3>
      </div>

      {/* Carousel Container */}
      <div className="relative flex flex-col items-center">
        
        {/* Main Animated Card Wrap */}
        <div 
          className="w-full relative min-h-[300px] md:min-h-[260px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(e, info) => {
                const threshold = 55;
                if (info.offset.x < -threshold) {
                  handleNext();
                } else if (info.offset.x > threshold) {
                  handlePrev();
                }
              }}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className="w-full rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden select-none hover:border-white/10 transition-colors duration-300"
            >
              {/* Card mouse spotlight glow */}
              <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Branded glow accent */}
              <div className={`absolute -top-40 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-b ${activeTestimonial.color} blur-[80px] pointer-events-none -z-10`} />

              {/* Top Quote Decoration */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-10 h-10 text-indigo-500/20" />
                <span className="text-[10px] font-mono text-zinc-600 tracking-wider uppercase">Recomendação</span>
              </div>

              {/* Quote Content */}
              <blockquote className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-light mb-8 italic">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* User Bio Footer */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="w-12 h-12 rounded-full border border-white/10 object-cover pointer-events-none"
                />
                <div>
                  <cite className="not-italic text-sm font-bold text-white block">
                    {activeTestimonial.name}
                  </cite>
                  <span className="text-xs text-zinc-500 font-mono block mt-0.5">
                    {activeTestimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons and Dots indicator */}
        <div className="flex items-center justify-between w-full mt-8 max-w-xs gap-6">
          
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/5 text-zinc-400 hover:text-white transition-all duration-300 hover:border-white/10 active:scale-95"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots group */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const dir = idx > currentIndex ? 1 : -1;
                  setDirection(dir);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-indigo-500" : "w-2 bg-zinc-800 hover:bg-zinc-700"
                }`}
                aria-label={`Ir para depoimento ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/5 text-zinc-400 hover:text-white transition-all duration-300 hover:border-white/10 active:scale-95"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </section>
  );
}
