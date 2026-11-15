// Gera os arquivos do design system "HTML Didático" a partir do kit.css: tokens.json, bundle.css, componentes, ícones, README e capa.
// Uso: node tools/design-system/gerar.mjs [pasta de saída]   (padrão: tools/design-system/saida)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { KIT_CSS, REFS, BASE, MANUAL, EDITORIAL, ICONES, ico, cursor, bar, px } from './kit.mjs'
import { cenaAcao, copia, origem, quieta, fluxo } from './caso.mjs'

const RAIZ = path.resolve(process.argv[2] ?? fileURLToPath(new URL('./saida', import.meta.url))) + '/'
const OUT = RAIZ + 'project/'
const COMMIT = (() => { try { return execSync('git rev-parse --short HEAD', { cwd: REFS, encoding: 'utf8' }).trim() } catch { return 'sem-git' } })()
const HOJE = new Date().toISOString().slice(0, 10)
const put = (p, t) => { fs.mkdirSync(path.dirname(OUT + p), { recursive: true }); fs.writeFileSync(OUT + p, t) }

// ── tokens.json ─────────────────────────────────────────────────────────────
const comentario = Object.fromEntries([...KIT_CSS.matchAll(/(--[\w-]+):\s*[^;]+;\s*\/\*\s*(.*?)\s*\*\//g)].map(m => [m[1], m[2]]))
const frase = s => s ? s[0].toUpperCase() + s.slice(1) + (/[.!?]$/.test(s) ? '' : '.') : ''
const USO_COR = {
  paper: 'Fundo da página.', 'paper-2': 'Poço: caminho, código, linha ativa, aviso neutro.', surface: 'Superfície das peças de cena: janela, campo, botão.', fig: 'Fundo da figura.', grid: 'Linhas da grade no fundo da figura, só no look manual. No editorial o kit usa transparent, aqui escrito como preto com alfa zero.',
  ink: 'Títulos, valores e a tinta forte do assunto.', 'ink-2': 'Texto corrido. Também o metadado sobre fundo tingido.', 'ink-3': 'Metadado sobre paper e surface.', 'on-ink-2': 'Texto secundário sobre a faixa de tinta.',
  rule: 'Fio entre partes e entre linhas.', fill: 'Barra de enchimento, no lugar das palavras que a história não usa.', press: 'Botão pressionado.',
  accent: 'Sinal: o botão principal, a opção escolhida, o carimbo. Menos de 5% da tela.', 'accent-ink': 'Texto sobre accent.', 'accent-soft': 'Fundo da barra em destaque nas quantidades.', 'accent-on-ink': 'Acento sobre a faixa de tinta: o contador da conferência.',
  ok: 'Status ok, sempre com rótulo ou ícone.', 'ok-soft': 'Fundo de chip, linha e aviso ok.', warn: 'Status de atenção, sempre com rótulo ou ícone.', 'warn-soft': 'Fundo de chip, linha e aviso de atenção.', err: 'Status de erro, sempre com rótulo ou ícone.', 'err-soft': 'Fundo de chip, linha e aviso de erro.',
}
const pulados = []
const semT = v => v === 'transparent' ? '#00000000' : v
// Altura de cada cartão, medida numa renderização de 960px de largura. Ao criar um componente, estime; o cartão cresce para caber.
const ALT = {"Abas": 260, "Arquivos": 308, "Arvore": 208, "Aviso": 428, "Barras": 308, "Botao": 300, "Camadas": 300, "Campo": 500, "Capa": 404, "Chip": 300, "Codigo": 300, "Conferencia": 356, "Faixa": 268, "Fecho": 472, "Figura": 408, "Fluxo": 300, "Janela": 300, "Ligacao": 300, "Linha": 468, "LinhaDoTempo": 300, "Matriz": 372, "Mensagem": 416, "Numero": 300, "Parte": 468, "Tabela": 268, "Terminal": 300, "Trilho": 120}
const cores = Object.keys(MANUAL).filter(k => k.startsWith('--color-')).map(k => ({ name: k.slice(2), value: { manual: semT(MANUAL[k]), editorial: semT(EDITORIAL[k] ?? MANUAL[k]) }, usage: USO_COR[k.slice(8)] }))
cores.push({ name: 'edge', value: { manual: '{color-rule}', editorial: '{color-rule}' }, usage: 'Borda das peças de cena.' })
cores.push({ name: 'frame', value: { manual: '{color-ink}', editorial: '#00000000' }, usage: 'Moldura da figura. No kit o look editorial usa transparent; aqui está como preto com alfa zero, que é o mesmo resultado.' })
pulados.push('`--fig-ground` (o fundo em grade da figura é um gradiente, não uma cor): fica só no bundle.css')
const comp = k => /^[\d.]+(px|rem)$/.test(BASE[k]) ? BASE[k] : px(k) + 'px'
const espaco = Object.keys(BASE).filter(k => /^--(s-\d|gap|inset|gutter)/.test(k)).map(k => ({ name: k.slice(2), value: comp(k), usage: /^--s-/.test(k) ? `Passo da escala de base 4. Use pelo papel, não direto.` : `${frase(comentario[k])} Aponta para ${BASE[k].match(/--s-\d/)[0].slice(2)}.` }))
const raio = ['--radius-s', '--radius-m'].map(k => ({ name: k.slice(2), value: MANUAL[k], usage: `${k === '--radius-s' ? 'Chip, botão, campo.' : 'Janela, figura, menu, aviso.'} No look editorial vale ${EDITORIAL[k]}; o bundle.css troca pelo tema.` }))
const sombra = ['--shadow-surface', '--shadow-float'].map(k => ({ name: k.slice(2), value: { manual: MANUAL[k], editorial: EDITORIAL[k] }, usage: k === '--shadow-surface' ? 'Superfície da cena. O look manual separa com fio e não usa sombra.' : 'O que flutua: toast, menu, janela sobreposta. Borda ou sombra, uma das duas.' }))
const medida = [['--line', 'Fio.'], ['--line-strong', 'Fio forte: base da capa, borda da faixa.'], ['--measure', 'Largura máxima da prosa.'], ['--page', 'Largura do conteúdo.'], ['--scene-min', 'Altura mínima da cena.']].map(([k, u]) => ({ name: k.slice(2), value: BASE[k], usage: u }))
const pilha = s => s.replace(/'/g, '"')
const estilo = (name, tk, lineHeight, fontWeight, usage, sample, extra = {}) => ({ name, fontSize: /clamp/.test(BASE[tk]) ? BASE[tk].match(/,\s*([\d.]+rem)\)$/)[1] : BASE[tk], lineHeight, fontWeight, usage: usage + (/clamp/.test(BASE[tk]) ? ` No kit: ${BASE[tk].replace(/[()]/g, ' ').trim()}.` : ''), sample, ...extra })
// A altura de linha e o peso de cada papel são os que as regras do kit.css escrevem para a peça que usa o papel.
const lh = (sel, prop = 'line-height') => { const m = KIT_CSS.match(new RegExp(sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{[^}]*?' + prop + ':\\s*([^;]+);')); if (!m) throw new Error('sem ' + prop + ' em ' + sel); return isNaN(+m[1]) ? m[1].trim() : +m[1] }
const tokens = {
  name: 'HTML Didático', version: 1,
  meta: { source: 'github', repo: 'nmarcofernandess/html-didatico', ref: 'main@' + COMMIT, package: 'plugins/html-didatico', paths: { tokens: ['references/kit/kit.css'], assets: ['references/kit/sprite.svg'], docs: ['references/visual/design.md', 'references/conteudo.md'] }, synced: HOJE },
  color: { themes: [{ id: 'manual', name: 'Manual' }, { id: 'editorial', name: 'Editorial' }], tokens: cores },
  type: {
    fonts: [],
    families: { display: pilha(MANUAL['--font-display']), body: pilha(MANUAL['--font-body']), label: pilha(MANUAL['--font-label']), mono: pilha(MANUAL['--font-mono']), 'display-editorial': pilha(EDITORIAL['--font-display']), 'body-editorial': pilha(EDITORIAL['--font-body']) },
    groups: [
      { name: 'Página, look manual', family: 'body', styles: [
        estilo('text-display', '--text-display', 0.95, +MANUAL['--display-weight'], 'Título da capa. Um por documento.', 'Primeira escala', { family: 'display' }),
        estilo('text-numeral', '--text-numeral', 1, +MANUAL['--display-weight'], 'Número do passo, em contorno.', '01', { family: 'display' }),
        estilo('text-title', '--text-title', 1.15, +MANUAL['--display-weight'], 'Título de parte.', 'Duplicar para editar', { family: 'display' }),
        estilo('text-subtitle', '--text-subtitle', 1.25, +MANUAL['--display-weight'], 'Subtítulo dentro da parte.', 'Do Sistema para Meu cadastro', { family: 'display' }),
        estilo('text-lead', '--text-lead', 1.5, 400, 'A frase da capa: o que o leitor sabe fazer no fim.', 'Quem lê sai sabendo copiar um item do Sistema para Meu cadastro.'),
        estilo('text-body', '--text-body', 1.6, 400, 'Texto corrido, até 62 caracteres por linha.', 'A cópia fica disponível para edição.'),
        estilo('text-small', '--text-small', 1.5, 400, 'Caminho, tabela, aviso.', 'Onde: Cadastrados, Sistema, Duplicar para editar'),
        estilo('text-micro', '--text-micro', 1.4, 400, 'Plaqueta, legenda de figura, rodapé. Nada no sistema fica abaixo deste tamanho.', 'Fig. 1 A linha do Sistema', { family: 'label' }),
        estilo('text-mono', '--text-small', 1.5, 400, 'Código, comando digitado, identificador e número medido.', 'node scripts/check.mjs passo-a-passo.html', { family: 'mono' }),
      ] },
      { name: 'Cena', family: 'body', styles: [
        estilo('ui-text', '--ui-text', 1.35, 400, 'Nome e valor dentro da cena.', 'Duplicar para editar'),
        estilo('ui-meta', '--ui-meta', 1.35, 400, 'Metadado dentro da cena.', 'Sistema'),
      ] },
      { name: 'Título, look editorial', family: 'display-editorial', styles: [
        estilo('text-display-editorial', '--text-display', 0.95, +EDITORIAL['--display-weight'], 'Título da capa no look editorial: serifa, caixa de frase.', 'Como um HTML didático é feito'),
        estilo('text-title-editorial', '--text-title', 1.15, +EDITORIAL['--display-weight'], 'Título de parte no look editorial.', 'O espaço tem nome'),
      ] },
    ],
  },
  spacing: { tokens: espaco }, radius: { tokens: raio }, shadow: { tokens: sombra },
  size: { note: 'Fios e medidas do documento.', tokens: medida },
}
put('tokens.json', JSON.stringify(tokens, null, 1))

// ── bundle.css: o kit.css real, mais a ponte de tema ─────────────────────────
const sem = KIT_CSS.replace(/\/\*[\s\S]*?\*\//g, '')
const corpo = sel => { const i = sem.indexOf(sel); const a = sem.indexOf('{', i); return sem.slice(a + 1, sem.indexOf('}', a)).trim() }
put('components/bundle.css', KIT_CSS + `
/* Ponte de tema, gerada do próprio kit.css: o tema do design system (data-theme) liga o mesmo bloco de tokens que o look (data-look). */
[data-theme="manual"] {
  ${corpo('[data-look="manual"]')}
}
[data-theme="editorial"] {
  ${corpo('[data-look="editorial"] {')}
}
`)

// ── componentes ─────────────────────────────────────────────────────────────
const palco = (h, leg) => `<figure class="fig"><div class="fig__stage">${h}</div><figcaption>${leg}</figcaption></figure>`
const sangra = (h, leg) => `<figure class="fig"><div class="fig__stage fig__stage--bleed">${h}</div><figcaption>${leg}</figcaption></figure>`
const win = c => `<div class="win"><div class="win__body">${c}</div></div>`
const nota = (v, r, i, t) => `<aside class="note${v ? ' note--' + v : ''}"><b class="note__label">${i ? ico(i) : ''}${r}</b><p>${t}</p></aside>`
const C = [
  // Página
  ['Capa', 'Página', 340, `<header class="cover"><div class="plate"><span>Manual de operação <b>EF-QS-001</b></span><span>Rev. 1.10, 2026</span></div><h1>Primeira escala</h1><p class="cover__sub">EscalaFlow, do zero ao rodízio em 6 passos</p><p class="cover__lead">Siga a sequência. Cada passo leva minutos.</p></header>`,
    'A capa abre o documento com a plaqueta, o título, o subtítulo e uma frase.', 'Uma por documento. A frase diz o que o leitor sabe fazer no fim. Quem usa fornece: o tipo e o código do documento na plaqueta, o título em até quatro palavras, o subtítulo e a frase.', 'cover, plate, cover__sub, cover__lead'],
  ['Trilho', 'Página', 110, `<nav class="rail" aria-label="Passos"><a href="#p1"><b>01</b>Empresa</a><a href="#p2"><b>02</b>Setor</a><a href="#p3"><b>03</b>Postos</a><a href="#p4"><b>04</b>Equipe</a><a href="#p5"><b>05</b>Demanda</a><a href="#p6"><b>06</b>Gerar</a></nav>`,
    'O trilho lista as partes do documento, com âncora para cada uma.', 'Só em documento com quatro partes ou mais. O número aparece quando a sequência é real. Quem usa fornece: um item por parte, com o mesmo nome do título dela.', 'rail'],
  ['Parte', 'Página', 460, `<ol class="steps"><li class="part part--side"><div class="prose"><h2>Setor</h2><p>Crie o setor onde a escala vai viver. Defina o horário de funcionamento e o regime.</p><p class="path"><span>Onde</span> <b>Setores</b> <b>Novo Setor</b></p></div>${palco(`<div class="win"><div class="win__bar">Novo Setor</div><div class="win__body"><div class="field"><span>Nome</span><div>Padaria</div></div><div class="field"><span>Regime</span><span class="seg"><span>5x2</span><span class="is-on">6x1</span></span></div></div></div>`, 'Setor com horário e regime')}</li></ol>`,
    'A parte tem um assunto: um título que o nomeia, o texto, o caminho e, quando ajuda, uma figura.', 'Em passo a passo fica dentro de `steps`, que numera sozinho. `part--side` põe o texto e a figura lado a lado; `part__wide` ocupa as duas colunas. Quem usa fornece: título em até seis palavras, até três frases, o caminho na tela e a figura.', 'part, part--side, part__wide, steps, prose, path'],
  ['Tabela', 'Página', 260, `<table class="table"><thead><tr><th>Aparece</th><th>O que significa</th><th>O que fazer</th></tr></thead><tbody><tr><td><span class="banner banner--warn">${ico('warning-fill')}Escala gerada com ajustes</span></td><td data-th="O que significa">Normal. O sistema flexibilizou regras internas.</td><td data-th="O que fazer">Revise e siga.</td></tr><tr><td><span class="banner banner--err">${ico('x-circle-fill')}Impossível gerar</span></td><td data-th="O que significa">Falta gente para a demanda pedida.</td><td data-th="O que fazer">Reduza a cobertura mínima ou cadastre mais pessoas.</td></tr></tbody></table>`,
    'A tabela compara coisas que têm os mesmos atributos.', 'Só fios horizontais, cabeçalho em caixa de frase. Quem usa fornece: uma coisa por linha e `data-th` em cada célula, que vira o rótulo no celular.', 'table'],
  ['Aviso', 'Página', 420, `<div style="display: grid; gap: var(--gap-pieces)">${nota('', 'Rascunho não vale', '', 'A escala só conta depois de Oficializar.')}${nota('ok', 'Pronto', 'check-circle-fill', 'A cópia fica disponível para edição em Meu cadastro.')}${nota('warn', 'Atenção', 'warning-fill', 'Escala gerada com ajustes.')}${nota('err', 'Erro', 'x-circle-fill', 'Impossível gerar: falta gente para a demanda pedida.')}</div>`,
    'O aviso destaca uma condição que muda o resultado.', 'O rótulo diz o tipo; a cor é de status e vem sempre com rótulo ou ícone. Quem usa fornece: o rótulo, uma ou duas frases e a variante.', 'note, note--ok, note--warn, note--err, note__label'],
  ['Conferencia', 'Página', 330, `<div class="check"><div class="check__head"><span>Pré-voo: pronto para gerar quando</span><output>2/5</output></div><ul><li><label><input type="checkbox" checked><span>Empresa salva</span><small>01</small></label></li><li><label><input type="checkbox" checked><span>Setor com horário e regime</span><small>02</small></label></li><li><label><input type="checkbox"><span>Pelo menos 1 posto criado</span><small>03</small></label></li><li><label><input type="checkbox"><span>Pessoas ligadas aos postos</span><small>04</small></label></li><li><label><input type="checkbox"><span>Demanda definida</span><small>05</small></label></li></ul></div>`,
    'A conferência lista pré-requisitos que o leitor marca.', 'O contador soma os marcados quando o documento carrega o kit.js. Quem usa fornece: o título da lista e um item por pré-requisito, com o passo de onde ele vem.', 'check, check__head'],
  ['Faixa', 'Página', 260, `<aside class="band"><div class="prose"><h2>Fale com o assistente</h2><p>O Assistente IA faz cada passo deste manual por conversa.</p></div><div class="stack"><code>Crie o setor Padaria, 6x1, das 6h às 22h</code><code>Gera a escala de março e me mostra as folgas</code></div></aside>`,
    'A faixa muda o papel para mostrar um caminho alternativo.', 'No máximo uma por documento. Quem usa fornece: título, uma frase e, em `stack`, as frases que o leitor pode digitar.', 'band, stack'],
  ['Abas', 'Página', 220, `<div class="tabs"><div class="tabs__list" role="tablist"><button role="tab" type="button" aria-selected="true">Produto</button><button role="tab" type="button" aria-selected="false">Arquitetura</button></div><div class="tabs__panel" role="tabpanel"><section class="part"><div class="prose"><p>A camada de produto: o que a pessoa encontra, faz e obtém.</p></div></section></div></div>`,
    'As abas separam camadas do mesmo documento, como Produto e Arquitetura.', 'Use quando o mesmo HTML serve a quem usa e a quem mexe no código. A troca funciona com o kit.js. Quem usa fornece: um botão e um painel por camada.', 'tabs, tabs__list, tabs__panel'],
  ['Fecho', 'Página', 300, `<div class="closing"><div class="stamp"><span>Primeira escala<br>conquistada</span></div><p>Daqui em diante é manutenção: férias, trocas e dias avulsos.</p></div><footer class="foot"><span>EscalaFlow, manual de primeira escala</span><span>Funciona 100% offline</span></footer>`,
    'O fecho encerra o documento com o carimbo e uma frase; o rodapé identifica.', 'O carimbo é o único gesto de festa e diz o que o leitor acabou de conseguir. Quem usa fornece: duas linhas para o carimbo, a frase e os dois textos do rodapé.', 'closing, stamp, foot'],
  // Cena
  ['Figura', 'Cena', 400, sangra(cenaAcao, 'A linha do Sistema e a ação Duplicar para editar'),
    'A figura emoldura uma cena ou um esquema e numera a legenda sozinha.', 'A legenda fica embaixo, em uma frase. Quando a tela continua, `fig__stage--bleed` deixa só o enchimento sair da moldura. Abaixo de 24rem a cena é redesenhada. Quem usa fornece: o palco e a legenda.', 'fig, fig__stage, fig__stage--bleed, figcaption'],
  ['Janela', 'Cena', 280, palco(`<div class="win"><div class="win__bar"><span class="grow">Cadastrados</span><span class="meta">Meu cadastro</span></div><div class="win__body"><div class="list">${copia}${origem}</div></div></div>`, 'A cópia em Meu cadastro, acima do item do Sistema'),
    'A janela é a única camada de contenção da cena: um recorte da tela, em tamanho de leitura.', '`win--split` acrescenta a lateral com o menu. Dentro dela as linhas se separam por fio. Quem usa fornece: o nome real da tela e as peças do corpo.', 'win, win--split, win__bar, win__side, win__body, win__title, grow, meta'],
  ['Linha', 'Cena', 420, palco(win(`<div class="row">${ico('list')}<span class="grow">Cadastrados</span></div><div class="row is-on">${ico('list')}<span class="grow">Cadastrados</span></div><div class="row row--ok">${ico('check-circle-fill')}<span class="grow">Meu cadastro</span></div><div class="row row--warn">${ico('warning-fill')}<span class="grow">Escala gerada com ajustes</span></div><div class="row row--err">${ico('x-circle-fill')}<span class="grow">Impossível gerar</span></div><div class="list">${origem}${quieta(58)}</div>`), 'Linha comum, ativa, com status e separada por fio'),
    'A linha é a unidade da cena; a barra ocupa o lugar das palavras que a história não usa.', 'De 3 a 7 palavras reais por cena, no assunto; o resto em `bar`. Quem usa fornece: o texto real da linha de que a parte fala e a largura das barras em `--w`.', 'row, is-on, row--ok, row--warn, row--err, row--line, list, bar, kv'],
  ['Campo', 'Cena', 380, palco(win(`<div class="field"><span>Nome da empresa</span><div>Mercado Central</div></div><div class="field is-focus"><span>Nome da empresa</span><div>Mercado Central<i class="caret"></i></div></div><div class="field"><span>Semana de trabalho</span><div></div></div><div class="pair"><div class="field"><span>Abre</span><div>06h</div></div><div class="field"><span>Fecha</span><div>22h</div></div></div><div class="field"><span>Regime</span><span class="seg"><span>5x2</span><span class="is-on">6x1</span></span></div>`), 'Campo preenchido, em foco, vazio, em par e com opções'),
    'O campo mostra um rótulo e o seu valor.', 'Rótulo e valor combinam: os dois em palavras ou os dois em barra. Campo ainda não preenchido aparece vazio. Quem usa fornece: o rótulo e o valor reais.', 'field, is-focus, caret, pair, seg'],
  ['Botao', 'Cena', 170, palco(`<div style="display: flex; flex-wrap: wrap; gap: var(--gap-pieces); align-items: center"><span class="btn">Duplicar para editar</span><span class="btn btn--ink">${ico('copy')}Duplicar para editar</span><span class="btn btn--primary target">${ico('copy')}Duplicar para editar${cursor(88, 62)}</span><span class="btn btn--primary is-pressed">Gerar Escala</span></div>`, 'Comum, de tinta, principal com o cursor, pressionado'),
    'O botão carrega a ação da cena.', '`btn--primary` leva o acento e aparece uma vez por cena, no assunto. O cursor pousa sobre o alvo marcado com `target`. Quem usa fornece: o texto exato do botão no produto.', 'btn, btn--ink, btn--primary, is-pressed, target, cursor'],
  ['Chip', 'Cena', 160, palco(`<div style="display: flex; flex-wrap: wrap; gap: var(--gap-pieces); align-items: center"><span class="chip">Sistema</span><span class="chip chip--ok">Meu cadastro</span><span class="chip chip--warn">sob medida</span><span class="chip chip--err">chave desligada</span><span class="toggle"></span><span class="toggle is-on"></span><span class="avatar">AN</span></div>`, 'Chips, chave desligada e ligada, avatar'),
    'O chip é um rótulo curto de estado ou de origem; a chave e o avatar são peças do mesmo tamanho.', 'Cor de status significa status e vem com o texto. Quem usa fornece: o rótulo real e a variante.', 'chip, chip--ok, chip--warn, chip--err, toggle, avatar'],
  ['Mensagem', 'Cena', 330, palco(`<div class="banner">${ico('info-fill')}Mensagem literal do sistema</div><div class="banner banner--warn">${ico('warning-fill')}Escala gerada com ajustes</div><div class="banner banner--err">${ico('x-circle-fill')}Impossível gerar</div><div class="toast">${ico('info-fill')}Escala gerada com ajustes</div><div class="menu"><div class="row is-on">${ico('copy')}Duplicar para editar</div><div class="row">${bar(70)}</div></div>`, 'Faixa de mensagem, aviso flutuante e menu'),
    'As mensagens mostram o texto literal que o produto exibe.', 'Nunca parafraseie a mensagem. `toast` e `menu` flutuam e levam a sombra do look. Quem usa fornece: o texto literal e a variante.', 'banner, banner--ok, banner--warn, banner--err, toast, menu'],
  ['Terminal', 'Cena', 240, palco(win(`<pre class="term"><span>$</span> node scripts/check.mjs passo-a-passo.html
395 palavras de prosa, 6 figuras
<span>AVISO</span> pergunta respondida na hora (3, teto 1)
Sem falhas. 1 aviso.</pre>`), 'A saída do check'),
    'O terminal mostra um comando digitado e a saída real.', 'Só para o que o leitor digita ou lê no terminal. Quem usa fornece: o comando e a saída, literais.', 'term'],
  // Esquema
  ['Fluxo', 'Esquema', 190, palco(fluxo, 'O caminho do item: do Sistema para Meu cadastro'),
    'O fluxo mostra etapas em ordem, com uma delas em destaque.', 'Quando a fonte não mostra a tela, a figura é um esquema. Em figura estreita o fluxo empilha. Quem usa fornece: uma etapa por item e `li.to` entre elas.', 'flow, li.to, is-on'],
  ['Ligacao', 'Esquema', 230, palco(`<div class="link"><b>Como eu faço?</b><span class="dash"></span><span class="chip is-on">Passo a passo</span></div><div class="link"><span>Como funciona?</span><span class="dash"></span><span class="chip">Explicação</span></div><div class="link"><span>Onde estamos?</span><span class="dash"></span><span class="chip">Mural</span></div>`, 'Três perguntas, três anatomias'),
    'A ligação une duas coisas com uma linha tracejada.', 'Contínua para ida, tracejada para ligação. Quem usa fornece: os dois lados de cada par.', 'link, dash, chip is-on'],
  ['Barras', 'Esquema', 300, palco(`<ol class="bars"><li data-v="2" style="--v: 34"><i></i><span>Qui</span></li><li data-v="3" style="--v: 51" class="is-on"><i></i><span>Sex</span></li><li data-v="4" style="--v: 68" class="is-on"><i></i><span>Sáb</span></li><li data-v="2" style="--v: 34" class="is-off"><i></i><span>Dom</span></li></ol>`, 'Cobertura mínima por dia'),
    'As barras comparam quantidades.', 'O número fica escrito em `data-v`; a altura, em `--v`, só reforça. Quem usa fornece: o valor, a altura de 0 a 100 e o rótulo.', 'bars, is-on, is-off'],
  ['Matriz', 'Esquema', 230, palco(`<div class="matrix" style="--cols: 8"><span class="head"></span><span class="head">S</span><span class="head">T</span><span class="head">Q</span><span class="head">Q</span><span class="head">S</span><span class="head">S</span><span class="head">D</span><span class="who">AN</span><span>T</span><span>T</span><span class="is-on">F</span><span>T</span><span>T</span><span>T</span><span>T</span><span class="who">BE</span><span>T</span><span>T</span><span>T</span><span>T</span><span>T</span><span>T</span><span class="is-on">F</span></div>`, 'A escala gerada: T trabalha, F folga'),
    'A matriz cruza pessoas e dias em uma grade.', 'Quem usa fornece: `--cols` com o número de colunas, o cabeçalho, quem está em cada linha e as células em destaque.', 'matrix, head, who, is-on'],
  ['Numero', 'Esquema', 190, palco(`<div class="stat"><b>395</b><span>palavras de prosa no manual refeito</span></div>`, 'O número medido pelo check'),
    'O número grande mostra uma medida e o que ela conta.', 'Um por cena. Quem usa fornece: o número medido e a frase que diz o que ele é.', 'stat'],
  ['Arquivos', 'Esquema', 290, palco(`<div class="win"><div class="win__bar">references/kit</div><div class="files"><div class="row">${ico('folder')}kit</div><div class="row row--ok" style="--i: 1">${ico('file-text')}kit.css<span class="meta">tokens, looks e peças</span></div><div class="row" style="--i: 1">${ico('file-text')}starter.html<span class="meta">gerado</span></div><div class="row" style="--i: 1">${ico('folder')}ouro<span class="meta">um por anatomia</span></div></div></div>`, 'Onde o sistema visual mora'),
    'A lista de arquivos mostra onde uma coisa mora.', 'Só os caminhos que a explicação usa. O recuo vem de `--i`. Quem usa fornece: os nomes reais e a responsabilidade de cada um em `meta`.', 'files, row com --i, meta'],
  ['Codigo', 'Esquema', 220, palco(`<div class="win"><div class="win__bar">kit.css</div><ol class="code" style="--from: 48"><li>:root,</li><li class="is-mark">[data-look="manual"] {</li><li>  --font-display: Futura, …</li></ol></div>`, 'O bloco de tokens do look manual'),
    'O trecho de código é literal, com o número da linha e a linha marcada.', 'Quem usa fornece: as linhas como estão no arquivo, `--from` com o número da primeira e `is-mark` na que importa.', 'code, is-mark'],
  ['Camadas', 'Esquema', 250, palco(`<ol class="layers"><li>Ficha de fatos<span class="chip chip--ok">feita</span></li><li>Espinha<span class="chip chip--warn">em curso</span></li><li>Escrita<span class="chip">a fazer</span></li></ol>`, 'O que acontece antes de quê'),
    'As camadas mostram o que acontece antes de quê, com o estado de cada uma.', 'Quem usa fornece: uma camada por item, na ordem, e o chip de estado.', 'layers'],
  ['LinhaDoTempo', 'Esquema', 210, palco(`<ol class="timeline"><li class="is-ok"><b>02/08/2026</b>Último resultado bom</li><li class="is-err"><b>27/08/2026</b>O erro nasce</li><li class="is-on"><b>03/09/2026</b>A descoberta</li></ol>`, 'O caso em três datas'),
    'A linha do tempo põe um caso em datas absolutas.', 'A cor do topo é o dado. Quem usa fornece: a data absoluta e o que aconteceu nela.', 'timeline, is-ok, is-warn, is-err, is-on'],
  ['Arvore', 'Esquema', 200, `<ul class="tree"><li><b>Cadastrados</b><ul><li><b>Sistema</b> <span>os itens de origem, com a ação Duplicar para editar</span></li><li><b>Meu cadastro</b> <span>as cópias, disponíveis para edição</span></li><li class="is-off"><code>parado.ts</code><span>existe e não roda: contorno tracejado</span></li></ul></li></ul>`,
    'A árvore localiza: onde cada coisa mora e o que ela faz.', 'Uma árvore curta, com a responsabilidade de cada ramo em uma linha. `is-off` marca o que existe e não roda. Quem usa fornece: os ramos e a linha de cada um.', 'tree, is-off'],
]
for (const [nome, grupo, h, html, resumo, guia, classes] of C) {
  put(`components/${nome}/preview.html`, `<!-- @dsCard group="${grupo}" height=${ALT[nome] ?? h} -->
<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>${nome}</title><style>body { padding: var(--s-5); }</style></head>
<body>
${html}
</body>
</html>
`)
  put(`components/${nome}/README.md`, `${resumo}\n\n${guia}\n\nClasses: ${classes.split(', ').map(c => '`' + c + '`').join(', ')}.\n\nA marcação é HTML puro com as classes do bundle.css. Não há componente em JavaScript.\n`)
}

// ── ícones: um SVG por símbolo do sprite ────────────────────────────────────
fs.mkdirSync(RAIZ + 'icons', { recursive: true })
const icones = Object.entries(ICONES).map(([id, i]) => { const f = id.slice(2) + '.svg'; fs.writeFileSync(RAIZ + 'icons/' + f, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${i.vb}"><path d="${i.d}"/></svg>\n`); return f })
put('assets/Icons/README.md', `# Ícones\n\n${icones.length} ícones Phosphor (licença MIT), os mesmos do \`sprite.svg\` do kit. Uma tinta só: nos documentos o ícone herda a cor do texto pela classe \`ico\`; aqui aparecem em preto.\n\nUm tamanho por cena, cor única, sempre do sprite. O cursor é o \`cursor-fill\`, pousado sobre o alvo.\n`)
fs.writeFileSync(RAIZ + 'icones.json', JSON.stringify(icones))

// ── README e seções ─────────────────────────────────────────────────────────
put('README.md', `# HTML Didático

O sistema visual do plugin HTML Didático: documentos de página única que alguém lê uma vez e sai sabendo explicar. O texto diz como a coisa é; a figura mostra o que se vê e como as partes se ligam.

## Como usar

Um documento carrega o \`components/bundle.css\`, que é o \`kit.css\` do plugin, e escreve HTML puro com as classes dele. Não há componente em JavaScript. O look troca por \`data-look\` no documento ou por \`data-theme\` aqui: \`manual\` (papel quente, grotesca geométrica, fio) e \`editorial\` (papel frio, serifa no título, sombra suave). A cena é escrita uma vez e acompanha qualquer look.

## Conteúdo

- Comece pela coisa que a pessoa precisa entender. Use o mesmo nome do começo ao fim, o nome que está na tela.
- Toda palavra específica vem da fonte. O que a fonte não dá fica fora do documento ou aparece em barra.
- Diga a regra pelo lado em que funciona. Corte o anúncio do que vem, a frase que repete o título e o adjetivo que não informa.
- Uma parte tem um assunto, um título que o nomeia e, quando ajuda, uma figura. Sequência para ações, tabela para comparar, árvore para localizar.
- Teste de uma leitura: quem nunca viu o assunto lê uma vez e explica com as mesmas palavras.

## Fundamentos visuais

- **Foco.** Uma ideia por tela. Em cada figura um objeto lidera.
- **Espaço.** Escolha pelo papel, nunca pelo número: \`gap-tied\` e \`gap-inside\` dentro do item, \`gap-pieces\` entre peças, \`gap-text\` entre parágrafos, \`gap-block\` entre blocos da mesma parte, \`gap-figure\` entre texto e figura, \`gap-part\` entre partes, \`gap-break\` na quebra. Os únicos valores são os da escala \`s-1\` a \`s-9\`.
- **Tipo.** Nada abaixo de \`text-micro\` (12px). Caixa de frase em rótulo e botão. Mono só para código, comando e número medido.
- **Cor.** \`color-accent\` é sinal e ocupa menos de 5% da tela. \`color-ok\`, \`color-warn\` e \`color-err\` significam status e vêm com rótulo ou ícone. Texto corrido em \`color-ink-2\`; metadado em \`color-ink-3\` só sobre \`color-paper\` e \`color-surface\`.
- **Conteúdo real.** De 3 a 7 palavras reais por cena, no assunto; o resto em barra (\`color-fill\`).
- **Detalhe.** Uma camada de contenção. Borda ou sombra, uma das duas: \`edge\` no look manual, \`shadow-surface\` no editorial.
- **Movimento.** O documento é parado.

## Ícones

Phosphor, licença MIT, em \`assets/Icons\`. Um tamanho por cena, cor única.

## O que não veio do código

- ${pulados.join('\n- ')}
- \`--radius-s\` e \`--radius-m\` mudam com o look (2px e 3px no manual, 6px e 10px no editorial). O formato de tokens guarda um valor só; o bundle.css aplica o do tema.
- As famílias de fonte são do sistema (Futura, Avenir Next, SF Mono, Iowan Old Style). Não há arquivo de fonte.
- \`--text-display\` é fluido no kit; aqui está o valor máximo.
- Os componentes são marcação com classes, sem bundle.js. A conferência e as abas só reagem com o \`kit.js\` do plugin, que não está aqui.
- Origem: \`nmarcofernandess/html-didatico\`, commit \`${COMMIT}\`, arquivo \`plugins/html-didatico/references/kit/kit.css\`. Gerado por \`tools/design-system/gerar.mjs\`.
`)
put('Design.md', fs.readFileSync(REFS + 'visual/design.md', 'utf8'))
put('Conteudo.md', fs.readFileSync(REFS + 'conteudo.md', 'utf8'))

// ── capa ────────────────────────────────────────────────────────────────────
const s = n => px('--s-' + n)
const pontos = []
for (let y = 0; y < 5; y++) for (let x = 0; x < 9; x++) pontos.push(`<rect class="dot" x="${744 + x * s(5) - s(1) / 2}" y="${s(6) + y * s(5) - s(1) / 2}"></rect>`)
put('components/Cover/preview.html', `<!-- @dsCard height=288 -->
<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><title>HTML Didático</title>
<style>
body { margin: 0; background: var(--color-paper); }
.cover-art { position: relative; width: 960px; height: 288px; overflow: hidden; }
.cover-art svg { position: absolute; inset: 0; }
.accent { fill: var(--color-accent); } .ink { fill: var(--color-ink); } .soft { fill: var(--color-accent-soft); } .well { fill: var(--color-paper-2); }
.blk { rx: var(--radius-m); } .dot { width: var(--s-1); height: var(--s-1); fill: var(--color-ink); }
.rule { stroke: var(--color-ink); stroke-width: var(--line); }
.name { position: absolute; left: var(--s-7); bottom: var(--s-9); max-width: 440px; font-family: var(--font-display); font-weight: var(--display-weight); font-size: 80px; line-height: 0.95; color: var(--color-ink); }
.tag { position: absolute; left: var(--s-7); bottom: var(--s-7); max-width: 440px; font-family: var(--font-body); font-size: var(--text-small); color: var(--color-ink-3); }
</style></head>
<body>
<div class="cover-art">
<!-- blocos: color-accent ${s(9) * 2}×${s(9) * 2}, color-ink ${s(9)}×${s(9) * 2 + s(5)}, color-accent-soft ${s(9) * 2}×${s(8)}, color-paper-2 ${s(5) * 9}×${s(5) * 5 + s(5)}
     arranjo: uma laje de acento com satélites, encostados na grade de 24 (s-5), saindo pela borda direita
     padrão: grade de pontos a um passo s-5, porque o look manual é um manual técnico sobre papel quadriculado em base 4
     passos e raios: s-1, s-5, s-6, s-8, s-9; radius-m; line -->
<svg viewBox="0 0 960 288" width="960" height="288" aria-hidden="true">
<rect class="well blk" x="${744 - s(5)}" y="${s(6) - s(5)}" width="${s(5) * 10}" height="${s(5) * 6}"></rect>
<rect class="accent blk" x="528" y="${s(6)}" width="${s(9) * 2}" height="${s(9) * 2}"></rect>
<rect class="ink blk" x="${528 + s(9) * 2 + s(5)}" y="${s(8)}" width="${s(9)}" height="${s(9) * 2 + s(5)}"></rect>
<rect class="soft blk" x="${528 - s(7)}" y="${s(6) + s(9) * 2 - s(8) + s(6)}" width="${s(9) * 2}" height="${s(8)}"></rect>
${pontos.join('')}
<line class="rule" x1="480" y1="${288 - s(6)}" x2="960" y2="${288 - s(6)}"></line>
</svg>
<div class="name">HTML<br>Didático</div>
<div class="tag">Documentos que alguém lê uma vez e sai sabendo explicar.</div>
</div>
</body>
</html>
`)
console.log('saída em', RAIZ)
console.log('tokens:', cores.length, 'cores,', espaco.length, 'espaços,', tokens.type.groups.reduce((n, g) => n + g.styles.length, 0), 'estilos;', C.length, 'componentes;', icones.length, 'ícones')
