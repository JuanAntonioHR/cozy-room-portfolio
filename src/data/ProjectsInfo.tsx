export interface ProjectInterface {
  id: number;
  title: string;
  images: string[];
  role: string;
  technologies: string[];
  description: string;
  github?: string;
  url?: string;
}

export const ProjectsInfo: ProjectInterface[] = [
  {
    id: 1,
    title: "Antonio's Portfolio",
    images: [
      "/images/projects/portfolio0.png",
      "/images/projects/portfolio1.png",
      "/images/projects/portfolio2.png",
    ],
    role: "WebGL & Frontend Dev",
    technologies: ["React", "R3F", "GSAP", "Zustand", "Motion"],
    description:
      "My interactive 3D portfolio. A cozy room inspired by retro, glassmorphism and voxel aesthetics.",
    github: "https://github.com/JuanAntonioHR/cozy-room-portfolio",
  },
  {
    id: 2,
    title: "UAQ Job Board",
    images: [
      "/images/projects/chambauaq0.png",
      "/images/projects/chambauaq1.png",
      "/images/projects/chambauaq2.png",
      "/images/projects/chambauaq3.png",
      "/images/projects/chambauaq4.png",
      "/images/projects/chambauaq5.png",
    ],
    role: "Frontend Dev & Designer",
    technologies: ["Figma", "API REST", "Next.js", "Shadcn", "Zustand"],
    description: "Job board platform for the UAQ university community",
    url: "https://www.uaq.mx/informatica/BolsaDeTrabajoUAQ/",
  },
  {
    id: 3,
    title: "Sac 2025 Lego Card Generator",
    images: ["/images/projects/sac0.png", "/images/projects/sac1.png", "/images/projects/sac2.png"],
    role: "Frontend Developer",
    technologies: ["Lottie", "Figma", "Howler.js", "Tailwind"],
    description: "Custom LEGO character card generator, created for the SAC25 university event.",
    url: "https://sac.fif-uaq.mx/expsearch",
  },
  {
    id: 4,
    title: "Risy",
    images: [
      "/images/projects/risy0.png",
      "/images/projects/risy1.png",
      "/images/projects/risy2.png",
      "/images/projects/risy3.png",
    ],
    role: "Frontend Dev & Designer",
    technologies: ["Figma", "Tailwind", "Next.js", "Shadcn", "Motion"],
    description:
      "Web platform that connects food suppliers with people or organizations interested in cheaper food.",
    url: "https://risy.vercel.app/",
    github: "https://github.com/diegogama8934/risy",
  },
];
