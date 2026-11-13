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
for (const abas of document.querySelectorAll('.tabs')) {
  const botoes = [...abas.querySelectorAll('[role=tab]')]
  const abre = id => botoes.forEach(b => {
    const ativo = b.getAttribute('aria-controls') === id
    b.setAttribute('aria-selected', String(ativo))
    document.getElementById(b.getAttribute('aria-controls')).hidden = !ativo
  })
  botoes.forEach(b => b.addEventListener('click', () => abre(b.getAttribute('aria-controls'))))
  if (botoes[0]) abre(botoes[0].getAttribute('aria-controls'))
}
