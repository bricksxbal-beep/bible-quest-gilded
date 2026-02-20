

# Bible Quiz Pro — Plano MVP

## Visão Geral
App de quiz bíblico premium com design elegante, gamificação motivadora e conteúdo em 3 idiomas. Dados locais, preparado para backend futuro. Distribuição via Capacitor (iOS/Android).

---

## Fase 1: Fundação e Design System

### Design Premium
- Paleta de cores: branco, dourado suave (#C5A55A), azul escuro (#1A2332), roxo suave (#6B5CE7)
- Modo claro e escuro
- Tipografia moderna e elegante
- Animações suaves (transições, feedback de acerto/erro)
- Layout mobile-first responsivo
- Ícones premium (Lucide)

### Sistema de Internacionalização (i18n)
- Suporte completo para Português, Inglês e Espanhol
- Detecção automática do idioma do dispositivo
- Troca manual nas configurações
- Todas as strings da interface traduzidas

---

## Fase 2: Sistema de Quiz

### Motor de Quiz
- Perguntas de múltipla escolha com 4 alternativas
- Feedback visual animado (acerto verde, erro vermelho)
- Explicação detalhada + referência bíblica após cada resposta
- Barra de progresso durante o quiz
- Temporizador opcional
- Sistema anti-repetição e randomização inteligente

### Conteúdo
- ~80 perguntas equilibradas entre AT e NT
- 10 categorias: Antigo Testamento, Novo Testamento, Evangelhos, Profetas, Apóstolos, Mulheres da Bíblia, Milagres, Parábolas, História Bíblica, Conhecimentos Gerais
- 4 níveis de dificuldade: Fácil, Médio, Difícil, Expert
- Imagens placeholder (ícones/ilustrações genéricas) para substituição futura

---

## Fase 3: Gamificação

### Sistema de Progressão
- Pontos e XP por resposta correta (bônus por dificuldade e velocidade)
- Sistema de níveis com nomes temáticos (ex: "Discípulo", "Apóstolo", "Profeta")
- Conquistas/medalhas desbloqueáveis
- Sistema de streak (dias consecutivos jogando)
- Desafios diários e semanais

### Ranking
- Ranking global simulado (mock com nomes fictícios)
- Posição do jogador no ranking

---

## Fase 4: Perfil e Estatísticas

### Tela de Perfil
- Nome e avatar do usuário
- Estatísticas gerais: pontuação, jogos, taxa de acerto, tempo total
- Progresso por categoria (gráfico visual)

### Dashboard de Estatísticas
- Taxa de acertos geral e por categoria
- Tempo médio por pergunta
- Categorias fortes e fracas
- Gráfico de evolução

---

## Fase 5: Experiência e Retenção

### Onboarding
- Tela de boas-vindas elegante
- Seleção de idioma
- Mini tutorial interativo do quiz

### Configurações
- Idioma, som, vibração, tema (claro/escuro)
- Reset de progresso
- Informações e privacidade

### Notificações (estrutura)
- Preparação da estrutura para lembretes e desafios diários
- Notificações locais via Capacitor

---

## Fase 6: Capacitor e Nativo

### Configuração Capacitor
- Setup para iOS e Android
- Hot-reload para desenvolvimento
- Instruções para build e publicação nas stores

---

## Estrutura para Futuro (não implementado agora)
- Backend com Lovable Cloud (login, ranking real, sync)
- Eventos sazonais (Natal, Páscoa)
- Imagens reais nas perguntas
- Mais perguntas e categorias
- Compartilhamento social

