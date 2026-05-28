"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { personalInfo, skills } from "@/data/portfolioData";
import { Compass, Cpu, Clock, Music, GitBranch, MapPin, Users, Code2, Loader2 } from "lucide-react";

// Technology Stack Icons (Clean vector SVGs designed to look premium)
const ReactIcon = () => (
  <svg className="w-4 h-4 text-[#61dafb]" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const JSIcon = () => (
  <svg className="w-4 h-4 text-[#f7df1e] rounded-sm" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0V0zm20.337 17.651c-.372-.656-.814-1.172-1.725-1.562-.871-.375-1.579-.611-1.579-1.129 0-.472.375-.75 1.002-.75.642 0 1.094.27 1.488.75.312-.429.312-.429.755-.729-.327-.472-.888-.912-1.782-1.018-.415-.054-1.077.014-1.55.327-.63.422-.924 1.055-.924 1.766 0 1.579 1.253 2.027 2.455 2.508.975.392 1.411.669 1.411 1.253 0 .616-.547.966-1.253.966-.865 0-1.4-.419-1.785-1.03-.453.284-.453.284-.784.629.479.791 1.253 1.267 2.5 1.267 1.839 0 2.804-.98 2.804-2.28 0-1.026-.523-1.547-1.394-1.972zm-7.618-2.613c0-.858-.571-1.385-1.517-1.385-.926 0-1.507.514-1.507 1.385v5.823c0 .878.581 1.392 1.507 1.392.946 0 1.517-.514 1.517-1.392v-5.823zm-1.517-2.635c-.568 0-1.03.462-1.03 1.03s.462 1.03 1.03 1.03c.568 0 1.03-.462 1.03-1.03s-.462-1.03-1.03-1.03z"/>
  </svg>
);

const HTMLIcon = () => (
  <svg className="w-4 h-4 text-[#e34f26]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-4 h-4 text-[#38bdf8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3c.132 0 .263 0 .393.003a3.5 3.5 0 0 1 3.17 3.17c.026.85.006 1.7-.06 2.548A3.5 3.5 0 0 1 12 12H8.384a3.5 3.5 0 0 1-3.17-3.17c-.026-.85-.006-1.7.06-2.548A3.5 3.5 0 0 1 8.384 3H12Z"/>
    <path d="M12 21c-.132 0-.263 0-.393-.003a3.5 3.5 0 0 1-3.17-3.17c-.026-.85-.006-1.7.06-2.548A3.5 3.5 0 0 1 12 12h3.616a3.5 3.5 0 0 1 3.17 3.17c.026.85.006 1.7-.06 2.548A3.5 3.5 0 0 1 15.616 21H12Z" opacity="0.6"/>
  </svg>
);

const MotionIcon = () => (
  <svg className="w-4 h-4 text-[#ff007f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="7.5 10.5 12 13 16.5 10.5"/>
  </svg>
);

const NodeIcon = () => (
  <svg className="w-4 h-4 text-[#339933]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
    <path d="M12 22V12"/>
    <path d="M17 14.5l-5-2.5"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-4 h-4 text-[#0064a5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
  </svg>
);

const GitIcon = () => (
  <svg className="w-4 h-4 text-[#f05032]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="3"/>
    <circle cx="6" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <line x1="6" y1="9" x2="6" y2="15"/>
    <path d="M9 18h3a3 3 0 0 0 3-3V9"/>
  </svg>
);

const FigmaIcon = () => (
  <svg className="w-4 h-4 text-[#a259ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3h3v5h-3A2.5 2.5 0 0 1 5 5.5z"/>
    <path d="M12 3h3a2.5 2.5 0 0 1 0 5h-3V3z"/>
    <path d="M5 12.5A2.5 2.5 0 0 1 7.5 10h3v5h-3A2.5 2.5 0 0 1 5 12.5z"/>
    <path d="M12 10h3a2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5h-3v-5z"/>
    <path d="M7.5 17h3v3h-3a2.5 2.5 0 0 1 0-5z"/>
  </svg>
);

const LayoutIcon = () => (
  <svg className="w-4 h-4 text-[#9333ea]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

function SkillIcon({ type }) {
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

// Individual Bento Card Wrapper with mouse-spotlight tracking
function BentoCard({ children, className, delay = 0 }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-3xl bg-[#09090b] border border-white/5 p-6 hover:border-white/10 transition-colors duration-300 ${className}`}
    >
      <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </motion.div>
  );
}

export default function BentoGrid() {
  const [currentTime, setCurrentTime] = useState("");
  const [githubStats, setGithubStats] = useState({
    followers: 12,
    publicRepos: 18,
    avatarUrl: "",
    topLanguages: ["JavaScript", "HTML", "CSS"],
    loading: true
  });
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "America/Sao_Paulo",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setCurrentTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch live GitHub stats for Bento boxes
  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch profile metrics
        const profileRes = await fetch("https://api.github.com/users/LuizGTVO");
        if (!profileRes.ok) throw new Error("API rate limited");
        const profileData = await profileRes.json();

        // Fetch repo details to calculate top languages
        const reposRes = await fetch("https://api.github.com/users/LuizGTVO/repos?per_page=50");
        let languages = ["JavaScript", "HTML", "CSS"];
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          // Count language frequencies
          const counts = {};
          reposData.forEach((repo) => {
            if (repo.language && !repo.fork) {
              counts[repo.language] = (counts[repo.language] || 0) + 1;
            }
          });
          // Sort by frequency
          const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
          if (sorted.length > 0) {
            languages = sorted.slice(0, 3);
          }
        }

        setGithubStats({
          followers: profileData.followers,
          publicRepos: profileData.public_repos,
          avatarUrl: profileData.avatar_url,
          topLanguages: languages,
          loading: false
        });
      } catch (err) {
        console.warn("GitHub Profile fetch failed, using fallbacks: ", err);
        setGithubStats((prev) => ({ ...prev, loading: false }));
      }
    }

    fetchStats();
  }, []);

  const [commitGrid, setCommitGrid] = useState(() => Array(96).fill(0));
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCommitGrid(
        Array.from({ length: 96 }, () => {
          const rand = Math.random();
          if (rand < 0.5) return 0;
          if (rand < 0.75) return 1;
          if (rand < 0.9) return 2;
          return 3;
        })
      );
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="bento" className="py-24 px-4 w-full max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="text-center md:text-left mb-12">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">SOBRE</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
          Estética &amp; Filosofia
        </h3>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min md:auto-rows-[220px]">
        
        {/* Card 1: About Me (Minimalist Bio + Live Avatar) */}
        <BentoCard className="md:col-span-2 md:row-span-1" delay={0.05}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-accent-blue">
                <Compass className="w-5 h-5" />
              </div>
              {githubStats.avatarUrl && (
                <img
                  src={githubStats.avatarUrl}
                  alt={personalInfo.name}
                  className="w-9 h-9 rounded-full border border-white/10 animate-fade-in shadow-md"
                />
              )}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">MINIMALISMO</span>
          </div>
          <div className="mt-4 md:mt-0">
            <h4 className="text-lg font-bold text-white mb-2">Simplicidade &amp; Estética Digital</h4>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl font-light">
              Estudante de Informática para Internet e fascinado por desenvolvimento web. Acredito que a 
              construção de experiências digitais de alto nível requer o balanço perfeito entre a 
              clareza visual, a interatividade responsiva e a leveza de um carregamento ágil.
            </p>
          </div>
        </BentoCard>

        {/* Card 2: Current Time & Status */}
        <BentoCard className="md:col-span-1 md:row-span-1" delay={0.1}>
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-amber-500">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">LOCALIZAÇÃO</span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black font-mono text-white tracking-wider tabular-nums">
              {currentTime || "12:00:00"}
            </div>
            <p className="text-xs text-zinc-500 flex items-center gap-1 mt-2 font-light">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              {personalInfo.location}
            </p>
          </div>
        </BentoCard>

        {/* Card 3: Tech Stack (Rich hover indicators with custom SVGs) */}
        <BentoCard className="md:col-span-1 md:row-span-2" delay={0.15}>
          <div className="flex justify-between items-start mb-6">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-accent-purple">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">TECNOLOGIAS</span>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[280px] pr-1">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1">
              Habilidades
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 shadow-sm cursor-default hover:-translate-y-0.5"
                >
                  <SkillIcon type={skill.icon} />
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Card 4: GitHub Activity Graph & Live Stats */}
        <BentoCard className="md:col-span-2 md:row-span-1" delay={0.2}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-green-500">
                <GitBranch className="w-5 h-5" />
              </div>
              
              {/* Dynamic stats pill tags */}
              {!githubStats.loading && (
                <div className="flex items-center gap-2 animate-fade-in">
                  <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-400">
                    <Code2 className="w-3 h-3 text-zinc-500" />
                    {githubStats.publicRepos} repos
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-400">
                    <Users className="w-3 h-3 text-zinc-500" />
                    {githubStats.followers} followers
                  </span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Estatísticas</span>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-zinc-400">Atividade recente no GitHub</h4>
              <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                Top linguagens: {githubStats.topLanguages.join(", ")}
              </span>
            </div>
            
            {/* Grid of commits */}
            <div className="grid grid-flow-col grid-rows-4 gap-1 w-full overflow-hidden max-w-lg mx-auto py-1">
              {commitGrid.map((level, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-sm transition-all duration-500 ${
                    level === 0
                      ? "bg-zinc-900 border border-white/5"
                      : level === 1
                      ? "bg-green-900/30"
                      : level === 2
                      ? "bg-green-700/50"
                      : "bg-green-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Card 5: Now Playing Widget */}
        <BentoCard className="md:col-span-1 md:row-span-1" delay={0.25}>
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-pink-500">
              <Music className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">PLAYLIST</span>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-end gap-[3px] h-8 w-6">
              {[1, 2, 3, 4].map((bar) => {
                const animationDelays = ["0.1s", "0.4s", "0.2s", "0.5s"];
                return (
                  <div
                    key={bar}
                    className="w-[3px] bg-pink-500 rounded-full animate-bounce"
                    style={{
                      animationDuration: "1.2s",
                      animationDelay: animationDelays[bar - 1],
                      height: "100%",
                      animationIterationCount: "infinite",
                    }}
                  />
                );
              })}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white truncate max-w-[180px]">Sad Statue</h4>
              <p className="text-xs text-zinc-500 truncate max-w-[180px]">System of a Down</p>
            </div>
          </div>
        </BentoCard>

        {/* Card 6: Interactive Quote/Metric */}
        <BentoCard className="md:col-span-1 md:row-span-1" delay={0.3}>
          <div className="flex flex-col justify-between h-full">
            <div className="text-zinc-600 font-serif text-3xl">“</div>
            <p className="text-xs italic text-zinc-400 leading-relaxed font-light">
              &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
            </p>
            <div className="text-right text-[10px] text-zinc-500 font-mono mt-2">— STEVE JOBS</div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
