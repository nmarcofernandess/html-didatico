// html-didatico · kit em Node
// A fonte única do kit (references/kit/kit.css, kit.js, sprite.svg), o registro de componentes lido sem DOM
// e o molde do documento autocontido. montar.mjs e o motor dos boards (references/decisoes/gerar.mjs) usam daqui.

import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

export const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const ler = p => readFileSync(resolve(raiz, p), 'utf8')
// As faces embutidas vêm antes dos tokens: o documento sai autocontido, sem pedir fonte à rede.
export const css = (ler('references/kit/fontes.css') + ler('references/kit/kit.css')).trimEnd()
export const js = ler('references/kit/kit.js').trimEnd()
export const sprite = ler('references/kit/sprite.svg').trim()

// O registro roda em Node do mesmo jeito que no navegador, sem DOM: só os metadados e as funções puras.
const ctx = { window: {}, queueMicrotask }
vm.runInNewContext(js, ctx)
export const HD = ctx.window.HD

export const INI = '/* ══ KIT ══ não edite daqui até o fim do kit; mude references/kit/kit.css e rode scripts/montar.mjs */'
export const FIM = '/* ══ FIM DO KIT ══ */'
const pagina = '\n/* ── DESTA PÁGINA ── só o que este documento tem de único, sempre com os tokens do kit. */\n'

export const documento = ({ titulo, corpo, cssDaPagina = '' }) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<style>
${INI}
${css}
${FIM}
${pagina}${cssDaPagina}</style>
</head>
<body>
${sprite}
${corpo.trim()}
<script>
${js}
</script>
</body>
</html>
`

// Playwright é a mesma dependência do check: npm install em scripts/, depois npx playwright install chromium.
export const navegador = async () => {
  try {
    return await createRequire(resolve(raiz, 'scripts/package.json'))('playwright').chromium.launch()
  } catch {
    console.error(`Playwright não encontrado. Instale uma vez: cd ${resolve(raiz, 'scripts')} && npm install && npx playwright install chromium`)
    process.exit(1)
  }
}

// Pré-renderiza corpos escritos com componentes: o kit monta cada um num navegador e devolve a marcação
// semântica que ele gerou, sem script. É a mesma saída que a página teria com kit.js rodando.
export const preRenderizar = async corpos => {
  const browser = await navegador()
  const page = await browser.newPage()
  const erros = []
  page.on('pageerror', e => erros.push(e.message))
  const saidas = []
  for (const corpo of corpos) {
    await page.setContent(documento({ titulo: 'pré-render', corpo }), { waitUntil: 'load' })
    saidas.push(await page.evaluate(() => {
      // Qualquer d-*/w-* que sobrou é componente que o kit não conhece (um erro de digitação) ou que não montou.
      const soltos = [...document.body.querySelectorAll('*')].map(el => el.localName).filter(n => /^[dw]-/.test(n))
      if (soltos.length) throw new Error(`componente que o kit não conhece ou não montou: ${[...new Set(soltos)].join(', ')}`)
      for (const el of document.querySelectorAll('[data-ligado]')) el.removeAttribute('data-ligado')
      for (const s of document.querySelectorAll('body > script')) s.remove()
      return document.body.innerHTML.trim()
    }))
  }
  await browser.close()
  if (erros.length) throw new Error(`erro de script no pré-render: ${erros.join(' · ')}`)
  return saidas
}
