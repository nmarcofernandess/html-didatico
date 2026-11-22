#!/usr/bin/env node
// html-didatico · montar
// Gera os arquivos autocontidos a partir da fonte única do kit em references/kit/ (kit.css, kit.js, sprite.svg).
// Rode depois de qualquer mudança no kit:  node scripts/montar.mjs
// Também reembute o kit atual num documento já escrito:  node scripts/montar.mjs --atualizar <arquivo.html>
// E cria um documento novo a partir de uma base pronta:   node scripts/montar.mjs --novo <base> <destino.html>
// Bases: cartao, explicacao, passo-a-passo, aula (os exemplos-ouro) e starter (o kit com a página em branco).

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ler = p => readFileSync(resolve(raiz, p), 'utf8')
const css = ler('references/kit/kit.css').trimEnd(), js = ler('references/kit/kit.js').trimEnd(), sprite = ler('references/kit/sprite.svg').trim()

const INI = '/* ══ KIT ══ não edite daqui até o fim do kit; mude references/kit/kit.css e rode scripts/montar.mjs */'
const FIM = '/* ══ FIM DO KIT ══ */'
const pagina = '\n/* ── DESTA PÁGINA ── só o que este documento tem de único, sempre com os tokens do kit. */\n'

const documento = ({ titulo, look = 'manual', corpo, cssDaPagina = '' }) => `<!DOCTYPE html>
<html lang="pt-BR" data-look="${look}">
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

const BASES = { cartao: 'ouro/cartao.html', explicacao: 'ouro/explicacao.html', 'passo-a-passo': 'ouro/passo-a-passo.html', aula: 'ouro/aula.html', starter: 'starter.html' }
const i = process.argv.indexOf('--atualizar'), n = process.argv.indexOf('--novo')
if (n >= 0) {
  // O documento nasce de uma cópia: o kit chega inteiro e ninguém o redigita. Depois é só trocar o <main>.
  const base = BASES[process.argv[n + 1]], destino = process.argv[n + 2]
  if (!base || !destino) { console.error(`Uso: node scripts/montar.mjs --novo <${Object.keys(BASES).join('|')}> <destino.html>`); process.exit(1) }
  const alvo = resolve(destino)
  if (existsSync(alvo)) { console.error(`Já existe: ${alvo}. Escolha outro nome ou edite esse arquivo.`); process.exit(1) }
  mkdirSync(dirname(alvo), { recursive: true })
  copyFileSync(resolve(raiz, 'references/kit', base), alvo)
  console.log(`criado: ${alvo}\nbase: references/kit/${base}\nTroque o título, a capa e o conteúdo do <main>. O bloco do kit e o sprite ficam como estão.`)
} else if (i >= 0) {
  const alvo = resolve(process.argv[i + 1])
  let html = readFileSync(alvo, 'utf8')
  const a = html.indexOf(INI), b = html.indexOf(FIM)
  if (a < 0 || b < 0) { console.error('Este arquivo não tem os marcadores do kit.'); process.exit(1) }
  html = html.slice(0, a) + INI + '\n' + css + '\n' + html.slice(b)
  html = html.replace(/<svg class="sprite"[\s\S]*?<\/svg>/, sprite)
  html = html.replace(/<script>\n\/\/ html-didatico · kit[\s\S]*?<\/script>/, () => `<script>\n${js}\n</script>`)
  writeFileSync(alvo, html)
  console.log('kit atualizado em', alvo)
} else {
  writeFileSync(resolve(raiz, 'references/kit/starter.html'), documento({ titulo: '{{título}}', corpo: ler('references/kit/starter.body.html') }))
  let n = 1
  try {
    writeFileSync(resolve(raiz, 'references/kit/pecas.html'), documento({ titulo: 'html-didatico · peças do kit', corpo: ler('references/kit/pecas.body.html'), cssDaPagina: ler('references/kit/pecas.css') }))
    n++
  } catch { /* a folha de peças é opcional na montagem */ }
  console.log(`montado: references/kit/starter.html${n > 1 ? ' e references/kit/pecas.html' : ''}`)
}
