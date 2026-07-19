const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const gradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');

function bumpVersion() {
  console.log('Reading build.gradle...');
  let content = fs.readFileSync(gradlePath, 'utf8');

  // Regex to match versionCode and versionName
  const versionCodeRegex = /(versionCode\s+)(\d+)/;
  const versionNameRegex = /(versionName\s+")([^"]+)(")/;

  const versionCodeMatch = content.match(versionCodeRegex);
  const versionNameMatch = content.match(versionNameRegex);

  if (!versionCodeMatch || !versionNameMatch) {
    throw new Error('Could not find versionCode or versionName in build.gradle');
  }

  const currentCode = parseInt(versionCodeMatch[2], 10);
  const currentName = versionNameMatch[2];

  const nextCode = currentCode + 1;
  
  // Increment patch version (e.g. 1.0.9 -> 1.0.10)
  const nameParts = currentName.split('.');
  if (nameParts.length >= 3) {
    nameParts[2] = parseInt(nameParts[2], 10) + 1;
  } else {
    nameParts.push('1');
  }
  const nextName = nameParts.join('.');

  console.log(`Bumping version from Code ${currentCode} (${currentName}) to Code ${nextCode} (${nextName})...`);

  content = content.replace(versionCodeRegex, `$1${nextCode}`);
  content = content.replace(versionNameRegex, `$1${nextName}$3`);

  fs.writeFileSync(gradlePath, content, 'utf8');
  console.log('build.gradle updated successfully!');
  return { nextCode, nextName };
}

try {
  const { nextCode, nextName } = bumpVersion();

  console.log('Running npm run build...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Running npx cap sync...');
  execSync('npx cap sync', { stdio: 'inherit' });

  console.log('Building Android AAB bundle...');
  execSync('gradlew bundleRelease -x lintVitalRelease -x lintVitalAnalyzeRelease', {
    cwd: path.join(__dirname, '..', 'android'),
    stdio: 'inherit'
  });

  console.log('\n==================================================');
  console.log('BUILD SUCCESSFUL!');
  console.log(`Version Name: ${nextName}`);
  console.log(`Version Code: ${nextCode}`);
  console.log(`AAB path: android/app/build/outputs/bundle/release/app-release.aab`);
  console.log('==================================================\n');

} catch (error) {
  console.error('Error during build process:', error);
  process.exit(1);
}
