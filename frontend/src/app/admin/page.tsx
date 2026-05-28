import React from "react";
import prisma from "@/lib/db";
import { logout } from "@/app/auth/actions";
import { ArrowLeft, Mail, LogOut, Calendar, User, MessageSquare } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

export default async function AdminPage() {
  let messages: any[] = [];
  try {
    messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error("Erro ao carregar mensagens no painel admin:", err);
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
              <a
                href="/dashboard"
                className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </a>
              <div>
                <h1 className="text-lg font-black text-white leading-none">Mensagens de Contato</h1>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mt-1">Gerenciamento de Mensagens</span>
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

          {/* Messages list */}
          <div className="flex flex-col gap-4 mt-4">
            {messages.length === 0 ? (
              <div className="group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/5 p-12 text-center">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 text-zinc-500 w-fit mx-auto">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mt-4">Nenhuma mensagem recebida</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto leading-relaxed font-light">
                  Quando alguém enviar uma mensagem através do formulário de contato do seu portfólio, ela aparecerá listada aqui.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="group relative overflow-hidden rounded-3xl bg-[#09090b] border border-white/5 hover:border-white/10 p-6 transition-colors duration-300 flex flex-col gap-4"
                >
                  <div className="absolute inset-0 radial-spotlight pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Sender metadata info */}
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-indigo-400">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-none">{msg.name}</h4>
                        <span className="text-[10px] font-mono text-zinc-500 block mt-1 hover:text-indigo-300 transition-colors">
                          <a href={`mailto:${msg.email}`}>{msg.email}</a>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-start md:self-center px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-zinc-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {new Date(msg.createdAt).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="relative z-10 flex gap-3 items-start px-1 py-1">
                    <MessageSquare className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>
    </>
  );
}
