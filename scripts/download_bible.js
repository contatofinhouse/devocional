import fs from 'fs';
import path from 'path';

const url = 'https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json';
const outputDir = 'C:\\Users\\rafae\\Documents\\FINHOUSE\\SITES\\devocional\\public\\bible';

async function download() {
  console.log("Fetching Bible JSON from:", url);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch Bible: ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Bible downloaded successfully. Total books:", data.length);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Let's print the first book metadata
    console.log("First book:", data[0].name, "with abbreviation:", data[0].abbrev);
    
    // We will split the Bible into one JSON file per book, lowercase name (e.g., 'genesis.json', 'lucas.json')
    // This is great because we can load them on demand.
    for (const book of data) {
      // Normalize name for the filename (lowercase, no accents)
      const filename = book.name.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "_") + ".json";
      
      const filePath = path.join(outputDir, filename);
      fs.writeFileSync(filePath, JSON.stringify(book, null, 2), 'utf-8');
    }
    
    console.log("All books split and saved successfully in:", outputDir);
  } catch (e) {
    console.error("Error downloading/splitting Bible:", e.message);
  }
}

download();
