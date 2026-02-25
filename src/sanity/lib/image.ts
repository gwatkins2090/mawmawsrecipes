import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

export function urlFor(source: { asset?: { _ref?: string; _id?: string; url?: string } } | null | undefined) {
  // Handle dereferenced assets (with url field) - return a wrapper that appends params to the URL
  if (source?.asset?.url) {
    const baseUrl = source.asset.url
    return {
      url: () => baseUrl,
      width: (w: number) => ({
        height: (h: number) => ({
          url: () => {
            // Replace dimensions in URL with new ones
            return baseUrl.replace(/-\d+x\d+(\.[^.]+)$/, `-${w}x${h}$1`)
          }
        }),
        url: () => baseUrl.replace(/-\d+x\d+(\.[^.]+)$/, `-${w}x$1`)
      }),
      height: (h: number) => ({
        url: () => baseUrl.replace(/-\d+x\d+(\.[^.]+)$/, `-${h}x$1`)
      })
    }
  }
  if (!source?.asset?._ref && !source?.asset?._id) {
    return null
  }
  return imageBuilder.image(source)
}

export function getImageDimensions(source: { asset?: { metadata?: { dimensions?: { width: number; height: number } } } }) {
  return source?.asset?.metadata?.dimensions || { width: 800, height: 600 }
}
