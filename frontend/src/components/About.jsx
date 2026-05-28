"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Award, Code2, Hourglass, Landmark, MapPin, Mail, Calendar } from "lucide-react";

// CountUp Component utilizing Framer Motion's high-performance animation hooks
function AnimatedCounter({ targetValue, duration = 2.5 }) {
  const countRef = useRef(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(countRef, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, targetValue, {
        duration,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, motionValue, targetValue, duration]);

  // Use dynamic text bindings
  return <motion.span ref={countRef}>{rounded}</motion.span>;
}

// Glassmorphism Card with mouse-hover spotlight glows
function AboutGlassCard({ children, className }) {
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-white/10 ${className}`}
    >
      <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4 w-full max-w-6xl mx-auto border-t border-white/5 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Section Title */}
      <div className="text-center md:text-left mb-16">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">PERFIL</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
          Sobre Mim
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Left Side: Minimalist Bio Narrative (Col Span 3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 text-zinc-300 font-light leading-relaxed text-base sm:text-lg"
          >
            <p>
              Olá! Sou <span className="text-white font-semibold">{personalInfo.fullName}</span>, 
              estudante focado em desenvolvimento web no IFSP Campus Caraguatatuba. Busco constantemente 
              criar interfaces que não apenas funcionem perfeitamente, mas que transmitam sofisticação, 
              fluidez e precisão.
            </p>
            <p>
              A minha formação técnica me deu uma base sólida em lógica e infraestrutura, enquanto a 
              minha paixão pelo design de interfaces me impulsiona a explorar novas fronteiras em front-end, 
              como animações performáticas e microinterações elegantes.
            </p>
          </motion.div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <AboutGlassCard>
              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono tracking-wider">LOCALIZAÇÃO</span>
              </div>
              <p className="text-sm font-semibold text-white mt-2">{personalInfo.location}</p>
            </AboutGlassCard>

            <AboutGlassCard>
              <div className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono tracking-wider">CONTATO DISPONÍVEL</span>
              </div>
              <p className="text-sm font-semibold text-white mt-2">{personalInfo.email}</p>
            </AboutGlassCard>
          </div>
        </div>

        {/* Right Side: Animated Stats Grid (Col Span 2) */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="lg:col-span-2 grid grid-cols-2 gap-4 w-full"
        >
          
          {/* Stat 1: Anos de Código */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <AboutGlassCard className="flex flex-col justify-between min-h-[140px] h-full">
              <div className="p-2 w-fit rounded-xl bg-white/5 border border-white/10 text-indigo-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-white font-mono flex items-baseline">
                  <AnimatedCounter targetValue={2} />
                  <span className="text-indigo-500 font-extrabold ml-0.5">+</span>
                </div>
                <p className="text-xs text-zinc-500 font-mono tracking-wider mt-1 uppercase">Anos de Código</p>
              </div>
            </AboutGlassCard>
          </motion.div>

          {/* Stat 2: Projetos */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <AboutGlassCard className="flex flex-col justify-between min-h-[140px] h-full">
              <div className="p-2 w-fit rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-white font-mono flex items-baseline">
                  <AnimatedCounter targetValue={10} />
                  <span className="text-emerald-500 font-extrabold ml-0.5">+</span>
                </div>
                <p className="text-xs text-zinc-500 font-mono tracking-wider mt-1 uppercase">Projetos Feitos</p>
              </div>
            </AboutGlassCard>
          </motion.div>

          {/* Stat 3: Carga Horária IFSP */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <AboutGlassCard className="flex flex-col justify-between min-h-[140px] h-full">
              <div className="p-2 w-fit rounded-xl bg-white/5 border border-white/10 text-amber-500">
                <Hourglass className="w-4 h-4 animate-spin-slow" style={{ animationDuration: "8s" }} />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-white font-mono flex items-baseline">
                  <AnimatedCounter targetValue={1200} />
                  <span className="text-amber-500 font-extrabold ml-0.5">h</span>
                </div>
                <p className="text-xs text-zinc-500 font-mono tracking-wider mt-1 uppercase">Carga Horária</p>
              </div>
            </AboutGlassCard>
          </motion.div>

          {/* Stat 4: Habilidades */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <AboutGlassCard className="flex flex-col justify-between min-h-[140px] h-full">
              <div className="p-2 w-fit rounded-xl bg-white/5 border border-white/10 text-purple-400">
                <Award className="w-4 h-4" />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-white font-mono flex items-baseline">
                  <AnimatedCounter targetValue={8} />
                  <span className="text-purple-500 font-extrabold ml-0.5">+</span>
                </div>
                <p className="text-xs text-zinc-500 font-mono tracking-wider mt-1 uppercase">Techs Domínio</p>
              </div>
            </AboutGlassCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
