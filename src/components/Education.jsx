"use client";

import React from "react";
import { motion } from "framer-motion";
import { education } from "@/data/portfolioData";
import { GraduationCap, Calendar, CheckCircle, BookOpen } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 w-full max-w-4xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">JORNADA</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
          Educação &amp; Formação
        </h3>
      </div>

      {/* Education Timeline Tree */}
      <div className="relative border-l border-zinc-800 ml-4 md:ml-12 pl-6 md:pl-10 pb-8 flex flex-col gap-12">
        {/* Glowing vertical line overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent -translate-x-[1px]" />

        {education.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Timeline checkpoint bubble */}
            <div className="absolute -left-[35px] md:-left-[51px] top-1.5 flex items-center justify-center w-[20px] h-[20px] md:w-[26px] md:h-[26px] rounded-full bg-[#030303] border border-zinc-700 text-zinc-400 group hover:border-indigo-500 transition-colors">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-zinc-600 group-hover:bg-indigo-500 animate-pulse" />
            </div>

            {/* Content Card */}
            <div className="p-6 rounded-3xl bg-[#09090b] border border-white/5 hover:border-white/10 transition-colors duration-300 relative overflow-hidden">
              {/* Subtle top ambient glow for the first card */}
              {index === 0 && (
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
              )}

              {/* Timeframe & Institution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0" />
                    {item.course}
                  </h4>
                  <p className="text-sm font-semibold text-zinc-400 mt-0.5">
                    {item.institution} <span className="text-zinc-600">•</span> <span className="text-zinc-500 font-normal">{item.campus}</span>
                  </p>
                </div>
                
                <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {item.year}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Highlights Bullet list */}
              <div className="flex flex-col gap-2">
                <h5 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                  Atividades &amp; Aprendizados Chave
                </h5>
                <ul className="flex flex-col gap-2">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal font-light">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500/80 mt-0.5 shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
