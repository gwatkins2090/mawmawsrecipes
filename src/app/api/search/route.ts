import { NextRequest, NextResponse } from 'next/server'
import { sanityFetch } from '@/sanity/lib/client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] })
  }

  const searchQuery = `*[_type == "recipe" && (
    title match $query + "*" ||
    description match $query + "*" ||
    ingredients[].items[].name match $query + "*" ||
    category->title match $query + "*"
  )] | order(_createdAt desc) [0...20] {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    totalTime,
    difficulty,
    "category": category->{
      title,
      slug,
      emoji
    }
  }`

  try {
    const results = await sanityFetch({
      query: searchQuery,
      params: { query },
      tags: ['recipes'],
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    )
  }
}
