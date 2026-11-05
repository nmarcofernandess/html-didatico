# HTML de proof — os dois modos

Um HTML de proof responde a uma pergunta só: **isto funciona, de verdade, neste
código?** Ele mostra prints datados e as asserções que a execução fez. Não é
apresentação nem relatório de opinião.

A skill atende dois modos. Descubra qual antes de abrir uma tag.

## Modo 1 — o projeto tem um renderer oficial

Procure no repositório um gerador de packs (no DietFlow:
`scripts/proof/render-pack.ts` + `scripts/proof/proof-pack.css`, contrato em
`docs/proofs/CONTRATO-PROOF-PACK.md`). Se existir:

- **O HTML oficial nunca é escrito à mão.** Ele nasce da execução, pelo renderer.
  Escrever ou editar o `index.html` publicado falsifica a prova.
- A skill entra **no renderer**: tokens, anatomia e primitivos do CSS e do
  template. Mudou o visual? Muda o renderer, e todos os packs mudam juntos na
  próxima regeneração.
- O renderer do DietFlow já é a Direção A/C desta skill (mesmos tokens, `doc-plate`,
  `cover`, `.prova`, `.status-slot`, `.where`, callout `.ia`). Mantenha a
  correspondência: um ajuste aqui deve poder ser aplicado lá sem tradução.
- **Um proof novo não começa aqui.** Começa no contrato do projeto. No DietFlow:
  `docs/proofs/CONTRATO-PROOF-PACK.md` §5 (como criar um pack), a skill do
  repositório `.agents/skills/proof-canonico` e `docs/ci/PROOF-NAVIGATION.md`.
  O caminho é flow no harness → descriptor → execução pela fila → renderer gera
  o HTML. Esta skill não repete esse contrato; ela só entra se o visual do
  renderer precisar mudar.
- Apresentação extra de uma spec (um mural, uma explicação) é outro documento,
  na pasta da spec. Ela pode citar o pack; não vira proof por mostrar prints.

## Modo 2 — não há renderer (ou a prova ainda não existe)

Use a **Direção C** (§2.1 do SKILL.md, anatomia em `receita.md` §10): um
documento de duas fases no mesmo arquivo.

1. **Rev. 0 · WIREFRAME** — nasce antes da execução. Uma seção por PR/merge real,
   cada `.prova` com o comando real, o critério de aceite tirado do PR e o
   `.print-slot` vazio (`▢ N prints — o que vai entrar`).
2. **Rev. 1** — o mesmo arquivo, preenchido com o resultado real: status, prints
   reais no `.print-slot`, ticket/SHA. O fechamento lista o que ainda falta.

## Anatomia de uma página de proof (vale para os dois modos)

```
doc-plate     id do pack · revisão · SHA · data absoluta
cover         o que este pack prova, em uma frase · veredito (passed/partial/failed)
gate          contador do gate de validade (console, pageerror, 5xx, login, 404)
bloc × N      uma seção por jornada ou caso; dentro, um .prova por etapa:
                id curto · status · o que ESTE print prova · checks executados
                · print (desktop e, quando a jornada pede, smartphone)
ia            o que falta, ou as observações da revisão
foot          fonte (comando/receita, ticket, commit)
```

## Leis da prova (destiladas de contratos reais)

1. **Print sem tese não é prova.** Cada etapa diz o que aquele print prova e quais
   asserções a execução fez. Sem isso, não entra.
2. **Verde honesto.** Etapa falha ou gate violado ⇒ `partial`/`failed`. Nunca
   `passed` por omissão. Prova prometida e não executada derruba o veredito.
3. **O print afirma o que mostra.** Se o fato está fora do quadro (abaixo da
   dobra, sob um toast, numa linha recolhida), o print não sustenta a etapa:
   ajuste o enquadramento, não a frase.
4. **Fonte real, nunca inventada.** Comando, ticket, SHA e critério vêm da
   execução e do PR. Slot vazio é honesto; slot preenchido com ficção não é.
5. **Regeneração no mesmo lugar.** O nome do arquivo não leva data; a data vive
   dentro do documento. O histórico é o git.
6. **Orçamento.** Poucos prints, cada um sustentando uma decisão visual distinta.
   Contagem, SQL e matriz agregada são fatos de máquina, não PNG.
7. **Um dono por célula.** Duas proofs não provam a mesma coisa; uma cita a outra.

## Antes de entregar

- O veredito no topo bate com as etapas?
- Cada etapa tem tese + checks + print que mostra o fato?
- Comando, ticket e SHA são reais e conferem com a execução?
- No Modo 1, nenhum byte do HTML oficial foi escrito à mão?
