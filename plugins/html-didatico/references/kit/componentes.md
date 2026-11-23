# Componentes do kit

Gerado de `kit.js` por `scripts/montar.mjs`; não edite à mão. A aparência mora em `kit.css`.
Escreva o documento com estes componentes: cada um vira a marcação semântica que o kit veste.
Props são atributos; sem valor, valem como ligadas (`mark`, `on`). Filhos entram onde a tabela diz.

Valem em qualquer `w-*`: `mark` (a caneta contorna ou realça), `pin="1"` (número magenta no canto),
`click` com `x`/`y` opcionais (cursor sobre o alvo). Em `d-part`, um filho com `slot="fig"` vai para a
coluna da figura, junto de `w-fig` e `table.table`.

## Documento

O chassi: capa, partes, abas, avisos e o pé. Monta a página; não desenha o produto.

### `<d-doc>`

A página inteira. Com card, vira cartão: uma pergunta, uma página.

- `card`: cartão de uma página, mais largo, sem trilho nem abas

### `<d-cover>`

A capa: o rótulo do documento. O filho é o título.

- `kind`: a forma: Cartão, Aula, Explicação, Passo a passo, Decidir, Prova, Montagem, Maquete
- `subject`: produto e assunto
- `date`: dd/mm/aaaa
- `sub`: o caso em uma linha, com os números
- `lead`: o que o leitor consegue no fim

```html
<d-cover kind="Cartão" subject="DietFlow · Cálculo" date="22/11/2026" sub="Ana nasceu em 15/11/1980; o Cálculo é de 05/11/2025.">Que data vale num Cálculo retroativo?</d-cover>
```

### `<d-part>`

Uma parte: um assunto, um título, uma figura. A figura (w-fig, tabela ou slot="fig") vai para a coluna da direita.

- `title`: o título da parte, de preferência a pergunta do leitor
- `id`: âncora
- `wide`: empilha texto e figura em largura total

### `<d-steps>`

Passos numerados de verdade: cada d-part de dentro ganha o seu número. Com rail, abre um trilho.

- `rail`: trilho no topo com um atalho por passo (quatro passos ou mais)

### `<d-tabs>`

Camadas do mesmo documento para leitores diferentes. Filhos: d-tab.

- `sub`: abas dentro de uma aba (as dúvidas de uma aula)

### `<d-tab>`

Uma aba de d-tabs. O id vira endereço: #id abre a aba.

- `label`: o nome na aba
- `id`: âncora (padrão: o rótulo sem acento)

### `<d-note>`

Aviso: uma condição que muda o resultado. O rótulo diz o tipo.

- `tone`: warn | err | ok | mark
- `label`: o tipo do aviso, em palavras

```html
<d-note tone="warn" label="Antes de gerar">A demanda vazia gera uma escala vazia.</d-note>
```

### `<d-check>`

Conferência que o leitor marca. Filhos: li, um item cada.

- `title`: o que se confere

```html
<d-check title="Antes de gerar"><li>Setor com horário</li><li>Equipe com contrato</li></d-check>
```

### `<d-path>`

Onde a coisa fica no produto, do menu até a tela. Separe os níveis com ›.

- `label`: o que vem antes (padrão: Onde)

```html
<d-path>Setores › Novo Setor › Regime</d-path>
```

### `<d-cols>`

Coisas equivalentes lado a lado, como uma comparação. Empilham no celular.

- `n`: 2 ou 3 colunas

### `<d-band>`

Faixa preta: um caminho alternativo. Uma por documento, no máximo. slot="aside" vai para a direita.

- `title`: o título da faixa

### `<d-closing>`

O fecho com carimbo: o único gesto de festa. Diz o que o leitor conseguiu.

- `stamp`: o que o carimbo diz, em até três palavras

```html
<d-closing stamp="Escala no ar">O rodízio já roda sozinho.</d-closing>
```

### `<d-src>`

De onde vem o fato e até onde a conferência foi, em uma linha.

- só filhos

```html
<d-src>Conferido em dev em 22/11/2026, nas figuras 2 e 3.</d-src>
```

### `<d-foot>`

O pé: fecha o rótulo com fio grosso.

- `left`: produto e assunto
- `right`: o documento e a data

```html
<d-foot left="DietFlow · Cálculo" right="Data clínica · 22/11/2026"></d-foot>
```

## Tela

O wireframe do produto: janela, campo, lista, botão, mensagem. Traço preto, contexto em cinza.

### `<w-fig>`

A moldura de toda figura: chão de prancheta e a legenda numerada embaixo.

- `cap`: a legenda: a conclusão que a figura mostra, com o dado do caso
- `bleed`: a tela continua para fora da moldura
- `h`: altura do recorte com bleed (ex.: 17rem)

### `<w-win>`

Uma janela do produto em wireframe: barra com o nome da tela e o corpo.

- `title`: o nome da tela, como no produto
- `icon`: ícone à direita da barra
- `tone`: warn | err: cor do ícone da barra
- `heading`: título dentro do corpo
- `nav`: menu lateral: Item|Item|Item
- `on`: o item ativo do menu

```html
<w-win title="Cálculo" icon="calendar-blank" heading="Dados do Paciente"><w-text lines="2"></w-text></w-win>
```

### `<w-grid>`

Campos curtos lado a lado.

- `cols`: quantas colunas (padrão 2)

```html
<w-grid><w-field label="Abre" value="06h"></w-field><w-field label="Fecha" value="22h"></w-field></w-grid>
```

### `<w-text>`

Barras no lugar das palavras que a história não usa. Variam de largura sozinhas.

- `lines`: quantas linhas (padrão 1)
- `w`: largura da primeira, em %

```html
<w-text lines="3"></w-text>
```

### `<w-field>`

Campo: rótulo em cima, o valor na caixa.

- `label`: o rótulo do produto
- `value`: o que está escrito
- `unit`: unidade à direita
- `icon`: ícone à direita
- `state`: focus | caret
- `tone`: warn | err
- `hint`: a linha abaixo do campo
- `ph`: barra no lugar do valor (largura em %)

```html
<w-field label="Peso" value="62 kg" state="focus"></w-field>
```

### `<w-list>`

Uma lista de linhas separadas por fio. Filhos: w-item.

- só filhos

### `<w-item>`

Uma linha de lista: nome, metadado e uma etiqueta. Filhos entram no fim (um botão).

- `title`: o nome
- `meta`: a linha de baixo
- `tag`: etiqueta à direita
- `tagtone`: ok | warn | err | ink | mark
- `icon`: ícone à esquerda
- `on`: linha selecionada
- `off`: linha que não vale mais
- `tone`: ok | warn | err no nome
- `bar`: barra no lugar do nome (largura em %)

```html
<w-list><w-item title="10/11/2021" meta="62 kg · 1,65 m" tag="selecionada" tagtone="ink" on></w-item><w-item bar="46"></w-item></w-list>
```

### `<w-btn>`

Botão. O primário é o preto; um por tela.

- `kind`: primary | ghost | danger
- `icon`: ícone antes do texto
- `off`: desabilitado

```html
<w-btn kind="primary" click>Importar</w-btn>
```

### `<w-seg>`

Controle segmentado: escolha entre poucas opções, todas à vista.

- `options`: Opção|Opção|Opção
- `on`: a escolhida

```html
<w-seg options="5x2|6x1" on="6x1"></w-seg>
```

### `<w-chip>`

Etiqueta curta de estado.

- `tone`: ok | warn | err | ink

```html
<w-chip tone="ok">Adequado</w-chip>
```

### `<w-toggle>`

Interruptor com o rótulo do produto.

- `on`: ligado

```html
<w-toggle on>Lembrete por e-mail</w-toggle>
```

### `<w-avatar>`

Iniciais de uma pessoa.

- só filhos

```html
<w-avatar>AS</w-avatar>
```

### `<w-kv>`

Uma linha de ficha: rótulo à esquerda, valor ao lado.

- `k`: o rótulo
- `v`: o valor
- `num`: valor numérico, alinhado à direita

```html
<w-kv k="Lipídios" v="35,8 g"></w-kv><w-kv k="Valor energético" v="1.610 kcal" mark></w-kv>
```

### `<w-msg>`

Mensagem do sistema, com o texto literal que o produto mostra.

- `tone`: warn | err | ok
- `title`: a primeira linha, em negrito

```html
<w-msg tone="warn" title="Acima de 999 mcg">Confira se não seria mg.</w-msg>
```

### `<w-toast>`

Aviso que aparece por cima e some.

- `icon`: ícone (padrão: check)

```html
<w-toast>Escala gerada para dezembro</w-toast>
```

### `<w-menu>`

Menu aberto, com o item de que a parte fala.

- `items`: Item|Item|Item
- `on`: o item em foco

```html
<w-menu items="Duplicar|Arquivar|Excluir" on="Arquivar"></w-menu>
```

### `<w-term>`

Saída de terminal: poucas linhas, reais e curtas.

- só filhos

```html
<w-term>$ node scripts/check.mjs cartao.html
<span class="term__dim">0 falhas · 1 aviso</span></w-term>
```

### `<w-shot>`

Um print real da tela, numa moldura. Sem src, o espaço hachurado diz que o print falta.

- `src`: o arquivo do print
- `alt`: o que o print mostra
- `ratio`: proporção do espaço vazio (padrão 16/10)

```html
<w-shot alt="Prescrição com o checkbox antes do card"></w-shot>
```

## Caneta

Quem explica: marca, pino e chamada em magenta. Valem em qualquer componente (mark, pin, click).

### `<w-callout>`

Chamada: o nome, um fio tracejado e o que ele diz ou vira. Com mark, é a caneta.

- `label`: o nome à esquerda
- `strong`: nome em tinta forte
- `pin`: em vez do nome, o número do pino

```html
<w-callout label="Calendário">data passada: 05/11/2025</w-callout><w-callout label="Idade" strong mark>44 na data, 46 no dia</w-callout>
```

## Esquema

O blueprint: fluxo, barras, matriz, arquivos, código, camadas, linha do tempo e composição.

### `<w-flow>`

Uma sequência de estados ou ações. As setas entram sozinhas entre os w-node.

- só filhos

```html
<w-flow><w-node>Pedido</w-node><w-node on sub="com o kit">Composição</w-node><w-node>Check</w-node></w-flow>
```

### `<w-node>`

Um estado do fluxo.

- `sub`: a linha de baixo
- `on`: o estado de que a parte fala
- `off`: existe e não roda
- `back`: a seta que chega aqui é de volta (tracejada)

### `<w-bars>`

Quantidades que se comparam. O número fica escrito; a altura só reforça. Filhos: w-val.

- `max`: o valor que enche a barra (padrão: o maior)

```html
<w-bars><w-val n="12">Seg</w-val><w-val n="31" mark>Qua</w-val><w-val n="20">Sex</w-val><w-val n="0" off>Dom</w-val></w-bars>
```

### `<w-val>`

Uma barra de w-bars. O filho é o rótulo embaixo.

- `n`: o número escrito em cima
- `unit`: a unidade
- `off`: existe e está vazio

### `<w-matrix>`

Uma matriz pequena: semana, escala, permissões. Filhos: w-cell.

- `cols`: quantas colunas
- `head`: cabeçalho: A|B|C

```html
<w-matrix cols="7" head="D|S|T|Q|Q|S|S"><w-cell off>F</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell mark>F</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell></w-matrix>
```

### `<w-cell>`

Uma célula de w-matrix.

- `on`: preenchida
- `off`: vazia de propósito
- `who`: a coluna do nome

### `<w-files>`

Os arquivos que a explicação usa. Filhos: w-file.

- só filhos

```html
<w-files><w-file path="kit/kit.css" note="tokens e aparência" mark></w-file><w-file path="kit/kit.js" note="os componentes"></w-file></w-files>
```

### `<w-file>`

Um arquivo: o caminho em mono e para que serve.

- `path`: o caminho
- `note`: para que serve
- `dir`: é pasta
- `i`: recuo (nível)
- `off`: existe e não é usado

### `<w-tree>`

Onde cada responsabilidade mora: listas aninhadas com code e um texto curto.

- só filhos

```html
<w-tree><ul><li><code>kit.js</code><span>os componentes</span><ul><li class="is-mark"><code>w-field</code><span>o campo</span></li></ul></li></ul></w-tree>
```

### `<w-code>`

O trecho literal da fonte, com número de linha. Escreva < como &lt;.

- `from`: o número da primeira linha
- `mark`: linhas marcadas pela caneta, contadas a partir de from: 3,4

```html
<w-code from="40" mark="41">const max = 999
if (v > max) return erro</w-code>
```

### `<w-layers>`

O que acontece antes de quê. Numeram sozinhas. Filhos: w-layer.

- só filhos

```html
<w-layers><w-layer tag="roda" tagtone="ok">Digitação</w-layer><w-layer tag="falta" tagtone="warn" mark>Aviso de milhar</w-layer><w-layer off>Limite diário</w-layer></w-layers>
```

### `<w-layer>`

Uma camada.

- `sub`: a linha de baixo
- `tag`: o estado
- `tagtone`: ok | warn | err | ink
- `off`: existe e não roda

### `<w-timeline>`

O caso real em datas absolutas. Filhos: w-when.

- só filhos

```html
<w-timeline><w-when date="15/11/1980">Ana nasce</w-when><w-when date="05/11/2025" mark>Data do Cálculo: 44 anos</w-when><w-when date="22/11/2026" tone="warn">Cálculo aberto: 46</w-when></w-timeline>
```

### `<w-when>`

Uma data da linha do tempo. A cor do topo é o dado.

- `date`: dd/mm/aaaa
- `tone`: ok | warn | err
- `on`: tinta forte

### `<w-stat>`

O único número grande da cena.

- `n`: o número
- `unit`: a unidade

```html
<w-stat n="1.610" unit="kcal">valor energético total</w-stat>
```

### `<w-box>`

Caixa de composição: quem contém quem. Contínua existe; tracejada é slot; magenta é proposta.

- `title`: o nome da peça
- `meta`: de onde vem (pacote, arquivo)
- `kind`: slot | new | off
- `row`: filhos lado a lado

```html
<w-box title="Busca" meta="ui/SmartAutocomplete.tsx"><w-box title="Autocomplete" kind="slot"></w-box><w-box title="Filtro por grupo" kind="new"></w-box></w-box>
```
