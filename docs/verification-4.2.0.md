# Verificação da 4.2.0

27/11/2026, a partir da 4.1.0 (PR #2). Motivo: uma aula sobre os testes do DietFlow abriu no meio da conversa, com jargão sem origem, e ficou ilegível para quem a abrisse um mês depois.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 4.2.0, sete skills, sete manifestos, 382 links e âncoras resolvidos; `acervo/` fora do pacote |
| `node scripts/montar.mjs` | 56 componentes (com `d-origin`) e 8 exemplos-ouro regerados |
| `check.mjs` nos oito exemplos-ouro e em `pecas.html` | Sem falhas. Avisos iguais aos da 4.1.0, mais "tela mais carregada" em explicação (166) e prova (180): a origem empurra a primeira parte para a mesma janela de leitura; a origem em si não conta na densidade |
| Boards do exemplo, `gerar.mjs --html` | Mapa com `d-origin` e duas decisões, sem falhas. Sem `MAPA.onde`, o motor recusa: "MAPA.onde em texto" |
| `check.mjs` na aula-ouro da 4.1.0 | Reprova: "documento sem origem" |
| `check.mjs` na aula-ouro sem `date` na capa | Reprova: "capa sem data" |
| `check.mjs` numa prova com origem sem `where` | Reprova: "`<d-origin>` sem where" |
| Render da prova-ouro em 1280 e 390 px | Origem entre a capa e a primeira parte, três linhas e os termos; em 390 px, rótulo acima do valor |

Limites: o design system no Claude e o `bundle.css` dos canvas ainda não vestem `d-origin`; a branch `acervo` nasce no primeiro registro, a partir de `main`; a tag `v4.2.0`, a release e a instalação local ficam para depois do merge.
