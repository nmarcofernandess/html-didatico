// html-didatico · kit — a biblioteca de componentes.
// Cada componente é uma função pura: props (os atributos) e filhos (o HTML de dentro) viram a
// marcação semântica que kit.css veste. No navegador, <w-field label="Peso" value="62 kg"> é trocado
// por essa marcação; a mesma função roda num DOM de servidor (Playwright, jsdom) para pré-renderizar,
// e é o contrato que uma versão React (Remotion) repete: mesmo nome, mesmas props, mesma saída.
// d-* monta o documento (capa, parte, abas). w-* desenha o wireframe e o blueprint da figura.
;(() => {
  const VERSAO = '4.0.0'
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const lista = s => (s && s !== true ? String(s).split('|').map(x => x.trim()).filter(Boolean) : [])
  const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const ico = n => (n && n !== true ? `<svg class="ico" aria-hidden="true"><use href="#i-${esc(n)}"/></svg>` : '')
  const num = v => parseFloat(String(v ?? '').replace(/\./g, '').replace(',', '.'))
  // Texto solto vira parágrafo; HTML já com blocos passa como está.
  const paragrafo = k => (k.trim() && !/^\s*<(p|ul|ol|div|table|figure|section|h[1-6])\b/i.test(k) ? `<p>${k.trim()}</p>` : k)

  // Props que viram data-* na raiz: o estado que o CSS lê. Texto (título, legenda) não vai para atributo.
  const ESTADO = ['mark', 'pin', 'click', 'on', 'off', 'tone', 'state', 'kind', 'card', 'bleed', 'num', 'strong', 'head', 'who', 'row', 'sub', 'back']
  const raiz = (tag, nome, p, miolo, { cls = '', estilo = '', attrs = '' } = {}) => {
    const dados = ESTADO.filter(k => p[k] !== undefined && p[k] !== false).map(k => (p[k] === true ? ` data-${k}` : ` data-${k}="${esc(p[k])}"`)).join('')
    const x = p.click ? `--x:${esc(p.x ?? '72%')};--y:${esc(p.y ?? '55%')};` : ''
    const style = estilo || x ? ` style="${x}${estilo}"` : ''
    const id = p.id ? ` id="${esc(p.id)}"` : ''
    const pino = p.pin && p.pin !== true ? `<span class="pin">${esc(p.pin)}</span>` : ''
    const cursor = p.click ? '<svg class="cursor" aria-hidden="true"><use href="#i-cursor-fill"/></svg>' : ''
    return `<${tag} class="${nome}${cls ? ' ' + cls : ''}"${id}${dados}${style}${attrs}>${miolo}${pino}${cursor}</${tag}>`
  }
  const filhos = (el, sel) => [...el.children].filter(c => c.matches(sel))

  const C = {}
  // grupo: Documento | Tela | Esquema | Caneta. props: nome → o que faz. ex: o exemplo que a folha de peças mostra.
  const def = (tag, spec) => { C[tag] = { tag, ...spec } }

  // ── Documento ────────────────────────────────────────────────────────────

  def('d-doc', {
    grupo: 'Documento', doc: 'A página inteira. Com card, vira cartão: uma pergunta, uma página.',
    props: { card: 'cartão de uma página, mais largo, sem trilho nem abas' },
    html: (p, k) => raiz('div', 'd-doc page', p, k, { cls: p.card ? 'page--card' : '' }),
  })
  def('d-cover', {
    grupo: 'Documento', doc: 'A capa: o rótulo do documento. O filho é o título.',
    props: { kind: 'a forma: Cartão, Aula, Explicação, Passo a passo, Decidir, Prova, Montagem, Maquete', subject: 'produto e assunto', date: 'dd/mm/aaaa', sub: 'o caso em uma linha, com os números', lead: 'o que o leitor consegue no fim' },
    ex: '<d-cover kind="Cartão" subject="DietFlow · Cálculo" date="22/11/2026" sub="Ana nasceu em 15/11/1980; o Cálculo é de 05/11/2025.">Que data vale num Cálculo retroativo?</d-cover>',
    html: (p, k) => raiz('header', 'd-cover cover', p,
      `<div class="plate">${p.kind ? `<span class="plate__kind">${esc(p.kind)}</span>` : ''}${p.subject ? `<span class="plate__subject">${esc(p.subject)}</span>` : ''}${p.date ? `<span class="plate__date">${esc(p.date)}</span>` : ''}</div>` +
      `<h1>${k.trim()}</h1>${p.sub ? `<p class="cover__sub">${esc(p.sub)}</p>` : ''}${p.lead ? `<p class="cover__lead">${esc(p.lead)}</p>` : ''}`),
  })
  def('d-part', {
    grupo: 'Documento', doc: 'Uma parte: um assunto, um título, uma figura. A figura (w-fig, tabela ou slot="fig") vai para a coluna da direita.',
    props: { title: 'o título da parte, de preferência a pergunta do leitor', id: 'âncora', wide: 'empilha texto e figura em largura total' },
    html: (p, k, el) => {
      const fig = filhos(el, '.w-fig, table.table, [slot="fig"]')
      fig.forEach(f => f.removeAttribute('slot'))
      const lado = fig.length && !p.wide
      const resto = [...el.childNodes].filter(n => !fig.includes(n)).map(n => (n.nodeType === 1 ? n.outerHTML : n.textContent)).join('')
      const titulo = p.title ? `<h2>${esc(p.title)}</h2>` : ''
      const texto = titulo || resto.trim() ? `<div class="prose">${titulo}${resto}</div>` : ''
      const figuras = fig.map(f => f.outerHTML).join('')
      return raiz('section', 'd-part part', { ...p, id: p.id || (p.title ? slug(p.title) : undefined) },
        lado ? `${texto}<div class="part__fig">${figuras}</div>` : texto + figuras, { attrs: lado ? ' data-side' : '' })
    },
  })
  def('d-steps', {
    grupo: 'Documento', doc: 'Passos numerados de verdade: cada d-part de dentro ganha o seu número. Com rail, abre um trilho.',
    props: { rail: 'trilho no topo com um atalho por passo (quatro passos ou mais)' },
    html: (p, k, el) => {
      const partes = filhos(el, '.d-part')
      const trilho = p.rail ? `<nav class="rail" aria-label="Passos">${partes.map((s, i) => `<a href="#${esc(s.id)}"><b>${i + 1}</b>${esc(s.querySelector('h2')?.textContent ?? '')}</a>`).join('')}</nav>` : ''
      return trilho + raiz('div', 'd-steps', p, k)
    },
  })
  def('d-tabs', {
    grupo: 'Documento', doc: 'Camadas do mesmo documento para leitores diferentes. Filhos: d-tab.',
    props: { sub: 'abas dentro de uma aba (as dúvidas de uma aula)' },
    html: (p, k, el) => {
      const abas = filhos(el, '.tabs__panel')
      const botoes = abas.map(a => `<button type="button" role="tab" id="tab-${esc(a.id)}" aria-controls="${esc(a.id)}" aria-selected="false">${esc(a.dataset.label)}</button>`).join('')
      return raiz('div', 'd-tabs tabs', p, `<div class="tabs__list" role="tablist">${botoes}</div>${k}`, { cls: p.sub ? 'tabs--sub' : '' })
    },
  })
  def('d-tab', {
    grupo: 'Documento', doc: 'Uma aba de d-tabs. O id vira endereço: #id abre a aba.',
    props: { label: 'o nome na aba', id: 'âncora (padrão: o rótulo sem acento)' },
    html: (p, k) => `<section class="tabs__panel" role="tabpanel" id="${esc(p.id || slug(p.label))}" data-label="${esc(p.label)}" aria-labelledby="tab-${esc(p.id || slug(p.label))}">${k}</section>`,
  })
  def('d-note', {
    grupo: 'Documento', doc: 'Aviso: uma condição que muda o resultado. O rótulo diz o tipo.',
    props: { tone: 'warn | err | ok | mark', label: 'o tipo do aviso, em palavras' },
    ex: '<d-note tone="warn" label="Antes de gerar">A demanda vazia gera uma escala vazia.</d-note>',
    html: (p, k) => {
      const i = { warn: 'warning-fill', err: 'x-circle-fill', ok: 'check-circle-fill' }[p.tone] ?? 'info-fill'
      return raiz('div', 'd-note note', p, `${p.label ? `<p class="note__label">${ico(i)}${esc(p.label)}</p>` : ''}${paragrafo(k)}`)
    },
  })
  def('d-check', {
    grupo: 'Documento', doc: 'Conferência que o leitor marca. Filhos: li, um item cada.',
    props: { title: 'o que se confere' },
    ex: '<d-check title="Antes de gerar"><li>Setor com horário</li><li>Equipe com contrato</li></d-check>',
    html: (p, k, el) => raiz('div', 'd-check check', p,
      `<div class="check__head"><span>${esc(p.title ?? 'Conferência')}</span><output></output></div><ul>${[...el.querySelectorAll('li')].map(li => `<li><label><input type="checkbox"><span>${li.innerHTML}</span></label></li>`).join('')}</ul>`),
  })
  def('d-path', {
    grupo: 'Documento', doc: 'Onde a coisa fica no produto, do menu até a tela. Separe os níveis com ›.',
    props: { label: 'o que vem antes (padrão: Onde)' },
    ex: '<d-path>Setores › Novo Setor › Regime</d-path>',
    html: (p, k) => raiz('p', 'd-path', p, `<span>${esc(p.label ?? 'Onde')}</span>${k.split(/\s*(?:›|&gt;)\s*/).filter(Boolean).map(x => `<b>${x}</b>`).join('')}`),
  })
  def('d-cols', {
    grupo: 'Documento', doc: 'Coisas equivalentes lado a lado, como uma comparação. Empilham no celular.',
    props: { n: '2 ou 3 colunas' },
    html: (p, k) => raiz('div', 'd-cols cols', p, k, { attrs: ` data-n="${esc(p.n ?? 2)}"` }),
  })
  def('d-band', {
    grupo: 'Documento', doc: 'Faixa preta: um caminho alternativo. Uma por documento, no máximo. slot="aside" vai para a direita.',
    props: { title: 'o título da faixa' },
    html: (p, k, el) => {
      const lado = filhos(el, '[slot="aside"]')
      lado.forEach(f => f.removeAttribute('slot'))
      const resto = [...el.childNodes].filter(n => !lado.includes(n)).map(n => (n.nodeType === 1 ? n.outerHTML : n.textContent)).join('')
      return raiz('aside', 'd-band band', p, `<div class="prose">${p.title ? `<h2>${esc(p.title)}</h2>` : ''}${paragrafo(resto)}</div><div class="band__aside">${lado.map(f => f.outerHTML).join('')}</div>`)
    },
  })
  def('d-closing', {
    grupo: 'Documento', doc: 'O fecho com carimbo: o único gesto de festa. Diz o que o leitor conseguiu.',
    props: { stamp: 'o que o carimbo diz, em até três palavras' },
    ex: '<d-closing stamp="Escala no ar">O rodízio já roda sozinho.</d-closing>',
    html: (p, k) => raiz('div', 'd-closing closing', p, `<div class="stamp">${esc(p.stamp ?? '')}</div>${paragrafo(k)}`),
  })
  def('d-src', {
    grupo: 'Documento', doc: 'De onde vem o fato e até onde a conferência foi, em uma linha.',
    props: {},
    ex: '<d-src>Conferido em dev em 22/11/2026, nas figuras 2 e 3.</d-src>',
    html: (p, k) => raiz('p', 'd-src src', p, k.trim()),
  })
  def('d-foot', {
    grupo: 'Documento', doc: 'O pé: fecha o rótulo com fio grosso.',
    props: { left: 'produto e assunto', right: 'o documento e a data' },
    ex: '<d-foot left="DietFlow · Cálculo" right="Data clínica · 22/11/2026"></d-foot>',
    html: (p, k) => raiz('footer', 'd-foot foot', p, `<span>${esc(p.left ?? '')}</span><span>${esc(p.right ?? '')}</span>${k}`),
  })

  // ── Figura e tela (wireframe) ────────────────────────────────────────────

  def('w-fig', {
    grupo: 'Tela', doc: 'A moldura de toda figura: chão de prancheta e a legenda numerada embaixo.',
    props: { cap: 'a legenda: a conclusão que a figura mostra, com o dado do caso', bleed: 'a tela continua para fora da moldura', h: 'altura do recorte com bleed (ex.: 17rem)' },
    html: (p, k) => raiz('figure', 'w-fig fig', p, `<div class="fig__stage"${p.h ? ` style="--scene-h:${esc(p.h)}"` : ''}>${k}</div>${p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : ''}`),
  })
  def('w-win', {
    grupo: 'Tela', doc: 'Uma janela do produto em wireframe: barra com o nome da tela e o corpo.',
    props: { title: 'o nome da tela, como no produto', icon: 'ícone à direita da barra', tone: 'warn | err: cor do ícone da barra', heading: 'título dentro do corpo', nav: 'menu lateral: Item|Item|Item', on: 'o item ativo do menu' },
    ex: '<w-win title="Cálculo" icon="calendar-blank" heading="Dados do Paciente"><w-text lines="2"></w-text></w-win>',
    html: (p, k) => {
      const nav = lista(p.nav)
      const lado = nav.length ? `<div class="win__side">${nav.map(n => `<span class="${n === p.on ? 'is-on' : ''}">${esc(n)}</span>`).join('')}</div>` : ''
      const barra = p.title ? `<div class="win__bar"><span class="grow">${esc(p.title)}</span>${ico(p.icon)}</div>` : ''
      return raiz('div', 'w-win win', p, `${barra}${lado}<div class="win__body">${p.heading ? `<div class="win__title">${esc(p.heading)}</div>` : ''}${k}</div>`, { attrs: nav.length ? ' data-split' : '' })
    },
  })
  def('w-grid', {
    grupo: 'Tela', doc: 'Campos curtos lado a lado.',
    props: { cols: 'quantas colunas (padrão 2)' },
    ex: '<w-grid><w-field label="Abre" value="06h"></w-field><w-field label="Fecha" value="22h"></w-field></w-grid>',
    html: (p, k) => raiz('div', 'w-grid', p, k, { estilo: `--cols:${esc(p.cols ?? 2)};` }),
  })
  def('w-text', {
    grupo: 'Tela', doc: 'Barras no lugar das palavras que a história não usa. Variam de largura sozinhas.',
    props: { lines: 'quantas linhas (padrão 1)', w: 'largura da primeira, em %' },
    ex: '<w-text lines="3"></w-text>',
    html: p => {
      const larguras = [p.w ? num(p.w) : 88, 64, 76, 52, 70]
      return raiz('div', 'w-text', p, Array.from({ length: +(p.lines ?? 1) }, (_, i) => `<i style="--w:${larguras[i % larguras.length]}%"></i>`).join(''), { attrs: ' aria-hidden="true"' })
    },
  })
  def('w-field', {
    grupo: 'Tela', doc: 'Campo: rótulo em cima, o valor na caixa.',
    props: { label: 'o rótulo do produto', value: 'o que está escrito', unit: 'unidade à direita', icon: 'ícone à direita', state: 'focus | caret', tone: 'warn | err', hint: 'a linha abaixo do campo', ph: 'barra no lugar do valor (largura em %)' },
    ex: '<w-field label="Peso" value="62 kg" state="focus"></w-field>',
    html: p => raiz('div', 'w-field field', p,
      `${p.label ? `<span class="field__label">${esc(p.label)}</span>` : ''}<span class="field__box">${p.value ? `<span>${esc(p.value)}</span>` : ''}${p.ph ? `<i class="field__ph" style="--w:${num(p.ph) || 50}%"></i>` : ''}${p.state === 'caret' ? '<i class="caret"></i>' : ''}<span class="grow"></span>${p.unit ? `<span class="field__unit">${esc(p.unit)}</span>` : ''}${ico(p.icon)}</span>${p.hint ? `<small class="field__hint">${esc(p.hint)}</small>` : ''}`),
  })
  def('w-list', {
    grupo: 'Tela', doc: 'Uma lista de linhas separadas por fio. Filhos: w-item.',
    props: {},
    html: (p, k) => raiz('div', 'w-list list', p, k),
  })
  def('w-item', {
    grupo: 'Tela', doc: 'Uma linha de lista: nome, metadado e uma etiqueta. Filhos entram no fim (um botão).',
    props: { title: 'o nome', meta: 'a linha de baixo', tag: 'etiqueta à direita', tagtone: 'ok | warn | err | ink | mark', icon: 'ícone à esquerda', on: 'linha selecionada', off: 'linha que não vale mais', tone: 'ok | warn | err no nome', bar: 'barra no lugar do nome (largura em %)' },
    ex: '<w-list><w-item title="10/11/2021" meta="62 kg · 1,65 m" tag="selecionada" tagtone="ink" on></w-item><w-item bar="46"></w-item></w-list>',
    html: (p, k) => {
      const nome = p.title ? `<b>${esc(p.title)}</b>` : p.bar ? `<i class="item__bar" style="--w:${num(p.bar) || 50}%"></i>` : ''
      const tag = p.tag ? `<span class="w-chip chip"${p.tagtone === 'mark' ? ' data-mark' : p.tagtone ? ` data-tone="${esc(p.tagtone)}"` : ''}>${esc(p.tag)}</span>` : ''
      return raiz('div', 'w-item row', p, `${ico(p.icon)}<span class="item__text">${nome}${p.meta ? `<small>${esc(p.meta)}</small>` : ''}</span>${tag}${k}`)
    },
  })
  def('w-btn', {
    grupo: 'Tela', doc: 'Botão. O primário é o preto; um por tela.',
    props: { kind: 'primary | ghost | danger', icon: 'ícone antes do texto', off: 'desabilitado' },
    ex: '<w-btn kind="primary" click>Importar</w-btn>',
    html: (p, k) => raiz('span', 'w-btn btn', p, `${ico(p.icon)}${k.trim()}`),
  })
  def('w-seg', {
    grupo: 'Tela', doc: 'Controle segmentado: escolha entre poucas opções, todas à vista.',
    props: { options: 'Opção|Opção|Opção', on: 'a escolhida' },
    ex: '<w-seg options="5x2|6x1" on="6x1"></w-seg>',
    html: p => raiz('span', 'w-seg seg', p, lista(p.options).map(o => `<span class="${o === p.on ? 'is-on' : ''}">${esc(o)}</span>`).join('')),
  })
  def('w-chip', {
    grupo: 'Tela', doc: 'Etiqueta curta de estado.',
    props: { tone: 'ok | warn | err | ink' },
    ex: '<w-chip tone="ok">Adequado</w-chip>',
    html: (p, k) => raiz('span', 'w-chip chip', p, k.trim()),
  })
  def('w-toggle', {
    grupo: 'Tela', doc: 'Interruptor com o rótulo do produto.',
    props: { on: 'ligado' },
    ex: '<w-toggle on>Lembrete por e-mail</w-toggle>',
    html: (p, k) => raiz('span', 'w-toggle toggle', p, `<i aria-hidden="true"></i>${k.trim() ? `<span>${k.trim()}</span>` : ''}`),
  })
  def('w-avatar', {
    grupo: 'Tela', doc: 'Iniciais de uma pessoa.',
    props: {},
    ex: '<w-avatar>AS</w-avatar>',
    html: (p, k) => raiz('span', 'w-avatar avatar', p, k.trim()),
  })
  def('w-kv', {
    grupo: 'Tela', doc: 'Uma linha de ficha: rótulo à esquerda, valor ao lado.',
    props: { k: 'o rótulo', v: 'o valor', num: 'valor numérico, alinhado à direita' },
    ex: '<w-kv k="Lipídios" v="35,8 g"></w-kv><w-kv k="Valor energético" v="1.610 kcal" mark></w-kv>',
    html: (p, k) => raiz('div', 'w-kv kv', p, `<span class="kv__k">${esc(p.k ?? '')}</span><span class="kv__v">${esc(p.v ?? '')}${k}</span>`),
  })
  def('w-msg', {
    grupo: 'Tela', doc: 'Mensagem do sistema, com o texto literal que o produto mostra.',
    props: { tone: 'warn | err | ok', title: 'a primeira linha, em negrito' },
    ex: '<w-msg tone="warn" title="Acima de 999 mcg">Confira se não seria mg.</w-msg>',
    html: (p, k) => {
      const i = { warn: 'warning-fill', err: 'x-circle-fill', ok: 'check-circle-fill' }[p.tone] ?? 'info-fill'
      return raiz('div', 'w-msg banner', p, `${ico(i)}${p.title ? `<b>${esc(p.title)}</b>` : ''}${k.trim() ? `<span class="msg__body">${k.trim()}</span>` : ''}`)
    },
  })
  def('w-toast', {
    grupo: 'Tela', doc: 'Aviso que aparece por cima e some.',
    props: { icon: 'ícone (padrão: check)' },
    ex: '<w-toast>Escala gerada para dezembro</w-toast>',
    html: (p, k) => raiz('div', 'w-toast toast', p, `${ico(p.icon ?? 'check-circle-fill')}<span>${k.trim()}</span>`),
  })
  def('w-menu', {
    grupo: 'Tela', doc: 'Menu aberto, com o item de que a parte fala.',
    props: { items: 'Item|Item|Item', on: 'o item em foco' },
    ex: '<w-menu items="Duplicar|Arquivar|Excluir" on="Arquivar"></w-menu>',
    html: p => raiz('div', 'w-menu menu', p, lista(p.items).map(o => `<span class="${o === p.on ? 'is-on' : ''}">${esc(o)}</span>`).join('')),
  })
  def('w-term', {
    grupo: 'Tela', doc: 'Saída de terminal: poucas linhas, reais e curtas.',
    props: {},
    ex: '<w-term>$ node scripts/check.mjs cartao.html\n<span class="term__dim">0 falhas · 1 aviso</span></w-term>',
    html: (p, k) => raiz('pre', 'w-term term', p, k.replace(/^\n+|\s+$/g, '')),
  })

  def('w-shot', {
    grupo: 'Tela', doc: 'Um print real da tela, numa moldura. Sem src, o espaço hachurado diz que o print falta.',
    props: { src: 'o arquivo do print', alt: 'o que o print mostra', ratio: 'proporção do espaço vazio (padrão 16/10)' },
    ex: '<w-shot alt="Prescrição com o checkbox antes do card"></w-shot>',
    html: p => raiz('div', 'w-shot', p, p.src ? `<img src="${esc(p.src)}" alt="${esc(p.alt ?? '')}" loading="lazy">` : `<span class="shot__falta">${esc(p.alt ? `Print ausente: ${p.alt}` : 'Print ausente')}</span>`, { estilo: p.src ? '' : `--ratio:${esc(p.ratio ?? '16/10')};` }),
  })

  // ── A caneta ──────────────────────────────────────────────────────────────

  def('w-callout', {
    grupo: 'Caneta', doc: 'Chamada: o nome, um fio tracejado e o que ele diz ou vira. Com mark, é a caneta.',
    props: { label: 'o nome à esquerda', strong: 'nome em tinta forte', pin: 'em vez do nome, o número do pino' },
    ex: '<w-callout label="Calendário">data passada: 05/11/2025</w-callout><w-callout label="Idade" strong mark>44 na data, 46 no dia</w-callout>',
    html: (p, k) => {
      const nome = p.pin && p.pin !== true ? `<span class="pin">${esc(p.pin)}</span>${p.label ? esc(p.label) : ''}` : esc(p.label ?? '')
      return raiz('div', 'w-callout link', { ...p, pin: undefined }, `<span class="callout__label">${nome}</span><span class="callout__dash" aria-hidden="true"></span><span class="callout__value">${k.trim()}</span>`)
    },
  })

  // ── Esquema (blueprint) ──────────────────────────────────────────────────

  def('w-flow', {
    grupo: 'Esquema', doc: 'Uma sequência de estados ou ações. As setas entram sozinhas entre os w-node.',
    props: {},
    ex: '<w-flow><w-node>Pedido</w-node><w-node on sub="com o kit">Composição</w-node><w-node>Check</w-node></w-flow>',
    html: (p, k, el) => raiz('div', 'w-flow flow', p, filhos(el, '.w-node').map((n, i) => (i ? `<span class="to${n.hasAttribute('data-back') ? ' is-back' : ''}" aria-hidden="true"></span>` : '') + n.outerHTML).join('')),
  })
  def('w-node', {
    grupo: 'Esquema', doc: 'Um estado do fluxo.',
    props: { sub: 'a linha de baixo', on: 'o estado de que a parte fala', off: 'existe e não roda', back: 'a seta que chega aqui é de volta (tracejada)' },
    html: (p, k) => raiz('span', 'w-node', p, `${k.trim()}${p.sub && p.sub !== true ? `<small>${esc(p.sub)}</small>` : ''}`, {}),
  })
  def('w-bars', {
    grupo: 'Esquema', doc: 'Quantidades que se comparam. O número fica escrito; a altura só reforça. Filhos: w-val.',
    props: { max: 'o valor que enche a barra (padrão: o maior)' },
    ex: '<w-bars><w-val n="12">Seg</w-val><w-val n="31" mark>Qua</w-val><w-val n="20">Sex</w-val><w-val n="0" off>Dom</w-val></w-bars>',
    html: (p, k, el) => {
      const vals = filhos(el, '.w-val'), max = num(p.max) || Math.max(...vals.map(v => num(v.dataset.n) || 0), 1)
      vals.forEach(v => v.style.setProperty('--v', String(Math.round(((num(v.dataset.n) || 0) / max) * 100))))
      return raiz('div', 'w-bars bars', p, vals.map(v => v.outerHTML).join(''))
    },
  })
  def('w-val', {
    grupo: 'Esquema', doc: 'Uma barra de w-bars. O filho é o rótulo embaixo.',
    props: { n: 'o número escrito em cima', unit: 'a unidade', off: 'existe e está vazio' },
    html: (p, k) => raiz('div', 'w-val', p, `<b>${esc(p.n ?? '')}${p.unit ? ` ${esc(p.unit)}` : ''}</b><i></i><span>${k.trim()}</span>`, { attrs: ` data-n="${esc(p.n ?? '')}"` }),
  })
  def('w-matrix', {
    grupo: 'Esquema', doc: 'Uma matriz pequena: semana, escala, permissões. Filhos: w-cell.',
    props: { cols: 'quantas colunas', head: 'cabeçalho: A|B|C' },
    ex: '<w-matrix cols="7" head="D|S|T|Q|Q|S|S"><w-cell off>F</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell mark>F</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell></w-matrix>',
    html: (p, k) => raiz('div', 'w-matrix matrix', p, lista(p.head).map(h => `<span class="w-cell" data-head>${esc(h)}</span>`).join('') + k, { estilo: `--cols:${esc(p.cols ?? 7)};` }),
  })
  def('w-cell', {
    grupo: 'Esquema', doc: 'Uma célula de w-matrix.',
    props: { on: 'preenchida', off: 'vazia de propósito', who: 'a coluna do nome' },
    html: (p, k) => raiz('span', 'w-cell', p, k.trim()),
  })
  def('w-files', {
    grupo: 'Esquema', doc: 'Os arquivos que a explicação usa. Filhos: w-file.',
    props: {},
    ex: '<w-files><w-file path="kit/kit.css" note="tokens e aparência" mark></w-file><w-file path="kit/kit.js" note="os componentes"></w-file></w-files>',
    html: (p, k) => raiz('div', 'w-files files', p, k),
  })
  def('w-file', {
    grupo: 'Esquema', doc: 'Um arquivo: o caminho em mono e para que serve.',
    props: { path: 'o caminho', note: 'para que serve', dir: 'é pasta', i: 'recuo (nível)', off: 'existe e não é usado' },
    html: p => raiz('div', 'w-file', p, `${ico(p.dir ? 'folder' : 'file-text')}<code>${esc(p.path ?? '')}</code>${p.note ? `<span class="file__note">${esc(p.note)}</span>` : ''}`, { estilo: p.i ? `--i:${esc(p.i)};` : '' }),
  })
  def('w-tree', {
    grupo: 'Esquema', doc: 'Onde cada responsabilidade mora: listas aninhadas com code e um texto curto.',
    props: {},
    ex: '<w-tree><ul><li><code>kit.js</code><span>os componentes</span><ul><li class="is-mark"><code>w-field</code><span>o campo</span></li></ul></li></ul></w-tree>',
    html: (p, k) => raiz('div', 'w-tree tree', p, k),
  })
  def('w-code', {
    grupo: 'Esquema', doc: 'O trecho literal da fonte, com número de linha. Escreva < como &lt;.',
    props: { from: 'o número da primeira linha', mark: 'linhas marcadas pela caneta, contadas a partir de from: 3,4' },
    ex: '<w-code from="40" mark="41">const max = 999\nif (v > max) return erro</w-code>',
    html: (p, k) => {
      const linhas = k.replace(/^\n+|\s+$/g, '').split('\n')
      const recuo = Math.min(...linhas.filter(l => l.trim()).map(l => l.match(/^ */)[0].length))
      const de = +(p.from ?? 1), marcadas = String(p.mark && p.mark !== true ? p.mark : '').split(',').map(Number)
      return raiz('pre', 'w-code code', { ...p, mark: undefined }, linhas.map((l, i) => `<span class="${marcadas.includes(de + i) ? 'is-mark' : ''}">${l.slice(recuo) || ' '}</span>`).join(''), { estilo: `--from:${de};` })
    },
  })
  def('w-layers', {
    grupo: 'Esquema', doc: 'O que acontece antes de quê. Numeram sozinhas. Filhos: w-layer.',
    props: {},
    ex: '<w-layers><w-layer tag="roda" tagtone="ok">Digitação</w-layer><w-layer tag="falta" tagtone="warn" mark>Aviso de milhar</w-layer><w-layer off>Limite diário</w-layer></w-layers>',
    html: (p, k) => raiz('div', 'w-layers layers', p, k),
  })
  def('w-layer', {
    grupo: 'Esquema', doc: 'Uma camada.',
    props: { sub: 'a linha de baixo', tag: 'o estado', tagtone: 'ok | warn | err | ink', off: 'existe e não roda' },
    html: (p, k) => raiz('div', 'w-layer', p, `<span class="grow">${k.trim()}${p.sub && p.sub !== true ? `<small>${esc(p.sub)}</small>` : ''}</span>${p.tag ? `<span class="w-chip chip"${p.tagtone ? ` data-tone="${esc(p.tagtone)}"` : ''}>${esc(p.tag)}</span>` : ''}`),
  })
  def('w-timeline', {
    grupo: 'Esquema', doc: 'O caso real em datas absolutas. Filhos: w-when.',
    props: {},
    ex: '<w-timeline><w-when date="15/11/1980">Ana nasce</w-when><w-when date="05/11/2025" mark>Data do Cálculo: 44 anos</w-when><w-when date="22/11/2026" tone="warn">Cálculo aberto: 46</w-when></w-timeline>',
    html: (p, k) => raiz('div', 'w-timeline timeline', p, k),
  })
  def('w-when', {
    grupo: 'Esquema', doc: 'Uma data da linha do tempo. A cor do topo é o dado.',
    props: { date: 'dd/mm/aaaa', tone: 'ok | warn | err', on: 'tinta forte' },
    html: (p, k) => raiz('div', 'w-when', p, `<b>${esc(p.date ?? '')}</b>${k.trim()}`),
  })
  def('w-stat', {
    grupo: 'Esquema', doc: 'O único número grande da cena.',
    props: { n: 'o número', unit: 'a unidade' },
    ex: '<w-stat n="1.610" unit="kcal">valor energético total</w-stat>',
    html: (p, k) => raiz('div', 'w-stat stat', p, `<b>${esc(p.n ?? '')}${p.unit ? `<small>${esc(p.unit)}</small>` : ''}</b><span>${k.trim()}</span>`),
  })
  def('w-box', {
    grupo: 'Esquema', doc: 'Caixa de composição: quem contém quem. Contínua existe; tracejada é slot; magenta é proposta.',
    props: { title: 'o nome da peça', meta: 'de onde vem (pacote, arquivo)', kind: 'slot | new | off', row: 'filhos lado a lado' },
    ex: '<w-box title="Busca" meta="ui/SmartAutocomplete.tsx"><w-box title="Autocomplete" kind="slot"></w-box><w-box title="Filtro por grupo" kind="new"></w-box></w-box>',
    html: (p, k) => raiz('div', 'w-box', p, `${p.title || p.meta ? `<div class="box__head">${p.title ? `<b>${esc(p.title)}</b>` : ''}${p.meta ? `<small>${esc(p.meta)}</small>` : ''}</div>` : ''}${k}`),
  })

  // ── Montagem ─────────────────────────────────────────────────────────────

  const TAGS = Object.keys(C)
  const propsDe = el => { const p = {}; for (const a of el.attributes) p[a.name] = a.value === '' ? true : a.value; return p }
  // Monta um elemento: os filhos primeiro, depois ele, trocado pela própria marcação.
  const montar = el => {
    const spec = C[el.localName]
    if (!spec || !el.isConnected) return
    el.outerHTML = spec.html(propsDe(el), el.innerHTML, el)
  }
  const montarTudo = (raizDoc = document) => [...raizDoc.querySelectorAll(TAGS.join(','))].reverse().forEach(montar)

  // Comportamento mínimo depois da montagem: conferência, abas e endereço.
  const ligar = () => {
    for (const box of document.querySelectorAll('.d-check')) {
      if (box.dataset.ligado) continue
      box.dataset.ligado = '1'
      const saida = box.querySelector('output'), itens = [...box.querySelectorAll('input[type=checkbox]')]
      const conta = () => { if (saida) saida.textContent = `${itens.filter(i => i.checked).length}/${itens.length}` }
      box.addEventListener('change', conta)
      conta()
    }
    // Abas: uma camada por vez. Cada .tabs controla só a própria lista, então subtabs funcionam.
    const abas = [...document.querySelectorAll('.tabs')].map(caixa => {
      const lista = caixa.querySelector(':scope > .tabs__list')
      const botoes = lista ? [...lista.querySelectorAll('[role=tab]')] : []
      const abre = id => botoes.forEach(b => {
        const ativo = b.getAttribute('aria-controls') === id
        b.setAttribute('aria-selected', String(ativo))
        document.getElementById(b.getAttribute('aria-controls')).hidden = !ativo
      })
      if (!caixa.dataset.ligado) {
        caixa.dataset.ligado = '1'
        botoes.forEach(b => b.addEventListener('click', () => abre(b.getAttribute('aria-controls'))))
        if (botoes[0]) abre(botoes[0].getAttribute('aria-controls'))
      }
      return { botoes, abre }
    })
    // Endereço: #id abre as abas que contêm o alvo, de fora para dentro, e rola até ele.
    const irPara = () => {
      const alvo = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (!alvo) return
      const paineis = []
      for (let el = alvo; el; el = el.parentElement) if (el.matches('.tabs__panel')) paineis.unshift(el)
      for (const p of paineis) for (const a of abas) if (a.botoes.some(b => b.getAttribute('aria-controls') === p.id)) a.abre(p.id)
      alvo.scrollIntoView()
    }
    if (!window.__hdHash) { window.__hdHash = true; addEventListener('hashchange', irPara) }
    irPara()
  }

  const HD = { versao: VERSAO, componentes: C, montar, montarTudo, ligar, esc }
  if (typeof window !== 'undefined') window.HD = HD
  if (typeof document === 'undefined') return
  document.documentElement.classList.add('js')
  montarTudo()
  ligar()
  // Componente inserido depois (um protótipo, um player) monta sozinho ao entrar na página.
  if (window.customElements) for (const tag of TAGS) if (!customElements.get(tag)) {
    customElements.define(tag, class extends HTMLElement {
      connectedCallback() { queueMicrotask(() => { if (!this.isConnected) return; montarTudo(this); montar(this); ligar() }) }
    })
  }
})()
