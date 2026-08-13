export interface QueueItem {
  id: string;
  action: 'progress' | 'log' | string;
  payload: any;
  timestamp: string;
}

export const addToSyncQueue = (action: string, payload: any): void => {
  try {
    const queueJson = localStorage.getItem('devocional_offline_queue');
    const queue: QueueItem[] = queueJson ? JSON.parse(queueJson) : [];
    queue.push({
      id: `q-${Date.now()}-${Math.random()}`,
      action,
      payload,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('devocional_offline_queue', JSON.stringify(queue));
    console.log('Adicionado à fila de sincronização offline:', action, payload);
  } catch (e) {
    console.error('Erro ao salvar na fila offline:', e);
  }
};

export const processSyncQueue = async (
  supabase: any,
  onSyncComplete?: () => void
): Promise<void> => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;
  try {
    const queueJson = localStorage.getItem('devocional_offline_queue');
    if (!queueJson) return;
    const queue: QueueItem[] = JSON.parse(queueJson);
    if (queue.length === 0) return;

    console.log('🔄 Sincronizando itens da fila offline com o Supabase...', queue.length);
    const remainingQueue: QueueItem[] = [];

    for (const item of queue) {
      try {
        if (item.action === 'progress') {
          const { error } = await supabase.from('dev_progress').upsert(item.payload);
          if (error) throw error;
        } else if (item.action === 'log') {
          const { error } = await supabase.from('dev_logs').insert(item.payload);
          if (error) throw error;
        }
      } catch (err) {
        console.error('Erro ao sincronizar item da fila:', item, err);
        remainingQueue.push(item);
      }
    }

    localStorage.setItem('devocional_offline_queue', JSON.stringify(remainingQueue));
    if (remainingQueue.length === 0 && onSyncComplete) {
      onSyncComplete();
    }
  } catch (e) {
    console.error('Erro ao processar fila offline:', e);
  }
};
