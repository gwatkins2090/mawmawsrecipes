/**
 * Import all recipe batches to Sanity using direct API
 */

const fs = require('fs');

// Configuration
const PROJECT_ID = 'ynsg8i79';
const DATASET = 'production';
const API_VERSION = '2024-01-01';
const API_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!API_TOKEN) {
  console.error('Error: SANITY_API_WRITE_TOKEN environment variable is required');
  console.error('Please set it with: export SANITY_API_WRITE_TOKEN=your_token');
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

async function importBatch(batchFile) {
  console.log(`\nImporting ${batchFile}...`);

  const docs = JSON.parse(fs.readFileSync(batchFile, 'utf-8'));
  console.log(`  Contains ${docs.length} documents`);

  // Create mutations
  const mutations = docs.map(doc => ({
    createOrReplace: doc
  }));

  try {
    const result = await sanityRequest(mutations);
    console.log(`  ✓ Success: ${result.results?.length || 0} documents imported`);
    return { success: true, count: result.results?.length || 0 };
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  // Find all batch files
  const batchFiles = fs.readdirSync('.')
    .filter(f => f.match(/^sanity_batch_\d+\.json$/))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  console.log(`Found ${batchFiles.length} batch files to import`);
  console.log('Starting import...\n');

  const results = {
    successful: [],
    failed: []
  };

  // Skip batch_1 since it was already imported
  const batchesToImport = batchFiles.filter(f => f !== 'sanity_batch_1.json');

  for (let i = 0; i < batchesToImport.length; i++) {
    const batchFile = batchesToImport[i];
    console.log(`\n[${i + 1}/${batchesToImport.length}] Processing ${batchFile}...`);

    // Add delay between batches
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const result = await importBatch(batchFile);

    if (result.success) {
      results.successful.push(batchFile);
    } else {
      results.failed.push({ file: batchFile, error: result.error });
    }
  }

  // Print summary
  console.log('\n\n=== IMPORT SUMMARY ===');
  console.log(`Total batches: ${batchesToImport.length}`);
  console.log(`Successful: ${results.successful.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed batches:');
    results.failed.forEach(f => console.log(`  - ${f.file}: ${f.error}`));
  }

  // Save results
  fs.writeFileSync('import_final_results.json', JSON.stringify(results, null, 2));
  console.log('\nResults saved to import_final_results.json');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
