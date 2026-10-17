import { site } from "@/lib/site";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Resume | ${site.name}`,
  description: `Resume of ${site.name}.`,
};

export default function ResumePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="/resume/Huyen_Nguyen_Resume.pdf"
          download={`${site.name.replace(" ", "-")}-Resume.pdf`}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
        >
          Download PDF
        </a>
      </div>

      <iframe
        src="/resume/Huyen_Nguyen_Resume.pdf"
        title={`${site.name} resume`}
        className="h-[80vh] w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
      />

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Can&apos;t see the resume?{" "}
        <a
          href="/resume/Huyen_Nguyen_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black dark:hover:text-white"
        >
          Open it in a new tab
        </a>
        .
      </p>
    </main>
  );
}