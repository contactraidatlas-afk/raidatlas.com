import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Blog - Raid Atlas | Guides et Conseils Quad & Buggy au Maroc",
	description:
		"Découvrez nos guides, conseils et récits d'aventures en quad et buggy au Maroc. Tout ce qu'il faut savoir pour préparer votre raid dans l'Atlas et le désert d'Agafay.",
	keywords: [
		"blog quad maroc",
		"conseils raid maroc",
		"guide buggy maroc",
		"aventure atlas",
		"raid maroc blog",
	],
	openGraph: {
		title: "Blog - Raid Atlas | Guides et Conseils Quad & Buggy",
		description:
			"Guides, conseils et récits d'aventures en quad et buggy au Maroc",
		images: [
			{
				url: "https://res.cloudinary.com/dyhu6lnqr/image/upload/v1772552536/1_pawkve.jpg",
				width: 1200,
				height: 630,
				alt: "Blog Raid Atlas",
			},
		],
	},
}

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
