import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = path.join(__dirname, "../src/assets/artworks");
const outputDir = path.join(__dirname, "../public/artworks");
const watermarkPath = path.join(__dirname, "../src/assets/kunstmitt_watermark.svg");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach((file) => {
  const inputFile = path.join(inputDir, file);
  const baseName = path.parse(file).name;

  // Create 600px preview in webp format
  sharp(inputFile)
    .resize(600)
    .webp()
    .toFile(path.join(outputDir, `${baseName}-preview.webp`))
    .catch((err) => console.error("Error creating preview:", err));

  // Create 1600px watermarked version in webp format
  sharp(inputFile)
    .resize(1600)
    .composite([
      {
        input: watermarkPath,
        tile: true,
        gravity: "center",
        blend: "overlay",
      },
    ])
    .webp()
    .toFile(path.join(outputDir, `${baseName}-watermarked.webp`))
    .catch((err) => console.error("Error creating watermarked image:", err));
});