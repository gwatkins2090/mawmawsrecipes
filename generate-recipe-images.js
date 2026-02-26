#!/usr/bin/env node
/**
 * Generate AI images for all recipes
 * Run with: node generate-recipe-images.js
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

// Load recipe list
const recipes = JSON.parse(fs.readFileSync('recipes_for_images.json', 'utf-8'));

console.log(`Found ${recipes.length} recipes that need images`);

// Function to create image generation prompt based on recipe title
function createPrompt(title) {
  const baseStyle = "Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality food photography";

  // Customize based on recipe type
  const titleLower = title.toLowerCase();

  if (titleLower.includes('pie')) {
    return `Beautiful homemade ${title}, golden flaky crust, sliced showing filling, on a white ceramic pie plate, a la mode with vanilla ice cream melting, warm comforting presentation, ${baseStyle}`;
  }
  if (titleLower.includes('cake')) {
    return `Elegant ${title}, perfectly frosted layers, sliced showing moist crumb, on a cake stand, decorative piping, celebration presentation, ${baseStyle}`;
  }
  if (titleLower.includes('cookie')) {
    return `Freshly baked ${title}, golden edges, stacked on a wire rack, chocolate melting, warm cozy kitchen setting, ${baseStyle}`;
  }
  if (titleLower.includes('soup')) {
    return `Hearty ${title} in a ceramic bowl, steam rising, crusty bread on the side, fresh herbs garnish, comfort food presentation, ${baseStyle}`;
  }
  if (titleLower.includes('casserole')) {
    return `Homemade ${title} in a white baking dish, golden cheesy top, bubbling hot, fresh from the oven, family dinner presentation, ${baseStyle}`;
  }
  if (titleLower.includes('bread') || titleLower.includes('biscuit')) {
    return `Freshly baked ${title}, golden brown crust, butter melting on top, steam rising, warm homemade appeal, ${baseStyle}`;
  }
  if (titleLower.includes('salad')) {
    return `Fresh ${title}, vibrant colorful ingredients, crisp vegetables, elegant plating, healthy appetizing presentation, ${baseStyle}`;
  }
  if (titleLower.includes('pancake') || titleLower.includes('breakfast')) {
    return `Delicious ${title}, golden and fluffy, butter and syrup, fresh berries, morning light, breakfast table setting, ${baseStyle}`;
  }
  if (titleLower.includes('chicken')) {
    return `Perfectly cooked ${title}, golden brown skin, juicy meat, herbs garnish, elegant dinner presentation, ${baseStyle}`;
  }
  if (titleLower.includes('fish') || titleLower.includes('salmon') || titleLower.includes('catfish')) {
    return `Beautifully prepared ${title}, flaky fish fillet, lemon wedges, fresh herbs, elegant seafood presentation, ${baseStyle}`;
  }

  // Default
  return `Delicious homemade ${title}, perfectly prepared, appetizing presentation, restaurant-quality plating, ${baseStyle}`;
}

// Print out curl commands or API calls to make
console.log('\n=== Image Generation Commands ===\n');
console.log('Run these commands to generate images for all recipes:');
console.log('(Note: Each image generation takes 10-30 seconds)\n');

// Group in batches of 5 for easier processing
const batchSize = 5;
const batches = [];
for (let i = 0; i < recipes.length; i += batchSize) {
  batches.push(recipes.slice(i, i + batchSize));
}

console.log(`Created ${batches.length} batches of ${batchSize}\n`);

// Save batch commands to file
let output = '# Recipe Image Generation Commands\n\n';
output += '# Run these in your terminal with SANITY_API_WRITE_TOKEN set\n\n';

for (let i = 0; i < batches.length; i++) {
  output += `\n## Batch ${i + 1}\n\n`;
  for (const recipe of batches[i]) {
    const prompt = createPrompt(recipe.title);
    output += `# ${recipe.title}\n`;
    output += `curl -X POST \\\n`;
    output += `  https://api.sanity.io/v${API_VERSION}/assets/images/${DATASET} \\\n`;
    output += `  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \\\n`;
    output += `  -H "Content-Type: application/json" \\\n`;
    output += `  -d '{"prompt": "${prompt.replace(/'/g, "\\'")}"}'\n\n`;
  }
}

fs.writeFileSync('generate_images_commands.sh', output);
console.log('Saved commands to generate_images_commands.sh');

// Also create a simple list for manual generation
let listOutput = 'Recipes needing images:\n\n';
for (let i = 0; i < recipes.length; i++) {
  const r = recipes[i];
  listOutput += `${i + 1}. ${r.title}\n`;
  listOutput += `   Prompt: ${createPrompt(r.title)}\n\n`;
}
fs.writeFileSync('recipes_image_prompts.txt', listOutput);
console.log('Saved prompts to recipes_image_prompts.txt');

// Summary
console.log('\n=== Summary ===');
console.log(`Total recipes: ${recipes.length}`);
console.log(`Batches: ${batches.length}`);
console.log('\nTo generate images:');
console.log('1. Use the Sanity Studio to generate images individually');
console.log('2. Or run the commands in generate_images_commands.sh');
console.log('3. Images will be generated asynchronously and attached to each recipe');
