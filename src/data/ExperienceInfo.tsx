export type ExperienceInfoType = {
  image: string;
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
};

export const experienceInfo: ExperienceInfoType[] = [
  {
    image: "/images/experiences/petco.png",
    title: "Software Eng. Intern",
    company: "Petco",
    date: "May 2025 - Jan 2026",
    description: `Worked as part of the Quality Assurance team supporting a large-scale Point of Sale (POS) system. My responsibilities included executing manual functional, regression, and smoke tests to ensure system stability and reliability across releases.

I documented test cases and test results using dedicated test management tools, and reported, tracked, and verified defects in close collaboration with developers. I also supported end-to-end validation processes and worked within an Agile (Scrum) environment, participating in daily meetings, sprint planning, and refinement sessions.

I collaborated with cross-functional and international teams, communicating in English on a daily basis and adapting to distributed workflows. Through this experience, I strengthened my attention to detail, testing methodology, and understanding of software delivery pipelines and quality assurance best practices.`,
    skills: ["QA", "Jira", "SQL", "Agile / Scrum", "CI/CD Fundamentals"],
  },
  {
    image: "/images/experiences/cd.png",
    title: "Web Dev. Intern",
    company: "Centro de Desarrollo - FIF",
    date: "Mar 2022 - Jan 2026",
    description: `Participated in an extracurricular development program focused on integrating students into real-world projects with actual clients and organizations from early stages. I was actively involved from my first semesters, working primarily as a web designer and developer, where I built the foundations of my current professional skill set.

I collaborated on multiple web initiatives for internal and external stakeholders, contributing to the design, development, and deployment of web experiences. My work covered the full process, from requirements definition and client communication to prototyping, design system creation, and implementation.`,
    skills: [
      "Client Requirements",
      "UI/UX",
      "Web Development",
      "Design Systems",
      "Accesibility",
      "Prototyping",
    ],
  },
];
