/**
 * Transform parsed recipes to Sanity document format
 */

const fs = require('fs');

// Read parsed recipes
const data = JSON.parse(fs.readFileSync('parsed_recipes.json', 'utf-8'));
const recipes = data.recipes;

console.log(`Total recipes: ${recipes.length}`);

// Filter valid recipes
const validRecipes = [];
for (const r of recipes) {
  if (r.title && r.slug && r.ingredients && r.ingredients.length > 0 && r.ingredients[0].items && r.ingredients[0].items.length > 0) {
    validRecipes.push(r);
  } else {
    console.log(`Skipping: ${r.title || 'NO TITLE'} - missing required fields`);
  }
}

console.log(`\nValid recipes: ${validRecipes.length}`);

// Transform to Sanity format
function transformRecipe(r) {
  const doc = {
    _id: `recipe-${r.slug}`,
    _type: 'recipe',
    title: r.title,
    slug: {
      _type: 'slug',
      current: r.slug
    },
    description: r.description,
    category: {
      _type: 'reference',
      _ref: r.category_id
    },
    subcategory: r.subcategory || '',
    cuisine: r.cuisine || '',
    difficulty: r.difficulty || 'Medium',
    servings: r.servings || 4,
    prepTime: r.prepTime || '',
    cookTime: r.cookTime || '',
    totalTime: r.totalTime || '',
    restTime: r.restTime || '',
    tags: r.tags || [],
    isFamilyRecipe: r.isFamilyRecipe || false,
    featured: r.featured || false,
    rating: r.rating || 0,
    reviewCount: r.reviewCount || 0,
    dateCreated: r.dateCreated || '2024-01-01',
    dateModified: new Date().toISOString(),
  };

  // Add author if available
  if (r.author_id) {
    doc.author = {
      _type: 'reference',
      _ref: r.author_id
    };
  }

  // Add ingredients
  if (r.ingredients && r.ingredients.length > 0) {
    doc.ingredients = [];
    for (const group of r.ingredients) {
      const groupDoc = {
        _type: 'ingredientGroup',
        _key: group._key || `group-${Math.random().toString(36).substr(2, 9)}`,
        groupName: group.groupName || 'Ingredients',
        items: []
      };
      for (const item of (group.items || [])) {
        groupDoc.items.push({
          _type: 'ingredient',
          _key: item._key || `item-${Math.random().toString(36).substr(2, 9)}`,
          amount: item.amount || '',
          unit: item.unit || '',
          ingredient: item.ingredient || ''
        });
      }
      doc.ingredients.push(groupDoc);
    }
  }

  // Add instructions
  if (r.instructions && r.instructions.length > 0) {
    doc.instructions = [];
    for (const step of r.instructions) {
      doc.instructions.push({
        _type: 'instructionStep',
        _key: step._key || `step-${step.step || 0}`,
        step: step.step || 0,
        instruction: step.instruction || ''
      });
    }
  }

  // Add nutrition if available
  if (r.nutrition && r.nutrition.calories) {
    doc.nutrition = {
      calories: r.nutrition.calories,
      protein: r.nutrition.protein || '',
      carbs: r.nutrition.carbs || '',
      fat: r.nutrition.fat || '',
      fiber: r.nutrition.fiber || ''
    };
  }

  // Add notes
  if (r.notes && r.notes.length > 0) {
    doc.notes = r.notes;
  }

  // Add variations
  if (r.variations && r.variations.length > 0) {
    doc.variations = r.variations;
  }

  // Add storage
  if (r.storage) {
    doc.storage = r.storage;
  }

  return doc;
}

// Transform all recipes
const sanityDocs = validRecipes.map(transformRecipe);

console.log(`\nTransformed ${sanityDocs.length} documents`);

// Group by category
const byCategory = {};
for (const doc of sanityDocs) {
  const catId = doc.category._ref;
  let catName = 'Unknown';
  if (catId === '56230a66-83f0-4a25-9a50-8bfd17d08448') catName = 'Desserts';
  else if (catId === '9d8f6746-12af-44be-8c44-c5db86d52a36') catName = 'Breakfast';
  else if (catId === '09c60c2c-0641-4f53-b4ff-1395595cfdc3') catName = 'Appetizers';
  else if (catId === '6d1db21c-b896-40c1-b84c-74074bf632b9') catName = 'Main Dishes';

  byCategory[catName] = (byCategory[catName] || 0) + 1;
}

console.log('\nBy Category:');
Object.entries(byCategory)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

// Save batches for import
const batchSize = 10;
const batches = [];
for (let i = 0; i < sanityDocs.length; i += batchSize) {
  batches.push(sanityDocs.slice(i, i + batchSize));
}

console.log(`\nCreated ${batches.length} batches of ${batchSize}`);

// Save all batches
fs.writeFileSync('sanity_docs_all.json', JSON.stringify(sanityDocs, null, 2));

// Save individual batches
for (let i = 0; i < batches.length; i++) {
  fs.writeFileSync(`sanity_batch_${i + 1}.json`, JSON.stringify(batches[i], null, 2));
}

console.log(`\nSaved ${batches.length} batch files`);

// Show sample
console.log('\n=== Sample Document ===');
console.log(JSON.stringify(sanityDocs[0], null, 2).slice(0, 2000));

// Summary
console.log('\n=== Summary ===');
console.log(`Total recipes in source: ${recipes.length}`);
console.log(`Valid recipes: ${validRecipes.length}`);
console.log(`Batches created: ${batches.length}`);
