import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SanityImage } from '@/components/shared/sanity-image'

interface HeroSectionProps {
  headline?: string
  subtitle?: string
  backgroundImage?: {
    asset?: {
      _id?: string
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: {
          width: number
          height: number
        }
      }
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  } | null
  showStats?: boolean
  stats?: {
    recipesCount?: number
    authorsCount?: number
    yearsActive?: number
  }
  primaryCta?: {
    label?: string
    href?: string
  }
  secondaryCta?: {
    label?: string
    href?: string
  }
}

export function HeroSection({
  headline,
  subtitle,
  backgroundImage,
  showStats,
  stats,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  const displayHeadline = headline || 'Family Recipes, Shared with Love'
  const displaySubtitle = subtitle || 'Discover generations of culinary wisdom, from our kitchen to yours.'

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-charcoal">
      {/* Background Image with Overlay */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <SanityImage
            image={backgroundImage}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-terracotta-dark/30" />
      )}

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-transparent via-terracotta/50 to-transparent hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-px h-40 bg-gradient-to-b from-transparent via-terracotta/50 to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 container-editorial w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="max-w-xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-terracotta" />
              <span className="text-label text-terracotta">Welcome to Savor</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] mb-6">
              {displayHeadline}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 font-sans leading-relaxed mb-8 max-w-md">
              {displaySubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              {primaryCta?.href && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex items-center gap-3 bg-terracotta hover:bg-terracotta-light text-white px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300"
                >
                  <span>{primaryCta.label || 'Explore Recipes'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryCta?.href && (
                <Link
                  href={secondaryCta.href}
                  className="group inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium border-b border-white/30 hover:border-white pb-1 transition-all duration-300"
                >
                  <span>{secondaryCta.label || 'Our Story'}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right: Stats Card */}
          {showStats && stats && (
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 max-w-sm ml-auto">
                <div className="grid grid-cols-3 gap-6">
                  {stats.recipesCount !== undefined && (
                    <div className="text-center">
                      <div className="font-display text-4xl font-semibold text-white mb-1">
                        {stats.recipesCount}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-white/60">
                        Recipes
                      </div>
                    </div>
                  )}
                  {stats.authorsCount !== undefined && (
                    <div className="text-center border-x border-white/10">
                      <div className="font-display text-4xl font-semibold text-white mb-1">
                        {stats.authorsCount}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-white/60">
                        Cooks
                      </div>
                    </div>
                  )}
                  {stats.yearsActive !== undefined && (
                    <div className="text-center">
                      <div className="font-display text-4xl font-semibold text-white mb-1">
                        {stats.yearsActive}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-white/60">
                        Years
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}
