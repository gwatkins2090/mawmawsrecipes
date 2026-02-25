import { HeroSection } from '@/components/home/hero-section'
import { FeaturedRecipes } from '@/components/home/featured-recipes'
import { CategoryShowcase } from '@/components/home/category-showcase'
import { AboutTeaser } from '@/components/home/about-teaser'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { sanityFetch } from '@/sanity/lib/client'
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY, FEATURED_RECIPES_QUERY } from '@/sanity/lib/queries'

export default async function HomePage() {
  const [homePage, siteSettings] = await Promise.all([
    sanityFetch({
      query: HOME_PAGE_QUERY,
      tags: ['home-page'],
    }),
    sanityFetch({
      query: SITE_SETTINGS_QUERY,
      tags: ['site-settings'],
    }),
  ])

  // Get featured recipes - either from curated list or auto-featured
  let featuredRecipes = homePage?.featuredSection?.recipes
  if (!featuredRecipes || featuredRecipes.length === 0) {
    featuredRecipes = await sanityFetch({
      query: FEATURED_RECIPES_QUERY,
      params: { limit: 4 },
      tags: ['recipes'],
    })
  }

  // Get categories - either from curated list or all
  let categories = homePage?.categorySection?.categories
  if (!categories || categories.length === 0) {
    // Fetch all categories
    const { CATEGORIES_QUERY } = await import('@/sanity/lib/queries')
    categories = await sanityFetch({
      query: CATEGORIES_QUERY,
      tags: ['categories'],
    })
  }

  // Deduplicate categories by _id to prevent rendering duplicates
  const uniqueCategories = categories
    ? categories.filter((cat: any, index: number, self: any[]) =>
        index === self.findIndex((c) => c._id === cat._id)
      )
    : []

  return (
    <>
      <HeroSection
        headline={homePage?.hero?.headline}
        subtitle={homePage?.hero?.subtitle}
        backgroundImage={homePage?.hero?.backgroundImage}
        showStats={homePage?.hero?.showStats}
        stats={siteSettings?.stats}
        primaryCta={homePage?.hero?.primaryCta}
        secondaryCta={homePage?.hero?.secondaryCta}
      />

      <FeaturedRecipes
        heading={homePage?.featuredSection?.heading}
        subheading={homePage?.featuredSection?.subheading}
        recipes={featuredRecipes || []}
      />

      <CategoryShowcase
        heading={homePage?.categorySection?.heading}
        subheading={homePage?.categorySection?.subheading}
        categories={uniqueCategories}
      />

      <AboutTeaser
        heading={homePage?.aboutTeaser?.heading}
        body={homePage?.aboutTeaser?.body}
        image={homePage?.aboutTeaser?.image}
        cta={homePage?.aboutTeaser?.cta}
      />

      {homePage?.newsletterSection?.enabled !== false && (
        <NewsletterSection
          heading={homePage?.newsletterSection?.heading}
          description={homePage?.newsletterSection?.description}
          backgroundImage={homePage?.newsletterSection?.backgroundImage}
        />
      )}
    </>
  )
}
