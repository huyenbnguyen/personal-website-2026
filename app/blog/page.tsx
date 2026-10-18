import Link from "next/link";

import { formatDate, getSortedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description: `Writing by ${site.name}.`,
};

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10">

      <ul className="flex flex-col gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
                >
                  {post.title}
                </Link>
              </h2>
              <time dateTime={post.date} className="text-sm text-zinc-600 dark:text-zinc-400">
                {formatDate(post.date)}
              </time>
              <p className="leading-7 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}