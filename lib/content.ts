export type Home = {
  bio: string;
  skills: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export type Resume = {
  experience: Experience[];
  education: Education[];
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export const home: Home = {
  bio: "I'm a software engineer who likes clear code, small tools, and learning in public. This site is a place for projects, a resume, and notes.",
  skills: ["TypeScript", "React", "Next.js", "Python", "SQL"],
};

export const resume: Resume = {
  experience: [
    {
      role: "Software Engineer",
      company: "Example Corp",
      period: "2023 — Present",
      summary:
        ["Built product features", "Improved reliability", "Collaborated with design and data teams"],
    },
    {
      role: "Software Engineering Intern",
      company: "Example Labs",
      period: "Summer 2022",
      summary:
        ["Shipped an internal dashboard", "Wrote tests for the team's API"],
    },
  ],
  education: [
    {
      school: "Worcester Polytechnic Institute",
      degree: "B.S. Computer Science",
      period: "2014 — 2018",
    },
  ],
};

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    date: "2026-01-12",
    excerpt: "Why this site exists and what I plan to write about.",
    body: "This is a placeholder post. I'll replace it with real writing later.\n\nFor now it exists so the blog list and post pages have something to render.",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
