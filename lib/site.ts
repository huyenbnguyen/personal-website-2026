export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  type: string;
  link: string;
  iconPath: string;
}

const socialLinks: SocialLink[] = [
  { 
    type: "GitHub",
    link: "https://github.com/huyenbnguyen", 
    iconPath: "/github.svg"
  },
  {
    type: "LinkedIn",
    link: "https://www.linkedin.com/in/huyenbnguyen/",
    iconPath: "/linkedin.svg"
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
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
];
