import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/shared/sanity-image'
import { Button } from '@/components/ui/button'

export default async function NotFound() {
  const siteSettings = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    tags: ['site-settings'],
  })

  const notFoundPage = siteSettings?.notFoundPage

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-md mx-auto text-center">
          {notFoundPage?.image && (
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <SanityImage
                image={notFoundPage.image}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl font-bold text-stone-900 mb-4">
            {notFoundPage?.heading || 'Page Not Found'}
          </h1>

          <p className="text-lg text-stone-600 mb-8">
            {notFoundPage?.message || "The page you're looking for doesn't exist."}
          </p>

          <Button asChild>
            <Link href="/">
              {notFoundPage?.ctaLabel || 'Go Home'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
