# HTML Didático · manual, editorial e sistemas

Um documento de página única que alguém lê uma vez e sai sabendo explicar. O
texto diz como a coisa é; a figura mostra o que se vê e como as partes se ligam.

| Recurso | Trabalho |
|---|---|
| [Conteúdo](../conteudo.md) | O que dizer, em que ordem e quanto |
| [Design](../visual/design.md) | Como a página e as figuras são desenhadas, e por quê |
| [Starter](../kit/starter.html) e [peças](../kit/pecas.html) | O sistema visual pronto e a marcação de cada peça |
| [Passo a passo](../kit/ouro/passo-a-passo.html) e [explicação](../kit/ouro/explicacao.html) | O padrão de qualidade: um documento completo por anatomia |

## Processo

1. **Ficha e leitor.** Leia [Conteúdo](../conteudo.md) e monte a ficha de fatos a
   partir da fonte. Defina quem lê e a pergunta dele. A pergunta escolhe a
   anatomia: passo a passo, explicação ou mural.
2. **Espinha.** Uma linha por parte: o que ela ensina de novo e em que forma.
   Para cada figura, o recorte e as palavras reais. Mostre a espinha em um bloco
   curto no começo da resposta e siga; o usuário redireciona se quiser.
3. **Base.** Copie o [starter](../kit/starter.html) para o destino e escolha o
   look em `<html data-look="manual">` ou `"editorial"`. O kit embutido fica como
   está.
4. **Página.** Abra o exemplo-ouro da anatomia e copie a composição dele. Escreva
   só o `<main>`, com as peças da [folha de peças](../kit/pecas.html). O texto
   segue a seção 4 de Conteúdo.
5. **Figuras.** Leia [Design](../visual/design.md) e monte cada cena pelo método
   de lá, partindo da cena mais próxima do exemplo-ouro.
6. **Prova.** Rode o [check](../../scripts/check.mjs): `node scripts/check.mjs <arquivo.html>`,
   a partir da raiz do plugin. Conserte toda FALHA; conserte ou justifique cada
   AVISO. Depois abra os screenshots de 390 e 1280 e compare com o exemplo-ouro:
   se o seu é o mais carregado, o mais vazio ou o mais chapado dos dois, esse é o
   próximo conserto. Ordem: conteúdo, enquadramento, hierarquia, acabamento. Uma
   inspeção, um lote de consertos, uma confirmação.
7. **Leitura.** Faça o teste de uma leitura (seção 5 de Conteúdo) e aplique os
   cortes.

## O que não muda

- **Um arquivo só,** conforme o [contrato HTML](../html-portatil.md): autocontido,
  sem rede, CSS e script embutidos, fontes do sistema, ícones do sprite.
- **Fatos da fonte.** Nome, valor, mensagem e tela vêm da ficha. O que a fonte
  não dá fica fora e entra na entrega como pendência.
- **O kit se copia.** Tokens e peças ficam como estão. O que o documento tem de
  único vai no bloco "desta página", com os tokens do kit e a escala de espaço.
- **Uma figura mostra uma relação,** tem legenda e sobrevive ao celular. Diorama
  não substitui screenshot de evidência: esse resultado usa HTML Proof.

## Variações

Uma base e quatro parâmetros. Nenhum deles é uma nova entrada pública.

- **Look** é um bloco de tokens: `manual` para operação, onboarding, quickstart e
  runbook; `editorial` para problema, mecanismo, decisão e narrativa. Um look
  novo segue "Looks" em [Design](../visual/design.md#looks). A gramática do look
  manual vem do [exemplo A](../exemplos/A-manual-escalaflow-quickstart.html) e a
  do editorial, do [exemplo B](../exemplos/B-editorial-panorama-export-v2.html);
  os dois são históricos, e a referência atual são os exemplos-ouro.
- **Camada** é uma aba: Produto por padrão, Arquitetura quando o documento também
  serve a quem mexe no código.
- **Anatomia** vem da pergunta do leitor e do exemplo-ouro correspondente.
- **Sistemas** soma a sequência narrativa do [modo sistemas](sistemas.md) e usa
  as peças de esquema do kit.
- **Aula** consolida um assunto em construção, com tabs abertas pelo pedido; a
  gramática está no [playbook Aula](aula.md).

## Entrega

Entregue o arquivo e, em poucas linhas: a anatomia e o look escolhidos, as fontes
lidas, o que a fonte não deu, e os avisos do check que ficaram, cada um com o
motivo.

Sem Node ou Playwright, siga a verificação do [contrato HTML](../html-portatil.md)
com a ferramenta de navegador disponível e diga na entrega que o check não rodou.
