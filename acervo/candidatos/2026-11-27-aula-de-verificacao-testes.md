---
data: 2026-11-27
forma: aula
assunto: DietFlow · testes e provas de uma entrega com módulos em mudança
artifact: https://claude.ai/artifact/7dcJhq9myteJ4Ginp6NXkB
plugin: html-didatico 4.3.0
---

# Aula de verificação: dá para testar com a feature em andamento sem afrouxar teste nem regredir?

**A pergunta.** Dá para rodar os testes de uma entrega com módulos ainda em mudança sem afrouxar teste para passar e sem deixar a feature regredir? A suíte completa cobre tudo? As provas acompanham a arquitetura?
**O que funcionou.** Quatro abas, uma por pergunta, e cada pergunta com um desenho em vez de tabela de frases. A régua de alcance em `w-layers` (focal, prova de módulo, suíte completa, prova conjunta) tem o estado de cada degrau na `tag`. O mapa de famílias em `w-box` mostra o recorte com `mark` e o que não foi lido com `slot`. A cobertura da suíte usa duas `w-box`, dentro e fora. A triagem do teste vermelho é uma `w-matrix` causa × produto/teste/garantia, com a garantia em `mark`. O alinhamento das provas é uma `w-matrix` prova × (roteiro, rodou depois, publicada), com uma palavra por célula.
**Por que funcionou.** A resposta curta ("sim, nos degraus de baixo") fica visível na régua, e a diferença entre afrouxar e regredir aparece na matriz de causas: o teste muda a expectativa, nunca a garantia.
**Regra candidata.** Toda aula sobre testes, provas ou CI responde "dá para testar agora?" com uma régua de alcance e "o que fazer com um vermelho?" com uma matriz de causas.
**Onde entraria.** Já entrou como receita no playbook Aula (4.3.0, "Aula de verificação"). Pode virar exemplo-ouro de aula de verificação.
