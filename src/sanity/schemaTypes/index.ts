import type { SchemaTypeDefinition } from 'sanity'
import * as documents from './documents'
import * as objects from './objects'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  documents.recipe,
  documents.category,
  documents.author,
  documents.siteSettings,
  documents.homePage,
  documents.recipesPage,
  documents.categoriesPage,
  documents.aboutPage,
  documents.searchPage,
  // Objects
  objects.navigationItem,
  objects.ctaButton,
  objects.footerColumn,
  objects.socialLink,
  objects.ingredient,
  objects.ingredientGroup,
  objects.instructionStep,
  objects.seoFields,
]
