import * as Sentry from '@sentry/capacitor';

export interface FriendlyError {
  message: string;
  isNetworkError: boolean;
}

export function getFriendlyErrorMessage(error: any): FriendlyError {
  if (!error) {
    return {
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
      isNetworkError: false,
    };
  }

  // Extract message from standard error objects
  const errMsg = typeof error === 'string' 
    ? error 
    : (error.message || error.error_description || JSON.stringify(error));

  const lowerMsg = errMsg.toLowerCase();

  // Enviar erros críticos (que não sejam problemas locais de rede ou cancelamento do usuário) para o Sentry
  const isExcludedFromSentry = 
    lowerMsg.includes('fetch failed') ||
    lowerMsg.includes('network request failed') ||
    lowerMsg.includes('aborted') ||
    lowerMsg.includes('timeout') ||
    lowerMsg.includes('failed to fetch') ||
    lowerMsg.includes('network error') ||
    lowerMsg.includes('invalid login credentials') || 
    lowerMsg.includes('invalid credentials') ||
    lowerMsg.includes('purchase cancelled') || 
    lowerMsg.includes('user cancelled');

  if (!isExcludedFromSentry) {
    try {
      Sentry.captureException(error);
    } catch (e) {
      console.warn('Falha ao enviar exceção para o Sentry:', e);
    }
  }

  // 1. Network / Timeout Errors
  if (
    lowerMsg.includes('fetch failed') ||
    lowerMsg.includes('network request failed') ||
    lowerMsg.includes('aborted') ||
    lowerMsg.includes('timeout') ||
    lowerMsg.includes('failed to fetch') ||
    lowerMsg.includes('network error')
  ) {
    return {
      message: 'Parece que você está sem conexão ou a rede está instável. O Lecti continuará funcionando offline e sincronizará suas leituras assim que a internet voltar! 📶',
      isNetworkError: true,
    };
  }

  // 2. Supabase Auth Errors
  if (lowerMsg.includes('invalid login credentials') || lowerMsg.includes('invalid credentials')) {
    return {
      message: 'E-mail ou senha incorretos. Por favor, verifique os dados e tente novamente.',
      isNetworkError: false,
    };
  }
  if (lowerMsg.includes('user already registered') || lowerMsg.includes('email already exists')) {
    return {
      message: 'Este e-mail já está cadastrado. Que tal tentar fazer login ou recuperar sua senha?',
      isNetworkError: false,
    };
  }
  if (lowerMsg.includes('signup disabled')) {
    return {
      message: 'O cadastro de novas contas está temporariamente desativado. Entre em contato com o suporte.',
      isNetworkError: false,
    };
  }

  // 3. RevenueCat Purchase Errors
  if (lowerMsg.includes('purchase cancelled') || lowerMsg.includes('user cancelled')) {
    return {
      message: 'A compra foi cancelada. Se tiver alguma dúvida sobre a assinatura, estamos à disposição! 🌟',
      isNetworkError: false,
    };
  }
  if (lowerMsg.includes('product already owned')) {
    return {
      message: 'Você já possui este plano ativo no seu dispositivo!',
      isNetworkError: false,
    };
  }

  // 4. Rate Limit / Database Errors
  if (lowerMsg.includes('rate limit') || lowerMsg.includes('too many requests')) {
    return {
      message: 'O servidor está recebendo muitas requisições agora. Por favor, aguarde alguns segundos e tente novamente.',
      isNetworkError: false,
    };
  }

  // Fallback default message
  return {
    message: 'Não foi possível completar a operação. Verifique sua conexão e tente novamente.',
    isNetworkError: false,
  };
}
