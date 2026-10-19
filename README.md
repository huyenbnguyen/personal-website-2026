# Huyen Nguyen — Personal Website

My personal website: a home page with a short bio and skills, a list of projects, my
resume and a blog. I'm building it as a learning project for modern full-stack web
development, so the code favors clarity over cleverness.

There is no database or backend. All content lives in the repo as TypeScript files and
static assets.

## Features

- **Home** (`/`): photo, summary and skills in a two-column layout that stacks on phones
- **Projects** (`/projects`): project cards with tags and GitHub/demo links
- **Resume** (`/resume`): the PDF shown on the page, plus a download button
- **Blog** (`/blog`, `/blog/<slug>`): a post list and pre-rendered post pages
- **Dark/light mode**: follows the system setting, remembers your choice and doesn't flash
  the wrong theme on load
- **Active nav highlighting**: the current section is underlined and marked with
  `aria-current="page"`
- **Header and footer**: on every page, with GitHub and LinkedIn links and a copyright notice

## Tech stack

| Tool | Version | Used for |
|------|---------|----------|
| [Next.js](https://nextjs.org) | 16.4 | App Router, Turbopack, Cache Components |
| [React](https://react.dev) | 19.3 | UI, Server Components by default |
| [TypeScript](https://www.typescriptlang.org) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Styling, configured in CSS (no `tailwind.config.js`) |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | Theme switching without a flash |
| [lucide-react](https://lucide.dev) | 1 | Sun and moon icons |
| [ESLint](https://eslint.org) | 9 | Linting with flat config, including import order |

## Getting started

You need Node.js 20 or later.

```bash
git clone git@github.com:huyenbnguyen/personal-website-2026.git
cd personal-website-2026
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server at http://localhost:3000 |
| `npm run build` | Make a production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (add `-- --fix` to auto-fix) |
| `npx tsc --noEmit` | Type-check without building |

## Project structure

```
app/                      # Routes: each folder is a URL, page.tsx makes it a page
  layout.tsx              # Root layout: <html>, header, footer, theme provider
  page.tsx                # Home (/)
  globals.css             # Tailwind import, theme colors, dark-mode variant
  projects/page.tsx       # /projects
  resume/page.tsx         # /resume
  blog/page.tsx           # /blog: list of posts
  blog/[slug]/page.tsx    # /blog/<slug>: one post
components/               # Shared UI
  Header.tsx              # Site name, nav, social links, theme toggle
  NavLinks.tsx            # Nav with active-link highlighting (client component)
  ThemeToggle.tsx         # Dark/light switch (client component)
  SocialLinks.tsx         # GitHub and LinkedIn icon links
  Footer.tsx              # Copyright notice
lib/                      # Data and helpers (no UI)
  site.ts                 # Name, tagline, social links, nav items
  projects.ts             # Project list
  posts.ts                # Blog posts and helpers
public/                   # Static files served from the site root
  profile/profile.jpeg
  resume/Huyen_Nguyen_Resume.pdf
  socials/                # GitHub and LinkedIn SVG icons
```

## Updating content

| To change… | Edit |
|------------|------|
| Name, tagline, social links, nav | `lib/site.ts` |
| Projects | Add or edit an object in the `projects` array in `lib/projects.ts` |
| Blog posts | Add an object to the `posts` array in `lib/posts.ts`; separate paragraphs in `body` with a blank line (`\n\n`) |
| Resume | Replace `public/resume/Huyen_Nguyen_Resume.pdf`, keeping the same filename |
| Profile photo | Replace `public/profile/profile.jpeg` (and update its `width`/`height` in `app/page.tsx` if the size changes) |
| Favicon | Replace `app/favicon.ico` |

## Contributing workflow

This repo uses feature branches named `<type>/<short-description>`, where the type is
`feat/`, `fix/`, `refactor/`, `chore/`, `docs/` or `style/`. Commit messages follow
[Conventional Commits](https://www.conventionalcommits.org). `npm run lint` and
`npm run build` must pass before committing. See [`AGENTS.md`](AGENTS.md) for the full
conventions.
