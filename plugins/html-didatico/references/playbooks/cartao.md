# Cartão · uma dúvida da conversa em uma página

O cartão responde a uma dúvida que apareceu no meio do trabalho: um defeito, uma
feature, um "como isso funciona", um exemplo pedido. É uma página só, que se lê
sem a conversa ao lado e mostra a resposta em figuras. Ele dispensa a capa longa,
o trilho, as abas e o fecho do documento. O nó, a ficha de fatos, o kit e as duas
leituras de revisão continuam valendo.

Este playbook soma ao [didático](didatico.md): fontes, kit e figuras seguem de lá.

## Quando é cartão

| O pedido | Entrega |
|---|---|
| "Me mostra", "desenha isso", "não entendi X"; um defeito, uma feature ou um exemplo em pauta na conversa | Cartão |
| Até três perguntas sobre o mesmo caso | Cartão |
| Um assunto inteiro, uma operação com vários passos, o raciocínio longo de quem pediu | [Documento](didatico.md) |
| Várias decisões abertas, ou um assunto que vai receber respostas e voltar | [Aula](aula.md) |

Entre cartão e documento, sem outra pista, faça o cartão: ele sai rápido, e o que
não couber nele mostra o tamanho que o documento precisa ter.

## Base

Crie o arquivo pela cópia do [cartão-ouro](../kit/ouro/cartao.html), com o comando
abaixo, a partir da raiz do plugin:

```
node scripts/montar.mjs --novo cartao <destino.html>
```

O kit chega inteiro na cópia. Troque o título, a capa e o conteúdo do `<main>`; o
bloco do kit e o sprite ficam como estão. Sem Node, copie o arquivo com `cp`.
Página escrita do zero não é cartão: o [check](../../scripts/check.mjs) reprova
documento fora do kit.

## Anatomia

Cinco peças, nesta ordem. O cartão-ouro traz todas.

| Peça | O que é | Marcação |
|---|---|---|
| A pergunta | O título: a dúvida com o caso real, como a pessoa a faria | `h1` na `cover` |
| A resposta | Uma frase, com o número do caso | `cover__sub` |
| Em pauta | A situação, para quem não leu a conversa, ao lado da cena em que a dúvida aparece | `part part--side` com `prose brief` e a primeira figura |
| As outras perguntas | Uma parte por pergunta: o título-pergunta, uma frase e a figura que a responde | `part` com `prose` e `fig` |
| O que falta e a fonte | A decisão ou o passo que fica, e de onde vêm os fatos | `note` e `src` |

## Em pauta

É o parágrafo que mantém o cartão de pé fora da conversa. Quem o recebe depois,
sem o chat, precisa saber que situação montar, por que ela importa e o que
responderia à pergunta. Comece na situação concreta e diga, em até 90 palavras:

- onde a pessoa está, com o nome que a tela mostra, e o que já existia;
- o gesto que ela faz, ou o que muda;
- o que aparece, com a data, o valor e a mensagem reais;
- a consequência que importa;
- o que falta descobrir, decidir ou entregar.

| Em pauta está | Acrescente |
|---|---|
| Um defeito | O que aparece, o que deveria aparecer e o gesto para conferir |
| Uma feature | Quem passa a conseguir o quê, com que regra, e o que muda no que já existe |
| Um "como funciona" | A coisa e o caso que a atravessa |
| Um exemplo | O caso com os valores e o que ele demonstra |
| Uma escolha pontual | A situação que faz a pergunta existir e as saídas, no mesmo caso |

"Isso", "aquele campo" e "o problema de ontem" viram o nome da tela, do campo e
do estado. Dado acrescentado para ilustrar aparece rotulado como hipotético.

## As perguntas e as figuras

Liste as perguntas que a dúvida abre. Para cada uma, escolha a representação em
que a resposta se vê, pela tabela de [Conteúdo](../conteudo.md#3-espinha). No
cartão-ouro são três:

| Pergunta | Representação | Por quê |
|---|---|---|
| Onde a inconsistência aparece? | A ficha, com Data clínica e Idade lado a lado | É o que a pessoa vê na tela |
| De onde vêm os dois anos? | A linha do tempo, do nascimento ao dia em que o Cálculo foi aberto | A diferença está nos eventos entre duas datas |
| O que mexe na idade? | A tabela de gestos | São vários gestos contra o mesmo campo |

- **A primeira figura é a cena do Em pauta:** onde a dúvida aparece, como a pessoa
  a vê.
- **Cada figura responde a uma pergunta que as outras deixam aberta.** Duas
  figuras para a mesma pergunta viram uma.
- **Todas usam o mesmo caso e os mesmos números.**
- **A legenda diz a conclusão,** com o dado do caso.

## Tamanho

De uma a três perguntas, até quatro figuras e cerca de 280 palavras de prosa. A
frase de cada parte diz o que a figura sozinha deixaria ambíguo, em uma linha. A
consequência cabe em uma frase do Em pauta. O caminho da investigação fica na
conversa.

A quarta pergunta, um segundo caso ou uma lista de decisões pedem documento ou
aula.

## Revisão: duas leituras

1. **Sem a conversa.** Cubra tudo, menos o Em pauta. Um dev que recebe só esse
   parágrafo sabe que situação montar, por que ela importa e que resultado
   responde à pergunta? Onde a resposta é "depende de ter lido o chat", troque o
   termo genérico pelo fato que falta.
2. **Só pela figura.** Faça a [leitura pela figura](../visual/design.md#leitura-pela-figura):
   para cada pergunta, cubra a prosa e confira o que a figura e a legenda mostram
   sozinhas.

## O que não passa

| Não passa | Faça |
|---|---|
| Página própria, fora do kit | `--novo cartao`, e só o `<main>` muda |
| Cartão de texto: título e parágrafos em caixas | A figura em que a resposta se vê |
| A mesma ideia em várias partes | Uma pergunta, uma parte |
| Em pauta que só entende quem leu o chat | Onde, o gesto, o que aparece, o que falta |
| Figura que ilustra o assunto | Figura que responde à pergunta, com o caso |
| Trilho, abas, carimbo, "por que importa" em parte própria | Isso é de documento; aqui a consequência é uma frase |

## Entrega

O arquivo e, em poucas linhas: cada pergunta com a figura que a responde, as
fontes lidas e o que não foi conferido.
