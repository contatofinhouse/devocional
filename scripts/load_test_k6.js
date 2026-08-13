import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do k6 para 70 usuários simultâneos (VUs)
export const options = {
  stages: [
    { duration: '10s', target: 70 }, // Sobe rápido para 70 usuários concorrentes
    { duration: '30s', target: 70 }, // Mantém em 70 usuários por 30 segundos
    { duration: '10s', target: 0 },  // Reduz a zero para encerrar
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // Menos de 1% de falhas
    http_req_duration: ['p(95)<1500'], // 95% das requisições devem responder em menos de 1.5s
  },
};

const SUPABASE_URL = 'https://xznzppgkkkkpzyvzemlr.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bnpwcGdra2trcHp5dnplbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDIxNjMsImV4cCI6MjA3ODAxODE2M30.R7e76191bM6gsabfHh39aO6I6DCUrPGhy_K1HYIm8Sk';

// ID de usuário teste para simular a consulta
const TEST_USER_ID = '00000000-0000-0000-0000-000000000000';

export default function () {
  const headers = {
    'apikey': ANON_KEY,
    'Authorization': `Bearer ${ANON_KEY}`,
    'Content-Type': 'application/json',
  };

  // 1. Busca perfil do usuário
  const resProfile = http.get(
    `${SUPABASE_URL}/rest/v1/dev_profiles?id=eq.${TEST_USER_ID}&select=*`,
    { headers }
  );
  check(resProfile, {
    'status perfil é 200': (r) => r.status === 200,
  });

  // 2. Busca progresso do usuário
  const resProgress = http.get(
    `${SUPABASE_URL}/rest/v1/dev_progress?user_id=eq.${TEST_USER_ID}&select=*`,
    { headers }
  );
  check(resProgress, {
    'status progresso é 200': (r) => r.status === 200,
  });

  // 3. Busca logs do usuário
  const resLogs = http.get(
    `${SUPABASE_URL}/rest/v1/dev_logs?user_id=eq.${TEST_USER_ID}&select=*&order=created_at.desc`,
    { headers }
  );
  check(resLogs, {
    'status logs é 200': (r) => r.status === 200,
  });

  // Simula um tempo de espera entre leituras do usuário (2 a 5 segundos)
  sleep(Math.random() * 3 + 2);
}
