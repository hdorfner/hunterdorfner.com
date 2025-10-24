const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const base64Path = path.join(projectRoot, 'social-preview.base64');
const distDir = path.join(projectRoot, 'dist');
const outputPath = path.join(distDir, 'social-preview.png');

function ensureFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing base64 source at ${filePath}.`);
  }
}

function readBase64(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return raw.replace(/\s+/g, '');
}

function writePreview(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
}

try {
  ensureFileExists(base64Path);
  const encoded = readBase64(base64Path);
  writePreview(outputPath, encoded);
  console.log(`Generated social preview image at ${outputPath}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
