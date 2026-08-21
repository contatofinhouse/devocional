const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('public/images/bible_kids');
const brainDir = path.resolve('C:/Users/rafae/.gemini/antigravity-ide/brain/e6507c33-b1e5-4432-a3aa-c9025cafc6fb');

if (!fs.existsSync(brainDir)) {
  fs.mkdirSync(brainDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.png')) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(brainDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to ${destPath}`);
  }
}
console.log('All files copied successfully.');
