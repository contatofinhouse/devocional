const SUPABASE_URL = 'https://xznzppgkkkkpzyvzemlr.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bnpwcGdra2trcHp5dnplbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDIxNjMsImV4cCI6MjA3ODAxODE2M30.R7e76191bM6gsabfHh39aO6I6DCUrPGhy_K1HYIm8Sk';
const TEST_USER_ID = '00000000-0000-0000-0000-000000000000';

const CONCURRENT_USERS = 70;
const TEST_DURATION_MS = 15000; // Run for 15 seconds to evaluate performance

const stats = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  responseTimes: [],
};

const headers = {
  'apikey': ANON_KEY,
  'Authorization': `Bearer ${ANON_KEY}`,
  'Content-Type': 'application/json',
};

async function simulateUser(userId) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < TEST_DURATION_MS) {
    const urls = [
      `${SUPABASE_URL}/rest/v1/dev_profiles?id=eq.${TEST_USER_ID}&select=*`,
      `${SUPABASE_URL}/rest/v1/dev_progress?user_id=eq.${TEST_USER_ID}&select=*`,
      `${SUPABASE_URL}/rest/v1/dev_logs?user_id=eq.${TEST_USER_ID}&select=*&order=created_at.desc`
    ];

    for (const url of urls) {
      const reqStart = Date.now();
      try {
        stats.totalRequests++;
        const res = await fetch(url, { headers });
        const duration = Date.now() - reqStart;
        stats.responseTimes.push(duration);
        
        if (res.status === 200 || res.status === 201) {
          stats.successfulRequests++;
        } else {
          stats.failedRequests++;
          console.error(`Falha no request. Status: ${res.status}`);
        }
      } catch (err) {
        stats.failedRequests++;
        console.error(`Erro de conexão: ${err.message}`);
      }
    }
    
    // Simulate user reading/thinking time (500ms to 1500ms)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  }
}

async function runLoadTest() {
  console.log(`Iniciando teste de carga com ${CONCURRENT_USERS} usuários concorrentes...`);
  console.log(`Duração do teste: ${TEST_DURATION_MS / 1000} segundos.`);
  
  const userPromises = [];
  const startTestTime = Date.now();
  
  for (let i = 0; i < CONCURRENT_USERS; i++) {
    userPromises.push(simulateUser(i));
  }
  
  await Promise.all(userPromises);
  
  const totalDuration = (Date.now() - startTestTime) / 1000;
  const avgResponseTime = stats.responseTimes.length > 0 
    ? stats.responseTimes.reduce((a, b) => a + b, 0) / stats.responseTimes.length 
    : 0;
  
  const sortedTimes = [...stats.responseTimes].sort((a, b) => a - b);
  const p95 = sortedTimes.length > 0 ? sortedTimes[Math.floor(sortedTimes.length * 0.95)] : 0;
  const p99 = sortedTimes.length > 0 ? sortedTimes[Math.floor(sortedTimes.length * 0.99)] : 0;

  console.log("\n=== RESULTADOS DO TESTE DE CARGA ===");
  console.log(`Duração Total: ${totalDuration.toFixed(2)}s`);
  console.log(`Total de Requisições: ${stats.totalRequests}`);
  console.log(`Requisições Bem-sucedidas: ${stats.successfulRequests}`);
  console.log(`Requisições com Falha: ${stats.failedRequests}`);
  console.log(`Taxa de Sucesso: ${((stats.successfulRequests / stats.totalRequests) * 100).toFixed(2)}%`);
  console.log(`Tempo Médio de Resposta: ${avgResponseTime.toFixed(2)} ms`);
  console.log(`Percentil 95 (p95): ${p95} ms`);
  console.log(`Percentil 99 (p99): ${p99} ms`);
}

runLoadTest().catch(console.error);
