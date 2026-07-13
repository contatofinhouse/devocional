const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const sqlFilePath = path.join(__dirname, '..', 'store-assets', 'dev_lessons_rows_4.sql');
const dbHost = 'aws-0-us-east-1.pooler.supabase.com'; // Supabase connection pooler in us-east-1 (IPv4 compatible)
const dbUser = 'postgres.xznzppgkkkkpzyvzemlr'; // Connection pooler user
const dbName = 'postgres';

rl.question('🔑 Por favor, insira a senha do banco de dados do Supabase: ', (password) => {
  if (!password) {
    console.error('❌ A senha não pode estar em branco.');
    rl.close();
    process.exit(1);
  }

  const connectionString = `postgresql://${encodeURIComponent(dbUser)}:${encodeURIComponent(password)}@${dbHost}:5432/${dbName}`;
  
  console.log('\nReading SQL file...');
  let sqlContent;
  try {
    sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
  } catch (err) {
    console.error('❌ Erro ao ler o arquivo SQL:', err.message);
    rl.close();
    process.exit(1);
  }

  console.log('🔄 Conectando ao banco de dados...');
  const client = new Client({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  client.connect()
    .then(async () => {
      console.log('✅ Conectado com sucesso!');
      
      console.log('🧹 Executando TRUNCATE para limpar a tabela dev_lessons...');
      await client.query('TRUNCATE TABLE "public"."dev_lessons" CASCADE;');
      console.log('✅ Tabela limpa com sucesso!');

      console.log('📤 Enviando os novos registros (isso pode levar alguns segundos)...');
      await client.query(sqlContent);
      console.log('🎉 Tudo pronto! Todas as 959 lições atualizadas foram carregadas no banco de dados com sucesso.');
    })
    .catch((err) => {
      console.error('❌ Erro durante o processo de upload:', err.message);
    })
    .finally(() => {
      client.end();
      rl.close();
    });
});
