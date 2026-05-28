"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as staticProjects } from "@/data/portfolioData";
import { getProjects } from "@/app/auth/projectActions";
import { ExternalLink, X, ChevronRight, Award, Folder } from "lucide-react";

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

// Visualizer 1: Animated Recipe Ingredients & Cook indicator (RecipeFinder)
function RecipeVisualizer() {
  return (
    <div className="relative w-full h-44 bg-[#050508] rounded-2xl overflow-hidden flex flex-col justify-between p-4 border border-white/5 font-mono text-[10px]">
      <div className="flex justify-between items-center text-zinc-600 border-b border-white/5 pb-2">
        <span>search-ingredients.json</span>
        <span className="text-orange-500/80">active</span>
      </div>
      
      <div className="flex-1 flex items-center justify-between gap-4 py-2">
        <div className="flex flex-col gap-1.5 text-zinc-500">
          <div className="flex items-center gap-1.5">
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>[x] Tomate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>[x] Cebola</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            <span>[ ] Queijo</span>
          </div>
        </div>

        {/* Dynamic cooking progress wheel */}
        <div className="w-16 h-16 rounded-full border-2 border-white/5 flex items-center justify-center relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-orange-500 border-r-2 border-r-transparent"
          />
          <span className="text-[8px] text-zinc-400">Match!</span>
        </div>
      </div>
    </div>
  );
}

// Visualizer 2: Waveform equalizers (CloneSpotify)
function SpotifyVisualizer() {
  return (
    <div className="w-full h-44 bg-[#050508] rounded-2xl overflow-hidden p-4 border border-white/5 flex flex-col justify-between font-mono text-[10px]">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-zinc-600">
        <span>spotify-player.js</span>
        <span className="text-emerald-500/80">playing</span>
      </div>
      
      <div className="flex-1 py-2 flex items-center justify-center gap-1.5">
        {[20, 60, 40, 80, 50, 70, 30, 90, 45, 65].map((height, idx) => (
          <motion.div
            key={idx}
            className="w-1.5 bg-emerald-500 rounded-full"
            animate={{
              height: [`${height / 2}%`, `${height}%`, `${height / 2}%`],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: idx * 0.1,
              ease: "easeInOut",
            }}
            style={{ height: "40%" }}
          />
        ))}
      </div>
    </div>
  );
}

// Visualizer 3: Links Tree Layout (SocialLinks)
function LinksVisualizer() {
  return (
    <div className="w-full h-44 bg-[#050508] rounded-2xl overflow-hidden p-4 border border-white/5 flex flex-col justify-between font-mono text-[10px]">
      <div className="flex justify-between items-center text-zinc-600 border-b border-white/5 pb-2">
        <span>social-tree-config.json</span>
        <span className="text-purple-500/80">online</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2 max-w-[160px] mx-auto w-full">
        {[
          { label: "GitHub", delay: 0 },
          { label: "LinkedIn", delay: 0.15 },
          { label: "Instagram", delay: 0.3 }
        ].map((link, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0.5, y: 5 }}
            animate={{ opacity: [0.5, 1, 0.5], y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: link.delay }}
            className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[8px] text-zinc-400 flex items-center justify-between"
          >
            <span>{link.label}</span>
            <span className="w-1 h-1 rounded-full bg-purple-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Visualizer 4: City Map/Dashboard Mock (CityFrontend)
function CityFrontendVisualizer() {
  return (
    <div className="w-full h-44 bg-[#050508] rounded-2xl overflow-hidden p-4 border border-white/5 flex flex-col justify-between font-mono text-[10px]">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-zinc-600">
        <span>city-portal.dashboard</span>
        <span className="text-blue-500/80">online</span>
      </div>

      <div className="flex-1 py-2 flex items-center justify-between gap-4">
        {/* Mock Map Grid */}
        <div className="flex-1 h-full rounded bg-white/[0.02] border border-white/5 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
          {/* Glowing Map Pin */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </motion.div>
        </div>

        {/* Small Analytics Widget */}
        <div className="flex flex-col gap-1.5 w-16 select-none">
          <div className="h-6 rounded bg-blue-500/10 border border-blue-500/20 flex flex-col justify-center px-1.5">
            <span className="text-[6px] text-zinc-500 leading-none">TRAFFIC</span>
            <span className="text-[9px] text-blue-400 font-bold leading-none mt-0.5">92%</span>
          </div>
          <div className="h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center px-1.5">
            <span className="text-[6px] text-zinc-500 leading-none">ENERGY</span>
            <span className="text-[8px] text-emerald-400 font-bold leading-none mt-0.5">450kW</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Visualizer 5: API Schema Flow (CityBackend)
function CityBackendVisualizer() {
  return (
    <div className="w-full h-44 bg-[#050508] rounded-2xl overflow-hidden p-4 border border-white/5 flex flex-col justify-between font-mono text-[10px]">
      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-zinc-600">
        <span>city-api-service</span>
        <span className="text-teal-500/80">running</span>
      </div>

      <div className="flex-1 py-2 flex items-center justify-between px-2 gap-2 text-zinc-500">
        {/* Client Icon */}
        <div className="flex flex-col items-center gap-1 select-none">
          <span className="text-[7px]">Client</span>
          <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 font-bold text-[8px]">
            GET
          </div>
        </div>

        {/* Arrow Flow */}
        <div className="flex-1 flex flex-col items-center justify-center relative px-2 select-none">
          <span className="text-[6px] text-teal-400 mb-1">/api/v1/city</span>
          <div className="w-full h-[1px] bg-zinc-800 relative">
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-1.5px] w-2.5 h-[4px] bg-teal-400 rounded-full"
            />
          </div>
        </div>

        {/* DB/Server Icon */}
        <div className="flex flex-col items-center gap-1 select-none">
          <span className="text-[7px]">Database</span>
          <div className="w-8 h-8 rounded bg-teal-500/10 border border-teal-500/20 flex flex-col items-center justify-center gap-0.5 text-teal-400">
            <div className="w-4 h-1 bg-teal-400/40 rounded-sm" />
            <div className="w-4 h-1 bg-teal-400/40 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualizerResolver({ id = "" }) {
  if (id === "recipefinder") return <RecipeVisualizer />;
  if (id === "clonespotify") return <SpotifyVisualizer />;
  if (id === "sociallinks") return <LinksVisualizer />;
  if (id === "cityfrontend") return <CityFrontendVisualizer />;
  if (id === "citybackend") return <CityBackendVisualizer />;
  return <RecipeVisualizer />;
}

function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null);

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

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between rounded-3xl bg-[#09090b] border border-white/5 p-5 hover:border-white/10 transition-all duration-300 ease-out card-glow-border min-h-[380px]"
    >
      <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        {/* 1. Visualizer Graphic */}
        {project.isDynamic ? (
          <div className="relative w-full h-44 bg-zinc-950 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <VisualizerResolver id={project.id} />
        )}

        {/* 2. Project Title */}
        <h4 className="text-xl font-bold text-white mt-5 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
          {project.title}
        </h4>
        
        {/* Subtitle */}
        <p className="text-xs font-mono text-zinc-500 tracking-wider mb-3 flex items-center gap-1.5">
          <Folder className="w-3.5 h-3.5 text-zinc-600" />
          {project.subtitle}
        </p>

        {/* 3. Description */}
        <p className="text-sm text-zinc-400 leading-relaxed font-light line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* 4. Footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400">
          {project.metric}
        </span>
        <button
          onClick={() => onClick(project)}
          className="text-xs font-semibold text-white hover:text-zinc-300 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform duration-300"
        >
          Detalhes
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjects, setAllProjects] = useState(staticProjects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await getProjects();
        if (res.success && res.projects && res.projects.length > 0) {
          const mapped = res.projects.map((dbProj) => {
            const hash = dbProj.title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const colors = [
              "from-orange-600/20 via-red-600/10 to-transparent",
              "from-green-600/20 via-emerald-600/10 to-transparent",
              "from-purple-600/20 via-blue-600/10 to-transparent",
              "from-blue-600/20 via-sky-600/10 to-transparent",
              "from-teal-600/20 via-emerald-600/10 to-transparent"
            ];
            const accentColors = ["#f97316", "#22c55e", "#a855f7", "#3b82f6", "#0d9488"];
            const index = Math.abs(hash) % colors.length;
            
            return {
              id: dbProj.id,
              title: dbProj.title,
              subtitle: dbProj.technologies.slice(0, 3).join(" • "),
              description: dbProj.description,
              detailedDescription: dbProj.description,
              tags: dbProj.technologies,
              github: dbProj.githubUrl || "",
              live: dbProj.liveUrl || "",
              image: dbProj.image,
              color: colors[index],
              accentColor: accentColors[index],
              metric: dbProj.featured ? "Destaque" : (dbProj.technologies[0] || "Web"),
              isDynamic: true
            };
          });
          setAllProjects(mapped);
        }
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
      }
    }
    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 w-full max-w-6xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="text-center md:text-left mb-16">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">PROJETOS</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
          Projetos Selecionados
        </h3>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={setSelectedProject}
          />
        ))}
      </div>

      {/* Expandable Project Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient gradient color glow */}
              <div
                className={`absolute -top-40 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-b ${selectedProject.color} blur-[80px] pointer-events-none -z-10`}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title & Subtitle */}
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  {selectedProject.subtitle}
                </span>
                <h4 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                  {selectedProject.title}
                </h4>
              </div>

              {/* Detailed Description */}
              <div className="mt-6">
                <h5 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Visão Geral do Projeto
                </h5>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light">
                  {selectedProject.detailedDescription}
                </p>
              </div>

              {/* Metric Card */}
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <h6 className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    Métrica de Sucesso
                  </h6>
                  <p className="text-base font-bold text-white mt-0.5">
                    {selectedProject.metric}
                  </p>
                </div>
                <Award className="w-5 h-5 text-zinc-400" />
              </div>

              {/* Tags used */}
              <div className="mt-6">
                <h5 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Tecnologias Utilizadas
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resource Links */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    Visualizar Código
                  </a>
                ) : (
                  <div />
                )}
                
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold shadow-md transition-colors"
                  >
                    Demo ao vivo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
