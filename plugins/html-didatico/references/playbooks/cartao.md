# Cartão · uma dúvida da conversa em uma página

O cartão responde a uma dúvida que apareceu no meio do trabalho: um defeito, uma
feature, um "como isso funciona", um exemplo pedido. O que chega a quem pediu é
pequeno: uma pergunta, o caso em uma linha e as telas do produto em que a
resposta se vê. A jornada para chegar a ele é a de todo documento: entender e achar o nó. O cartão é
curto porque o entendimento está pronto, e não porque o trabalho foi menor.

Este playbook soma ao [didático](didatico.md): kit e figuras seguem de lá; fontes e limites, do [Núcleo](../nucleo.md).

## Quando é cartão

| O pedido | Entrega |
|---|---|
| "Me mostra", "desenha isso", "não entendi X"; um defeito, uma feature ou um exemplo em pauta na conversa | Cartão |
| Uma dúvida que se explica em até três telas do mesmo caso | Cartão |
| Um assunto inteiro, uma operação com vários passos, o raciocínio longo de quem pediu | Aula, pelo [playbook didático](didatico.md) |
| Um assunto em construção, que vai receber respostas e voltar | Aula com tabs, pelo [playbook Aula](aula.md) |
| Uma ou mais decisões abertas, sem aula do assunto | [Decisão](../decisao.md) |

## A jornada

1. **Entenda antes.** Siga [Entender, antes de tudo](../nucleo.md#entender-antes-de-tudo)
   e ache [o nó](../nucleo.md#o-nó): num cartão que apresenta o
   que existe, o nó é a regra; num defeito, é o que prende.
2. **Conte a explicação em poucas frases,** para você, fora do cartão. No
   cartão-ouro foram seis: o contexto clínico dá a data do registro; a idade vem
   do nascimento; se a idade na data difere da de hoje, cadeado; se a data difere
   de hoje, o calendário avisa; o import mostra a data da fonte; o receptor
   mantém a sua.
3. **Marque as telas que essas frases citam.** Ali eram três: o editor do
   Cálculo, o modal de import e o dado trazido. Cada tela citada vira uma figura.
4. **Desenhe as telas no mesmo caso,** com os nomes que o produto mostra e os
   mesmos números de uma para a outra.
5. **Tire do texto o que a tela já mostra.** O que sobra de cada frase vira a
   legenda ou uma anotação curta ao lado da tela: "fica 05/11/2025".

Explicação que não cita tela nenhuma ainda não foi entendida no produto: volte
ao passo 1.

## Base

Crie o arquivo pela cópia do [cartão-ouro](../kit/ouro/cartao.html), a partir da
raiz do plugin:

```
node scripts/montar.mjs --novo cartao <destino.html>
```

Troque o título, a capa e o conteúdo do `<main>`; o bloco do kit e o sprite ficam
como estão. Sem Node, copie o arquivo com `cp`. Página escrita do zero não é
cartão: o [check](../../scripts/check.mjs) reprova documento fora do kit.

## Anatomia

| Peça | O que é | Marcação |
|---|---|---|
| A pergunta | O título, como a pessoa a faria, em até oito palavras | `h1` na `cover` |
| O caso | Uma linha: quem, o quê e quando, com os números que as telas usam | `cover__sub` |
| As telas | De uma a três, lado a lado, na ordem em que acontecem | `cols` ou `cols cols--3`, uma `fig` por tela |
| A anotação | Ao lado da tela, o que ela não diz sozinha: de onde vem o valor, o que fica igual | `link` com `chip` |
| A legenda | O que a tela mostra, em até doze palavras | `figcaption` |
| O estado | Uma linha: o que foi visto rodando, o que foi lido, o que falta no produto e a data da leitura | `src` |

## Texto

Até 90 palavras fora das figuras; o cartão-ouro tem 63. O caso cabe em uma
linha. O que é regra ainda fora do produto aparece dito no estado, com a figura
a que se refere. O caminho da investigação, a consequência em parágrafo e a
lista de fontes ficam na conversa: quem quiser, pergunta.

## Revisão: duas leituras e a objeção

1. **Sem a conversa.** Com o título, o caso e a primeira tela, alguém que não
   leu o chat sabe de que situação se trata? Onde depende do chat, ponha o nome
   da tela, a data ou o valor que falta.
2. **Só pela figura.** Faça a [leitura pela figura](../visual/design.md#leitura-pela-figura):
   cada frase da explicação do passo 2 precisa aparecer em uma tela, na anotação
   ou na legenda dela.
3. **A objeção e o estado.** Aplique [A objeção mais forte e Visto e lido](../nucleo.md#antes-de-entregar):
   a objeção vai na entrega; o visto e o lido, no estado.

## O que não passa

| Não passa | Faça |
|---|---|
| Parágrafos explicando o que a tela mostraria | A tela, com a anotação curta |
| Esquema genérico no lugar da tela do produto | O editor, o modal e o card reais, com os nomes deles |
| Uma tela por caso diferente | O mesmo caso atravessa todas |
| Página própria, fora do kit | `--novo cartao`, e só o `<main>` muda |
| Cartão feito sem ler o sistema | Entender, no Núcleo, antes |
| Fato tirado de resumo ou de memória | O fato relido na fonte |
| Dor ou virada inventada para um assunto que só pede apresentação | O que existe, como existe |
| Trilho, abas, carimbo, partes com título | Isso é de documento |

## Entrega

O arquivo e, em duas ou três linhas: as telas e o que cada uma mostra, a objeção
mais forte e o que não foi conferido. O visto e o lido já estão no estado.
