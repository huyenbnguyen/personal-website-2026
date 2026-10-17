export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    date: "2026-01-12",
    excerpt: "Why this site exists and what I plan to write about.",
    body: "This is a placeholder post. I'll replace it with real writing later.\n\nFor now it exists so the blog list and post pages have something to render.",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
