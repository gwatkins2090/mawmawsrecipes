import Link from 'next/link'
import { Menu } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SanityImage } from '@/components/shared/sanity-image'
import { MobileNav } from './mobile-nav'

interface HeaderProps {
  favoritesCount?: number
}

export async function Header({ favoritesCount = 0 }: HeaderProps) {
  const siteSettings = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    tags: ['site-settings'],
  })

  const navigation = siteSettings?.navigation
  const logo = siteSettings?.logo
  const siteTitle = siteSettings?.title || 'Savor'

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/95 backdrop-blur-md border-b border-sand">
      <div className="container-editorial">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {logo ? (
              <div className="relative h-10 w-auto">
                <SanityImage
                  image={logo}
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            ) : (
              <div className="flex flex-col items-start">
                <span className="font-display text-2xl font-semibold text-charcoal tracking-tight">
                  {siteTitle}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta font-medium -mt-1">
                  Family Recipes
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation?.mainMenu?.map((item: {
              label: string
              href: string
              openInNewTab?: boolean
              children?: Array<{
                label: string
                href: string
                openInNewTab?: boolean
              }>
            }) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="text-sm font-medium text-charcoal-light hover:text-terracotta transition-colors duration-200 relative py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-terracotta transition-all duration-300 group-hover:w-full" />
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="absolute top-full left-0 mt-4 w-56 bg-white rounded shadow-xl border border-sand opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          target={child.openInNewTab ? '_blank' : undefined}
                          rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="block px-4 py-2.5 text-sm text-charcoal-light hover:text-terracotta hover:bg-cream transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/favorites"
              className="relative p-2 text-charcoal-light hover:text-terracotta transition-colors"
              aria-label="Favorites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-medium text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {navigation?.ctaButton && (
              <Button
                asChild
                className="bg-terracotta hover:bg-terracotta-dark text-white rounded-sm px-6"
              >
                <Link href={navigation.ctaButton.href}>
                  {navigation.ctaButton.label}
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-charcoal">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] bg-cream border-l border-sand">
              <MobileNav
                navigation={navigation}
                siteTitle={siteTitle}
                favoritesCount={favoritesCount}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
