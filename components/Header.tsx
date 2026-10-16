import Link from "next/link";

import { nav, site } from "@/lib/site";

import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	return (
		<header className="flex flex-col items-center gap-3 px-6 py-4 sm:grid sm:grid-cols-3 border-b border-zinc-200 dark:border-zinc-800">

			<Link 
				href="/" 
				className="justify-self-start font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 rounded">
					{site.name}
			</Link>

			<nav aria-label="Main" className="justify-self-center">
				<ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
					{nav.map((item) => (
						<li key={item.href}>
							<Link 
								href={item.href} 
								className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 rounded">
									{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>



			<div className="flex items-center gap-4 justify-self-end">
				<SocialLinks />
				<ThemeToggle />
			</div>

		</header>
	);
}