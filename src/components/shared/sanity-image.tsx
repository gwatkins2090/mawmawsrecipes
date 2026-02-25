'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface SanityImageProps {
  image: {
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
  className?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}

export function SanityImage({
  image,
  className,
  fill,
  width,
  height,
  sizes = '100vw',
  priority = false,
}: SanityImageProps) {
  if (!image?.asset?.url && !image?.asset?._id) {
    return (
      <div
        className={cn(
          'bg-stone-100 flex items-center justify-center',
          className
        )}
        style={
          !fill && width && height
            ? { width, height }
            : undefined
        }
      >
        <span className="text-stone-400 text-sm">No image</span>
      </div>
    )
  }

  const imageUrl = urlFor(image)
  if (!imageUrl) {
    return null
  }

  const blurDataURL = image.asset.metadata?.lqip

  if (fill) {
    return (
      <Image
        src={imageUrl.url()}
        alt={image.alt || ''}
        fill
        className={cn('object-cover', className)}
        sizes={sizes}
        priority={priority}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
      />
    )
  }

  const dimensions = image.asset.metadata?.dimensions
  const finalWidth = width || dimensions?.width || 800
  const finalHeight = height || dimensions?.height || 600

  return (
    <Image
      src={imageUrl.width(finalWidth).height(finalHeight).url()}
      alt={image.alt || ''}
      width={finalWidth}
      height={finalHeight}
      className={cn('object-cover', className)}
      sizes={sizes}
      priority={priority}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  )
}
