"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {

	const { resolvedTheme, setTheme } = useTheme();

	return (
		<button
			type="button"
			className="block rounded p-1 opacity-70 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>

			{/* Sun icon shows in LIGHT mode, hidden in DARK mode */}
			<Sun className="h-5 w-5 text-yellow-600 dark:hidden" />
			<span className="sr-only dark:hidden">Switch to dark mode</span>

			{/* Moon icon hidden in LIGHT mode, shows in DARK mode */}
			<Moon className="h-5 w-5 text-blue-400 hidden dark:block" />
			<span className="sr-only hidden dark:inline">Switch to light mode</span>

		</button>
	)

}