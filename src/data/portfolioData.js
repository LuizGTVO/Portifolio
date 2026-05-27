export const personalInfo = {
  name: "Luiz Gustavo",
  fullName: "Luiz Gustavo de Oliveira Menino",
  title: "Full Stack Developer",
  subtitle: "Estudante de Informática para Internet no Instituto Federal de São Paulo (IFSP) - Campus Caraguatatuba.",
  bio: "Focado no desenvolvimento de interfaces web modernas, fluidas e interativas. Combinando design minimalista com boas práticas de código para criar experiências memoráveis na web.",
  location: "Caraguatatuba, SP, Brasil",
  email: "luiz.gustavo@example.com", // Mock contact email
  github: "https://github.com/LuizGTVO",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  availability: "Disponível para novos projetos e estágios",
};

export const navLinks = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Projetos", href: "#projects" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Educação", href: "#education" },
  { label: "Contato", href: "#contact" }
];

export const projects = [
  {
    id: "recipefinder",
    title: "RecipeFinder",
    subtitle: "Buscador de Receitas",
    description: "Uma aplicação interativa para buscar e salvar receitas culinárias baseadas nos ingredientes disponíveis em sua despensa.",
    detailedDescription: "Desenvolvido para facilitar a busca por pratos e otimizar o uso de alimentos em casa. Integra APIs externas de receitas, oferece filtros avançados por restrições alimentares e permite criar um livro pessoal de receitas favoritas salvas localmente.",
    tags: ["React", "JavaScript", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/LuizGTVO/RecipeFinder",
    live: "https://example.com",
    color: "from-orange-600/20 via-red-600/10 to-transparent",
    accentColor: "#f97316",
    metric: "Busca por ingredientes"
  },
  {
    id: "clonespotify",
    title: "CloneSpotify",
    subtitle: "Clone do Spotify Web",
    description: "Uma reprodução premium da interface da web do Spotify com player de áudio simulado, navegação e animações fluidas.",
    detailedDescription: "Focado em alta fidelidade visual de front-end. Desenvolvido para simular a navegação do Spotify Web, integrando players de áudio mockados, controle de volume deslizante, design responsivo de altíssima qualidade e microinterações fiéis ao app original.",
    tags: ["React", "JavaScript", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/LuizGTVO/CloneSpotify",
    live: "https://example.com",
    color: "from-green-600/20 via-emerald-600/10 to-transparent",
    accentColor: "#22c55e",
    metric: "Interface pixel-perfect"
  },
  {
    id: "sociallinks",
    title: "SocialLinks",
    subtitle: "Agrupador de Links Sociais",
    description: "Uma landing page minimalista inspirada em Linktree para reunir redes sociais de forma elegante, responsiva e performática.",
    detailedDescription: "Focado em design limpo e velocidade de carregamento de páginas. Utiliza estruturas semânticas simples, estilizações dinâmicas, animações sutis de entrada e compatibilidade perfeita com qualquer dispositivo móvel.",
    tags: ["HTML5", "CSS3", "JavaScript", "TailwindCSS"],
    github: "https://github.com/LuizGTVO/SocialLinks",
    live: "https://example.com",
    color: "from-purple-600/20 via-blue-600/10 to-transparent",
    accentColor: "#a855f7",
    metric: "Carregamento ultrarrápido"
  },
  {
    id: "cityfrontend",
    title: "City Frontend",
    subtitle: "Interface de Portal Urbano",
    description: "Interface moderna e responsiva para um sistema de gestão e informações municipais com mapas e dashboards interativos.",
    detailedDescription: "Desenvolvido com foco em usabilidade e performance. Apresenta painéis de controle de serviços públicos, visualização de dados geográficos interativos, gráficos de consumo/atividades municipais e um design de alta fidelidade responsivo.",
    tags: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/jeanbrito-dev/city-frontend",
    live: "https://example.com",
    color: "from-blue-600/20 via-sky-600/10 to-transparent",
    accentColor: "#3b82f6",
    metric: "Dashboard & Mapas"
  },
  {
    id: "citybackend",
    title: "City Backend",
    subtitle: "API REST e Gestão Urbana",
    description: "API robusta e escalável desenvolvida para gerenciar fluxos de dados municipais, autenticação e controle de serviços urbanos.",
    detailedDescription: "Arquitetura voltada para alta disponibilidade e segurança. Implementa controle de acessos baseado em perfis, criptografia de senhas, validação rígida de dados, rotas de consulta otimizadas e integração com bancos de dados relacionais.",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    github: "https://github.com/jeanbrito-dev/city-backend",
    live: "https://example.com",
    color: "from-teal-600/20 via-emerald-600/10 to-transparent",
    accentColor: "#0d9488",
    metric: "API REST Segura"
  }
];

export const skills = [
  // Categories: frontend, backend, design, tools
  { name: "React & Next.js", category: "frontend", icon: "react" },
  { name: "JavaScript (ES6+)", category: "frontend", icon: "js" },
  { name: "HTML5 / CSS3", category: "frontend", icon: "html" },
  { name: "TailwindCSS", category: "frontend", icon: "tailwind" },
  { name: "Framer Motion", category: "frontend", icon: "motion" },
  { name: "Node.js / Express", category: "backend", icon: "node" },
  { name: "SQL & Databases", category: "backend", icon: "database" },
  { name: "Git & GitHub", category: "tools", icon: "git" },
  { name: "UI/UX no Figma", category: "design", icon: "figma" },
  { name: "Design Responsivo", category: "design", icon: "layout" }
];

export const education = [
  {
    year: "2026 - Presente",
    institution: "Instituto Federal de São Paulo (IFSP)",
    campus: "Campus Caraguatatuba",
    course: "Técnico em Informática para Internet",
    description: "Curso focado no desenvolvimento de sistemas web front-end e back-end, banco de dados, design de interfaces e redes de computadores.",
    highlights: [
      "Desenvolvimento de projetos práticos web interativos",
      "Lógica de programação orientada a objetos e algoritmos estruturados",
      "Projetação de banco de dados SQL e arquiteturas cliente-servidor"
    ]
  },
  {
    year: "2024",
    institution: "Cursos Extras & Autodidatismo",
    campus: "Plataformas Online",
    course: "Especialização Front-End & UI/UX",
    description: "Estudos paralelos com foco no ecossistema moderno do React, estilização avançada com TailwindCSS e bibliotecas de animações como Framer Motion.",
    highlights: [
      "Prática de design system, tipografia e hierarquia visual",
      "Consumo de APIs RESTful e boas práticas de git/versionamento de código"
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Coordenadora de Projetos | IFSP",
    quote: "O Luiz demonstrou extrema dedicação e competência técnica no desenvolvimento das soluções do projeto. Sua atenção aos detalhes visuais e performance superou nossas expectativas.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    color: "from-indigo-500/10 via-purple-500/5 to-transparent"
  },
  {
    id: 2,
    name: "Carlos Santos",
    role: "Full Stack Dev | DevCorp",
    quote: "Trabalhar com o Luiz no desenvolvimento de interfaces foi excelente. Ele tem uma facilidade incrível para transformar layouts complexos do Figma em código limpo, responsivo e animado.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    color: "from-emerald-500/10 via-teal-500/5 to-transparent"
  },
  {
    id: 3,
    name: "Mariana Souza",
    role: "Professora de Web | IFSP",
    quote: "Um estudante exemplar com uma curiosidade insaciável por tecnologias modernas. O seu RecipeFinder mostra perfeitamente como ele consegue aliar lógica estruturada a um design minimalista premium.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    color: "from-purple-500/10 via-pink-500/5 to-transparent"
  }
];
