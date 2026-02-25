import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Users, Search, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/client'
import { RECIPES_PAGE_QUERY, RECIPES_QUERY, CATEGORIES_QUERY, RECIPES_COUNT_QUERY } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/shared/sanity-image'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
  title: 'All Recipes',
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

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; difficulty?: string; search?: string }>
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1')

  const [recipesPage, recipes, categories, totalCount] = await Promise.all([
    sanityFetch({
      query: RECIPES_PAGE_QUERY,
      tags: ['recipes-page'],
    }),
    sanityFetch({
      query: RECIPES_QUERY,
      params: { start: (page - 1) * 12, end: page * 12 },
      tags: ['recipes'],
    }),
    sanityFetch({
      query: CATEGORIES_QUERY,
      tags: ['categories'],
    }),
    sanityFetch({
      query: RECIPES_COUNT_QUERY,
      tags: ['recipes'],
    }),
  ])

  const perPage = recipesPage?.perPage || 12
  const totalPages = Math.ceil(totalCount / perPage)

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
            <span className="text-label text-terracotta mb-4 block">Recipe Collection</span>
            <h1 className="heading-hero text-white mb-5">
              {recipesPage?.hero?.heading || 'All Recipes'}
            </h1>
            {recipesPage?.hero?.description && (
              <p className="text-lg text-white/70 max-w-md">{recipesPage.hero.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding-sm bg-cream">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* Search */}
                <div>
                  <h3 className="font-serif text-lg text-charcoal mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal-muted" />
                    <Input
                      type="search"
                      placeholder={recipesPage?.searchPlaceholder || 'Search recipes...'}
                      className="pl-11 h-12 bg-white border-sand rounded-sm focus:border-terracotta focus:ring-terracotta"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-serif text-lg text-charcoal mb-4">Categories</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/recipes"
                        className="group flex items-center justify-between text-sm text-charcoal-light hover:text-terracotta transition-colors"
                      >
                        <span>All Categories</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                    {uniqueCategories?.map((category: { _id: string; title: string; slug: { current: string }; recipeCount: number }) => (
                      <li key={category._id}>
                        <Link
                          href={`/categories/${category.slug.current}`}
                          className="group flex items-center justify-between text-sm text-charcoal-light hover:text-terracotta transition-colors"
                        >
                          <span>{category.title}</span>
                          <span className="text-xs text-charcoal-muted">({category.recipeCount})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h3 className="font-serif text-lg text-charcoal mb-4">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                      <button
                        key={level}
                        className="px-3 py-1.5 text-xs font-medium rounded-sm border border-sand text-charcoal-light hover:border-terracotta hover:text-terracotta transition-colors"
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Recipe Grid */}
            <div className="lg:col-span-3">
              {recipes?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {recipes.map((recipe: any) => (
                      <Link key={recipe._id} href={`/recipes/${recipe.slug.current}`} className="group">
                        <article className="h-full">
                          {/* Image */}
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
                            {recipe.category && (
                              <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-xs font-medium text-charcoal rounded-sm shadow-sm">
                                  {recipe.category.emoji && <span>{recipe.category.emoji}</span>}
                                  {recipe.category.title}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="space-y-3">
                            <h3 className="font-serif text-xl font-medium text-charcoal group-hover:text-terracotta transition-colors line-clamp-2">
                              {recipe.title}
                            </h3>
                            {recipe.description && (
                              <p className="text-body-sm text-charcoal-muted line-clamp-2">
                                {recipe.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 pt-1">
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
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-16">
                      {page > 1 ? (
                        <Link
                          href={`/recipes?page=${page - 1}`}
                          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal bg-white border border-sand rounded-sm hover:border-terracotta hover:text-terracotta transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Link>
                      ) : (
                        <span className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal-muted bg-white/50 border border-sand rounded-sm cursor-not-allowed">
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </span>
                      )}

                      <span className="text-sm text-charcoal-muted">
                        Page <span className="font-medium text-charcoal">{page}</span> of {totalPages}
                      </span>

                      {page < totalPages ? (
                        <Link
                          href={`/recipes?page=${page + 1}`}
                          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal bg-white border border-sand rounded-sm hover:border-terracotta hover:text-terracotta transition-colors"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <span className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal-muted bg-white/50 border border-sand rounded-sm cursor-not-allowed">
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🍳</div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">No recipes yet</h3>
                  <p className="text-charcoal-muted max-w-md mx-auto">
                    {recipesPage?.noResultsMessage || 'No recipes found yet. Add some in the CMS!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
