// html-didatico · kit — a biblioteca de componentes.
// Cada componente é uma função pura: props (os atributos) e filhos (o HTML de dentro) viram a
// marcação semântica que kit.css veste. No navegador, <w-field label="Peso" value="62 kg"> é trocado
// por essa marcação; a mesma função roda num DOM de servidor (Playwright, jsdom) para pré-renderizar,
// e é o contrato que uma versão React (Remotion) repete: mesmo nome, mesmas props, mesma saída.
// d-* monta o documento (capa, parte, abas). w-* desenha o wireframe e o blueprint da figura.
;(() => {
  const VERSAO = '4.4.0'
  // Um atributo sem valor chega como true. Como texto, true é vazio: value="" não escreve "true".
  const esc = s => (s === true ? '' : String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]))
  const lista = s => (s && s !== true ? String(s).split('|').map(x => x.trim()).filter(Boolean) : [])
  const slug = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const ico = n => (n && n !== true ? `<svg class="ico" aria-hidden="true"><use href="#i-${esc(n)}"/></svg>` : '')
  // Número escrito como se lê: 1.610 e 1.610,5 (ponto de milhar), 62,5 e 0.5 (decimal).
  const num = v => {
    const s = String(v ?? '').trim()
    return parseFloat(s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : /^-?\d{1,3}(\.\d{3})+$/.test(s) ? s.replace(/\./g, '') : s)
  }
  const numOu = (v, padrao) => { const n = num(v); return isNaN(n) ? padrao : n }
  // Texto solto vira parágrafo; HTML que já começa num bloco passa como está.
  const paragrafo = k => (k.trim() && !/^\s*<(p|ul|ol|dl|div|table|figure|section|article|aside|header|footer|nav|details|blockquote|pre|form|hr|h[1-6])\b/i.test(k) ? `<p>${k.trim()}</p>` : k)
  // Refaz o HTML de um nó: texto volta escapado, comentário do autor não vira texto na página.
  const html = n => (n.nodeType === 1 ? n.outerHTML : n.nodeType === 3 ? esc(n.textContent) : '')

  // Props que viram data-* na raiz: o estado que o CSS lê (o tom, o tipo, se está marcado).
  // O texto que se lê (título, legenda, valor) vai para o miolo.
  const ESTADO = ['mark', 'pin', 'click', 'on', 'off', 'tone', 'state', 'kind', 'card', 'bleed', 'num', 'strong', 'head', 'who', 'row', 'sub', 'back', 'wrap', 'status', 'desk', 'study']
  const raiz = (tag, nome, p, miolo, { cls = '', estilo = '', attrs = '' } = {}) => {
    const dados = ESTADO.filter(k => p[k] !== undefined && p[k] !== false).map(k => (p[k] === true ? ` data-${k}` : ` data-${k}="${esc(p[k])}"`)).join('')
    const x = p.click ? `--x:${esc(p.x ?? '72%')};--y:${esc(p.y ?? '55%')};` : ''
    const style = estilo || x ? ` style="${x}${estilo}"` : ''
    // slot passa adiante: é como o pai (d-part, d-band) acha a figura e o lado depois de montar o filho.
    const id = (p.id ? ` id="${esc(p.id)}"` : '') + (p.slot && p.slot !== true ? ` slot="${esc(p.slot)}"` : '')
    const pino = p.pin && p.pin !== true ? `<span class="pin">${esc(p.pin)}</span>` : ''
    const cursor = p.click ? '<svg class="cursor" aria-hidden="true"><use href="#i-cursor-fill"/></svg>' : ''
    return `<${tag} class="${nome}${cls ? ' ' + cls : ''}"${id}${dados}${style}${attrs}>${miolo}${pino}${cursor}</${tag}>`
  }
  const filhos = (el, sel) => [...el.children].filter(c => c.matches(sel))

  const C = {}
  let semNome = 0
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
    props: { kind: 'a forma: Cartão, Aula, Explicação, Passo a passo, Decidir, Prova, Montagem, Maquete', subject: 'produto e assunto', ref: 'código ou revisão do documento (EF-QS-001 · rev. 1.10)', date: 'dd/mm/aaaa', sub: 'o caso em uma linha, com os números', lead: 'o que o leitor consegue no fim' },
    ex: '<d-cover kind="Cartão" subject="DietFlow · Cálculo" date="22/11/2026" sub="Ana nasceu em 15/11/1980; o Cálculo é de 05/11/2025.">Que data vale num Cálculo retroativo?</d-cover>',
    html: (p, k) => raiz('header', 'd-cover cover', p,
      `<div class="plate">${p.kind ? `<span class="plate__kind">${esc(p.kind)}</span>` : ''}${p.subject ? `<span class="plate__subject">${esc(p.subject)}</span>` : ''}${p.ref ? `<span class="plate__ref">${esc(p.ref)}</span>` : ''}${p.date ? `<span class="plate__date">${esc(p.date)}</span>` : ''}</div>` +
      `<h1>${k.trim()}</h1>${p.sub ? `<p class="cover__sub">${esc(p.sub)}</p>` : ''}${p.lead ? `<p class="cover__lead">${esc(p.lead)}</p>` : ''}`),
  })
  def('d-origin', {
    grupo: 'Documento', doc: 'A origem: logo abaixo da capa, situa quem chega sem ter visto a conversa. Onde estamos, a pergunta real e o que se pede de quem lê. Filhos: li com term, um termo interno cada, definido na primeira aparição.',
    props: { where: 'onde estamos: o sistema, a frente e o estado, com a data', q: 'a pergunta real em jogo, com o caso', ask: 'o que se pede de quem lê: decidir, conferir, aprender a fazer', 'li term': 'o termo interno, como a página o usa; o texto do li o define' },
    ex: '<d-origin where="DietFlow, testes do módulo Dieta em 27/11/2026: a ficha ainda está em construção." q="Dá para rodar os testes do módulo agora sem afrouxar teste e sem a feature regredir?" ask="Conferir o recorte e decidir o que entra na rodada."><li term="Full">a suíte que roda todos os proofs de módulo em sequência</li></d-origin>',
    html: (p, k, el) => {
      const linha = (rotulo, v) => (v && v !== true ? `<div class="origin__row"><dt>${rotulo}</dt><dd>${esc(v)}</dd></div>` : '')
      const termos = el ? [...el.querySelectorAll('li[term]')] : []
      const glossario = termos.length
        ? `<div class="origin__row origin__terms"><dt>Termos</dt><dd><dl>${termos.map(li => `<div><dt>${esc(li.getAttribute('term'))}</dt><dd>${li.innerHTML}</dd></div>`).join('')}</dl></dd></div>`
        : ''
      return raiz('section', 'd-origin origin', p, `<dl>${linha('Onde estamos', p.where)}${linha('A pergunta', p.q)}${linha('O que se pede', p.ask)}${glossario}</dl>`, { attrs: ' aria-label="Origem"' })
    },
  })
  def('d-part', {
    grupo: 'Documento', doc: 'Uma parte: um assunto, um título, uma figura. A figura (w-fig, tabela ou slot="fig") vai para a coluna da direita.',
    props: { title: 'o título da parte, de preferência a pergunta do leitor', id: 'âncora', wide: 'empilha texto e figura em largura total', desk: 'empilha e abre a figura até a largura de um desktop, para a tela de produto inteira, uma por linha' },
    html: (p, k, el) => {
      const fig = filhos(el, '.w-fig, table.table, [slot="fig"]')
      fig.forEach(f => f.removeAttribute('slot'))
      const lado = fig.length && !p.wide && !p.desk
      const resto = [...el.childNodes].filter(n => !fig.includes(n)).map(html).join('')
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
      // Todo passo do trilho precisa de endereço: a parte sem título ganha passo-N.
      partes.forEach((s, i) => { if (!s.id) s.id = `passo-${i + 1}` })
      const trilho = p.rail ? `<nav class="rail" aria-label="Passos">${partes.map((s, i) => `<a href="#${esc(s.id)}"><b>${i + 1}</b>${esc(s.querySelector('h2')?.textContent ?? '')}</a>`).join('')}</nav>` : ''
      return trilho + raiz('div', 'd-steps', p, el.innerHTML)
    },
  })
  def('d-pager', {
    grupo: 'Documento', doc: 'A navegação de uma série de páginas (um board por decisão, as aulas de um curso): o índice à esquerda, a anterior e a próxima à direita. Cada prop é rótulo|endereço.',
    props: { up: 'o índice da série: Mapa|Decisoes.dc.html', prev: 'a página anterior: Anterior|D01.dc.html', next: 'a próxima, em tinta cheia: Próxima|D03.dc.html', label: 'o nome da navegação para leitor de tela, quando a página tem duas (padrão: Páginas da série)' },
    ex: '<d-pager up="Mapa|#mapa" prev="Anterior|#d01" next="Próxima|#d03"></d-pager>',
    html: p => {
      const link = (v, cls) => { const [rotulo, href] = lista(v); return rotulo ? `<a class="${cls}" href="${esc(href ?? '#')}">${esc(rotulo)}</a>` : '' }
      return raiz('nav', 'd-pager', p, `${link(p.up, 'pager__up')}<span class="grow"></span>${link(p.prev, 'pager__prev')}${link(p.next, 'pager__next')}`, { attrs: ` aria-label="${esc(p.label ?? 'Páginas da série')}"` })
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
    html: (p, k) => {
      const id = p.id || slug(p.label) || `aba-${++semNome}`
      return `<section class="tabs__panel" role="tabpanel" id="${esc(id)}" data-label="${esc(p.label ?? id)}" aria-labelledby="tab-${esc(id)}">${k}</section>`
    },
  })
  def('d-note', {
    grupo: 'Documento', doc: 'Aviso: uma condição que muda o resultado. O rótulo diz o tipo.',
    props: { tone: 'warn | err | ok; mark só quando o aviso é o próprio assunto da parte (a proposta)', label: 'o tipo do aviso, em palavras' },
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
      const resto = [...el.childNodes].filter(n => !lado.includes(n)).map(html).join('')
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

  // Resposta copiável: o texto colado no chat se entende sem abrir a página (references/padroes.md#resposta-copiável-leva-a-origem).
  // Cada item vira um bloco com a pergunta, o rótulo e o código da opção e o comentário. A função mora aqui e é a única.
  const bloco = ({ ref, q, label, code, comment }) => {
    const nota = String(comment ?? '').trim().replace(/\n\s*\n+/g, '\n')
    const resposta = label ? `Resposta: ${label}${code ? ` [${code}]` : ''}` : 'Resposta: nenhuma opção marcada'
    return [`${ref ? `${ref} · ` : ''}${q ?? ''}`.trim(), resposta, nota && `Comentário: ${nota}`].filter(Boolean).join('\n')
  }
  const blocos = itens => itens.map(bloco).join('\n\n')
  let respostas = 0
  def('d-answer', {
    grupo: 'Documento', doc: 'Sua resposta: as opções com a recomendada, um comentário e o botão que copia a resposta com a pergunta junto. Filhos: li, uma opção cada; o texto do li diz o que a opção faz.',
    props: { ref: 'o identificador da pergunta, como a página o mostra (padrão: Decisão N no painel duvida-N, Dúvida N dentro da aba Dúvidas, Pergunta N fora deles)', q: 'a pergunta completa (padrão: o título da primeira parte do painel)', 'li code': 'o código da opção: 1A', 'li label': 'o rótulo da opção: A · Sem teto', 'li rec': 'a opção recomendada', study: 'pergunta que a evidência responde: as opções são aceitar ou contestar a conclusão, sem recomendada' },
    ex: '<d-answer ref="Decisão 1" q="B12 de 1.000 mcg: o campo aceita, avisa ou recusa?"><li code="1A" label="A · Sem teto" rec>O limite diário e o aviso de milhar protegem.</li><li code="1B" label="B · Aviso acima de 999 mcg">Aceita e avisa uma vez.</li></d-answer>',
    html: (p, k, el) => {
      const n = ++respostas, nome = `resposta-${n}`
      const opts = [...el.querySelectorAll('li')].map(li => ({ code: li.getAttribute('code') ?? '', label: li.getAttribute('label') ?? '', rec: li.hasAttribute('rec'), txt: li.innerHTML.trim() }))
      const linhas = opts.map(o => `<tr${o.rec ? ' class="is-mark"' : ''}><td><label class="answer__opt"><input type="radio" name="${nome}" value="${esc(o.code)}" data-label="${esc(o.label)}"><span>${esc(o.label)}</span></label>${o.rec ? ` ${C['w-chip'].html({ tone: 'ink' }, 'Recomendada')}` : ''}</td><td data-th="O que faz">${o.txt}</td></tr>`).join('')
      const codigos = opts.map(o => o.code).filter(Boolean)
      const ou = codigos.length > 1 ? `${codigos.slice(0, -1).join(', ')} ou ${codigos.at(-1)}` : codigos[0] ?? ''
      const attrs = `${p.ref && p.ref !== true ? ` data-ref="${esc(p.ref)}"` : ''}${p.q && p.q !== true ? ` data-q="${esc(p.q)}"` : ''}`
      return raiz('div', 'd-answer answer', p,
        `<table class="table"><thead><tr><th>Opção</th><th>O que faz</th></tr></thead><tbody>${linhas}</tbody></table>` +
        `<label class="answer__comment"><span>Comentário</span><textarea rows="2" name="${nome}-comentario"></textarea></label>` +
        `<div class="d-note note answer__out"><p class="note__label">${ico('info-fill')}Responda no chat</p><p>${esc(ou)}${ou ? '.' : ''}<span class="answer__hint"> ${p.study ? 'A evidência responde; você aceita ou contesta. ' : ''}O botão copia a resposta com a pergunta junto.</span></p>` +
        `<pre class="answer__preview" aria-label="O que vai ser copiado" aria-live="polite"></pre><p class="answer__actions"><button type="button" class="answer__copy">Copiar esta resposta</button><span class="answer__status" role="status"></span></p></div>`,
        { attrs })
    },
  })
  def('d-answers', {
    grupo: 'Documento', doc: 'Copiar respostas: junta as respostas da página, na ordem, num texto só, com a prévia exata do que vai ser copiado. Uma por documento, depois das decisões.',
    props: { title: 'o título (padrão: Copiar respostas)' },
    ex: '<d-answers></d-answers>',
    html: p => raiz('div', 'd-answers answers', p,
      `<p class="answers__head">${esc(p.title ?? 'Copiar respostas')}</p><pre class="answer__preview" aria-label="O que vai ser copiado" aria-live="polite"></pre><p class="answer__actions"><button type="button" class="answer__copy">Copiar respostas</button><span class="answer__status" role="status"></span></p>`),
  })

  // ── Figura e tela (wireframe) ────────────────────────────────────────────

  def('w-fig', {
    grupo: 'Tela', doc: 'A moldura de toda figura: chão de prancheta e a legenda numerada embaixo.',
    props: { cap: 'a legenda: a conclusão que a figura mostra, com o dado do caso', state: 'de que estado é a tela: main, dev · f0b29b2, proposto, wireframe', bleed: 'a tela continua para fora da moldura', h: 'altura do recorte com bleed (ex.: 17rem)' },
    html: (p, k) => raiz('figure', 'w-fig fig', p, `${p.state && p.state !== true ? `<p class="fig__state"><span>Estado</span>${esc(p.state)}</p>` : ''}<div class="fig__stage"${p.h ? ` style="--scene-h:${esc(p.h)}"` : ''}>${k}</div>${p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : ''}`),
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
      `${p.label ? `<span class="field__label">${esc(p.label)}</span>` : ''}<span class="field__box">${p.value && p.value !== true ? `<span>${esc(p.value)}</span>` : ''}${p.ph ? `<i class="field__ph" style="--w:${num(p.ph) || 50}%"></i>` : ''}${p.state === 'caret' ? '<i class="caret"></i>' : ''}<span class="grow"></span>${p.unit ? `<span class="field__unit">${esc(p.unit)}</span>` : ''}${ico(p.icon)}</span>${p.hint ? `<small class="field__hint">${esc(p.hint)}</small>` : ''}`),
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

  // Peças que o leitor mexe. A regra que é transição vira w-states; a que é conta vira w-sim.
  // O comportamento é ligado em ligar(); sem script, w-states mostra o estado inicial e w-sim fica sem resultado.
  def('w-states', {
    grupo: 'Tela', doc: 'Uma transição que o leitor mexe: um botão por estado e, embaixo, a cena daquele estado. Filhos: w-state.',
    props: { label: 'o nome do controle, como no produto', on: 'o estado que abre (padrão: o primeiro)' },
    ex: '<w-states label="Regime" on="6x1"><w-state name="5x2"><w-matrix cols="7" head="D|S|T|Q|Q|S|S"><w-cell off>F</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell off>F</w-cell></w-matrix></w-state><w-state name="6x1"><w-matrix cols="7" head="D|S|T|Q|Q|S|S"><w-cell off>F</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell></w-matrix></w-state></w-states>',
    html: (p, k, el) => {
      const vistas = filhos(el, '.states__view')
      const aberto = p.on && p.on !== true && vistas.some(v => v.dataset.name === p.on) ? p.on : vistas[0]?.dataset.name
      vistas.forEach(v => { v.hidden = v.dataset.name !== aberto })
      const botoes = vistas.map(v => `<button type="button" aria-pressed="${v.dataset.name === aberto}" data-name="${esc(v.dataset.name)}">${esc(v.dataset.name)}</button>`).join('')
      return raiz('div', 'w-states states', { ...p, on: undefined }, `<div class="states__bar">${p.label && p.label !== true ? `<span class="states__label">${esc(p.label)}</span>` : ''}<span class="states__seg" role="group"${p.label && p.label !== true ? ` aria-label="${esc(p.label)}"` : ''}>${botoes}</span></div>${vistas.map(v => v.outerHTML).join('')}`)
    },
  })
  def('w-state', {
    grupo: 'Tela', doc: 'Um estado de w-states: a cena que aparece quando o leitor escolhe o botão.',
    props: { name: 'o nome do estado, como no produto' },
    html: (p, k) => `<div class="states__view" data-name="${esc(p.name ?? '')}">${k}</div>`,
  })
  def('w-sim', {
    grupo: 'Esquema', doc: 'Uma conta que o leitor mexe: as entradas (w-knob) e os resultados (w-out), recalculados a cada mudança. A fórmula é copiada da fonte e a fonte vai no d-src da parte.',
    props: { title: 'o nome da conta' },
    ex: '<w-sim title="Índice de massa corporal"><w-knob name="peso" label="Peso" unit="kg" min="40" max="140" step="0.5" value="62"></w-knob><w-knob name="altura" label="Altura" unit="m" min="1.4" max="2.1" step="0.01" value="1.65"></w-knob><w-out name="imc" label="IMC" unit="kg/m²" digits="1" expr="peso / (altura * altura)" strong></w-out><w-out label="Faixa (OMS, adulto)" expr="imc < 18.5 ? \'Baixo peso\' : imc < 25 ? \'Eutrofia\' : imc < 30 ? \'Sobrepeso\' : \'Obesidade\'"></w-out></w-sim>',
    html: (p, k) => raiz('div', 'w-sim sim', p, `${p.title && p.title !== true ? `<p class="sim__title">${esc(p.title)}</p>` : ''}${k}`),
  })
  def('w-knob', {
    grupo: 'Esquema', doc: 'Uma entrada de w-sim: régua para número, lista para escolha.',
    props: { name: 'o nome da variável na conta', label: 'o rótulo, como no produto', value: 'o valor inicial: o do caso', min: 'o menor valor', max: 'o maior valor', step: 'o passo', unit: 'a unidade', options: 'em vez da régua, uma escolha: Opção|Opção' },
    html: p => {
      const nome = esc(p.name ?? ''), ops = lista(p.options)
      const controle = ops.length
        ? `<select name="${nome}">${ops.map(o => `<option${o === p.value ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`
        : `<input type="range" name="${nome}" min="${esc(p.min ?? 0)}" max="${esc(p.max ?? 100)}" step="${esc(p.step ?? 1)}" value="${esc(p.value ?? 0)}"><output></output>`
      return `<label class="sim__knob"${p.unit && p.unit !== true ? ` data-unit="${esc(p.unit)}"` : ''}><span>${esc(p.label ?? p.name ?? '')}</span>${controle}</label>`
    },
  })
  def('w-out', {
    grupo: 'Esquema', doc: 'Um resultado de w-sim. A expressão usa os nomes das entradas e dos resultados de cima.',
    props: { expr: 'a conta, em JavaScript: tmb * 0.1', name: 'o nome, para os resultados de baixo usarem', label: 'o rótulo', unit: 'a unidade', digits: 'casas decimais (padrão 0)', strong: 'o resultado de que a parte fala' },
    html: p => raiz('div', 'sim__out', p, `<span>${esc(p.label ?? p.name ?? '')}</span><b></b>`, { attrs: ` data-expr="${esc(p.expr ?? '')}"${p.name && p.name !== true ? ` data-name="${esc(p.name)}"` : ''}${p.unit && p.unit !== true ? ` data-unit="${esc(p.unit)}"` : ''} data-digits="${esc(p.digits ?? 0)}"` }),
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
    html: (p, k) => { const n = p.n === true ? '' : p.n ?? ''; return raiz('div', 'w-val', p, `<b>${esc(n)}${n && p.unit ? ` ${esc(p.unit)}` : ''}</b><i></i><span>${k.trim()}</span>`, { attrs: ` data-n="${esc(n)}"` }) },
  })
  def('w-matrix', {
    grupo: 'Esquema', doc: 'Uma matriz pequena: semana, escala, permissões. Filhos: w-cell.',
    props: { cols: 'quantas colunas', head: 'cabeçalho: A|B|C (comece com | para deixar o canto vazio)' },
    ex: '<w-matrix cols="7" head="D|S|T|Q|Q|S|S"><w-cell off>F</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell mark>F</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell><w-cell on>T</w-cell></w-matrix>',
    html: (p, k) => raiz('div', 'w-matrix matrix', p, (p.head && p.head !== true ? String(p.head).split('|').map(x => x.trim()) : []).map(h => `<span class="w-cell" data-head>${esc(h)}</span>`).join('') + k, { estilo: `--cols:${esc(p.cols ?? 7)};` }),
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
  def('w-line', {
    grupo: 'Esquema', doc: 'Uma série no tempo: pontos ligados por linha, com a faixa de referência. Filhos: w-pt.',
    props: { band: 'a faixa de referência: 70-99', min: 'o piso do eixo (padrão: um pouco abaixo do menor)', max: 'o teto do eixo', unit: 'a unidade da faixa' },
    ex: '<w-line band="70-99" unit="mg/dL" min="60" max="115"><w-pt n="94">03/06</w-pt><w-pt n="102">15/07</w-pt><w-pt n="99">02/08</w-pt><w-pt off mark>27/08</w-pt></w-line>',
    html: (p, k, el) => {
      const pts = filhos(el, '.w-pt'), ns = pts.map(q => num(q.dataset.n)).filter(v => !isNaN(v))
      const [b0, b1] = String(p.band && p.band !== true ? p.band : '').split('-').map(num)
      const todos = [...ns, ...[b0, b1].filter(v => !isNaN(v))]
      const lo = numOu(p.min, Math.min(...todos) - (Math.max(...todos) - Math.min(...todos)) * 0.2), hi = numOu(p.max, Math.max(...todos) * 1.06)
      const y = v => 100 - ((v - lo) / (hi - lo || 1)) * 100, x = i => pts.length > 1 ? 6 + (i * 88) / (pts.length - 1) : 50
      pts.forEach((q, i) => { const v = num(q.dataset.n), yy = isNaN(v) ? 100 : y(v); q.style.setProperty('--x', x(i) + '%'); q.style.setProperty('--y', yy + '%'); q.style.setProperty('--yn', String(yy)) })
      const caminho = pts.map((q, i) => [x(i), num(q.dataset.n)]).filter(([, v]) => !isNaN(v)).map(([xx, v]) => `${xx},${y(v)}`).join(' ')
      const faixa = !isNaN(b0) && !isNaN(b1) ? `<rect x="0" y="${y(b1)}" width="100" height="${y(b0) - y(b1)}" class="line__band"/>` : ''
      const rotulo = !isNaN(b0) && !isNaN(b1) ? `<span class="line__bandlabel" style="--y:${y(b0)}%">${esc(p.band)}${p.unit ? ` ${esc(p.unit)}` : ''}</span>` : ''
      return raiz('div', 'w-line', p, `<div class="line__plot"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${faixa}<polyline points="${caminho}" class="line__path"/></svg>${rotulo}${pts.map(q => q.outerHTML).join('')}</div>`)
    },
  })
  def('w-pt', {
    grupo: 'Esquema', doc: 'Um ponto de w-line. O filho é o rótulo do eixo (a data).',
    props: { n: 'o valor (sem n: o ponto existe e não plota)', off: 'não entra na linha', mark: 'o ponto de que a parte fala' },
    html: (p, k) => { const n = p.n === true ? '' : p.n ?? ''; return raiz('span', 'w-pt', p, `<i></i>${n ? `<b>${esc(n)}</b>` : ''}<small>${k.trim()}</small>`, { attrs: ` data-n="${esc(n)}"` }) },
  })
  def('w-crit', {
    grupo: 'Esquema', doc: 'Um critério de prova com o resultado: cumprido, falhou ou não se aplica (e por quê).',
    props: { status: 'ok | err | na', why: 'a justificativa (obrigatória em na)' },
    ex: '<w-crit status="ok">Checkbox no fluxo, antes do visual</w-crit><w-crit status="na" why="a porta só oferece seleção e Importar">Ações individuais</w-crit>',
    html: (p, k) => {
      const i = { ok: 'check-circle-fill', err: 'x-circle-fill', na: 'info-fill' }[p.status] ?? 'info-fill'
      const nome = { ok: 'cumprido', err: 'falhou', na: 'não se aplica' }[p.status] ?? ''
      return raiz('div', 'w-crit', p, `${ico(i)}<span class="crit__text">${k.trim()}${p.why ? `<small>${esc(p.why)}</small>` : ''}</span><span class="crit__status">${nome}</span>`)
    },
  })
  def('w-tree', {
    grupo: 'Esquema', doc: 'Onde cada responsabilidade mora: listas aninhadas com code e um texto curto.',
    props: {},
    ex: '<w-tree><ul><li><code>kit.js</code><span>os componentes</span><ul><li class="is-mark"><code>w-field</code><span>o campo</span></li></ul></li></ul></w-tree>',
    html: (p, k) => raiz('div', 'w-tree tree', p, k),
  })
  def('w-code', {
    grupo: 'Esquema', doc: 'O trecho literal da fonte, com número de linha. Escreva < como &lt;.',
    props: { from: 'o número da primeira linha', mark: 'linhas marcadas pela caneta, contadas a partir de from: 3,4', wrap: 'quebra linha longa em vez de rolar (o recuo da quebra fica pendurado)' },
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
    props: { title: 'o nome da peça', meta: 'de onde vem (pacote, arquivo)', role: 'selo do papel na hierarquia (P1, F2, E1, T1)', kind: 'slot | new | off', row: 'filhos lado a lado' },
    ex: '<w-box title="Busca" meta="ui/SmartAutocomplete.tsx"><w-box title="Autocomplete" kind="slot"></w-box><w-box title="Filtro por grupo" kind="new"></w-box></w-box>',
    html: (p, k) => raiz('div', 'w-box', p, `${p.title || p.meta || p.role ? `<div class="box__head">${p.role ? `<span class="box__role">${esc(p.role)}</span>` : ''}${p.title ? `<b>${esc(p.title)}</b>` : ''}${p.meta ? `<small>${esc(p.meta)}</small>` : ''}</div>` : ''}${k}`),
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

  // Abas: uma camada por vez. Cada .tabs controla só a própria lista, então subtabs funcionam.
  const abasDe = caixa => {
    const lista = caixa.querySelector(':scope > .tabs__list')
    const botoes = lista ? [...lista.querySelectorAll('[role=tab]')] : []
    const abre = id => botoes.forEach(b => {
      const ativo = b.getAttribute('aria-controls') === id
      b.setAttribute('aria-selected', String(ativo))
      const painel = document.getElementById(b.getAttribute('aria-controls'))
      if (painel) painel.hidden = !ativo
    })
    return { botoes, abre }
  }
  // Endereço: #id abre as abas que contêm o alvo, de fora para dentro. Rola só na carga e quando o endereço muda,
  // nunca porque um componente entrou depois na página. As abas são lidas na hora: valem as que entraram depois.
  const irPara = rolar => {
    const alvo = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (!alvo) return
    for (let el = alvo; el; el = el.parentElement) {
      if (!el.matches('.tabs__panel')) continue
      const caixa = el.parentElement?.closest('.tabs')
      if (caixa) abasDe(caixa).abre(el.id)
    }
    if (rolar) alvo.scrollIntoView()
  }
  // Respostas: a pergunta e o identificador vêm da página quando não vieram por prop, para o texto copiado
  // repetir exatamente o que o leitor vê. A prévia é o texto que o botão copia, recalculado a cada mudança.
  const itemDe = a => {
    const marcada = a.querySelector('input[type=radio]:checked')
    return { ref: a.dataset.ref, q: a.dataset.q, label: marcada?.dataset.label, code: marcada?.value, comment: a.querySelector('textarea')?.value }
  }
  const respondida = i => Boolean(i.label || String(i.comment ?? '').trim())
  const copiar = async (texto, botao) => {
    const status = botao.parentElement.querySelector('.answer__status')
    let ok = false
    try { await navigator.clipboard.writeText(texto); ok = true } catch {
      // Sem a API (iframe sem permissão, arquivo local), a cópia clássica por seleção ainda funciona.
      const t = document.createElement('textarea')
      t.value = texto; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0'
      document.body.append(t); t.select()
      try { ok = document.execCommand('copy') } catch { ok = false }
      t.remove()
    }
    if (!ok) { const pre = botao.closest('.d-answer, .d-answers')?.querySelector('.answer__preview'); if (pre) getSelection().selectAllChildren(pre) }
    if (status) { status.textContent = ok ? 'Copiado' : 'Texto selecionado: copie com Ctrl+C ou ⌘C'; clearTimeout(status._t); status._t = setTimeout(() => { status.textContent = '' }, 2500) }
  }
  const atualizarRespostas = () => {
    const todas = [...document.querySelectorAll('.d-answer')]
    for (const a of todas) {
      const i = itemDe(a)
      a.querySelector('.answer__preview').textContent = respondida(i) ? bloco(i) : 'Marque uma opção ou escreva um comentário para ver o que vai ser copiado.'
      a.querySelector('.answer__copy').disabled = !respondida(i)
    }
    const prontas = todas.map(itemDe).filter(respondida)
    for (const r of document.querySelectorAll('.d-answers')) {
      r.querySelector('.answer__preview').textContent = prontas.length ? blocos(prontas) : 'Nenhuma resposta marcada ainda.'
      r.querySelector('.answer__copy').disabled = !prontas.length
    }
  }
  const ligarRespostas = () => {
    let novas = false
    const todas = [...document.querySelectorAll('.d-answer')]
    for (const a of todas) {
      if (a.dataset.ligado) continue
      a.dataset.ligado = novas = '1'
      const num = a.closest('[id^="duvida-"]')?.id.match(/^duvida-(\d+)$/)?.[1]
      if (!a.dataset.ref) a.dataset.ref = num ? `${a.closest('#duvidas') ? 'Dúvida' : 'Decisão'} ${num}` : `Pergunta ${todas.indexOf(a) + 1}`
      if (!a.dataset.q) a.dataset.q = (a.closest('.tabs__panel')?.querySelector('h2') ?? document.querySelector('.d-cover h1'))?.textContent.trim() ?? ''
      a.addEventListener('input', atualizarRespostas)
      a.addEventListener('change', atualizarRespostas)
      a.querySelector('.answer__copy').addEventListener('click', e => copiar(bloco(itemDe(a)), e.currentTarget))
    }
    for (const r of document.querySelectorAll('.d-answers')) {
      if (r.dataset.ligado) continue
      r.dataset.ligado = novas = '1'
      r.querySelector('.answer__copy').addEventListener('click', e => copiar(blocos([...document.querySelectorAll('.d-answer')].map(itemDe).filter(respondida)), e.currentTarget))
    }
    if (novas) atualizarRespostas()
  }
  // Comportamento mínimo depois da montagem: conferência, abas e endereço. Cada peça liga uma vez.
  const ligar = (rolar = false) => {
    for (const box of document.querySelectorAll('.d-check')) {
      if (box.dataset.ligado) continue
      box.dataset.ligado = '1'
      const saida = box.querySelector('output'), itens = [...box.querySelectorAll('input[type=checkbox]')]
      const conta = () => { if (saida) saida.textContent = `${itens.filter(i => i.checked).length}/${itens.length}` }
      box.addEventListener('change', conta)
      conta()
    }
    ligarRespostas()
    // Transição: o botão troca a cena do próprio w-states e mais nada na página.
    for (const st of document.querySelectorAll('.w-states')) {
      if (st.dataset.ligado) continue
      st.dataset.ligado = '1'
      const botoes = [...st.querySelectorAll(':scope > .states__bar button')], vistas = [...st.querySelectorAll(':scope > .states__view')]
      botoes.forEach(b => b.addEventListener('click', e => {
        e.stopPropagation()
        botoes.forEach(o => o.setAttribute('aria-pressed', String(o === b)))
        vistas.forEach(v => { v.hidden = v.dataset.name !== b.dataset.name })
      }))
    }
    // Conta: cada resultado é a expressão avaliada com as entradas e os resultados de cima. Erro fica à vista (data-erro).
    for (const sim of document.querySelectorAll('.w-sim')) {
      if (sim.dataset.ligado) continue
      sim.dataset.ligado = '1'
      const br = (v, casas) => (typeof v === 'number' ? v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }) : String(v))
      const calcular = () => {
        const vars = {}
        for (const k of sim.querySelectorAll('.sim__knob')) {
          const c = k.querySelector('input, select'), cru = c.value, n = c.type === 'range' ? parseFloat(cru) : NaN
          vars[c.name] = isNaN(n) ? cru : n
          const o = k.querySelector('output')
          if (o) o.textContent = `${br(n, (String(c.step).split('.')[1] ?? '').length)}${k.dataset.unit ? ` ${k.dataset.unit}` : ''}`
        }
        for (const out of sim.querySelectorAll('.sim__out')) {
          const alvo = out.querySelector('b')
          try {
            const v = new Function(...Object.keys(vars), `return (${out.dataset.expr})`)(...Object.values(vars))
            if (v === undefined || (typeof v === 'number' && isNaN(v))) throw new Error('sem valor')
            if (out.dataset.name) vars[out.dataset.name] = v
            alvo.textContent = `${br(v, +out.dataset.digits || 0)}${out.dataset.unit ? ` ${out.dataset.unit}` : ''}`
            delete out.dataset.erro
          } catch (e) { alvo.textContent = 'conta com erro'; out.dataset.erro = e.message }
        }
      }
      sim.addEventListener('input', calcular)
      sim.addEventListener('change', calcular)
      calcular()
    }
    for (const caixa of document.querySelectorAll('.tabs')) {
      if (caixa.dataset.ligado) continue
      caixa.dataset.ligado = '1'
      const { botoes, abre } = abasDe(caixa)
      botoes.forEach(b => b.addEventListener('click', () => abre(b.getAttribute('aria-controls'))))
      if (botoes[0]) abre(botoes[0].getAttribute('aria-controls'))
    }
    if (!window.__hdHash) { window.__hdHash = true; addEventListener('hashchange', () => irPara(true)) }
    irPara(rolar)
  }

  const HD = { versao: VERSAO, componentes: C, montar, montarTudo, ligar, esc, bloco, blocos }
  if (typeof window !== 'undefined') window.HD = HD
  if (typeof document === 'undefined') return
  document.documentElement.classList.add('js')
  // Com o script no <head>, a página ainda está sendo lida: montar antes do fim perderia os filhos
  // que o leitor ainda não leu. Então a primeira montagem espera o documento inteiro.
  const iniciar = () => { montarTudo(); ligar(true) }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar, { once: true })
  else iniciar()
  // Componente inserido depois (um protótipo, um player) monta sozinho ao entrar na página.
  if (window.customElements) for (const tag of TAGS) if (!customElements.get(tag)) {
    customElements.define(tag, class extends HTMLElement {
      connectedCallback() {
        if (document.readyState === 'loading') return
        queueMicrotask(() => { if (!this.isConnected) return; montarTudo(this); montar(this); ligar() })
      }
    })
  }
})()
