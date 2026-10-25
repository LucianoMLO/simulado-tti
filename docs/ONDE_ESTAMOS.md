# Onde estamos

- 2026-10-25: banco completo escrito e publicado: **160 questões padrão + 44 desafio = 204** (TTI+ 120 padrão + 35 desafio; AVI 40 padrão + 9 desafio). Cada módulo é um arquivo em `banco/` (1ª alternativa = correta; a ordem é embaralhada na tela).
- Site: https://lucianomlo.github.io/simulado-tti/ (repo público, Pages na branch `main`).
- Testado: carregamento do banco (sem IDs duplicados, 4 alternativas em todas), fluxo completo do desafio (44/44) e filtros por simulado/módulo/quantidade.

## Pendências conhecidas
1. ~~Viés de tamanho~~ corrigido em 2026-10-25: a correta é a mais longa em 23% das questões (era 79%) e a mais curta em 6%. Distratores reescritos em ~120 questões; revisar o texto deles se algum parecer plausível demais.
2. Revisão de conteúdo por quem conhece a prova: confirmar se o peso por tema reflete a avaliação final do IBREP.
3. Imprecisões da apostila tratadas: M = C + J (juros simples) grafado como 5.400 (correto 5.540); "NBR 14.652-2"; numeração da NBR 14.653-3; Lei 9.631/98 (COAF); limite de 30 x 40 salários-mínimos (art. 108 CC).
4. Estágio sem questões no desafio (4 no padrão).

## 2026-10-25 (2) — app de celular com plano de 5 dias
- Reescrito como PWA: abas Hoje/Semana/Sumário/Resultados, roteiro diário, sumário por dia e por capítulo, resultados e sugestões acessíveis em qualquer tela (chip 📊), progresso em localStorage.
- Dias: 1–3 básico (40 cada), 4 AVI (40), 5 desafio (44). Capítulos e dias em `banco/00_temas.js`.
- Testado: carga do banco, distribuição por dia, fluxo dia → questões → resultados em viewport 375×812.
- NÃO testado: service worker/offline (o navegador do painel bloqueia o registro) e instalação no celular real.
