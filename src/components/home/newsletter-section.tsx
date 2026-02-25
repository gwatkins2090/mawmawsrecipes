'use client'

import { SanityImage } from '@/components/shared/sanity-image'
import { Send } from 'lucide-react'

interface NewsletterSectionProps {
  heading?: string
  description?: string
  backgroundImage?: {
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
}

export function NewsletterSection({
  heading,
  description,
  backgroundImage,
}: NewsletterSectionProps) {
  if (!heading && !description) {
    return null
  }

  const displayHeading = heading || 'Join Our Table'
  const displayDescription = description || 'Subscribe for seasonal recipes, cooking tips, and stories from our kitchen.'

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <SanityImage
            image={backgroundImage}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-charcoal">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </div>
      )}

      <div className="relative z-10 container-editorial">
        <div className="max-w-2xl mx-auto text-center">
          {/* Label */}
          <span className="text-label text-terracotta mb-4 block">Stay Connected</span>

          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-5">
            {displayHeading}
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 mb-10 max-w-md mx-auto">
            {displayDescription}
          </p>

          {/* Form */}
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-14 px-5 bg-white/10 border border-white/20 rounded-sm text-white placeholder:text-white/50 focus:outline-none focus:border-terracotta transition-colors"
            />
            <button
              type="submit"
              className="h-14 px-8 bg-terracotta hover:bg-terracotta-light text-white font-medium rounded-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Trust Note */}
          <p className="text-xs text-white/40 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
