# Peças das figuras

As figuras dos boards são componentes do [kit](../kit/componentes.md), os mesmos
de qualquer documento do HTML Didático. Escolha pela pergunta que o quadro
responde; a [folha de peças](../kit/pecas.html) mostra cada um desenhado.

| O quadro mostra | Componentes |
|---|---|
| Um campo, um formulário, o valor que entra ou é recusado | `w-win` com `w-field` (`value`, `unit`, `tone`, `icon="lock"`) e, se houver, `w-msg` com o aviso |
| Linhas de pedido, resultado ou cadastro, com status | `w-win` com `w-list` e `w-item` (`title`, `meta`, `tag`, `tagtone`, `on`, `off`) |
| O que a busca acha | `w-win` com `w-field state="caret"` e `w-menu` |
| Uma escolha entre poucas opções | `w-seg`, `w-chip`, `w-toggle` |
| Uma tabela de fatos (fase × faixa, coleta × condição) | `table class="table"` dentro da `w-fig`, só com as colunas que o quadro discute |
| Curva no tempo, com a faixa de referência | `w-line` com `w-pt` (`band`, `unit`, `min`, `max`; `off` para o ponto que não plota) |
| Quantidades comparadas | `w-bars` com `w-val` |
| O número que decide | `w-stat`, um por cena |
| Datas absolutas do caso | `w-timeline` com `w-when` |
| Quem chama quem, o que roda antes | `w-flow`, `w-layers`, `w-box` |
| Dois lados de um quadro | `d-cols n="2"` com uma `w-fig` por lado |
| O print do produto, quando a decisão é sobre a tela real | `w-shot` |
| O dado de que o quadro fala | A caneta: `mark`, `pin` e `w-callout pin mark` |

## Regras

- O board é marcação pronta, sem script: abas (`d-tabs`) e conferência (`d-check`)
  ficariam paradas. Numa figura de board, mostre o estado que a frase discute.
- Um quadro, uma cena: a figura prova a frase e nada mais.
- Mesmo caso e mesmo número em todas as figuras de uma decisão.
- Status segue a regra do sistema: faixa de referência = Adequado; vizinha com
  outra além = Limítrofe alto ou baixo; ponta = Alto ou Baixo. Calcule com as
  faixas reais do catálogo antes de escrever `tag`.
- Número com vírgula decimal, como se lê (`5,5`, `1.000`).
- Ícone só do sprite do kit; nunca emoji nem desenho à mão.
- `<div>` com borda imitando card, modal ou campo não entra: use o componente.
  Se falta um, ele entra no kit, com exemplo, antes do board.
