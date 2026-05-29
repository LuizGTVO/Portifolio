"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolioData";
import { Mail, Send, Check, Loader2, ArrowRight } from "lucide-react";

export default function Contact() {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({}); // validation errors
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Validações básicas no cliente antes do envio
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (formState.name.trim().length < 2) {
      newErrors.name = ["O nome deve ter pelo menos 2 caracteres."];
    }
    if (!emailRegex.test(formState.email.trim())) {
      newErrors.email = ["Por favor, insira um e-mail válido."];
    }
    if (formState.message.trim().length < 10) {
      newErrors.message = ["A mensagem deve ter pelo menos 10 caracteres."];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setErrorMessage("Corrija as inconsistências do formulário.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("sending");
    setErrors({});

    try {
      // 1. Salva no banco de dados (chama a rota local silenciosamente no background)
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      }).catch((dbErr) => console.warn("Banco de dados indisponível:", dbErr));

      // 2. Dispara o e-mail real direto do navegador do usuário (ignora bloqueios de firewall da Vercel)
      const response = await fetch("https://formsubmit.co/ajax/luizgmenino@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Novo Contato do Portfólio: ${formState.name}`,
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === "true" || data.success === true)) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        console.error("Erro no envio:", data.message || "Erro desconhecido");
        setErrorMessage(data.message || "Erro ao enviar e-mail. Tente novamente.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setErrorMessage("Erro de rede. Verifique sua conexão.");
      setStatus("error");
    }

    // Reset status após alguns segundos
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 px-4 w-full max-w-5xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">CONTATO</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
          Iniciar uma Conversa
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Left Side: Contact details */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <h4 className="text-xl font-bold text-white">Entre em contato direto</h4>
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            Tem uma proposta, projeto ou apenas quer conversar? Sinta-se à vontade para enviar uma
            mensagem no formulário ao lado ou me alcançar por e-mail e redes sociais.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            {/* Email Card */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#09090b] border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">EMAIL</span>
                <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {personalInfo.email}
                </span>
              </div>
            </a>
          </div>
          
          <div className="flex items-center gap-3 mt-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-white flex items-center gap-1.5 group transition-colors"
            >
              GitHub <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <span className="text-zinc-800">•</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-white flex items-center gap-1.5 group transition-colors"
            >
              LinkedIn <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 rounded-3xl bg-[#09090b] border border-white/5 hover:border-white/10 transition-colors duration-300"
          >
            <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-5">
              
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  disabled={status === "sending" || status === "success"}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all disabled:opacity-50"
                />
                {errors.name && (
                  <span className="text-[10px] text-rose-500 font-mono mt-1 pl-1">{errors.name[0]}</span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Endereço de E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  disabled={status === "sending" || status === "success"}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all disabled:opacity-50"
                />
                {errors.email && (
                  <span className="text-[10px] text-rose-500 font-mono mt-1 pl-1">{errors.email[0]}</span>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Sua Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  disabled={status === "sending" || status === "success"}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all resize-none disabled:opacity-50"
                />
                {errors.message && (
                  <span className="text-[10px] text-rose-500 font-mono mt-1 pl-1">{errors.message[0]}</span>
                )}
              </div>

              {/* Submit button */}
              <div className="mt-2">
                <motion.button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  className={`w-full relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden outline-none ${
                    status === "success"
                      ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                      : status === "error"
                      ? "bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.15)] hover:shadow-[0_0_25px_rgba(225,29,72,0.3)]"
                      : "bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        Enviar Mensagem
                        <Send className="w-4 h-4" />
                      </motion.span>
                    )}

                    {status === "sending" && (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        Enviando...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </motion.span>
                    )}

                    {status === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        Mensagem Enviada!
                        <Check className="w-4 h-4" />
                      </motion.span>
                    )}

                    {status === "error" && (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-xs"
                      >
                        {errorMessage}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
