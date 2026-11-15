# Design

A página é um documento de leitura dentro de uma moldura. A moldura pertence ao look: capa, plaqueta, trilho, legenda de figura, o jeito de compor tabela e aviso. Ali o look aparece inteiro. A coluna de leitura fica calma: face de leitura, contraste real, medida real, nada atrás do texto. O look nunca decide a ordem de leitura.

O [kit](../kit/pecas.html) já toma quase todas as decisões abaixo. Este arquivo é dono dos princípios de design e do método da figura em HTML Didático; ele explica por quê, para que cada escolha nova siga a mesma lógica. O que dizer e quanto dizer é de [Conteúdo](../conteudo.md).

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
- **Duas famílias** (título e corpo) mais a mono.
- **Corpo de 16px, linhas de 45 a 75 caracteres,** entrelinha de 1,5 a 1,65.
- **Nada abaixo de 12px.** Texto de 9 ou 10px faz a cena ler como wireframe: use 13px nos nomes, 12px no metadado e menos linhas.
- **Caixa de frase** em rótulo, legenda, cabeçalho de tabela e botão, sem espaçamento de letras. Maiúsculas ficam para o título da capa e o carimbo.
- **Mono para código, comando digitado, identificador e número medido.** No look manual ela também compõe a moldura: plaqueta, número do trilho, legenda de figura.
- **Um título tem um peso e uma cor.** A ênfase vem da quebra de linha ou de uma segunda linha em outro tamanho.
- **Hierarquia por tamanho, peso, espaço e tom juntos,** com dois ou três pesos na página.
- **Números que se comparam usam algarismos tabulares** (já ligado no `body`).

### 4. Cor

- **Toda cor passa por token.** Fora do bloco de tokens o CSS só usa `var(--color-…)`.
- **Quatro camadas:** papel, tinta, neutros tingidos na direção do papel, um acento.
- **O acento é sinal:** o botão principal, a opção escolhida, o dado de que a parte fala. Menos de 5% de qualquer tela.
- **Cor de status significa status:** `ok`, `warn`, `err`, sempre com rótulo ou ícone ao lado.
- **Quieto ainda é legível.** Texto 4,5:1 contra o fundo real; texto grande, ícone e borda de campo 3:1. `--color-ink-3` passa sobre papel e superfície; sobre os fundos tingidos de status use `--color-ink-2`.
- **Superfícies tingidas.** O papel e a superfície puxam para o matiz do look.

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
- **Borda ou sombra, uma das duas.** O look manual usa fio; o editorial usa sombra suave.
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

- **Cena:** um recorte da tela, para o que a pessoa vê e faz. Peças: `win`, `row`, `list`, `kv`, `field`, `pair`, `btn`, `seg`, `chip`, `toggle`, `avatar`, `banner`, `toast`, `menu`, `term`, `bar`, `cursor`.
- **Esquema:** um desenho de como as coisas se ligam. Peças: `flow`, `link`, `bars`, `matrix`, `tree`, `files`, `code`, `layers`, `timeline`, `stat`.

A marcação de cada peça está no código-fonte da [folha de peças](../kit/pecas.html).

### Método da cena

1. **Decida o recorte antes de montar.** Onde a história acontece: o painel, o formulário, a linha. A cena mostra esse pedaço em tamanho de leitura. Uma figura de 450px mostra um terço da tela em tamanho real.
2. **Liste as palavras reais** (eixo 5) e marque o assunto.
3. **Copie a cena mais próxima do exemplo-ouro** e troque o conteúdo. A estrutura, os tamanhos e os espaços ficam.
4. **Monte com as peças do kit.** Contexto em cinza quieto e barras; tinta forte no assunto; um `cursor` sobre o alvo quando a parte pede um clique.
5. **Se a tela continua, deixe-a sair da moldura** (`fig__stage--bleed`). Só enchimento passa da borda: a ação, o resultado e toda palavra real ficam inteiros, com uma calha de folga.
6. **Em figura estreita, redesenhe.** Recorte mais perto, empilhe, tire o apoio. O tipo mantém o tamanho.

Simplifique as palavras e mantenha o contexto.

### Cinco falhas, com o conserto

| Falha | Como aparece | Conserto |
|---|---|---|
| Demais | Texto real em toda linha, números por todo lado | Palavras só no assunto, barras no resto |
| De menos | Duas peças soltas num vazio | A tela em volta, em cinza quieto |
| Encaixotada | A janela inteira encolhida, com margem igual em volta | Recorte no painel da história, em tamanho de leitura |
| Chapada | Tudo com a mesma borda e o mesmo peso | Tinta forte no assunto, o resto recua |
| Sem cara | Poderia ser de qualquer produto | O nome da tela, o menu real, o look do documento |

### Esquema

- **Uma linha explica uma relação.** Se o layout já a deixa óbvia, a linha sai.
- **Estilos de linha têm significado:** contínua para ida, tracejada para ligação ou volta. Uma relação, uma cor.
- **O número fica escrito;** a altura da barra reforça.
- **Em figura estreita o fluxo empilha** (o kit faz isso).
- **Arquivos (`files`):** só os caminhos que a explicação usa; a nota de cada linha diz para que serve.
- **Código (`code`):** o trecho literal da fonte, encurtado com reticências e nunca reescrito; `is-mark` nas linhas que importam.
- **Camadas (`layers`):** a ordem é o que acontece antes de quê; o chip diz o estado de cada uma.
- **Linha do tempo (`timeline`):** datas absolutas, no formato dd/mm/aaaa; a cor do topo é o dado e o texto diz o que aconteceu.
- **Contorno tracejado** (`is-off` em `tree` e `bars`) marca o que existe e não roda.

## Looks

Um look é um bloco de tokens: fontes, cores, raios, sombra, fundo da figura. A cena é escrita uma vez e acompanha qualquer look.

- `data-look="manual"`: manual técnico impresso. Papel quente, grotesca geométrica, laranja de sinal, mono na moldura, figura sobre papel quadriculado.
- `data-look="editorial"`: revista de produto. Papel frio, serifa no título, verde-musgo de sinal, figura em poço tingido.

**Look novo.** Copie um dos blocos em [kit.css](../kit/kit.css), troque os valores e rode o [montar](../../scripts/montar.mjs). Os grupos seguem o formato DESIGN.md (cores, tipografia, espaçamento, raios), então um design system publicado nesse formato vira look por mapeamento direto. Confira o contraste de cada par com o [check](../../scripts/check.mjs).

## Reflexos e o que fazer no lugar

Estes são os defaults em que um modelo cai. O kit já evita a maioria; a lista serve para o bloco "desta página" e para a revisão.

| Reflexo | No lugar |
|---|---|
| Rotulozinho em maiúsculas acima do título | O título nomeia o assunto nas duas primeiras palavras |
| Numerar seções 01, 02, 03 | Número só em sequência real (`steps`) |
| Três cards iguais de ícone, título e texto | A forma que a ideia pede: tabela, lista, cena |
| Card dentro de card | Uma camada; dentro dela, fio ou espaço |
| Faixa colorida na lateral do aviso | Poço tingido com rótulo |
| Sombra dura deslocada | Fio, ou a sombra do look |
| Mono para parecer técnico | A face do corpo, um passo menor |
| Gradiente, brilho, vidro | Cor chapada do token |
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
