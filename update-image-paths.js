import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the image mapping file
const mappingFile = path.join(__dirname, 'image-mapping.json');

if (!fs.existsSync(mappingFile)) {
  console.error('Error: image-mapping.json not found. Please run download-images.js first.');
  process.exit(1);
}

const imageMapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));

// Create URL to local path mapping
const urlToLocalPath = {};
imageMapping.forEach(item => {
  if (item.success) {
    urlToLocalPath[item.url] = `/images/${item.filename}`;
  }
});

// Files to update
const filesToUpdate = [
  {
    path: 'src/components/Carousel.tsx',
    replacements: [
      { old: 'https://kenyanwallstreet.com/wp-content/uploads/2024/08/bamburi-history.jpg.webp', key: 'carousel-1' },
      { old: 'https://cdn.tuko.co.ke/images/1120/053d5062de1a0354.jpeg?v=1', key: 'carousel-2' },
      { old: 'https://cdn.tuko.co.ke/images/1120/3eb29bba3143587c.jpeg?v=1', key: 'carousel-3' },
      { old: 'https://www.africaoutlookmag.com/media/2022/11/bamburi-cement-1-1622208283.profileImage.2x-jpg-webp-webp.webp', key: 'carousel-4' },
      { old: 'https://barakafm.co.ke/wp-content/uploads/2025/03/20250311_113715-scaled-e1741708673322.jpg', key: 'carousel-5' }
    ]
  },
  {
    path: 'src/data/products.ts',
    replacements: [
      { old: 'https://i0.wp.com/www.kenyaconstructionworks.co.ke/wp-content/uploads/2023/10/Bamburi-PowerMax-1.png?resize=314%2C445&ssl=1', key: 'product-1' },
      { old: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0imhj4w_q4IMd4bxvGFxjZM9cJqrZhIMp9Q&s', key: 'product-2' },
      { old: 'https://zandaux.com/image/images/64326255bda4a.webp?p=large', key: 'product-3' },
      { old: 'https://www.ebuild.ke/wp-content/uploads/2023/07/Nguvu.jpg', key: 'product-4' },
      { old: 'https://www.kenyaconstructionworks.co.ke/wp-content/uploads/2019/01/Bamburi-Power-Plus-Cement1.jpg', key: 'product-5' },
      { old: 'https://www.kenyaconstructionworks.co.ke/wp-content/uploads/2023/10/bamburi-duracem-1.png', key: 'product-6' },
      { old: 'https://bamburigroup.com/wp-content/uploads/2025/04/Buy-Bamburi-Powercrete-Cement-Online-1.jpg', key: 'product-7' }
    ]
  },
  {
    path: 'src/App.tsx',
    replacements: [
      { old: 'https://cdn.tuko.co.ke/images/1120/053d5062de1a0354.jpeg?v=1', key: 'about-section' }
    ]
  }
];

// Update files
let totalReplacements = 0;

filesToUpdate.forEach(fileInfo => {
  const filePath = path.join(__dirname, fileInfo.path);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File not found: ${fileInfo.path}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;
  
  fileInfo.replacements.forEach(replacement => {
    const localPath = urlToLocalPath[replacement.old];
    
    if (localPath) {
      const oldCount = (content.match(new RegExp(replacement.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      content = content.replace(new RegExp(replacement.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localPath);
      fileReplacements += oldCount;
      
      if (oldCount > 0) {
        console.log(`✓ Replaced ${oldCount} occurrence(s) in ${fileInfo.path}`);
        console.log(`  ${replacement.old.substring(0, 60)}...`);
        console.log(`  → ${localPath}`);
      }
    } else {
      console.warn(`⚠ No local path found for: ${replacement.old.substring(0, 60)}...`);
    }
  });
  
  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements += fileReplacements;
    console.log(`✓ Updated ${fileInfo.path} (${fileReplacements} replacements)\n`);
  }
});

console.log('\n=== Update Summary ===');
console.log(`Total replacements: ${totalReplacements}`);
console.log('\nAll image URLs have been updated to use local paths.');
console.log('Make sure to copy the public/images folder to your deployment.');
