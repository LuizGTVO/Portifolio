"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

const GithubIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// High-fidelity 3D Tilting VS Code CodeCard component
function CodeCard() {
  const cardRef = useRef(null);
  const [typedCode, setTypedCode] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const codeText = `"use client";

import { Developer } from 'luiz-gustavo';

export default function Profile() {
  return {
    name: "Luiz Gustavo O. Menino",
    role: "Full Stack Developer",
    location: "Caraguatatuba, SP",
    skills: [
      "React", "Next.js", 
      "TailwindCSS", "Node.js"
    ],
    status: "Building the future of web apps"
  };
}`;

  // Typing simulator loop
  useEffect(() => {
    let isMounted = true;
    let index = 0;
    
    const timeout = setTimeout(() => {
      if (isMounted) setTypedCode("");
    }, 0);

    const interval = setInterval(() => {
      if (!isMounted) return;
      index++;
      setTypedCode(codeText.slice(0, index));
      if (index >= codeText.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (isMounted) setResetKey((prev) => prev + 1);
        }, 10000); // Wait 10 seconds before typing again
      }
    }, 15);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [resetKey, codeText]);

  // Card 3D tilt tracking
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Tilt calculations (-10 to 10 degrees)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rX = (mouseY / height) * -10;
    const rY = (mouseX / width) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.01, 1.01, 1.01)`;
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // Custom high-performance regex code highlighter
  const highlightCode = (code) => {
    let escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Keywords (purple)
    escaped = escaped.replace(
      /\b(import|from|export|default|function|return|const)\b/g,
      '<span class="text-purple-400 font-semibold">$1</span>'
    );

    // Strings (green)
    escaped = escaped.replace(
      /(["'])(.*?)\1/g,
      '<span class="text-emerald-400">"$2"</span>'
    );

    // Brackets & Braces (yellow)
    escaped = escaped.replace(
      /([{}()[\]])/g,
      '<span class="text-amber-400">$1</span>'
    );

    // Numbers & Booleans (orange)
    escaped = escaped.replace(
      /\b(\d+|true|false)\b/g,
      '<span class="text-orange-400">$1</span>'
    );

    // Object Keys (blue/cyan)
    escaped = escaped.replace(
      /\b(name|role|location|skills|status):/g,
      '<span class="text-sky-400">$1</span>:'
    );

    return <span dangerouslySetInnerHTML={{ __html: escaped }} />;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative w-full max-w-md rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.08)] select-none overflow-hidden transition-all duration-300 ease-out"
    >
      {/* Light spotlight reflection on hover */}
      <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card Header (Mac Traffic Lights & Filename) */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#08080c]/50 border-b border-white/5 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f7df1e]" />
          Developer.js
        </div>
        <div className="w-14" /> {/* Spacer */}
      </div>

      {/* Editor Body */}
      <div style={{ transform: "translateZ(30px)" }} className="p-6 font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-400 flex">
        {/* Line Numbers */}
        <div className="text-zinc-700 text-right pr-4 select-none border-r border-white/5 flex flex-col gap-0.5">
          {Array.from({ length: 17 }).map((_, i) => (
            <span key={i} className="block w-4">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code Content */}
        <div className="pl-4 flex-1 whitespace-pre overflow-x-auto relative">
          {highlightCode(typedCode)}
          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1.5 h-3.5 bg-indigo-500 ml-0.5 align-middle"
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 1. Typing animation state
  const typingPhrases = useMemo(
    () => [
      "interfaces modernas e limpas.",
      "APIs robustas e escaláveis.",
      "experiências web fluidas.",
      "bancos de dados eficientes.",
      "sistemas responsivos de ponta a ponta."
    ],
    []
  );
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typedText = typingPhrases[phraseIdx].substring(0, subIdx);

  useEffect(() => {
    if (subIdx === typingPhrases[phraseIdx].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(timeout);
    }

    if (subIdx === 0 && isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % typingPhrases.length);
      }, 0);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setSubIdx((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [subIdx, isDeleting, phraseIdx, typingPhrases]);

  // 2. Mouse move handler for coordinates and spotlights
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;
    setMousePos({ x: normX, y: normY });

    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // 3. Cinematic floating background particles (Client-mount generated to prevent hydration issues)
  const [backgroundParticles, setBackgroundParticles] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBackgroundParticles(
        Array.from({ length: 25 }).map((_, i) => ({
          id: i,
          size: Math.random() * 2.2 + 0.8,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: Math.random() * 12 + 10,
          delay: Math.random() * -15, // Negative offset to start pre-populated across viewport
        }))
      );
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const pulseBadgeVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-8 overflow-hidden pt-24"
    >
      {/* 1. Background Grid and Glow Spotlights */}
      <div className="absolute inset-0 grid-bg -z-20 opacity-80" />
      <div className="absolute inset-0 radial-spotlight -z-10 pointer-events-none" />
      <div className="absolute inset-0 radial-glow-accent -z-10 pointer-events-none" />

      {/* 2. Orbiting Nebula Glares (Slow drifting background glow) */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none -z-30"
      />
      <motion.div
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none -z-30"
      />

      {/* 3. Decorative Floating Parallax Circles */}
      <motion.div
        animate={{
          x: mousePos.x * -40,
          y: mousePos.y * -40,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
        className="absolute top-[20%] right-[15%] w-16 h-16 rounded-full border border-indigo-500/15 backdrop-blur-[2px] pointer-events-none -z-10 hidden lg:block"
      />
      <motion.div
        animate={{
          x: mousePos.x * 35,
          y: mousePos.y * 35,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 25 }}
        className="absolute bottom-[20%] left-[10%] w-24 h-24 rounded-full border border-purple-500/10 backdrop-blur-[1px] pointer-events-none -z-10 hidden lg:block"
      />

      {/* 4. Floating Space Embers / Particles */}
      {backgroundParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-zinc-500/20 blur-[0.5px] pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -150],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* 5. Responsive Split Columns Layout */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center justify-between z-10 py-12">
        
        {/* Left Column: Greeting, Title, Typing animation, Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full"
        >
          {/* Availability Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 font-medium shadow-inner shadow-black/20"
          >
            <motion.span
              variants={pulseBadgeVariants}
              animate="animate"
              className="w-2 h-2 rounded-full bg-green-500"
            />
            {personalInfo.availability}
          </motion.div>

          {/* Name Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm font-mono text-zinc-500 tracking-[0.2em] uppercase"
          >
            Olá, eu sou <span className="text-indigo-400 font-semibold">{personalInfo.fullName}</span>
          </motion.p>

          {/* Main Hero Header Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-black tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500"
          >
            {personalInfo.title}
          </motion.h1>

          {/* Subtitle & Dynamic Typing effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center lg:items-start gap-3 px-4 lg:px-0"
          >
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-light leading-relaxed">
              {personalInfo.subtitle}
            </p>
            <div className="text-sm sm:text-base font-mono text-zinc-400 flex items-center gap-1.5 h-6">
              <span>Eu desenvolvo</span>
              <span className="text-white font-semibold underline decoration-indigo-500 decoration-2 underline-offset-4">
                {typedText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-4 bg-indigo-500"
              />
            </div>
          </motion.div>

          {/* CTA Buttons & Social Shortcuts */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center lg:justify-start"
          >
            {/* Projects Button */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black font-semibold text-sm shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              Projects
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>

            {/* Contact Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.08)]"
            >
              Contact
            </motion.a>

            {/* Linktree Button */}
            <motion.a
              href="/links"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/links";
              }}
              className="px-7 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.08)]"
            >
              Linktree
            </motion.a>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 ml-0 sm:ml-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Tilting VS Code Visualizer */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center w-full relative"
        >
          {/* Subtle neon drop shadow backdrop glow */}
          <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full -z-10" />
          <CodeCard />
        </motion.div>
      </div>

      {/* 6. Bottom Fade Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
    </section>
  );
}
