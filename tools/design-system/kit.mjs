// Leitura do kit: tokens do :root, registro de componentes (kit.js) e ícones do sprite. Nenhum valor é redigitado aqui.
import fs from 'node:fs'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

export const REFS = fileURLToPath(new URL('../../plugins/html-didatico/references/', import.meta.url))
export const KIT_DIR = REFS + 'kit/'
export const KIT_CSS = fs.readFileSync(KIT_DIR + 'kit.css', 'utf8')
export const KIT_JS = fs.readFileSync(KIT_DIR + 'kit.js', 'utf8')
export const SPRITE = fs.readFileSync(KIT_DIR + 'sprite.svg', 'utf8').trim()

// ── tokens do :root ─────────────────────────────────────────────────────────
const raizCss = (() => {
  const i = KIT_CSS.indexOf(':root {')
  if (i < 0) throw new Error('kit.css sem bloco :root')
  return KIT_CSS.slice(i + 7, KIT_CSS.indexOf('\n}', i))
})()
export const ROOT = Object.fromEntries([...raizCss.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/;/g, '\u0001')).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(d => [d[1], d[2].trim().replace(/\s+/g, ' ')]))
// O comentário no fim da linha explica o token que o precede.
export const COMENTARIO = Object.fromEntries([...raizCss.matchAll(/(--[\w-]+):\s*[^;]+;\s*\/\*\s*([\s\S]*?)\s*\*\//g)].map(m => [m[1], m[2].replace(/\s+/g, ' ')]))

export const cru = nome => ROOT[nome]
export const resolvido = nome => {
  let v = cru(nome)
  for (let i = 0; i < 8 && /var\(/.test(v); i++) v = v.replace(/var\((--[\w-]+)\)/g, (_, n) => cru(n))
  return v
}
export const px = nome => {
  const v = resolvido(nome)
  let m
  if ((m = v.match(/^([\d.]+)px$/))) return +m[1]
  if ((m = v.match(/^([\d.]+)rem$/))) return +m[1] * 16
  return null
}

// ── registro de componentes: o mesmo kit.js que roda no navegador, lido sem DOM ──
const ctx = { window: {}, queueMicrotask }
vm.runInNewContext(KIT_JS, ctx)
export const HD = ctx.window.HD

// ── ícones do sprite ────────────────────────────────────────────────────────
export const ICONES = Object.fromEntries([...SPRITE.matchAll(/<symbol id="(i-[\w-]+)" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g)].map(m => [m[1], { vb: m[2], d: m[3].match(/ d="([^"]+)"/)[1] }]))
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
