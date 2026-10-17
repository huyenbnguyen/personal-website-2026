import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: `Projects built by ${site.name}.`,
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">

      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.title}>
            <article className="flex h-full flex-col gap-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-xl font-semibold">{project.title}</h2>

              <p className="leading-7 text-zinc-600 dark:text-zinc-400">{project.description}</p>

              <ul aria-label="Technologies" className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-800"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex gap-4 text-sm font-medium">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                    className="underline hover:text-zinc-600 dark:hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 rounded"
                  >
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="underline hover:text-zinc-600 dark:hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 rounded"
                  >
                    Live demo
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}