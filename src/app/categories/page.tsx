import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/client'
import { CATEGORIES_PAGE_QUERY, CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/shared/sanity-image'

export const metadata: Metadata = {
  title: 'Categories',
}

export default async function CategoriesPage() {
  const [categoriesPage, categories] = await Promise.all([
    sanityFetch({ query: CATEGORIES_PAGE_QUERY, tags: ['categories-page'] }),
    sanityFetch({ query: CATEGORIES_QUERY, tags: ['categories'] }),
  ])

  // Deduplicate categories by _id to prevent rendering duplicates
  const uniqueCategories = categories
    ? categories.filter((cat: any, index: number, self: any[]) =>
        index === self.findIndex((c) => c._id === cat._id)
      )
    : []

  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container-editorial relative z-10">
          <div className="max-w-2xl">
            <span className="text-label text-terracotta mb-4 block">Browse Collection</span>
            <h1 className="heading-hero text-white mb-5">
              {categoriesPage?.hero?.heading || 'Categories'}
            </h1>
            {categoriesPage?.hero?.description && (
              <p className="text-lg text-white/70 max-w-md">{categoriesPage.hero.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding bg-cream">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {uniqueCategories?.map((category: any) => (
              <Link key={category._id} href={`/categories/${category.slug.current}`} className="group">
                <article className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  {/* Background */}
                  {category.image ? (
                    <SanityImage
                      image={category.image}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-sage to-olive flex items-center justify-center">
                      <span className="text-6xl">{category.emoji || '🍽️'}</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                      <div className="flex items-center gap-2 mb-2">
                        {category.emoji && (
                          <span className="text-2xl">{category.emoji}</span>
                        )}
                        <h3 className="font-serif text-xl md:text-2xl text-white font-medium">
                          {category.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">
                          {category.recipeCount} {category.recipeCount === 1 ? 'recipe' : 'recipes'}
                        </span>

                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
