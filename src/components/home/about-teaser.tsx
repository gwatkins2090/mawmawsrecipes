import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PortableText } from '@/components/shared/portable-text'
import { SanityImage } from '@/components/shared/sanity-image'

interface AboutTeaserProps {
  heading?: string
  body?: unknown
  image?: {
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
  cta?: {
    label?: string
    href?: string
  }
}

export function AboutTeaser({ heading, body, image, cta }: AboutTeaserProps) {
  const displayHeading = heading || 'Our Story'

  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          {image ? (
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm">
                <SanityImage
                  image={image}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-terracotta/20 rounded-sm -z-10" />

              {/* Accent Block */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-sage/10 -z-10" />
            </div>
          ) : (
            <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-sand rounded-sm flex items-center justify-center">
              <span className="text-6xl">👨‍🍳</span>
            </div>
          )}

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="text-label text-terracotta mb-4 block">About Savor</span>

            <h2 className="heading-section text-charcoal mb-6">
              {displayHeading}
            </h2>

            <div className="w-16 h-0.5 bg-terracotta mb-8" />

            {body ? (
              <div className="prose prose-lg text-charcoal-light mb-8">
                <PortableText value={body} />
              </div>
            ) : (
              <p className="text-body text-lg mb-8">
                Savor is more than a recipe collection—it's a celebration of family traditions,
                passed down through generations. Each dish tells a story, each ingredient holds
                a memory. Join us in preserving these culinary treasures.
              </p>
            )}

            {cta?.href ? (
              <Link
                href={cta.href}
                className="group inline-flex items-center gap-3 text-charcoal hover:text-terracotta transition-colors"
              >
                <span className="font-medium">{cta.label || 'Read Our Story'}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-charcoal hover:text-terracotta transition-colors"
              >
                <span className="font-medium">Read Our Story</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
