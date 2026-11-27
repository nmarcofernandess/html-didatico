---
data: 2026-11-26
forma: board de decisão
assunto: DietFlow · modelo de treino no Cálculo
artifact: https://claude.ai/artifact/SKtc4H3Dj29KVZtaGjbDn5 (não abriu na conta que fez este registro; descrito pelo relato de campo)
plugin: skill não identificada no relato; 13 versões
---

# Board de decisão com a matriz de situações, casos rodados por script e controles para mexer

**A pergunta.** Qual modelo de treino o Cálculo adota?
**O que funcionou.** Segundo o relato: na mesma tela, a matriz de situações, os casos calculados por script (não digitados) e controles com que quem decide mexe na transição. As primeiras versões falharam por tema escuro quebrado, transição descrita em texto e figura sem dizer se era main, dev ou proposto. A versão final foi aprovada e pedida como molde da aula seguinte.
**Por que funcionou.** Quem decide testou a regra em vez de ler sobre ela, e viu todos os casos.
**Regra candidata.** Regra que é transição ganha uma peça que o leitor mexe; a página é vista nos dois temas antes de sair.
**Onde entraria.** Canonizada em 4.4.0 (`w-states`, `w-sim`, check com tema escuro e controles). Falta estudar o artifact por dentro para tirar o layout que foi elogiado.
