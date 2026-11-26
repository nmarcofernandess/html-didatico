# Verificação da 4.1.0

26/11/2026, a partir da 4.0.1. Motivo: resposta copiada sem a pergunta ("pode deploy DEV", "dias segunda") não se entendia fora da página.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 4.1.0, sete skills, sete manifestos, 345 links e âncoras resolvidos |
| `node scripts/montar.mjs` | 55 componentes (com `d-answer` e `d-answers`) e 8 exemplos-ouro regerados |
| `check.mjs` nos exemplos-ouro gerados e em `pecas.html` | Sem falhas; avisos de densidade iguais aos da 4.0.1 (decidir 158→165 palavras, aula 227→216) e um em `pecas.html` pela peça nova |
| `check.mjs` no decidir-ouro da 4.0.1 | Reprova: "dúvida sem `<d-answer>`" |
| `check.mjs` numa página com `navigator.clipboard` escrito à mão | Reprova: "cópia escrita à mão" |
| Boards do exemplo, `gerar.mjs --html` | Mapa e duas decisões, sem falhas, com `d-answer` |
| Página de exemplo com três decisões, no Chromium (Playwright) | 1A com comentário, 2A sem comentário, 3 só com comentário. O texto da área de transferência é igual à prévia, por decisão e no "Copiar respostas". Sem permissão de clipboard, a cópia por seleção também copia |

Texto colado na verificação:

```
Decisão 1 · O deploy desta semana pode ir para DEV antes de PROD?
Resposta: A · Pode deploy em DEV [1A]
Comentário: Só depois que o QA olhar o build.

Decisão 2 · Em que dia da semana o deploy em PROD acontece?
Resposta: A · Segunda-feira [2A]

Decisão 3 · Quem recebe o aviso de deploy?
Resposta: nenhuma opção marcada
Comentário: Preciso ver quem está de plantão antes.
```

Limites: o design system no Claude e o `bundle.css` dos canvas ainda não têm o CSS de `d-answer`; a tag `v4.1.0`, a release e a instalação local ficam para depois do merge.
