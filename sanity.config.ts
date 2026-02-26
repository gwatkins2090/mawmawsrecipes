'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { resolve } from './src/sanity/presentation/resolve'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',
  title: 'Savor Recipe CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Home Page')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Recipes Page')
              .child(S.document().schemaType('recipesPage').documentId('recipesPage')),
            S.listItem()
              .title('Categories Page')
              .child(S.document().schemaType('categoriesPage').documentId('categoriesPage')),
            S.listItem()
              .title('About Page')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Search Page')
              .child(S.document().schemaType('searchPage').documentId('searchPage')),
            S.divider(),
            // Collections
            S.documentTypeListItem('recipe').title('Recipes'),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('author').title('Authors'),
          ]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode/enable',
          secret: process.env.SANITY_PREVIEW_SECRET!,
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
})
