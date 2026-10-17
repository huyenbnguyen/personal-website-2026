"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav } from "@/lib/site";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {nav.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded underline-offset-8 decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 ${isActive
                  ? "text-black underline dark:text-white"
                  : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}