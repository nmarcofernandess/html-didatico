---
name: prova
description: "Entrada direta, para quando pedem pelo nome prova, proof, pack, evidências, resultados de execução, 'wireframe de prova', planejamento de verificação ou slots de verificação futura, ou invocam esta skill. Apresenta em HTML a evidência de que algo funciona, respeitando o renderer oficial do projeto; sem renderer confirmado, planeja e preenche a verificação com dados reais. É a forma do 'funciona mesmo?'."
---

# Prova

1. **Núcleo.** Siga o [Núcleo](../../references/nucleo.md). O nó aqui é a
   afirmação a comprovar e o resultado que a derrubaria; visto e lido separam a
   evidência do que só foi lido.
2. **Renderer.** Leia o [playbook Prova](../../references/playbooks/prova.md)
   antes de criar ou editar HTML. Descubra o renderer e seu contrato. Com
   renderer oficial, siga o caminho do projeto e trabalhe no template e no CSS
   quando autorizado. Pack ausente continua nesse caminho; não gere um
   substituto manual apresentado como oficial.
3. **Sem renderer confirmado,** e só então, use o fluxo manual de planejamento e
   preenchimento do playbook, com comandos e aceites reais e resultados
   observados.
4. **Entrega.** Confira veredito, etapas, evidências e fontes, e aplique o
   [contrato HTML](../../references/html-portatil.md) compatível com o projeto.

Uma explicação que cita provas não vira prova; maquete de tela é de Decidir.
Veja o [roteamento](../../references/roteamento.md).

Toda entrega cumpre os [Padrões](../../references/padroes.md): a forma segue o
conteúdo, a abertura situa quem não viu a conversa e a página em HTML só sai
depois de vista, com o [check](../../scripts/check.mjs) rodado. Entregue, avalie
o [Acervo](../../references/acervo.md).
