---
name: html-didatico
description: Use when the user requests an HTML didático, visual manual, quickstart, one-pager, system explanation, wireframe, decision board, proof HTML, or component blueprint showing primitives, features, children, slots, types and props.
---

# HTML Didático — documentos editoriais com dioramas de CSS

**Blueprint de composição:** quando o pedido for mostrar como componentes se
montam dos primitivos ao específico, siga a **Direção E** em
[`references/blueprint-componentes.md`](references/blueprint-componentes.md).
Ela define sua própria anatomia: árvore de arquivos, composição progressiva à
esquerda e contratos à direita. Leia o playbook e a receita exemplar antes de
desenhar. As regras de narrativa, zigue-zague, diorama e decoração de A/B não
substituem o contrato de E. Para E, o playbook substitui o processo visual
geral abaixo. Fonte real, clareza e arquivo autocontido continuam obrigatórios.

Um documento desse estilo tem duas metades inseparáveis: **layout de impresso** (papel,
tinta, tipografia com caráter, hairlines, numerais gigantes) e **dioramas** — pequenas
cenas de interface desenhadas só com HTML+CSS, que mostram o conceito em vez de
descrevê-lo. O resultado parece um manual de operação bem diagramado, não um site.

O leitor-alvo quase sempre é um **não-técnico** (sócio, cliente, família). O documento
falha se precisar de tradutor do lado.

**REQUIRED SUB-SKILLS:** When the source is technical, contested, incomplete, or
hard to understand, use `explain-clearly` before designing the page. It owns the
semantic model and causal story. Then use `writing-clearly-and-concisely` for
every headline, paragraph, label, status, and caption before finalizing the
HTML. This skill owns the visual form, not the underlying truth.

## Processo

### 1. Conteúdo antes de estética

Didático = concreto. Antes de abrir uma tag:

- Ler a fonte real (código, docs, conversa) — mensagens de erro literais, nomes de
  campos, números reais valem ouro num diorama.
- Se a fonte mistura fatos, decisões, trabalho em andamento e jargão, aplicar
  `explain-clearly`: reconstruir objetos, casos, causas e consequências antes de
  editar o texto. Não "melhorar" frases que contam a história errada.
- Dar personagem aos exemplos ("a paciente Maria", "o Mercado Central") — cenário
  abstrato não gruda.
- Definir a espinha: 3–6 seções, cada uma com UMA ideia. Se a seção tem duas ideias,
  são duas seções.
- Cada seção termina ancorada no uso prático: o que muda na vida de quem usa.

Em HTML existente, preserve dioramas, wireframes e navegação que ainda expressem
o modelo correto. Reescreva ou redesenhe somente o que carregar semântica errada;
forma visual boa não precisa morrer porque o texto falhou.

#### 1.1 Clareza sem burocracia

Escreva cada seção nesta ordem:

1. o título declara o estado, a decisão, ou o problema;
2. o parágrafo explica a causa ou a evidência concreta;
3. o fechamento informa o efeito prático ou a próxima ação.

Use voz ativa, afirmações positivas, termos específicos, e apenas as palavras
necessárias. Preserve o português natural: clareza não significa formalidade
corporativa. A personalidade vem dos exemplos e do ritmo, não de frases de
efeito, provocações ao leitor, ou comentários sobre a própria honestidade.

```text
Evite: Onde estamos, sem teatro de “quase pronto”.
Use:  O motor funciona em pequena escala; a execução completa continua bloqueada.
```

#### 1.2 Explicar um sistema para um desconhecido

Quando o assunto é como algo se organiza (testes, pastas, flags, pipelines), o
documento **conta**, não responde. Nada de pergunta e resposta, nada de começar
pela conclusão. Abra situando o leitor — "No X, os testes se organizam assim…" —
e faça cada seção responder à próxima pergunta que ele faria.

Ordem que funciona:

1. **Onde mora** — o lugar físico (pastas, arquivos). Explorer de IDE.
2. **Como funciona** — o mecanismo (a chave, a regra, o fluxo). Editor com o
   trecho real + diorama do mecanismo.
3. **Por que é assim** — os motivos em cards curtos. Regra sem motivo parece
   capricho e é esquecida.
4. **Quem usa** — quais partes do sistema acionam aquilo. Pílulas, árvore.
5. **O que acontece de verdade** — o caso real, com datas absolutas.
6. **O que fazer** — o próximo passo, em fluxo.

Regras da narrativa:

- **Título de seção é uma frase que explica**: "Existe uma chave, desligada no
  CI", não "A trava".
- **Desambigue antes de usar.** Se um termo tem dois sentidos no projeto, a
  primeira seção que o usa separa os dois.
- **No máximo 1–2 frases por bloco.** O texto anuncia; o diorama explica.
- **Números e caminhos vêm do repositório.** Se um número for aproximado, diga.
  Datas sempre absolutas (`05/11/2026`), nunca "hoje" ou "ontem".
- **Mostre o limite.** O que existe e não roda aparece tracejado, não omitido.

### 2. Escolher direção estética e COMPROMETER

Cinco direções: A–D em `references/receita.md`; E em
`references/blueprint-componentes.md` e na receita HTML exemplar. Leia a
referência da direção escolhida antes de codar:

| Direção | Vibe | Quando |
|---|---|---|
| **A — Manual de operação** | Brutalista impresso: display geométrica caps, plaquinha de documento (`EF-QS-001 · Rev 1.10`), rail de navegação, bordas 1.5px pretas, sombra offset sólida, 1 cor de sinal quente | Passo-a-passo, quickstart, onboarding, runbook |
| **B — Editorial serif** | Revista calma: serif com caráter em títulos grandes, numerais fantasma vazados, hairlines, faixa "na prática" em itálico, carimbo no fechamento | Narrativa (problema→solução), relato de sprint, pitch, explicação de decisão |
| **C — Prova final / Wireframe de verificação** | Delta sobre a Direção A: mesmos tokens/rail/callout, mas o documento nasce VAZIO (slots `▢`) organizado por PR/merge real, e o MESMO arquivo vira a prova preenchida depois — ver §2.1 | Checklist de re-verificação de trabalho já mergeado, antes de ratificar decisões ou fechar uma rodada |
| **D — Prancha de decisão** | Planta baixa, não impresso: papel técnico, linha de construção 1px, UMA cor de revisão. N opções da MESMA estrutura desenhadas lado a lado em caixas cinzas, com a região em disputa hachurada e o custo de cada uma embaixo — ver §2.2 | Escolher entre formas de organizar algo que ainda não existe: onde mora uma informação, o que uma aba promete, qual layout uma feature ganha |
| **E — Blueprint de composição** | Folha técnica contínua: árvore de arquivos, componentes aninhados à esquerda, types/props à direita, montagem progressiva e deltas novos em verde | Provar como primitivos, children, features e consumidores se encaixam; investigar uma arquitetura existente ou proposta |

Misturar A e B é permitido; ficar em cima do muro não. Escolher UMA dominante. A
Direção C é sempre um delta explícito sobre a A (não escolher "C pura" do zero —
ela importa os tokens/primitivos de A e adiciona só o que é próprio do gênero).

**A Direção D não é delta de ninguém** — ela tem tokens próprios, porque o
assunto dela é outro. A, B e C descrevem coisas que existem; D existe justamente
quando o conteúdo AINDA NÃO existe e o que está em jogo é a estrutura. Um
documento não deve nascer em D e virar A depois: quando a decisão é tomada, o
que se escreve é um documento novo, do gênero certo.

#### 2.1 Direção C em detalhe — o gênero "prova final"

Diferença fundamental das outras duas: A e B descrevem algo que já existe pra um
leitor entender. C é um **artefato de trabalho de duas fases**: nasce como
wireframe vazio (Rev. 0) ANTES da rodada de captura de prova, e o MESMO arquivo é
editado depois pra virar o relatório de prova real (Rev. 1) — não se cria um
segundo documento.

Regras do gênero:

- **Fonte do conteúdo é sempre real, nunca inventada.** Cada seção do documento
  corresponde a 1 PR/merge real já integrado. O "o quê" de cada prova vem do
  corpo do PR ou do commit, o comando de reprodução é um comando real do
  projeto (`npm test -- ...`, `npm run ci:queue -- e2e -- ...`, etc.), o
  critério de aceite é extraído do que o PR/issue prometeu — nunca redigido do
  zero por estética.
- **Organização por fonte de verdade**: 1 seção por PR (numerada `step-num`
  tipo "01", "02", "03" — reusa o mesmo primitivo da Direção A), cada uma
  citando o "pack existente" (caminho de prova anterior, se houver) antes de
  listar as re-execuções novas. Depois das seções por PR, uma seção
  **"Gates transversais"** para critérios que valem pro branch/entrega inteira,
  não por PR individual (ex.: CI completo local, deploy publicado, decisões
  pendentes respondidas).
- **Card `.prova`** é o primitivo central do gênero (ver `references/receita.md`
  §10 pro CSS/HTML completo): id curto (`676-A`), `.status-slot` que começa
  vazio (`▢`) e vira `passed`/`failed` depois, corpo em grid 2 colunas — texto
  do "o quê" + comando real + critério de aceite (`.where`, mesmo primitivo já
  documentado em A) de um lado, `.print-slot` (caixa tracejada vazia, com texto
  tipo "▢ N prints — descrição do que vai entrar") do outro.
- **`.wire-banner`** logo no topo (borda tracejada na cor de sinal) declara
  explicitamente "isto é um wireframe" e a regra de validade do projeto (ex.:
  print sem JSON de status não conta; falha não gera screenshot válido) — isso
  não é genérico, é a doutrina de prova real do projeto sendo documentada, não
  uma frase decorativa.
- **Convenção de versão no `doc-plate`**: `Rev. 0 · WIREFRAME` no nascimento,
  vira `Rev. 1` (ou seguinte) quando os slots forem preenchidos com prova real.
  O fechamento do documento (bloco `.ia` invertido, mesmo primitivo de A) lista
  explicitamente "o que falta para a Rev. 1" — não é um "próximos passos"
  genérico, é o checklist literal de slots ainda vazios.
- **Exceção deliberada à Lei do Estilo #1** (ver "Anti-patterns" abaixo): a
  Direção A/B proíbem screenshot real no lugar de diorama. A Direção C
  inverte isso de propósito no `.print-slot` — quando a Rev. 1 é preenchida, o
  que entra ali É um screenshot real (a prova em si), não um diorama. O
  wireframe (Rev. 0) continua com o placeholder tracejado; só a versão
  preenchida quebra a regra geral, e só nesse slot específico.

**HTML de proof em projeto com renderer.** Se o projeto gera seus proofs por um
renderer (no DietFlow, `scripts/proof/render-pack.ts` + `proof-pack.css`), o
HTML oficial **nunca** é escrito à mão: a skill trabalha no renderer, e o
renderer já fala a Direção A/C. Os dois modos, a anatomia da página e as leis da
prova estão em `references/proof-html.md` — ler antes de tocar em qualquer proof.

#### 2.2 Direção D em detalhe — o gênero "prancha de decisão"

**A pergunta que define o gênero:** o conteúdo já existe?

- **Existe** → diorama (A/B). Você mostra a cena real, com o texto real dentro.
- **Não existe ainda, e o que está em jogo é onde as coisas ficam** → prancha (D).

Essa distinção não é estilística, é de honestidade. O diorama vive de conteúdo
literal — a mensagem de erro do sistema, o nome do botão. Se você desenhar um
diorama de algo que ainda não foi decidido, é obrigado a **inventar o conteúdo
para ilustrar**, e o leitor passa a debater o texto inventado em vez da
estrutura. A caixa cinza da prancha diz o que precisa ser dito: *aqui vai
conteúdo, e não é isso que estamos decidindo agora.*

Regras do gênero:

- **N opções da MESMA estrutura, nunca N coisas diferentes.** Se as opções não
  são comparáveis lado a lado, não é prancha — é um documento comum com seções.
  As mini-telas têm que ter o mesmo esqueleto (as mesmas abas, o mesmo corpo)
  para o olho pegar só a diferença.
- **Uma só cor, e ela marca a região em disputa.** Todo o resto é papel, tinta e
  cinza. Use hachura diagonal (`repeating-linear-gradient`) na área que está
  sendo decidida — é o vocabulário de revisão de planta. Se duas coisas estão
  coloridas, o leitor não sabe onde olhar.
- **Cada opção termina com o CUSTO, não com a opinião.** O que muda para quem
  usa: quantos cliques, o que quebra, o que precisa ser refeito. A recomendação
  entra como borda destacada + rótulo `★`, e ela é **uma** — recomendar duas é
  não recomendar.
- **A opção errada aparece riscada quando ajuda.** Se existe um jeito óbvio e
  ruim de fazer (a faixa de status que vira parágrafo, a tabela que estoura),
  desenhe-o em `<s>` com uma linha dizendo por que falha. Vale mais que
  descrever a regra.
- **Cotas em vez de legendas.** Sob cada prancha, uma linha mono curta com o que
  o desenho tem de medida real ("bloco de topo, dentro da aba" · "90 entradas,
  35 destacadas"). É o que separa prancha de mockup bonito.
- **Fecha com a pergunta, numerada.** O documento existe para o leitor
  responder. O último bloco é o que você precisa dele, item a item — incluindo
  o que **você não sabe desenhar** e por quê. Prancha que não pergunta nada é
  apresentação.
- **Cabeçalho declara revisão.** `WIREFRAME · REV 1`, e a revisão sobe quando o
  leitor corrige o entendimento. A segunda revisão abre com um bloco curto
  **"o que mudou nesta revisão"** — porque a prancha é conversa, não entrega.
- **Nunca é código vivo.** Prancha aprovada é intenção de produto: o que existe,
  onde fica. O idioma visual da implementação vem dos componentes reais do
  sistema, sempre. Copiar o desenho da prancha para dentro do produto gera
  botão que não existe e layout que ninguém tem — mesma armadilha do mockup.

#### 2.3 Direção E em detalhe — o gênero "blueprint de composição"

A pergunta é **como esta peça é montada**, não qual de N layouts escolher.
Investigue do consumidor ao primitivo; apresente do primitivo ao específico.
Leia os mapas e patterns do projeto, siga imports/JSX/types e prove cada encaixe.
O caminho físico, o papel arquitetural e o conteúdo renderizado são informações
diferentes: a árvore mostra onde mora; a figura mostra quem contém quem.

A receita é uma página contínua com componente à esquerda e contrato alinhado
à direita. Cada faixa acrescenta uma camada reconhecível. `children`, slots,
contexto, helpers e adapters têm origem identificada. O que é novo aparece em
verde com rótulo de proposta; verde não é prova de implementação.

Leia [o playbook completo](references/blueprint-componentes.md) e abra
[a receita exemplar](references/exemplos/E-blueprint-componentes.html).
Ela tem vocabulário próprio: traços finos, papel off-white, poucos rótulos e
aninhamento real. Não exige numerais gigantes, sombras, narrativa em parágrafos,
N opções nem uma pergunta final. O desenho pode conter várias camadas quando
essa contenção for o próprio assunto, sem tratar isso como cards decorativos.

### 3. Montar o esqueleto

Anatomia comum às duas direções principais (A e B; C é delta sobre A, ver §2.1;
**D e E têm anatomias próprias — ver §2.2 e §2.3**):

```
header/doc-plate (metadata mono)  →  capa (título gigante + 1 parágrafo)
→ [nav rail, se passo-a-passo]
→ seções alternadas (texto ⇄ diorama, zigue-zague esquerda/direita)
→ [callout invertido escuro, se houver 1 destaque]
→ fechamento (frase-épico + carimbo ou checklist)  →  footer mono
```

### 4. Desenhar 1 diorama por seção

Este passo descreve A/B/C. Para E, monte as faixas de composição do playbook.

> **Antes: é diorama ou é prancha?** Diorama conta UMA cena de algo que existe,
> com texto real dentro. Se o que você precisa mostrar são **opções comparáveis
> de uma estrutura ainda não decidida**, o gênero é a Direção D (§2.2) — e
> insistir no diorama te obriga a inventar conteúdo para ilustrar.

O diorama é a alma. Regras que fazem ele funcionar:

- **Conta UMA cena**, não decora. "Toggle ligado → template riscado sumindo" é cena;
  quatro caixas genéricas é decoração.
- **3 a 6 elementos**, nunca mais. Diorama lotado vira screenshot ruim.
- Vive num **canvas quadriculado** (grid 22px) com **plaquinha `Fig. N — nome`**
  no canto (via `data-fig` + `::after`). A plaquinha é o que faz parecer manual.
- Elementos com **borda dura 1.5px na cor da tinta + sombra offset sólida**
  (`4px 4px 0`), sem blur. Fantasmas/excluídos: borda dashed, sem sombra.
- **Texto real dentro**: a mensagem de erro literal do sistema, o nome do botão real.
- Catálogo completo de primitivos (ficha, modal, toast, toggle, fluxo, legenda de
  estados, mini-gráfico, calendário, carimbo, card de prova…) em
  `references/receita.md` — copiar e adaptar, não reinventar.
- Para sistemas (§1.2), os primitivos de `receita.md` §12: explorer de IDE com
  pastas, editor com linhas marcadas, chave que liga e desliga, árvore, pilha de
  camadas, barras com contagem real, linha do tempo. Ícone é CSS ou SVG de traço,
  nunca emoji.

### 5. Motion — pouco e delicioso

- Entrada: `rise` com stagger (`animation-delay` escalonado) no load, ou
  IntersectionObserver de 6 linhas para revelar no scroll.
- **Uma** micro-delícia por documento: caret piscando num input, carimbo que estampa
  com overshoot (`cubic-bezier(.2,1.6,.4,1)`), item oculto que some e volta em loop.
  Mais de uma vira parque de diversões.
- `@media print`: matar animações, garantir `break-inside: avoid`.

### 6. Verificar antes de entregar

- Abrir mentalmente em 390px: grid vira coluna? zigue-zague reordena?
- Todo texto sobre papel tem contraste real? (muted ≠ ilegível)
- Todo destaque que mudou o fundo definiu também uma cor de texto legível?
- O texto declara estado, evidência, e ação sem soar burocrático ou performático?
- A plaquinha Fig. está em todos os dioramas? Numeração sequencial?
- O leitor não-técnico entende cada seção sem glossário?
- Na Direção D: as opções têm o MESMO esqueleto (dá para comparar de olho)? Só
  UMA região está colorida? Cada uma termina em custo, não em opinião? Existe
  exatamente uma recomendação? O documento fecha com a pergunta numerada?
- Na Direção C: todo `.prova` tem comando real + critério de aceite real? Nenhum
  slot foi preenchido com dado inventado?
- Na Direção E: árvore, encaixes e contratos apontam para fontes? Cada faixa
  incorpora as anteriores? `import` foi separado de renderização? Novas props
  e mods estão marcados localmente? A receita passou por inspeção visual?
- Em proof com renderer: nenhum byte do HTML oficial foi escrito à mão?
- Explicando um sistema em A/B: a ordem é onde mora → mecanismo → por quê → quem usa →
  caso real → o que fazer? Termos ambíguos foram separados antes do uso? Datas
  absolutas e números com limite declarado?

## As leis do estilo

A Direção E usa os tokens e a anatomia próprios do playbook. As regras de
tipografia, bordas, numerais e decoração abaixo descrevem A–D; não sobrescrevem
a folha técnica de E. A regra de arquivo autocontido vale para todas.

1. **Tipografia com caráter.** Nunca Inter/Roboto/Arial/system genérica. Direção A:
   display geométrica (Futura, Avenir Next) + mono de verdade. Direção B: serif
   editorial (Instrument Serif, Fraunces) + grotesk limpa + mono para metadata.
   Direção C herda a tipografia de A. Direção D usa **uma família técnica só, em
   dois cortes** (mono para cota e label, sans irmã para o corpo — IBM Plex é o
   par de referência): planta baixa não mistura vozes. Google Fonts ou fontes de
   sistema com personalidade.
2. **Papel + tinta + UMA cor de sinal.** Papel quente (`#FAF9F5`/`#F3EFE6`), tinta
   quase-preta, um sinal (laranja quente, verde). Cores extras só quando SÃO dado
   (4 estados = 4 pontinhos coloridos) — nunca decoração.
3. **Labels e metadata sempre mono, uppercase, letter-spacing largo.** É o que dá
   cheiro de documento técnico impresso.
4. **Bordas duras, sombras sólidas.** 1–1.5px na tinta; sombra `Npx Npx 0` sem blur.
   Zero border-radius grande, zero gradiente decorativo, zero glassmorphism.
5. **Numerais gigantes vazados** (`-webkit-text-stroke` + fill transparente) como
   âncora visual de cada seção. **Na Direção D, não** — a âncora ali é a legenda
   de prancha (`FIG. 1B`), e numeral gigante rouba o olho da região hachurada.
6. **Um arquivo só.** HTML autocontido: CSS inline no `<head>`, JS mínimo inline,
   sem build, sem CDN além de fontes. Abre com dois cliques pra sempre.

### O arquivo abre com dois cliques — o que quebra em `file://`

O documento é aberto direto do disco, sem servidor. O navegador trata `file://`
como origem isolada, e várias coisas que funcionam num site param de funcionar:

| Quebra em `file://` | Faça assim |
|---|---|
| `fetch()`/XHR de JSON ou HTML local | dado inline no HTML (`<script type="application/json">` ou objeto JS) |
| `<script type="module">` com `import` de arquivo | JS clássico inline, sem imports |
| caminho absoluto `/img/x.png` | imagem ao lado do HTML (`./x.png`) ou `data:` URI |
| link `file:///Users/fulano/...` | caminho relativo, ou o endereço publicado; caminho da sua máquina não abre em outra |
| fonte ou CSS de CDN sem fallback | Google Fonts com pilha de sistema depois (`'Instrument Serif', Georgia, serif`) — sem internet, o documento continua legível |
| `iframe` de outro arquivo local | conteúdo inline |

Antes de entregar: abra o arquivo com dois cliques, de outra pasta e sem
internet. Se algo some, o documento ainda depende de servidor. HTML de proof
publicado por renderer segue a mesma regra: CSS embutido e caminhos relativos ao
`index.html`.

## Anti-patterns

- **Prancha (D) que vira apresentação:** N opções e nenhuma pergunta no fim, ou
  duas recomendações — que é o mesmo que nenhuma.
- **Diorama de coisa não decidida:** conteúdo inventado para preencher a cena. O
  leitor debate o texto falso em vez da estrutura. Use a Direção D.
- Screenshot real no lugar de diorama — pesa, envelhece, quebra o estilo. **Exceção
  deliberada:** o `.print-slot` da Direção C, na Rev. 1 preenchida — ali o
  screenshot real É o conteúdo, não um substituto de diorama (ver §2.1).
- Diorama que não conta cena (caixas com lorem ipsum conceitual).
- Cards decorativos dentro de cards, 5 cores competindo, gradiente roxo sobre
  branco. Em E, caixas aninhadas representam contenção comprovada, não decoração.
- Tom de manual corporativo. Didático fala como gente: "uma vez só — nunca mais
  volta aqui".
- Parágrafos longos. O texto acompanha o diorama, não compete com ele.
- Na Direção C: preencher um `.prova` com resultado inventado, comando genérico
  ou critério de aceite vago — se a claim não vem de um PR/commit real, não
  entra no documento. Um slot `▢` vazio é honesto; um slot preenchido com
  ficção não é.

## Referência obrigatória

Antes de escrever o CSS, ler **`references/receita.md`** (Direção D: §11;
primitivos de sistema: §12; blueprint E: §13 e seu playbook) — contém os tokens das direções, o CSS completo do
canvas de diorama, o catálogo de primitivos prontos para copiar (incluindo o
card `.prova` da Direção C) e a anatomia de página de cada uma.

Antes de qualquer HTML de proof, ler **`references/proof-html.md`**.

**Exemplos reais, um por direção** (`references/exemplos/`) — abrir o da direção
escolhida antes de codar; eles são a fonte de onde a receita foi destilada:

| Arquivo | Direção | O que mostra |
|---|---|---|
| `A-manual-escalaflow-quickstart.html` | A | O original (10/06/2026): manual de primeira escala do EscalaFlow, `EF-QS-001`, rail, steps em zigue-zague, 7 dioramas |
| `B-editorial-panorama-export-v2.html` | B | Narrativa serif da convergência do Export V2, numerais fantasma, carimbo de fechamento |
| `C-prova-importacao.html` | C | Prova preenchida (Rev. 1) do gate de importação: `.prova`, prints reais, gate de validade |
| `D-prancha-unidade-exames.html` | D | Prancha `WIREFRAME · REV 2` em IBM Plex: opções da mesma tela lado a lado, custo e pergunta |
| `E-blueprint-componentes.html` | E | Receita de composição progressiva: árvore real, primitivos até consumidores, children aninhados, contratos laterais e deltas propostos |

Sub-skills deste plugin: `explain-clearly` (reconstrói o significado antes de
desenhar) e `writing-clearly-and-concisely` (revisa cada frase antes de entregar).

