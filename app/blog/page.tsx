'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react"
import { blogPosts } from "@/data/blog"
import { Navigation } from "@/components/navigation"

export default function BlogPage() {
	const [selectedCategory, setSelectedCategory] = useState<string>('Tous les articles')
	const categories = Array.from(
		new Set(blogPosts.map((post) => post.category))
	)

	const filteredPosts = selectedCategory === 'Tous les articles'
		? blogPosts
		: blogPosts.filter((post) => post.category === selectedCategory)

	return (
		<>
			<Navigation />
			<div className="min-h-screen bg-[#f0e4d0]">
			{/* Hero Section */}
			<section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
				{/* Background Image */}
				<div className="absolute inset-0">
					<Image
						src="https://res.cloudinary.com/dyhu6lnqr/image/upload/v1772552536/1_pawkve.jpg"
						alt="Blog Raid Atlas"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
				</div>

				{/* Hero Content */}
				<div className="container mx-auto px-4 relative z-10 ">
					<div className="max-w-3xl mx-auto text-center text-white">
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							Blog Raid Atlas
						</h1>
						<p className="text-xl md:text-2xl text-white/90">
							Guides, conseils et récits d'aventures en quad et buggy au Maroc
						</p>
					</div>
				</div>
			</section>

			{/* Categories Filter */}
			<section className="py-8 border-b bg-[#f0e4d0]">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap gap-3 justify-center">
						<button 
							onClick={() => setSelectedCategory('Tous les articles')}
							className={`px-6 py-2 rounded-full font-medium transition-colors ${
								selectedCategory === 'Tous les articles'
									? 'bg-[#b8860b] text-white hover:bg-orange-700'
									: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
							}`}
						>
							Tous les articles
						</button>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-6 py-2 rounded-full font-medium transition-colors ${
									selectedCategory === category
										? 'bg-[#b8860b] text-white hover:bg-orange-700'
										: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Featured Article */}
			{blogPosts.length > 0 && (
				<section className="py-12 bg-[#f0e4d0]">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-8 text-center">
							Article à la Une
						</h2>
						<Link
							href={`/blog/${blogPosts[0].slug}`}
							className="block group max-w-6xl mx-auto"
						>
							<div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
								<div className="relative h-[400px] md:h-auto">
									<Image
										src={blogPosts[0].image}
										alt={blogPosts[0].title}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute top-4 left-4">
										<span className="px-4 py-2 bg-[#b8860b] text-white text-sm font-semibold rounded-full">
											{blogPosts[0].category}
										</span>
									</div>
								</div>
								<div className="p-8 flex flex-col justify-center">
									<h3 className="text-3xl font-bold mb-4 group-hover:text-[#b8860b] transition-colors">
										{blogPosts[0].title}
									</h3>
									<p className="text-gray-600 mb-6 text-lg leading-relaxed">
										{blogPosts[0].excerpt}
									</p>
									<div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
										<div className="flex items-center gap-2">
											<Calendar className="w-4 h-4" />
											<span>{blogPosts[0].date}</span>
										</div>
										<div className="flex items-center gap-2">
											<Clock className="w-4 h-4" />
											<span>{blogPosts[0].readTime}</span>
										</div>
									</div>
									<div className="flex flex-wrap gap-2 mb-6">
										{blogPosts[0].tags.slice(0, 4).map((tag) => (
											<span
												key={tag}
												className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
											>
												#{tag}
											</span>
										))}
									</div>
									<div className="flex items-center gap-2 text-[#b8860b] font-semibold group-hover:gap-4 transition-all">
										<span>Lire l'article</span>
										<ArrowRight className="w-5 h-5" />
									</div>
								</div>
							</div>
						</Link>
					</div>
				</section>
			)}

			{/* Articles Grid */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-12 text-center">
						Tous les Articles
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{filteredPosts.map((post) => (
							<Link
								key={post.id}
								href={`/blog/${post.slug}`}
								className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
							>
								<div className="relative h-64 overflow-hidden">
									<Image
										src={post.image}
										alt={post.title}
										fill
										className="object-cover group-hover:scale-110 transition-transform duration-500"
									/>
									<div className="absolute top-4 left-4">
										<span className="px-3 py-1 bg-[#b8860b] text-white text-xs font-semibold rounded-full">
											{post.category}
										</span>
									</div>
								</div>
								<div className="p-6">
									<h3 className="text-xl font-bold mb-3 group-hover:text-[#b8860b] transition-colors line-clamp-2">
										{post.title}
									</h3>
									<p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
										{post.excerpt}
									</p>
									<div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
										<div className="flex items-center gap-1">
											<Calendar className="w-3 h-3" />
											<span>{post.date}</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock className="w-3 h-3" />
											<span>{post.readTime}</span>
										</div>
									</div>
									<div className="flex flex-wrap gap-2 mb-4">
										{post.tags.slice(0, 3).map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
											>
												#{tag}
											</span>
										))}
									</div>
									<div className="flex items-center gap-2 text-[#b8860b] font-semibold text-sm group-hover:gap-3 transition-all">
										<span>Lire la suite</span>
										<ArrowRight className="w-4 h-4" />
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-[#f0e4d0] ">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Prêt pour l'Aventure ?
					</h2>
					<p className="text-xl  mb-8 max-w-2xl mx-auto">
						Découvrez nos raids en quad et buggy à travers les paysages
						spectaculaires du Maroc
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<Link
							href="/activities"
							className="px-8 py-4 border-2  font-bold rounded-lg hover:bg-gray-100 transition-colors"
						>
							Voir nos Activités
						</Link>
						<Link
							href="/contact"
							className="px-8 py-4 bg-transparent border-2   font-bold rounded-lg hover:bg-white transition-colors"
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
