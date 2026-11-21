# Verificação da 2.4.0

21/11/2026, a partir da 2.3.0 (`119839f`). Motivo: Marco pediu que a skill `decisoes-em-boards`, que vivia avulsa no Devkit e só aparecia no Claude Code, entrasse no plugin com seus exemplos e padrões, para chegar também ao Codex.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.4.0, seis skills |
| Motor do plugin contra o original do Devkit (`85f29158`) | Os dois exemplos, gerados sobre cópias das pastas `project/` reais do Devkit, saem byte a byte iguais nos dois motores: mapa, 11 boards e 4 boards, `decisoes.css` e `canvas.json` |
| Canvas sem DietFlow DS | O motor recusa e aponta `canvas.md` ao lado dele |

Limites: nenhum board foi publicado nem aberto no canvas nesta verificação; o motor não mudou de comportamento, só de pasta. As pastas `project/` do Devkit diferem da saída atual porque foram geradas antes de mudanças posteriores nos arquivos de decisões; isso é do Devkit, não do plugin.
