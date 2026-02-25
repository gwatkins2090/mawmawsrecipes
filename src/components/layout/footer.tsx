import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/shared/sanity-image'
import { NewsletterForm } from './newsletter-form'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
}

export async function Footer() {
  const siteSettings = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    tags: ['site-settings'],
  })

  const footer = siteSettings?.footer
  const logo = siteSettings?.logo
  const siteTitle = siteSettings?.title || 'Savor'
  const newsletter = siteSettings?.newsletter

  return (
    <footer className="w-full bg-charcoal text-white">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6">
            {logo ? (
              <SanityImage
                image={logo}
                width={140}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            ) : (
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold tracking-tight">
                  {siteTitle}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta -mt-1">
                  Family Recipes
                </span>
              </div>
            )}
            {footer?.tagline && (
              <p className="text-sm text-white/60 leading-relaxed">{footer.tagline}</p>
            )}

            {/* Social Links */}
            {footer?.socialLinks && footer.socialLinks.length > 0 && (
              <div className="flex gap-3">
                {footer.socialLinks.map((social: {
                  platform: string
                  url: string
                }) => {
                  const Icon = socialIcons[social.platform]
                  if (!Icon) return null
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-terracotta hover:bg-terracotta/10 transition-all"
                      aria-label={social.platform}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer Columns */}
          {footer?.columns?.map((column: {
            title: string
            links: Array<{
              label: string
              href: string
              openInNewTab?: boolean
            }>
          }) => (
            <div key={column.title} className="space-y-5">
              <h3 className="font-serif text-lg text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links?.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white/60 hover:text-terracotta transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {newsletter?.enabled && (
            <div className="space-y-5">
              <h3 className="font-serif text-lg text-white">
                {newsletter.heading || 'Newsletter'}
              </h3>
              {newsletter.description && (
                <p className="text-sm text-white/60">{newsletter.description}</p>
              )}
              <NewsletterForm
                placeholder={newsletter.placeholder}
                buttonLabel={newsletter.buttonLabel}
              />
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          {footer?.bottomText ? (
            <p className="text-sm text-white/40">{footer.bottomText}</p>
          ) : (
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} {siteTitle}. All rights reserved.
            </p>
          )}
          {footer?.bottomLinks && footer.bottomLinks.length > 0 && (
            <div className="flex gap-6">
              {footer.bottomLinks.map((link: {
                label: string
                href: string
              }) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
