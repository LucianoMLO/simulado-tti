/* Módulo Números — simulado DESAFIO (n=2, 7 questões). A 1ª alternativa é a correta. */
const NX="Números";

Q("NUM-D01",NX,"Matemática descomplicada",2,
 "Um imóvel de R$ 400.000,00 valoriza 10% em um ano e, no ano seguinte, desvaloriza 10%. Qual é o valor final?",
 ["R$ 396.000,00","R$ 400.000,00","R$ 404.000,00","R$ 440.000,00"],
 "Aumentos e descontos sucessivos não se somam: multiplique os fatores 1,10 e 0,90.",
 "400.000 × 1,10 = 440.000; 440.000 × 0,90 = 396.000. A apostila alerta: quando há aumentos e descontos sucessivos, não basta somar ou diminuir as porcentagens (+10% − 10% não retorna ao valor inicial).",
 "Números · Matemática descomplicada, 3.6 (p. 215–216)");

Q("NUM-D02",NX,"Matemática descomplicada",2,
 "Uma pessoa investe R$ 20.000,00 em fundo que promete 0,8% ao mês (juros compostos). Quanto terá acumulado após 2 anos?",
 ["Aproximadamente R$ 24.214,90","Aproximadamente R$ 23.840,00","Aproximadamente R$ 22.400,00","Aproximadamente R$ 21.600,00"],
 "O tempo deve estar na mesma unidade da taxa: 2 anos = 24 meses.",
 "M = 20.000 × (1,008)^24 ≈ 20.000 × 1,2107 ≈ R$ 24.214,90. Com juros simples seria 20.000 × (1 + 0,008 × 24) = 23.840, e o composto rende mais. A alternativa 3 usa apenas 12 meses de juros simples.",
 "Números · Matemática descomplicada, 3.7 e 3.8 (p. 216–219)");

Q("NUM-D03",NX,"Matemática descomplicada",2,
 "Um capital de R$ 2.000,00 em juros compostos virou R$ 2.165,00 após 4 meses. A taxa mensal foi de aproximadamente:",
 ["2%","4%","8,25%","0,41%"],
 "Isole (1 + i)^4 = 2.165 ÷ 2.000 e depois extraia a raiz quarta.",
 "(1 + i)^4 = 1,0825 → 1 + i ≈ 1,02 → i ≈ 2% ao mês. Conferência: 2.000 × 1,02^4 ≈ 2.164,86. A alternativa 3 é a taxa total no período (8,25%), não a mensal.",
 "Números · Matemática descomplicada, 3.7 e 3.8 (p. 217–219)");

Q("NUM-D04",NX,"Matemática descomplicada",2,
 "Empréstimo de R$ 120.000,00, em 3 prestações anuais, a 15% ao ano, pelo SAC. Qual o valor da 3ª prestação?",
 ["R$ 46.000,00","R$ 58.000,00","R$ 52.557,00","R$ 40.000,00"],
 "No SAC a amortização é constante (120.000 ÷ 3); os juros incidem sobre o saldo devedor.",
 "Amortização = 40.000 por ano. 1ª: juros 18.000 + 40.000 = 58.000. 2ª: saldo 80.000, juros 12.000 → 52.000. 3ª: saldo 40.000, juros 6.000 → 46.000 (decrescentes). R$ 52.557,00 é a prestação constante da tabela Price para o mesmo empréstimo; 40.000 é só a amortização.",
 "Números · Matemática descomplicada, 3.9 (p. 220–221)");

Q("NUM-D05",NX,"Formas de comprar e vender",2,
 "Um imóvel de R$ 400.000,00 será financiado em 80% do valor. Considerando que a parcela máxima é 30% da renda bruta, e que a primeira parcela será de R$ 2.400,00, qual a renda bruta mínima do cliente e o valor da entrada?",
 ["Renda mínima de R$ 8.000,00 e entrada de R$ 80.000,00.",
  "Renda mínima de R$ 7.200,00 e entrada de R$ 320.000,00.",
  "Renda mínima de R$ 8.000,00 e entrada de R$ 320.000,00.",
  "Renda mínima de R$ 720,00 e entrada de R$ 80.000,00."],
 "Parcela = 30% da renda → renda = parcela ÷ 0,30. Entrada = 20% do valor.",
 "Renda mínima = 2.400 ÷ 0,30 = R$ 8.000. Financiado: 80% de 400.000 = 320.000; entrada: 20% = R$ 80.000 (que pode ser composta com FGTS). A apostila cita 80% de financiamento e parcela máxima de 30% da renda bruta nos programas habitacionais; bancos costumam exigir 10% a 20% de entrada.",
 "Números · Nichos de atuação e Formas de comprar, 2.12 e 1.2 (p. 32–33; Números p. 191)");

Q("NUM-D06",NX,"Economia e finanças",2,
 "Um corretor tem custos fixos de R$ 3.200,00 por mês. Em um ano, 5 meses ficaram abaixo da sua renda média. Qual o valor da reserva pulmão e o intervalo ideal da reserva de emergência?",
 ["Reserva pulmão de R$ 16.000,00; reserva de emergência ideal entre 9 e 12 meses dos custos mensais.",
  "Reserva pulmão de R$ 3.200,00; reserva de emergência de 1 mês de custos.",
  "Reserva pulmão de R$ 16.000,00; reserva de emergência de 3 meses de custos.",
  "Reserva pulmão de R$ 38.400,00; reserva de emergência desnecessária."],
 "Reserva pulmão = N × custos fixos; emergência: de 9 a 12 meses.",
 "R = N × custos fixos = 5 × 3.200 = R$ 16.000. A reserva de emergência é calculada sobre os gastos (média de 2 ou 3 meses) e o ideal é entre 9 e 12 meses de custos mensais. Despesas fixas se repetem todo mês; variáveis ocorrem esporadicamente.",
 "Números · Economia e finanças, 2.7 (p. 203–206)");

Q("NUM-D07",NX,"Formas de comprar e vender",2,
 "Um cliente propõe comprar um imóvel pagando R$ 150.000,00 em espécie e já foi proprietário do mesmo imóvel. Qual a conduta correta do corretor, segundo a apostila?",
 ["Comunicar a proposta ao COAF por meio eletrônico em até 24 horas, sem avisar o cliente, pois há sinais de operação suspeita.",
  "Avisar o cliente de que a operação será comunicada ao COAF e prosseguir.",
  "Prosseguir normalmente, pois o pagamento em espécie é livre de qualquer comunicação.",
  "Comunicar apenas se o negócio for concluído, no prazo de um ano."],
 "Dois sinais: dinheiro em espécie a partir de R$ 100 mil e comprador que já foi dono do imóvel.",
 "São operações suspeitas: pagamento ou recebimento em espécie igual ou superior a R$ 100.000 e comprador que tenha sido anteriormente dono do imóvel. A proposta (mesmo sem conclusão) deve ser comunicada ao COAF eletronicamente em até 24 horas, e o agente é proibido por lei de avisar o cliente. A política de prevenção à lavagem de dinheiro é responsabilidade da imobiliária e do corretor.",
 "Números · Formas de comprar e vender, 1.4 (p. 193)");
