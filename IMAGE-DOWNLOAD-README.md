# Image Download and Local Storage Scripts

This folder contains scripts to download all external images used in the website and convert them to local references.

## Files Created

1. **download-images.js** - Downloads all images from external URLs
2. **update-image-paths.js** - Updates source code to use local image paths
3. **IMAGE-DOWNLOAD-README.md** - This file

## Prerequisites

- Node.js installed on your system
- Internet connection to download images

## How to Use

### Step 1: Download All Images

Run the download script:

```bash
node download-images.js
```

This will:
- Create a `public/images` directory
- Download all images from external URLs
- Save them with unique filenames
- Generate an `image-mapping.json` file with the mapping

### Step 2: Update Source Code (Optional)

If you want to update your source code to use local images instead of external URLs:

```bash
node update-image-paths.js
```

This will:
- Read the `image-mapping.json` file
- Update all source files to reference local images
- Replace external URLs with `/images/filename.ext` paths

## What Gets Downloaded

### Carousel Images (5 images)
- Bamburi history image
- Modern manufacturing facility
- Nationwide impact
- Sustainable solutions
- Trusted partner

### Product Images (6 images)
- Bamburi Power Plus MPa
- Bamburi Tembo MPa
- Bamburi Fundi Masonry Cement
- MPa Bamburi Nguvu Cement
- MPa Bamburi Powermax Cement
- MPa Bamburi Duracem Cement
- MPa Bamburi Powercrete Cement

### About Section Image (1 image)
- Bamburi Cement Factory

## Output Structure

```
public/
  images/
    bamburi-history.jpg.webp-1.webp
    053d5062de1a0354.jpeg-2.jpeg
    3eb29bba3143587c.jpeg-3.jpeg
    ... (and more)
```

## Files Updated

The `update-image-paths.js` script updates these files:
- `src/components/Carousel.tsx`
- `src/data/products.ts`
- `src/App.tsx`

## Troubleshooting

### Download Fails
- Check your internet connection
- Some URLs might be blocked or unavailable
- Check the console for specific error messages

### Images Not Showing After Update
- Make sure the `public/images` folder exists
- Verify the images were downloaded successfully
- Check that your development server is serving the public folder
- Clear browser cache

## Deployment

When deploying your site:
1. Make sure to include the `public/images` folder
2. Ensure your build process copies the images to the output directory
3. Verify image paths are correct in production

## Reverting Changes

If you want to revert to external URLs:
- Use git to restore the original files: `git checkout src/`
- Or manually replace the local paths back to the original URLs

## Notes

- Downloaded images are stored with index numbers to ensure uniqueness
- The `image-mapping.json` file contains the complete mapping for reference
- Images maintain their original format (jpg, png, webp, etc.)
- Total download size is approximately 5-10 MB depending on image quality
