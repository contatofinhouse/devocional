import { describe, it, expect, beforeEach, vi } from 'vitest';
import { addToSyncQueue, processSyncQueue } from '../offlineQueue';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; }
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Mock navigator
const navigatorMock = {
  onLine: true
};

Object.defineProperty(globalThis, 'navigator', {
  value: navigatorMock,
  writable: true,
  configurable: true
});

describe('offlineQueue', () => {
  beforeEach(() => {
    localStorage.clear();
    navigatorMock.onLine = true;
    vi.restoreAllMocks();
  });

  describe('addToSyncQueue', () => {
    it('deve adicionar um item à fila no localStorage', () => {
      addToSyncQueue('progress', { user_id: '123', streak: 5 });

      const queueJson = localStorage.getItem('devocional_offline_queue');
      expect(queueJson).not.toBeNull();

      const queue = JSON.parse(queueJson!);
      expect(queue).toHaveLength(1);
      expect(queue[0].action).toBe('progress');
      expect(queue[0].payload).toEqual({ user_id: '123', streak: 5 });
      expect(queue[0].id).toBeDefined();
      expect(queue[0].timestamp).toBeDefined();
    });
  });

  describe('processSyncQueue', () => {
    it('não deve fazer nada se o navigator estiver offline', async () => {
      navigatorMock.onLine = false;
      addToSyncQueue('progress', { user_id: '123' });

      const mockSupabase = {
        from: vi.fn()
      };

      await processSyncQueue(mockSupabase);

      // A fila ainda deve ter 1 item (não processado)
      const queueJson = localStorage.getItem('devocional_offline_queue');
      expect(JSON.parse(queueJson!)).toHaveLength(1);
      expect(mockSupabase.from).not.toHaveBeenCalled();
    });

    it('deve sincronizar com sucesso e esvaziar a fila', async () => {
      addToSyncQueue('progress', { user_id: '123' });
      addToSyncQueue('log', { user_id: '123', note: 'test' });

      // Mock chain for supabase.from().upsert() and insert()
      const mockUpsert = vi.fn().mockResolvedValue({ error: null });
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockImplementation((table: string) => {
        if (table === 'dev_progress') {
          return { upsert: mockUpsert };
        }
        if (table === 'dev_logs') {
          return { insert: mockInsert };
        }
        return {};
      });

      const mockSupabase = {
        from: mockFrom
      };

      const syncCompleteCallback = vi.fn();

      await processSyncQueue(mockSupabase, syncCompleteCallback);

      expect(mockFrom).toHaveBeenCalledWith('dev_progress');
      expect(mockUpsert).toHaveBeenCalledWith({ user_id: '123' });
      expect(mockFrom).toHaveBeenCalledWith('dev_logs');
      expect(mockInsert).toHaveBeenCalledWith({ user_id: '123', note: 'test' });

      // Fila no localStorage deve estar vazia []
      const queueJson = localStorage.getItem('devocional_offline_queue');
      expect(JSON.parse(queueJson!)).toHaveLength(0);
      expect(syncCompleteCallback).toHaveBeenCalled();
    });

    it('deve manter os itens que falharem na fila', async () => {
      addToSyncQueue('progress', { user_id: '123' });

      const mockUpsert = vi.fn().mockResolvedValue({ error: new Error('Database connection lost') });
      const mockSupabase = {
        from: vi.fn().mockReturnValue({ upsert: mockUpsert })
      };

      await processSyncQueue(mockSupabase);

      // O item que falhou deve continuar na fila
      const queueJson = localStorage.getItem('devocional_offline_queue');
      expect(JSON.parse(queueJson!)).toHaveLength(1);
    });
  });
});
