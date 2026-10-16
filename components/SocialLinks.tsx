import { site } from "@/lib/site";

export default function SocialLinks() {
	return (
		<ul className="flex items-center gap-4">
			{site.links.map((item) => (
				<li key={item.type}>
					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={item.type}
						className="block rounded p-1 text-zinc-600 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:text-zinc-400 dark:hover:text-white"
					>
						<svg fill="currentColor" aria-hidden="true" className="h-5 w-5">
							<use href={`${item.iconPath}#icon`} width="100%" height="100%" />
						</svg>
					</a>
				</li>
			))}
		</ul>
	);
}