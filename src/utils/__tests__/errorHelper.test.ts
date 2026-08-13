import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getFriendlyErrorMessage } from '../errorHelper';
import * as Sentry from '@sentry/capacitor';

// Mock do Sentry para verificar chamadas
vi.mock('@sentry/capacitor', () => ({
  captureException: vi.fn(),
}));

describe('errorHelper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar mensagem padrão para erros nulos/indefinidos', () => {
    const result = getFriendlyErrorMessage(null);
    expect(result.message).toContain('Ocorreu um erro inesperado');
    expect(result.isNetworkError).toBe(false);
  });

  it('deve mapear erros de rede corretamente e NÃO enviar para o Sentry', () => {
    const errs = [
      'TypeError: fetch failed',
      { message: 'Network request failed' },
      'AbortError: This operation was aborted',
      new Error('failed to fetch')
    ];

    for (const err of errs) {
      const result = getFriendlyErrorMessage(err);
      expect(result.message).toContain('sem conexão ou a rede está instável');
      expect(result.isNetworkError).toBe(true);
    }

    // Não deve ter disparado nenhuma notificação de erro no Sentry para erros de conexão locais
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('deve mapear credenciais de login inválidas e NÃO enviar para o Sentry', () => {
    const result = getFriendlyErrorMessage('Invalid login credentials');
    expect(result.message).toContain('E-mail ou senha incorretos');
    expect(result.isNetworkError).toBe(false);
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('deve mapear compras canceladas do RevenueCat e NÃO enviar para o Sentry', () => {
    const result = getFriendlyErrorMessage('Purchase cancelled by user');
    expect(result.message).toContain('compra foi cancelada');
    expect(result.isNetworkError).toBe(false);
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it('deve enviar erros críticos de banco de dados/API para o Sentry', () => {
    const criticalError = new Error('Database insertion failed: RLS restriction violation');
    const result = getFriendlyErrorMessage(criticalError);
    
    expect(result.message).toContain('Não foi possível completar a operação');
    expect(result.isNetworkError).toBe(false);
    
    // Deve ter chamado o captureException do Sentry para reportar o erro crítico
    expect(Sentry.captureException).toHaveBeenCalledWith(criticalError);
  });
});
