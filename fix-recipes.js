/**
 * Fix all recipe issues in Sanity:
 * 1. Fix ingredients structure (groupName -> groupTitle, ingredient -> name)
 * 2. Remove placeholder text from descriptions
 * 3. Remove author field
 * 4. Prepare for image generation
 */

const fs = require('fs');

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

// Fix a single recipe's structure
function fixRecipeStructure(recipe) {
  const fixed = { ...recipe };

  // 1. Fix ingredients structure
  if (fixed.ingredients && Array.isArray(fixed.ingredients)) {
    fixed.ingredients = fixed.ingredients.map(group => ({
      ...group,
      // Change groupName to groupTitle
      groupTitle: group.groupName || 'Ingredients',
      // Remove old field
      groupName: undefined,
      // Fix items
      items: group.items?.map(item => ({
        ...item,
        // Change ingredient to name
        name: item.ingredient || '',
        // Remove old field
        ingredient: undefined
      })) || []
    }));
  }

  // 2. Fix description - remove placeholder text
  if (fixed.description) {
    fixed.description = fixed.description
      .replace(/A cherished recipe passed down through generations\./g, '')
      .replace(/Family recipe for [^.]+\.\s*/g, '')
      .trim();

    // If description is now empty, use a generic one
    if (!fixed.description) {
      fixed.description = `Delicious homemade ${fixed.title}`;
    }
  }

  // 3. Remove author
  delete fixed.author;

  return fixed;
}

async function main() {
  // Load all recipes from the parsed data
  const data = JSON.parse(fs.readFileSync('parsed_recipes.json', 'utf-8'));
  const recipes = data.recipes;

  console.log(`Found ${recipes.length} recipes to fix`);

  // Transform to Sanity format with fixes
  const sanityDocs = [];
  for (const r of recipes) {
    // First transform to Sanity format
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

    // Add ingredients with correct structure
    if (r.ingredients && r.ingredients.length > 0) {
      doc.ingredients = [];
      for (const group of r.ingredients) {
        const groupDoc = {
          _type: 'ingredientGroup',
          _key: group._key || `group-${Math.random().toString(36).substr(2, 9)}`,
          groupTitle: group.groupName || 'Ingredients',
          items: []
        };
        for (const item of (group.items || [])) {
          groupDoc.items.push({
            _type: 'ingredient',
            _key: item._key || `item-${Math.random().toString(36).substr(2, 9)}`,
            amount: item.amount || '',
            unit: item.unit || '',
            name: item.ingredient || '' // Use 'name' not 'ingredient'
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

    // Fix description
    if (doc.description) {
      doc.description = doc.description
        .replace(/A cherished recipe passed down through generations\./g, '')
        .replace(/Family recipe for [^.]+\.\s*/g, '')
        .trim();

      if (!doc.description) {
        doc.description = `Delicious homemade ${r.title}`;
      }
    }

    // No author field

    sanityDocs.push(doc);
  }

  console.log(`Transformed ${sanityDocs.length} documents`);

  // Save fixed versions
  fs.writeFileSync('sanity_docs_fixed.json', JSON.stringify(sanityDocs, null, 2));

  // Batch update in Sanity
  const batchSize = 10;
  const batches = [];
  for (let i = 0; i < sanityDocs.length; i += batchSize) {
    batches.push(sanityDocs.slice(i, i + batchSize));
  }

  console.log(`Created ${batches.length} batches`);

  // Process each batch
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\n[${i + 1}/${batches.length}] Updating ${batch.length} recipes...`);

    // Create mutations
    const mutations = batch.map(doc => ({
      createOrReplace: doc
    }));

    try {
      const result = await sanityRequest(mutations);
      console.log(`  ✓ Success: ${result.results?.length || 0} updated`);
      successCount += result.results?.length || 0;
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
      failCount += batch.length;
    }

    // Delay between batches
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\n=== FIX SUMMARY ===');
  console.log(`Total recipes: ${sanityDocs.length}`);
  console.log(`Successfully updated: ${successCount}`);
  console.log(`Failed: ${failCount}`);

  // Save recipe list for image generation
  const recipeList = sanityDocs.map(d => ({ id: d._id, title: d.title }));
  fs.writeFileSync('recipes_for_images.json', JSON.stringify(recipeList, null, 2));
  console.log('\nSaved recipe list to recipes_for_images.json');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
