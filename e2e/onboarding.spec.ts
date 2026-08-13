import { test, expect } from '@playwright/test';

test.describe('Fluxo de Onboarding', () => {
  test.beforeEach(async ({ page }) => {
    // Intercepter e mockar chamadas de dados do Supabase
    await page.route('**/rest/v1/dev_profiles*', async (route) => {
      const method = route.request().method();
      if (method === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      } else if (method === 'POST' || method === 'PUT') {
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ id: 'test-user-id', development_mode: 'personal' }),
        });
      }
    });

    await page.route('**/rest/v1/dev_progress*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.route('**/rest/v1/dev_logs*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    // Injetar dados de sessão autenticada do Supabase no localStorage antes da carga da página
    await page.addInitScript(() => {
      const projectRef = 'xznzppgkkkkpzyvzemlr';
      const tokenKey = `sb-${projectRef}-auth-token`;
      const sessionObj = {
        access_token: 'dummyHeader.dummyPayload.dummySignature', // 3 parts JWT format to avoid warnings
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'mock-refresh-token',
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          role: 'authenticated',
          aud: 'authenticated',
        },
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      };

      // Define com o prefixo CapacitorStorage. (usado pelo Capacitor Preferences no Web)
      window.localStorage.setItem(`CapacitorStorage.${tokenKey}`, JSON.stringify(sessionObj));
      window.localStorage.setItem(`CapacitorStorage.last_user_id`, 'test-user-id');
      window.localStorage.setItem(`CapacitorStorage.last_user_email`, 'test@example.com');
      
      // Define também os padrões (como fallback)
      window.localStorage.setItem(tokenKey, JSON.stringify(sessionObj));
      window.localStorage.setItem(`_cap_${tokenKey}`, JSON.stringify(sessionObj));
      window.localStorage.setItem('last_user_id', 'test-user-id');
      window.localStorage.setItem('last_user_email', 'test@example.com');
      window.localStorage.setItem('_cap_last_user_id', 'test-user-id');
      window.localStorage.setItem('_cap_last_user_email', 'test@example.com');
      
      // Forçar status online
      Object.defineProperty(navigator, 'onLine', { value: true });
    });
  });

  test('deve completar o onboarding com sucesso no modo individual', async ({ page }) => {
    await page.goto('/');

    // Aguarda o onboarding carregar (Passo 1: Escolha do Foco)
    await expect(page.locator('text=Escolha o seu Foco')).toBeVisible({ timeout: 10000 });

    // Clica no card de Desenvolvimento Pessoal (Modo Individual)
    await page.locator('text=Desenvolvimento Pessoal').click();

    // Aguarda o Passo 2 carregar (Seu Perfil)
    await expect(page.locator('text=Seu Perfil')).toBeVisible();

    // Seleciona a data de nascimento
    const dateInput = page.locator('input[type="date"]');
    await dateInput.fill('1990-01-01');

    // Seleciona tempo diário
    const selectTime = page.locator('select');
    await selectTime.selectOption('15');

    // Clica em Salvar Perfil / Concluir
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Verifica se completou e o dashboard principal (Jornada) apareceu
    await expect(page.locator('text=Jornada')).toBeVisible({ timeout: 10000 });
  });
});
