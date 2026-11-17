// html-didatico · kit — comportamento mínimo. Sem script o documento continua inteiro e legível.
document.documentElement.classList.add('js')

// Conferência: conta os itens marcados.
for (const box of document.querySelectorAll('.check')) {
  const saida = box.querySelector('output'), itens = [...box.querySelectorAll('input[type=checkbox]')]
  const conta = () => { if (saida) saida.textContent = `${itens.filter(i => i.checked).length}/${itens.length}` }
  box.addEventListener('change', conta)
  conta()
}

// Abas: uma camada por vez. Sem script, todas as camadas ficam visíveis, uma abaixo da outra.
// Cada .tabs controla só a própria lista, então abas dentro de abas (subtabs) funcionam.
const abas = [...document.querySelectorAll('.tabs')].map(caixa => {
  const lista = caixa.querySelector(':scope > .tabs__list')
  const botoes = lista ? [...lista.querySelectorAll('[role=tab]')] : []
  const abre = id => botoes.forEach(b => {
    const ativo = b.getAttribute('aria-controls') === id
    b.setAttribute('aria-selected', String(ativo))
    document.getElementById(b.getAttribute('aria-controls')).hidden = !ativo
  })
  botoes.forEach(b => b.addEventListener('click', () => abre(b.getAttribute('aria-controls'))))
  if (botoes[0]) abre(botoes[0].getAttribute('aria-controls'))
  return { botoes, abre }
})

// Endereço: #id abre as abas que contêm o alvo, de fora para dentro, e rola até ele.
const irPara = () => {
  const alvo = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
  if (!alvo) return
  const paineis = []
  for (let el = alvo; el; el = el.parentElement) if (el.matches('.tabs__panel')) paineis.unshift(el)
  for (const p of paineis) for (const a of abas) if (a.botoes.some(b => b.getAttribute('aria-controls') === p.id)) a.abre(p.id)
  alvo.scrollIntoView()
}
addEventListener('hashchange', irPara)
irPara()
