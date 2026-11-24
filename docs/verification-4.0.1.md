# Verificação da 4.0.1

24/11/2026, a partir da 4.0.0. Motivo: Marco pediu que o plugin não traga canvas nem design system do DietFlow; a tela de um produto entra remontada em wireframe com o kit, e o design system do próprio produto só entra quando já está no host.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 4.0.1, sete skills, sete manifestos, 332 links e âncoras resolvidos |
| `claude plugin validate` no plugin | Passou |
| Instruções do DietFlow no pacote | Nenhuma ocorrência de `origin/dev` ou devkit em `references/` e `skills/`; casos do DietFlow ficam só como conteúdo dos exemplos-ouro |
| Boards do exemplo-ouro, `gerar.mjs --html` | Grupo "Ficam como estão" e "Fica como está" na capa; o check passa nos três arquivos |
| Instalação local, depois da tag `v4.0.1` (`e04f2cd`) | Claude Code: de 4.0.0 a 4.0.1, registro em `e04f2cd`. Codex: marketplace readicionado com `--ref v4.0.1` e plugin reinstalado; 4.0.1 instalado e habilitado. Nos dois caches, `design.md` tem "O produto de quem pede" |

Limites: sessões já abertas não recarregam o catálogo; o Cursor não foi conferido.
