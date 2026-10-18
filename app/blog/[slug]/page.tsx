import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { formatDate, getPostBySlug, posts } from "@/lib/posts";
import { site } from "@/lib/site";

import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
  };
}

export default function PostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10">
      
      <Suspense fallback={<p className="text-zinc-600 dark:text-zinc-400">Loading post…</p>}>
        <PostContent {...props} />
      </Suspense>

      <Link
        href="/blog"
        className="self-start rounded text-sm text-zinc-600 underline hover:text-black dark:text-zinc-400 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
      >
        ← Back to all posts
      </Link>
    </main>
  );
}

async function PostContent(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <time dateTime={post.date} className="text-sm text-zinc-600 dark:text-zinc-400">
          {formatDate(post.date)}
        </time>
      </header>

      {post.body.split("\n\n").map((paragraph, index) => (
        <p key={index} className="leading-7">
          {paragraph}
        </p>
      ))}
    </article>
  );
}
