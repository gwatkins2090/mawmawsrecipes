import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Users, ChefHat } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/client'
import { RECIPE_BY_SLUG_QUERY, RECIPE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/shared/sanity-image'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RecipeIngredients } from '@/components/recipe/recipe-ingredients'
import { RecipeInstructions } from '@/components/recipe/recipe-instructions'
import { RelatedRecipes } from '@/components/recipe/related-recipes'
import { RecipeActions } from '@/components/recipe/recipe-actions'

interface RecipePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const recipes = await sanityFetch({
    query: RECIPE_SLUGS_QUERY,
    tags: ['recipes'],
  })

  return recipes.map((recipe: { slug: string }) => ({
    slug: recipe.slug,
  }))
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = await sanityFetch({
    query: RECIPE_BY_SLUG_QUERY,
    params: { slug },
    tags: ['recipes'],
  })

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    }
  }

  return {
    title: recipe.seo?.metaTitle || recipe.title,
    description: recipe.seo?.metaDescription || recipe.description,
    openGraph: recipe.seo?.ogImage?.asset?.url
      ? { images: [{ url: recipe.seo.ogImage.asset.url }] }
      : recipe.mainImage?.asset?.url
      ? { images: [{ url: recipe.mainImage.asset.url }] }
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

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params
  const recipe = await sanityFetch({
    query: RECIPE_BY_SLUG_QUERY,
    params: { slug },
    tags: ['recipes'],
  })

  if (!recipe) {
    notFound()
  }

  return (
    <article className="print:py-0">
      {/* Hero Section */}
      <section className="relative bg-stone-900">
        {recipe.mainImage ? (
          <div className="absolute inset-0">
            <SanityImage
              image={recipe.mainImage}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-sage-800" />
        )}

        <div className="relative z-10 container px-4 md:px-6 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8 no-print">
            <ol className="flex items-center gap-2 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/recipes" className="hover:text-white transition-colors">
                  Recipes
                </Link>
              </li>
              {recipe.category && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={`/categories/${recipe.category.slug.current}`}
                      className="hover:text-white transition-colors"
                    >
                      {recipe.category.emoji && <span className="mr-1">{recipe.category.emoji}</span>}
                      {recipe.category.title}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-white">{recipe.title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {recipe.category && (
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
                {recipe.category.emoji && <span className="mr-1">{recipe.category.emoji}</span>}
                {recipe.category.title}
              </Badge>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {recipe.title}
            </h1>

            {recipe.description && (
              <p className="text-lg text-white/90 mb-6">{recipe.description}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/80 no-print">
              {recipe.difficulty && (
                <Badge variant={getDifficultyVariant(recipe.difficulty)}>
                  {recipe.difficulty}
                </Badge>
              )}
              {recipe.prepTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Prep: {recipe.prepTime}</span>
                </div>
              )}
              {recipe.cookTime && (
                <div className="flex items-center gap-1">
                  <ChefHat className="h-4 w-4" />
                  <span>Cook: {recipe.cookTime}</span>
                </div>
              )}
              {recipe.totalTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Total: {recipe.totalTime}</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Serves: {recipe.servings}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 no-print">
              <RecipeActions title={recipe.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Ingredients */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <RecipeIngredients
                  ingredients={recipe.ingredients}
                  defaultServings={recipe.servings}
                />
              )}

              {/* Instructions */}
              {recipe.instructions && recipe.instructions.length > 0 && (
                <RecipeInstructions instructions={recipe.instructions} />
              )}

              {/* Notes */}
              {recipe.notes && recipe.notes.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-4">Recipe Notes</h2>
                  <ul className="space-y-2">
                    {recipe.notes.map((note: string, index: number) => (
                      <li key={index} className="flex gap-3 text-stone-700">
                        <span className="text-sage-600 font-semibold">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Variations */}
              {recipe.variations && recipe.variations.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-4">Variations</h2>
                  <ul className="space-y-2">
                    {recipe.variations.map((variation: string, index: number) => (
                      <li key={index} className="flex gap-3 text-stone-700">
                        <span className="text-saffron-500 font-semibold">•</span>
                        {variation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Storage */}
              {recipe.storage && (
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-4">Storage</h2>
                  <p className="text-stone-700">{recipe.storage}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Author */}
              {recipe.author && (
                <div className="p-6 bg-stone-50 rounded-lg">
                  <h3 className="font-semibold text-stone-900 mb-3">Recipe By</h3>
                  <div className="flex items-center gap-3">
                    {recipe.author.avatar ? (
                      <SanityImage
                        image={recipe.author.avatar}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-semibold">
                        {recipe.author.emoji || recipe.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-stone-900">{recipe.author.name}</p>
                      {recipe.author.role && (
                        <p className="text-sm text-stone-600">{recipe.author.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Nutrition */}
              {recipe.nutrition && Object.values(recipe.nutrition).some(Boolean) && (
                <div className="p-6 bg-stone-50 rounded-lg">
                  <h3 className="font-semibold text-stone-900 mb-4">Nutrition</h3>
                  <dl className="space-y-2">
                    {recipe.nutrition.calories && (
                      <div className="flex justify-between">
                        <dt className="text-stone-600">Calories</dt>
                        <dd className="font-medium text-stone-900">{recipe.nutrition.calories}</dd>
                      </div>
                    )}
                    {recipe.nutrition.protein && (
                      <div className="flex justify-between">
                        <dt className="text-stone-600">Protein</dt>
                        <dd className="font-medium text-stone-900">{recipe.nutrition.protein}</dd>
                      </div>
                    )}
                    {recipe.nutrition.carbs && (
                      <div className="flex justify-between">
                        <dt className="text-stone-600">Carbs</dt>
                        <dd className="font-medium text-stone-900">{recipe.nutrition.carbs}</dd>
                      </div>
                    )}
                    {recipe.nutrition.fat && (
                      <div className="flex justify-between">
                        <dt className="text-stone-600">Fat</dt>
                        <dd className="font-medium text-stone-900">{recipe.nutrition.fat}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-stone-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related Recipes */}
      {recipe.related && recipe.related.length > 0 && (
        <RelatedRecipes recipes={recipe.related} />
      )}
    </article>
  )
}
