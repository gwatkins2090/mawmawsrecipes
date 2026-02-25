import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Users, Star } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/client'
import { CATEGORY_BY_SLUG_QUERY, CATEGORY_SLUGS_QUERY } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/shared/sanity-image'
import { PortableText } from '@/components/shared/portable-text'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const categories = await sanityFetch({
    query: CATEGORY_SLUGS_QUERY,
    tags: ['categories'],
  })

  return categories.map((category: { slug: string }) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryData = await sanityFetch({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug: category },
    tags: ['categories'],
  })

  if (!categoryData) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: categoryData.seo?.metaTitle || categoryData.title,
    description: categoryData.seo?.metaDescription || categoryData.description,
    openGraph: categoryData.seo?.ogImage?.asset?.url
      ? { images: [{ url: categoryData.seo.ogImage.asset.url }] }
      : categoryData.image?.asset?.url
      ? { images: [{ url: categoryData.image.asset.url }] }
      : undefined,
  }
}

function getDifficultyVariant(difficulty?: string) {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'easy'
    case 'medium':
      return 'medium'
    case 'hard':
      return 'hard'
    default:
      return 'secondary'
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryData = await sanityFetch({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug: category },
    tags: ['categories'],
  })

  if (!categoryData) {
    notFound()
  }

  const recipes = categoryData.recipes || []
  const featuredRecipes = categoryData.featuredRecipes || []

  return (
    <>
      {/* Header */}
      <section className={`relative py-16 md:py-24 ${
        categoryData.image ? '' : 'bg-gradient-to-br from-sage-600 to-saffron-500'
      }`}>
        {categoryData.image && (
          <div className="absolute inset-0">
            <SanityImage
              image={categoryData.image}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sage-900/80 to-sage-900/40" />
          </div>
        )}

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryData.emoji && <span className="mr-2">{categoryData.emoji}</span>}
              {categoryData.pageContent?.heading || categoryData.title}
            </h1>
            {categoryData.description && (
              <p className="text-lg text-white/90">{categoryData.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Long Description */}
      {categoryData.pageContent?.longDescription && (
        <section className="py-12 bg-white">
          <div className="container px-4 md:px-6 max-w-3xl">
            <PortableText value={categoryData.pageContent.longDescription} />
          </div>
        </section>
      )}

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 && (
        <section className="py-12 bg-stone-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Featured Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRecipes.map((recipe: {
                _id: string
                title: string
                slug: { current: string }
                description?: string
                difficulty?: string
                totalTime?: string
                rating?: number
                mainImage?: { asset?: { _id?: string; url?: string }; alt?: string }
              }) => (
                <Link key={recipe._id} href={`/recipes/${recipe.slug.current}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SanityImage
                        image={recipe.mainImage}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-stone-900 mb-2 group-hover:text-sage-700 transition-colors">
                        {recipe.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-stone-500">
                        {recipe.difficulty && (
                          <Badge variant={getDifficultyVariant(recipe.difficulty)}>
                            {recipe.difficulty}
                          </Badge>
                        )}
                        {recipe.totalTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.totalTime}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Recipes */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">
            All {categoryData.title} Recipes
          </h2>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe: {
                _id: string
                title: string
                slug: { current: string }
                description?: string
                difficulty?: string
                totalTime?: string
                servings?: number
                rating?: number
                mainImage?: { asset?: { _id?: string; url?: string }; alt?: string }
              }) => (
                <Link key={recipe._id} href={`/recipes/${recipe.slug.current}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SanityImage
                        image={recipe.mainImage}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-stone-900 mb-2 group-hover:text-sage-700 transition-colors">
                        {recipe.title}
                      </h3>
                      {recipe.description && (
                        <p className="text-sm text-stone-600 line-clamp-2 mb-3">
                          {recipe.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-sm text-stone-500">
                        {recipe.difficulty && (
                          <Badge variant={getDifficultyVariant(recipe.difficulty)}>
                            {recipe.difficulty}
                          </Badge>
                        )}
                        {recipe.totalTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.totalTime}</span>
                          </div>
                        )}
                        {recipe.rating && recipe.rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-saffron-400 text-saffron-400" />
                            <span>{recipe.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-stone-600">
                No recipes in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
