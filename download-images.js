import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create public/images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Extract all image URLs from the project
const imageUrls = [
  // Carousel images
  'https://kenyanwallstreet.com/wp-content/uploads/2024/08/bamburi-history.jpg.webp',
  'https://cdn.tuko.co.ke/images/1120/053d5062de1a0354.jpeg?v=1',
  'https://cdn.tuko.co.ke/images/1120/3eb29bba3143587c.jpeg?v=1',
  'https://www.africaoutlookmag.com/media/2022/11/bamburi-cement-1-1622208283.profileImage.2x-jpg-webp-webp.webp',
  'https://barakafm.co.ke/wp-content/uploads/2025/03/20250311_113715-scaled-e1741708673322.jpg',
  
  // Product images
  'https://i0.wp.com/www.kenyaconstructionworks.co.ke/wp-content/uploads/2023/10/Bamburi-PowerMax-1.png?resize=314%2C445&ssl=1',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0imhj4w_q4IMd4bxvGFxjZM9cJqrZhIMp9Q&s',
  'https://zandaux.com/image/images/64326255bda4a.webp?p=large',
  'https://www.ebuild.ke/wp-content/uploads/2023/07/Nguvu.jpg',
  'https://www.kenyaconstructionworks.co.ke/wp-content/uploads/2019/01/Bamburi-Power-Plus-Cement1.jpg',
  'https://www.kenyaconstructionworks.co.ke/wp-content/uploads/2023/10/bamburi-duracem-1.png',
  'https://bamburigroup.com/wp-content/uploads/2025/04/Buy-Bamburi-Powercrete-Cement-Online-1.jpg'
];

// Function to download a single image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const filepath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);
    
    console.log(`Downloading: ${url}`);
    
    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        return downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve(filepath);
      });
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

// Generate filename from URL
function getFilenameFromUrl(url, index) {
  const urlObj = new URL(url);
  let filename = path.basename(urlObj.pathname);
  
  // Remove query parameters from filename
  filename = filename.split('?')[0];
  
  // If filename is empty or generic, create a better name
  if (!filename || filename === '' || filename === 'images') {
    const ext = '.jpg';
    filename = `image-${index}${ext}`;
  }
  
  // Ensure unique filenames
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  filename = `${base}-${index}${ext}`;
  
  return filename;
}

// Download all images
async function downloadAllImages() {
  console.log('Starting image download...\n');
  
  const results = [];
  
  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const filename = getFilenameFromUrl(url, i + 1);
    
    try {
      const filepath = await downloadImage(url, filename);
      results.push({
        url,
        filename,
        filepath,
        success: true
      });
    } catch (error) {
      console.error(`✗ Failed to download ${url}:`, error.message);
      results.push({
        url,
        filename,
        success: false,
        error: error.message
      });
    }
  }
  
  // Generate mapping file
  const mappingFile = path.join(__dirname, 'image-mapping.json');
  fs.writeFileSync(mappingFile, JSON.stringify(results, null, 2));
  
  console.log('\n=== Download Summary ===');
  console.log(`Total images: ${imageUrls.length}`);
  console.log(`Successfully downloaded: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);
  console.log(`\nImages saved to: ${imagesDir}`);
  console.log(`Mapping saved to: ${mappingFile}`);
}

// Run the download
downloadAllImages().catch(console.error);
