# Núcleo · entender, o nó, a calibragem e a fonte relida

Toda entrada do plugin passa por aqui antes de escolher forma, peça ou frase: o cartão, a aula, a decisão, a montagem, a prova e a explicação em texto. O tamanho da entrega muda; este caminho vale em todas, e vai até a regra do nó ficar respondida.

Este arquivo é dono das fontes e seus limites, da etapa de entender, do nó e do que toda entrega declara. A escolha da forma é do [roteamento](roteamento.md); voz, ordem e quantidade do documento são de [Conteúdo](conteudo.md); reconstruir um significado opaco é de [Reconstruir significado](clareza.md); a revisão de frase é do [guia de escrita](escrita/guia.md); as regras que atravessam todas as formas, como a abertura ancorada, a calibragem e a resposta copiável que leva a pergunta junto, são de [Padrões](padroes.md); o registro de uma forma excepcional de explicar é do [Acervo](acervo.md).

## Fontes e limites

Antes de escrever, identifique leitor, pergunta, objeto e resultado desejado. Leia as fontes pertinentes: documento, decisão, código, tipos, consumidores e resultados realmente obtidos. Registre origem, revisão/data e limites suficientes para verificar as afirmações; não amplie a investigação por rotina.

Separe fato confirmado, decisão, trabalho em curso, inferência e desconhecido. Código comprova existência e composição; intenção de produto depende do contrato e das decisões. Desenho, teste passado e aceite humano têm alcances diferentes. Rotule exemplos hipotéticos e propostas no ponto em que aparecem. Números, mensagens, comandos e nomes reais não são preenchimento decorativo.

**Resumo de conversa, memória e documento anterior são pistas: o fato que entra na entrega é relido na fonte.** A intenção, na spec e na decisão; o comportamento atual, no código vigente ou na tela.

Se o significado estiver técnico, incompleto, contestado ou opaco, leia [Reconstruir significado](clareza.md) antes de desenhar ou polir a frase. Use o [guia interno de escrita](escrita/guia.md) para revisar a expressão.

Em documento existente, preserve navegação, figuras e estruturas que ainda representem o modelo correto. Mude o que o pedido autoriza e o que a correção semântica exige. Produzir documentação não autoriza implementar o sistema, executar sua campanha de testes nem publicar em outro destino, como um commit num PR do projeto; isso só com pedido explícito.

## Entender, antes de tudo

1. **As decisões que já existem.** Leia o que quem pediu já decidiu sobre o assunto: as leis de uma aula anterior, uma spec aceita, uma ordem dada na conversa. O que ele decidiu na conversa em curso conta: recolha cada decisão com a frase dele e a data. A entrega segue cada decisão, que não volta à mesa: numa aula ou numa decisão, ela entra em Leis; nas outras formas, a entrega a segue e a cita na resposta do chat. O que diverge de uma decisão vira pergunta a quem pediu, na gramática de [Decisão](decisao.md).
2. **O sistema.** Quem é o dono, quais dados, quem escreve e quem lê, o ciclo de vida, o contrato e a regra que não pode quebrar. Com a skill `architecture-research` disponível, use-a.
3. **A fonte, relida.** Cada fato é relido na fonte, como manda [Fontes e limites](#fontes-e-limites).

## O nó

Quem pede costuma conhecer os fatos; falta vê-los organizados. O pedido tem um de dois trabalhos, e o nó muda com ele:

| O pedido | O nó | A entrega conta, com começo, meio e fim |
|---|---|---|
| Apresentar o que existe: como funciona, o que foi feito, onde estamos | O modelo: a regra que gera os casos e a palavra que a carrega | A história da anatomia escolhida em [Conteúdo](conteudo.md#2-leitor-e-pergunta): numa explicação, o que é, um caso acompanhado do começo ao fim, a regra e o que muda o resultado |
| Pôr um problema na mesa: um defeito, uma decisão travada, uma proposta | O que prende | A dor com o número real, por que as tentativas falharam, a virada, a regra menor que resolve, o que ela decide e o que fica declarado como resto |

Uma apresentação conta o que existe como existe. Dor, virada e tentativa fracassada entram quando a fonte as tem.

Antes de montar qualquer coisa, ache:

- **A pergunta em pauta,** com o caso real e o número dele: "Por que um Cálculo de 05/11/2025 mostra a Ana com 46 anos?".
- **O que prende,** num problema. As duas verdades que valem ao mesmo tempo e fazem a conversa andar em círculo (a data é a do registro; a idade é a do dia em que ele foi aberto), ou a pergunta que vinha sendo feita no lugar da certa.
- **A régua.** Quando há muitos casos, a escala em que todos cabem: do aviso que ninguém precisa ao que trava o trabalho; da troca que só ecoa o número escolhido à que apaga o que vinha depois. Com cada caso no seu ponto da régua, a decisão aparece.
- **A palavra que carrega o modelo,** a mesma do começo ao fim.

O nó tem a cara da forma em que a entrega sai:

| Forma | O nó costuma ser |
|---|---|
| Cartão | A regra que explica o caso; num defeito, o que prende |
| Aula | A regra que gera os casos e a palavra que a carrega |
| Decidir | A pergunta com o caso e as saídas: o que muda conforme a resposta |
| Montagem | A fronteira: o que a peça entrega e o que o consumidor compõe |
| Prova | A afirmação a comprovar e o resultado que a derrubaria |
| Explicar | A cadeia de causa, do fato ao efeito |

### Perguntas que acham o nó

Faça-as nesta ordem e pare quando uma frase explicar todos os casos. Numa apresentação, bastam a 1, a 2, a 3 e a 6.

1. **Onde mais isso aparece?** O caso do pedido é um exemplar. Liste os irmãos: as outras telas, campos ou módulos com a mesma forma.
2. **Que regra gera todos?** Diga-a em uma frase e teste prevendo um caso que ninguém mostrou. O que não couber fica nomeado como exceção.
3. **Quem já resolveu?** O padrão do mercado, a biblioteca em uso, um caso irmão no próprio sistema, uma decisão anterior.
4. **Onde o erro nasce?** O ponto mais alto em que a regra pode morar, para o erro nem chegar a existir, e os nomes que somem do sistema quando ela sobe para lá.
5. **O que diz duas coisas ao mesmo tempo?** Problema que resiste por meses costuma ter duas verdades valendo juntas.
6. **O que a pessoa faz?** Ande pelo gesto de quem usa: quem é, o que acabou de fazer, o que quer, o que acontece na segunda visita.

Num defeito de causa desconhecida, quatro perguntas vêm antes: qual é o irmão que funciona e o que ele tem de diferente; que fato, barato de conferir, divide as causas em duas; a hipótese explica tudo o que foi visto; e, no fim, o que impedia de fato e o que foi melhoria no caminho.

O nó ainda falta quando ele pede duas frases, quando sobra uma pergunta sobre um módulo específico, ou quando a solução acrescenta um nome ao sistema e não apaga nenhum.

**A tentativa que falhou entra com o caso em que quebra:** "tolerar o valor antigo fora da faixa: o mesmo número vale ou deixa de valer conforme de onde veio". Sem o caso, ela é histórico e fica na conversa ou no registro que o projeto já usa.

O contrato de cada tela, a lista de decisões e a matriz de casos são fonte. Eles viram entrega didática quando se organizam em volta do nó.

**O material de quem pediu fica.** Quando o pedido traz a explicação de quem domina o assunto, ela é a fonte principal: a ordem do raciocínio, os nomes e os exemplos são dela. Num documento, cada exemplo vira uma figura, desenhada como a tela em que ele acontece. A revisão tira repetição; o raciocínio fica inteiro, e a entrega tem o tamanho que ele tem.

## Calibrar

Com o nó achado, e antes de escolher forma, figura ou frase, escreva para si três linhas, como manda [Calibrar antes de montar](padroes.md#calibrar-antes-de-montar):

- **Altura:** até que pergunta ou decisão a entrega sobe.
- **Profundidade:** até onde cada coisa é explicada. Padrão: o que um dev olha para verificar o trabalho, sem entrar em código.
- **Distância:** a lista de temas que, respondidos, dão o assunto por elucidado.

Se quem pediu quer ver a calibragem antes da montagem, entregue as três linhas e espere a resposta. Com as três, escreva a origem: onde estamos, a pergunta real e o que se pede de quem lê, na altura escolhida ([Abertura ancorada](padroes.md#abertura-ancorada)). Se a pergunta é sobre um recorte de um conjunto, a primeira figura mostra o todo com o recorte destacado ([Escopo transversal](padroes.md#escopo-transversal)).

## Antes de entregar

**A objeção mais forte.** Diga em uma frase o que faria a entrega estar errada e confira na fonte. Ela fica na resposta do chat, fora do documento, com o resultado da conferência; o que não deu para conferir entra como limite.

**Os padrões.** Confira a entrega contra [Padrões](padroes.md): cada um diz onde a regra é cumprida e o que o check reprova.

**O estranho e a distância.** Leia só o título, o caso e a origem como quem abre a página daqui a um mês: eles dizem de que se trata e o que se pede? Depois percorra a lista da distância: cada tema tem a sua parte, e nenhuma parte responde a tema fora da lista.

**Visto e lido.** A entrega separa o que foi observado rodando do que foi lido no código ou na spec. No cartão, isso mora no estado (`src`); nas outras formas, na resposta do chat.

**O acervo.** Entregue, pergunte-se se alguma coisa ali foi uma forma excepcional de explicar: uma figura que acabou com a discussão, uma ordem que tornou o assunto óbvio, um componente que faltava. Se sim, registre a candidata como manda o [Acervo](acervo.md). Se não, siga sem comentar.
