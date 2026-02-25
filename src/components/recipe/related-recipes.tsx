import Link from 'next/link'
import { Clock, Users, Star } from 'lucide-react'
import { SanityImage } from '@/components/shared/sanity-image'
import { Card, CardContent } from '@/components/ui/card'
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
    asset?: { _id?: string; url?: string }
    alt?: string
  }
  category?: {
    title: string
    emoji?: string
  }
}

interface RelatedRecipesProps {
  recipes: Recipe[]
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

export function RelatedRecipes({ recipes }: RelatedRecipesProps) {
  if (!recipes || recipes.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">
          You Might Also Like
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link key={recipe._id} href={`/recipes/${recipe.slug.current}`}>
              <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SanityImage
                    image={recipe.mainImage}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {recipe.category && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 text-stone-800">
                        {recipe.category.emoji && <span className="mr-1">{recipe.category.emoji}</span>}
                        {recipe.category.title}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-stone-900 mb-2 group-hover:text-sage-700 transition-colors line-clamp-2">
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
      </div>
    </section>
  )
}
