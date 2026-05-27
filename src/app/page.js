"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import BentoGrid from "@/components/BentoGrid";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { personalInfo } from "@/data/portfolioData";

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5 text-center flex flex-col gap-2 font-mono text-xs text-zinc-600">
      <div className="flex justify-center gap-4 text-zinc-500 mb-2">
        <a href="/links" className="hover:text-white transition-colors">
          Linktree
        </a>
        <span>•</span>
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          GitHub
        </a>
        <span>•</span>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          LinkedIn
        </a>
        <span>•</span>
        <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          Twitter
        </a>
      </div>
      <p>© {new Date().getFullYear()} {personalInfo.name}. Todos os direitos reservados.</p>
      <p className="text-[10px] text-zinc-700">
        Construído com Next.js, TailwindCSS e Framer Motion. Inspirado em Apple, Vercel &amp; Linear.
      </p>
    </footer>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Global Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[100] shadow-md shadow-indigo-500/20"
        style={{ scaleX }}
      />

      {/* 1. Cinematic Loading Boot Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Custom Spring-smoothed Cursor */}
      <CustomCursor />

      {/* 3. Main Site Wrap */}
      <div className="min-h-screen bg-[#030303] text-foreground selection:bg-indigo-500/30 selection:text-white flex flex-col relative">
        {/* Global Navigation */}
        <FloatingNav />

        {/* Sections */}
        <main className="flex-grow flex flex-col w-full">
          {/* Hero Landing */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Bento Overview */}
          <BentoGrid />

          {/* Tech Stack Grid */}
          <TechStack />

          {/* Selected Projects */}
          <Projects />

          {/* Testimonials Carousel */}
          <Testimonials />

          {/* Education Roadmap */}
          <Education />

          {/* Contact Form */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
