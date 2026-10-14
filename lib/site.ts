export type NavItem = {
  href: string;
  label: string;
};

export const site = {
  name: "Huyen Nguyen",
  tagline: "Senior backend engineer with 6.5 years of experience, now learning full stack and AI engineering.",
  description:
    "Huyen Nguyen's personal website.",
  links: {
    github: "https://github.com/huyenbnguyen",
    linkedin: "https://www.linkedin.com/in/huyenbnguyen/",
  },
};

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
];
