#!/usr/bin/env node
/**
 * Generate all remaining recipe images in batches
 * Usage: node generate-all-images.js
 */

const fs = require('fs');

// Load the list of recipes needing images
const recipes = JSON.parse(fs.readFileSync('recipes_for_images.json', 'utf-8'));

console.log(`Total recipes needing images: ${recipes.length}`);

// Create a shell script with all the curl commands
let script = '#!/bin/bash\n\n';
script += '# Generate all recipe images\n';
script += '# Requires SANITY_API_WRITE_TOKEN to be set\n\n';
script += 'PROJECT_ID="ynsg8i79"\n';
script += 'DATASET="production"\n';
script += 'API_VERSION="2024-01-01"\n\n';

function createPrompt(title) {
  const titleLower = title.toLowerCase();
  const baseStyle = "Professional food photography, appetizing presentation, bright natural lighting, shallow depth of field, rustic wooden or marble surface, styled with fresh ingredients, magazine-quality";

  if (titleLower.includes('pie')) return `Beautiful homemade ${title}, golden flaky crust, sliced showing filling, on white ceramic plate, vanilla ice cream, ${baseStyle}`;
  if (titleLower.includes('cake')) return `Elegant ${title}, perfectly frosted layers, sliced showing moist crumb, on cake stand, ${baseStyle}`;
  if (titleLower.includes('cookie')) return `Freshly baked ${title}, golden edges, stacked on wire rack, chocolate melting, ${baseStyle}`;
  if (titleLower.includes('soup')) return `Hearty ${title} in ceramic bowl, steam rising, crusty bread, fresh herbs, ${baseStyle}`;
  if (titleLower.includes('casserole')) return `Homemade ${title} in white baking dish, golden cheesy top, bubbling hot, ${baseStyle}`;
  if (titleLower.includes('bread') || titleLower.includes('biscuit')) return `Freshly baked ${title}, golden brown crust, butter melting, steam rising, ${baseStyle}`;
  if (titleLower.includes('salad')) return `Fresh ${title}, vibrant colorful ingredients, crisp vegetables, elegant plating, ${baseStyle}`;
  if (titleLower.includes('pancake') || titleLower.includes('breakfast')) return `Delicious ${title}, golden and fluffy, butter and syrup, fresh berries, ${baseStyle}`;
  if (titleLower.includes('chicken')) return `Perfectly cooked ${title}, golden brown, juicy meat, herbs, ${baseStyle}`;
  if (titleLower.includes('fish') || titleLower.includes('salmon') || titleLower.includes('catfish')) return `Beautifully prepared ${title}, flaky fillet, lemon wedges, fresh herbs, ${baseStyle}`;
  return `Delicious homemade ${title}, perfectly prepared, appetizing presentation, ${baseStyle}`;
}

for (let i = 0; i < recipes.length; i++) {
  const recipe = recipes[i];
  const prompt = createPrompt(recipe.title);

  script += `echo "[${i + 1}/${recipes.length}] Generating image for ${recipe.title}..."\n`;
  script += `curl -s -X POST \\\n`;
  script += `  "https://ynsg8i79.api.sanity.io/v2024-01-01/assets/images/production" \\\n`;
  script += `  -H "Authorization: Bearer $SANITY_API_WRITE_TOKEN" \\\n`;
  script += `  -H "Content-Type: application/json" \\\n`;
  script += `  -d '{"prompt": "${prompt.replace(/'/g, "'\\''")}"}' > /dev/null\n`;
  script += `sleep 2\n\n`;
}

script += 'echo "All images generated!"\n';

fs.writeFileSync('generate_all_images.sh', script);
console.log('Created generate_all_images.sh');

// Also create a simpler list for Sanity Studio use
let list = 'RECIPES NEEDING IMAGES - Copy these prompts into Sanity Studio:\n\n';
for (let i = 0; i < recipes.length; i++) {
  const r = recipes[i];
  list += `${i + 1}. ${r.title}\n`;
  list += `   Doc ID: ${r.id}\n`;
  list += `   Prompt: ${createPrompt(r.title)}\n\n`;
}
fs.writeFileSync('RECIPES_NEEDING_IMAGES.txt', list);
console.log('Created RECIPES_NEEDING_IMAGES.txt');

console.log('\nOptions to generate images:');
console.log('1. Use Sanity Studio: Open each recipe and use the prompts in RECIPES_NEEDING_IMAGES.txt');
console.log('2. Run the script: bash generate_all_images.sh (with SANITY_API_WRITE_TOKEN set)');
console.log('\nNote: Image generation takes 10-30 seconds per image and happens asynchronously.');
