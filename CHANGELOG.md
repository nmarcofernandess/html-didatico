# Changelog

## 4.3.0 — 27/11/2026

Figura desenha, tabela ordena. Pedido de Marco: a segunda versão da aula de testes do DietFlow, refeita por outro agente com o plugin 4.0.1, abriu sem origem, trocou as figuras por tabelas de frases, respondeu "Sim." a "O que o DietFlow verifica?" e usou Full, E2E, FlowUI, focal e "Full elegível" sem definir nenhum. O check da época isentava tabela da conta de palavras por figura e contava tabela como figura: a aula passou com zero falhas e zero avisos.

- **Padrão novo em `references/padroes.md`, "Figura desenha, tabela ordena":** a pergunta se responde com desenho de componentes; tabela é ficha de valores curtos; cada aba tem um desenho; as desenhadas são maioria. Traz o mapa de qual componente substitui cada tabela de frases.
- **Check:** reprova tabela com três células ou mais acima de 15 palavras, aba sem figura desenhada (fora de Leis e Roadmap), documento com mais figuras-tabela que desenhadas, parte de pergunta aberta respondida com "Sim." ou "Não.", e quatro ou mais termos internos (siglas e códigos) fora dos `li term` da origem. Avisa de um a três termos sem definição e célula isolada longa. O glossário da origem sai da conta de 80 palavras. A aula do agente, rodada no check novo, sai com cinco falhas; todos os exemplos-ouro passam.
- **Playbook Aula:** seção "Aula de verificação", com a figura de cada pergunta sobre testes, provas e integração (régua de alcance em `w-layers`, cobertura da suíte em `w-box`, triagem em `w-matrix`, alinhamento das provas em `w-matrix`), e três linhas novas em "O que não passa".
- **Núcleo:** documentação não autoriza commit em PR do projeto sem pedido explícito; quem pede para ver a calibragem antes recebe as três linhas e a montagem espera.
- **Kit:** `w-matrix` com coluna `who` deixa as células quadradas e vira matriz de casos, com uma palavra por célula e quebra no celular; o `sub` de uma `w-layer` marcada passa no contraste.
- **Acervo:** a aula refeita (testes da revisão de registros do DietFlow) entra como candidata a referência de aula de verificação.

## 4.2.0 — 27/11/2026

Abertura ancorada, calibragem e acervo. Pedido de Marco: uma aula sobre os testes do DietFlow abriu no meio da conversa ("Do erro ao merge", "O último Full parou no lint"), com jargão sem origem; lida um mês depois, não dizia de que se tratava. O conserto também não era começar por "o que é um teste", porque o tema era outro: dá para rodar os testes do módulo com a feature em construção sem afrouxar teste e sem regredir a feature?

- **Quatro padrões novos em `references/padroes.md`,** cada um com o caso dos testes do DietFlow:
  - **Abertura ancorada:** toda entrega abre pela origem (onde estamos, a pergunta real, o que se pede de quem lê), na altura do assunto. Inclui o teste do estranho, título objetivo sem slogan e termo interno definido na primeira aparição.
  - **Calibrar antes de montar:** altura, profundidade (padrão: o que um dev olha para verificar o trabalho, sem entrar em código) e distância (a lista de temas que dão o assunto por elucidado), escritas antes de montar e conferidas no fim.
  - **Escopo transversal:** recorte de um conjunto abre com o todo e o recorte destacado com `mark`, e só então ganha profundidade.
  - **Produto durável:** o estado leva data e revisão; a forma de explicar não depende da conversa.
- **Núcleo:** seção nova "Calibrar", entre o nó e a montagem. "Antes de entregar" ganha o teste do estranho com a lista da distância, e o acervo.
- **`<d-origin>`,** componente novo, logo abaixo da capa: `where`, `q`, `ask` e um `li term` por termo interno. Entra em todos os exemplos-ouro menos o cartão (lá a capa já é a origem), no starter e no mapa dos boards (`MAPA.onde` e `MAPA.pergunta`, agora obrigatórios no motor).
- **Títulos dos exemplos-ouro:** a maquete deixa "O 5,5 aparece. A linha não mente." por "Glicose em mmol/L no card da Evolução", e a montagem deixa "Das peças à tela" por "Como um grupo de exames se monta".
- **Check:** reprova documento sem `<d-origin>` (cartão e boards de uma série ficam de fora), origem depois da primeira parte, origem sem `where` ou `q` e capa sem data. Avisa origem com mais de 80 palavras. A origem não conta na densidade de prosa por tela.
- **Acervo de candidatas:** `references/acervo.md` diz quando uma entrega registra uma forma excepcional de explicar, o que escreve e para onde vai: `acervo/candidatos/` na raiz do repositório, por commit direto na branch `acervo`, fora do pacote e sem release. Sem escrita no repositório, a candidata sai num bloco no fim da resposta. Toda skill termina perguntando se houve uma. O `AGENTS.md` e o validador garantem que `acervo/` nunca entra no pacote.
- Limites: o design system no Claude e o `bundle.css` dos canvas só vestem `d-origin` depois de regerados (`docs/MANUTENCAO.md`). Boards já gerados com o motor antigo precisam de `MAPA.onde` e `MAPA.pergunta` para gerar de novo.

## 4.1.0 — 26/11/2026

Resposta copiável leva a origem. Pedido de Marco: uma página de decisões copiava só o código de cada opção, um por linha ("pode deploy DEV", "dias segunda"); quem recebeu não sabia a que pergunta cada linha respondia, e o autor teve de reformatar à mão.

- **`references/padroes.md`,** arquivo novo, dono das regras que atravessam todas as formas: cada padrão traz a regra, o caso que a criou, onde o kit a cumpre e o que o check reprova. O Núcleo, Decisão, os playbooks Aula e Maquete, os boards e as skills Decidir e Aula apontam para ele; o `AGENTS.md` diz que regra transversal nova entra lá.
- **Primeiro padrão, "Resposta copiável leva a origem":** cada resposta copiada é um bloco autossuficiente, `<identificador> · <pergunta completa>`, `Resposta: <rótulo> [<código>]` e `Comentário: <texto>` quando houver; item só com comentário sai com "nenhuma opção marcada"; blocos separados por linha em branco; a prévia mostra exatamente o texto copiado.
- **`<d-answer>` e `<d-answers>`,** componentes novos. `d-answer` é a "Sua resposta" de uma decisão: as opções (`li` com `code`, `label` e `rec`), o chip Recomendada, "Responda no chat", um comentário, a prévia e o botão que copia o bloco. `d-answers` junta todas as respostas da página num texto só. O formato sai de uma função única do kit (`HD.bloco`). O identificador e a pergunta vêm da página quando não vêm por prop. A cópia tenta a API do navegador e cai para a cópia por seleção; se as duas falham, seleciona a prévia.
- **Exemplos-ouro e boards:** decidir, a tab Dúvidas da aula e a pergunta da maquete respondem com `d-answer`; decidir e aula fecham com `d-answers`. O motor dos boards gera `d-answer`; no canvas, sem script, a resposta mostra a tabela e os códigos.
- **Check:** reprova dúvida (`duvida-N`) sem `<d-answer>`, opção sem `code` ou `label` e botão de copiar escrito à mão fora do kit.
- Limites: o design system no Claude e a cópia do `bundle.css` nos canvas só mostram `d-answer` vestido depois de regerados e publicados (`docs/MANUTENCAO.md`).

## 4.0.1 — 24/11/2026

O plugin deixa de trazer instrução de um produto só. Pedido de Marco: canvas e design system do DietFlow são muita coisa para um plugin, envelhecem e não servem a outros propósitos; o fluxo próprio do DietFlow fica no ambiente dele.

- **O produto de quem pede**, seção nova em `visual/design.md`, dona da regra: a tela de um produto entra remontada em wireframe com os componentes do kit, a partir da leitura de como o sistema funciona; o design system do próprio produto só entra integrado quando já está no host (canvas, repositório) e a pergunta é sobre a aparência real. Decisão, boards e canvas apontam para ela.
- **Sem DietFlow nas instruções:** saem `origin/dev`, o devkit e seu hook, o `.context` do DietFlow na montagem e os caminhos de prova do DietFlow; ficam as regras gerais (ler a fonte da versão em uso, só leitura; ler o que o projeto mantém sobre si; o contrato do renderer do próprio projeto).
- **Boards com nomes gerais:** o grupo "Ficam como em dev" vira "Ficam como estão", e o quadro "Em dev" vira "Hoje", conferido na fonte.
- Os exemplos-ouro continuam usando casos do DietFlow como conteúdo; não são instrução.

## 4.0.0 — 24/11/2026

Breaking: o kit vira um design system único com uma biblioteca de componentes. Os dois looks (`data-look="manual"` e `"editorial"`) deixam de existir, e figura passa a ser feita de componentes, nunca desenhada à mão. Pedido de Marco: cada exemplo tinha um estilo, não havia design system, e as peças precisam ser componentes que crescem a cada documento e que, no futuro, gravam vídeo no Remotion.

- **Uma identidade:** um rótulo nutricional desenhado a caneta. Fio grosso abre e fecha, fio médio separa seções, fio fino separa linhas; título em Helvetica Neue condensada preta; papel e cinzas sem matiz. Tinta preta desenha o produto em wireframe; magenta é a caneta de quem explica (marca, pino, chamada, marca-texto, carimbo) e não tem outro uso. Tokens num `:root` só, em `kit.css`, sem os nomes da 3.x.
- **Biblioteca de componentes em `kit.js`:** 53 componentes, `d-*` para o documento (capa, parte, passos com trilho, paginação, abas, aviso, conferência, faixa, fecho, pé) e `w-*` para a figura (janela, campo, lista, botão, segmentado, chip, mensagem, terminal, print; fluxo, barras, linha com faixa de referência, matriz, arquivos, árvore, código, camadas, linha do tempo, número, caixa de composição, critério de prova) mais a caneta (`mark`, `pin`, `click`, `w-callout`). Cada componente é uma função pura de props e filhos que devolve a marcação semântica, com grupo, resumo, props e exemplo: o mesmo contrato de uma futura versão React. Nenhum imita um UI system real.
- **Documentação gerada do registro:** `montar.mjs` escreve a folha de peças (`pecas.html`, com tokens, a ideia e cada componente vivo com o código) e `componentes.md`, a referência para agentes. Nova entrada `--corpo <corpo.html> <destino>` monta um documento a partir de um corpo só com componentes.
- **Exemplos-ouro reescritos com componentes,** com fonte em `ouro/<nome>.body.html` e o `.html` gerado: cartão, passo a passo, explicação, aula (o protótipo de Na tela segue funcionando), decidir. Novos: prova, montagem (blueprint) e maquete (wireframe), que substituem os históricos C, E e D como referência dessas formas.
- **Check:** lê o DOM montado; reprova componente que não existe no kit e erro de script; avisa quando o corpo tem peça desenhada à mão; piso de texto em 12px; tokens só em `:root`.
- **Receitas visuais removidas** (`tokens-manual`, `anatomia-manual`, `prova`, `dioramas`, `maquete`, `base`, `motion`): cada uma tinha paleta, fontes e tamanhos próprios. Playbooks de prova, maquete, montagem, cartão, aula, didático e sistemas, o contrato HTML e as skills passam a apontar para os componentes e os exemplos-ouro. `design.md` ganha a seção "Um sistema, sem looks".
- **Históricos fora do pacote:** `references/exemplos/` (A–H) vai para `docs/historico/exemplos/`, bytes preservados, com um índice que diz qual exemplo-ouro substitui cada um. A anatomia do quadro e os padrões das aulas reais entram no playbook Aula.
- **Boards de Decidir com o kit, sem o DietFlow DS.** O motor passa a ser `references/decisoes/gerar.mjs`: compõe mapa e boards com os componentes do kit (`d-pager`, `d-cover`, `d-steps`, uma `w-fig` por quadro, a tabela das opções e "Responda no chat"), pré-renderiza cada um num navegador e grava a marcação pronta no artboard, vestida pelo `bundle.css` do design system HTML Didático instalado no canvas (`project/ds/hd/`). O canvas edita essa marcação como qualquer outra. `--html <pasta>` escreve os mesmos boards como documentos do kit, para o check. O arquivo de decisões vira módulo ES, com as figuras em componentes; o exemplo-ouro `numeros-e-unidades.mjs` sai dos exemplos-ouro do kit, sem fato novo. O motor Python, as peças React do DietFlow DS, `decisoes.css` e os dois arquivos de decisões reais vão para `docs/historico/exemplos/decisoes/`; canvas antigos continuam abrindo com a cópia própria do DS. Conferido num canvas de Design de teste: figuras, pinos e o gráfico de linha renderizam no runtime do canvas.
- **`d-pager`,** componente novo: o índice, a anterior e a próxima de uma série de páginas.
- **`scripts/kit.mjs`:** o kit em Node (fonte, registro, molde do documento e pré-render) para `montar.mjs` e o motor dos boards.
- **`montar.mjs --atualizar`** recusa documento da 3.x: trocar só o kit daria uma página que parece migrada e não está. O documento fica como está ou ganha um corpo novo com componentes.
- **Revisão independente antes da publicação:** dez pontos, todos corrigidos. Texto com `&lt;` e comentário do autor dentro de `d-part` e `d-band` voltavam como marcação ou como texto visível; `slot="fig"` e `slot="aside"` só valiam em elemento cru; `pecas.html` tinha ids duplicados; inserir um componente depois rolava a página e não abria aba nova pelo endereço; `0.5` virava 5 e `min="0"` era ignorado em `w-line`; `value=""` escrevia "true"; `mark` não valia em metade dos `w-*`. No exemplo-ouro de explicação, a saída do check passou a ser a medida de 23/11/2026, e o magenta saiu de "Responda no chat" e de uma regra geral.
- Limites: o ícone do plugin segue o de 2.9.2. Os exemplos de `tests/examples/` ficam como registro da época.

## 3.0.0 — 23/11/2026

Breaking: as entradas passam a ser escolhidas pela pergunta de quem pede, e não pelo formato do arquivo. IDs antigos removidos, sem aliases; a tabela de migração está no README.

- **Entrada automática.** `html-didatico` deixa de ser "a skill de documentos" e vira a entrada em que ninguém nomeia o tipo: lê o pedido e a conversa, recolhe o que já foi decidido nela, escolhe a forma pelo roteamento e monta. Diz na entrega, em uma linha, qual forma escolheu e por quê. Pedido de Marco no meio da release: "eu peço algo, ele sabe o que eu preciso e monta, sem eu enviesar um tipo".
- **Seis entradas diretas, com nome em português:** `cartao` ("me mostra"), `aula` ("me ensina"), `decidir` ("estou entre A e B"), `montagem` ("como isso se monta", era `html-blueprint`), `prova` ("funciona mesmo?", era `html-proof`) e `explicar` ("me explica", em texto; era `explain-clearly`). O cartão passa a ser chamável direto. A aula reúne explicação, passo a passo, mural, sistemas e aula em quadros.
- **Núcleo comum**, em `references/nucleo.md`, primeiro passo das sete: fontes e limites (o antigo `fundamentos.md`), entender, o nó com as perguntas que o acham, a objeção mais forte e visto e lido. Antes, entender e o nó moravam em Conteúdo e só o documento didático passava por eles; montagem, prova e explicação liam só fontes e limites. Conteúdo fica com ficha, leitor, espinha, escrita e cortes.
- **Uma gramática de decisão**, em `references/decisao.md`: a pergunta com o caso e as saídas, o que acontece, as opções comparadas no mesmo caso, a recomendada e "Responda no chat". Eram três textos (a tab Dúvidas da aula, a skill de boards e a comparação do wireframe), cada um com a sua versão. A tab Dúvidas, os boards e a maquete viram saídas dela.
- **Decidir sai conforme o host:** no canvas de Design do Claude com o DietFlow DS, um board por decisão (`references/decisoes/boards.md`, que era a skill `decisoes-em-boards`); sem canvas ou sem esse design system, um HTML com uma aba por decisão e a aba Leis; pergunta de layout, a maquete (`playbooks/maquete.md`, que era `html-wireframe`).
- **Base nova no kit:** `node scripts/montar.mjs --novo decidir <destino.html>`, a partir do decidir-ouro (`references/kit/ouro/decidir.html`), derivado da dúvida e das leis da aula-ouro, sem fato novo.
- **Fronteira entre a automática e as diretas:** o pedido que não nomeia a forma ("me mostra", "me ensina") entra pela automática; as diretas atendem quem nomeia a forma ou invoca a skill, e aí a escolha de quem pede governa. As sete descrições dizem isso.
- Roteamento reescrito pela pergunta, com o ciclo (cartão que virou assunto pede aula; aula que abriu escolha pede decisão; a resposta vira lei e volta para a aula) e as fronteiras em lista.
- Arquivos renomeados para acompanhar as entradas: `playbooks/blueprint.md` → `montagem.md`, `playbooks/proof.md` → `prova.md`, `playbooks/wireframe.md` → `maquete.md`, `visual/proof.md` → `prova.md`, `visual/wireframe.md` → `maquete.md`. O playbook didático passa a se chamar "Documento didático".
- Manifestos: descrição, texto longo e prompt padrão novos; `displayName` "HTML Didático" no manifesto do Claude Code, aceito por `claude plugin validate`. Validador com os sete IDs.
- Uma revisão independente do pacote apontou 20 pontos antes da publicação, todos corrigidos: rotas da tab da aula contra o roteamento, "board Foco" sem definição, canvas sem o DietFlow DS sem saída, a automática forçando o kit em formas que têm outra base, regra das decisões já tomadas com dois donos, recomendação da maquete contra a gramática de decisão, e textos parados na estrutura antiga em `html-portatil.md`, `clareza.md` e no playbook Montagem.
- Limites: é um desenho novo, ainda sem uso real por outro agente. O mural segue como anatomia da Aula, sem exemplo-ouro próprio. Os exemplos de `tests/examples/` são de revisões anteriores e mantêm os nomes da época.

## 2.9.2 — 23/11/2026

- Ícone refeito a pedido de Marco, que reprovou o primeiro: os dois sinais de tag, um verde-água e um laranja, com uma lâmpada amarela no meio, sem fundo. Um arquivo só, `assets/icon.svg`, serve ao tema claro e ao escuro; sai `icon-dark.svg`.
- Claude Code: `.claude-plugin/icon.png` (512 px) e o campo `icon` no manifesto.

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

