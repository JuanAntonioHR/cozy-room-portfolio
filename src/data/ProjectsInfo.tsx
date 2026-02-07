export interface ProjectInterface {
  id: number;
  title: string;
  image: string;
  description: string;
  github?: string;
  url?: string;
}

export const ProjectsInfo: ProjectInterface[] = [
  {
    id: 1,
    title: "Project 1",
    image: "/images/projects/placeholder.png",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    github: "#",
  },
  {
    id: 2,
    title: "Project 2",
    image: "/images/projects/placeholder.png",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    id: 3,
    title: "Project 3",
    image: "/images/projects/placeholder.png",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    url: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Project 4",
    image: "/images/projects/placeholder.png",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    url: "#",
  },
  {
    id: 5,
    title: "Project 5",
    image: "/images/projects/placeholder.png",
    description: `Lorem ipsum dolor <span className="text-xl">sit amet consectetur adipisicing elit. Quisquam, quod.</span>`,
    url: "#",
  },
];
