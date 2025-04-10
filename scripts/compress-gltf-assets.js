import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import draco3d from 'draco3dgltf';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { draco, textureCompress } from '@gltf-transform/functions';


// __dirname replacement for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../assets-raw');
const outputDir = path.join(__dirname, '../src/assets/3d');

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({
    'draco3d.decoder': await draco3d.createDecoderModule(),
    'draco3d.encoder': await draco3d.createEncoderModule(),
  });

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.glb', '.gltf'].includes(ext)) continue;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  try {
    const doc = await io.read(inputPath);

    await doc.transform(
      draco(),
      textureCompress({ format: 'webp' })
    );

    await io.write(outputPath, doc);

    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const reduction = originalSize > 0
      ? (((originalSize - newSize) / originalSize) * 100).toFixed(2)
      : '0.00';
    console.log(`✅ ${file} ${(newSize / 1024).toFixed(1)} KB (${reduction}% reduction from original: ${(originalSize / 1024).toFixed(1)} KB)`);
  } catch (e) {
    console.error(`❌ Failed to compress ${file}:`, e.message);
  }
}
