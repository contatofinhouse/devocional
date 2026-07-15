# Plano de Melhorias: Fluxo de Paywall Customizado e Compartilhamento

Este plano detalha as melhorias propostas para otimizar o fluxo de aquisição utilizando a própria tela do app (sem templates externos do RevenueCat) e refinar a mensagem de compartilhamento de devocionais.

---

## Melhorias Propostas

### 1. Compra Direta pela Tela do App (Custom Paywall)
- **Problema**: Ao clicar para adquirir o plano, o app abre um modal customizado em React e depois exige outro clique para abrir o paywall nativo do RevenueCat.
- **Solução**: 
  - Usar a **própria tela bonita em React do app** como a vitrine final (modal `showPaywall`).
  - Quando o usuário clicar em *"🔓 Desbloquear Acesso Premium"*, o app chamará diretamente o SDK `Purchases.purchasePackage` em segundo plano para abrir a folha oficial de compra da Google Play / App Store (sem exibir nenhuma interface intermediária do RevenueCat).
  - Buscar dinamicamente o pacote ativo usando `Purchases.getOfferings()`.

---

### 2. Ajuste e Resumo no Compartilhamento (Share)
- **Problema**: A mensagem de compartilhamento atual envia o texto completo do devocional (ficando muito longa) e possui textos e emojis desatualizados.
- **Solução**:
  - Inserir o emoji de mãos para cima (`🙌`) logo no início da mensagem.
  - Implementar uma função auxiliar no cliente para **resumir na hora** (extraindo as duas primeiras frases da leitura bíblica e da reflexão). Isso evita chamadas lentas de rede e mantém o compartilhamento instantâneo.
  - Remover a seção do *"Desafio para hoje"*.
  - Alterar a frase final para: *"Fiz esta leitura hoje e lembrei de você."*

---

## Proposed Changes

### [App]

#### [MODIFY] [App.tsx](file:///c:/Users/rafae/Documents/FINHOUSE/SITES/devocional/src/App.tsx)

1. Adicionar a função helper `summarizeText` para obter os resumos das frases na hora:
```typescript
const summarizeText = (text: string, maxSentences: number = 2) => {
  if (!text) return '';
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  return sentences.slice(0, maxSentences).join('. ') + '.';
};
```

2. Atualizar o `handleShareDevotional` para usar o resumo na hora, emojis e a nova assinatura:
```typescript
const handleShareDevotional = async () => {
  if (!currentDevotional) return;
  const activeStory = currentDevotional.stories[storyIndex] || currentDevotional.stories[0];
  
  const storySummary = summarizeText(activeStory.biblicalStory, 2);
  const reflectionSummary = summarizeText(activeStory.reflection, 2);
  
  const shareText = `🙌 lecti • devocional em família\n\nTema: ${currentDevotional.theme}\nHistória: ${activeStory.biblicalStoryTitle}\n\nResumo da Leitura:\n${storySummary}\n\nReflexão:\n${reflectionSummary}\n\n"${activeStory.finalMessage}"\n\n—\nFiz esta leitura hoje e lembrei de você. Baixe o app Lecti na Play Store para acompanhar os devocionais comigo:\nlecti.com.br/android`;
  
  try {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    showToast('Abrindo o WhatsApp...', 'success');
  } catch (err) {
    showToast('Não foi possível abrir o WhatsApp.', 'error');
  }
};
```

3. Modificar o clique do botão no modal do Paywall React para executar a compra direta:
```typescript
{/* Modificar o onClick do botão 🔓 Desbloquear Acesso Premium em App.tsx (por volta da linha 2623) */}
onClick={async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      // 1. Busca os pacotes ativos do RevenueCat
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null && offerings.current.availablePackages.length > 0) {
        // 2. Compra o primeiro pacote disponível
        const packageToBuy = offerings.current.availablePackages[0];
        const { customerInfo } = await Purchases.purchasePackage({ aPackage: packageToBuy });
        
        // 3. Valida a liberação
        if (customerInfo.entitlements.active['lecti Premium'] !== undefined) {
          setIsPremium(true);
          setShowPaywall(false);
          if (user) {
            await supabase.from('dev_profiles').update({ is_premium: true }).eq('id', user.id);
          }
          alert('Acesso Premium ativado! Obrigado pelo seu apoio.');
        }
      } else {
        alert('Nenhum plano de vendas ativo foi encontrado.');
      }
    } catch (e: any) {
      if (e.userCancelled) {
        console.log('Usuário cancelou a compra');
      } else {
        alert('Erro ao realizar a compra: ' + e.message);
      }
    }
  } else {
    // Fallback para Web/PWA ou simulação em desenvolvimento
    alert('Para testar na Web: Acesso Premium simulado ativado!');
    setIsPremium(true);
    setShowPaywall(false);
    if (user) {
      await supabase.from('dev_profiles').update({ is_premium: true }).eq('id', user.id);
    }
  }
}}
```
