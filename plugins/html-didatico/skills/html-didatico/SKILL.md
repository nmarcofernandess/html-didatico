---
name: html-didatico
description: "Cria cartões de uma página, explicações, manuais, quickstarts e aulas em HTML portátil, com figuras em que a resposta se vê. Use quando pedirem para ver, mostrar ou desenhar um defeito, uma feature, um exemplo ou um sistema. Um cartão responde a uma dúvida da conversa; a aula consolida um assunto em decisão, com Na tela, Dúvidas e Leis quando o pedido pede."
---

# HTML Didático

O documento põe o assunto na mesa: quem lê vê como ele é, ou onde o problema
está, sem ter lido a conversa.

1. **Fontes, entender e nó.** Leia [fontes e limites](../../references/fundamentos.md).
   Em [Conteúdo](../../references/conteudo.md), entenda o assunto na fonte, veja
   se o pedido é apresentar o que existe ou pôr um problema na mesa, ache o nó e
   liste as perguntas que o leitor faria. Isso vale do cartão à aula.
2. **Tamanho.** Uma dúvida da conversa (um defeito, uma feature, um exemplo, um
   "me mostra"), com até três perguntas sobre o mesmo caso, segue o
   [playbook Cartão](../../references/playbooks/cartao.md). Um assunto inteiro,
   uma operação ou o raciocínio longo de quem pediu segue o
   [playbook didático](../../references/playbooks/didatico.md), com o
   [modo sistemas](../../references/playbooks/sistemas.md) para organização de
   sistemas. Para consolidar um assunto em construção (como funciona, protótipo,
   dúvidas e decisões tomadas), acrescente o [playbook Aula](../../references/playbooks/aula.md)
   e abra as [aulas reais](../../references/exemplos/aulas/README.md) antes de escrever.
3. **Base.** Todo arquivo nasce de uma cópia do kit, feita pelo
   [montar](../../scripts/montar.mjs): `node scripts/montar.mjs --novo <cartao|passo-a-passo|explicacao|aula|starter> <destino.html>`,
   a partir da raiz do plugin. Só o `<main>` muda, conforme o
   [contrato HTML](../../references/html-portatil.md). Página escrita do zero não
   é entrega desta skill.
4. **Figuras e revisão.** Cada pergunta ganha a representação em que a resposta
   se vê, montada com as peças do kit. Antes de entregar, faça a
   [leitura pela figura](../../references/visual/design.md#leitura-pela-figura):
   para cada pergunta, o que se percebe só pela figura e pela legenda. Entregue
   um HTML só, com fontes e limites: o que foi visto rodando, o que foi lido e a
   objeção mais forte, como manda a revisão de Conteúdo. O [check](../../scripts/check.mjs) e a
   inspeção visual rodam quando o usuário pede ou quando o risco pede; nada de
   verificação é salvo junto do documento.

Para layout a decidir, use HTML Wireframe; montagem com contratos, HTML Blueprint;
evidência de execução, HTML Proof. Sem pedido de ver, uma explicação usa Explicar
com Clareza. Consulte o [roteamento](../../references/roteamento.md) se houver dúvida.
