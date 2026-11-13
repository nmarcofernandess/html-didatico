# Verificação do kit de HTML Didático 2.1.0

Registro do que foi executado e observado ao preparar a 2.1.0, em 13/11/2026, e
do que ficou sem verificação. A preparação partiu do commit `d019ac5` (2.0.0).

## O que mudou

HTML Didático passa a nascer de um kit em `plugins/html-didatico/references/kit/`.
O playbook didático virou um processo de sete passos; `conteudo.md` e
`visual/design.md` são os donos de conteúdo e de design; `scripts/check.mjs`
renderiza e mede. As cinco entradas públicas e o roteamento não mudaram.
Saíram `visual/sistemas.md`, `visual/tokens-editorial.md` e
`visual/anatomia-editorial.md`. HTML Wireframe, HTML Blueprint, HTML Proof e
Explicar com Clareza não foram alterados; Proof continua na receita de manual
(`tokens-manual.md`, `anatomia-manual.md`, `dioramas.md`).

## Verificações executadas

Ambiente: contêiner Linux, Node 22, Playwright 1.63 com Chromium 153, Python 3.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.1.0, cinco skills, sete manifestos |
| `check.mjs` em `ouro/passo-a-passo.html` | Sem falhas. Um aviso mantido: três perguntas respondidas na hora, texto do manual original preservado |
| `check.mjs` em `ouro/explicacao.html` | Sem falhas, sem avisos |
| `check.mjs` em `kit/pecas.html` | Sem falhas. Um aviso mantido: 12,4% do texto em mono, por ser catálogo de nomes de classe |
| `check.mjs` em `kit/starter.html` | Falha esperada: os marcadores `{{…}}` do molde são resíduo até serem preenchidos |
| `montar.mjs --atualizar` em exemplo-ouro | Idempotente: o arquivo sai igual |
| Screenshots em 390, 768 e 1280 px | Lidos nos dois exemplos-ouro e na folha de peças |

O mesmo `check.mjs`, rodado no exemplo A original, mediu 59 textos abaixo de
11px, 42 pares abaixo do contraste mínimo, 43 rótulos em maiúsculas com
espaçamento, 30,4% do texto em mono, 28 cores fora de token e 56 espaçamentos
fora de escala. No exemplo-ouro refeito, esses números são 0, 0, 0, 10,9%, 0 e 0.

## Sem verificação

- **Fontes do macOS.** O contêiner não tem Futura nem Avenir Next; os screenshots
  usaram a fonte de fallback. Rode o check num Mac antes da release.
- **`file://` de outra pasta, impressão e teclado** não foram exercitados.
- **Teste de uma leitura** com leitor de contexto limpo não foi feito nos
  exemplos-ouro.
- **Instalação nos hosts** (Codex, Claude Code, Cursor, plugin remoto) e a tag
  `v2.1.0` dependem da release.
- **Modo sistemas** tem as peças no kit e na folha de peças, sem exemplo-ouro
  próprio.
