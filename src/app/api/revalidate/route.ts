import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json()
  const { _type, slug } = body

  // Revalidate based on document type
  switch (_type) {
    case 'recipe':
      revalidateTag('recipes')
      if (slug?.current) {
        revalidateTag(`recipe:${slug.current}`)
      }
      break
    case 'category':
      revalidateTag('categories')
      if (slug?.current) {
        revalidateTag(`category:${slug.current}`)
      }
      break
    case 'siteSettings':
      revalidateTag('site-settings')
      break
    case 'homePage':
      revalidateTag('home-page')
      break
    case 'aboutPage':
      revalidateTag('about-page')
      break
    default:
      revalidateTag('all')
  }

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
