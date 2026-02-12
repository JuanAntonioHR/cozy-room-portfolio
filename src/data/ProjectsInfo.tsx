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
    title: "Project 2",
    images: ["/images/projects/portfolio.png", "/images/projects/portfolio.png"],
    role: "Developer & Designer",
    technologies: ["React", "R3F", "GSAP", "Zustand", "Motion", "Howler"],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    id: 3,
    title: "Project 3",
    images: ["/images/projects/portfolio.png", "/images/projects/portfolio.png"],
    role: "Developer & Designer",
    technologies: ["React", "R3F", "GSAP", "Zustand", "Motion", "Howler"],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    url: "#",
    github: "#",
  },
];
