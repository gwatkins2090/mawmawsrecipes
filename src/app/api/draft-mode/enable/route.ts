import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { tokenClient } from '@/sanity/lib/client'

export const { GET } = defineEnableDraftMode({
  client: tokenClient,
})
