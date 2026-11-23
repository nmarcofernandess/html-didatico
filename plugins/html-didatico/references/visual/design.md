# Design

A página é um rótulo nutricional desenhado a caneta. O rótulo é a moldura: fio grosso abre e fecha, fio médio separa a capa, a figura e o cabeçalho da tabela, fio fino separa linhas; o título é uma grotesca condensada preta. Dentro da figura, tudo é wireframe e blueprint: **tinta preta desenha o produto**, contexto em cinza e assunto em tinta. **Magenta é a caneta de quem explica**: marca o dado de que a parte fala, numera, chama a atenção e carimba. O magenta não tem outro uso. A coluna de leitura fica calma: face de leitura, contraste real, medida real, nada atrás do texto.

Há um design system só, com tokens compartilhados, e uma biblioteca de componentes: `d-*` monta o documento, `w-*` desenha a figura. A [folha de peças](../kit/pecas.html) mostra cada um vivo e a [referência](../kit/componentes.md) lista as props. O kit já toma quase todas as decisões abaixo. Este arquivo é dono dos princípios de design e do método da figura em HTML Didático; ele explica por quê, para que cada escolha nova siga a mesma lógica. O que dizer e quanto dizer é de [Conteúdo](../conteudo.md).

## Os sete eixos

### 1. Foco

- **Uma ideia por tela.** Cada parte tem um assunto e uma figura.
- **Em cada figura um objeto lidera.** Pergunte: no que o olho pousa primeiro, e isso é o assunto?
- **A marca mais pesada fica no assunto:** tinta forte, borda de tinta ou acento no campo, linha ou botão de que a parte fala. O apoio fica em cinzas quietos.
- **Hierarquia vem de proporção, espaço e peso.** Antes de pôr mais uma caixa, aproxime o que pertence junto.
- **Olho semicerrado.** Com o detalhe borrado ainda se vê o primário, o secundário e os grupos, nessa ordem.

### 2. Espaço

O espaço é escolhido pela relação entre as duas coisas. O kit dá um nome a cada relação:

| Token | Valor | Use entre |
|---|---|---|
| `--gap-tied` | 4 | Duas linhas que são um item só: título e subtítulo, rótulo e valor |
| `--gap-inside` | 8 | Partes de uma peça: ícone e texto |
| `--gap-pieces` | 12 | Peças vizinhas da mesma cena ou lista |
| `--gap-text` | 16 | Parágrafos |
| `--gap-block` | 32 | Blocos da mesma parte: texto e tabela, texto e aviso |
| `--gap-figure` | 48 | A coluna de texto e a figura |
| `--gap-part` | 64 | Acima e abaixo de cada parte |
| `--gap-break` | 96 | Troca de assunto: depois da capa, antes do fecho |
| `--inset-piece` | 12 | Palavras e a borda da peça |
| `--inset-surface` | 16 | Conteúdo e a borda de janela, aviso ou faixa |
| `--inset-scene` | 24 | A cena e a moldura da figura, igual nos quatro lados |

- **Ritmo é contraste entre apertado e generoso:** apertado dentro do grupo, generoso entre grupos. Um valor só repetido deixa tudo com o mesmo peso.
- **Mais ar acima de um título do que abaixo dele.** O título fica colado no que encabeça. A classe `prose` já faz isso.
- **O espaço agrupa.** Um título fica mais perto do próprio metadado do que do registro seguinte.
- **Palavras ficam a 12px ou mais da borda** da peça que as contém.
- **Bordas alinham exato ou se afastam 8px ou mais.** Duas bordas a 1 ou 3px uma da outra leem como acidente.
- **Uma calha por figura.** A distância da cena à moldura é a mesma em todos os lados em que a cena não sai da moldura.
- **Valor novo é token da escala.** No bloco "desta página" cabem até três ajustes ópticos.

### 3. Tipo

- **Seis papéis na página** (`display`, `title`, `subtitle`, `lead`, `body`, `small`) e **dois na cena** (`ui-text` 13px, `ui-meta` 12px).
- **Uma família, duas larguras:** a Helvetica Neue normal no corpo e a condensada preta no título; a mono só para código.
- **Corpo de 16px, linhas de 45 a 75 caracteres,** entrelinha de 1,5 a 1,65.
- **Nada abaixo de 12px.** Texto de 9 ou 10px faz a cena ler como wireframe: use 13px nos nomes, 12px no metadado e menos linhas.
- **Caixa de frase** em rótulo, legenda, cabeçalho de tabela e botão, sem espaçamento de letras. Maiúsculas ficam para o título da capa e o carimbo.
- **Mono para código, comando digitado, identificador e número medido.** Nunca para parecer técnico, nunca na moldura.
- **Um título tem um peso e uma cor.** A ênfase vem da quebra de linha ou de uma segunda linha em outro tamanho.
- **Hierarquia por tamanho, peso, espaço e tom juntos,** com dois ou três pesos na página.
- **Números que se comparam usam algarismos tabulares** (já ligado no `body`).

### 4. Cor

- **Toda cor passa por token.** Fora do bloco de tokens o CSS só usa `var(--color-…)`.
- **Quatro camadas:** papel, tinta, neutros sem matiz, a caneta magenta.
- **Tinta é o produto; magenta é quem explica.** O botão principal, a opção escolhida e o foco do produto ficam em tinta preta. O magenta marca só o dado de que a parte fala (`mark`, `pin`, `w-callout mark`, `<mark>` na prosa) e o carimbo. Menos de 5% de qualquer tela.
- **Cor de status significa status:** `ok`, `warn`, `err`, sempre com rótulo ou ícone ao lado.
- **Quieto ainda é legível.** Texto 4,5:1 contra o fundo real; texto grande, ícone e borda de campo 3:1. `--color-ink-3` passa sobre papel e superfície; sobre os fundos tingidos de status use `--color-ink-2`.
- **Neutros sem matiz.** Papel, poço e fio são cinzas puros; o único matiz da página é o magenta, e o status quando há status.

### 5. Conteúdo real

- **Toda palavra da cena vem da [ficha de fatos](../conteudo.md#1-ficha-de-fatos):** nomes, valores, mensagens literais.
- **Conte as palavras reais: o título, a coisa sobre a qual se age, o que se digita, o resultado.** De 3 a 7 por cena; um formulário de que a parte fala pode passar disso. O resto são barras (`bar`), com larguras variadas.
- **Barra é enchimento e fica nas bordas.** No ponto em que o olho pousa há palavras.
- **Rótulo e valor combinam:** os dois em palavras ou os dois em barra. Campo ainda não preenchido aparece vazio.
- **Mantenha o que identifica o produto:** o nome da tela, os itens reais do menu, a linha que dá motivo à ação.
- **Diga uma vez.** O sinal da parte aparece em um lugar da cena.
- **Um número grande por cena;** os outros entram em linha.
- **Ícones do sprite do kit** (Phosphor), um tamanho por cena, cor única. Um ícone novo vem do mesmo pacote.
- **Só desenhe a tela que a fonte confirma.** Quando a fonte não mostra a tela, a figura é um esquema.

### 6. Detalhe

- **Escada de superfície:** espaço em branco, depois fio, depois poço tingido, depois superfície com borda. Suba um degrau só quando o anterior não separa.
- **Fio, nunca sombra.** O kit separa com fio e espaço; sombra não existe no sistema.
- **Uma camada de contenção.** Conteúdo dentro de janela já está contido.
- **Raios concêntricos:** o raio de dentro é o de fora menos o recuo.
- **Alinhe pela borda de leitura.** O texto das partes fica sempre na mesma coluna; a figura fica na outra.
- **A legenda fica embaixo da figura** e diz o que a figura mostra. A numeração é automática.
- **Tabela para comparar:** cabeçalho em caixa de frase, fios horizontais, largura total. No celular cada linha vira um bloco rotulado (`data-th`).
- **Seleção e foco usam a paleta** (já no kit).

### 7. Movimento

O documento é parado. Quando o pedido inclui movimento: um momento só, `transform` e `opacity`, de 200 a 400ms, com o conteúdo já visível sem ele e o bloco `prefers-reduced-motion` do kit mantido.

## A figura

Uma figura mostra uma relação. Ela é de um de dois tipos:

- **Cena (wireframe):** um recorte da tela, para o que a pessoa vê e faz. Componentes: `w-win`, `w-field`, `w-grid`, `w-list` com `w-item`, `w-kv`, `w-btn`, `w-seg`, `w-chip`, `w-toggle`, `w-avatar`, `w-msg`, `w-toast`, `w-menu`, `w-term`, `w-text`, `w-shot`, e o cursor (`click`).
- **Esquema (blueprint):** um desenho de como as coisas se ligam. Componentes: `w-flow` com `w-node`, `w-bars` com `w-val`, `w-matrix` com `w-cell`, `w-tree`, `w-files` com `w-file`, `w-code`, `w-layers` com `w-layer`, `w-timeline` com `w-when`, `w-stat`, `w-box` e a `table` dentro de uma `w-win`.
- **A caneta:** `mark` e `pin` valem em qualquer componente; `w-callout` liga um nome ao que ele diz, e com `mark` é a anotação de quem explica.

Uma figura é sempre feita de componentes. Marcação desenhada à mão (o diorama) custa mais tokens, diverge entre documentos e não vira vídeo; o [check](../../scripts/check.mjs) a aponta. Se falta um componente, ele entra no [kit](../kit/kit.js) e na folha de peças, não no documento.

Qual das duas, e qual peça, sai da pergunta que a figura responde: a tabela está em [Conteúdo](../conteudo.md#3-espinha).

As props e um exemplo de cada componente estão na [referência](../kit/componentes.md); a [folha de peças](../kit/pecas.html) mostra todos vivos.

### Método da cena

1. **Decida o recorte antes de montar.** Onde a história acontece: o painel, o formulário, a linha. A cena mostra esse pedaço em tamanho de leitura. Uma figura de 450px mostra um terço da tela em tamanho real.
2. **Liste as palavras reais** (eixo 5) e marque o assunto.
3. **Copie a cena mais próxima do exemplo-ouro** e troque o conteúdo. A estrutura, os tamanhos e os espaços ficam.
4. **Monte com componentes.** Contexto em cinza e `w-text`; tinta forte no assunto; a caneta (`mark`, `pin`, `w-callout mark`) no dado de que a parte fala; `click` sobre o alvo quando a parte pede um clique.
5. **Se a tela continua, deixe-a sair da moldura** (`w-fig bleed`). Só enchimento passa da borda: a ação, o resultado e toda palavra real ficam inteiros, com uma calha de folga.
6. **Em figura estreita, redesenhe.** Recorte mais perto, empilhe, tire o apoio. O tipo mantém o tamanho.

Simplifique as palavras e mantenha o contexto.

### Cinco falhas, com o conserto

| Falha | Como aparece | Conserto |
|---|---|---|
| Demais | Texto real em toda linha, números por todo lado | Palavras só no assunto, barras no resto |
| De menos | Duas peças soltas num vazio | A tela em volta, em cinza quieto |
| Encaixotada | A janela inteira encolhida, com margem igual em volta | Recorte no painel da história, em tamanho de leitura |
| Chapada | Tudo com a mesma borda e o mesmo peso | Tinta forte no assunto, o resto recua |
| Sem cara | Poderia ser de qualquer produto | O nome da tela, o menu real, a caneta no dado do caso |

### Leitura pela figura

A figura prova a frase quando a resposta se vê nela. A revisão da cena confere
isso pergunta por pergunta, olhando só a figura e a legenda:

1. **Liste as perguntas centrais:** as que o leitor faria, uma por parte ou quadro.
2. **Cubra a prosa.** Para cada pergunta, anote o que dá para perceber só pela
   figura e pela legenda: os valores, o objeto que lidera, a relação desenhada.
   Quando o [check](../../scripts/check.mjs) roda, ele recorta cada figura e lista
   as palavras dela; sem ele, leia a marcação da figura e a `figcaption`.
3. **Compare com a resposta da parte** e dê um de três vereditos:

| O que se percebe | Veredito | Conserto |
|---|---|---|
| A resposta, com o dado do caso | Passa | Nenhum |
| Os fatos, sem a relação entre eles | A representação serve a outra pergunta | Troque pela que esta pergunta pede, na tabela de [Conteúdo](../conteudo.md#3-espinha) |
| O assunto, sem a resposta | A figura ilustra | Redesenhe com o caso, ou tire a figura e a parte |

4. **Confira a legenda.** Ela diz a conclusão que a figura mostra, com o dado do
   caso: "Dois aniversários caem entre a data clínica e o dia em que o Cálculo foi
   aberto". O nome da peça e a repetição do título ficam fora.

O [cartão-ouro](../kit/ouro/cartao.html) passa assim:

| Frase da explicação | Tela | O que se percebe só nela e na legenda |
|---|---|---|
| A data do registro não é a do dia, e a idade vale para ela | O editor do Cálculo | O calendário em cor de aviso, "data passada: 05/11/2025"; Idade 44 com cadeado, "44 na data, 46 no dia" |
| O import tem a data clínica do que é importado | O modal Importar de Antropometria | A avaliação selecionada, de 10/11/2021, com 62 kg e 1,65 m |
| O receptor mantém a sua data | O editor depois do import | Peso 62 kg, "da avaliação de 2021"; o calendário "fica 05/11/2025"; a idade segue 44 |

Para uma dúvida sem tela, a mesma leitura vale com esquemas. No caso da idade: a
ficha mostra onde a inconsistência aparece, a linha do tempo explica a diferença
e a tabela mostra que gestos afetam a idade.

Pergunta sem figura que a responda e figura sem pergunta são o mesmo defeito:
numa falta a figura, na outra sobra a parte. Na entrega, cada pergunta aparece
com a figura que a responde.

### Esquema

- **Uma linha explica uma relação.** Se o layout já a deixa óbvia, a linha sai.
- **Estilos de linha têm significado:** contínua para ida, tracejada para ligação ou volta. Uma relação, uma cor.
- **O número fica escrito;** a altura da barra reforça.
- **Em figura estreita o fluxo empilha** (o kit faz isso).
- **Arquivos (`w-files`):** só os caminhos que a explicação usa; a nota de cada linha diz para que serve.
- **Código (`w-code`):** o trecho literal da fonte, encurtado com reticências e nunca reescrito; `mark` nas linhas que importam.
- **Camadas (`w-layers`):** a ordem é o que acontece antes de quê; o chip diz o estado de cada uma.
- **Linha do tempo (`w-timeline`):** datas absolutas, no formato dd/mm/aaaa; a cor do topo é o dado e o texto diz o que aconteceu. Marque as pontas de que a parte fala e deixe o meio quieto. Em figura estreita ela desce, uma data por linha.
- **Tabela em figura (`table` dentro de `w-win`):** quando a pergunta é o que muda o quê. Uma marca só, na célula de que a parte fala; o resto em texto.
- **Contorno tracejado** (`off`, ou `kind="slot"` em `w-box`) marca o que existe e não roda, ou o lugar vazio.
- **Composição (`w-box`):** quem contém quem. Fio contínuo é o que existe, tracejado é slot ou condição, magenta (`kind="new"`) é o que se propõe.

## Um sistema, sem looks

Não há looks. Há um conjunto de tokens em `:root` no [kit.css](../kit/kit.css) e todo documento usa os mesmos: a mesma capa, o mesmo fio, a mesma caneta. Um documento difere pelo conteúdo e pela forma (cartão, aula, prova), nunca pelo estilo.

- **Componente novo** nasce no [kit.js](../kit/kit.js), com grupo, resumo, props e exemplo, e ganha aparência no kit.css; o [montar](../../scripts/montar.mjs) o leva à folha de peças e à referência.
- **Ajuste de um documento** cabe no bloco "desta página", com até três regras e só tokens.
- **Os componentes são o contrato** de uma futura versão React (por exemplo, para vídeo no Remotion): mesmo nome, mesmas props, mesma marcação.

## Reflexos e o que fazer no lugar

Estes são os defaults em que um modelo cai. O kit já evita a maioria; a lista serve para o bloco "desta página" e para a revisão.

| Reflexo | No lugar |
|---|---|
| Rotulozinho em maiúsculas acima do título | O título nomeia o assunto nas duas primeiras palavras |
| Numerar seções 01, 02, 03 | Número só em sequência real (`steps`) |
| Três cards iguais de ícone, título e texto | A forma que a ideia pede: tabela, lista, cena |
| Card dentro de card | Uma camada; dentro dela, fio ou espaço |
| Faixa colorida na lateral do aviso | Poço tingido com rótulo |
| Sombra dura deslocada | Fio |
| Mono para parecer técnico | A face do corpo, um passo menor |
| Gradiente, brilho, vidro | Cor chapada do token |
| Magenta como enfeite (título, botão, aba) | Tinta preta; o magenta é só a caneta no dado |
| Figura desenhada com divs e classes à mão | O componente; se não existe, ele entra no kit |
| Emoji ou glifo como ícone | Ícone do sprite |
| Logo ou monograma inventado | O nome em texto |
| Janela de navegador ou de sistema desenhada | A barra do próprio app (`win__bar`) ou nenhuma |
| Texto alternando de lado a cada parte | Texto sempre na mesma coluna |
| A mesma animação de entrada em toda seção | Página parada |
| Anel de acento em volta do herói | Peso no próprio objeto: tinta, superfície, rótulo |
| Encolher a cena para caber | Recortar mais perto |

## De onde vem

- **Stageshow** (Benji Taylor): a cena. Ideia central, cinco falhas, contagem de palavras reais, barras, recorte, calha única, peça do kit em vez de sósia, comparação contra o exemplo-ouro.
- **Hallmark** (Nutlope): piso, reflexo e acabamento; tema como material, separado do conteúdo; escala de espaço; escada de superfície; rótulos em caixa de frase; abertura de seção.
- **Impeccable** (Paul Bakaus): modo de leitura, moldura e coluna; papéis de espaço e de tipo com nome; mais ar acima do título; verificação com evidência renderizada.
- **Taste Skill** (Leon Lin): partir de uma base pronta; checagem em várias larguras; a origem do texto com cara de modelo e a regra de dar um movimento positivo a cada corte (usada em [Conteúdo](../conteudo.md)).
- **Griffin Wooldridge:** os sete eixos que organizam este arquivo.
- **Emil Kowalski, UI Skills:** algarismos tabulares, medida de 65 caracteres, movimento só em `transform` e `opacity`.
