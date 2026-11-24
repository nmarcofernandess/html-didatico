# Canvas: criar, publicar, conferir

## Onde a página mora

- **Canvas existente do assunto** (ex.: "O que é um exame"): a página de decisões
  entra nele. Leia o artifact (`Artifact read` com `paths`) antes de publicar; a
  versão viva pode ser mais nova que a sua cópia.
- **Sem canvas**: `Artifact quickstart` com `intent: "design"` e crie pelo tipo
  Design.

## O design system HTML Didático no canvas

Os boards são marcação do kit, vestida pelo `bundle.css` do design system
[HTML Didático](https://claude.ai/artifact/4qkdmqk1fvJZK58isz2Uqa), que é o
`kit.css`. O canvas guarda uma cópia, em `project/ds/hd/`, e um registro em
`canvas.json#designSystems`. Instale, ou atualize, num publish só, seguindo
`artifact-type/reference/design-system-components.md` do próprio canvas:

```
files:
  "project/ds/hd/components/bundle.css": { "artifact": "https://claude.ai/artifact/4qkdmqk1fvJZK58isz2Uqa", "path": "project/components/bundle.css" }
  "project/ds/hd/tokens.json":           { "artifact": "https://claude.ai/artifact/4qkdmqk1fvJZK58isz2Uqa", "path": "project/tokens.json" }
  "project/canvas.json": com o registro
    { "title": "HTML Didático", "namespace": "hd", "artifact": "https://claude.ai/artifact/4qkdmqk1fvJZK58isz2Uqa",
      "version": "<versão que a ferramenta informa>", "copiedAt": "<agora>" }
```

Os boards não carregam o `bundle.js`: a marcação já chega montada. O motor recusa
canvas sem esse registro. Um canvas pode ter também o DietFlow DS, para outras
páginas; os boards não o usam.

Quando o kit muda (componente novo, ajuste de CSS), o design system é publicado de
novo (`docs/MANUTENCAO.md` no repositório) e a cópia do canvas é atualizada com
os mesmos dois arquivos.

## Fontes versionadas

Baixe o `project/` do canvas para uma pasta versionada (pasta da spec, ou
`~/devkit/.Docsdietflow/specs/<assunto>/canvas/`), com `project/ds/` e
`artifact-type/` no `.gitignore`. O arquivo de decisões fica ao lado, em
`gerador/decisoes.mjs`. No devkit, edite numa worktree (`git worktree add
.worktrees/<nome> -b <nome> origin/main`): o checkout principal fica em `main` e o
hook do DietFlow nega Write ali. Ao fim, `git push origin <nome>:main` e
`git -C ~/devkit merge --ff-only origin/main`. Nunca `git add .`: há trabalho
de outras sessões no devkit.

## Publicar

```
Artifact publish
  url: <canvas>
  root: <pasta que contém project/>
  file_path: <root>/project/canvas.json
  files: { "project/<mapa>.dc.html": …, "project/D01.dc.html": …, … }
```

O motor imprime a lista exata. Outras páginas que apontem para a página nova
(roadmap, aula) mudam no mesmo publish.

## Conferir

1. Abra o canvas no navegador do app, entre no modo Play pelo hash de um board
   (`#play-D01`) e siga "Próxima" de board em board. Para sair do Play, a seta ‹
   do cabeçalho; nunca Escape.
2. Em cada board: as figuras aparecem desenhadas (não como texto corrido), o líder
   de cada figura aparece na largura do painel, e o texto não tem código de nota
   nem número com ponto decimal.
3. Um board no celular (`resize_window` preset `mobile`), depois volte para
   `desktop`.
4. Modo canvas, página da decisão: nenhum artboard corta a "Sua resposta".
5. `olho-semicerrado` sobre o conjunto; um lote de consertos (conteúdo, ordem,
   hierarquia, espaço, acabamento) e uma confirmação.

O frame do board é de outra origem: JavaScript da página não mede a altura do
conteúdo. Ajuste `ALTURAS` pelo modo canvas.
