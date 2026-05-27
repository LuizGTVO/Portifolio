"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personalInfo, projects } from "@/data/portfolioData";
import CustomCursor from "@/components/CustomCursor";
import { 
  Mail, 
  ArrowLeft, 
  ChevronRight, 
  Globe, 
  Server, 
  Folder, 
  Terminal 
} from "lucide-react";

// Brand icons inline to bypass Lucide version limits
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

// Link Item Card with Spotlight Hover Effect
function LinkCard({ href, title, subtitle, icon: Icon, delay, color }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 260, damping: 28 } 
    }
  };

  return (
    <motion.div variants={itemVariants} className="w-full">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.08)] transition-all duration-300 w-full overflow-hidden"
      >
        {/* Spotlight overlay inside card */}
        <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Accent color glow on card */}
        <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-gradient-to-b ${color} blur-[60px] pointer-events-none -z-10`} />

        <div className="flex items-center gap-4 relative z-10">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 group-hover:text-white transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-indigo-300 transition-colors">
              {title}
            </h4>
            <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
              {subtitle}
            </span>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300 relative z-10" />
      </a>
    </motion.div>
  );
}

export default function LinktreePage() {
  const [avatarUrl, setAvatarUrl] = useState("");

  // Fetch actual GitHub avatar
  useEffect(() => {
    async function getAvatar() {
      try {
        const res = await fetch("https://api.github.com/users/LuizGTVO");
        if (res.ok) {
          const data = await res.json();
          setAvatarUrl(data.avatar_url);
        }
      } catch (err) {
        console.warn("Avatar fetch failed, using fallback icon: ", err);
      }
    }
    getAvatar();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  // Resolve custom icons for projects
  const getProjectIcon = (id) => {
    if (id === "cityfrontend") return Globe;
    if (id === "citybackend") return Server;
    if (id === "clonespotify") return Terminal;
    return Folder;
  };

  return (
    <>
      {/* Global custom spring-lag cursor */}
      <CustomCursor />

      <main className="min-h-screen bg-[#030303] text-foreground flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden select-none">
        
        {/* Background glow spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

        {/* Outer card wrapper */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md flex flex-col items-center text-center gap-8"
        >
          {/* Back to Home Button */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0 }
            }}
            className="self-start"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/5 text-xs font-semibold text-zinc-400 hover:text-white transition-all duration-300 hover:border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar ao Portfólio
            </a>
          </motion.div>

          {/* Profile Header */}
          <div className="flex flex-col items-center gap-3">
            <motion.div 
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full -z-10" />
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={personalInfo.fullName}
                  className="w-20 h-20 rounded-full border-2 border-white/10 shadow-lg object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center text-zinc-500">
                  <Terminal className="w-8 h-8" />
                </div>
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
              className="flex flex-col gap-1 mt-2"
            >
              <h1 className="text-xl font-black text-white tracking-tight leading-none">
                {personalInfo.fullName}
              </h1>
              <p className="text-xs font-mono text-indigo-400 tracking-widest uppercase">
                {personalInfo.title}
              </p>
            </motion.div>
          </div>

          {/* Links Section Wrapper */}
          <div className="w-full flex flex-col gap-6">
            
            {/* Social Channels Category */}
            <div className="flex flex-col gap-3">
              <motion.h3 
                variants={{ hidden: { opacity: 0 }, show: { opacity: 0.4 } }}
                className="text-[9px] font-mono tracking-[0.2em] text-zinc-400 uppercase text-left pl-2"
              >
                Canais de Contato
              </motion.h3>
              
              <LinkCard 
                href={personalInfo.github} 
                title="GitHub" 
                subtitle="luizgtvo" 
                icon={GithubIcon} 
                color="from-indigo-500/10 to-transparent" 
              />
              <LinkCard 
                href={personalInfo.linkedin} 
                title="LinkedIn" 
                subtitle="Conecte-se comigo" 
                icon={LinkedinIcon} 
                color="from-blue-500/10 to-transparent" 
              />
              <LinkCard 
                href={`mailto:${personalInfo.email}`} 
                title="E-mail" 
                subtitle="luiz.gustavo@example.com" 
                icon={Mail} 
                color="from-amber-500/10 to-transparent" 
              />
            </div>

            {/* Featured Projects Category */}
            <div className="flex flex-col gap-3">
              <motion.h3 
                variants={{ hidden: { opacity: 0 }, show: { opacity: 0.4 } }}
                className="text-[9px] font-mono tracking-[0.2em] text-zinc-400 uppercase text-left pl-2"
              >
                Projetos Em Destaque
              </motion.h3>

              {projects.map((proj) => (
                <LinkCard
                  key={proj.id}
                  href={proj.github}
                  title={proj.title}
                  subtitle={proj.subtitle}
                  icon={getProjectIcon(proj.id)}
                  color={proj.color}
                />
              ))}
            </div>

          </div>

          {/* Footer branding */}
          <motion.p 
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="text-[9px] font-mono text-zinc-700 tracking-wider mt-4"
          >
            © {new Date().getFullYear()} • LUIZ GUSTAVO
          </motion.p>

        </motion.div>
      </main>
    </>
  );
}
