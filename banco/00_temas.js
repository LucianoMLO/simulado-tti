/* Capítulos (temas) em ORDEM DE APRENDIZADO, com as páginas do capítulo na apostila.
   mod = módulo; ap = apostila (TTI+ ou AVI); pag = [primeira, última] página do PDF. */
window.TEMAS=[
 {mod:"Mercado",ap:"TTI+",nome:"Conhecendo a profissão",pag:[3,18]},
 {mod:"Mercado",ap:"TTI+",nome:"Nichos de atuação",pag:[19,38]},
 {mod:"Mercado",ap:"TTI+",nome:"Ética",pag:[39,44]},
 {mod:"Mercado",ap:"TTI+",nome:"Corretor empreendedor",pag:[45,49]},
 {mod:"Mercado",ap:"TTI+",nome:"Jornada de compra",pag:[50,60]},
 {mod:"Técnico",ap:"TTI+",nome:"Construção civil",pag:[64,77]},
 {mod:"Técnico",ap:"TTI+",nome:"Arquitetura",pag:[78,87]},
 {mod:"Técnico",ap:"TTI+",nome:"Direito imobiliário",pag:[88,107]},
 {mod:"Técnico",ap:"TTI+",nome:"Documentação imobiliária",pag:[108,129]},
 {mod:"Pessoas",ap:"TTI+",nome:"Marketing e vendas",pag:[133,153]},
 {mod:"Pessoas",ap:"TTI+",nome:"Comunicação 5.0",pag:[154,160]},
 {mod:"Pessoas",ap:"TTI+",nome:"Psicologia das vendas",pag:[161,172]},
 {mod:"Pessoas",ap:"TTI+",nome:"Português do corretor",pag:[173,181]},
 {mod:"Pessoas",ap:"TTI+",nome:"Pós-venda",pag:[182,185]},
 {mod:"Números",ap:"TTI+",nome:"Formas de comprar e vender",pag:[189,197]},
 {mod:"Números",ap:"TTI+",nome:"Economia e finanças",pag:[198,207]},
 {mod:"Números",ap:"TTI+",nome:"Matemática descomplicada",pag:[208,222]},
 {mod:"Estágio",ap:"TTI+",nome:"Estágio obrigatório",pag:[226,229]},
 {mod:"Avaliação (AVI)",ap:"AVI",nome:"Introdução à avaliação",pag:[3,40]},
 {mod:"Avaliação (AVI)",ap:"AVI",nome:"Métodos avaliatórios",pag:[43,68]},
 {mod:"Avaliação (AVI)",ap:"AVI",nome:"PTAM",pag:[71,84]},
 {mod:"Avaliação (AVI)",ap:"AVI",nome:"Avaliações judiciais",pag:[87,101]},
 {mod:"Avaliação (AVI)",ap:"AVI",nome:"Avaliações na prática",pag:[104,161]}
];
/* Nomes de disciplina do piloto que diferem do capítulo */
window.ALIAS={"Pós-venda gera venda":"Pós-venda"};
/* Questões do Desafio -> capítulo (as disciplinas delas são mais específicas) */
window.TEMA_DESAFIO={
 "MER-D01":"Conhecendo a profissão","MER-D02":"Conhecendo a profissão","MER-D03":"Ética",
 "MER-D04":"Nichos de atuação","MER-D05":"Nichos de atuação","MER-D06":"Nichos de atuação","MER-D07":"Nichos de atuação","MER-D08":"Nichos de atuação","MER-D09":"Nichos de atuação",
 "MER-D10":"Jornada de compra",
 "TEC-D01":"Direito imobiliário","TEC-D02":"Direito imobiliário","TEC-D03":"Direito imobiliário","TEC-D04":"Direito imobiliário","TEC-D05":"Direito imobiliário",
 "TEC-D06":"Documentação imobiliária","TEC-D07":"Construção civil","TEC-D08":"Documentação imobiliária","TEC-D09":"Documentação imobiliária","TEC-D10":"Documentação imobiliária","TEC-D11":"Documentação imobiliária","TEC-D12":"Documentação imobiliária",
 "PES-D01":"Marketing e vendas","PES-D02":"Marketing e vendas","PES-D03":"Psicologia das vendas","PES-D04":"Psicologia das vendas","PES-D05":"Português do corretor","PES-D06":"Português do corretor",
 "NUM-D01":"Matemática descomplicada","NUM-D02":"Matemática descomplicada","NUM-D03":"Matemática descomplicada","NUM-D04":"Matemática descomplicada",
 "NUM-D05":"Formas de comprar e vender","NUM-D06":"Economia e finanças","NUM-D07":"Formas de comprar e vender",
 "AVI-D01":"Introdução à avaliação","AVI-D02":"Métodos avaliatórios","AVI-D03":"Métodos avaliatórios","AVI-D04":"Métodos avaliatórios","AVI-D05":"Métodos avaliatórios",
 "AVI-D06":"PTAM","AVI-D07":"Avaliações judiciais","AVI-D08":"Avaliações na prática","AVI-D09":"Avaliações na prática"
};
/* Os 5 dias (segunda a sexta). Dias 1–3: TTI+ básico, 1/3 de cada capítulo por dia; dia 4: AVI; dia 5: Desafio (avançado). */
window.DIAS=[
 {n:1,sem:"Segunda",tit:"Fundamentos do corretor",tipo:"Básico · 1ª rodada",
  obj:"Primeira volta pelos 18 capítulos do TTI+: profissão, técnica, pessoas, números e estágio."},
 {n:2,sem:"Terça",tit:"Aprofundamento",tipo:"Básico · 2ª rodada",
  obj:"Segunda volta, reforçando o que ficou fraco na segunda-feira e avançando nos temas de lei, documentos e vendas."},
 {n:3,sem:"Quarta",tit:"Consolidação do básico",tipo:"Básico · 3ª rodada",
  obj:"Fecha o conteúdo básico do TTI+: leis, documentos, cálculos e atendimento."},
 {n:4,sem:"Quinta",tit:"Avaliação de Imóveis (AVI)",tipo:"AVI",
  obj:"Apostila Digital AVI: história e normas, métodos avaliatórios, PTAM, perícia judicial e prática."},
 {n:5,sem:"Sexta",tit:"Desafio e revisão geral",tipo:"Avançado",
  obj:"Questões de nível mais difícil de todas as áreas, em ordem de aprendizado, e revisão final dos erros da semana."}
];
