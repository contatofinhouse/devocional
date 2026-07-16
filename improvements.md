# Plano de Melhorias: Fluxo de Paywall, Compartilhamento, Modo Offline (Estilo Kindle) e Ajustes de UI

Este plano detalha as melhorias propostas para otimizar o fluxo de aquisição utilizando a própria tela do app (sem templates externos do RevenueCat), refinar a mensagem de compartilhamento de devocionais com resumos pré-salvos, implementar um **Modo Offline completo estilo Kindle** e ajustar o layout da interface (UI) para se enquadrar perfeitamente em telas com notch/câmera frontal após a remoção da barra de status.

---

## Melhorias Propostas

### 1. Compra Direta pela Tela do App (Custom Paywall)
- **Problema**: Ao clicar para adquirir o plano, o app abre um modal customizado em React e depois exige outro clique para abrir o paywall nativo do RevenueCat.
- **Solução**: 
  - Usar a **própria tela bonita em React do app** como a vitrine final (modal `showPaywall`).
  - Quando o usuário clicar em *"🔓 Desbloquear Acesso Premium"*, o app chamará diretamente o SDK `Purchases.purchasePackage` em segundo plano para abrir a folha oficial de compra da Google Play / App Store (sem exibir nenhuma interface intermediária do RevenueCat).
  - Buscar dinamicamente o pacote ativo usando `Purchases.getOfferings()`.

---

### 2. Resumo da Narrativa Bíblica no Banco de Dados (População via Gemini)
- **Problema**: O resumo feito por corte de caracteres é impreciso e não atrai o leitor. Gerar via IA em tempo real no app do usuário causaria lentidão e riscos de segurança.
- **Solução**:
  - Criar um campo `share_summary` (TEXT) na tabela `dev_lessons` no Supabase.
  - Desenvolver um script local em Node.js (`scripts/generate_share_summaries.js`) que lê as lições, consome a API do Gemini no modelo `gemini-2.5-flash` (usando a `GEMINI_API_KEY` do `.env`) e gera para cada lição um resumo de **70 a 90 palavras** focado estritamente na **narrativa bíblica** da lição.
  - Atualizar o fluxo de compartilhamento no app para usar esse resumo.
- **Estrutura da Mensagem de Compartilhamento**:
  
  ```text
  📖 Lecti • Fé, Caráter e Sabedoria
  Tema: [Tema] / [Título da Lição] ([Referência Bíblica])

  [Resumo da narrativa bíblica pré-salvo no banco - 70 a 90 palavras]

  "[Mensagem Final / Frase de Impacto]"

  —
  Fiz esta leitura hoje e lembrei de você. Acompanhe os devocionais comigo. Baixe o app:
  lecti.com.br/android
  ```

---

### 3. Funcionamento Offline Completo (Estilo Kindle)

#### A. Fim do Travamento na Inicialização (Splash Screen Hang)
- **Problema**: Atualmente, quando o usuário está offline, o app fica travado por 30 a 45 segundos na Splash Screen (ou não abre de jeito nenhum). Isso ocorre porque `loadUserData` faz 3 consultas de rede ao Supabase de forma sequencial (`await`). Sem internet, o app espera o timeout de rede de cada uma delas expirar antes de liberar a tela.
- **Solução (Local-First)**:
  1. **Carregamento Instantâneo Local**: Na inicialização do app, carregamos **imediatamente** o último perfil, logs e progresso salvos no `localStorage` (cache local).
  2. **Liberação Imediata da Splash Screen**: Assim que os dados locais são lidos (leva menos de 50 milissegundos), o app esconde a Splash Screen e mostra as telas com os dados salvos anteriormente.
  3. **Atualização Silenciosa em Segundo Plano**: Se houver internet, o app busca os dados atualizados no Supabase em segundo plano. Se a busca tiver sucesso, atualiza o estado do app e sobrescreve o cache local. Se falhar (offline), o app apenas ignora silenciosamente e o usuário continua usando o app offline normalmente com seus dados locais.

#### B. Pré-Download e Cache Completo de Conteúdos
- **Problema**: Atualmente, o app busca devocionais sob demanda e armazena em cache apenas o que foi aberto. Se o usuário estiver sem rede, ele não consegue acessar novos conteúdos.
- **Solução**:
  - Ao iniciar o aplicativo e detectar conexão com a internet, o app executa um **pré-carregamento em lote silencioso** (silent pre-fetch) de todas as lições da trilha do usuário e do calendário.
  - Os dados são salvos de forma estruturada no armazenamento local persistente (`localStorage` ou através de `@capacitor/preferences`).
  - Quando o usuário abrir uma lição offline, o app busca diretamente do cache local, sem travar ou mostrar tela de carregamento.

#### C. Fila de Sincronização de Progresso (Queue-and-Sync)
- **Problema**: Marcar uma lição como concluída ou salvar um log offline falha ou não é salvo no banco de dados na nuvem.
- **Solução**:
  - Criar uma **fila de tarefas pendentes** no armazenamento local (ex: `devocional_offline_queue`).
  - Se o usuário registrar progresso ou salvar um diário estando offline:
    1. O progresso é refletido na interface do usuário na hora.
    2. O log é salvos localmente.
    3. Uma tarefa de atualização é adicionada à fila `devocional_offline_queue`.
  - **Sincronização Automática**: O app monitora a conexão usando eventos do sistema (`window.addEventListener('online', ...)`). Assim que a internet retornar, o app lê a fila, envia as pendências ao Supabase e limpa a fila de forma transparente.

---

### 4. Enquadramento e Moldura da UI no Topo (Safe Area no Header)
- **Problema**: Como ocultamos a barra de status do celular para rodar em tela cheia nativa, o cabeçalho (header) do app subiu todo e ficou "esticado", invadindo a área física da câmera frontal (notch) no Android e iOS.
- **Solução**:
  - Ajustar o CSS global do app para respeitar a **Safe Area** do dispositivo móvel.
  - Adicionar um espaçamento superior (`padding-top`) dinâmico no header usando a variável de ambiente CSS `env(safe-area-inset-top)`.
  - Isso garante que, mesmo sem a barra de status, o topo do app tenha uma moldura elegante e comece logo abaixo do entalhe da câmera física.

---

## Proposed Changes

### [Database & Scripts]

#### 1. SQL para criar a coluna de resumos:
```sql
ALTER TABLE "public"."dev_lessons" ADD COLUMN "share_summary" TEXT;
```

---

### [App - CSS da UI do Topo]

#### [MODIFY] [index.css](file:///c:/Users/rafae/Documents/FINHOUSE/SITES/devocional/src/index.css)
Adicionar tratamento de Safe Area no cabeçalho do app:

```css
/* Se o app estiver rodando dentro de um container nativo (Capacitor) */
.app-header, header {
  padding-top: calc(env(safe-area-inset-top) + 16px) !important;
}

/* Fallback de moldura de segurança caso o dispositivo não suporte safe-area variables */
@supports not (padding-top: env(safe-area-inset-top)) {
  .app-header, header {
    padding-top: 24px !important;
  }
}
```

---

### 5. Prevenção de Travamento por Chave de Teste do RevenueCat (Bypass Seguro em Modo de Teste)
- **Problema**: Ao testar o aplicativo em aparelhos físicos ou enviá-lo ao Google Play Console para testes/revisão, caso a chave do RevenueCat no `.env` esteja configurada com o placeholder de teste (como `test_nSahrsbeWqCJKgFtryNASRNEjTO`), o SDK nativo do RevenueCat no Android falha na inicialização com erro fatal de formato de chave (`IllegalArgumentException`), fazendo com que o app feche por segurança logo na abertura.
- **Solução**:
  1. **Validação Inteligente e Automática**: Antes de chamar `Purchases.configure(...)`, o código validará se a chave fornecida segue o padrão de produção (`goog_` para Android e `appl_` para iOS).
  2. **Inicialização Condicional**: 
     * Se a chave começar com `test_` ou estiver em formato inválido, a inicialização nativa do RevenueCat é pulada (evitando a quebra e o fechamento do app).
     * Se a chave for real e válida (ex: `goog_...`), o RevenueCat inicializa normalmente e abre a folha oficial de compras da Google Play.
  3. **Simulador de Compra no Paywall (Opcional/Apenas para Chaves de Teste)**: Se a chave for de testes (SDK não configurado nativamente), ao clicar em *"🔓 Desbloquear Acesso Premium"*, o app mostra um alerta de simulação e desbloqueia o Premium imediatamente localmente e no Supabase. Isso impede travamentos e permite testes completos das telas do app antes da publicação.

---

### 6. Ícone Customizado para Notificações Locais (Fim da Exclamação Genérica)
- **Problema**: O ícone exibido na barra de notificações do Android é uma exclamação branca genérica (ou quadrado cinza) porque o Capacitor usa um fallback quando o recurso de ícone pequeno (`smallIcon`) não está explicitamente configurado nos recursos nativos e no arquivo de configuração do app.
- **Solução**:
  1. **Criação do Asset do Ícone**: Criar uma imagem PNG transparente com a silhueta em branco de um **livro aberto** (`ic_livro_aberto.png` nas dimensões de 24x24dp a 96x96dp) e incluí-la nas pastas de recursos do Android (`android/app/src/main/res/drawable/` e suas variações de densidade `-hdpi`, `-xhdpi`, etc.).
  2. **Configuração do Capacitor**: Adicionar a configuração do plugin `LocalNotifications` em `capacitor.config.ts` apontando para o recurso do livro aberto:
     ```typescript
     LocalNotifications: {
       smallIcon: "ic_livro_aberto",
       iconColor: "#FF385C"
     }
     ```



