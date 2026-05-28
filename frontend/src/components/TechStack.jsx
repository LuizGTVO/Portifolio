"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/portfolioData";

// Custom high-quality vector SVGs for Tech icons
const ReactIcon = () => (
  <svg className="w-8 h-8 text-[#61dafb]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const JSIcon = () => (
  <svg className="w-8 h-8 text-[#f7df1e] rounded" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0V0zm20.337 17.651c-.372-.656-.814-1.172-1.725-1.562-.871-.375-1.579-.611-1.579-1.129 0-.472.375-.75 1.002-.75.642 0 1.094.27 1.488.75.312-.429.312-.429.755-.729-.327-.472-.888-.912-1.782-1.018-.415-.054-1.077.014-1.55.327-.63.422-.924 1.055-.924 1.766 0 1.579 1.253 2.027 2.455 2.508.975.392 1.411.669 1.411 1.253 0 .616-.547.966-1.253.966-.865 0-1.4-.419-1.785-1.03-.453.284-.453.284-.784.629.479.791 1.253 1.267 2.5 1.267 1.839 0 2.804-.98 2.804-2.28 0-1.026-.523-1.547-1.394-1.972zm-7.618-2.613c0-.858-.571-1.385-1.517-1.385-.926 0-1.507.514-1.507 1.385v5.823c0 .878.581 1.392 1.507 1.392.946 0 1.517-.514 1.517-1.392v-5.823zm-1.517-2.635c-.568 0-1.03.462-1.03 1.03s.462 1.03 1.03 1.03c.568 0 1.03-.462 1.03-1.03s-.462-1.03-1.03-1.03z"/>
  </svg>
);

const HTMLIcon = () => (
  <svg className="w-8 h-8 text-[#e34f26]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-8 h-8 text-[#38bdf8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3c.132 0 .263 0 .393.003a3.5 3.5 0 0 1 3.17 3.17c.026.85.006 1.7-.06 2.548A3.5 3.5 0 0 1 12 12H8.384a3.5 3.5 0 0 1-3.17-3.17c-.026-.85-.006-1.7.06-2.548A3.5 3.5 0 0 1 8.384 3H12Z"/>
    <path d="M12 21c-.132 0-.263 0-.393-.003a3.5 3.5 0 0 1-3.17-3.17c-.026-.85-.006-1.7.06-2.548A3.5 3.5 0 0 1 12 12h3.616a3.5 3.5 0 0 1 3.17 3.17c.026.85.006 1.7-.06 2.548A3.5 3.5 0 0 1 15.616 21H12Z" opacity="0.6"/>
  </svg>
);

const MotionIcon = () => (
  <svg className="w-8 h-8 text-[#ff007f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="7.5 10.5 12 13 16.5 10.5"/>
  </svg>
);

const NodeIcon = () => (
  <svg className="w-8 h-8 text-[#339933]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
    <path d="M12 22V12"/>
    <path d="M17 14.5l-5-2.5"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-8 h-8 text-[#0064a5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
  </svg>
);

const GitIcon = () => (
  <svg className="w-8 h-8 text-[#f05032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="3"/>
    <circle cx="6" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <line x1="6" y1="9" x2="6" y2="15"/>
    <path d="M9 18h3a3 3 0 0 0 3-3V9"/>
  </svg>
);

const FigmaIcon = () => (
  <svg className="w-8 h-8 text-[#a259ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3h3v5h-3A2.5 2.5 0 0 1 5 5.5z"/>
    <path d="M12 3h3a2.5 2.5 0 0 1 0 5h-3V3z"/>
    <path d="M5 12.5A2.5 2.5 0 0 1 7.5 10h3v5h-3A2.5 2.5 0 0 1 5 12.5z"/>
    <path d="M12 10h3a2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5h-3v-5z"/>
    <path d="M7.5 17h3v3h-3a2.5 2.5 0 0 1 0-5z"/>
  </svg>
);

const LayoutIcon = () => (
  <svg className="w-8 h-8 text-[#9333ea]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

function SkillIconResolver({ type }) {
  switch (type) {
    case "react": return <ReactIcon />;
    case "js": return <JSIcon />;
    case "html": return <HTMLIcon />;
    case "tailwind": return <TailwindIcon />;
    case "motion": return <MotionIcon />;
    case "node": return <NodeIcon />;
    case "database": return <DatabaseIcon />;
    case "git": return <GitIcon />;
    case "figma": return <FigmaIcon />;
    case "layout": return <LayoutIcon />;
    default: return <HTMLIcon />;
  }
}

// 3D Tilt Card Component
function TiltCard({ skill, delay }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Convert to tilt rotation angles (max 18 degrees)
    const rX = (mouseY / height) * -18;
    const rY = (mouseX / width) * 18;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.03, 1.03, 1.03)`;
    
    // Update radial spotlight coordinates
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${localX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${localY}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // Smooth transition back to neutral
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // Assign branding colors dynamically for background hover halos
  const glowColors = {
    react: "group-hover:bg-[#61dafb]/5",
    js: "group-hover:bg-[#f7df1e]/5",
    html: "group-hover:bg-[#e34f26]/5",
    tailwind: "group-hover:bg-[#38bdf8]/5",
    motion: "group-hover:bg-[#ff007f]/5",
    node: "group-hover:bg-[#339933]/5",
    database: "group-hover:bg-[#0064a5]/5",
    git: "group-hover:bg-[#f05032]/5",
    figma: "group-hover:bg-[#a259ff]/5",
    layout: "group-hover:bg-[#9333ea]/5"
  };

  const borderGlows = {
    react: "group-hover:border-[#61dafb]/20",
    js: "group-hover:border-[#f7df1e]/20",
    html: "group-hover:border-[#e34f26]/20",
    tailwind: "group-hover:border-[#38bdf8]/20",
    motion: "group-hover:border-[#ff007f]/20",
    node: "group-hover:border-[#339933]/20",
    database: "group-hover:border-[#0064a5]/20",
    git: "group-hover:border-[#f05032]/20",
    figma: "group-hover:border-[#a259ff]/20",
    layout: "group-hover:border-[#9333ea]/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className={`group h-full rounded-2xl bg-white/[0.01] border border-white/5 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ease-out min-h-[160px] relative ${borderGlows[skill.icon] || "hover:border-white/15"}`}
      >
        {/* Spotlight overlay inside card */}
        <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Customized branding background glow */}
        <div className={`absolute inset-0 rounded-2xl transition-colors duration-500 -z-10 ${glowColors[skill.icon] || ""}`} />

        {/* 3D preserved content (tilts with displacement) */}
        <div style={{ transform: "translateZ(40px)" }} className="flex flex-col items-center gap-4">
          <SkillIconResolver type={skill.icon} />
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide transition-colors group-hover:text-white/90">
              {skill.name}
            </h4>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mt-1">
              {skill.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 px-4 w-full max-w-6xl mx-auto border-t border-white/5">
      {/* Section Title */}
      <div className="text-center md:text-left mb-16">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">HABILIDADES</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
          Tecnologias &amp; Ferramentas
        </h3>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <TiltCard
            key={index}
            skill={skill}
            delay={index * 0.05}
          />
        ))}
      </div>
    </section>
  );
}
