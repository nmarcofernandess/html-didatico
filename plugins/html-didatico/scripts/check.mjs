#!/usr/bin/env node
// html-didatico · check
// Renderiza o documento em três larguras e no tema escuro, clica cada controle, salva os screenshots e mede o que dá para medir.
// Também recorta cada figura e lista o que ela mostra sozinha, para a leitura pela figura (references/visual/design.md).
// Uso: node scripts/check.mjs <arquivo.html> [--out <pasta>] [--widths 390,768,1280] [--json]
// Sai com código 1 quando há FALHA. AVISO pede leitura: conserte ou justifique na entrega.

import { createRequire } from 'node:module'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
const file = args.find(a => !a.startsWith('--'))
const opt = name => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined }
if (!file || !existsSync(file)) {
  console.error('Uso: node scripts/check.mjs <arquivo.html> [--out <pasta>] [--widths 390,768,1280] [--json]')
  process.exit(2)
}
const widths = (opt('widths') ?? '390,768,1280').split(',').map(Number)
const outDir = resolve(opt('out') ?? join(tmpdir(), 'html-didatico-check'))
const asJson = args.includes('--json')

let chromium
try {
  chromium = createRequire(import.meta.url)('playwright').chromium
} catch {
  console.error('Playwright não encontrado. Instale uma vez: npm i -D playwright && npx playwright install chromium')
  process.exit(2)
}

// ───────────────────────── leitura estática: CSS e texto ─────────────────────────

const html = readFileSync(file, 'utf8')
const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n').replace(/\/\*[\s\S]*?\*\//g, '')

// Bloco de tokens: :root. Ali os literais são permitidos; fora dali, não.
const semTokens = css.replace(/([^{}]+)\{([^{}]*)\}/g, (regra, seletor) => /^\s*:root\b/.test(seletor) ? '' : regra)

const literaisDeCor = [...semTokens.matchAll(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)/gi)].map(m => m[0])
const espacoCru = [...semTokens.matchAll(/(?:^|[;{\s])((?:padding|margin|gap|row-gap|column-gap)(?:-[a-z]+)?)\s*:\s*([^;}]+)/gi)]
  .map(m => ({ prop: m[1], valor: m[2].trim() }))
  .filter(d => /\d+(?:\.\d+)?px/.test(d.valor.replace(/var\([^)]*\)/g, '')))
  .filter(d => !/^(?:0|1px|2px|-1px|-2px)(?:\s+(?:0|1px|2px|auto))*$/.test(d.valor))
const temAnimacao = /@keyframes|animation\s*:|transition\s*:/.test(css)
const temReducedMotion = /prefers-reduced-motion/.test(css)
const transitionAll = /transition\s*:\s*all\b/.test(css)

// ───────────────────────── leitura renderizada ─────────────────────────

mkdirSync(outDir, { recursive: true })
const nome = basename(file).replace(/\.html?$/i, '')
const browser = await chromium.launch()
const porLargura = {}
const errosDeScript = new Set(), soltos = new Set()
let vivo = ''

// Cada largura no tema claro e, na maior, mais uma passada no escuro: o leitor pode estar em qualquer um dos dois.
const larga = Math.max(...widths)
const passadas = [...widths.map(w => ({ w, tema: 'light', chave: w })), { w: larga, tema: 'dark', chave: 'escuro' }]
for (const { w, tema, chave } of passadas) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce', colorScheme: tema })
  const page = await ctx.newPage()
  page.on('pageerror', e => errosDeScript.add(e.message))
  await page.goto(pathToFileURL(resolve(file)).href)
  await page.waitForTimeout(250)
  // Componente que sobrou sem montar: nome inventado ou script quebrado.
  for (const t of await page.evaluate(() => [...document.querySelectorAll('*')].map(el => el.localName).filter(n => /^[dw]-[a-z]/.test(n)))) soltos.add(t)
  // Abas: o check lê todas as camadas, uma abaixo da outra, como na impressão.
  await page.evaluate(() => document.querySelectorAll('.tabs__panel[hidden]').forEach(p => { p.hidden = false }))
  if (chave === larga) vivo = (await page.content()).replace(/<(script|style)[\s\S]*?<\/\1>|<svg class="sprite"[\s\S]*?<\/svg>/gi, ' ')
  const shot = resolve(outDir, `${nome}-${chave}.png`)
  await page.screenshot({ path: shot, fullPage: true })

  porLargura[chave] = await page.evaluate(() => {
    const px = v => parseFloat(v) || 0
    const visivel = el => {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el)
      return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.05
    }
    const escondido = el => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        const r = n.getBoundingClientRect()
        if (r.width <= 1.5 && r.height <= 1.5 && getComputedStyle(n).overflow !== 'visible') return true
      }
      return false
    }
    const rotulo = el => {
      const id = el.id ? `#${el.id}` : ''
      const cls = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''
      return `${el.tagName.toLowerCase()}${id}${cls}`
    }
    const trecho = el => el.textContent.trim().replace(/\s+/g, ' ').slice(0, 42)
    const naFigura = el => el.closest('figure, .fig, .vis, .diorama, [data-fig]')
    const semTexto = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'])
    const comTexto = [...document.body.querySelectorAll('*')].filter(el =>
      !semTexto.has(el.tagName) && !el.closest('svg') && visivel(el) && !escondido(el) &&
      [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 0))

    // cor: fundo efetivo e contraste WCAG
    const parse = c => { const m = c.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 0]; return { r: m[0], g: m[1], b: m[2], a: m[3] ?? 1 } }
    const sobre = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 })
    const fundo = el => {
      const pilha = []
      for (let n = el; n; n = n.parentElement) {
        const c = parse(getComputedStyle(n).backgroundColor)
        if (c.a > 0) { pilha.push(c); if (c.a >= 1) break }
      }
      return pilha.reverse().reduce((b, f) => sobre(f, b), { r: 255, g: 255, b: 255, a: 1 })
    }
    const lum = ({ r, g, b }) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b) }
    const razao = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

    // caixa da tinta: só os nós de texto do próprio elemento, sem filhos posicionados
    const tinta_ = el => {
      let l = Infinity, r = -Infinity, tp = Infinity, bt = -Infinity
      for (const n of el.childNodes) {
        if (n.nodeType !== 3 || !n.textContent.trim()) continue
        const rg = document.createRange(); rg.selectNodeContents(n)
        for (const q of rg.getClientRects()) { l = Math.min(l, q.left); r = Math.max(r, q.right); tp = Math.min(tp, q.top); bt = Math.max(bt, q.bottom) }
      }
      return { left: l, right: r, top: tp, bottom: bt, width: r - l, height: bt - tp }
    }
    const pequeno = [], caps = [], contraste = [], apertado = []
    let charsMono = 0, charsTotal = 0
    for (const el of comTexto) {
      const cs = getComputedStyle(el), fs = px(cs.fontSize), txt = el.textContent.trim()
      const proprio = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim()
      charsTotal += proprio.length
      const mono = /mono|menlo|consolas|courier|cascadia/i.test(cs.fontFamily.split(',')[0])
      if (mono && !el.closest('code, pre, kbd, samp, .code, .files, .term, .w-code, .w-files, .w-term, .snippet')) charsMono += proprio.length

      if (fs < 11.5) pequeno.push({ el: rotulo(el), px: fs, texto: trecho(el) })
      const tracking = cs.letterSpacing === 'normal' ? 0 : px(cs.letterSpacing) / fs
      if (fs <= 15 && (cs.textTransform === 'uppercase' || tracking > 0.03) && /[a-zà-ú]{3,}/i.test(proprio))
        caps.push({ el: rotulo(el), px: fs, texto: trecho(el) })

      // texto vazado (cor transparente com contorno) é lido pela cor do contorno
      const tinta = parse(cs.color).a < 0.1 && px(cs.webkitTextStrokeWidth) > 0 ? parse(cs.webkitTextStrokeColor) : parse(cs.color)
      const fg = sobre(tinta, fundo(el)), bg = fundo(el), cr = razao(fg, bg)
      const grande = fs >= 24 || (fs >= 18.66 && +cs.fontWeight >= 700)
      if (cr < (grande ? 3 : 4.5)) contraste.push({ el: rotulo(el), razao: +cr.toFixed(2), px: fs, texto: trecho(el) })

      // caixa apertada: texto a menos de 8px do lado de uma caixa pintada ou com borda
      let caixa = el
      while (caixa && caixa !== document.body) {
        const c = getComputedStyle(caixa)
        const pintada = parse(c.backgroundColor).a > 0.05 || px(c.borderLeftWidth) + px(c.borderRightWidth) > 0
        if (pintada && c.display !== 'inline') break
        caixa = caixa.parentElement
      }
      if (caixa && caixa !== document.body && proprio.length > 1 && !caixa.matches('code, kbd, samp')) {
        const t = tinta_(el), b = caixa.getBoundingClientRect()
        const lado = Math.min(t.left - b.left, b.right - t.right)
        if (b.width > 60 && t.width > 0 && lado < 7.5 && lado > -1) apertado.push({ el: rotulo(el), lado: +lado.toFixed(1), texto: trecho(el) })
      }
    }

    // medida da prosa
    const medida = []
    for (const p of document.querySelectorAll('p, li')) {
      if (!visivel(p) || naFigura(p)) continue
      const txt = p.textContent.trim(); if (txt.length < 120) continue
      const lh = px(getComputedStyle(p).lineHeight) || px(getComputedStyle(p).fontSize) * 1.5
      const linhas = Math.max(1, Math.round(p.getBoundingClientRect().height / lh))
      const cpl = txt.length / linhas
      if (linhas >= 3 && cpl > 80) medida.push({ el: rotulo(p), caracteresPorLinha: Math.round(cpl), texto: trecho(p) })
    }

    // título espremido: mais perto do que vem antes do que do que ele encabeça
    const titulo = []
    for (const h of document.querySelectorAll('h2, h3, h4')) {
      if (!visivel(h) || naFigura(h)) continue
      const ant = h.previousElementSibling, prox = h.nextElementSibling
      if (!ant || !prox || !visivel(ant) || !visivel(prox)) continue
      const r = h.getBoundingClientRect(), acima = r.top - ant.getBoundingClientRect().bottom, abaixo = prox.getBoundingClientRect().top - r.bottom
      if (acima >= 0 && abaixo >= 0 && acima < abaixo * 0.75 && abaixo - acima >= 12) titulo.push({ el: rotulo(h), acima: Math.round(acima), abaixo: Math.round(abaixo), texto: trecho(h) })
    }

    // figuras: legenda, palavras reais, texto cortado, vazamento
    const figs = [...document.querySelectorAll('figure, .fig, .vis')].filter(f => visivel(f) && !f.parentElement.closest('figure, .fig, .vis'))
    const figuras = figs.map((f, i) => {
      const legenda = f.querySelector('figcaption')?.textContent.trim() || f.getAttribute('data-fig') || ''
      const fr = f.getBoundingClientRect()
      const cortaFilhos = getComputedStyle(f).overflow !== 'visible'
      const textos = comTexto.filter(el => f.contains(el) && !el.closest('figcaption, .fig__state'))
      f.setAttribute('data-check-fig', i + 1)
      const proprioDe = el => [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent.trim()).join(' ').replace(/\s+/g, ' ').trim()
      const leitura = textos.map(proprioDe).filter(Boolean)
      const tituloDaParte = f.closest('section, .tabs__panel')?.querySelector('h2, h3')?.textContent.trim() ?? ''
      const palavras = textos.reduce((n, el) => n + [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent.trim()).join(' ').split(/\s+/).filter(w => w.replace(/[^\p{L}\p{N}]/gu, '').length > 1).length, 0)
      const cortado = [], vaza = []
      for (const el of textos) {
        const t = tinta_(el)
        const fora = t.right > fr.right + 1 || t.left < fr.left - 1 || t.bottom > fr.bottom + 1
        if (fora) (cortaFilhos ? cortado : vaza).push(trecho(el))
        // recorte interno: algum ancestral dentro da figura corta este texto
        for (let a = el.parentElement; a && a !== f; a = a.parentElement) {
          if (getComputedStyle(a).overflow === 'visible') continue
          const ar = a.getBoundingClientRect()
          if (t.right > ar.right + 1 || t.bottom > ar.bottom + 1) { cortado.push(trecho(el)); break }
        }
      }
      return { n: i + 1, legenda, palavras, leitura, tituloDaParte, tabela: !!f.querySelector('table'), strings: textos.length, cortado: [...new Set(cortado)], vaza: [...new Set(vaza)], largura: Math.round(fr.width), altura: Math.round(fr.height) }
    })

    // densidade de leitura: palavras de prosa por tela (janela de 900px), fora de figura e navegação
    // A origem é ficha, como a capa de um cartão: tem medida própria, conferida fora daqui.
    const prosa = comTexto.filter(el => !naFigura(el) && !el.closest('nav, footer, .d-origin'))
    const marcas = prosa.map(el => ({ y: el.getBoundingClientRect().top + scrollY, n: [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent.trim()).join(' ').split(/\s+/).filter(Boolean).length }))
    const alturaDoc = document.documentElement.scrollHeight
    const janelas = []
    for (let y = 0; y < Math.max(1, alturaDoc - 450); y += 450) janelas.push(marcas.filter(m => m.y >= y && m.y < y + 900).reduce((s, m) => s + m.n, 0))
    const ordenadas = [...janelas].sort((a, b) => a - b)

    // partes: palavras de prosa por seção
    const partes = [...document.querySelectorAll('main section, .page > section, body > section, article > section')].filter(visivel).map(s => ({
      id: s.id || rotulo(s),
      palavras: prosa.filter(el => s.contains(el)).reduce((n, el) => n + [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent.trim()).join(' ').split(/\s+/).filter(Boolean).length, 0),
    }))

    const semFigura = [...document.querySelectorAll('.d-part, .part')].filter(visivel)
      .filter(s => s.querySelector('h2') && !s.querySelector('figure, .fig, table')).map(s => trecho(s.querySelector('h2')))
    const palavrasForaDeTabela = prosa.filter(el => !el.closest('table')).reduce((n, el) => n + [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent.trim()).join(' ').split(/\s+/).filter(Boolean).length, 0)

    // Tabela no lugar da figura (references/padroes.md#figura-desenha-tabela-ordena): conta as palavras de cada célula.
    // Fora da conta: a tabela da resposta (d-answer) e as abas Leis e Roadmap, que são tabelas por natureza.
    const porNatureza = t => t.closest('.d-answer') || /^(Leis|Roadmap)$/i.test(t.closest('.tabs__panel')?.dataset.label ?? '')
    const tabelas = [...document.querySelectorAll('table')].filter(visivel).filter(t => !porNatureza(t)).map(t => {
      const cel = [...t.querySelectorAll('td')].map(td => td.textContent.trim().split(/\s+/).filter(Boolean).length)
      const parte = t.closest('section.d-part')?.querySelector('h2')
      return { parte: parte ? trecho(parte) : rotulo(t), longas: cel.filter(n => n > 15).length, maior: Math.max(0, ...cel) }
    })
    // Cada aba (fora de Leis e Roadmap, que são tabelas por natureza) tem ao menos uma figura desenhada com componentes.
    const desenhada = f => !f.querySelector('table') && [...f.children].some(c => c.tagName !== 'FIGCAPTION')
    const abasSemDesenho = [...document.querySelectorAll('.tabs__panel')].filter(p => !p.parentElement.closest('.tabs__panel'))
      .filter(p => !/^(Leis|Roadmap)$/i.test(p.dataset.label ?? ''))
      .filter(p => ![...p.querySelectorAll('figure')].some(desenhada)).map(p => p.dataset.label)
    const figurasTabela = figs.filter(f => f.querySelector('table')).length + [...document.querySelectorAll('.part__fig > table, section.d-part > table')].filter(visivel).length
    const figurasDesenhadas = figs.filter(desenhada).length
    // Resposta que não responde ao título: pergunta aberta ("O que…?", "Quais…?") respondida com "Sim." ou "Não.".
    const aberta = /^(?:O que|Que|Quais?|Como|Onde|Quem|Quando|Por que|Quanto|Quantos|Quantas|Até onde|De onde)\b/i
    const respostaTorta = [...document.querySelectorAll('section.d-part')].filter(visivel).map(s => {
      const h = s.querySelector('h2, h3'), p = s.querySelector('p')
      return h && p && aberta.test(h.textContent.trim()) && /^(?:Sim|Não)\b[.,!:]/.test(p.textContent.trim()) ? trecho(h) : null
    }).filter(Boolean)

    // A forma segue o conteúdo (references/padroes.md): tela de produto com o estado dito e em largura de leitura,
    // partes que não repetem todas o par texto e figura, comparação com a fonte ao lado.
    const produto = f => f.querySelector('.w-win, .w-shot')
    const emDecisao = f => f.closest('[id^="duvida-"], #na-tela')
    const semEstado = figs.filter(f => produto(f) && emDecisao(f) && !f.querySelector(':scope > .fig__state')).map(f => f.querySelector('figcaption')?.textContent.trim().slice(0, 42) || 'sem legenda')
    const figsSemEstadoNoDoc = figs.filter(f => produto(f) && !f.querySelector(':scope > .fig__state')).length
    const espremida = [...document.querySelectorAll('.w-fig .w-shot > img')].filter(visivel).map(el => Math.round(el.getBoundingClientRect().width)).filter(l => l < 560)
    const partesComTitulo = [...document.querySelectorAll('section.d-part')].filter(visivel).filter(s => s.querySelector('h2') && s.querySelector('figure'))
    const emPar = partesComTitulo.filter(s => s.hasAttribute('data-side')).length
    const matrizSemFonte = [...document.querySelectorAll('.w-matrix:has(> [data-who])')].filter(visivel).filter(m => !m.closest('section.d-part, .tabs__panel')?.querySelector('.d-src')).length
    const linksFora = [...document.querySelectorAll('a[href^="http"]')].filter(visivel).filter(a => !a.closest('.d-src, footer, .d-foot')).map(a => a.textContent.trim().slice(0, 30))
    const contaComErro = [...document.querySelectorAll('.sim__out[data-erro]')].map(o => `${o.querySelector('span')?.textContent}: ${o.dataset.erro}`)

    const infinitas = [...document.querySelectorAll('*')].filter(el => getComputedStyle(el).animationIterationCount === 'infinite' && getComputedStyle(el).animationName !== 'none').map(rotulo)
    const doc = document.documentElement
    return {
      rolagemHorizontal: doc.scrollWidth > doc.clientWidth + 1 ? doc.scrollWidth - doc.clientWidth : 0,
      pequeno, caps, contraste, apertado, medida, titulo, figuras, partes, infinitas, semFigura, palavrasForaDeTabela,
      tabelas, abasSemDesenho, figurasTabela, figurasDesenhadas, respostaTorta,
      semEstado, figsSemEstadoNoDoc, espremida, partesEmPar: [emPar, partesComTitulo.length], matrizSemFonte, linksFora, contaComErro,
      mono: charsTotal ? +(charsMono / charsTotal * 100).toFixed(1) : 0,
      palavrasPorTela: { max: Math.max(0, ...janelas), mediana: ordenadas[Math.floor(ordenadas.length / 2)] ?? 0 },
      palavrasDeProsa: marcas.reduce((s, m) => s + m.n, 0),
      alturaDoc,
      texto: prosa.map(el => [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent).join(' ')).join('\n'),
    }
  })
  porLargura[chave].screenshot = shot
  if (chave === larga) {
    for (const f of porLargura[chave].figuras) {
      f.recorte = resolve(outDir, `${nome}-fig-${f.n}.png`)
      await page.locator(`[data-check-fig="${f.n}"]`).screenshot({ path: f.recorte }).catch(() => { f.recorte = '' })
    }
  }
  await ctx.close()
}
// ───────────────────────── os controles, clicados ─────────────────────────
// Página nova, na largura maior: cada botão, aba, régua, lista e campo é acionado uma vez. Um controle que não é aba
// não pode trocar a aba aberta, uma aba tem de abrir o próprio painel, e nada pode quebrar o script.
const ctxC = await browser.newContext({ viewport: { width: larga, height: 900 }, reducedMotion: 'reduce' })
const pageC = await ctxC.newPage()
pageC.on('pageerror', e => errosDeScript.add(e.message))
await pageC.goto(pathToFileURL(resolve(file)).href)
await pageC.waitForTimeout(250)
const controles = await pageC.evaluate(() => {
  const abertas = () => [...document.querySelectorAll('[role=tab][aria-selected=true]')].map(b => b.id || b.textContent.trim()).join('|')
  const nomeDe = c => (c.getAttribute('aria-label') || c.textContent.trim() || c.name || c.type || c.tagName).replace(/\s+/g, ' ').slice(0, 32)
  // Abre o caminho até o controle: as abas e os estados que o contêm, de fora para dentro.
  const mostrar = c => {
    const caminho = []
    for (let p = c.parentElement?.closest('.tabs__panel, [role=tabpanel], .states__view'); p; p = p.parentElement?.closest('.tabs__panel, [role=tabpanel], .states__view')) caminho.unshift(p)
    for (const p of caminho) {
      if (p.matches('.states__view')) [...p.parentElement.querySelectorAll(':scope > .states__bar button')].find(b => b.dataset.name === p.dataset.name)?.click()
      else document.querySelector(`[role=tab][aria-controls="${p.id}"]`)?.click()
    }
  }
  const trocaAba = [], abaMorta = [], estadoMorto = []
  const todos = [...document.querySelectorAll('button, input, select, textarea, summary')].filter(c => !c.disabled)
  for (const c of todos) {
    mostrar(c)
    const antes = abertas(), aba = c.matches('[role=tab]')
    if (c.matches('input[type=range]')) { c.value = c.value === c.max ? c.min : c.max; c.dispatchEvent(new Event('input', { bubbles: true })) }
    else if (c.matches('select')) { c.selectedIndex = (c.selectedIndex + 1) % Math.max(1, c.options.length); c.dispatchEvent(new Event('change', { bubbles: true })) }
    else if (c.matches('textarea, input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit])')) { c.value = '1'; c.dispatchEvent(new Event('input', { bubbles: true })) }
    else c.click()
    if (aba) { const painel = document.getElementById(c.getAttribute('aria-controls')); if (!painel || painel.hidden) abaMorta.push(nomeDe(c)) }
    else if (abertas() !== antes) trocaAba.push(nomeDe(c))
    if (c.closest('.states__bar')) { const v = [...c.closest('.w-states').querySelectorAll(':scope > .states__view')].find(x => x.dataset.name === c.dataset.name); if (!v || v.hidden) estadoMorto.push(nomeDe(c)) }
  }
  return { total: todos.length, trocaAba, abaMorta, estadoMorto, contaComErro: [...document.querySelectorAll('.sim__out[data-erro]')].map(o => `${o.querySelector('span')?.textContent}: ${o.dataset.erro}`) }
})
await ctxC.close()
await browser.close()

// ───────────────────────── tiques de texto (contáveis) ─────────────────────────

const maior = porLargura[larga], escuro = porLargura.escuro
const texto = maior.texto
const contar = re => [...texto.matchAll(re)].map(m => m[0].trim())
const tiques = {
  residuo: [...contar(/lorem ipsum|\{\{[^}]*\}\}/gi), ...contar(/\bTODO\b|\bFIXME\b|\[(?:NOME|EMPRESA|PREENCHER|XXX)[^\]]*\]/g)],
  processo: contar(/\b(?:nest[ea] (?:seção|parte|documento|aula|guia)|a seguir|abaixo,? você|como (?:vimos|visto)|vamos (?:ver|entender|explorar|conhecer)|agora que você|em resumo|resumindo|antes de (?:mais nada|começar))\b/gi),
  muleta: contar(/\b(?:é importante (?:notar|ressaltar|destacar|lembrar)|vale (?:notar|ressaltar|destacar|lembrar)|cabe (?:notar|ressaltar|destacar)|você pode estar se perguntando|em outras palavras|basicamente|simplesmente)\b/gi),
  contraste: contar(/\bnão (?:é|são|se trata de) (?:apenas|só|somente|um[a]? simples)\b|\bmais (?:do )?que (?:um|uma) (?:simples )?\w+\b|\b(?:em vez|ao invés) de\b/gi),
  negacao: contar(/(?:^|[.!?—]\s+)(?:Não (?:é|são)|Sem|Nem|Nada de)\b[^.!?\n]{2,60}[.!?]\s+(?:Não (?:é|são)|Sem|Nem|Nada de)\b|\bnão (?:é|são) [^,.;\n]{2,40}, (?:não (?:é|são)|nem) /gi),
  hype: contar(/\b(?:poderos[oa]s?|robust[oa]s?|intuitiv[oa]s?|incríve(?:l|is)|revolucion\w+|sem esforço|perfeitamente|facilmente|de forma (?:simples|fácil|rápida|intuitiva))\b/gi),
  // Só dentro do mesmo parágrafo: título-pergunta com a resposta no parágrafo de baixo é o quadro da Aula, não tique.
  perguntaRespondida: contar(/[^.!?\n]{3,60}\?[ \t]+[A-ZÁÉÍÓÚÂÊÔÃÕ][^.?!\n]{0,48}[.!]/g),
  exclamacao: contar(/!/g),
  emoji: contar(/\p{Extended_Pictographic}/gu),
}

// ───────────────────────── veredito ─────────────────────────

const falhas = [], avisos = []
const lista = (itens, f, n = 4) => itens.slice(0, n).map(f).join(' · ') + (itens.length > n ? ` · +${itens.length - n}` : '')

for (const w of widths) {
  const d = porLargura[w], em = `em ${w}px`
  if (d.rolagemHorizontal) falhas.push(`rolagem horizontal ${em}: o documento passa ${d.rolagemHorizontal}px da tela`)
  if (d.pequeno.length) falhas.push(`texto abaixo de 12px ${em} (${d.pequeno.length}): ${lista(d.pequeno, i => `${i.px}px "${i.texto}"`)}`)
  for (const f of d.figuras) {
    if (f.cortado.length) falhas.push(`figura ${f.n} corta palavra real ${em}: ${lista(f.cortado, t => `"${t}"`)}`)
    if (f.vaza.length) falhas.push(`figura ${f.n} vaza da moldura ${em}: ${lista(f.vaza, t => `"${t}"`)}`)
  }
  if (d.apertado.length) avisos.push(`caixa apertada ${em} (${d.apertado.length}): ${lista(d.apertado, i => `${i.lado}px "${i.texto}"`)}`)
}
if (maior.contraste.length) falhas.push(`contraste abaixo do mínimo (${maior.contraste.length}): ${lista(maior.contraste, i => `${i.razao}:1 "${i.texto}"`)}`)
if (escuro.contraste.length) falhas.push(`contraste abaixo do mínimo no tema escuro (${escuro.contraste.length}): ${lista(escuro.contraste, i => `${i.razao}:1 "${i.texto}"`)}; cor só por token do kit, que tem os dois temas`)
// Página vista antes da entrega (references/padroes.md): os controles, clicados um a um.
if (controles.trocaAba.length) falhas.push(`controle que troca a aba aberta (${controles.trocaAba.length}): ${lista(controles.trocaAba, t => `"${t}"`)}; mexer num controle muda só a peça dele`)
if (controles.abaMorta.length) falhas.push(`aba que não abre o próprio painel (${controles.abaMorta.length}): ${lista(controles.abaMorta, t => `"${t}"`)}`)
if (controles.estadoMorto.length) falhas.push(`estado de <w-states> que não aparece ao clicar (${controles.estadoMorto.length}): ${lista(controles.estadoMorto, t => `"${t}"`)}`)
const contasRuins = [...new Set([...maior.contaComErro, ...controles.contaComErro])]
if (contasRuins.length) falhas.push(`conta de <w-sim> com erro (${contasRuins.length}): ${lista(contasRuins, t => `"${t}"`)}; a expressão usa os nomes das entradas e dos resultados de cima`)
if (tiques.residuo.length) falhas.push(`resíduo no texto: ${lista(tiques.residuo, t => `"${t}"`)}`)
// Contrato do HTML Didático, lido no arquivo: o kit embutido, nenhum código de nota, opção com nome, dúvida com resposta.
if (!html.includes('══ KIT ══')) falhas.push('documento fora do kit: parta do starter ou de um exemplo-ouro (montar.mjs --novo ou --corpo), com o kit embutido')
if (errosDeScript.size) falhas.push(`erro de script na página: ${[...errosDeScript].slice(0, 3).join(' · ')}`)
if (soltos.size) falhas.push(`componente que não existe no kit: ${[...soltos].map(t => `<${t}>`).join(' ')}; veja references/kit/componentes.md`)
// Peça escrita à mão onde há componente: o corpo (fora do kit e do script) usa classes que só os componentes deviam gerar.
const corpoAutoral = html.replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<svg class="sprite"[\s\S]*?<\/svg>/gi, '')
const aMao = [...new Set([...corpoAutoral.matchAll(/class="(?:[^"]*\s)?(win|field|row|fig|part|cover|plate|btn|chip|seg|flow|link|bars|matrix|layers|timeline|banner|toast|kv|stat|files|tree|note|band|stamp|rail)(?:\s[^"]*)?"/g)].map(m => m[1]))]
if (aMao.length) avisos.push(`peça escrita à mão no corpo (${aMao.join(', ')}): use o componente (d-*/w-*), que gera a marcação; marcação à mão é diorama`)
const visivel = vivo.replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ')
const codigos = [...visivel.matchAll(/\b(?:PRD|SPEC|ADR|RFC)[ -]?\d{1,3}\b|\b[CDRQ]-\d{2,4}\b|\b\d{3}\/\d{2}\b|\b(?:a|à|da|na|pela|pelo|do|no) 0\d\b|\b(?:quadro|aula|desenho|board|card) \d+(?:\.\d+)?\b/gi)].map(m => m[0])
if (codigos.length) falhas.push(`código de nota no texto (${codigos.length}): ${lista([...new Set(codigos)], c => `"${c}"`)}; mostre o fato ou leve ao quadro por link`)
const semNome = [...vivo.matchAll(/<h[2-6][^>]*>\s*((?:Uma|Outra) (?:possibilidade|opção|alternativa)|Opção \d|Alternativa [A-Z\d])\s*<\/h[2-6]>/gi)].map(m => m[1])
if (semNome.length) falhas.push(`opção sem nome (${semNome.length}): ${lista(semNome, s => `"${s}"`)}; a opção se chama pelo que faz, A · <o que muda>`)
const duvidas = vivo.split(/(?=<[^>]+\bid="duvida-\d+")/).slice(1)
// Pergunta que a evidência responde (<d-answer study>) não tem cardápio nem recomendada: tem a fonte, e quem decide aceita ou contesta.
const estudo = d => /class="d-answer\b[^>]*\bdata-study/.test(d)
const semResposta = duvidas.filter(d => !/Responda no chat/i.test(d) || (!estudo(d) && !/Recomendad/i.test(d))).map(d => d.match(/id="(duvida-\d+)"/)[1])
const estudoSemFonte = duvidas.filter(d => estudo(d) && !/class="d-src\b/.test(d)).map(d => d.match(/id="(duvida-\d+)"/)[1])
if (estudoSemFonte.length) falhas.push(`estudo sem fonte (${estudoSemFonte.join(', ')}): a pergunta que a evidência responde mostra de onde vem a resposta, num <d-src>`)
if (semResposta.length) falhas.push(`dúvida sem recomendada ou sem "Responda no chat": ${semResposta.join(', ')}`)
// Resposta copiável leva a origem (references/padroes.md): toda dúvida responde por d-answer, cada opção com rótulo e código,
// e nenhuma cópia é escrita à mão fora do kit, porque só o kit monta o bloco com a pergunta junto.
const semBloco = duvidas.filter(d => !/class="d-answer\b/.test(d)).map(d => d.match(/id="(duvida-\d+)"/)[1])
if (semBloco.length) falhas.push(`dúvida sem <d-answer> (${semBloco.join(', ')}): a resposta copiável leva a pergunta, o rótulo, o código e o comentário`)
const opcaoSemCodigo = [...vivo.matchAll(/<input type="radio"[^>]*value="([^"]*)" data-label="([^"]*)"/g)].filter(m => !m[1] || !m[2]).length
if (opcaoSemCodigo) falhas.push(`opção de <d-answer> sem code ou label (${opcaoSemCodigo}): cada li leva code="1A" e label="A · o que faz"`)
const foraDoKit = html.replace(/<script>\s*\/\/ html-didatico · kit\b[\s\S]*?<\/script>/g, '')
if (/navigator\.clipboard|execCommand\(\s*['"]copy/.test(foraDoKit)) falhas.push('cópia escrita à mão: use <d-answer> e <d-answers>, que copiam o bloco com a pergunta junto')
// Abertura ancorada e produto durável (references/padroes.md): a capa leva a data do estado, e todo documento que não é
// cartão abre com <d-origin> antes da primeira parte, com onde estamos e a pergunta real. O cartão se ancora na própria
// capa (a pergunta é o título, o caso é o sub). O board de uma série ("Decisão N de M") herda a origem do mapa.
const capa = vivo.match(/<header class="d-cover\b[\s\S]*?<\/header>/)?.[0] ?? ''
const forma = capa.match(/class="plate__kind"[^>]*>([^<]*)</)?.[1].trim() ?? ''
if (capa && !/class="plate__date"/.test(capa)) falhas.push('capa sem data (date em d-cover): o estado envelhece, e a data diz de quando ele é')
const cartaoDoc = /class="[^"]*\bpage--card\b/.test(vivo)
const daSerie = /^Decisão \d+ de \d+$/.test(forma) || forma === 'Folha de peças'
if (capa && !cartaoDoc && !daSerie) {
  const origem = vivo.match(/<section class="d-origin\b[\s\S]*?<\/section>/)?.[0]
  const iOrigem = vivo.search(/class="d-origin\b/), iParte = vivo.search(/class="d-part\b/)
  if (!origem) falhas.push('documento sem origem: abra com <d-origin where="…" q="…" ask="…"> logo abaixo da capa, para quem não viu a conversa')
  else {
    if (iParte >= 0 && iOrigem > iParte) falhas.push('<d-origin> depois da primeira parte: a origem vem logo abaixo da capa')
    const falta = [['Onde estamos', 'where'], ['A pergunta', 'q']].filter(([rotulo]) => !origem.includes(`<dt>${rotulo}</dt>`)).map(([, k]) => k)
    if (falta.length) falhas.push(`<d-origin> sem ${falta.join(' e ')}: onde estamos e a pergunta real são o mínimo da origem`)
    // Os termos são glossário, de tamanho livre: a medida vale para onde estamos, a pergunta e o que se pede.
    const palavras = origem.replace(/<div class="origin__row origin__terms">[\s\S]*$/, ' ').replace(/<dt>[^<]*<\/dt>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    if (palavras > 80) avisos.push(`origem com ${palavras} palavras (referência: até 80): ela situa; a explicação mora nas partes`)
  }
}
// Contrato do cartão: a pergunta, o caso em uma linha e as telas; pouco texto, uma página.
if (cartaoDoc) {
  const caso = vivo.match(/class="cover__sub"[^>]*>([\s\S]*?)<\/p>/)?.[1].replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean) ?? []
  if (!caso.length) falhas.push('cartão sem o caso em uma linha (cover__sub): quem, o quê e quando, com os números que as telas usam')
  else if (caso.length > 30) avisos.push(`o caso do cartão tem ${caso.length} palavras (referência: uma linha, até 30): o resto vai para as telas`)
  if (!maior.figuras.length) falhas.push('cartão sem figura: cada pergunta é respondida por uma figura com legenda')
  if (/class="[^"]*\b(?:tabs|rail|stamp)\b/.test(vivo)) avisos.push('cartão com trilho, abas ou carimbo: isso é de documento; o cartão é uma página só')
  if (maior.figuras.length > 3) avisos.push(`cartão com ${maior.figuras.length} figuras: um cartão responde a até três perguntas; mais que isso pede documento ou aula`)
  if (maior.semFigura.length) avisos.push(`pergunta sem figura no cartão (${maior.semFigura.length}): ${lista(maior.semFigura, t => `"${t}"`)}`)
  if (maior.palavrasForaDeTabela > 90) avisos.push(`cartão com ${maior.palavrasForaDeTabela} palavras fora das figuras (referência: até 90): o que a tela mostra sai do texto; o que sobra vira legenda`)
}
// Figura desenha, tabela ordena (references/padroes.md): tabela de frases não é figura, e cada aba tem um desenho.
if (!cartaoDoc && !daSerie) {
  const tabelaDeFrases = maior.tabelas.filter(t => t.longas >= 3)
  if (tabelaDeFrases.length) falhas.push(`tabela de frases no lugar da figura (${tabelaDeFrases.length}): ${lista(tabelaDeFrases, t => `"${t.parte}" com ${t.longas} células acima de 15 palavras`)}; o que a tabela narra vira figura (w-*), e a tabela fica com células curtas`)
  const longas = maior.tabelas.filter(t => t.longas > 0 && t.longas < 3)
  if (longas.length) avisos.push(`célula de tabela com frase (${longas.length}): ${lista(longas, t => `"${t.parte}" até ${t.maior} palavras`)}; célula curta, a explicação vai para a figura`)
  if (maior.abasSemDesenho.length) falhas.push(`aba sem figura desenhada (${maior.abasSemDesenho.join(', ')}): cada aba tem ao menos uma figura feita de componentes w-*, além das tabelas`)
  const totalFig = maior.figurasTabela + maior.figurasDesenhadas
  if (totalFig >= 3 && maior.figurasTabela > maior.figurasDesenhadas) falhas.push(`${maior.figurasTabela} de ${totalFig} figuras são tabelas: a maioria das perguntas tem de ser respondida por desenho (cena ou esquema do kit)`)
}
if (maior.respostaTorta.length) falhas.push(`resposta que não responde ao título (${maior.respostaTorta.length}): ${lista(maior.respostaTorta, t => `"${t}"`)}; pergunta aberta não se responde com Sim ou Não, e a frase responde ao título, não à conversa`)
// Termo interno sem origem: sigla ou código (E2E, FlowUI, m6) fora da lista de termos da origem e das siglas de uso geral.
if (capa && !cartaoDoc && !daSerie) {
  const termosDef = [...vivo.matchAll(/<div><dt>([^<]+)<\/dt><dd>/g)].map(m => m[1].toLowerCase())
  const assunto = (capa.match(/class="plate__subject"[^>]*>([^<]*)</)?.[1] ?? '').split(/[\s·]+/)
  const corpoLido = vivo.replace(/<header class="d-cover\b[\s\S]*?<\/header>/, ' ').replace(/<section class="d-origin\b[\s\S]*?<\/section>/, ' ').replace(/<p class="d-src\b[\s\S]*?<\/p>|<div class="d-src\b[\s\S]*?<\/div>/g, ' ')
    .replace(/<(code|pre|kbd)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')
  const gerais = new Set(['PDF', 'HTML', 'CSS', 'JS', 'URL', 'API', 'ID', 'IDs', 'OK', 'PR', 'PRs', 'UI', 'IA', 'CPF', 'CEP', 'SQL', 'JSON', 'CSV', 'PNG', 'SVG', 'DS', 'TI', 'RG', 'SUS', 'ANVISA', 'FHIR', 'WCAG', 'IMC', 'VET', 'TMB', 'UTC', 'GB', 'MB', 'KB', 'HTTP', 'HTTPS', 'DOM', 'SHA', 'CLT', 'CI', 'LGPD', 'CRN', 'CNPJ'])
  // Montagem fala de componentes pelo nome do código: ali o CamelCase é o assunto, e só siglas e códigos contam.
  const camelValem = forma !== 'Montagem'
  const siglas = [...new Set([...corpoLido.matchAll(/\b(?:[A-Z][A-Za-z]*[A-Z0-9][A-Za-z0-9]*|[a-z]\d{1,2})\b/g)].map(m => m[0]))]
    .map(t => t.replace(/(?<=[A-Z])s$/, ''))
    .filter(t => !gerais.has(t) && !assunto.includes(t) && !/^[A-Z]?\d+$/.test(t) && !termosDef.some(d => d.includes(t.toLowerCase())))
    .filter(t => /\d/.test(t) || /[a-z]/.test(t) || t.length >= 3)  // duas maiúsculas soltas são iniciais (AN, BE), não sigla
    .filter(t => camelValem || /^[A-Z0-9]+$|^[a-z]\d/.test(t))
    .filter((t, i, a) => a.indexOf(t) === i)
  if (siglas.length >= 4) falhas.push(`termos internos sem definição (${siglas.length}): ${lista(siglas, t => t, 8)}; cada um ganha um <li term> na origem ou some`)
  else if (siglas.length) avisos.push(`termo interno sem definição: ${siglas.join(', ')}; defina em <li term> na origem, ou confirme que é de uso geral`)
}
if (transitionAll) falhas.push('transition: all no CSS; liste as propriedades')
if (temAnimacao && !temReducedMotion) falhas.push('há animação ou transição sem bloco prefers-reduced-motion')

for (const f of maior.figuras) {
  if (!f.legenda) avisos.push(`figura ${f.n} sem legenda (figcaption)`)
  if (f.palavras > 28 && !f.tabela) avisos.push(`figura ${f.n} com ${f.palavras} palavras reais: palavra só no assunto, barra no resto`)
  const chave = t => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  if (f.legenda && f.tituloDaParte && chave(f.legenda) === chave(f.tituloDaParte)) avisos.push(`legenda da figura ${f.n} repete o título da parte: a legenda diz o que a figura mostra, com o dado do caso`)
}
// A forma segue o conteúdo (references/padroes.md).
const decisaoDoc = /^(Decidir|Maquete)$/.test(forma) || /^Decisão \d+ de \d+$/.test(forma)
const semEstado = decisaoDoc ? maior.figsSemEstadoNoDoc : maior.semEstado.length
if (semEstado) avisos.push(`tela de produto sem o estado (${semEstado}): numa comparação, cada tela diz de onde é em <w-fig state="…"> (main, dev com o commit, proposto, wireframe)`)
if (maior.espremida.length) avisos.push(`print de produto espremido (${maior.espremida.length}, o menor com ${Math.min(...maior.espremida)}px): a tela real entra inteira, uma por linha, em <d-part desk>; lado a lado só o recorte pequeno`)
if (/^(Aula|Explicação)$/.test(forma) && maior.partesEmPar[1] >= 5 && maior.partesEmPar[0] === maior.partesEmPar[1]) avisos.push(`as ${maior.partesEmPar[1]} partes repetem o par texto e figura: a forma segue o conteúdo; matriz, tela inteira e peça que se mexe pedem largura (wide, desk)`)
if ((decisaoDoc || forma === 'Aula') && maior.matrizSemFonte) avisos.push(`matriz sem fonte (${maior.matrizSemFonte}): comparação é gerada da fonte; diga num <d-src> de onde saiu (script, commit, data)`)
if (maior.linksFora.length) avisos.push(`link para ler em outro lugar (${maior.linksFora.length}): ${lista(maior.linksFora, t => `"${t}"`)}; o documento mostra o fato, e a fonte vai em uma linha no <d-src>`)
if (maior.caps.length) avisos.push(`rótulos em caixa-alta ou com tracking (${maior.caps.length}): ${lista(maior.caps, i => `"${i.texto}"`)}`)
if (maior.mono > 12) avisos.push(`${maior.mono}% do texto em mono fora de código: mono é para código, identificador e número`)
if (maior.medida.length) avisos.push(`linha longa demais (${maior.medida.length}): ${lista(maior.medida, i => `${i.caracteresPorLinha} caracteres "${i.texto}"`)}`)
if (maior.titulo.length) avisos.push(`título mais perto do bloco anterior do que do seu (${maior.titulo.length}): ${lista(maior.titulo, i => `"${i.texto}" ${i.acima}/${i.abaixo}px`)}`)
// O cartão tem medida própria (o total da página), então a medida por tela não se aplica a ele.
if (!cartaoDoc && maior.palavrasPorTela.max > 150) avisos.push(`tela mais carregada tem ${maior.palavrasPorTela.max} palavras de prosa: reparta a parte ou passe conteúdo para a figura`)
if (literaisDeCor.length) avisos.push(`${literaisDeCor.length} cores literais fora dos tokens: ${[...new Set(literaisDeCor)].slice(0, 6).join(' ')}`)
if (espacoCru.length > 3) avisos.push(`${espacoCru.length} espaçamentos em px fora da escala: ${[...new Set(espacoCru.map(d => d.valor))].slice(0, 8).join(' | ')}`)
if (maior.infinitas.length) avisos.push(`animação em loop infinito: ${[...new Set(maior.infinitas)].join(', ')}`)
const tetos = { processo: 0, muleta: 0, hype: 0, negacao: 1, contraste: 2, perguntaRespondida: 1, exclamacao: 1, emoji: 0 }
const nomes = { negacao: 'regra dita pelo que a coisa não é', processo: 'fala de processo', muleta: 'muleta', hype: 'adjetivo no lugar de fato', contraste: 'moldura de contraste', perguntaRespondida: 'pergunta respondida na hora', exclamacao: 'exclamação', emoji: 'emoji' }
for (const [k, teto] of Object.entries(tetos)) if (tiques[k].length > teto) avisos.push(`${nomes[k]} (${tiques[k].length}, teto ${teto}): ${lista(tiques[k], t => `"${t.slice(0, 60)}"`, 3)}`)

const resumo = {
  arquivo: file,
  falhas, avisos,
  metricas: {
    palavrasDeProsa: maior.palavrasDeProsa,
    palavrasPorTela: maior.palavrasPorTela,
    partes: maior.partes,
    figuras: maior.figuras.map(f => ({ n: f.n, legenda: f.legenda, palavras: f.palavras, leitura: f.leitura, recorte: f.recorte })),
    monoPct: maior.mono,
    coresLiterais: literaisDeCor.length,
    espacosCrus: espacoCru.length,
    alturaPorLargura: Object.fromEntries(widths.map(w => [w, porLargura[w].alturaDoc])),
  },
  screenshots: [...widths.map(w => porLargura[w].screenshot), escuro.screenshot],
  controles: controles.total,
}
writeFileSync(resolve(outDir, `${nome}.json`), JSON.stringify(resumo, null, 2))

if (asJson) console.log(JSON.stringify(resumo, null, 2))
else {
  console.log(`\n${file}`)
  console.log(`${controles.total} controles clicados · tema claro e escuro · larguras ${widths.join(', ')}`)
  console.log(`${maior.palavrasDeProsa} palavras de prosa · ${maior.figuras.length} figuras · tela mais carregada ${maior.palavrasPorTela.max} palavras (mediana ${maior.palavrasPorTela.mediana}) · mono ${maior.mono}%`)
  falhas.forEach(f => console.log(`FALHA  ${f}`))
  avisos.forEach(a => console.log(`AVISO  ${a}`))
  if (!falhas.length && !avisos.length) console.log('OK     nada a relatar')
  if (maior.figuras.length) {
    console.log('\nLEITURA PELA FIGURA  cubra a prosa: cada pergunta central precisa estar respondida em uma destas figuras, só com o que está aqui')
    for (const f of maior.figuras) {
      console.log(`  Fig. ${f.n}  legenda: ${f.legenda || '(sem legenda)'}`)
      console.log(`          na figura: ${f.leitura.slice(0, 18).join(' · ')}${f.leitura.length > 18 ? ` · +${f.leitura.length - 18}` : ''}`)
      if (f.recorte) console.log(`          recorte: ${f.recorte}`)
    }
  }
  console.log(`screenshots: ${resumo.screenshots.join('  ')}`)
  console.log(falhas.length ? `\n${falhas.length} falha(s). Conserte e rode de novo.` : `\nSem falhas. ${avisos.length} aviso(s): conserte ou justifique. Agora olhe os screenshots.`)
}
process.exit(falhas.length ? 1 : 0)
