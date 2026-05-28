import React from "react";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/auth/actions";
import prisma from "@/lib/db";
import { LayoutDashboard, Mail, LogOut, ShieldAlert, ArrowRight } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DashboardProjectsManager from "@/components/DashboardProjectsManager";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let messageCount = 0;
  let projects: any[] = [];
  
  try {
    messageCount = await prisma.contactMessage.count();
    projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error("Erro ao carregar dados no dashboard:", err);
  }

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-[#030303] text-foreground flex flex-col items-center justify-start px-4 py-16 relative overflow-hidden select-none">
        
        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

        <div className="w-full max-w-4xl flex flex-col gap-6">
          
          {/* Header row */}
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-indigo-400">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-white leading-none">Dashboard</h1>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mt-1">Painel Administrativo</span>
              </div>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.01] hover:bg-rose-500/10 hover:border-rose-500/20 hover:text-rose-400 text-xs font-semibold text-zinc-400 transition-all duration-300 cursor-pointer"
              >
                Sair
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Messages Stat Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/10 p-6 transition-colors duration-300">
              <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[120px]">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Inbox</span>
                </div>
                <div className="mt-4">
                  <div className="text-4xl font-black text-white font-mono">{messageCount}</div>
                  <p className="text-xs text-zinc-500 font-mono tracking-wider mt-1 uppercase">Mensagens de Contato</p>
                </div>
              </div>
            </div>

            {/* Admin Profile Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/10 p-6 transition-colors duration-300">
              <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[120px]">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-500">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Acesso</span>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-bold text-white truncate max-w-[280px]">
                    {user?.email || "Administrador"}
                  </div>
                  <p className="text-xs text-zinc-500 font-mono tracking-wider mt-1.5 uppercase">Role: Admin</p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick link button to messages */}
          <a
            href="/admin"
            className="group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/10 p-5 transition-colors duration-300 flex items-center justify-between"
          >
            <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white">Visualizar Mensagens</h4>
                <p className="text-xs text-zinc-500 mt-1 font-light">
                  Acessar a lista detalhada e ler o conteúdo dos formulários de contato recebidos.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 relative z-10" />
          </a>

          {/* Projects Manager Component */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/5 p-6 mt-2">
            <DashboardProjectsManager initialProjects={projects} />
          </div>

        </div>
      </main>
    </>
  );
}
