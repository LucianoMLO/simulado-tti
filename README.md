# Simulado TTI (IBREP)
App de estudo para o celular (PWA) com plano de 5 dias, questões de múltipla escolha com dica, verificação e explicação, e resultados com sugestões a qualquer momento.

- **Plano segunda a sexta:** seg–qua = básico (TTI+, 1/3 de cada capítulo por dia, 40 questões/dia); qui = AVI (40); sex = desafio/avançado (44). Todos os dias seguem a ordem de aprendizado e cobrem as áreas.
- **Abas:** Hoje · Semana · Sumário (por dia e por capítulo) · Resultados. O botão 📊 no topo abre resultados e sugestões em qualquer tela.
- **Roteiro por dia:** leitura dirigida (páginas calculadas a partir das questões), questões, revisão de erros e fechamento.
- **Instalar:** Android (Chrome) menu ⋮ → Instalar app; iPhone (Safari) Compartilhar → Adicionar à Tela de Início. Progresso salvo só no aparelho (localStorage).
- Estrutura: `index.html`, `app.js`, `app.css`, `sw.js`, `manifest.webmanifest`, `banco/*.js` (questões; `00_temas.js` define capítulos e dias). Plano de cobertura em `docs/PLANO_BANCO.md`.
- Testar localmente: `py -m http.server` nesta pasta (abrir o arquivo direto não carrega `banco/`).
- Não versionar as apostilas (PDF): são material protegido do IBREP.
