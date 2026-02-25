import { Metadata } from 'next'
import { ImageIcon } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/client'
import { ABOUT_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/shared/sanity-image'
import { PortableText } from '@/components/shared/portable-text'

export const metadata: Metadata = {
  title: 'About',
}

export default async function AboutPage() {
  const [aboutPage, siteSettings] = await Promise.all([
    sanityFetch({
      query: ABOUT_PAGE_QUERY,
      tags: ['about-page'],
    }),
    sanityFetch({
      query: SITE_SETTINGS_QUERY,
      tags: ['site-settings'],
    }),
  ])

  const hero = aboutPage?.hero || {}
  const mission = aboutPage?.mission || {}
  const story = aboutPage?.story || {}
  const values = aboutPage?.values || {}
  const team = aboutPage?.team || {}

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-charcoal py-24 md:py-32">
        {hero.backgroundImage && (
          <div className="absolute inset-0">
            <SanityImage
              image={hero.backgroundImage}
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent" />
          </div>
        )}
        <div className="container-editorial relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-label text-terracotta mb-4 block">Our Story</span>
            <h1 className="heading-hero text-white mb-6">
              {hero.heading || 'The Heart Behind Savor'}
            </h1>
            {hero.description && (
              <p className="text-xl text-white/70 max-w-xl mx-auto">{hero.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      {mission.content && (
        <section className="section-padding bg-cream">
          <div className="container-editorial">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-label text-terracotta mb-4 block">Our Mission</span>
              <h2 className="heading-section text-charcoal mb-8">
                {mission.title || 'Preserving Culinary Heritage'}
              </h2>
              <div className="w-16 h-0.5 bg-terracotta mx-auto mb-8" />
              <div className="prose prose-lg prose-stone mx-auto text-charcoal-light">
                <PortableText value={mission.content} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Story Section */}
      {story.content && (
        <section className="section-padding bg-cream-dark">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-label text-terracotta mb-4 block">Our Journey</span>
                <h2 className="heading-section text-charcoal mb-6">
                  {story.title || 'From Our Kitchen to Yours'}
                </h2>
                <div className="w-16 h-0.5 bg-terracotta mb-8" />
                <div className="prose prose-stone text-charcoal-light">
                  <PortableText value={story.content} />
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                {story.image ? (
                  <div className="relative">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                      <SanityImage
                        image={story.image}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-terracotta/20 rounded-sm -z-10" />
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage/10 -z-10" />
                  </div>
                ) : (
                  <div className="aspect-[4/5] bg-sand rounded-sm flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-charcoal-muted" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {values.items && values.items.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="container-editorial">
            <div className="text-center mb-16">
              <span className="text-label text-terracotta mb-4 block">What We Believe</span>
              <h2 className="heading-section text-charcoal">
                {values.title || 'Our Values'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.items.map((value: any, index: number) => (
                <div
                  key={index}
                  className="group p-8 bg-white rounded-sm border border-sand hover:border-terracotta/30 transition-colors"
                >
                  {value.icon && (
                    <div className="w-14 h-14 mb-6 bg-cream rounded-sm flex items-center justify-center text-2xl">
                      {value.icon}
                    </div>
                  )}
                  <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-terracotta transition-colors">
                    {value.title}
                  </h3>
                  {value.description && (
                    <p className="text-body-sm text-charcoal-muted">{value.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team.description && (
        <section className="section-padding bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          <div className="container-editorial relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-label text-terracotta mb-4 block">The People</span>
              <h2 className="heading-section text-white mb-5">
                {team.title || 'Meet the Family'}
              </h2>
              <p className="text-lg text-white/70">{team.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      {aboutPage?.showStats !== false && siteSettings?.stats && (
        <section className="py-20 bg-terracotta">
          <div className="container-editorial">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {siteSettings.stats.recipesCount && (
                <div className="text-center">
                  <div className="font-display text-5xl md:text-6xl text-white mb-2">
                    {siteSettings.stats.recipesCount}
                  </div>
                  <div className="text-sm text-white/80 uppercase tracking-wider">Recipes</div>
                </div>
              )}
              {siteSettings.stats.categoriesCount && (
                <div className="text-center">
                  <div className="font-display text-5xl md:text-6xl text-white mb-2">
                    {siteSettings.stats.categoriesCount}
                  </div>
                  <div className="text-sm text-white/80 uppercase tracking-wider">Categories</div>
                </div>
              )}
              {siteSettings.stats.authorsCount && (
                <div className="text-center">
                  <div className="font-display text-5xl md:text-6xl text-white mb-2">
                    {siteSettings.stats.authorsCount}
                  </div>
                  <div className="text-sm text-white/80 uppercase tracking-wider">Authors</div>
                </div>
              )}
              {siteSettings.stats.yearsActive && (
                <div className="text-center">
                  <div className="font-display text-5xl md:text-6xl text-white mb-2">
                    {siteSettings.stats.yearsActive}
                  </div>
                  <div className="text-sm text-white/80 uppercase tracking-wider">Years</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
