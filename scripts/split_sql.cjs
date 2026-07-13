const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'store-assets', 'dev_lessons_rows_4.sql');
const outputDir = path.join(__dirname, '..', 'store-assets');

console.log('Reading input SQL...');
const content = fs.readFileSync(inputPath, 'utf8');

// The SQL starts with: INSERT INTO "public"."dev_lessons" (...) VALUES\n
const valuesIndex = content.indexOf('VALUES');
if (valuesIndex === -1) {
  console.error('Could not find VALUES clause');
  process.exit(1);
}

const header = content.substring(0, valuesIndex + 6) + '\n';
let body = content.substring(valuesIndex + 6).trim();

// Remove trailing semicolon if exists
if (body.endsWith(';')) {
  body = body.slice(0, -1);
}

// Split by tuples. Tuples are separated by "),\n(" or similar.
// Since a tuple looks like ('...', ..., '...'), we can split by "),\n("
// But to be safer, let's use a regex or split by "),\n('" because the ID starts with '
const tuples = body.split(/,\r?\n\('/);

// Re-add the leading "('" that got removed during split for index > 0
for (let i = 1; i < tuples.length; i++) {
  tuples[i] = "('" + tuples[i];
}

console.log(`Parsed ${tuples.length} tuples.`);

const partsCount = 6;
const tuplesPerPart = Math.ceil(tuples.length / partsCount);

for (let p = 0; p < partsCount; p++) {
  const start = p * tuplesPerPart;
  const end = Math.min((p + 1) * tuplesPerPart, tuples.length);
  const partTuples = tuples.slice(start, end);
  
  if (partTuples.length === 0) continue;
  
  // Join the tuples with comma and newline, and end with semicolon
  const partBody = partTuples.join(',\n') + ';';
  const partSql = header + partBody;
  
  const outputPath = path.join(outputDir, `dev_lessons_rows_4_part${p + 1}.sql`);
  fs.writeFileSync(outputPath, partSql, 'utf8');
  console.log(`Saved part ${p + 1} to ${outputPath} (${partTuples.length} tuples)`);
}

console.log('All parts split successfully!');
