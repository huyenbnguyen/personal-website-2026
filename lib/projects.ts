export type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Personal website",
    description:
      "This site: a Next.js App Router project with typed content in the repo.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/huyenbnguyen/personal-website-2026",
  },
  {
    title: "Demo weather app",
    description:
      "A frontend that shows a forecast for a city you search for.",
    tags: ["React", "API"],
    demoUrl: "https://example.com",
  },
];
