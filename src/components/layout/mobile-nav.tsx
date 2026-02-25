'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'

interface MobileNavProps {
  navigation?: {
    mainMenu?: Array<{
      label: string
      href: string
      openInNewTab?: boolean
      children?: Array<{
        label: string
        href: string
        openInNewTab?: boolean
      }>
    }>
    ctaButton?: {
      label: string
      href: string
      variant?: string
    }
  }
  siteTitle: string
  favoritesCount: number
}

export function MobileNav({ navigation, siteTitle, favoritesCount }: MobileNavProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-sage-700">{siteTitle}</span>
      </div>
      <nav className="flex flex-col gap-4">
        {navigation?.mainMenu?.map((item) => (
          <div key={item.href} className="flex flex-col gap-2">
            <SheetClose asChild>
              <Link
                href={item.href}
                target={item.openInNewTab ? '_blank' : undefined}
                rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-base font-medium text-stone-700 hover:text-sage-700 transition-colors"
              >
                {item.label}
              </Link>
            </SheetClose>
            {item.children && item.children.length > 0 && (
              <div className="pl-4 flex flex-col gap-2">
                {item.children.map((child) => (
                  <SheetClose key={child.href} asChild>
                    <Link
                      href={child.href}
                      target={child.openInNewTab ? '_blank' : undefined}
                      rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
                      className="text-sm text-stone-600 hover:text-sage-700 transition-colors"
                    >
                      {child.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="flex flex-col gap-4 mt-4">
        {navigation?.ctaButton && (
          <SheetClose asChild>
            <Button asChild>
              <Link href={navigation.ctaButton.href}>
                {navigation.ctaButton.label}
              </Link>
            </Button>
          </SheetClose>
        )}
        <SheetClose asChild>
          <Link
            href="/favorites"
            className="flex items-center gap-2 text-stone-700 hover:text-sage-700 transition-colors"
          >
            <Heart className="h-5 w-5" />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-sage-600 text-[10px] font-medium text-white">
                {favoritesCount}
              </span>
            )}
          </Link>
        </SheetClose>
      </div>
    </div>
  )
}
