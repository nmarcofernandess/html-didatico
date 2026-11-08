---
name: proof-html
description: "Trabalha na apresentação de HTMLs de proof respeitando o renderer e o contrato reais do projeto; sem renderer, usa o wireframe de verificação da Direção C."
---

# HTML de proof

Entrada direta para o [contrato visual e os dois modos de proof](../html-didatico/references/proof-html.md).
Leia essa referência antes de editar qualquer prova.

1. Descubra se o projeto possui renderer oficial e leia seu contrato atual.
   Os caminhos do DietFlow na referência são pontos de partida a verificar,
   não caminhos universais.
2. Com renderer: novos packs seguem o harness, descriptor, fila e renderer do
   projeto. Esta skill entra no template/CSS quando a apresentação precisa
   mudar. Não escreva nem edite à mão o HTML oficial gerado.
3. Sem renderer: use [prova-final](../prova-final/SKILL.md) e a Direção C.
   A Rev. 0 nasce com slots vazios; o mesmo arquivo recebe a evidência real.
4. Confira tese, checks, enquadramento, comando, revisão e veredito. Evidência
   ausente, falha ou etapa não executada não pode virar `passed`.

Para tokens e anatomia, leia a [receita](../html-didatico/references/receita.md),
§§1, 4 e 10. A [skill principal](../html-didatico/SKILL.md) continua sendo a
fonte das regras visuais compartilhadas. Um mural com prints não se torna proof
por aparência, e esta entrada não amplia permissões de execução ou publicação.
