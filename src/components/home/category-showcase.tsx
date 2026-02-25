import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SanityImage } from '@/components/shared/sanity-image'

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  emoji?: string
  image?: {
    asset?: {
      _id?: string
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: { width: number; height: number }
      }
    }
    alt?: string
    hotspot?: { x: number; y: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
  color?: {
    from?: string
    to?: string
  }
  recipeCount: number
}

interface CategoryShowcaseProps {
  heading: string
  subheading?: string
  categories: Category[]
}

export function CategoryShowcase({ heading, subheading, categories }: CategoryShowcaseProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-cream-dark">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-label text-terracotta mb-3 block">Browse by Category</span>
          <h2 className="heading-section text-charcoal mb-4">{heading}</h2>
          {subheading && (
            <p className="text-body max-w-2xl mx-auto">{subheading}</p>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug.current}`}
              className="group"
            >
              <article className="relative aspect-square overflow-hidden rounded-sm">
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
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                    <div className="flex items-center gap-2 mb-1">
                      {category.emoji && (
                        <span className="text-xl">{category.emoji}</span>
                      )}
                      <h3 className="font-serif text-xl md:text-2xl text-white font-medium">
                        {category.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">
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

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="btn-secondary"
          >
            Browse All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}
