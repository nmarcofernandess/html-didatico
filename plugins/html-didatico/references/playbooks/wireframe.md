# HTML Wireframe · maquetes e decisões de interface

A pergunta é onde ficam as regiões e como a interface se comportaria. Declare
`WIREFRAME · REV N`, o recorte, estados representados e o que é proposta. Uma
maquete pode bastar; alternativas entram quando ajudam a decidir uma estrutura.
A aprovação expressa intenção de produto, sem comprovar implementação nem
escolher automaticamente componentes para o produto.

Leia a [receita visual](../visual/wireframe.md) e abra o
[exemplo D](../exemplos/D-prancha-unidade-exames.html). O exemplo histórico tem
conteúdo de domínio próprio: não copie seus dados nem presuma seu estado atual.

## Desenho

- Mostre hierarquia, regiões, navegação, ações e estados pertinentes. Anote origem
  e destino das interações; controle demonstrativo é rotulado como simulação.
- Conteúdo indecidido usa caixas neutras e labels de função. Copy real só quando
  for conhecida ou fizer parte da decisão; nenhum texto inventado vira fato.
- Use papel técnico, grafite, linha de construção de 1 px e uma cor de revisão
  na região em disputa. Hachura marca a mudança; cotas explicam medidas/relações.
  Sem numerais gigantes, sombras ou decoração de manual.
- Tema escuro, se útil, pode usar cianotipia pelos tokens da receita; testar seus
  estados não autoriza alterar o tema do produto.

## Comparação, quando pedida

Opções da mesma estrutura mantêm o mesmo esqueleto, volume e viewport. Destaque
só a diferença. Cada opção informa custo concreto: cliques, visibilidade,
reaprendizado ou trabalho necessário. Recomende uma quando a evidência permitir;
se faltar decisão essencial, explique a lacuna sem inventar preferência. Uma
opção ruim riscada pode explicar um limite concreto.

Feche com decisões pendentes numeradas e uma recomendação sustentada. Se não
houver decisão pendente, registre o resultado e seus limites em vez de fabricar
uma pergunta. Em nova revisão, acrescente “o que mudou”.

Confira comparação, ordem de leitura e controles nas larguras relevantes pelo
contrato HTML compartilhado. Não converta o HTML em código de produto como
consequência da aprovação. A implementação usa os componentes e patterns reais.
