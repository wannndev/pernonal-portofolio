const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildFavicons() {
  console.log('Generating WannDev favicons from logo-white.png...');
  
  const size = 512;
  const cornerRadius = 112; // sleek rounded squircle
  const svgBg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#09090b"/>
    </svg>`
  );

  // Fit white logo comfortably in center of badge
  const whiteLogo = await sharp(path.join(__dirname, '../public/images/logo-white.png'))
    .resize(320, 320, { fit: 'inside' })
    .toBuffer();

  const badge512 = await sharp(svgBg)
    .composite([{ input: whiteLogo, gravity: 'center' }])
    .png()
    .toBuffer();

  // Create different sizes
  const sizes = [
    { name: 'apple-touch-icon.png', size: 180, dest: 'public/favicon/apple-touch-icon.png' },
    { name: 'android-chrome-192x192.png', size: 192, dest: 'public/favicon/android-chrome-192x192.png' },
    { name: 'android-chrome-512x512.png', size: 512, dest: 'public/favicon/android-chrome-512x512.png' },
    { name: 'favicon-32x32.png', size: 32, dest: 'public/favicon/favicon-32x32.png' },
    { name: 'favicon-16x16.png', size: 16, dest: 'public/favicon/favicon-16x16.png' },
    { name: 'src-app-icon.png', size: 192, dest: 'src/app/icon.png' },
    { name: 'public-icon.png', size: 192, dest: 'public/icon.png' },
  ];

  for (const item of sizes) {
    const destPath = path.join(__dirname, '..', item.dest);
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    await sharp(badge512)
      .resize(item.size, item.size)
      .png()
      .toFile(destPath);
    console.log(`Saved ${item.dest} (${item.size}x${item.size})`);
  }

  // Create proper multi-size ICO file containing 16x16, 32x32, 48x48
  const png16 = await sharp(badge512).resize(16, 16).png().toBuffer();
  const png32 = await sharp(badge512).resize(32, 32).png().toBuffer();
  const png48 = await sharp(badge512).resize(48, 48).png().toBuffer();

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '../public/favicon/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoBuffer);
  console.log('Saved proper ICO files to public/favicon.ico, public/favicon/favicon.ico, src/app/favicon.ico');
}

/**
 * Creates a valid multi-image ICO file from PNG buffers
 */
function createIco(images) {
  const count = images.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type (1 = ICO)
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  const imageBuffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Image data size
    entry.writeUInt32LE(offset, 12); // Offset to image data

    entries.push(entry);
    imageBuffers.push(img.buffer);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...imageBuffers]);
}

buildFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
