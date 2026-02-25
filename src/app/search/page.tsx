'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Clock, Users, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SanityImage } from '@/components/shared/sanity-image'
import type { SanityImage as SanityImageType } from '@/types/sanity'

interface SearchResult {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  mainImage?: SanityImageType
  totalTime?: string
  difficulty?: string
  category?: {
    title: string
    slug: { current: string }
    emoji?: string
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

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [searchInput, setSearchInput] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(!!initialQuery)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      )
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery, performSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchInput)
    setQuery(searchInput)

    // Update URL without reloading
    const url = new URL(window.location.href)
    if (searchInput) {
      url.searchParams.set('q', searchInput)
    } else {
      url.searchParams.delete('q')
    }
    window.history.replaceState({}, '', url)
  }

  const clearSearch = () => {
    setSearchInput('')
    setQuery('')
    setResults([])
    setHasSearched(false)
    const url = new URL(window.location.href)
    url.searchParams.delete('q')
    window.history.replaceState({}, '', url)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-charcoal py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              Search Recipes
            </h1>
            <p className="text-lg text-stone-700 mb-8">
              Find your next favorite recipe by name, ingredient, or category
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <Input
                type="search"
                placeholder="Search for recipes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 pr-12 py-6 text-lg bg-white border-0 shadow-lg"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-100"
                >
                  <X className="h-4 w-4 text-stone-400" />
                </button>
              )}
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          {hasSearched ? (
            <>
              <div className="mb-6">
                <p className="text-stone-600">
                  {loading ? (
                    'Searching...'
                  ) : (
                    <>
                      Found <strong>{results.length}</strong> result
                      {results.length !== 1 ? 's' : ''} for &ldquo;{query}
                      &rdquo;
                    </>
                  )}
                </p>
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((recipe) => (
                    <Link
                      key={recipe._id}
                      href={`/recipes/${recipe.slug.current}`}
                    >
                      <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          {recipe.mainImage ? (
                            <SanityImage
                              image={recipe.mainImage}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                              <span className="text-4xl">🍽️</span>
                            </div>
                          )}
                          {recipe.category && (
                            <div className="absolute top-3 left-3">
                              <Badge
                                variant="secondary"
                                className="bg-white/90 text-stone-800"
                              >
                                {recipe.category.emoji && (
                                  <span className="mr-1">
                                    {recipe.category.emoji}
                                  </span>
                                )}
                                {recipe.category.title}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg text-stone-900 mb-2">
                            {recipe.title}
                          </h3>
                          {recipe.description && (
                            <p className="text-sm text-stone-600 line-clamp-2 mb-3">
                              {recipe.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-stone-500">
                            {recipe.difficulty && (
                              <Badge
                                variant={getDifficultyVariant(
                                  recipe.difficulty
                                )}
                              >
                                {recipe.difficulty}
                              </Badge>
                            )}
                            {recipe.totalTime && <span>{recipe.totalTime}</span>}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : !loading ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">
                    No recipes found
                  </h3>
                  <p className="text-stone-600 mb-6">
                    We couldn&apos;t find any recipes matching &ldquo;{query}
                    &rdquo;. Try different keywords or browse categories.
                  </p>
                  <Link href="/categories">
                    <Button>Browse Categories</Button>
                  </Link>
                </div>
              ) : null}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍳</div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">
                Start Searching
              </h3>
              <p className="text-stone-600">
                Enter a search term above to find delicious recipes
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
