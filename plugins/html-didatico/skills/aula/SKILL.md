---
name: aula
description: "Entrada direta, para quando pedem pelo nome uma aula, uma explicação em HTML, um manual, um passo a passo, um quickstart ou um mural, ou invocam esta skill. Ensina um assunto inteiro em HTML portátil, em quadros, com Na tela, Dúvidas, Leis e Roadmap quando o pedido pede. É a forma do 'me ensina'; o pedido que não nomeia a forma entra por html-didatico, e quem só quer entender em texto usa explicar."
---

# Aula

Um assunto inteiro fica de pé: quem lê uma vez sai sabendo explicar.

1. **Núcleo.** Siga o [Núcleo](../../references/nucleo.md): entenda o assunto na
   fonte, veja se o pedido é apresentar o que existe ou pôr um problema na mesa,
   ache o nó e releia cada fato.
2. **Anatomia.** Em [Conteúdo](../../references/conteudo.md), monte a ficha e
   deixe a pergunta do leitor escolher: passo a passo ("como eu faço?"),
   explicação ("como funciona?"), mural ("onde estamos?") ou aula em quadros
   ("como isso deve ser, e o que falta decidir?"). O processo é o do
   [playbook didático](../../references/playbooks/didatico.md). Organização de
   sistemas soma o [modo sistemas](../../references/playbooks/sistemas.md). Um
   assunto em construção, com protótipo, dúvidas e decisões tomadas, soma o
   [playbook Aula](../../references/playbooks/aula.md) e parte da
   [aula-ouro](../../references/kit/ouro/aula.html).
3. **Base.** O arquivo nasce de uma cópia do kit, feita pelo
   [montar](../../scripts/montar.mjs): `node scripts/montar.mjs --novo <aula|starter> <destino.html>`,
   a partir da raiz do plugin. Só o corpo muda, escrito com os
   [componentes](../../references/kit/componentes.md), conforme o
   [contrato HTML](../../references/html-portatil.md).
4. **Figuras e revisão.** Cada pergunta ganha a forma em que a resposta se vê
   (cena, esquema, matriz, tela inteira, peça que se mexe), montada com os componentes do kit (`w-*`), nunca desenhada à mão. Antes de entregar, faça a
   [leitura pela figura](../../references/visual/design.md#leitura-pela-figura).
   Rode o [check](../../scripts/check.mjs) e olhe os screenshots dele antes de
   entregar. Entregue um HTML só e, na resposta, o que foi visto rodando, o que
   foi lido e a objeção mais forte; nada de verificação é salvo junto do
   documento.

Chamada pelo nome, a aula governa e tem o tamanho que o conteúdo tem. Decisões
abertas dentro do assunto viram a tab Dúvidas, com a resposta em `<d-answer>`
([Padrões](../../references/padroes.md)); fora de uma aula, são de Decidir.
Veja o [roteamento](../../references/roteamento.md).

Toda entrega cumpre os [Padrões](../../references/padroes.md): a forma segue o
conteúdo, a abertura situa quem não viu a conversa e a página em HTML só sai
depois de vista, com o [check](../../scripts/check.mjs) rodado. Entregue, avalie
o [Acervo](../../references/acervo.md).
