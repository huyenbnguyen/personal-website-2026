# AGENTS.md

Huyen's personal website. Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
It is a learning project, so clarity beats cleverness. No database or backend; content lives in the repo.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Non-negotiable rules

1. **Feature branches only.** Never commit to `main`. Name branches `<type>/<short-description>`
   using `feat/`, `fix/`, `refactor/`, `chore/`, `docs/` or `style/` (e.g. `feat/theme-toggle`).
2. **Ask before every commit.** Never run `git commit`, `push`, `merge` or `rebase` without explicit approval.
3. **Explain and justify each change:** what changed, why, and why this approach over the alternatives.
   Briefly explain any Next.js, React or TypeScript concept that may be unfamiliar.
4. **Don't overengineer.** Do only what the task asks. No new dependency, database, CMS, auth,
   state library or API layer without approval. Don't refactor unrelated code; suggest it instead.
5. **Lint and build must pass** before asking to commit. Fix errors; don't suppress them with
   `eslint-disable` or `@ts-ignore` unless justified in a comment and called out in your explanation.
6. **Follow modern best practices** as described under Conventions.

**For every change, follow the workflow in [`.agents/skills/ship-change/SKILL.md`](.agents/skills/ship-change/SKILL.md).**

## Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:3000 (`next dev`) |
| `npm run build` | Production build; also type-checks (`next build`) |
| `npm run start` | Serve the production build (`next start`) |
| `npm run lint` | Run ESLint with `eslint.config.mjs` (`eslint`); add `-- --fix` to auto-fix |
| `npx tsc --noEmit` | Quick type-check without a full build |

## Tech stack

| Package | Version | Notes |
|---------|---------|-------|
| `next` | 16.4.0 | App Router, Turbopack for dev and build |
| `react`, `react-dom` | 19.3.0 | |
| `typescript` | ^5 | Types: `@types/node` ^20, `@types/react` ^19, `@types/react-dom` ^19 |
| `tailwindcss` | ^4 | Loaded by `@tailwindcss/turbopack` ^4 via a rule in `next.config.ts` |
| `eslint` | ^9 | Flat config, extends `eslint-config-next` 16.4.0 |

Version-specific rules:

- **Next.js 16:** follow the bundled docs referenced at the top of this file.
- **React 19:** pass `ref` as a regular prop (no `forwardRef`); no React 18-era workarounds.
- **Tailwind v4:** configured in CSS, not JS. `app/globals.css` starts with `@import "tailwindcss";`,
  theme tokens go in `@theme`, and class-based dark mode uses
  `@custom-variant dark (&:where(.dark, .dark *));`.
  Never add `tailwind.config.js`, `postcss.config.mjs`, `postcss` or `@tailwindcss/postcss`.
- **ESLint 9:** flat config only; never create `.eslintrc*`.
- Keep `next` and `eslint-config-next` on the same version. No upgrades without approval.

## Site features

- Pages: Home, Resume, Projects, Blog
- Global: dark/light mode toggle, LinkedIn and GitHub links

## Project structure

```
app/                    # Routes: each folder is a URL segment, page.tsx makes it a page
  layout.tsx            # Root layout: <html>, <body>, header, footer, theme setup
  page.tsx              # Home (/)
  globals.css           # Tailwind import, @theme tokens, dark variant
  projects/page.tsx     # /projects
  resume/page.tsx       # /resume, embeds or links to /resume/Huyen_Nguyen_Resume.pdf
  blog/page.tsx         # /blog, list of posts
  blog/[slug]/page.tsx  # /blog/<slug>, one post; pre-render with generateStaticParams
  not-found.tsx         # Custom 404
components/             # UI shared by several pages (Header, Footer, ThemeToggle, SocialLinks)
content/blog/           # Blog post source files
lib/                    # Non-UI TypeScript: site config, project data, post loading
public/                 # Static files served from the site root
eslint.config.mjs       # ESLint flat config
next.config.ts          # Next.js config, incl. the Turbopack rule that loads Tailwind
tsconfig.json           # TypeScript config
.agents/skills/         # Agent workflows loaded on demand
```

Components used by only one page may live next to that page instead of in `components/`.

## Conventions

- **Server Components by default.** Add `"use client"` only where state, effects, event handlers
  or browser APIs are needed (e.g. `ThemeToggle`), and keep those components small.
- **TypeScript:** type props explicitly; no `any` without a justifying comment.
- **Styling:** Tailwind utilities only, using `dark:` variants. No extra CSS files beyond `globals.css`.
- **Next.js built-ins:** `next/link` for internal links, `next/image` for images,
  the Metadata API (`metadata` / `generateMetadata`) for titles and descriptions.
- **Accessibility:** semantic landmarks (`header`, `nav`, `main`, `footer`, `article`), alt text,
  `aria-label` on icon-only buttons and links, visible focus states, contrast in both themes.
- **External links** use `target="_blank"` and `rel="noopener noreferrer"`.
- **Responsive:** mobile-first; no horizontal scroll at phone width.
- **Dark mode:** default to the system preference, persist the user's choice in `localStorage`,
  and prevent a flash of the wrong theme on load.

## Content

- Social URLs and site metadata live in one file, `lib/site.ts`.
- Update the resume by replacing `public/resume/Huyen_Nguyen_Resume.pdf` with the same filename.
- Projects start as a typed array in `lib/projects.ts`.
- Ask before choosing a Markdown/MDX approach or a parsing library for blog posts.
