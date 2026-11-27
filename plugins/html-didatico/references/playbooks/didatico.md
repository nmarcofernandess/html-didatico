# Documento didático · processo, kit e variações

Um documento de página única que alguém lê uma vez e sai sabendo explicar. O
texto diz como a coisa é; a figura mostra o que se vê e como as partes se ligam.
É a base das entradas Cartão e Aula, e do HTML de Decidir.

| Recurso | Trabalho |
|---|---|
| [Núcleo](../nucleo.md) | Entender o assunto, achar o nó, fontes e limites |
| [Conteúdo](../conteudo.md) | O que dizer, em que ordem e quanto |
| [Design](../visual/design.md) | Como a página e as figuras são desenhadas, e por quê |
| [Starter](../kit/starter.html) e [peças](../kit/pecas.html) | O sistema visual pronto e a marcação de cada peça |
| [Aula](../kit/ouro/aula.html), o modelo completo (Aula, Na tela, Dúvidas, Leis e Roadmap), [cartão](../kit/ouro/cartao.html) e [decidir](../kit/ouro/decidir.html) | O padrão de qualidade: um documento completo por anatomia |

## Processo

1. **Entender, nó, ficha e leitor.** Pelo [Núcleo](../nucleo.md),
   [entenda](../nucleo.md#entender-antes-de-tudo) o assunto na fonte, veja se o
   pedido é apresentar o que existe ou pôr um problema na mesa e ache o nó. Em
   [Conteúdo](../conteudo.md), monte a ficha de fatos e defina quem lê e a pergunta dele. A pergunta
   escolhe o tamanho e a anatomia: cartão, passo a passo, explicação ou mural.
   Uma dúvida da conversa que cabe em até três telas do mesmo caso segue o [playbook Cartão](cartao.md).
2. **Espinha.** Uma linha por pergunta do leitor: o que a parte ensina de novo e
   a representação em que a resposta se vê. Para cada figura, o recorte e as
   palavras reais. Mostre a espinha em um bloco curto no começo da resposta e
   siga; o usuário redireciona se quiser.
3. **Base.** Crie o arquivo por cópia, a partir da raiz do plugin:
   `node scripts/montar.mjs --novo <cartao|aula|decidir|prova|montagem|maquete|starter> <destino.html>`.
   O kit chega inteiro e ninguém o redigita; sem Node, copie o mesmo arquivo com
   `cp`. Há um design system só: não há look a escolher.
4. **Página.** Abra o exemplo-ouro da anatomia e copie a composição dele. Escreva
   só o corpo, com os componentes da [referência](../kit/componentes.md) (`d-*` no
   documento, `w-*` na figura); a [folha de peças](../kit/pecas.html) mostra cada um
   vivo. Peça desenhada à mão é diorama: se falta um componente, ele entra no kit.
   O texto segue a seção 4 de Conteúdo.
5. **Figuras.** Leia [Design](../visual/design.md) e monte cada cena pelo método
   de lá, partindo da cena mais próxima do exemplo-ouro. Feche com a
   [leitura pela figura](../visual/design.md#leitura-pela-figura): para cada
   pergunta, o que se percebe só pela figura e pela legenda. Ela não depende do
   render e vale para toda entrega.
6. **A página, vista.** É passo de toda entrega em HTML
   ([Padrões](../padroes.md#página-vista-antes-da-entrega)). O
   [check](../../scripts/check.mjs) (`node scripts/check.mjs <arquivo.html>`, a
   partir da raiz do plugin) grava seus screenshots numa pasta temporária, nunca
   ao lado do documento, e clica cada controle. Conserte toda FALHA; conserte ou
   justifique cada AVISO. Depois abra os screenshots de 390, de 1280 e o do tema
   escuro e compare com o exemplo-ouro:
   se o seu é o mais carregado, o mais vazio ou o mais chapado dos dois, esse é o
   próximo conserto. Ordem: conteúdo, enquadramento, hierarquia, acabamento. Uma
   inspeção, um lote de consertos, uma confirmação.
7. **Leitura.** Aplique a seção 5 de Conteúdo, com os cortes, e o que o
   [Núcleo](../nucleo.md#antes-de-entregar) pede de toda entrega: a objeção mais
   forte e visto e lido. O teste de uma
   leitura com outro leitor fica para quando o usuário pedir ou o documento for
   longo.

## O que não muda

- **Um arquivo só,** conforme o [contrato HTML](../html-portatil.md): autocontido,
  sem rede, CSS e script embutidos, fontes do sistema, ícones do sprite.
- **Fatos da fonte.** Nome, valor, mensagem e tela vêm da ficha. O que a fonte
  não dá fica fora e entra na entrega como pendência.
- **O kit se copia.** Tokens e componentes ficam como estão. O que o documento
  tem de único vai no bloco "desta página", com os tokens do kit e a escala de espaço.
- **Uma figura mostra uma relação,** tem legenda e sobrevive ao celular. Diorama
  não substitui screenshot de evidência: esse resultado é da entrada Prova.

## Variações

Uma base e seus parâmetros. Cartão e Aula são entradas públicas; camada,
anatomia e sistemas são parâmetros internos. O estilo não é parâmetro: todo
documento usa o mesmo [design system](../visual/design.md#um-sistema-sem-looks).
- **Camada** é uma aba: Produto por padrão, Arquitetura quando o documento também
  serve a quem mexe no código.
- **Anatomia** vem da pergunta do leitor e do exemplo-ouro correspondente.
- **Sistemas** soma a sequência narrativa do [modo sistemas](sistemas.md) e usa
  os componentes de esquema do kit.
- **Aula com tabs** consolida um assunto em construção, com tabs abertas pelo
  pedido; a gramática está no [playbook Aula](aula.md).
- **Cartão** responde a uma dúvida da conversa em uma página, com o caso em uma
  linha e as telas citadas na explicação; antes dele vêm entender e achar o nó, e a gramática está no [playbook Cartão](cartao.md).

## Entrega

Entregue o arquivo e, em poucas linhas: a anatomia escolhida, cada
pergunta com a figura que a responde, o que foi visto rodando e o que foi lido,
a objeção mais forte e o que a fonte não deu. Dos avisos do check que ficaram, cada um
com o motivo.
