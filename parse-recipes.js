#!/usr/bin/env node
/**
 * Parse all recipe files from knowledgebase and prepare for Sanity import
 */

const fs = require('fs');
const path = require('path');

// Category mapping based on existing Sanity categories
const CATEGORY_MAP = {
  'asian': '6d1db21c-b896-40c1-b84c-74074bf632b9',  // Main Dishes
  'breakfast': '9d8f6746-12af-44be-8c44-c5db86d52a36',  // Breakfast
  'desert': '56230a66-83f0-4a25-9a50-8bfd17d08448',  // Desserts (fix typo)
  'italian': '6d1db21c-b896-40c1-b84c-74074bf632b9',  // Main Dishes
  'mexican': '6d1db21c-b896-40c1-b84c-74074bf632b9',  // Main Dishes
  'soups': '6d1db21c-b896-40c1-b84c-74074bf632b9',  // Main Dishes
  'beef': '6d1db21c-b896-40c1-b84c-74074bf632b9',  // Main Dishes
  'pork': '6d1db21c-b896-40c1-b84c-74074bf632b9',  // Main Dishes
  'poultry': '6d1db21c-b896-40c1-b84c-74074bf632b9',  // Main Dishes
  'sides': '09c60c2c-0641-4f53-b4ff-1395595cfdc3',  // Appetizers/Snacks
};

// Default author ID (Grandma Rose - the most common family recipe author)
const DEFAULT_AUTHOR_ID = '00182644-6306-4089-a941-f961319ca554';

// Author mapping
const AUTHOR_MAP = {
  'Grandma Rose': '00182644-6306-4089-a941-f961319ca554',
  'Aunt Marie': '22e0374d-3dd5-4167-845e-6cc2dced5236',
  'Uncle Jim': '70b2e400-985f-45b7-835b-3bd0ab056a9c',
};

function slugify(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseSimpleIngredients(content) {
  const ingredients = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const item = trimmed.slice(2).trim();
      if (item) {
        // Try to extract amount, unit, and ingredient
        // Common pattern: "1½ cups flour" or "1/4 teaspoon salt"
        const match = item.match(/^(?:Recipe\s*)?([\d\s\./½¼¾⅓⅔⅛⅜⅝-]+)?\s*(cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons|oz|ounce|ounces|lb|pound|pounds|g|gram|grams|kg|package|can|piece|pieces|slice|slices|clove|cloves|large|small|medium)?\.?\s*(.+)?$/i);

        let amount = '';
        let unit = '';
        let ingredient = item;

        if (match) {
          amount = (match[1] || '').trim();
          unit = (match[2] || '').trim();
          ingredient = (match[3] || '').trim();

          // If no ingredient parsed, the whole thing might be the ingredient
          if (!ingredient) {
            ingredient = unit || item;
            unit = '';
          }
        }

        // Clean up the ingredient text
        ingredient = ingredient.replace(/^-\s*/, '').trim();

        ingredients.push({
          amount: amount,
          unit: unit,
          ingredient: ingredient
        });
      }
    }
  }

  return ingredients;
}

function parseSimpleInstructions(content) {
  const instructions = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    // Match numbered items (1. or 1) or bullet points
    const match = trimmed.match(/^(?:\d+[.):\s]+|[*\-]\s+)(.+)$/);
    if (match && match[1] && match[1].length > 5) {
      instructions.push({ instruction: match[1].trim() });
    }
  }

  // If no numbered instructions found, try to split by double newlines
  if (instructions.length === 0) {
    const paras = content.split(/\n\s*\n/);
    for (const para of paras) {
      const trimmed = para.trim();
      if (trimmed.length > 10 && !trimmed.toLowerCase().startsWith('note')) {
        // Check if this looks like a step (contains action words)
        instructions.push({ instruction: trimmed });
      }
    }
  }

  return instructions;
}

function parseYamlFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return null;

  const frontmatterText = match[1];
  const body = match[2].trim();

  // Simple YAML parser
  const frontmatter = {};
  let currentKey = null;
  let currentArray = null;
  let currentObj = null;
  let inArray = false;
  let arrayIndent = 0;

  const lines = frontmatterText.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      if (inArray && currentArray) {
        // Check if next line continues the array
        const nextLine = lines[i + 1];
        if (nextLine && !nextLine.match(/^\s+-/)) {
          inArray = false;
          if (currentKey) {
            frontmatter[currentKey] = currentArray;
          }
          currentArray = null;
        }
      }
      continue;
    }

    // Check for array item
    const arrayMatch = line.match(/^(\s*)-\s*(.+)$/);
    if (arrayMatch && inArray) {
      const itemValue = arrayMatch[2].trim();

      // Check if this is an object array item
      if (itemValue.includes(':')) {
        // This is the start of a new object in the array
        if (currentObj) {
          currentArray.push(currentObj);
        }
        currentObj = {};
        const [key, value] = itemValue.split(':', 2);
        currentObj[key.trim()] = value ? value.trim() : '';
      } else if (currentObj) {
        // This is a value for the current object
        const [key, value] = itemValue.split(':', 2);
        currentObj[key.trim()] = value ? value.trim() : '';

        // Check if next line is not an array item
        const nextLine = lines[i + 1];
        if (!nextLine || !nextLine.match(/^\s+-/) || nextLine.match(/^\s+-\s+\w+:/)) {
          currentArray.push(currentObj);
          currentObj = null;
        }
      } else {
        // Simple array item
        currentArray.push(itemValue);
      }
      continue;
    }

    // Check for key-value pair
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      // Save any pending array
      if (inArray && currentArray && currentKey) {
        frontmatter[currentKey] = currentArray;
        inArray = false;
        currentArray = null;
      }

      const key = kvMatch[1];
      const value = kvMatch[2].trim();

      // Check if next line starts an array
      const nextLine = lines[i + 1];
      if (nextLine && nextLine.match(/^\s+-/)) {
        inArray = true;
        currentKey = key;
        currentArray = value ? [value] : [];
      } else if (value === '') {
        frontmatter[key] = '';
      } else if (value.match(/^\d+$/)) {
        frontmatter[key] = parseInt(value);
      } else if (value.match(/^\d+\.\d+$/)) {
        frontmatter[key] = parseFloat(value);
      } else {
        frontmatter[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  // Save any pending array
  if (inArray && currentArray && currentKey) {
    frontmatter[currentKey] = currentArray;
  }

  return { frontmatter, body };
}

function parseYamlRecipe(content, filePath) {
  const parsed = parseYamlFrontmatter(content);
  if (!parsed) return null;

  const { frontmatter, body } = parsed;

  // Get folder name for category mapping
  const folder = path.basename(path.dirname(filePath));

  // Map category
  let categoryId = CATEGORY_MAP[folder];
  if (!categoryId) {
    categoryId = CATEGORY_MAP[frontmatter.category] || '6d1db21c-b896-40c1-b84c-74074bf632b9';
  }

  // Map author
  const authorName = frontmatter.author || '';
  const authorId = AUTHOR_MAP[authorName] || DEFAULT_AUTHOR_ID;

  // Parse ingredients
  const ingredients = [];
  if (frontmatter.ingredients && Array.isArray(frontmatter.ingredients)) {
    const items = [];
    for (let i = 0; i < frontmatter.ingredients.length; i++) {
      const ing = frontmatter.ingredients[i];
      if (typeof ing === 'object') {
        items.push({
          _key: `ing_${i}`,
          amount: String(ing.amount || ''),
          unit: ing.unit || '',
          ingredient: ing.ingredient || ''
        });
      }
    }
    if (items.length > 0) {
      ingredients.push({
        _key: 'main',
        groupName: 'Ingredients',
        items: items
      });
    }
  }

  // Parse instructions
  const instructions = [];
  if (frontmatter.instructions && Array.isArray(frontmatter.instructions)) {
    for (let i = 0; i < frontmatter.instructions.length; i++) {
      const step = frontmatter.instructions[i];
      if (typeof step === 'object' && step.instruction) {
        instructions.push({
          _key: `step_${i}`,
          step: i + 1,
          instruction: step.instruction
        });
      }
    }
  }

  // Parse nutrition
  let nutrition = null;
  if (frontmatter.nutrition && typeof frontmatter.nutrition === 'object') {
    nutrition = {
      calories: frontmatter.nutrition.calories || null,
      protein: frontmatter.nutrition.protein || null,
      carbs: frontmatter.nutrition.carbs || null,
      fat: frontmatter.nutrition.fat || null,
      fiber: frontmatter.nutrition.fiber || null
    };
  }

  return {
    title: frontmatter.title || '',
    slug: slugify(frontmatter.title),
    description: frontmatter.description || '',
    category_id: categoryId,
    subcategory: '',
    cuisine: frontmatter.cuisine || '',
    difficulty: frontmatter.difficulty || 'Medium',
    servings: frontmatter.servings || 4,
    prepTime: frontmatter.prepTime || frontmatter.prep_time || '',
    cookTime: frontmatter.cookTime || frontmatter.cook_time || '',
    totalTime: frontmatter.totalTime || frontmatter.total_time || '',
    restTime: frontmatter.restTime || '',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    author_id: authorId,
    dateCreated: frontmatter.dateCreated || frontmatter.date_created || '2024-01-01',
    rating: frontmatter.rating || 0,
    reviewCount: frontmatter.reviewCount || 0,
    ingredients: ingredients,
    instructions: instructions,
    nutrition: nutrition,
    notes: Array.isArray(frontmatter.notes) ? frontmatter.notes : [],
    variations: Array.isArray(frontmatter.variations) ? frontmatter.variations : [],
    storage: frontmatter.storage || '',
    isFamilyRecipe: folder === 'family',
    featured: false,
    source_folder: folder,
    body: body
  };
}

function parseSimpleRecipe(content, filePath) {
  const lines = content.split('\n');

  // Extract title
  let title = '';
  for (const line of lines) {
    const match = line.match(/^##\s*(?:Recipe\s*#?\d*:?\s*)?(.+)$/);
    if (match) {
      title = match[1].trim();
      break;
    }
  }

  if (!title) {
    // Use filename
    const filename = path.basename(filePath, '.md');
    title = filename.replace(/_/g, ' ').replace(/-/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // Extract ingredients section
  const ingredientsMatch = content.match(/(?:###?\s*Ingredients:?|Ingredients?:?|\*\*Ingredients:?\*\*)([\s\S]+?)(?:###?\s*Instructions:?|Instructions?:?|\*\*Instructions:?\*\*|$)/i);
  const ingredients = [];
  if (ingredientsMatch) {
    const ingItems = parseSimpleIngredients(ingredientsMatch[1]);
    if (ingItems.length > 0) {
      ingredients.push({
        _key: 'main',
        groupName: 'Ingredients',
        items: ingItems.map((ing, i) => ({
          _key: `ing_${i}`,
          amount: ing.amount,
          unit: ing.unit,
          ingredient: ing.ingredient
        }))
      });
    }
  }

  // Extract instructions section
  const instructionsMatch = content.match(/(?:###?\s*Instructions:?|Instructions?:?|\*\*Instructions:?\*\*)([\s\S]+?)(?:###?|Note:|Notes:|\*\*Note|\*\*Notes|$)/i);
  const instructions = [];
  if (instructionsMatch) {
    const instItems = parseSimpleInstructions(instructionsMatch[1]);
    instructions.push(...instItems.map((step, i) => ({
      _key: `step_${i}`,
      step: i + 1,
      instruction: step.instruction
    })));
  }

  // Extract notes
  const notesMatch = content.match(/(?:###?\s*Note[s]?:?|Note[s]?:?|\*\*Note[s]?:?\*\*)([\s\S]+)$/i);
  const notes = [];
  if (notesMatch) {
    const noteText = notesMatch[1].trim();
    if (noteText) {
      notes.push(noteText);
    }
  }

  // Determine category based on content
  const folder = path.basename(path.dirname(filePath));
  const titleLower = title.toLowerCase();
  let categoryId = '6d1db21c-b896-40c1-b84c-74074bf632b9';  // Default to Main Dishes

  // Dessert detection
  const dessertWords = ['pie', 'cake', 'cookie', 'muffin', 'scone', 'biscotti', 'fudge', 'candy', 'custard', 'cheesecake', 'tart', 'brownie', 'frosting'];
  const savoryBreadWords = ['corn bread', 'cornbread', 'french bread', 'hot bread', 'beef bread', 'sausage bread', 'loaf'];

  const isDessert = dessertWords.some(w => titleLower.includes(w)) &&
                    !savoryBreadWords.some(w => titleLower.includes(w));

  if (isDessert) {
    categoryId = '56230a66-83f0-4a25-9a50-8bfd17d08448';  // Desserts
  } else if (titleLower.includes('breakfast') || titleLower.includes('pancake') || titleLower.includes('waffle') || titleLower.includes('omelet') || titleLower.includes('morning')) {
    categoryId = '9d8f6746-12af-44be-8c44-c5db86d52a36';  // Breakfast
  } else if (titleLower.includes('dip') || titleLower.includes('appetizer') || titleLower.includes('snack') || titleLower.includes('nuts') || titleLower.includes('spread')) {
    categoryId = '09c60c2c-0641-4f53-b4ff-1395595cfdc3';  // Appetizers/Snacks
  }

  // Subcategory detection
  let subcategory = '';
  if (titleLower.includes('pie')) subcategory = 'Pies';
  else if (titleLower.includes('cake')) subcategory = 'Cakes';
  else if (titleLower.includes('cookie') || titleLower.includes('biscotti')) subcategory = 'Cookies';
  else if (titleLower.includes('muffin')) subcategory = 'Muffins';
  else if (titleLower.includes('scone')) subcategory = 'Scones';
  else if (titleLower.includes('bread') || titleLower.includes('biscuit')) subcategory = 'Breads & Biscuits';
  else if (titleLower.includes('casserole')) subcategory = 'Casseroles';
  else if (titleLower.includes('soup') || titleLower.includes('chowder')) subcategory = 'Soups';
  else if (titleLower.includes('salad')) subcategory = 'Salads';

  return {
    title: title,
    slug: slugify(title),
    description: `Family recipe for ${title}. A cherished recipe passed down through generations.`,
    category_id: categoryId,
    subcategory: subcategory,
    cuisine: 'American',
    difficulty: 'Medium',
    servings: 4,
    prepTime: '',
    cookTime: '',
    totalTime: '',
    tags: ['family-recipe'],
    author_id: DEFAULT_AUTHOR_ID,
    dateCreated: '2024-01-01',
    rating: 0,
    reviewCount: 0,
    ingredients: ingredients,
    instructions: instructions,
    nutrition: null,
    notes: notes,
    variations: [],
    storage: '',
    isFamilyRecipe: true,
    featured: false,
    source_folder: folder,
    body: content
  };
}

function parseRecipeFile(filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e.message);
    return null;
  }

  // Check if it has YAML frontmatter
  if (content.trim().startsWith('---')) {
    return parseYamlRecipe(content, filePath);
  } else {
    return parseSimpleRecipe(content, filePath);
  }
}

function findAllFiles(dir, pattern) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findAllFiles(fullPath, pattern));
    } else if (item.endsWith(pattern)) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  const basePath = 'knowledgebase/recipes';
  const allFiles = findAllFiles(basePath, '.md');

  console.log(`Found ${allFiles.length} recipe files`);

  // Parse all recipes
  const recipes = [];
  for (const filePath of allFiles) {
    const recipe = parseRecipeFile(filePath);
    if (recipe) {
      recipe.file_path = filePath;
      recipes.push(recipe);
    }
  }

  console.log(`Successfully parsed ${recipes.length} recipes`);

  // Group by category
  const byCategory = {};
  const bySubcategory = {};
  const byFolder = {};

  for (const r of recipes) {
    const folder = r.source_folder || 'unknown';
    byFolder[folder] = (byFolder[folder] || 0) + 1;

    const sub = r.subcategory || 'none';
    bySubcategory[sub] = (bySubcategory[sub] || 0) + 1;

    // Get category name from ID
    let catName = 'Unknown';
    if (r.category_id === '56230a66-83f0-4a25-9a50-8bfd17d08448') catName = 'Desserts';
    else if (r.category_id === '9d8f6746-12af-44be-8c44-c5db86d52a36') catName = 'Breakfast';
    else if (r.category_id === '09c60c2c-0641-4f53-b4ff-1395595cfdc3') catName = 'Appetizers';
    else if (r.category_id === '6d1db21c-b896-40c1-b84c-74074bf632b9') catName = 'Main Dishes';

    byCategory[catName] = (byCategory[catName] || 0) + 1;
  }

  console.log('\nBy Source Folder:');
  Object.entries(byFolder)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  console.log('\nBy Category:');
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  console.log('\nBy Subcategory:');
  Object.entries(bySubcategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));

  // Save to JSON
  const output = {
    recipes: recipes,
    stats: {
      total: recipes.length,
      by_folder: byFolder,
      by_category: byCategory,
      by_subcategory: bySubcategory
    }
  };

  const outputPath = 'parsed_recipes.json';
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nSaved to ${outputPath}`);

  // Show sample recipes
  console.log('\n=== Sample Recipes ===');
  for (let i = 0; i < Math.min(5, recipes.length); i++) {
    const r = recipes[i];
    console.log(`\n${i + 1}. ${r.title}`);
    console.log(`   Folder: ${r.source_folder}`);
    console.log(`   Slug: ${r.slug}`);
    console.log(`   Category: ${r.category_id}`);
    console.log(`   Subcategory: ${r.subcategory}`);
    console.log(`   Ingredients: ${r.ingredients.length} groups, ${r.ingredients[0]?.items?.length || 0} items`);
    console.log(`   Instructions: ${r.instructions.length} steps`);
    console.log(`   Is Family Recipe: ${r.isFamilyRecipe}`);
  }

  // Show some with issues
  const emptyIngredients = recipes.filter(r => r.ingredients.length === 0 || !r.ingredients[0]?.items?.length);
  if (emptyIngredients.length > 0) {
    console.log(`\n=== ${emptyIngredients.length} recipes with empty ingredients ===`);
    emptyIngredients.slice(0, 5).forEach(r => console.log(`  - ${r.title} (${r.file_path})`));
  }

  const emptyInstructions = recipes.filter(r => r.instructions.length === 0);
  if (emptyInstructions.length > 0) {
    console.log(`\n=== ${emptyInstructions.length} recipes with empty instructions ===`);
    emptyInstructions.slice(0, 5).forEach(r => console.log(`  - ${r.title} (${r.file_path})`));
  }
}

main();
