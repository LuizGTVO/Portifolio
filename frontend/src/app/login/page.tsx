"use client";

import React, { useState } from "react";
import { loginAdmin } from "@/app/auth/actions";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Por favor, insira a senha de acesso.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await loginAdmin(password);
      if (res.success) {
        // Redireciona usando window.location para forçar a atualização do middleware
        window.location.href = "/dashboard";
      } else {
        setError(res.error || "Ocorreu um erro ao fazer login.");
      }
    } catch (err: any) {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-[#030303] text-foreground flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden select-none">
        
        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex flex-col gap-6"
        >
          {/* Back button */}
          <div className="self-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/5 text-xs font-semibold text-zinc-400 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar ao Portfólio
            </Link>
          </div>

          {/* Form Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/10 backdrop-blur-xl p-8 transition-colors duration-300">
            <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col gap-6">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-2xl font-black text-white tracking-tight">Área Administrativa</h1>
                <p className="text-xs font-mono text-indigo-400 tracking-wider mt-1.5 uppercase">Acesso Restrito</p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                {/* Password input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                    Senha de Administrador
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-4 h-4 text-zinc-600" />
                    <input
                      type="password"
                      id="password"
                      placeholder="••••••••"
                      disabled={loading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 mt-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      Verificando...
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    "Acessar Painel"
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}
