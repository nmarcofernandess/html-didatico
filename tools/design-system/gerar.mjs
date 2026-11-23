// Gera os arquivos do design system "HTML Didático" a partir do kit: tokens.json, bundle.css, bundle.js,
// um cartão por componente (lido do registro de kit.js), ícones, README e capa.
// Uso: node tools/design-system/gerar.mjs [pasta de saída]   (padrão: tools/design-system/saida)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { KIT_CSS, KIT_JS, SPRITE, REFS, ROOT, COMENTARIO, ICONES, HD, px, esc } from './kit.mjs'

const RAIZ = path.resolve(process.argv[2] ?? fileURLToPath(new URL('./saida', import.meta.url))) + '/'
const OUT = RAIZ + 'project/'
const COMMIT = (() => { try { return execSync('git rev-parse --short HEAD', { cwd: REFS, encoding: 'utf8' }).trim() } catch { return 'sem-git' } })()
const HOJE = new Date().toISOString().slice(0, 10)
const put = (p, t) => { fs.mkdirSync(path.dirname(OUT + p), { recursive: true }); fs.writeFileSync(OUT + p, t) }
const frase = s => s ? s[0].toUpperCase() + s.slice(1) + (/[.!?]$/.test(s) ? '' : '.') : ''
const TEMA = 'light'

// ── tokens.json ─────────────────────────────────────────────────────────────
const token = k => ROOT[k]
const COMPAT = k => /^--(color-accent|line-strong|edge|font-label)/.test(k)  // nomes da 3.x: só apontam para os atuais
const hex8 = v => {
  const m = v.match(/^rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)$/)
  if (!m) return v
  const h = n => Math.round(+n).toString(16).padStart(2, '0')
  return '#' + h(m[1]) + h(m[2]) + h(m[3]) + h(+m[4] * 255)
}
const cor = v => /^var\(--([\w-]+)\)$/.test(v) ? `{${v.slice(6, -1)}}` : hex8(v)
const USO_COR = {
  paper: 'Fundo da página.', 'paper-2': 'Poço: código, caminho, linha selecionada, aviso neutro.', surface: 'Preenchimento do wireframe: janela, campo, botão.', fig: 'Chão da figura, a prancheta.', dot: 'Pontos da grade da prancheta.',
  ink: 'Tinta: desenha o produto, os títulos e os fios fortes.', 'ink-2': 'Texto corrido.', 'ink-3': 'Metadado sobre paper e surface.', rule: 'Fio fino entre linhas e partes.', wire: 'Contorno do que é contexto na cena.', fill: 'Barra no lugar de palavra.',
  'on-ink': 'Texto sobre a faixa de tinta.', 'on-ink-2': 'Texto secundário sobre a faixa de tinta.',
  mark: 'A caneta: marca o assunto, numera, chama a atenção e carimba. Nenhum outro uso.', 'mark-ink': 'Texto magenta sobre papel.', 'mark-soft': 'Marca-texto: tinta preta por cima.', 'on-mark': 'Texto sobre magenta.',
  ok: 'Status ok, sempre com rótulo ou ícone.', 'ok-soft': 'Fundo de chip, linha e aviso ok.', warn: 'Status de atenção, sempre com rótulo ou ícone.', 'warn-soft': 'Fundo de chip, linha e aviso de atenção.', err: 'Status de erro, sempre com rótulo ou ícone.', 'err-soft': 'Fundo de chip, linha e aviso de erro.',
}
const usoDe = (k, mapa = {}) => mapa[k.replace(/^--(color-)?/, '')] ?? (COMENTARIO[k] ? frase(COMENTARIO[k]) : (() => { throw new Error('token sem descrição: ' + k) })())
const cores = Object.keys(ROOT).filter(k => k.startsWith('--color-') && !COMPAT(k)).map(k => ({ name: k.slice(2), value: { [TEMA]: cor(token(k)) }, usage: usoDe(k, USO_COR) }))
const comp = k => /^[\d.]+(px|rem)$/.test(token(k)) ? token(k) : px(k) + 'px'
const espaco = Object.keys(ROOT).filter(k => /^--(s-\d|gap-|inset-|gutter)/.test(k)).map(k => ({ name: k.slice(2), value: comp(k), usage: /^--s-/.test(k) ? 'Passo da escala de base 4. Use pelo papel, não direto.' : `${usoDe(k)} Aponta para ${token(k).match(/--s-\d/)[0].slice(2)}.` }))
const raio = [['--radius-s', 'Chip pequeno, botão, campo.'], ['--radius-m', 'Janela, figura, menu.'], ['--radius-pill', 'Chip, pino e avatar: totalmente redondo.']].map(([k, usage]) => ({ name: k.slice(2), value: token(k), usage }))
const USO_MEDIDA = { line: 'Fio fino: separa linhas e contorna a cena.', 'line-mid': 'Fio médio: separa a capa, a figura e o cabeçalho da tabela.', 'line-heavy': 'Fio grosso: abre e fecha o rótulo.', 'line-wire': 'Traço do assunto e do foco dentro da cena.', measure: 'Largura máxima da prosa.', page: 'Largura do conteúdo.', 'scene-min': 'Altura mínima da cena.' }
const medida = Object.keys(USO_MEDIDA).map(k => ({ name: k, value: token('--' + k), usage: USO_MEDIDA[k] }))
const pilha = s => s.replace(/'/g, '"')
// Altura de linha e peso de cada papel são os que as regras do kit.css escrevem para a peça que o usa.
const estilo = (name, tk, lineHeight, fontWeight, usage, sample, extra = {}) => ({ name, fontSize: /clamp/.test(token(tk)) ? token(tk).match(/,\s*([\d.]+rem)\)$/)[1] : token(tk), lineHeight, fontWeight, usage: usage + (/clamp/.test(token(tk)) ? ` No kit: ${token(tk).replace(/[()]/g, ' ').trim()}.` : ''), sample, ...extra })
const cond = ' Face condensada (font-stretch: condensed).'
const tokens = {
  name: 'HTML Didático', version: 2,
  meta: { source: 'github', repo: 'nmarcofernandess/html-didatico', ref: 'main@' + COMMIT, package: 'plugins/html-didatico', paths: { tokens: ['references/kit/kit.css'], assets: ['references/kit/sprite.svg'], docs: ['references/visual/design.md', 'references/kit/componentes.md'] }, synced: HOJE },
  color: { themes: [{ id: TEMA, name: 'Rótulo' }], tokens: cores },
  type: {
    fonts: [],
    families: { display: pilha(token('--font-display')), body: pilha(token('--font-body')), mono: pilha(token('--font-mono')) },
    groups: [
      { name: 'Página', family: 'body', styles: [
        estilo('text-display', '--text-display', 0.92, +token('--display-weight'), 'Título da capa. Um por documento, em preto condensado.' + cond, 'Primeira escala', { family: 'display' }),
        estilo('text-card', '--text-card', 0.95, +token('--display-weight'), 'A pergunta de um cartão, no lugar do título da capa.' + cond, 'Que data vale num Cálculo retroativo?', { family: 'display' }),
        estilo('text-numeral', '--text-numeral', 0.8, +token('--display-weight'), 'Número do passo.' + cond, '01', { family: 'display' }),
        estilo('text-title', '--text-title', 1.05, +token('--title-weight'), 'Título de parte.' + cond, 'Duplicar para editar', { family: 'display' }),
        estilo('text-subtitle', '--text-subtitle', 1.25, 700, 'Subtítulo dentro da parte.', 'Do Sistema para Meu cadastro'),
        estilo('text-lead', '--text-lead', 1.5, 400, 'A frase da capa: o que o leitor sabe fazer no fim.', 'Quem lê sai sabendo copiar um item do Sistema para Meu cadastro.'),
        estilo('text-body', '--text-body', 1.6, 400, 'Texto corrido, até 62 caracteres por linha.', 'A cópia fica disponível para edição.'),
        estilo('text-small', '--text-small', 1.5, 400, 'Caminho, tabela, aviso, legenda de figura.', 'Onde: Cadastrados, Sistema, Duplicar para editar'),
        estilo('text-micro', '--text-micro', 1.4, 400, 'Plaqueta e pé do documento. Nada no sistema fica abaixo deste tamanho.', 'Rev. 1.10, 2026'),
        estilo('text-mono', '--text-small', 1.5, 400, 'Código, comando digitado, identificador e número medido.', 'node scripts/check.mjs cartao.html', { family: 'mono' }),
      ] },
      { name: 'Cena', family: 'body', styles: [
        estilo('ui-text', '--ui-text', 1.35, 400, 'Nome e valor dentro da cena.', 'Duplicar para editar'),
        estilo('ui-meta', '--ui-meta', 1.4, 400, 'Metadado dentro da cena.', 'Sistema'),
      ] },
    ],
  },
  spacing: { tokens: espaco }, radius: { tokens: raio },
  size: { note: 'Fios e medidas do documento.', tokens: medida },
}
put('tokens.json', JSON.stringify(tokens, null, 1))

// ── bundle.css e bundle.js: o kit, sem acréscimo ────────────────────────────
put('components/bundle.css', KIT_CSS)
// O bundle entra no preview como classic script: o que fecharia a tag é quebrado.
put('components/bundle.js', KIT_JS.replace(/<\/script/gi, '<\\/script'))

// ── cartões de componente, lidos do registro ────────────────────────────────
const exemplo = {
  'd-doc': `<d-doc><d-cover kind="Cartão" subject="DietFlow · Cálculo" date="22/11/2026">Que data vale?</d-cover><main><d-part title="A data do Cálculo"><p>Vale a data clínica, não a de hoje.</p></d-part></main><d-foot left="DietFlow · Cálculo" right="22/11/2026"></d-foot></d-doc>`,
  'd-part': `<d-part title="Setor com horário"><p>Crie o setor onde a escala vai viver.</p><d-path>Setores › Novo Setor</d-path><w-fig cap="O setor com horário e regime"><w-win title="Novo Setor"><w-field label="Nome" value="Padaria"></w-field><w-seg options="5x2|6x1" on="6x1"></w-seg></w-win></w-fig></d-part>`,
  'd-steps': `<d-steps><d-part title="Empresa"><p>Cadastre a empresa.</p></d-part><d-part title="Setor"><p>Crie o setor e defina o regime.</p></d-part></d-steps>`,
  'd-tabs': `<d-tabs><d-tab label="Produto"><d-part title="O que a pessoa faz"><p>Abre o cadastro e duplica o item.</p></d-part></d-tab><d-tab label="Arquitetura"><d-part title="Onde mora"><p>Cada tela lê do mesmo cadastro.</p></d-part></d-tab></d-tabs>`,
  'd-cols': `<d-cols n="2"><w-fig cap="Antes"><w-win title="Cadastrados"><w-text lines="2"></w-text></w-win></w-fig><w-fig cap="Depois"><w-win title="Cadastrados"><w-field label="Nome" value="Padaria" mark></w-field></w-win></w-fig></d-cols>`,
  'd-band': `<d-band title="Fale com o assistente"><p>O assistente faz cada passo por conversa.</p><code slot="aside">Crie o setor Padaria, 6x1, das 6h às 22h</code></d-band>`,
  'w-fig': `<w-fig cap="A moldura numera a legenda sozinha"><w-win title="Cadastrados"><w-field label="Nome" value="Padaria"></w-field></w-win></w-fig>`,
}
// Peças que só existem dentro de outra: entram no cartão da peça-mãe.
const JUNTA = { 'd-tabs': ['d-tab'], 'w-item': ['w-list'], 'w-flow': ['w-node'], 'w-bars': ['w-val'], 'w-matrix': ['w-cell'], 'w-files': ['w-file'], 'w-layers': ['w-layer'], 'w-timeline': ['w-when'], 'w-line': ['w-pt'] }
const filha = new Set(Object.values(JUNTA).flat())
const GRUPOS_VALIDOS = ['Documento', 'Tela', 'Caneta', 'Esquema']
// Altura de cada cartão, medida numa renderização de 960px de largura. Ao criar um componente, estime; o cartão cresce para caber.
const ALT = {"Cover":288,"d-band":344,"d-check":192,"d-closing":372,"d-cols":306,"d-cover":400,"d-doc":676,"d-foot":150,"d-note":120,"d-part":426,"d-path":80,"d-src":70,"d-steps":576,"d-tabs":294,"w-fig":288,"w-line":300,"w-shot":640}
const tabela = props => {
  const l = Object.entries(props)
  return l.length ? `| Prop | O que faz |\n|---|---|\n${l.map(([k, v]) => `| \`${k}\` | ${String(v).replace(/\|/g, '\\|')} |`).join('\n')}\n` : 'Sem props.\n'
}
// Quem usa fornece: o que o kit.js documenta de cada peça, em ordem de leitura.
const leitura = c => `${c.doc}\n\n## Props\n\n${tabela(c.props)}`
const comAmbiente = (tag, html) => /^w-/.test(tag) && tag !== 'w-fig' ? `<w-fig>${html}</w-fig>` : html
const cartoes = []
for (const [tag, c] of Object.entries(HD.componentes)) {
  if (filha.has(tag)) continue
  if (!GRUPOS_VALIDOS.includes(c.grupo)) throw new Error('grupo fora do contrato: ' + tag + ' ' + c.grupo)
  const ex = c.ex ?? exemplo[tag]
  if (!ex) throw new Error('componente sem exemplo: ' + tag)
  const partes = [leitura(c)]
  for (const f of JUNTA[tag] ?? []) { const cf = HD.componentes[f]; partes.push(`### \`<${f}>\`\n\n${cf.doc}\n\n${tabela(cf.props)}`) }
  cartoes.push(tag)
  put(`components/${tag}/preview.html`, `<!-- @dsCard group="${c.grupo}" height=${ALT[tag] ?? 260} -->
<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>${tag}</title><style>body { padding: var(--s-5); }</style></head>
<body>
${SPRITE}
${comAmbiente(tag, ex)}
</body>
</html>
`)
  put(`components/${tag}/README.md`, `# \`<${tag}>\`\n\n${partes.join('\n')}\n## Exemplo\n\n\`\`\`html\n${ex}\n\`\`\`\n\n${/^w-/.test(tag) ? 'Valem em qualquer `w-*`: `mark`, `pin` e `click`. ' : ''}O \`bundle.js\` troca a tag pela marcação do componente ao carregar; o \`bundle.css\` a veste.\n`)
}

// ── ícones: um SVG por símbolo do sprite ────────────────────────────────────
fs.mkdirSync(RAIZ + 'icons', { recursive: true })
const icones = Object.entries(ICONES).map(([id, i]) => { const f = id.slice(2) + '.svg'; fs.writeFileSync(RAIZ + 'icons/' + f, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${i.vb}"><path d="${i.d}"/></svg>\n`); return f })
put('assets/Icons/README.md', `# Ícones\n\n${icones.length} ícones Phosphor (licença MIT), os mesmos do \`sprite.svg\` do kit. Uma tinta só: nos documentos o ícone herda a cor do texto pela classe \`ico\`; aqui aparecem em preto.\n\nUm tamanho por cena, cor única, sempre do sprite. O cursor é o \`cursor-fill\`, pousado sobre o alvo.\n`)
fs.writeFileSync(RAIZ + 'icones.json', JSON.stringify(icones))

// ── README ──────────────────────────────────────────────────────────────────
const porGrupo = Object.fromEntries(GRUPOS_VALIDOS.map(g => [g, cartoes.filter(t => HD.componentes[t].grupo === g)]))
put('README.md', `# HTML Didático

Um rótulo nutricional desenhado a caneta. A página tem a moldura de um rótulo: fio grosso abre e fecha, fio médio separa, fio fino separa linhas, e o título é uma grotesca condensada preta. Dentro da figura, a **tinta preta desenha o produto** em wireframe; **magenta é a caneta de quem explica**: marca o dado de que a parte fala, numera, chama a atenção e carimba. O magenta não tem outro uso.

São documentos de página única que alguém lê uma vez e sai sabendo explicar: o texto diz como a coisa é; a figura mostra o que se vê e como as partes se ligam.

## Como usar

Há um sistema só, sem variações de aparência: os mesmos tokens, a mesma família tipográfica (Helvetica Neue, em duas larguras) e uma biblioteca de componentes.

- \`components/bundle.css\` é o \`kit.css\` do plugin: os tokens em \`:root\` e a aparência de cada componente.
- \`components/bundle.js\` é o \`kit.js\`: ao carregar, troca cada tag pela marcação do componente. Escreva \`<w-field label="Peso" value="62 kg">\` e o kit monta o campo.
- Os componentes \`d-*\` montam o **documento**: capa, partes, abas, avisos, fecho. Os \`w-*\` desenham a **figura**: wireframe do produto (tela), esquema e blueprint, mais a caneta.
- O estado fica em atributos (\`mark\`, \`on\`, \`tone\`); a aparência fica nas classes. Cada componente tem seu cartão, com as props e um exemplo.

## Componentes

${GRUPOS_VALIDOS.map(g => `- **${g}** (${porGrupo[g].length}): ${porGrupo[g].map(t => '\`' + t + '\`').join(', ')}.`).join('\n')}

## Conteúdo

- Comece pela coisa que a pessoa precisa entender. Use o mesmo nome do começo ao fim, o nome que está na tela.
- Toda palavra específica vem da fonte. O que a fonte não dá fica fora do documento ou aparece em barra.
- Diga a regra pelo lado em que funciona. Corte o anúncio do que vem, a frase que repete o título e o adjetivo que não informa.
- Uma parte tem um assunto, um título que o nomeia e, quando ajuda, uma figura.
- Teste de uma leitura: quem nunca viu o assunto lê uma vez e explica com as mesmas palavras.

## Fundamentos visuais

- **Foco.** Uma ideia por tela. Em cada figura um objeto lidera.
- **Espaço.** Escolha pelo papel, nunca pelo número: \`gap-tied\` e \`gap-inside\` dentro do item, \`gap-pieces\` entre peças, \`gap-text\` entre parágrafos, \`gap-block\` entre blocos da mesma parte, \`gap-figure\` entre texto e figura, \`gap-part\` entre partes, \`gap-break\` na quebra. Os únicos valores são os da escala \`s-1\` a \`s-9\`.
- **Tipo.** Nada abaixo de \`text-micro\` (12px). Título em condensada preta; o resto em Helvetica Neue regular e negrito.
- **Fios.** \`line-heavy\` abre e fecha, \`line-mid\` separa seções, \`line\` separa linhas, \`line-wire\` é o traço do assunto na cena.
- **Cor.** Neutros sem matiz; o único matiz da página é o magenta (\`color-mark\`). \`color-ok\`, \`color-warn\` e \`color-err\` significam status e vêm com rótulo ou ícone.
- **Conteúdo real.** De 3 a 7 palavras reais por cena, no assunto; o resto em barra (\`color-fill\`).
- **Movimento.** O documento é parado.

## Ícones

Phosphor, licença MIT, em \`assets/Icons\`. Um tamanho por cena, cor única. O sprite vem embutido em cada cartão de componente.

## O que não veio do código

- \`--color-dot\` é um preto com transparência no kit; aqui está como hexadecimal com alfa.
- \`--text-display\` e \`--text-card\` são fluidos no kit; aqui está o valor máximo.
- A face condensada vem de \`font-stretch: condensed\`, que o formato de tokens não guarda; a pilha de fontes é a do kit. As famílias são do sistema (Helvetica Neue, Arial Narrow, SF Mono); não há arquivo de fonte.
- Os nomes de compatibilidade da versão 3 (\`color-accent*\`, \`line-strong\`, \`edge\`, \`font-label\`) só apontam para os tokens atuais e ficam apenas no \`bundle.css\`.
- Origem: \`nmarcofernandess/html-didatico\`, commit \`${COMMIT}\`, arquivos \`plugins/html-didatico/references/kit/kit.css\` e \`kit.js\`. Gerado por \`tools/design-system/gerar.mjs\`.
`)
put('Design.md', fs.readFileSync(REFS + 'visual/design.md', 'utf8'))
put('Componentes.md', fs.readFileSync(REFS + 'kit/componentes.md', 'utf8'))
put('Conteudo.md', fs.readFileSync(REFS + 'conteudo.md', 'utf8'))

// ── capa: o rótulo e a caneta, feitos com os próprios componentes ───────────
put('components/Cover/preview.html', `<!-- @dsCard height=288 -->
<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>HTML Didático</title>
<style>
body { margin: 0; background: var(--color-paper); }
.cover-art { position: relative; display: grid; grid-template-columns: 1fr 360px; gap: var(--s-7); align-items: stretch; width: 960px; height: 288px; padding: var(--s-5) var(--s-7); overflow: hidden; background-image: radial-gradient(var(--color-dot) 1px, transparent 1px); background-size: var(--s-5) var(--s-5); }
.rotulo { align-self: stretch; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 0 var(--s-2); border-top: var(--line-heavy) solid var(--color-ink); }
.rotulo .kind { align-self: flex-start; margin-bottom: var(--s-3); padding: var(--s-1) var(--s-2); background: var(--color-ink); color: var(--color-on-ink); font: var(--title-weight) var(--text-small)/1 var(--font-display); font-stretch: var(--display-stretch); }
.name { font-family: var(--font-display); font-stretch: var(--display-stretch); font-weight: var(--display-weight); font-size: 72px; line-height: 0.92; letter-spacing: -0.012em; color: var(--color-ink); }
.tag { margin-top: var(--s-3); padding-top: var(--s-2); border-top: var(--line-mid) solid var(--color-ink); max-width: 30rem; font: 400 var(--text-small)/1.4 var(--font-body); color: var(--color-ink-2); }
.cena { align-self: center; }
.cena .fig__stage { padding: var(--s-4); }
</style></head>
<body>
${SPRITE}
<div class="cover-art">
<div class="rotulo"><span class="kind">Design system</span><div class="name">HTML<br>Didático</div><div class="tag">Documentos que alguém lê uma vez e sai sabendo explicar.</div></div>
<div class="cena"><w-fig><w-win title="Rótulo"><w-field label="Tinta" value="desenha o produto"></w-field><w-field label="Caneta" value="explica" mark pin="1"></w-field></w-win></w-fig></div>
</div>
</body>
</html>
`)
console.log('saída em', RAIZ)
console.log('tokens:', cores.length, 'cores,', espaco.length, 'espaços,', raio.length, 'raios,', medida.length, 'medidas,', tokens.type.groups.reduce((n, g) => n + g.styles.length, 0), 'estilos;', cartoes.length, 'cartões de componente +1 capa;', icones.length, 'ícones')
