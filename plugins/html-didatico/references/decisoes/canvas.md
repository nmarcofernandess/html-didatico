# Canvas: criar, publicar, conferir

## Onde a página mora

- **Canvas existente do assunto** (ex.: "O que é um exame"): a página de decisões
  entra nele. Leia o artifact (`Artifact read` com `paths`) antes de publicar; a
  versão viva pode ser mais nova que a sua cópia.
- **Sem canvas**: `Artifact quickstart` com `intent: "design"`, crie pelo tipo
  Design e instale o DietFlow DS (`https://claude.ai/artifact/T9rFqZfSNdxXtk9iHNVhrm`)
  seguindo `artifact-type/reference/design-system-components.md` do próprio
  canvas: arquivos em `project/ds/dietflow/` e registro em
  `canvas.json#designSystems`. O motor recusa canvas sem o DS.

## Fontes versionadas

Baixe o `project/` do canvas para uma pasta versionada (pasta da spec, ou
`~/devkit/.Docsdietflow/specs/<assunto>/canvas/`), com `project/ds/` e
`artifact-type/` no `.gitignore`. O arquivo de decisões fica ao lado, em
`gerador/decisoes.py`. No devkit, edite numa worktree (`git worktree add
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
  files: { "project/decisoes.css": "project/decisoes.css", "project/<mapa>.dc.html": …, "project/D01.dc.html": …, … }
```

O motor imprime a lista exata. Outras páginas que apontem para a página nova
(roadmap, aula) mudam no mesmo publish.

## Conferir

1. Abra o canvas no navegador do app, entre no modo Play pelo hash de um board
   conhecido ou por um link, e siga "Próxima" de board em board. Para sair do Play,
   a seta ‹ do cabeçalho; nunca Escape.
2. Em cada board: o componente renderizou (não ficou caixa vazia), o líder de cada
   figura aparece na largura do painel, nenhuma coluna importante foi cortada, o
   texto não tem código nem número com ponto.
3. Um board com tabela no celular (`resize_window` preset `mobile`), depois volte
   para `desktop`.
4. Modo canvas, página da decisão: nenhum artboard corta a faixa "Responda no chat".
5. `olho-semicerrado` sobre o conjunto; um lote de consertos (conteúdo, ordem,
   hierarquia, espaço, acabamento) e uma confirmação.

O frame do board é de outra origem: JavaScript da página não mede a altura do
conteúdo. Ajuste `ALTURAS` pelo modo canvas.
