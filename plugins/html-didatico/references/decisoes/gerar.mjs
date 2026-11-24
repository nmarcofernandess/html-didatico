#!/usr/bin/env node
// Motor dos boards de decisão: lê um arquivo de decisões e escreve, na pasta project/ de um canvas de Design,
// o mapa, um board por decisão e as entradas da página no canvas.json.
//
//   node gerar.mjs <decisoes.mjs> <pasta project/ do canvas>    os boards do canvas
//   node gerar.mjs <decisoes.mjs> --html <pasta>                 os mesmos boards como HTML do kit, para o check
//
// O arquivo de decisões é um módulo ES que exporta PAGINA, MAPA, DECISOES e, se houver, JA_DECIDIDO, ALTURAS,
// PREFIXO e LARGURA (veja formato.md, ao lado). As figuras são componentes do kit (w-*, d-*).
//
// Cada board é escrito com os componentes do kit e pré-renderizado: o kit monta a página num navegador e o board
// recebe a marcação pronta, sem script, vestida pelo bundle.css do design system HTML Didático instalado no canvas
// (project/ds/hd/). O canvas edita essa marcação como qualquer outra; nada depende de outro design system.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const PLUGIN = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const { documento, HD, preRenderizar } = await import(pathToFileURL(resolve(PLUGIN, 'scripts/kit.mjs')).href)
const esc = HD.esc

const PASTA_DS = 'ds/hd'
const KIND = { muda: 'Muda o sistema', fica: 'Fica como em dev', arruma: 'Arrumação' }
const GRUPOS = [
  ['muda', 'Mudam o sistema', 'A recomendação troca algo que dev faz.'],
  ['fica', 'Ficam como em dev', 'A recomendação é manter. Dá para responder o grupo de uma vez.'],
  ['arruma', 'Arrumação', 'Regras de migração, de documentação ou de boards antigos.'],
]

const sair = linhas => { console.error([linhas].flat().join('\n')); process.exit(1) }
const uso = () => sair('Uso: node gerar.mjs <decisoes.mjs> <pasta project/ do canvas>\n     node gerar.mjs <decisoes.mjs> --html <pasta>')

// ── Conferência do arquivo de decisões ──
const texto = v => typeof v === 'string' && v.trim() !== ''
const validar = cfg => {
  const falhas = []
  const exige = (cond, msg) => { if (!cond) falhas.push(msg) }
  const { PAGINA: P, MAPA: M, DECISOES: D } = cfg
  exige(P && texto(P.id) && /^[A-Za-z0-9_-]{1,40}$/.test(P.id) && texto(P.nome), 'PAGINA com id (letras, números, - e _) e nome')
  exige(M, 'falta exportar MAPA')
  if (M) {
    for (const k of ['arquivo', 'titulo', 'olho', 'data', 'depois']) exige(texto(M[k]), `MAPA.${k} em texto`)
    exige(/^[A-Za-z0-9_][A-Za-z0-9_.-]*\.dc\.html$/.test(M.arquivo ?? ''), 'MAPA.arquivo termina em .dc.html, sem espaço nem pasta')
    exige(/^\d{2}\/\d{2}\/\d{4}$/.test(M.data ?? ''), 'MAPA.data em dd/mm/aaaa')
    exige(!M.links || (Array.isArray(M.links) && M.links.length <= 1 && M.links.every(l => Array.isArray(l) && texto(l[0]) && texto(l[1]))), 'MAPA.links tem no máximo um link: [[rótulo, arquivo]]')
  }
  exige(Array.isArray(D) && D.length > 0, 'DECISOES com ao menos uma decisão')
  exige(/^[A-Za-z][A-Za-z0-9_-]*$/.test(cfg.PREFIXO), 'PREFIXO só com letras, números, - e _')
  ;(Array.isArray(D) ? D : []).forEach((d, i) => {
    const onde = `decisão ${i + 1}`
    for (const k of ['short', 'q', 'rec']) exige(texto(d[k]), `${onde}: ${k} em texto`)
    exige(KIND[d.kind], `${onde}: kind deve ser muda, fica ou arruma`)
    const opts = Array.isArray(d.opts) ? d.opts : []
    exige(opts.length >= 2, `${onde}: ao menos duas opções`)
    opts.forEach((o, k) => exige(Array.isArray(o) && o.length === 2 && texto(o[1]) && texto(o[0]) && o[0].startsWith(`${'ABCDEF'[k]} · `),
      `${onde}: opção ${k + 1} é [rótulo, texto], com o rótulo "${'ABCDEF'[k]} · o que ela faz"`))
    exige(Number.isInteger(d.pick) && d.pick >= 0 && d.pick < opts.length, `${onde}: pick fora das opções`)
    const quadros = Array.isArray(d.quadros) ? d.quadros : []
    exige(quadros.length >= 2 && quadros.length <= 3, `${onde}: dois ou três quadros antes da resposta`)
    quadros.forEach((q, k) => exige(Array.isArray(q) && q.length === 3 && q.every(texto), `${onde}: quadro ${k + 1} é [título, frase, figura]`))
  })
  for (const lei of cfg.JA_DECIDIDO ?? []) exige(Array.isArray(lei) && lei.length === 3 && lei.every(texto), 'JA_DECIDIDO: cada lei é [data, lei, origem]')
  if (falhas.length) sair(falhas.map(f => `FALHA  ${f}`))
}

// ── Composição com os componentes do kit ──
const nome = (cfg, i) => `${cfg.PREFIXO}${String(i + 1).padStart(2, '0')}.dc.html`
const figura = fig => (/^\s*<(w-fig|d-cols)\b/.test(fig) ? fig : `<w-fig>${fig}</w-fig>`)
// A opção se chama "A · Sem teto"; a resposta no chat é número e letra: 2A.
const letra = o => o[0].charAt(0)
const letras = (n, opts) => opts.slice(0, -1).map(o => `${n}${letra(o)}`).join(', ') + ` ou ${n}${letra(opts.at(-1))}`
const tituloDe = (d, i) => `Decisão ${i + 1} · ${d.short}`

const board = (cfg, i, href) => {
  const D = cfg.DECISOES, d = D[i], n = i + 1, M = cfg.MAPA
  const ant = i > 0 ? ` prev="Anterior|${href(nome(cfg, i - 1))}"` : ''
  const topo = `<d-pager up="Mapa|${href(M.arquivo)}"${ant}${n < D.length ? ` next="Próxima|${href(nome(cfg, i + 1))}"` : ''}></d-pager>`
  const pe = `<d-pager label="Depois da resposta" up="Mapa|${href(M.arquivo)}"${ant} next="${n < D.length ? `Próxima decisão|${href(nome(cfg, i + 1))}` : `Voltar ao mapa|${href(M.arquivo)}`}"></d-pager>`
  const quadros = d.quadros.map(([titulo, frase, fig]) => `      <d-part title="${esc(titulo)}" wide>\n        <p>${frase}</p>\n        ${figura(fig)}\n      </d-part>`).join('\n')
  const linhas = d.opts.map(([rotulo, txt], k) => k === d.pick
    ? `<tr class="is-mark"><td>${rotulo} <w-chip tone="ink">Recomendada</w-chip></td><td data-th="O que faz">${txt}</td></tr>`
    : `<tr><td>${rotulo}</td><td data-th="O que faz">${txt}</td></tr>`).join('')
  return `<d-doc>
  ${topo}
  <d-cover kind="Decisão ${n} de ${D.length}" subject="${esc(KIND[d.kind])}" date="${esc(M.data)}">${d.q}</d-cover>
  <main>
    <d-steps>
${quadros}
      <d-part title="Sua resposta" wide>
        <table class="table"><thead><tr><th>Opção</th><th>O que faz</th></tr></thead><tbody>${linhas}</tbody></table>
        <d-note slot="fig" label="Responda no chat">${letras(n, d.opts)}.</d-note>
      </d-part>
    </d-steps>
  </main>
  ${pe}
  <d-foot left="${esc(M.olho)}" right="${esc(tituloDe(d, i))}"></d-foot>
</d-doc>`
}

const mapa = (cfg, href) => {
  const M = cfg.MAPA, D = cfg.DECISOES
  const [indice] = M.links ?? []
  const grupos = GRUPOS.map(([kind, titulo, sub]) => {
    const linhas = D.map((d, i) => [d, i]).filter(([d]) => d.kind === kind)
      .map(([d, i]) => `<tr><td><a href="${href(nome(cfg, i))}">${i + 1} · ${esc(d.short)}</a></td><td data-th="Recomendação">${d.rec}</td></tr>`).join('')
    return linhas ? `    <d-part title="${titulo}" wide>\n      <p>${sub}</p>\n      <table class="table"><thead><tr><th>Decisão</th><th>Recomendação</th></tr></thead><tbody>${linhas}</tbody></table>\n    </d-part>` : ''
  }).filter(Boolean).join('\n')
  const leis = cfg.JA_DECIDIDO?.length
    ? `    <d-part title="Já decidido" wide>\n      <p>Não volta à mesa.</p>\n      <table class="table"><thead><tr><th>Data</th><th>Lei</th><th>Origem</th></tr></thead><tbody>${cfg.JA_DECIDIDO.map(([data, lei, origem]) => `<tr><td>${data}</td><td data-th="Lei">${lei}</td><td data-th="Origem">${origem}</td></tr>`).join('')}</tbody></table>\n    </d-part>`
    : ''
  return `<d-doc>
  <d-pager${indice ? ` up="${esc(`${indice[0]}|${href(indice[1])}`)}"` : ''} next="Começar|${href(nome(cfg, 0))}"></d-pager>
  <d-cover kind="Decidir" subject="${esc(M.olho)}" date="${esc(M.data)}" sub="${D.length} ${D.length === 1 ? 'decisão' : 'decisões'} na mesa, cada uma em um board.">${M.titulo}</d-cover>
  <main>
    <d-part title="Como decidir" wide>
      <ol>
        <li><b>Abra uma decisão.</b> Cada board conta a história em quadros: o que acontece, as saídas no mesmo caso e a sua resposta.</li>
        <li><b>Responda no chat.</b> Número e letra: <code>1A</code>, <code>2B</code>. Um grupo inteiro de uma vez: <code>3 a 5 A</code>.</li>
        <li><b>Depois.</b> ${M.depois}</li>
      </ol>
    </d-part>
${grupos}
${leis}
  </main>
  <d-foot left="${esc(M.olho)}" right="${esc(`Decisões · ${M.data}`)}"></d-foot>
</d-doc>`
}

// No artboard, {{ abre um buraco do runtime do canvas: texto do arquivo de decisões nunca o traz.
const semBuraco = (corpos, rotulos) => {
  const com = corpos.map((c, k) => (c.includes('{{') ? rotulos[k] : null)).filter(Boolean)
  if (com.length) sair(`FALHA  "{{" no texto de ${com.join(', ')}: o canvas lê como buraco. Reescreva sem chaves duplas.`)
}

// ── O artboard do canvas: a marcação pronta dentro de <x-dc> ──
const artboard = ({ titulo, corpo, w, h }) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${esc(titulo)}</title>
<script src="./support.js"></script>
<link rel="stylesheet" href="${PASTA_DS}/components/bundle.css">
</head>
<body>
<x-dc>
<helmet>
<style>body{margin:0;background:var(--color-paper)}</style>
</helmet>
${corpo}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":${w},"height":${h}}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
`

// ── Execução ──
const [arquivo, alvo, pastaHtml] = process.argv.slice(2)
if (!arquivo || !alvo || (alvo === '--html' && !pastaHtml)) uso()
if (!existsSync(resolve(arquivo))) sair(`Não achei o arquivo de decisões: ${resolve(arquivo)}`)
let modulo
try { modulo = await import(pathToFileURL(resolve(arquivo)).href) } catch (e) { sair(`O arquivo de decisões não carregou: ${e.message}`) }
const cfg = { PREFIXO: 'D', LARGURA: 1400, ALTURAS: {}, ...modulo }
validar(cfg)
const M = cfg.MAPA, P = cfg.PAGINA, D = cfg.DECISOES
const rotulos = ['o mapa', ...D.map((_, i) => `decisão ${i + 1}`)]

if (alvo === '--html') {
  // HTML do kit, um arquivo por board, com os links trocados para .html: para o check e para ler fora do canvas.
  const dest = resolve(pastaHtml)
  mkdirSync(dest, { recursive: true })
  const href = a => a.replace(/\.dc\.html$/, '.html')
  const titulos = [M.titulo, ...D.map(tituloDe)].map(esc)
  const corpos = [mapa(cfg, href), ...D.map((_, i) => board(cfg, i, href))]
  semBuraco(corpos, rotulos)
  const arquivos = [href(M.arquivo), ...D.map((_, i) => href(nome(cfg, i)))]
  arquivos.forEach((a, k) => writeFileSync(resolve(dest, a), documento({ titulo: titulos[k], corpo: corpos[k] })))
  console.log(`ok: mapa e ${D.length} ${D.length === 1 ? 'decisão' : 'decisões'} em ${dest}\ncheck: node ${resolve(PLUGIN, 'scripts/check.mjs')} ${arquivos.map(a => resolve(dest, a)).join(' ')}`)
  process.exit(0)
}

const project = resolve(alvo)
const canvasPath = resolve(project, 'canvas.json')
if (!existsSync(canvasPath)) sair(`Não achei ${canvasPath}: aponte para a pasta project/ do canvas.`)
let canvas
try { canvas = JSON.parse(readFileSync(canvasPath, 'utf8')) } catch (e) { sair(`canvas.json não é JSON válido: ${e.message}`) }
if (!(canvas.designSystems ?? []).some(s => String(s.namespace).toLowerCase() === 'hd')) {
  sair('canvas.json sem o design system HTML Didático (namespace hd) em designSystems: instale antes, como em canvas.md, ao lado deste motor.')
}
const boards = canvas.boards ?? (canvas.boards = {})
const ehDestaPagina = k => k.startsWith(cfg.PREFIXO) && /^\d{2}\.dc\.html$/.test(k.slice(cfg.PREFIXO.length))
const novos = [M.arquivo, ...D.map((_, i) => nome(cfg, i))]

// Um nome que já é de outra página, ou um arquivo sem entrada no canvas, não é deste motor: ele não sobrescreve.
const alheios = novos.filter(f => (boards[f] && boards[f].page !== P.id) || (!boards[f] && existsSync(resolve(project, f))))
if (alheios.length) sair(`FALHA  ${alheios.join(', ')} já existe e não é da página ${P.id}. Use outro PREFIXO ou outro MAPA.arquivo.`)

const css = resolve(project, PASTA_DS, 'components/bundle.css')
if (!existsSync(css)) console.warn(`AVISO  ${PASTA_DS}/components/bundle.css não está nesta cópia local; confira no canvas que a cópia do design system tem os componentes usados.`)
else if (!readFileSync(css, 'utf8').includes('.d-pager')) console.warn(`AVISO  a cópia de ${PASTA_DS}/components/bundle.css é anterior ao d-pager: atualize-a (canvas.md).`)

const corpos = [mapa(cfg, a => a), ...D.map((_, i) => board(cfg, i, a => a))]
semBuraco(corpos, rotulos)
let estaticos
try { estaticos = await preRenderizar(corpos) } catch (e) { sair(`FALHA  ${e.message.split('\n')[0].replace(/^page\.evaluate: Error: /, '')}`) }

const W = cfg.LARGURA
const hMapa = cfg.ALTURAS.mapa ?? 2200
writeFileSync(resolve(project, M.arquivo), artboard({ titulo: M.titulo, corpo: estaticos[0], w: W, h: hMapa }))
const escritos = D.map((d, i) => {
  const f = nome(cfg, i), h = cfg.ALTURAS[f.replace('.dc.html', '')] ?? 3000
  writeFileSync(resolve(project, f), artboard({ titulo: tituloDe(d, i), corpo: estaticos[i + 1], w: W, h }))
  return [f, tituloDe(d, i), h]
})

// canvas.json: só as entradas desta página mudam, e o bloco fica onde estava na ordem; o resto do canvas fica como está.
const velhos = Object.keys(boards).filter(k => boards[k].page === P.id && ehDestaPagina(k) && !novos.includes(k))
for (const k of velhos) delete boards[k]
boards[M.arquivo] = { ...(boards[M.arquivo] ?? {}), expand: 'fill', h: hMapa, page: P.id, title: M.titulo_canvas ?? M.titulo, w: W, x: 0, y: 0 }
escritos.forEach(([f, titulo, h], i) => { boards[f] = { ...(boards[f] ?? {}), expand: 'fill', h, page: P.id, title: titulo, w: W, x: (W + 120) * (i + 1), y: 0 } })
const ordem = canvas.order ?? []
const lugar = ordem.findIndex(o => novos.includes(o) || velhos.includes(o))
const resto = ordem.filter(o => !novos.includes(o) && !velhos.includes(o))
const antes = lugar < 0 ? resto.length : ordem.slice(0, lugar).filter(o => resto.includes(o)).length
canvas.order = [...resto.slice(0, antes), ...novos, ...resto.slice(antes)]
canvas.pages ??= []
if (!canvas.pages.some(p => p.id === P.id)) {
  const ids = canvas.pages.map(p => p.id), at = ids.includes(P.depois_de) ? ids.indexOf(P.depois_de) + 1 : ids.length
  canvas.pages.splice(at, 0, { id: P.id, name: P.nome })
}
writeFileSync(canvasPath, JSON.stringify(canvas, null, 2) + '\n')
console.log(`ok: mapa e ${escritos.length} ${escritos.length === 1 ? 'decisão' : 'decisões'} em ${project}`)
console.log('publicar:', ['project/canvas.json', ...novos.map(f => `project/${f}`)].join(', '))
if (velhos.length) console.log('remover no publish (null):', velhos.map(f => `project/${f}`).join(', '))
