# Changelog

## 2.9.1 — 23/11/2026

- Ícone próprio do plugin, em `assets/icon.svg` e `assets/icon-dark.svg`: uma janela com a figura em cor de sinal e a plaqueta de figura no canto, nas cores do look manual do kit. Marco pediu para reconhecer o plugin de relance e não confundir com outra cópia.
- O bloco de interface do Codex declara `logo`, `logoDark`, `composerIcon`, `composerIconDark`, `brandColor` e `brandColorDark`.

## 2.9.0 — 23/11/2026

- **Entender, antes de tudo**, em Conteúdo: a etapa de entender o assunto na fonte (as decisões que já existem, o sistema, a fonte relida) passa a ter um dono só e vale do cartão à aula. O playbook Aula fica com o que é dela (a tab Leis e as duas linhas a mais da ficha) e o Cartão e o didático apontam para Conteúdo.
- **Dois trabalhos do pedido**, em "O nó, antes da ficha": apresentar o que existe (o nó é a regra que gera os casos) e pôr um problema na mesa (o nó é o que prende). Cada um tem a sua história com começo, meio e fim. Uma apresentação conta o que existe como existe: dor, virada e tentativa fracassada entram quando a fonte as tem.
- **Perguntas que acham o nó**: os irmãos do caso, a regra que gera todos, quem já resolveu, onde o erro nasce, o que diz duas coisas ao mesmo tempo, o gesto de quem usa; quatro perguntas para defeito de causa desconhecida; e os sinais de que o nó ainda falta. Vêm das correções de Marco reunidas em 22/11/2026.
- **A tentativa que falhou entra com o caso em que quebra.** A tabela de cortes dizia para tirar as alternativas, e o nó pedia "por que as tentativas falharam"; as duas regras passam a dizer o mesmo. Sem o caso, a tentativa é histórico.
- Revisão ganha **A objeção mais forte** (o que faria a explicação estar errada, conferido na fonte) e **Visto e lido** (o que foi observado rodando separado do que foi lido). Fontes e limites: resumo de conversa, memória e documento anterior são pistas; o fato é relido na fonte.
- Congruência, depois de uma revisão do plugin inteiro: "a jornada é a da aula" sai de Cartão, didático, roteamento e casos, porque entender agora mora em Conteúdo; o estado do cartão passa a dizer o que foi visto rodando e o que foi lido; a entrega do Cartão e do didático pedem a objeção mais forte; "o que prende" vale para problema; as três linhas soltas de `tests/cases.md` voltam para a tabela; o README da raiz aponta as verificações até a 2.9.0.
- `scripts/check.mjs`: o caso do cartão avisa acima de 30 palavras (antes 32) e o cartão, acima de três figuras (antes quatro), como o texto já dizia. A folga da tela mais carregada (150, contra a referência de cerca de 130) fica: dois exemplos-ouro estão entre os dois números.
- Motivo: um exemplo feito nesta data saiu de um resumo, afirmou o que a spec não dizia e trocou o modelo do plugin por um vocabulário próprio.

## 2.8.0 — 22/11/2026

- Cartão refeito a pedido de Marco: o primeiro cartão-ouro tinha texto demais e fora feito sem entender o sistema. O que chega é pequeno, e a jornada é a da aula inteira: leis, sistema e nó antes de qualquer desenho.
- Método novo no playbook Cartão: contar a explicação em poucas frases, marcar as telas do produto que elas citam, desenhar essas telas no mesmo caso e tirar do texto o que a tela já mostra. O que sobra vira anotação ou legenda. Explicação que não cita tela ainda não foi entendida no produto.
- Anatomia: a pergunta, o caso em uma linha (`cover__sub`), de uma a três telas lado a lado (`cols cols--3`) e o estado em uma linha (`src`). Sai o bloco Em pauta (`brief`, `brief__label`).
- Cartão-ouro novo, "Que data vale num Cálculo retroativo?": o editor do Cálculo, o modal Importar de Antropometria e o dado trazido, com 63 palavras fora das figuras (eram 251) e uma tela de altura em 1280 px.
- `scripts/check.mjs`: o cartão precisa do caso em uma linha e de figura; avisa acima de 90 palavras fora das figuras (antes, 280) e caso com mais de 30 palavras.

## 2.7.0 — 22/11/2026

- **Cartão**, nova anatomia de HTML Didático: uma dúvida da conversa (um defeito, uma feature, um exemplo, um "me mostra") em uma página. A capa leva a pergunta e a resposta; o **Em pauta** situa quem não leu o chat, ao lado da cena em que a dúvida aparece; depois vem uma parte por pergunta, cada uma com a figura que a responde. Playbook em `references/playbooks/cartao.md` e cartão-ouro em `references/kit/ouro/cartao.html`, com o caso da Ana: um Cálculo datado de 05/11/2025 que mostra 46 anos quando ela tinha 44.
- **Leitura pela figura**, em Design: a revisão da cena confere, pergunta por pergunta, o que o leitor percebe só pela figura e pela legenda, com três vereditos (passa; a representação serve a outra pergunta; a figura só ilustra). O cartão-ouro é o exemplo: a ficha mostra onde a inconsistência aparece, a linha do tempo explica os dois anos e a tabela mostra que gestos mexem na idade. Vale para toda entrega e não depende do render.
- **A pergunta escolhe a representação**, em Conteúdo: a tabela "a forma segue a ideia" passa a partir da pergunta do leitor (onde aparece, por que deu esse valor, o que muda o quê, em que ordem, quanto pesa, qual escolher). Para cada pergunta, duas representações são consideradas e fica aquela em que a resposta se vê sem a prosa.
- **O nó, antes da ficha**, em Conteúdo: a pergunta em pauta com o caso real, o que prende, a régua em que os casos cabem e a palavra que carrega o modelo; a forma com começo, meio e fim; e a regra de que o raciocínio e os exemplos de quem pediu ficam, cada exemplo como figura. Uma pergunta, uma parte: a parte que repete a ideia da anterior sai.
- **Todo documento nasce de uma cópia:** `node scripts/montar.mjs --novo <cartao|passo-a-passo|explicacao|aula|starter> <destino.html>` cria o arquivo com o kit embutido e recusa sobrescrever. A skill, o playbook didático, o da Aula e o do Cartão mandam usar o comando; página escrita do zero não é entrega.
- `scripts/check.mjs`: recorta cada figura e lista a legenda e as palavras dela (bloco "Leitura pela figura"); avisa quando a legenda repete o título da parte; reprova cartão sem Em pauta ou sem figura e avisa cartão com trilho, abas, carimbo, mais de quatro figuras, pergunta sem figura ou mais de 280 palavras de prosa. Cabeçalho de tabela escondido no celular deixa de contar como texto cortado, e figura com tabela fica fora do aviso de palavras.
- Kit: `page--card`, `brief`, `brief__label` e `src`; tabela dentro de janela, como figura; a linha do tempo desce em figura estreita, uma data por linha, com a marca na borda de leitura. A folha de peças mostra as peças novas.
- Roteamento e descrição da skill reconhecem o pedido de ver ("me mostra", "desenha esse bug") como cartão, mesmo sem a palavra HTML.

## 2.6.1 — 21/11/2026

- Aula-ouro: sai o link para `BANCADA.html`, herdado da aula de Números e unidades, que apontava para um arquivo fora do plugin.

## 2.6.0 — 21/11/2026

- Aula-ouro em `references/kit/ouro/aula.html`: o kit embutido, as cinco tabs, o quadro-pergunta e uma dúvida na gramática inteira (o que acontece, as três opções lado a lado no mesmo caso, a tabela com a recomendada e “Responda no chat”). Vem da aula de Números e unidades, com a tab Dúvidas refeita. O playbook Aula manda copiar esse arquivo, não o starter vazio.
- Playbook Aula ganha “O que não passa”, tirado de uma aula de importações clínicas que saiu fora do kit: CSS próprio, código de nota, opção sem nome, dúvida sem recomendada, tab fora do roteador, opção sem figura no mesmo caso, print de estado vazio como figura, fala sobre o documento. A recomendação precisa escolher; sem escolha possível, a dúvida é pendência.
- Decisões em Boards diz o que fazer sem canvas de Design: no Codex e no Cursor, as decisões vão para a tab Dúvidas de uma aula, a partir da aula-ouro. Roteamento e descrição da skill dizem o mesmo.
- `scripts/check.mjs` reprova documento fora do kit, código de nota (PRD 03, 162/05, a 07, C-03, D-427, quadro 18), opção sem nome e dúvida sem recomendada ou sem “Responda no chat”.
- Kit: `cols cols--3` compara três opções e empilha abaixo de 60rem; figuras dentro de `cols` têm a mesma altura, com a legenda alinhada embaixo. A demonstração de subtabs na folha de peças termina com a recomendada e o pedido de resposta.

## 2.5.0 — 21/11/2026

- Exemplos de aula no plugin, em `references/exemplos/aulas/`: O que é um exame (autocontido, o padrão de didática), Números e unidades (o playbook Aula inteiro no kit, com as cinco tabs) e as aulas do canvas de Prescrição — Fórmula magistral, Cadastrados e Tomada, limite e lâmpada — como fonte, com o link do canvas vivo. O README deles traz a anatomia do quadro e os padrões que se repetem.
- O playbook Aula e a skill HTML Didático mandam abrir esses exemplos antes de escrever. Antes, nada no plugin apontava para eles, e um chat respondeu que não havia exemplo de aula.
- `scripts/check.mjs`: “pergunta respondida na hora” passa a contar só pergunta e resposta no mesmo parágrafo. O título-pergunta com a resposta logo abaixo, que é o quadro da Aula, deixava de ser tique e era acusado.

## 2.4.0 — 21/11/2026

- Nova entrada pública, a de número seis: **Decisões em Boards** (`decisoes-em-boards`). Decisões de produto, modelo ou arquitetura presas em lista ou prosa viram um mapa e um board por decisão no canvas de Design, com componentes reais do DietFlow DS. Vinha avulsa em `nmarcofernandess/devkit` (`skills/decisoes-em-boards`, commit `85f29158`), só no Claude Code.
- `references/decisoes/`: motor `gerar.py` (acha peças e CSS ao lado dele, sem caminho de instalação fixo), peças `pecas.js` e catálogo `pecas.md`, folha `decisoes.css`, formato do arquivo de decisões e publicação no canvas.
- Dois exemplos reais em `references/decisoes/exemplos/`: as onze decisões do cadastro de exames e as quatro, já respondidas, de Prescrição e Favoritos.
- Roteamento, README e casos de uso reconhecem a nova entrada e sua fronteira com HTML Wireframe e com a tab Dúvidas da Aula.

## 2.3.0 — 17/11/2026

- Verificar deixa de ser etapa obrigatória: o check, a inspeção visual e o teste de uma leitura rodam quando o usuário pede ou quando o risco só aparece no render. HTML Didático, Wireframe e Blueprint seguem essa regra; HTML Proof não muda.
- Nada de verificação fica junto da entrega: `scripts/check.mjs` grava screenshots e JSON numa pasta temporária do sistema, não mais em `.check/` ao lado do documento.
- Playbook Aula: a aula é um arquivo só; bancada, boards, censo e scripts de geração não ficam ao lado dela.
- Kit: a barra de abas não quebra o rótulo em duas linhas no celular; rola para o lado.

## 2.2.0 — 17/11/2026

- Playbook Aula em HTML Didático: um assunto em construção consolidado em um HTML, com as tabs que o pedido pede. Aula existe sempre, em quadros-pergunta; Na tela é um protótipo funcional do estado decidido; Dúvidas tem uma subtab por dúvida, com a comparação e a recomendada; Leis guarda só as decisões do usuário, datadas, contra regressão; Roadmap entra quando pedido ou quando uma lei muda o produto.
- Kit: abas dentro de abas (`tabs tabs--sub`) e endereço `#id` que abre as abas que contêm o alvo. A folha de peças mostra as subtabs.
- `scripts/check.mjs` lê todas as abas de um documento, uma abaixo da outra.
- `scripts/montar.mjs --atualizar` passa a reembutir também o `kit.js`.
- Roteamento, Conteúdo e casos de teste reconhecem a aula como modo de HTML Didático.

## 2.1.0 — 15/11/2026

- HTML Didático nasce de um kit: `references/kit/` traz tokens, dois looks (manual e editorial), peças de página, de cena e de esquema, o starter e a folha de peças. Espaço por função em escala de base 4; toda cor em token.
- Dois exemplos-ouro em `references/kit/ouro/`: passo a passo (o manual do EscalaFlow refeito no kit) e explicação.
- `references/conteudo.md` é dono da voz, da ordem e da quantidade do documento didático; `references/visual/design.md`, dos princípios de design e do método da figura.
- `scripts/check.mjs` renderiza em três larguras e mede; `scripts/montar.mjs` regera starter e folha de peças a partir de `kit.css`.
- Playbook didático reescrito como processo de sete passos. O modo sistemas usa as peças do kit.
- Saem `visual/sistemas.md`, `visual/tokens-editorial.md` e `visual/anatomia-editorial.md`, substituídos pelo kit. Tokens e anatomia de manual, dioramas, base e motion permanecem para HTML Proof.
- `tools/design-system/gerar.mjs` gera, a partir do kit, os arquivos do design system no Claude; `docs/MANUTENCAO.md` descreve o ciclo de atualização. Os dois ficam fora do pacote instalado.
- Mudanças visuais sobre a gramática do exemplo A: rótulos em caixa de frase, texto de 12px ou mais, contraste AA, texto sempre na mesma coluna, superfícies com fio no lugar da sombra deslocada, legenda sob a figura com numeração automática. Exemplos históricos A–E preservados.

## 2.0.0 — 09/11/2026

- Breaking: dez entradas públicas reorganizadas em cinco resultados: HTML Didático, HTML Wireframe, HTML Blueprint, HTML Proof e Explicar com Clareza. IDs antigos removidos, sem aliases.
- Manual, editorial e sistemas são modos internos; prova-final e proof-html têm um único contrato.
- Fontes, escrita e portabilidade extraídas; receitas divididas por uso e playbooks independentes, sem leitura integral da skill principal.
- Elements of Style vira recurso interno progressivo; texto e créditos preservados.
- Proof decide pelo renderer existente, mesmo quando o pack ainda não foi gerado.
- Exemplos históricos A–E preservados; novos casos separados para cada skill e ambiguidades.
- Manifesto portátil e metadados legíveis por skill; versões e marketplaces sincronizados.


## 1.2.0 — 08/11/2026

- Sete entradas diretas: `manual-operacao`, `editorial`, `prova-final`,
  `prancha-decisao`, `blueprint-componentes`, `explicar-sistema` e `proof-html`.
- Dez skills descobertas no plugin, incluindo as três anteriores.
- Entradas especializadas reutilizam os playbooks e receitas canônicos.
- Blueprint da 1.1.0 e exemplos A–E preservados; nenhum HTML de proof reescrito.
- Versão sincronizada nos três manifestos e nos três marketplaces.

## 1.1.0 — 07/11/2026

- Direção E: blueprint de composição com investigação em mapas, patterns,
  componentes, JSX e contratos.
- Playbook para árvore de arquivos, montagem progressiva dos primitivos ao
  consumidor, children/slots e contratos laterais.
- Receita HTML exemplar com deltas novos identificados como propostas.
- Roteamento e referências atualizados; exemplos A–D preservados.

## 1.0.1 — 05/11/2026

- README: o repositório é privado; o Codex instala pelo endereço SSH.

## 1.0.0 — 05/11/2026

- Plugin próprio, fora do Superflow, para Claude Code, Codex e Cursor.
- Recupera html-didatico (Direções A–D), explain-clearly e
  writing-clearly-and-concisely da última revisão no Superflow.
- Narrativa para explicar sistemas (§1.2) e primitivos de sistema
  (`receita.md` §12).
- `references/proof-html.md`: renderer oficial × wireframe manual, anatomia e
  leis da prova.
- Regras para HTML aberto por arquivo (`file://`).
- Exemplos reais por direção.

