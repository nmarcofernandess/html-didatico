#!/usr/bin/env node
// html-didatico · check
// Renderiza o documento em três larguras, salva os screenshots e mede o que dá para medir.
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

// Blocos de token: :root e [data-look]. Ali os literais são permitidos; fora dali, não.
const semTokens = css.replace(/([^{}]+)\{([^{}]*)\}/g, (regra, seletor) => /^\s*(?::root|\[data-look|html\[data-look)/.test(seletor) ? '' : regra)

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

for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(pathToFileURL(resolve(file)).href)
  await page.waitForTimeout(250)
  // Abas: o check lê todas as camadas, uma abaixo da outra, como na impressão.
  await page.evaluate(() => document.querySelectorAll('.tabs__panel[hidden]').forEach(p => { p.hidden = false }))
  const shot = resolve(outDir, `${nome}-${w}.png`)
  await page.screenshot({ path: shot, fullPage: true })

  porLargura[w] = await page.evaluate(() => {
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
      if (mono && !el.closest('code, pre, kbd, samp, .code, .files, .term')) charsMono += proprio.length

      if (fs < 11) pequeno.push({ el: rotulo(el), px: fs, texto: trecho(el) })
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
      const textos = comTexto.filter(el => f.contains(el) && !el.closest('figcaption'))
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
    const prosa = comTexto.filter(el => !naFigura(el) && !el.closest('nav, footer'))
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

    const semFigura = [...document.querySelectorAll('.part')].filter(visivel)
      .filter(s => s.querySelector('h2') && !s.querySelector('figure, .fig, table')).map(s => trecho(s.querySelector('h2')))
    const palavrasForaDeTabela = prosa.filter(el => !el.closest('table')).reduce((n, el) => n + [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent.trim()).join(' ').split(/\s+/).filter(Boolean).length, 0)

    const infinitas = [...document.querySelectorAll('*')].filter(el => getComputedStyle(el).animationIterationCount === 'infinite' && getComputedStyle(el).animationName !== 'none').map(rotulo)
    const doc = document.documentElement
    return {
      rolagemHorizontal: doc.scrollWidth > doc.clientWidth + 1 ? doc.scrollWidth - doc.clientWidth : 0,
      pequeno, caps, contraste, apertado, medida, titulo, figuras, partes, infinitas, semFigura, palavrasForaDeTabela,
      mono: charsTotal ? +(charsMono / charsTotal * 100).toFixed(1) : 0,
      palavrasPorTela: { max: Math.max(0, ...janelas), mediana: ordenadas[Math.floor(ordenadas.length / 2)] ?? 0 },
      palavrasDeProsa: marcas.reduce((s, m) => s + m.n, 0),
      alturaDoc,
      texto: prosa.map(el => [...el.childNodes].filter(c => c.nodeType === 3).map(c => c.textContent).join(' ')).join('\n'),
    }
  })
  porLargura[w].screenshot = shot
  if (w === Math.max(...widths)) {
    for (const f of porLargura[w].figuras) {
      f.recorte = resolve(outDir, `${nome}-fig-${f.n}.png`)
      await page.locator(`[data-check-fig="${f.n}"]`).screenshot({ path: f.recorte }).catch(() => { f.recorte = '' })
    }
  }
  await ctx.close()
}
await browser.close()

// ───────────────────────── tiques de texto (contáveis) ─────────────────────────

const maior = porLargura[Math.max(...widths)]
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
  if (d.pequeno.length) falhas.push(`texto abaixo de 11px ${em} (${d.pequeno.length}): ${lista(d.pequeno, i => `${i.px}px "${i.texto}"`)}`)
  for (const f of d.figuras) {
    if (f.cortado.length) falhas.push(`figura ${f.n} corta palavra real ${em}: ${lista(f.cortado, t => `"${t}"`)}`)
    if (f.vaza.length) falhas.push(`figura ${f.n} vaza da moldura ${em}: ${lista(f.vaza, t => `"${t}"`)}`)
  }
  if (d.apertado.length) avisos.push(`caixa apertada ${em} (${d.apertado.length}): ${lista(d.apertado, i => `${i.lado}px "${i.texto}"`)}`)
}
if (maior.contraste.length) falhas.push(`contraste abaixo do mínimo (${maior.contraste.length}): ${lista(maior.contraste, i => `${i.razao}:1 "${i.texto}"`)}`)
if (tiques.residuo.length) falhas.push(`resíduo no texto: ${lista(tiques.residuo, t => `"${t}"`)}`)
// Contrato do HTML Didático, lido no arquivo: o kit embutido, nenhum código de nota, opção com nome, dúvida com resposta.
if (!html.includes('══ KIT ══') || !/<html[^>]*data-look=/.test(html)) falhas.push('documento fora do kit: parta do starter ou de um exemplo-ouro, com o kit embutido e data-look no <html>')
const visivel = html.replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ')
const codigos = [...visivel.matchAll(/\b(?:PRD|SPEC|ADR|RFC)[ -]?\d{1,3}\b|\b[CDRQ]-\d{2,4}\b|\b\d{3}\/\d{2}\b|\b(?:a|à|da|na|pela|pelo|do|no) 0\d\b|\b(?:quadro|aula|desenho|board|card) \d+(?:\.\d+)?\b/gi)].map(m => m[0])
if (codigos.length) falhas.push(`código de nota no texto (${codigos.length}): ${lista([...new Set(codigos)], c => `"${c}"`)}; mostre o fato ou leve ao quadro por link`)
const semNome = [...html.matchAll(/<h[2-6][^>]*>\s*((?:Uma|Outra) (?:possibilidade|opção|alternativa)|Opção \d|Alternativa [A-Z\d])\s*<\/h[2-6]>/gi)].map(m => m[1])
if (semNome.length) falhas.push(`opção sem nome (${semNome.length}): ${lista(semNome, s => `"${s}"`)}; a opção se chama pelo que faz, A · <o que muda>`)
const duvidas = html.split(/(?=<[^>]+\bid="duvida-\d+")/).slice(1)
const semResposta = duvidas.filter(d => !/Responda no chat/i.test(d) || !/Recomendad/i.test(d)).map(d => d.match(/id="(duvida-\d+)"/)[1])
if (semResposta.length) falhas.push(`dúvida sem recomendada ou sem "Responda no chat": ${semResposta.join(', ')}`)
// Contrato do cartão: a pergunta, o caso em uma linha e as telas; pouco texto, uma página.
const cartao = /class="[^"]*\bpage--card\b/.test(html)
if (cartao) {
  const caso = html.match(/class="cover__sub"[^>]*>([\s\S]*?)<\/p>/)?.[1].replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean) ?? []
  if (!caso.length) falhas.push('cartão sem o caso em uma linha (cover__sub): quem, o quê e quando, com os números que as telas usam')
  else if (caso.length > 30) avisos.push(`o caso do cartão tem ${caso.length} palavras (referência: uma linha, até 30): o resto vai para as telas`)
  if (!maior.figuras.length) falhas.push('cartão sem figura: cada pergunta é respondida por uma figura com legenda')
  if (/class="[^"]*\b(?:tabs|rail|stamp)\b/.test(html)) avisos.push('cartão com trilho, abas ou carimbo: isso é de documento; o cartão é uma página só')
  if (maior.figuras.length > 3) avisos.push(`cartão com ${maior.figuras.length} figuras: um cartão responde a até três perguntas; mais que isso pede documento ou aula`)
  if (maior.semFigura.length) avisos.push(`pergunta sem figura no cartão (${maior.semFigura.length}): ${lista(maior.semFigura, t => `"${t}"`)}`)
  if (maior.palavrasForaDeTabela > 90) avisos.push(`cartão com ${maior.palavrasForaDeTabela} palavras fora das figuras (referência: até 90): o que a tela mostra sai do texto; o que sobra vira legenda`)
}
if (transitionAll) falhas.push('transition: all no CSS; liste as propriedades')
if (temAnimacao && !temReducedMotion) falhas.push('há animação ou transição sem bloco prefers-reduced-motion')

for (const f of maior.figuras) {
  if (!f.legenda) avisos.push(`figura ${f.n} sem legenda (figcaption)`)
  if (f.palavras > 28 && !f.tabela) avisos.push(`figura ${f.n} com ${f.palavras} palavras reais: palavra só no assunto, barra no resto`)
  const chave = t => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  if (f.legenda && f.tituloDaParte && chave(f.legenda) === chave(f.tituloDaParte)) avisos.push(`legenda da figura ${f.n} repete o título da parte: a legenda diz o que a figura mostra, com o dado do caso`)
}
if (maior.caps.length) avisos.push(`rótulos em caixa-alta ou com tracking (${maior.caps.length}): ${lista(maior.caps, i => `"${i.texto}"`)}`)
if (maior.mono > 12) avisos.push(`${maior.mono}% do texto em mono fora de código: mono é para código, identificador e número`)
if (maior.medida.length) avisos.push(`linha longa demais (${maior.medida.length}): ${lista(maior.medida, i => `${i.caracteresPorLinha} caracteres "${i.texto}"`)}`)
if (maior.titulo.length) avisos.push(`título mais perto do bloco anterior do que do seu (${maior.titulo.length}): ${lista(maior.titulo, i => `"${i.texto}" ${i.acima}/${i.abaixo}px`)}`)
// O cartão tem medida própria (o total da página), então a medida por tela não se aplica a ele.
if (!cartao && maior.palavrasPorTela.max > 150) avisos.push(`tela mais carregada tem ${maior.palavrasPorTela.max} palavras de prosa: reparta a parte ou passe conteúdo para a figura`)
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
  screenshots: widths.map(w => porLargura[w].screenshot),
}
writeFileSync(resolve(outDir, `${nome}.json`), JSON.stringify(resumo, null, 2))

if (asJson) console.log(JSON.stringify(resumo, null, 2))
else {
  console.log(`\n${file}`)
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
