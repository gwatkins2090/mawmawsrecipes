const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'ynsg8i79';
const DATASET = 'production';
const API_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!API_TOKEN) {
  console.error('Error: SANITY_API_WRITE_TOKEN environment variable is required');
  process.exit(1);
}

const imagePath = path.join('knowledgebase/assets', 'savorbg.png');
const imageBuffer = fs.readFileSync(imagePath);

console.log('Uploading image...');

// Use Sanity's assets upload endpoint
const https = require('https');

const options = {
  hostname: `${PROJECT_ID}.api.sanity.io`,
  port: 443,
  path: `/v2024-01-01/assets/images/${DATASET}`,
  method: 'POST',
  headers: {
    'Content-Type': 'image/png',
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Length': imageBuffer.length
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Response:', data);
    const response = JSON.parse(data);
    if (response.document) {
      console.log('Image uploaded successfully!');
      console.log('Asset ID:', response.document._id);
      console.log('URL:', response.document.url);
      // Save the asset reference
      fs.writeFileSync('bg-image-asset.json', JSON.stringify(response.document, null, 2));
    } else {
      console.error('Upload failed:', response);
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(imageBuffer);
req.end();
