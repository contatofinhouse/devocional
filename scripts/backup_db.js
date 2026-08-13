import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Carregar variáveis de ambiente do arquivo .env manualmente
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    throw new Error('Arquivo .env não encontrado no diretório raiz!');
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const config = {};
  
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    
    const index = trimmed.indexOf('=');
    if (index === -1) return;
    
    const key = trimmed.substring(0, index).trim();
    let val = trimmed.substring(index + 1).trim();
    
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
    
    config[key] = val;
  });
  
  return config;
}

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não estão definidas no .env!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TABLES = [
  'dev_profiles',
  'dev_progress',
  'dev_logs',
  'dev_lessons',
  'dev_questions',
  'dev_prayers'
];

async function exportTable(table) {
  console.log(`Exportando tabela: ${table}...`);
  // Fazer o download de todos os registros da tabela
  const { data, error } = await supabase
    .from(table)
    .select('*');
    
  if (error) {
    throw new Error(`Erro ao exportar ${table}: ${error.message}`);
  }
  
  return data || [];
}

async function runBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.resolve(__dirname, `../backups/backup_${timestamp}`);
  
  console.log('Iniciando backup do banco de dados...');
  
  // Garantir a existência do diretório de backups
  if (!fs.existsSync(path.resolve(__dirname, '../backups'))) {
    fs.mkdirSync(path.resolve(__dirname, '../backups'));
  }
  fs.mkdirSync(backupDir);
  
  for (const table of TABLES) {
    try {
      const data = await exportTable(table);
      const filePath = path.join(backupDir, `${table}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✓ Tabela ${table} exportada com sucesso (${data.length} registros).`);
    } catch (err) {
      console.error(`✗ Erro na tabela ${table}:`, err.message);
    }
  }
  
  console.log(`\n=========================================`);
  console.log(`Backup finalizado com sucesso!`);
  console.log(`Salvo em: ${backupDir}`);
  console.log(`=========================================`);
}

runBackup().catch((err) => {
  console.error('Erro geral durante o backup:', err);
  process.exit(1);
});
