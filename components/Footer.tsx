import { site } from "@/lib/site";

export default function Footer() {

  return (
    <footer className="mt-auto px-6 py-4 text-center text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
      <p>© {site.year} {site.name}</p>   
    </footer>
  );
}
