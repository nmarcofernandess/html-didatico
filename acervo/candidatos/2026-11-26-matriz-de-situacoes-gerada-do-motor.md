---
data: 2026-11-26
forma: aula (aba Dúvidas)
assunto: DietFlow · nomes e dias dos cenários do Cálculo
artifact: https://claude.ai/artifact/UhkEVR2G37G9TqP8qnUkCp
plugin: feito fora do kit, numa aula de 17 versões
---

# Matriz de 16 situações de treino nos três modos, gerada pelo motor

**A pergunta.** Que nome, dias e horário cada cenário recebe em cada modo, e a regra é coerente em todas as situações?
**O que funcionou.** Uma matriz com uma linha por situação (16) e uma coluna por modo (3). Cada célula é o cenário como o card o mostra: nome, os sete dias com os ativos marcados, horário e o total. A linha diz o caso em uma frase e o gasto por dia. Uma legenda no topo fixa a pessoa do caso e diz que nomes, dias e números saíram do gerador do produto.
**Por que funcionou.** Com um caso só não dava para ver se a regra tinha congruência; com todos lado a lado, quem decidia respondeu na hora.
**Regra candidata.** Regra que vale para muitas situações se decide na matriz inteira, gerada da fonte, com o caso do pedido marcado.
**Onde entraria.** Canonizada em 4.4.0 como regra (Padrões, "A forma segue o conteúdo"; Decisão). Falta o componente: uma matriz de células ricas (mini-semana, horário, total) e um gerador que leia o JSON do motor.
