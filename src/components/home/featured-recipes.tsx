import Link from 'next/link'
import { ArrowRight, Clock, Users, Star } from 'lucide-react'
import { SanityImage } from '@/components/shared/sanity-image'
import { Badge } from '@/components/ui/badge'

interface Recipe {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  difficulty?: string
  totalTime?: string
  servings?: number
  rating?: number
  mainImage?: {
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
  category?: {
    title: string
    slug: { current: string }
    emoji?: string
  }
}

interface FeaturedRecipesProps {
  heading: string
  subheading?: string
  recipes: Recipe[]
}

function getDifficultyColor(difficulty?: string) {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'bg-sage text-white'
    case 'medium':
      return 'bg-golden text-charcoal'
    case 'hard':
      return 'bg-rust text-white'
    default:
      return 'bg-sand text-charcoal'
  }
}

export function FeaturedRecipes({ heading, subheading, recipes }: FeaturedRecipesProps) {
  if (!recipes || recipes.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-cream">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-label text-terracotta mb-3 block">Curated Collection</span>
            <h2 className="heading-section text-charcoal">{heading}</h2>
            {subheading && (
              <p className="text-body mt-3 max-w-md">{subheading}</p>
            )}
          </div>
          <Link
            href="/recipes"
            className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-terracotta transition-colors"
          >
            <span>View All Recipes</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Recipe Grid - Editorial Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {recipes.map((recipe, index) => (
            <Link
              key={recipe._id}
              href={`/recipes/${recipe.slug.current}`}
              className={`group block ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <article className="h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/3] mb-5 overflow-hidden rounded-sm bg-sand">
                  {recipe.mainImage ? (
                    <SanityImage
                      image={recipe.mainImage}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-sand flex items-center justify-center">
                      <span className="text-4xl">🍽️</span>
                    </div>
                  )}

                  {/* Category Badge */}
                  {recipe.category && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-xs font-medium text-charcoal rounded-sm shadow-sm">
                        {recipe.category.emoji && <span>{recipe.category.emoji}</span>}
                        {recipe.category.title}
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-charcoal group-hover:text-terracotta transition-colors duration-300 line-clamp-2">
                    {recipe.title}
                  </h3>

                  {/* Description */}
                  {recipe.description && (
                    <p className="text-body-sm text-charcoal-muted line-clamp-2">
                      {recipe.description}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 pt-2">
                    {recipe.difficulty && (
                      <Badge className={`text-[10px] uppercase tracking-wider ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </Badge>
                    )}
                    {recipe.totalTime && (
                      <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{recipe.totalTime}</span>
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
                        <Users className="w-3.5 h-3.5" />
                        <span>{recipe.servings}</span>
                      </div>
                    )}
                    {recipe.rating && recipe.rating > 0 && (
                      <div className="flex items-center gap-1 text-xs text-charcoal-muted">
                        <Star className="w-3.5 h-3.5 fill-golden text-golden" />
                        <span>{recipe.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
