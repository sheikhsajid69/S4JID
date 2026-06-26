export type SocialLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type SkillGroup = {
  category: string;
  description: string;
  skills: {
    name: string;
    glyph: string;
  }[];
};

export type Project = {
  name: string;
  description: string;
  tags: string[];
  href?: string;
  ctaLabel: string;
  meta: string;
  website?: string;
};

export type Achievement = {
  title: string;
  subtitle: string;
  icon: string;
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
  highlights: string[];
  logo: string;
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/sheikhsajid69" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sheikhsajid69" },
  { label: "LeetCode", href: "https://leetcode.com/u/sheikhsajid69/" },
  { label: "X", href: "https://x.com/SheikhSajid69" },
];

export const stats: Stat[] = [
  { value: "740+", label: "Production Apps" },
  { value: "3,000+", label: "Active Clients" },
  { value: "15+", label: "Countries" },
  { value: "200+", label: "Team Members" },
  { value: "1M+", label: "Users Served" },
  { value: "$5M+", label: "Revenue Generated" },
];

export const experiences: Experience[] = [
  {
    role: "CTO",
    company: "Neptune.dev",
    period: "Nov 2025 - Present",
    highlights: [
      "Lead product engineering for AI-native developer workflows, quality, and platform reliability.",
      "Own architecture decisions across developer experience, delivery velocity, and production resilience.",
      "Push the stack toward tools that shorten the distance from idea to shipped software.",
    ],
  },
  {
    role: "Founder & CEO",
    company: "Sphereworks Inc.",
    period: "Jan 2024 - Present",
    highlights: [
      "Built a technical venture around scalable software delivery, repeatable systems, and founder-speed execution.",
      "Directed distributed teams across engineering, operations, product strategy, and client delivery.",
      "Turned custom product demands into reusable production workflows and durable internal systems.",
    ],
  },
  {
    role: "GSoC Contributor",
    company: "Google / GDG Bangalore",
    period: "Mar 2025 - Aug 2025",
    highlights: [
      "Contributed open-source engineering work through the GSoC 2025 program and community collaboration.",
      "Worked with mentors and maintainers on production-grade implementation, review, and documentation cycles.",
      "Expanded public technical credibility through code quality, iteration discipline, and community-facing delivery.",
    ],
  },
  {
    role: "Founder & CEO",
    company: "zamoshut.com (EdTech)",
    period: "May 2023 - Jun 2024",
    highlights: [
      "Started the platform as a teenage founder and scaled it into a national EdTech business.",
      "Helped drive $5M+ revenue, 1M+ users, and 500K+ downloads through product-led execution.",
      "Built the operating engine spanning product, growth, support, and delivery systems.",
    ],
  },
  {
    role: "Senior App Dev",
    company: "Freelance (Fiverr/Upwork)",
    period: "Nov 2022 - Jan 2025",
    highlights: [
      "Delivered web, mobile, and automation products for startups and businesses across 15+ countries.",
      "Specialized in shipping quickly without giving up product polish or production readiness.",
      "Turned ambiguous client asks into maintainable systems, launch-ready apps, and measurable outcomes.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    description: "Daily-use languages for product, backend, automation, and interface work.",
    skills: [
      { name: "JavaScript", glyph: "JS" },
      { name: "Python", glyph: "PY" },
      { name: "Java", glyph: "JV" },
      { name: "Swift", glyph: "SW" },
      { name: "TypeScript", glyph: "TS" },
      { name: "HTML5", glyph: "H5" },
      { name: "CSS3", glyph: "C3" },
      { name: "SQL", glyph: "DB" },
    ],
  },
  {
    category: "Frameworks",
    description: "Frontend and runtime frameworks used to move from concept to production quickly.",
    skills: [
      { name: "React", glyph: "R" },
      { name: "Next.js", glyph: "NX" },
      { name: "Node.js", glyph: "ND" },
      { name: "Express", glyph: "EX" },
      { name: "TailwindCSS", glyph: "TW" },
      { name: "Vue", glyph: "VU" },
      { name: "Flutter", glyph: "FL" },
    ],
  },
  {
    category: "AI / ML",
    description: "Applied AI tooling for reasoning systems, retrieval, automation, and product intelligence.",
    skills: [
      { name: "TensorFlow", glyph: "TF" },
      { name: "PyTorch", glyph: "PT" },
      { name: "NLP", glyph: "NL" },
      { name: "LLMs", glyph: "LL" },
      { name: "RAG", glyph: "RG" },
      { name: "Computer Vision", glyph: "CV" },
    ],
  },
  {
    category: "Cloud / DevOps",
    description: "Infrastructure, deployment, and automation stack for stable production delivery.",
    skills: [
      { name: "AWS", glyph: "AW" },
      { name: "OCI (Oracle Certified 2025)", glyph: "OC" },
      { name: "Docker", glyph: "DK" },
      { name: "Kubernetes", glyph: "K8" },
      { name: "GitHub Actions", glyph: "GH" },
      { name: "Vercel", glyph: "VC" },
      { name: "Firebase", glyph: "FB" },
    ],
  },
  {
    category: "Databases",
    description: "Structured and realtime data layers for apps, internal tools, and scale-sensitive systems.",
    skills: [
      { name: "MongoDB", glyph: "MG" },
      { name: "PostgreSQL", glyph: "PG" },
      { name: "MySQL", glyph: "MY" },
      { name: "Redis", glyph: "RD" },
      { name: "Supabase", glyph: "SB" },
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Voxel",
    description:
      "Client-side image-to-voxel pipeline converter using WebGL and Three.js. Transforms any image into a 3D voxelized render with configurable resolution, color mapping modes, and real-time orbit controls.",
    tags: ["JavaScript", "Three.js", "WebGL", "Canvas API"],
    href: "https://github.com/sheikhsajid69/voxel",
    ctaLabel: "GitHub",
    meta: "Image-to-voxel 3D pipeline",
    website: "https://voxel.sheikhsajid69.qzz.io",
  },
  {
    name: "blossom-bg",
    description:
      "Cinematic full-screen hero section with animated floral and dark orb themes, built with React 19, TypeScript, Tailwind CSS, and Framer Motion. Drop-in component for premium landing pages.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    href: "https://github.com/sheikhsajid69/blossom-bg",
    ctaLabel: "GitHub",
    meta: "Cinematic hero section component",
    website: "https://blossom.sheikhsajid69.qzz.io",
  },
  {
    name: "Contri3D",
    description:
      "Renders GitHub and LeetCode contribution activity as a 3D isometric bar chart that can be embedded anywhere through a single image URL.",
    tags: ["JavaScript", "Open Source", "DevTools", "Vercel"],
    href: "https://github.com/sheikhsajid69/Contri3D",
    ctaLabel: "GitHub",
    meta: "Hosted at contri3d.vercel.app",
    website: "https://contri3d.vercel.app",
  },
  {
    name: "InvoiceMindAI",
    description:
      "Autonomous AI financial reasoning assistant built for freelancers and small businesses handling invoices, cash flow, and financial clarity.",
    tags: ["TypeScript", "AI", "LLM", "FinTech"],
    href: "https://github.com/sheikhsajid69/InvoiceMindAi",
    ctaLabel: "GitHub",
    meta: "Autonomous financial reasoning assistant",
  },
  {
    name: "MavrickCodeAI",
    description:
      "AI-powered code editor focused on context-aware completions, faster iteration loops, and a developer-first editing workflow.",
    tags: ["TypeScript", "AI", "Developer Tools"],
    href: "https://github.com/sheikhsajid69/MavrickCodeAi",
    ctaLabel: "GitHub",
    meta: "Context-aware coding environment",
  },
  {
    name: "GalleryApp v2.5",
    description:
      "Progressive, feature-rich gallery app built through iterative releases with a strong focus on frontend craft and visual usability.",
    tags: ["HTML", "Frontend"],
    href: "https://github.com/sheikhsajid69/GalleryApp.v2.5",
    ctaLabel: "GitHub",
    meta: "Iterative frontend product build",
  },
  {
    name: "VIBE AI",
    description:
      "AI-powered development assistant for code generation, builder ideation, and tighter creation-feedback loops.",
    tags: ["AI", "LLMs", "Developer Tools"],
    ctaLabel: "Private Build",
    meta: "Internal development assistant concept",
  },
  {
    name: "zamoshut.com",
    description:
      "EdTech platform scaled through product execution to $5M+ revenue, 1M+ users, and more than 500K downloads.",
    tags: ["EdTech", "Platform", "Startup"],
    href: "https://zamoshut.com",
    ctaLabel: "Visit Site",
    meta: "1M+ users served",
  },
  {
    name: "AI-Enabled Canvas",
    description:
      "AI-integrated collaborative canvas tool enabling intelligent drawing, editing, and real-time creative workflows powered by machine learning.",
    tags: ["AI", "Canvas", "Collaboration", "TypeScript"],
    ctaLabel: "Private Build",
    meta: "AI-powered creative tool",
  },
  {
    name: "Crystal-Works",
    description:
      "Design-focused engineering framework for building polished, production-ready component systems with crystalline precision.",
    tags: ["TypeScript", "Design Systems", "Frontend"],
    href: "https://github.com/sheikhsajid69/Crystal-Works",
    ctaLabel: "GitHub",
    meta: "Design-first component framework",
  },
  {
    name: "Notebook.light v2.5",
    description:
      "Lightweight, fast note-taking app with a minimal interface, markdown support, and iterative feature development across multiple releases.",
    tags: ["HTML", "JavaScript", "Frontend"],
    href: "https://github.com/sheikhsajid69/Notebook.light.v2.5",
    ctaLabel: "GitHub",
    meta: "Minimal notes app",
  },
  {
    name: "NLP / LLM / RAG Applications",
    description:
      "Suite of applied AI projects covering natural language processing, large language model integration, and retrieval-augmented generation pipelines.",
    tags: ["Python", "AI", "NLP", "LLMs", "RAG"],
    ctaLabel: "Private Build",
    meta: "Applied AI pipeline suite",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Forbes 30 Under 30 Nominee",
    subtitle: "Young Entrepreneur",
    icon: "trophy",
  },
  {
    title: "GSoC 2025 Project Collaborator",
    subtitle: "Google",
    icon: "flask",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified",
    subtitle: "Cloud & Platform",
    icon: "cloud",
  },
  {
    title: "Claude Code Certified",
    subtitle: "AI Tooling",
    icon: "badge",
  },
  {
    title: "Harvard Business School",
    subtitle: "Certificate in Entrepreneurship (2024-2025)",
    icon: "graduation",
  },
  {
    title: "IELTS Band 8.5",
    subtitle: "Language Proficiency",
    icon: "speech",
  },
  {
    title: "SAT 1592/1600",
    subtitle: "Academic Benchmark",
    icon: "pen",
  },
  {
    title: "India's Top 13 EdTech Platform 2023-24",
    subtitle: "zamoshut.com",
    icon: "globe",
  },
  {
    title: "Registered IP",
    subtitle: "Modern Visual Site Map + Most Design Prompt Accurate AI 2025",
    icon: "scroll",
  },
  {
    title: "Featured on Google Search",
    subtitle: "Entrepreneurial Achievements",
    icon: "search",
  },
  {
    title: "AI Fluency for Students",
    subtitle: "Certified in Applied AI Concepts",
    icon: "badge",
  },
  {
    title: "Business Mentor on Topmate.io",
    subtitle: "8 months of startup mentoring",
    icon: "award",
  },
];

export const education: Education[] = [
  {
    institution: "Harvard Business School Online",
    degree: "Certificate in Entrepreneurship",
    period: "Jul 2024 – Aug 2025",
    highlights: [
      "Completed a rigorous certificate program covering entrepreneurship, venture building, and business strategy.",
      "Applied frameworks for scaling startups, managing cross-functional teams, and making data-driven business decisions.",
      "Additional Recognition: Forbes 30 Under 30 Nominee, Featured on Google Search for entrepreneurial achievements.",
    ],
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Harvard_Business_School_shield_logo.svg/330px-Harvard_Business_School_shield_logo.svg.png",
  },
  {
    institution: "Nagarjuna College of Engineering and Technology",
    degree: "Business and Commerce Studies",
    period: "Jun 2022 – Apr 2024",
    highlights: [
      "Completed studies in business and commerce while simultaneously building and scaling multiple startups.",
      "Balanced academic coursework with active technical leadership, open-source contributions, and product shipping.",
    ],
    logo: "/nagarjuna_logo.png",
  },
  {
    institution: "Carmel English School",
    degree: "Schooling",
    period: "May 2011 – Apr 2022",
    highlights: [
      "Grade: 8.8 CGPA",
      "Activities and societies: Chess, seminar, public speaking, arts, story writing, environment protection",
      "Skills: Public Speaking, Public Relations, and more",
    ],
    logo: "https://carmelenglishschool.com/img/carlogo.jpg",
  },
];
