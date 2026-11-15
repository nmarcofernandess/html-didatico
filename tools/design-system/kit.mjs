// Leitura do kit: tokens dos dois looks e ícones do sprite. Nenhum valor é redigitado aqui.
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

export const REFS = fileURLToPath(new URL('../../plugins/html-didatico/references/', import.meta.url))
export const KIT_DIR = REFS + 'kit/'
export const KIT_CSS = fs.readFileSync(KIT_DIR + 'kit.css', 'utf8')
const SPRITE = fs.readFileSync(KIT_DIR + 'sprite.svg', 'utf8')

// ── tokens ──────────────────────────────────────────────────────────────────
const semComentario = KIT_CSS.replace(/\/\*[\s\S]*?\*\//g, '')
const secaoTokens = semComentario.slice(0, semComentario.indexOf('*, *::before'))
const blocos = [...secaoTokens.matchAll(/([^{}]+)\{([^}]*)\}/g)].map(m => ({
  sel: m[1].trim().replace(/\s+/g, ' '),
  decl: Object.fromEntries([...m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(d => [d[1], d[2].trim().replace(/\s+/g, ' ')])),
}))
export const BASE = blocos.find(b => b.sel === ':root').decl
export const MANUAL = blocos.find(b => b.sel.includes('manual')).decl
export const EDITORIAL = blocos.find(b => b.sel.includes('editorial') && !b.sel.includes('manual')).decl
export const mapa = look => ({ ...BASE, ...MANUAL, ...(look === 'editorial' ? EDITORIAL : {}) })
export const cru = (nome, look = 'manual') => mapa(look)[nome]
export const resolvido = (nome, look = 'manual') => {
  let v = cru(nome, look)
  for (let i = 0; i < 8 && /var\(/.test(v); i++) v = v.replace(/var\((--[\w-]+)\)/g, (_, n) => cru(n, look))
  return v
}
export const px = (nome, look) => {
  const v = resolvido(nome, look)
  let m
  if ((m = v.match(/^([\d.]+)px$/))) return +m[1]
  if ((m = v.match(/^([\d.]+)rem$/))) return +m[1] * 16
  return null
}
export const emPx = (nome, look) => { const n = px(nome, look); return n == null ? '' : `${String(n).replace('.', ',')}px` }

const corDe = v => {
  let m
  if ((m = v.match(/^#([0-9a-f]{6})$/i))) return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16), a: 1 }
  if ((m = v.match(/^rgb\((\d+) (\d+) (\d+)(?: \/ ([\d.]+))?\)$/))) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] == null ? 1 : +m[4] }
  return null
}
const lum = ({ r, g, b }) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b) }
export const contraste = (texto, fundo, look = 'manual') => {
  const t = corDe(resolvido(texto, look)), f = corDe(resolvido(fundo, look))
  if (!t || !f) return null
  const a = lum(t), b = lum(f)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}
export const fmt = n => n.toFixed(2).replace('.', ',')

// ── ícones do sprite, embutidos como path ───────────────────────────────────
export const ICONES = Object.fromEntries([...SPRITE.matchAll(/<symbol id="(i-[\w-]+)" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g)].map(m => [m[1], { vb: m[2], d: m[3].match(/ d="([^"]+)"/)[1] }]))
export const ico = (nome, cls = 'ico') => {
  const i = ICONES['i-' + nome]
  if (!i) throw new Error('ícone fora do sprite: ' + nome)
  return `<svg class="${cls}" viewBox="${i.vb}" aria-hidden="true"><path d="${i.d}"></path></svg>`
}
export const cursor = (x, y) => ico('cursor-fill', 'cursor').replace('<svg ', `<svg style="--x: ${x}%; --y: ${y}%" `)
export const bar = w => `<span class="bar" style="--w: ${w}%"></span>`
export const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
