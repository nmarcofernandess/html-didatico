# Verificação da 2.6.0

21/11/2026, a partir da 2.5.0. Motivo: Marco recebeu do Codex uma aula da spec 162 (importações clínicas) fora do kit, com CSS próprio, 35 códigos de nota, oito pares de “Uma possibilidade / Outra possibilidade” e recomendações que não escolhiam. O check da 2.5.0 dava “Sem falhas” nela, porque só media o render da tab visível.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.6.0 |
| `check.mjs` na aula do Codex | 3 falhas: fora do kit, 35 códigos de nota, 16 opções sem nome |
| `check.mjs` na aula-ouro | Sem falhas; um aviso de tela com 236 palavras, das tabs Leis e Roadmap, que são tabela de texto por natureza |
| `check.mjs` em explicação-ouro, passo a passo-ouro, folha de peças e aula G | Sem falhas. O primeiro padrão de código reprovava `QS-001`, identificador real de tela no passo a passo; ficou restrito às letras de nota (C, D, R, Q) |
| Dúvida-ouro fotografada em 1280 e 390 px | Três figuras alinhadas lado a lado em 1280 e empilhadas em 390; a tabela vira lista com rótulo |
| Figuras lado a lado na explicação-ouro | Mesma altura depois da regra nova de `cols`, legenda alinhada |

Limites: o design system no Claude não foi republicado com o `kit.css` novo (`cols--3` e a altura em `cols`); `tools/design-system/gerar.mjs` rodou, e a publicação segue `docs/MANUTENCAO.md`. A aula do Codex não foi refeita.
