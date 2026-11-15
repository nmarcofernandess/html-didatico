// O caso único: Cadastrados, Sistema → Duplicar para editar → Meu cadastro.
// A fonte dá esses quatro nomes. Nome de item e itens de menu não vêm na fonte: ficam em barra.
import { ico, cursor, bar } from './kit.mjs'

export const lado = `<div class="win__side">
<div class="row is-on">${ico('list')}<span class="grow">Cadastrados</span></div>
<div class="row">${bar(62)}</div>
<div class="row">${bar(44)}</div>
<div class="row">${bar(70)}</div>
<div class="row">${bar(52)}</div>
<div class="row">${bar(36)}</div>
</div>`
export const quieta = w => `<div class="row row--line"><span class="grow">${bar(w)}</span><span class="bar" style="--w: 16%"></span></div>`
export const assunto = (comCursor = true) => `<div class="row row--line"><span class="grow">${bar(46)}</span><span class="chip">Sistema</span><span class="btn btn--primary${comCursor ? ' target' : ''}">${ico('copy')}Duplicar para editar${comCursor ? cursor(88, 62) : ''}</span></div>`
export const copia = `<div class="row row--line"><span class="grow">${bar(46)}</span><span class="chip chip--ok">Meu cadastro</span>${ico('pencil-simple')}</div>`
export const origem = `<div class="row row--line"><span class="grow">${bar(46)}</span><span class="chip">Sistema</span></div>`

export const ladoMudo = lado.replace(/<div class="row is-on">[\s\S]*?<\/div>/, `<div class="row">${bar(58)}</div>`)
export const janela = (linhas, { lateral = true, titulo = 'Cadastrados', ladoHtml = lado } = {}) => `<div class="win${lateral ? ' win--split' : ''}">
${lateral ? ladoHtml : ''}
<div class="win__body">
<div class="win__title">${titulo}</div>
<div class="list">
${linhas.join('\n')}
</div>
</div>
</div>`
export const cenaAcao = janela([quieta(52), assunto(), quieta(64), quieta(40), quieta(58), quieta(48)])
export const cenaResultado = janela([copia, origem, quieta(64), quieta(40), quieta(58), quieta(48)])
export const fluxo = `<ol class="flow"><li>Sistema</li><li class="to" aria-hidden="true"></li><li class="is-on">Duplicar para editar</li><li class="to" aria-hidden="true"></li><li>Meu cadastro<small>disponível para edição</small></li></ol>`
