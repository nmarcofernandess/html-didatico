---
data: 2026-11-26
forma: página única de comparação
assunto: DietFlow · cabeçalhos de cenário nos PDFs do Cálculo e da Dieta
artifact: https://claude.ai/artifact/34iKK4wVLtBY7x6KaRoz2o
plugin: feito sem o plugin
---

# O documento real, recortado, em três estados lado a lado

**A pergunta.** Como ficam os nomes, a ordem e os dias dos cenários nos documentos depois das decisões?
**O que funcionou.** Para cada caso (um por modo), três recortes do PDF de verdade, na mesma linha: dev com o commit, a branch em fechamento com o commit, e o proposto. O recorte é só o trecho que muda (o cabeçalho de cada cenário), sem o resto da página. Abaixo de cada imagem, o mesmo conteúdo em texto, para comparar sem zoom. No fim, uma nota de como foi gerado: o motor de cada árvore, as mesmas entradas, a rota de exportação.
**Por que funcionou.** A descrição em texto das mesmas mudanças não tinha permitido decidir; o documento real permitiu uma decisão com nuance.
**Regra candidata.** Mudança no que o produto gera se mostra com o artefato real recortado, um por estado, com o estado e o commit ditos.
**Onde entraria.** Canonizada em 4.4.0 como regra (`w-fig state`, a ordem de preferência em Design). Falta um exemplo-ouro com `w-shot` em três estados. A página tinha links para o PDF inteiro em cada figura: no kit, a fonte vai no `d-src`.
