#!/usr/bin/env node
// html-didatico · montar
// Gera os arquivos autocontidos a partir da fonte única do kit em references/kit/ (kit.css, kit.js, sprite.svg).
// Rode depois de qualquer mudança no kit:  node scripts/montar.mjs
//   escreve starter.html, pecas.html (a folha de peças, gerada do registro de componentes) e componentes.md.
// Também reembute o kit atual num documento 4.x já escrito:  node scripts/montar.mjs --atualizar <arquivo.html>
// E cria um documento novo a partir de uma base pronta:   node scripts/montar.mjs --novo <base> <destino.html>

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { css, documento, FIM, HD, INI, js, ler, raiz, sprite } from './kit.mjs'

const esc = HD.esc

// ── A folha de peças e a referência em texto saem do mesmo registro ──
const GRUPOS = [
  ['Documento', 'Documento', 'O chassi: capa, partes, abas, avisos e o pé. Monta a página; não desenha o produto.'],
  ['Tela', 'Tela', 'O wireframe do produto: janela, campo, lista, botão, mensagem. Traço preto, contexto em cinza.'],
  ['Caneta', 'Caneta', 'Quem explica: marca, pino e chamada em magenta. Valem em qualquer componente (mark, pin, click).'],
  ['Esquema', 'Esquema', 'O blueprint: fluxo, barras, matriz, arquivos, código, camadas, linha do tempo e composição.'],
]
const SEM_AO_VIVO = new Set(['d-doc', 'd-cover', 'd-part', 'd-steps', 'd-tabs', 'd-tab', 'd-cols', 'd-band', 'w-fig'])
const tabelaDeProps = props => {
  const linhas = Object.entries(props)
  return linhas.length
    ? `<table class="table peca__props"><thead><tr><th>Prop</th><th>O que faz</th></tr></thead><tbody>${linhas.map(([k, v]) => `<tr><td><code>${esc(k)}</code></td><td>${esc(v)}</td></tr>`).join('')}</tbody></table>`
    : '<p>Sem props próprias; só filhos.</p>'
}
const secoes = GRUPOS.map(([grupo, rotulo, frase]) => {
  const pecas = Object.values(HD.componentes).filter(c => c.grupo === grupo)
  const partes = pecas.map(c => {
    const vivo = c.ex && !SEM_AO_VIVO.has(c.tag)
      ? (c.tag.startsWith('w-') ? `<w-fig cap="${esc(c.doc.split(/[.:]/)[0])}">${c.ex}</w-fig>` : `<div slot="fig" class="peca__live">${c.ex}</div>`)
      : ''
    const codigo = `<pre class="snippet" slot="fig">${esc(c.ex ?? `<${c.tag}>…</${c.tag}>`)}</pre>`
    return `        <d-part title="${c.tag}" id="peca-${c.tag}">\n          <p>${esc(c.doc)}</p>\n          ${tabelaDeProps(c.props)}\n          ${vivo}\n          ${codigo}\n        </d-part>`
  }).join('\n')
  return `      <d-tab label="${rotulo}" id="${rotulo.toLowerCase()}">\n        <d-part title="${rotulo}" id="sobre-${rotulo.toLowerCase()}" wide><p>${esc(frase)}</p></d-part>\n${partes}\n      </d-tab>`
}).join('\n\n')

const referencia = `# Componentes do kit

Gerado de \`kit.js\` por \`scripts/montar.mjs\`; não edite à mão. A aparência mora em \`kit.css\`.
Escreva o documento com estes componentes: cada um vira a marcação semântica que o kit veste.
Props são atributos; sem valor, valem como ligadas (\`mark\`, \`on\`). Filhos entram onde a tabela diz.

Valem em qualquer \`w-*\`: \`mark\` (a caneta contorna ou realça; em \`w-code\`, escolhe as linhas), \`pin="1"\`
(número magenta no canto), \`click\` com \`x\`/\`y\` opcionais (cursor sobre o alvo). Em \`d-part\`, qualquer filho com
\`slot="fig"\`, componente ou não, vai para a coluna da figura, junto de \`w-fig\` e \`table.table\`; em \`d-band\`,
\`slot="aside"\` vai para a direita.

${GRUPOS.map(([grupo, , frase]) => `## ${grupo}\n\n${frase}\n\n${Object.values(HD.componentes).filter(c => c.grupo === grupo).map(c => `### \`<${c.tag}>\`\n\n${c.doc}\n\n${Object.entries(c.props).map(([k, v]) => `- \`${k}\`: ${v}`).join('\n') || '- só filhos'}\n${c.ex ? `\n\`\`\`html\n${c.ex}\n\`\`\`\n` : ''}`).join('\n')}`).join('\n')}`

const BASES = { cartao: 'ouro/cartao.html', explicacao: 'ouro/explicacao.html', 'passo-a-passo': 'ouro/passo-a-passo.html', aula: 'ouro/aula.html', decidir: 'ouro/decidir.html', prova: 'ouro/prova.html', montagem: 'ouro/montagem.html', maquete: 'ouro/maquete.html', starter: 'starter.html' }
const i = process.argv.indexOf('--atualizar'), n = process.argv.indexOf('--novo'), c = process.argv.indexOf('--corpo')
if (c >= 0) {
  // Documento a partir de um corpo escrito só com componentes: o kit entra inteiro, o corpo como está.
  // O <title> sai do <d-cover> (o filho) quando não vem por argumento. Um <style data-pagina> no corpo vira o bloco "desta página".
  const [origem, destino, tituloArg] = process.argv.slice(c + 1)
  if (!origem || !destino) { console.error('Uso: node scripts/montar.mjs --corpo <corpo.html> <destino.html> ["título"]'); process.exit(1) }
  let corpo = readFileSync(resolve(origem), 'utf8')
  const estilo = corpo.match(/<style data-pagina>([\s\S]*?)<\/style>/)
  corpo = corpo.replace(/<style data-pagina>[\s\S]*?<\/style>\s*/, '')
  const titulo = tituloArg ?? corpo.match(/<d-cover[^>]*>([\s\S]*?)<\/d-cover>/)?.[1].replace(/<[^>]+>/g, '').trim() ?? 'html-didatico'
  mkdirSync(dirname(resolve(destino)), { recursive: true })
  writeFileSync(resolve(destino), documento({ titulo, corpo, cssDaPagina: estilo ? estilo[1].trim() + '\n' : '' }))
  console.log(`montado: ${resolve(destino)}`)
} else if (n >= 0) {
  // O documento nasce de uma cópia: o kit chega inteiro e ninguém o redigita. Depois é só trocar o corpo.
  const base = BASES[process.argv[n + 1]], destino = process.argv[n + 2]
  if (!base || !destino) { console.error(`Uso: node scripts/montar.mjs --novo <${Object.keys(BASES).join('|')}> <destino.html>`); process.exit(1) }
  const alvo = resolve(destino)
  if (existsSync(alvo)) { console.error(`Já existe: ${alvo}. Escolha outro nome ou edite esse arquivo.`); process.exit(1) }
  mkdirSync(dirname(alvo), { recursive: true })
  copyFileSync(resolve(raiz, 'references/kit', base), alvo)
  console.log(`criado: ${alvo}\nbase: references/kit/${base}\nTroque o título, a capa e o corpo. O bloco do kit, o sprite e o script ficam como estão.`)
} else if (i >= 0) {
  const alvo = resolve(process.argv[i + 1])
  let html = readFileSync(alvo, 'utf8')
  const a = html.indexOf(INI), b = html.indexOf(FIM)
  if (a < 0 || b < 0) { console.error('Este arquivo não tem os marcadores do kit.'); process.exit(1) }
  // Um documento da 3.x é escrito em marcação (.part, .win…) que o kit 4 não veste mais: trocar só o kit
  // daria uma página que parece migrada e não está. Ele fica como está, ou o corpo é reescrito com componentes.
  const corpo = html.slice(html.indexOf('<body'))
  if (!/<[dw]-[a-z]+[\s>]/.test(corpo)) {
    console.error('Este documento é da 3.x: o corpo não usa componentes d-*/w-*, e o kit 4 não veste a marcação antiga.\nReescreva o corpo com componentes e monte com --corpo, ou deixe o documento como está.')
    process.exit(1)
  }
  html = html.slice(0, a) + INI + '\n' + css + '\n' + html.slice(b)
  html = html.replace(/<svg class="sprite"[\s\S]*?<\/svg>/, sprite)
  html = html.replace(/<script>\n\/\/ html-didatico · kit[\s\S]*?<\/script>/, () => `<script>\n${js}\n</script>`)
  writeFileSync(alvo, html)
  console.log('kit atualizado em', alvo)
} else {
  writeFileSync(resolve(raiz, 'references/kit/starter.html'), documento({ titulo: '{{título}}', corpo: ler('references/kit/starter.body.html') }))
  const corpo = ler('references/kit/pecas.body.html').replace('{{versao}}', HD.versao).replace('<!-- COMPONENTES -->', secoes)
  writeFileSync(resolve(raiz, 'references/kit/pecas.html'), documento({ titulo: 'html-didatico · peças do kit', corpo, cssDaPagina: ler('references/kit/pecas.css') }))
  writeFileSync(resolve(raiz, 'references/kit/componentes.md'), referencia)
  // Os exemplos-ouro têm fonte em ouro/<nome>.body.html; o .html ao lado é gerado e acompanha o kit.
  const ouro = readdirSync(resolve(raiz, 'references/kit/ouro')).filter(f => f.endsWith('.body.html'))
  for (const f of ouro) {
    let corpo = ler(`references/kit/ouro/${f}`)
    const estilo = corpo.match(/<style data-pagina>([\s\S]*?)<\/style>/)
    corpo = corpo.replace(/<style data-pagina>[\s\S]*?<\/style>\s*/, '')
    const titulo = corpo.match(/<d-cover[^>]*>([\s\S]*?)<\/d-cover>/)?.[1].replace(/<[^>]+>/g, '').trim() ?? f
    writeFileSync(resolve(raiz, 'references/kit/ouro', f.replace('.body.html', '.html')), documento({ titulo, corpo, cssDaPagina: estilo ? estilo[1].trim() + '\n' : '' }))
  }
  console.log(`montado: references/kit/starter.html, pecas.html, componentes.md (${Object.keys(HD.componentes).length} componentes) e ${ouro.length} exemplo(s)-ouro`)
}
