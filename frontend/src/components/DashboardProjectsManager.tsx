"use client";

import React, { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, X, ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";
import { createProject, updateProject, deleteProject } from "@/app/auth/projectActions";
import { projects as staticProjects } from "@/data/portfolioData";

const Github = ({ className }: { className?: string }) => (
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

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl: string | null;
  liveUrl: string | null;
  technologies: string[];
  featured: boolean;
}

interface Props {
  initialProjects: Project[];
}

export default function DashboardProjectsManager({ initialProjects }: Props) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"upload" | "visualizer">("upload");
  const [visualizer, setVisualizer] = useState("");

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setGithubUrl("");
    setLiveUrl("");
    setTechnologies("");
    setFeatured(false);
    setImageFile(null);
    setMediaType("upload");
    setVisualizer("");
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setGithubUrl(project.githubUrl || "");
    setLiveUrl(project.liveUrl || "");
    setTechnologies(project.technologies.join(", "));
    setFeatured(project.featured);
    setImageFile(null);
    if (project.image && project.image.startsWith("mock:")) {
      setMediaType("visualizer");
      setVisualizer(project.image.replace("mock:", ""));
    } else {
      setMediaType("upload");
      setVisualizer("");
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleAutofill = (mockId: string) => {
    const selected = staticProjects.find(p => p.id === mockId);
    if (selected) {
      setTitle(selected.title);
      setDescription(selected.detailedDescription || selected.description);
      setGithubUrl(selected.github || "");
      setLiveUrl(selected.live || "");
      setTechnologies(selected.tags.join(", "));
      setMediaType("visualizer");
      setVisualizer(selected.id);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("githubUrl", githubUrl);
    formData.append("liveUrl", liveUrl);
    formData.append("technologies", technologies);
    formData.append("featured", featured ? "true" : "false");
    
    if (mediaType === "visualizer") {
      formData.append("visualizer", visualizer);
    } else if (imageFile) {
      formData.append("image", imageFile);
    }

    startTransition(async () => {
      try {
        let res;
        if (editingProject) {
          res = await updateProject(editingProject.id, formData);
        } else {
          res = await createProject(formData);
        }

        if (res.success && res.project) {
          // Update local state
          const updatedProj = res.project as unknown as Project;
          if (editingProject) {
            setProjects(prev => prev.map(p => p.id === updatedProj.id ? updatedProj : p));
          } else {
            setProjects(prev => [updatedProj, ...prev]);
          }
          setIsModalOpen(false);
        } else {
          setError(res.error || "Ocorreu um erro ao salvar o projeto.");
        }
      } catch (err: any) {
        console.error("Erro ao salvar projeto:", err);
        setError(`Erro ao se conectar com o servidor: ${err?.message || err}`);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

    startTransition(async () => {
      try {
        const res = await deleteProject(id);
        if (res.success) {
          setProjects(prev => prev.filter(p => p.id !== id));
        } else {
          alert(res.error || "Erro ao deletar projeto.");
        }
      } catch (err) {
        alert("Erro ao excluir o projeto.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Action Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-4 mt-4">
        <h3 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">Projetos Ativos</h3>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all duration-300 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {/* Projects Grid/Table */}
      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? (
          <div className="text-center py-12 rounded-3xl border border-white/5 bg-white/[0.01]">
            <p className="text-xs text-zinc-500">Nenhum projeto cadastrado no banco de dados.</p>
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-[#09090b] border border-white/5 hover:border-white/10 transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                {proj.image && proj.image.startsWith("mock:") ? (
                  <div className="w-16 h-16 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center text-[8px] font-mono text-indigo-400 text-center px-1 font-bold shrink-0">
                    <span>MOCK</span>
                    <span className="uppercase text-[6px] text-zinc-500 mt-1 truncate max-w-full">
                      {proj.image.replace("mock:", "")}
                    </span>
                  </div>
                ) : (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                )}
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {proj.title}
                    {proj.featured && (
                      <span className="text-[8px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase">
                        Destaque
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-zinc-500 line-clamp-1 mt-1 font-light max-w-md">{proj.description}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {proj.technologies.map(tech => (
                      <span key={tech} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => openEditModal(proj)}
                  className="p-2 rounded-lg bg-white/5 text-amber-500 hover:bg-amber-500/10 transition-all cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-2 rounded-lg bg-white/5 text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal CRUD Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#09090b] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
              <h3 className="text-base font-bold text-white">
                {editingProject ? "Editar Projeto" : "Criar Novo Projeto"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3.5 mb-5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
              
              {/* Template Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                  Carregar de um Template do Mock (Opcional)
                </label>
                <select
                  onChange={(e) => {
                    handleAutofill(e.target.value);
                    e.target.value = ""; // Reset select
                  }}
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-zinc-400 outline-none transition-all focus:border-indigo-500/50 cursor-pointer"
                >
                  <option value="" disabled>-- Selecione um template para preenchimento rápido --</option>
                  {staticProjects.map((p) => (
                    <option key={p.id} value={p.id}>{p.title} ({p.subtitle})</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                  Título do Projeto
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: CloneSpotify"
                  className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                  Descrição
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o que o projeto faz..."
                  className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GitHub URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                    URL do GitHub
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>

                {/* Live Demo URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                    URL de Demonstração
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://exemplo.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                  Tecnologias (Separadas por vírgula)
                </label>
                <input
                  type="text"
                  required
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="Ex: React, TypeScript, TailwindCSS"
                  className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white placeholder-zinc-700 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 outline-none transition-all"
                />
              </div>

              {/* Media Presentation Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                  Tipo de Apresentação Visual
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMediaType("upload")}
                    className={`py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      mediaType === "upload"
                        ? "bg-white text-black border-white"
                        : "bg-[#030303] text-zinc-400 border-white/5 hover:border-white/10"
                    }`}
                  >
                    Upload de Imagem
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType("visualizer")}
                    className={`py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      mediaType === "visualizer"
                        ? "bg-white text-black border-white"
                        : "bg-[#030303] text-zinc-400 border-white/5 hover:border-white/10"
                    }`}
                  >
                    Visualizador Interativo
                  </button>
                </div>
              </div>

              {/* Conditionally show File Input or Visualizer Dropdown */}
              {mediaType === "upload" ? (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                    Imagem do Projeto {editingProject && "(Deixe vazio para manter a atual)"}
                  </label>
                  <div className="relative flex items-center justify-center border border-white/5 rounded-xl bg-[#030303] py-4 px-6 hover:border-white/10 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      required={!editingProject && !visualizer}
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-1.5 text-zinc-500 text-xs">
                      <ImageIcon className="w-5 h-5 text-indigo-400" />
                      <span>
                        {imageFile ? imageFile.name : "Clique para selecionar a imagem"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
                    Escolha o Visualizador Interativo
                  </label>
                  <select
                    required
                    value={visualizer}
                    onChange={(e) => setVisualizer(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#030303] border border-white/5 text-sm text-white outline-none transition-all focus:border-indigo-500/50 cursor-pointer"
                  >
                    <option value="" disabled>-- Selecione um visualizador --</option>
                    <option value="recipefinder">RecipeFinder (Ingredientes e Progresso)</option>
                    <option value="clonespotify">CloneSpotify (Equalizador de Ondas Sonoras)</option>
                    <option value="sociallinks">SocialLinks (Árvore de Links Sociais)</option>
                    <option value="cityfrontend">City Frontend (Dashboard Municipal e Mapa)</option>
                    <option value="citybackend">City Backend (Fluxo de API REST)</option>
                  </select>
                </div>
              )}

              {/* Featured Checkbox */}
              <div className="flex items-center gap-3 py-2 pl-1 select-none">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-white/5 bg-[#030303] text-indigo-600 focus:ring-0"
                />
                <label htmlFor="featured" className="text-xs text-zinc-400 cursor-pointer">
                  Destacar este projeto na página principal (Destaque)
                </label>
              </div>

              {/* Submit Row */}
              <div className="mt-4 pt-4 border-t border-white/5 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl border border-white/5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isPending ? (
                    <>
                      Salvando...
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </>
                  ) : (
                    "Salvar Projeto"
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
