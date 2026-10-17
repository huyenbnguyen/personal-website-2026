import Image from "next/image";

import { home } from "@/lib/site";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="mx-auto grid w-full max-w-5xl flex-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      
      {/* Left column: photo */}
      <Image
        src="/profile/profile.jpeg"
        alt={`Portrait of ${site.name}`}
        width={800}
        height={800}
        preload={true}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="mx-auto w-full max-w-sm rounded-2xl object-cover"
      />

      {/* Right column: summary + skills */}
      <div className="flex flex-col gap-8">
        <section aria-labelledby="summary-heading" className="flex flex-col gap-4">
          <h1 id="summary-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {site.name}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{site.tagline}</p>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">{home.bio}</p>
        </section>

        <section aria-labelledby="skills-heading" className="flex flex-col gap-3">
          <h2 id="skills-heading" className="text-xl font-semibold">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-2">
            {home.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-800"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}