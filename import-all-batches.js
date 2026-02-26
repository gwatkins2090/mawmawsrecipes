/**
 * Import all recipe batches to Sanity
 */

const fs = require('fs');
const path = require('path');

// Find all batch files
const batchFiles = fs.readdirSync('.')
  .filter(f => f.match(/^sanity_batch_\d+\.json$/))
  .sort();

console.log(`Found ${batchFiles.length} batch files`);

// Process each batch
const results = [];

for (const batchFile of batchFiles) {
  console.log(`\nProcessing ${batchFile}...`);

  const docs = JSON.parse(fs.readFileSync(batchFile, 'utf-8'));
  console.log(`  Contains ${docs.length} documents`);

  // Save summary
  results.push({
    file: batchFile,
    count: docs.length,
    recipes: docs.map(d => ({ id: d._id, title: d.title }))
  });
}

// Save import summary
fs.writeFileSync('import_summary.json', JSON.stringify(results, null, 2));
console.log('\nSaved import summary to import_summary.json');

// Print stats
const totalRecipes = results.reduce((sum, r) => sum + r.count, 0);
console.log(`\nTotal recipes to import: ${totalRecipes}`);
console.log('\nBatch breakdown:');
results.forEach(r => console.log(`  ${r.file}: ${r.count} recipes`));
