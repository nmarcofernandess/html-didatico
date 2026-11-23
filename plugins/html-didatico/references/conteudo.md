# Conteúdo

Escreva como quem já domina o assunto: diga como a coisa é, na ordem em que o leitor precisa saber, e pare.

Este arquivo é dono da etapa de entender, do nó, da voz, da ordem e da quantidade do documento didático. As fontes e seus limites são de [Fontes e limites](fundamentos.md); reconstruir um significado opaco é de [Reconstruir significado](clareza.md); a revisão de frase é do [guia de escrita](escrita/guia.md).

O trabalho começa por entender o assunto e achar o nó, e segue em cinco passos, nesta ordem. Os quatro primeiros constroem; o quinto corta. A lista de cortes só entra no fim, porque pensar no que evitar enquanto se escreve puxa exatamente o que se queria evitar.

## Entender, antes de tudo

Todo documento, do cartão à aula, sai de quem entendeu o assunto na fonte. O tamanho da entrega muda; esta etapa vale em todos, e vai até a regra do nó ficar respondida.

1. **As decisões que já existem.** Leia o que quem pediu já decidiu sobre o assunto: as leis de uma aula anterior, uma spec aceita, uma ordem dada na conversa. O documento segue cada decisão; o que diverge vira pergunta a quem pediu (numa aula, a tab Dúvidas).
2. **O sistema.** Quem é o dono, quais dados, quem escreve e quem lê, o ciclo de vida, o contrato e a regra que não pode quebrar. Com a skill `architecture-research` disponível, use-a.
3. **A fonte, relida.** Cada fato é relido na fonte, como manda [Fontes e limites](fundamentos.md): a intenção, na spec e na decisão; o comportamento atual, no código vigente ou na tela.

## O nó, antes da ficha

Quem pede costuma conhecer os fatos; falta vê-los organizados. O pedido tem um de dois trabalhos, e o nó muda com ele:

| O pedido | O nó | O documento conta, com começo, meio e fim |
|---|---|---|
| Apresentar o que existe: como funciona, o que foi feito, onde estamos | O modelo: a regra que gera os casos e a palavra que a carrega | A história da anatomia escolhida na seção 2: numa explicação, o que é, um caso acompanhado do começo ao fim, a regra e o que muda o resultado |
| Pôr um problema na mesa: um defeito, uma decisão travada, uma proposta | O que prende | A dor com o número real, por que as tentativas falharam, a virada, a regra menor que resolve, o que ela decide e o que fica declarado como resto |

Uma apresentação conta o que existe como existe. Dor, virada e tentativa fracassada entram quando a fonte as tem.

Antes da ficha, ache:

- **A pergunta em pauta,** com o caso real e o número dele: "Por que um Cálculo de 05/11/2025 mostra a Ana com 46 anos?".
- **O que prende,** num problema. As duas verdades que valem ao mesmo tempo e fazem a conversa andar em círculo (a data é a do registro; a idade é a do dia em que ele foi aberto), ou a pergunta que vinha sendo feita no lugar da certa.
- **A régua.** Quando há muitos casos, a escala em que todos cabem: do aviso que ninguém precisa ao que trava o trabalho; da troca que só ecoa o número escolhido à que apaga o que vinha depois. Com cada caso no seu ponto da régua, a decisão aparece.
- **A palavra que carrega o modelo,** a mesma do começo ao fim.

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

O contrato de cada tela, a lista de decisões e a matriz de casos são fonte. Eles viram documento didático quando se organizam em volta do nó.

**O material de quem pediu fica.** Quando o pedido traz a explicação de quem domina o assunto, ela é a fonte principal: a ordem do raciocínio, os nomes e os exemplos são dela. Cada exemplo vira uma figura, desenhada como a tela em que ele acontece. A revisão tira repetição; o raciocínio fica inteiro, e o documento tem o tamanho que ele tem.

## 1. Ficha de fatos

Tudo o que o documento tem de específico vem da fonte: o código, a spec, a conversa, a tela. A ficha resume em cinco linhas o que [Fontes e limites](fundamentos.md) e, quando o assunto está opaco, [Reconstruir significado](clareza.md) estabeleceram:

- **A coisa.** O nome exato, como aparece na tela. O que ela é e onde aparece.
- **O caso.** Um caso real que atravessa o documento inteiro, com os nomes, valores e mensagens da fonte. Em Cadastrados, acompanhar um item: Sistema → Duplicar para editar → Meu cadastro.
- **O que acontece.** Ação e resultado, na ordem em que ocorrem.
- **O que muda o resultado.** As condições e exceções, cada uma com o efeito que tem.
- **O que falta.** O fato que a fonte não dá. Pergunte ou deixe fora do documento.

Entra no documento o que está confirmado e a decisão que ficou. O que está em curso ou é inferência aparece rotulado, ou fica fora.

Texto vago nasce de ficha vazia. Quando falta fato, o lugar dele é ocupado por adjetivo ou por um número inventado. O conserto é buscar o fato na fonte.

## 2. Leitor e pergunta

Defina quem lê, o que já sabe e o que precisa conseguir fazer quando terminar. A pergunta do leitor escolhe a anatomia do documento:

| O leitor pergunta | Anatomia | Como é | Exemplo-ouro |
|---|---|---|---|
| O que está acontecendo aqui? Me mostra. | Cartão | Uma página: a pergunta, o caso em uma linha e as telas citadas na explicação, com pouco texto | [cartão](kit/ouro/cartao.html), com o [playbook Cartão](playbooks/cartao.md) |
| Como eu faço? | Passo a passo | Sequência numerada. Cada passo tem uma ação, onde ela fica e o que aparece depois | [passo a passo](kit/ouro/passo-a-passo.html) |
| Como funciona? | Explicação | A coisa, um caso acompanhado do começo ao fim, a regra, as condições que mudam o resultado | [explicação](kit/ouro/explicacao.html) |
| Onde estamos? | Mural | O estado de cada frente, o que mudou desde a última vez, o que falta, a próxima ação | derive da explicação: tabela de frentes com status |
| Como isso deve ser, e o que falta decidir? | Aula | Quadros em pergunta, um por vez; Na tela, Dúvidas e Leis quando o pedido pede | [playbook Aula](playbooks/aula.md) |

**Tamanho.** Conte as perguntas que o leitor faria e as telas que a explicação cita. Até três telas do mesmo caso cabem num cartão. Um assunto inteiro, uma operação com vários passos ou o raciocínio longo de quem pediu pedem documento, com uma parte por pergunta.

**Camada.** Por padrão o documento fala do produto: o que a pessoa encontra, faz e obtém. Quando o mesmo documento também orienta quem vai mexer no código, abra uma aba Arquitetura (peça `tabs`) com uma árvore curta de arquivos, a responsabilidade de cada um, e um caso seguido da tela até a gravação.

**Gênero.** O documento ensina como funciona e, quando há, traz a decisão que ficou. As versões e o histórico da decisão moram na conversa ou no registro que o projeto já usa. O que deve acontecer e como reconhecer que funcionou mora na spec.

## 3. Espinha

Antes do texto, escreva uma linha por parte: o que ela ensina de novo e em que forma.

- **Uma parte tem um assunto,** um título que o nomeia e, quando ajuda, uma figura que mostra a relação. Se a parte pede "além disso", são duas partes.
- **Uma pergunta, uma parte.** Liste as perguntas do leitor, na ordem em que nasceriam. Cada uma ganha uma parte. Duas partes que respondem à mesma pergunta viram uma. A abertura que repete o título, o "por que importa" sem dado novo e o fecho que resume as partes respondem a pergunta nenhuma: o que têm de fato vira uma frase na parte vizinha.
- **A parte existe quando a ficha tem material para ela.** A contagem segue o conteúdo: quatro passos são quatro passos.
- **A pergunta escolhe a representação.** Para cada pergunta, descreva em uma linha duas representações possíveis e fique com aquela em que a resposta se vê sem a prosa:

| A pergunta | O leitor precisa ver | Representação |
|---|---|---|
| Onde isso aparece? O que a pessoa vê e faz? | O lugar e o valor, como na tela | Cena |
| Por que deu esse valor? De onde vem a diferença? | Os eventos entre um ponto e outro, ou a conta linha por linha | Linha do tempo, ficha com a conta |
| O que muda o quê? Quais ações afetam? | Todas as ações contra os mesmos campos | Tabela ou matriz |
| Em que ordem acontece? | Os passos em sequência | Sequência numerada, fluxo |
| Quanto pesa? Qual é maior? | Os números na mesma escala | Barras, número em destaque |
| Como as coisas se ligam? | Quem entrega o quê para quem | Esquema |
| Onde mora cada responsabilidade? | O lugar de cada uma | Árvore |
| Qual escolher? | As saídas no mesmo caso, lado a lado | Uma figura por opção |
| O que o sistema disse? | O texto literal, o que significa e o que fazer | A mensagem e uma tabela |
| O que muda o resultado? | A condição junto do passo que ela afeta | Aviso |

Um exemplo com o Cálculo datado de 05/11/2025 que mostra 46 anos para quem tinha 44: a ficha mostra onde a inconsistência aparece, a linha do tempo explica os dois anos de diferença e a tabela mostra que gestos mexem na idade. Trocadas de lugar, nenhuma responde. Quando a explicação cita telas do produto, a representação é a própria tela: o [cartão-ouro](kit/ouro/cartao.html) conta o mesmo caso com o editor, o modal de import e o dado trazido.

Leia só os títulos em sequência. Se eles contam a história, a espinha está pronta.

## 4. Escrita

- **Comece pela coisa.** O que ela é, onde aparece e o que acontece quando alguém a usa.
- **Dê a regra pelo lado em que ela funciona,** com um exemplo que a carrega: "Cada linha informa a quantidade de uma dose. Se uma dose tem 100 mg, meia dose tem 50 mg."
- **Apresente cada informação no primeiro ponto em que ela ajuda.** A dúvida previsível já encontra a resposta ali.
- **Use o mesmo nome do começo ao fim,** o nome que está na tela.
- **Ponha o fato onde o adjetivo quer entrar.** "Rápido" vira o tempo; "simples" vira a contagem de passos.
- **Explique o mecanismo com verbos:** o que a pessoa faz, o que o sistema faz em seguida.
- **Escreva números dentro da frase, com a unidade.**
- **Diga o que pode ficar para depois.** "Folgas preferidas e horários ficam para depois: o básico já gera escala."
- **Faça o título nomear a coisa,** em até seis palavras, com um substantivo que o leitor reconhece na tela.
- **Deixe a figura dizer o resto.** Quando o desenho já mostra a sequência, o texto diz o que ela muda.
- **Deixe o comprimento da frase seguir o sentido.** A curta fixa um ponto; a longa carrega uma explicação.

**Quantidade.** A página pode rolar bastante. O que cansa é a tela carregada, então a medida é por tela:

| Medida | Referência |
|---|---|
| Um passo | Título, até 3 frases curtas (20 a 35 palavras), o caminho e uma figura |
| Uma parte de explicação | Até cerca de 70 palavras antes da figura |
| A tela mais carregada | Até cerca de 130 palavras de prosa |

Gaste palavras onde a ficha sabe mais: uma parte pode ter duas linhas e a seguinte um parágrafo cheio.

## 5. Revisão

**Teste de uma leitura, quando pedido ou com documento longo.** É o portão de paráfrase de [Reconstruir significado](clareza.md#closed-book-paraphrase-gate), aplicado ao documento pronto. Alguém que nunca viu o assunto lê uma vez e explica para outra pessoa, com as mesmas palavras do documento, o que é, como usa, o que acontece e o que muda o resultado. Com subagente disponível, entregue a ele só o texto do documento e faça essas quatro perguntas. Se ele precisa voltar para achar a regra, reorganize. Se ele já consegue explicar e o texto continua, corte dali em diante.

**Leitura pela figura.** Para cada pergunta, cubra a prosa e confira o que a figura e a legenda mostram sozinhas. O método e os três vereditos estão em [Design](visual/design.md#leitura-pela-figura).

**A objeção mais forte.** Diga em uma frase o que faria a explicação estar errada e confira na fonte. Ela fica na entrega, fora do documento, com o resultado da conferência; o que não deu para conferir entra como limite.

**Visto e lido.** A entrega separa o que foi observado rodando do que foi lido no código ou na spec. No cartão, isso mora no estado (`src`).

**Cortes, cada um com o que entra no lugar:**

| Tire | Ponha |
|---|---|
| O anúncio do que vem ("a seguir", "nesta parte") | A própria coisa |
| A frase que repete o título | Informação nova, ou nada |
| O adjetivo que não informa | O fato que ele substituía |
| A regra dita pelo que a coisa não é | A regra pelo lado em que funciona |
| A defesa contra uma objeção que ninguém fez | A resposta no ponto em que a dúvida nasce |
| O histórico da decisão: versões, datas, quem disse | A decisão que ficou; a tentativa que falhou, só com o caso em que quebra |
| A parte que repete a ideia da anterior com outra figura | Uma parte, com a figura que responde melhor |
| O segundo nome para a mesma coisa | O primeiro nome, repetido |
| A piada ou a moral no fim de cada parágrafo | Um fim em informação; o humor cabe uma vez |
| O nome de arquivo ou função na camada de produto | O que a pessoa vê na tela |

Se tirar uma frase não muda o que o leitor entende, ela sai.

**Depois de cortar, olhe o que entrou no lugar.** Cada corte tem um substituto de plantão:

| Depois de cortar | Costuma aparecer | Faça |
|---|---|---|
| "Não é X, é Y" | "Em vez de", "sem o" | Afirme Y sozinho |
| Adjetivos de venda | Vocabulário calmo: "simplesmente", "na prática" | Um fato |
| Frases longas | Uma batida de fragmentos | Deixe uma frase por parte correr |
| Vagueza | Um número ou um nome inventado | A ficha, ou uma linha mais simples |
| Tríades | Tudo em pares | Liste quantos itens existem |

Uma regra que piorou uma frase é quebrada de propósito.

**O contável fica com o script.** O [check](../scripts/check.mjs) conta fala de processo, muletas, adjetivos de venda, regras ditas pela negativa, molduras de contraste, perguntas respondidas na hora, exclamações, emoji e resíduo de molde, e mede as palavras por tela.
