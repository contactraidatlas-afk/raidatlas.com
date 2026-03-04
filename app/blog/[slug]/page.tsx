import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react"
import { blogPosts } from "@/data/blog"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import { Navigation } from "@/components/navigation"

type Props = {
	params: { slug: string }
}

export async function generateStaticParams() {
	return blogPosts.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const post = blogPosts.find((p) => p.slug === params.slug)

	if (!post) {
		return {
			title: "Article non trouvé - Raid Atlas",
		}
	}

	return {
		title: `${post.title} - Blog Raid Atlas`,
		description: post.metaDescription,
		keywords: post.metaKeywords,
		openGraph: {
			title: post.title,
			description: post.metaDescription,
			images: [
				{
					url: post.image,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
			type: "article",
			publishedTime: post.date,
			authors: [post.author],
			tags: post.tags,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.metaDescription,
			images: [post.image],
		},
	}
}

export default function BlogPostPage({ params }: Props) {
	const post = blogPosts.find((p) => p.slug === params.slug)

	if (!post) {
		notFound()
	}

	const relatedPosts = blogPosts
		.filter((p) => p.id !== post.id && p.category === post.category)
		.slice(0, 3)

	return (
		<>
			<Navigation />
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Hero Section */}
			<section className="relative h-[500px] bg-black">
				<Image
					src={post.image}
					alt={post.title}
					fill
					className="object-cover opacity-60"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
				<div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-10">
					<div className="max-w-4xl">
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							<span>Retour au blog</span>
						</Link>
						<div className="mb-4">
							<span className="px-4 py-2 bg-[#b8860b] text-white text-sm font-semibold rounded-full">
								{post.category}
							</span>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
							{post.title}
						</h1>
						<div className="flex flex-wrap gap-6 text-white/90">
							<div className="flex items-center gap-2">
								<Calendar className="w-5 h-5" />
								<span>{post.date}</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="w-5 h-5" />
								<span>{post.readTime}</span>
							</div>
							<div className="flex items-center gap-2">
								<span>Par {post.author}</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Article Content */}
			<article className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{/* Tags */}
						<div className="flex flex-wrap gap-2 mb-8">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full"
								>
									#{tag}
								</span>
							))}
						</div>

						{/* Excerpt */}
						<div className="bg-orange-50 border-l-4 border-[#b8860b] p-6 mb-12 rounded-r-lg">
							<p className="text-lg text-gray-700 leading-relaxed italic">
								{post.excerpt}
							</p>
						</div>

						{/* Content */}
						<div className="prose prose-lg max-w-none">
							<ReactMarkdown
								components={
									{
										h1: ({ children }) => (
											<h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900">
												{children}
											</h1>
										),
										h2: ({ children }) => (
											<h2 className="text-3xl font-bold mt-10 mb-5 text-gray-900">
												{children}
											</h2>
										),
										h3: ({ children }) => (
											<h3 className="text-2xl font-bold mt-8 mb-4 text-gray-900">
												{children}
											</h3>
										),
										h4: ({ children }) => (
											<h4 className="text-xl font-bold mt-6 mb-3 text-gray-900">
												{children}
											</h4>
										),
										p: ({ children, node }) => {
											const hasImage = node?.children?.some((child: any) => child.tagName === 'img')
											if (hasImage) {
												return <div className="text-gray-700 leading-relaxed mb-6">{children}</div>
											}
											return <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
										},
										ul: ({ children }) => (
											<ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
												{children}
											</ul>
										),
										ol: ({ children }) => (
											<ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">
												{children}
											</ol>
										),
										li: ({ children }) => (
											<li className="ml-4">{children}</li>
										),
										strong: ({ children }) => (
											<strong className="font-bold text-gray-900">
												{children}
											</strong>
										),
										em: ({ children }) => (
											<em className="italic text-gray-800">{children}</em>
										),
										blockquote: ({ children }) => (
											<blockquote className="border-l-4 border-[#b8860b] pl-6 py-2 my-6 italic text-gray-700 bg-orange-50 rounded-r-lg">
												{children}
											</blockquote>
										),
										img: ({ src, alt }) => (
											<span className="block my-8 rounded-xl overflow-hidden shadow-lg">
												<Image
													src={src || ""}
													alt={alt || ""}
													width={1200}
													height={600}
													className="w-full h-auto"
												/>
											</span>
										),
										table: ({ children }) => (
											<div className="overflow-x-auto my-8">
												<table className="min-w-full border-collapse border border-gray-300">
													{children}
												</table>
											</div>
										),
										th: ({ children }) => (
											<th className="border border-gray-300 bg-orange-100 px-4 py-2 text-left font-bold">
												{children}
											</th>
										),
										td: ({ children }) => (
											<td className="border border-gray-300 px-4 py-2">
												{children}
											</td>
										),
										hr: () => <hr className="my-12 border-gray-300" />,
									} as Components
								}
							>
								{post.content}
							</ReactMarkdown>
						</div>

						{/* Share Section */}
						<div className="mt-16 pt-8 border-t border-gray-200">
							<div className="flex items-center justify-between">
								<h3 className="text-xl font-bold text-gray-900">
									Partager cet article
								</h3>
								<div className="flex gap-3">
									<button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
										<Share2 className="w-5 h-5" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>

			{/* Related Posts */}
			{relatedPosts.length > 0 && (
				<section className="py-16 bg-gray-50">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-12 text-center">
							Articles Similaires
						</h2>
						<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
							{relatedPosts.map((relatedPost) => (
								<Link
									key={relatedPost.id}
									href={`/blog/${relatedPost.slug}`}
									className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
								>
									<div className="relative h-48 overflow-hidden">
										<Image
											src={relatedPost.image}
											alt={relatedPost.title}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
									<div className="p-6">
										<span className="text-xs font-semibold text-[#b8860b] mb-2 block">
											{relatedPost.category}
										</span>
										<h3 className="text-lg font-bold mb-2 group-hover:text-[#b8860b] transition-colors line-clamp-2">
											{relatedPost.title}
										</h3>
										<p className="text-gray-600 text-sm line-clamp-2 mb-4">
											{relatedPost.excerpt}
										</p>
										<div className="flex items-center gap-3 text-xs text-gray-500">
											<div className="flex items-center gap-1">
												<Clock className="w-3 h-3" />
												<span>{relatedPost.readTime}</span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<section className="py-16 bg-gradient-to-r from-[#b8860b] to-orange-500 text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Prêt pour l'Aventure ?
					</h2>
					<p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
						Réservez votre raid en quad ou buggy et vivez une expérience
						inoubliable au Maroc
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<Link
							href="/activities"
							className="px-8 py-4 bg-white text-[#b8860b] font-bold rounded-lg hover:bg-gray-100 transition-colors"
						>
							Découvrir nos Raids
						</Link>
						<Link
							href="/contact"
							className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#b8860b] transition-colors"
						>
							Nous Contacter
						</Link>
					</div>
				</div>
			</section>
		</div>
		</>
	)
}
