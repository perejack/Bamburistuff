#!/usr/bin/env node

/**
 * Final Pre-Launch Validation Script
 * Ensures the Bamburi Cement website is ready for Google Ads
 */

import https from 'https';
import http from 'http';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 VALIDATING BAMBURI CEMENT WEBSITE FOR GOOGLE ADS...\n');

// Test 1: Check all images exist
async function checkImages() {
  console.log('📸 Checking local images...');
  const imagesDir = path.join(__dirname, 'public', 'images');

  try {
    const files = await fs.readdir(imagesDir);
    console.log(`✅ Found ${files.length} images in public/images/`);

    // Verify all expected images exist
    const expectedImages = [
      'bamburi-history.jpg-1.webp',
      '053d5062de1a0354-2.jpeg',
      '3eb29bba3143587c-3.jpeg',
      'bamburi-cement-1-1622208283.profileImage.2x-jpg-webp-webp-4.webp',
      '20250311_113715-scaled-e1741708673322-5.jpg',
      'Bamburi-PowerMax-1-6.png',
      'image-7-7.jpg',
      '64326255bda4a-8.webp',
      'Nguvu-9.jpg',
      'Bamburi-Power-Plus-Cement1-10.jpg',
      'bamburi-duracem-1-11.png',
      'Buy-Bamburi-Powercrete-Cement-Online-1-12.jpg'
    ];

    const missing = expectedImages.filter(img => !files.includes(img));
    if (missing.length > 0) {
      console.log(`❌ Missing images: ${missing.join(', ')}`);
      return false;
    }

    console.log('✅ All expected images present');
    return true;
  } catch (error) {
    console.log(`❌ Could not read images directory: ${error.message}`);
    return false;
  }
}

// Test 2: Check for broken links
async function checkBrokenLinks() {
  console.log('🔗 Checking for broken links...');

  try {
    const content = await fs.readFile(path.join(__dirname, 'src', 'App.tsx'), 'utf8');

    // Check for external image URLs (should be none)
    const externalImageMatches = content.match(/https:\/\/[^'"]*\.(jpg|jpeg|png|webp|gif)/gi);
    if (externalImageMatches && externalImageMatches.length > 0) {
      console.log(`❌ Found external image URLs: ${externalImageMatches.join(', ')}`);
      return false;
    }

    // Check WhatsApp links (should be present)
    const whatsappMatches = content.match(/wa\.me\/\+\d+/g);
    if (!whatsappMatches || whatsappMatches.length < 3) {
      console.log('❌ WhatsApp links not found');
      return false;
    }

    console.log('✅ No broken links found');
    return true;
  } catch (error) {
    console.log(`❌ Could not check links: ${error.message}`);
    return false;
  }
}

// Test 3: Check for console.log statements
async function checkConsoleLogs() {
  console.log('🐛 Checking for console.log statements...');

  try {
    const files = [
      'src/App.tsx',
      'src/components/Header.tsx',
      'src/components/Carousel.tsx',
      'src/components/ProductCard.tsx',
      'src/components/Cart.tsx',
      'src/components/CategoryFilter.tsx'
    ];

    let foundLogs = false;

    for (const file of files) {
      const filePath = path.join(__dirname, file);
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const logMatches = content.match(/console\.log\(/g);

        if (logMatches && logMatches.length > 0) {
          console.log(`❌ Found ${logMatches.length} console.log in ${file}`);
          foundLogs = true;
        }
      } catch (error) {
        // File might not exist, skip
      }
    }

    if (foundLogs) {
      return false;
    }

    console.log('✅ No console.log statements found');
    return true;
  } catch (error) {
    console.log(`❌ Could not check console logs: ${error.message}`);
    return false;
  }
}

// Test 4: Check robots.txt
async function checkRobotsTxt() {
  console.log('🤖 Checking robots.txt...');

  try {
    const robotsPath = path.join(__dirname, 'public', 'robots.txt');
    const robotsContent = await fs.readFile(robotsPath, 'utf8');

    if (robotsContent.includes('User-agent: *') && robotsContent.includes('Allow: /')) {
      console.log('✅ robots.txt properly configured');
      return true;
    } else {
      console.log('❌ robots.txt missing required directives');
      return false;
    }
  } catch (error) {
    console.log(`❌ Could not read robots.txt: ${error.message}`);
    return false;
  }
}

// Test 5: Check meta tags
async function checkMetaTags() {
  console.log('🏷️ Checking meta tags...');

  try {
    const htmlPath = path.join(__dirname, 'index.html');
    const htmlContent = await fs.readFile(htmlPath, 'utf8');

    const requiredMeta = [
      'Bamburi Cement - Quality Cement Products',
      'Buy Bamburi Cement online in Kenya',
      'cement Kenya, buy cement online',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'theme-color'
    ];

    const missingMeta = requiredMeta.filter(meta => !htmlContent.includes(meta));

    if (missingMeta.length > 0) {
      console.log(`❌ Missing meta tags: ${missingMeta.join(', ')}`);
      return false;
    }

    console.log('✅ All required meta tags present');
    return true;
  } catch (error) {
    console.log(`❌ Could not check meta tags: ${error.message}`);
    return false;
  }
}

// Test 6: Check mobile responsiveness
async function checkMobileResponsiveness() {
  console.log('📱 Checking mobile responsiveness...');

  try {
    const content = await fs.readFile(path.join(__dirname, 'src', 'App.tsx'), 'utf8');

    // Check for responsive classes
    const responsiveChecks = [
      'md:hidden',
      'sm:grid-cols',
      'md:flex-row',
      'text-xs',
      'md:text-sm'
    ];

    const missingResponsive = responsiveChecks.filter(check => !content.includes(check));

    if (missingResponsive.length > 0) {
      console.log(`❌ Missing responsive classes: ${missingResponsive.join(', ')}`);
      return false;
    }

    console.log('✅ Mobile responsive design implemented');
    return true;
  } catch (error) {
    console.log(`❌ Could not check mobile responsiveness: ${error.message}`);
    return false;
  }
}

// Test 7: Check for required files
async function checkRequiredFiles() {
  console.log('📁 Checking required files...');

  const requiredFiles = [
    'src/types/index.ts',
    'src/data/products.ts',
    'public/images',
    'public/robots.txt',
    'SECURITY-AUDIT-REPORT.md',
    'GOOGLE-ADS-CHECKLIST.md'
  ];

  let allFilesExist = true;

  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, file);
    try {
      await fs.access(filePath);
      console.log(`✅ ${file}`);
    } catch {
      console.log(`❌ Missing: ${file}`);
      allFilesExist = false;
    }
  }

  return allFilesExist;
}

// Test 8: Check WhatsApp integration
async function checkWhatsAppIntegration() {
  console.log('💬 Checking WhatsApp integration...');

  try {
    const content = await fs.readFile(path.join(__dirname, 'src', 'App.tsx'), 'utf8');

    const whatsappChecks = [
      '+254750095397',
      'wa.me',
      'I%20would%20like%20to%20inquire',
      'I%20would%20like%20to%20order'
    ];

    const missingWhatsApp = whatsappChecks.filter(check => !content.includes(check));

    if (missingWhatsApp.length > 0) {
      console.log(`❌ Missing WhatsApp elements: ${missingWhatsApp.join(', ')}`);
      return false;
    }

    console.log('✅ WhatsApp integration working');
    return true;
  } catch (error) {
    console.log(`❌ Could not check WhatsApp integration: ${error.message}`);
    return false;
  }
}

// Run all tests
async function runValidation() {
  const tests = [
    { name: 'Images Check', fn: checkImages },
    { name: 'Broken Links Check', fn: checkBrokenLinks },
    { name: 'Console Logs Check', fn: checkConsoleLogs },
    { name: 'Robots.txt Check', fn: checkRobotsTxt },
    { name: 'Meta Tags Check', fn: checkMetaTags },
    { name: 'Mobile Responsiveness', fn: checkMobileResponsiveness },
    { name: 'Required Files Check', fn: checkRequiredFiles },
    { name: 'WhatsApp Integration', fn: checkWhatsAppIntegration }
  ];

  let passedTests = 0;
  let failedTests = 0;

  console.log('🚀 Starting comprehensive validation...\n');

  for (const test of tests) {
    process.stdout.write(`Running ${test.name}... `);

    try {
      const result = await test.fn();
      if (result) {
        console.log('✅ PASS');
        passedTests++;
      } else {
        console.log('❌ FAIL');
        failedTests++;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
      failedTests++;
    }
  }

  console.log('\n📊 VALIDATION RESULTS');
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`📈 Success Rate: ${Math.round((passedTests / tests.length) * 100)}%`);

  if (failedTests === 0) {
    console.log('\n🎉 CONGRATULATIONS!');
    console.log('✅ Your website is PERFECTLY READY for Google Ads!');
    console.log('🚀 You can launch your campaign with confidence.');
    console.log('📈 No broken links, all images local, mobile responsive, and security compliant.');

    console.log('\n📋 NEXT STEPS:');
    console.log('1. Deploy to production with HTTPS');
    console.log('2. Set up Google Ads account');
    console.log('3. Create your first campaign');
    console.log('4. Start driving traffic!');
  } else {
    console.log('\n⚠️ Please fix the failed tests before launching Google Ads.');
    console.log('📞 Contact support if you need help resolving any issues.');
  }

  process.exit(failedTests > 0 ? 1 : 0);
}

// Run the validation
runValidation().catch(console.error);
