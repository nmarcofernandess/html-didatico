---
name: montagem
description: "Entrada direta, para quando pedem pelo nome a montagem, a anatomia ou o blueprint de componentes, ou invocam esta skill. Investiga e desenha em HTML como componentes se montam: primitivos, features, consumidores, árvore, children, slots, types, props e propostas. É a forma do 'como isso se monta'."
---

# Montagem

1. **Núcleo.** Siga o [Núcleo](../../references/nucleo.md). O nó aqui é a
   fronteira: o que a peça entrega e o que o consumidor compõe.
2. **Playbook.** Leia o [playbook Montagem](../../references/playbooks/montagem.md)
   e abra sua receita exemplar. Investigue mapas, patterns, imports, JSX, tipos e
   consumidores do componente específico até a fronteira real.
3. **Desenho.** Apresente do primitivo ao consumidor: árvore de arquivos,
   montagem progressiva à esquerda e contratos e valores à direita. Diferencie
   import de renderização, origem de children e slots, e hooks de caixas de UI.
   Identifique deltas localmente. O arquivo cumpre o
   [contrato HTML](../../references/html-portatil.md).
4. **Entrega.** Confira cada relação e API contra a fonte, ou marque a lacuna e a
   proposta. Diga o que foi visto rodando, o que foi lido e a objeção mais forte.
   Inspecione o HTML no render quando pedido ou necessário. Não invente APIs para
   fechar o desenho.

A montagem desenhada não comprova runtime. Se a pergunta é onde ficam as regiões
da tela, use Decidir; para resultados de execução, Prova. Veja o
[roteamento](../../references/roteamento.md).

Toda entrega abre ancorada e calibrada: altura, profundidade e distância
decididas antes de montar, e a origem que situa quem não viu a conversa
([Padrões](../../references/padroes.md#abertura-ancorada)). Entregue, se algo
foi uma forma excepcional de explicar, registre a candidata no
[Acervo](../../references/acervo.md).
