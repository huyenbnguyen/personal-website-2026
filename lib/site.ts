export type Home = {
  bio: string;
  skills: string[];
};

export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  type: string;
  link: string;
  iconPath: string;
}

export const home: Home = {
  bio: "I'm a software engineer who likes clear code, small tools, and learning in public. This site is a place for projects, a resume, and notes.",
  skills: ["TypeScript", "React", "Next.js", "Python", "SQL"],
};

const socialLinks: SocialLink[] = [
  { 
    type: "GitHub",
    link: "https://github.com/huyenbnguyen", 
    iconPath: "/socials/github.svg"
  },
  {
    type: "LinkedIn",
    link: "https://www.linkedin.com/in/huyenbnguyen/",
    iconPath: "/socials/linkedin.svg"
  }
]

export const site = {
  name: "Huyen Nguyen",
  tagline: "Senior backend engineer with 6.5 years of experience, now learning full stack and AI engineering.",
  description:
    "Huyen Nguyen's personal website.",
  links: socialLinks,
  year: "2026"
};

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
];
