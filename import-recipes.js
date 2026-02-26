#!/usr/bin/env node
/**
 * Import parsed recipes into Sanity
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ID = 'ynsg8i79';
const DATASET = 'production';
const API_VERSION = '2024-01-01';
const API_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!API_TOKEN) {
  console.error('Error: SANITY_API_WRITE_TOKEN environment variable is required');
  process.exit(1);
}

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

async function sanityRequest(mutations) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({ mutations })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sanity API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

function transformRecipe(recipe) {
  // Build the Sanity document
  const doc = {
    _type: 'recipe',
    _id: `recipe-${recipe.slug}`,
    title: recipe.title,
    slug: {
      _type: 'slug',
      current: recipe.slug
    },
    description: recipe.description,
    category: {
      _type: 'reference',
      _ref: recipe.category_id
    },
    subcategory: recipe.subcategory,
    cuisine: recipe.cuisine,
    difficulty: recipe.difficulty,
    servings: recipe.servings,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    restTime: recipe.restTime,
    tags: recipe.tags,
    isFamilyRecipe: recipe.isFamilyRecipe,
    featured: recipe.featured,
    rating: recipe.rating,
    reviewCount: recipe.reviewCount,
    dateCreated: recipe.dateCreated,
    // Set dateModified to now
    dateModified: new Date().toISOString(),
  };

  // Add author if available
  if (recipe.author_id) {
    doc.author = {
      _type: 'reference',
      _ref: recipe.author_id
    };
  }

  // Add ingredients
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    doc.ingredients = recipe.ingredients.map(group => ({
      _type: 'ingredientGroup',
      _key: group._key || `group-${Math.random().toString(36).substr(2, 9)}`,
      groupName: group.groupName || 'Ingredients',
      items: group.items.map(item => ({
        _type: 'ingredient',
        _key: item._key || `item-${Math.random().toString(36).substr(2, 9)}`,
        amount: item.amount || '',
        unit: item.unit || '',
        ingredient: item.ingredient || ''
      }))
    }));
  }

  // Add instructions
  if (recipe.instructions && recipe.instructions.length > 0) {
    doc.instructions = recipe.instructions.map(step => ({
      _type: 'instructionStep',
      _key: step._key || `step-${Math.random().toString(36).substr(2, 9)}`,
      step: step.step,
      instruction: step.instruction
    }));
  }

  // Add nutrition if available
  if (recipe.nutrition) {
    doc.nutrition = {
      calories: recipe.nutrition.calories,
      protein: recipe.nutrition.protein,
      carbs: recipe.nutrition.carbs,
      fat: recipe.nutrition.fat,
      fiber: recipe.nutrition.fiber
    };
  }

  // Add notes
  if (recipe.notes && recipe.notes.length > 0) {
    doc.notes = recipe.notes;
  }

  // Add variations
  if (recipe.variations && recipe.variations.length > 0) {
    doc.variations = recipe.variations;
  }

  // Add storage
  if (recipe.storage) {
    doc.storage = recipe.storage;
  }

  // Add SEO
  doc.seo = {
    metaTitle: recipe.title,
    metaDescription: recipe.description
  };

  // Add mainImage placeholder (will be generated separately)
  doc.mainImage = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-placeholder'  // Will be replaced with actual image
    }
  };

  return doc;
}

async function main() {
  // Load parsed recipes
  const data = JSON.parse(fs.readFileSync('parsed_recipes.json', 'utf-8'));
  const recipes = data.recipes;

  console.log(`Importing ${recipes.length} recipes...`);

  // Filter out recipes with missing required fields
  const validRecipes = recipes.filter(r => {
    if (!r.title) {
      console.log(`Skipping recipe without title: ${r.file_path}`);
      return false;
    }
    if (!r.slug) {
      console.log(`Skipping recipe without slug: ${r.title}`);
      return false;
    }
    return true;
  });

  console.log(`Valid recipes to import: ${validRecipes.length}`);

  // Transform recipes to Sanity documents
  const documents = validRecipes.map(transformRecipe);

  // Batch in groups of 10 (Sanity mutation limit per request)
  const batchSize = 10;
  const batches = [];
  for (let i = 0; i < documents.length; i += batchSize) {
    batches.push(documents.slice(i, i + batchSize));
  }

  console.log(`Created ${batches.length} batches`);

  // Process each batch
  const results = {
    successful: [],
    failed: []
  };

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\nProcessing batch ${i + 1}/${batches.length} (${batch.length} recipes)...`);

    // Create mutations
    const mutations = batch.map(doc => ({
      createOrReplace: doc
    }));

    try {
      const result = await sanityRequest(mutations);
      console.log(`  Success: ${result.results?.length || 0} documents`);
      results.successful.push(...batch.map(d => d.title));
    } catch (error) {
      console.error(`  Error: ${error.message}`);
      results.failed.push(...batch.map(d => ({ title: d.title, error: error.message })));
    }

    // Small delay between batches
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Print summary
  console.log('\n=== Import Summary ===');
  console.log(`Total recipes: ${recipes.length}`);
  console.log(`Valid recipes: ${validRecipes.length}`);
  console.log(`Successfully imported: ${results.successful.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed recipes:');
    results.failed.forEach(f => console.log(`  - ${f.title}: ${f.error}`));
  }

  // Save results
  fs.writeFileSync('import_results.json', JSON.stringify(results, null, 2));
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
