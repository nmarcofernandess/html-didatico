# Padrões · o que vale em todas as formas

Um padrão é uma regra que atravessa as formas: vale no cartão, na aula, na decisão, na montagem, na prova e na explicação, e não pertence a nenhuma delas. Cada um nasceu de uma entrega real que falhou e diz onde a regra é cumprida, para que nenhuma forma a reescreva por conta própria. Padrão novo pode nascer como candidato no [acervo](acervo.md) antes de entrar aqui.

Este arquivo é dono só dos padrões. O caminho de toda entrega (fontes, o nó, antes de entregar) é do [Núcleo](nucleo.md); voz e quantidade são de [Conteúdo](conteudo.md); a gramática da decisão é de [Decisão](decisao.md). Regra que só vale numa forma mora no playbook dela.

Cada padrão tem a mesma forma: a regra, o caso que a criou, onde ela é cumprida e como o check confere.

| Padrão | Em uma linha |
|---|---|
| [A forma segue o conteúdo](#a-forma-segue-o-conteúdo) | O conteúdo escolhe a forma de cada parte e o tamanho da entrega; nenhum molde é padrão |
| [Três segundos](#três-segundos) | Numa passada de olho se vê de que se trata; toda frase tem um objeto concreto |
| [Página vista antes da entrega](#página-vista-antes-da-entrega) | Renderizada, com cada controle clicado, nos dois temas, no desktop e no celular |
| [Abertura ancorada](#abertura-ancorada) | A origem situa quem não viu a conversa |
| [Calibrar antes de montar](#calibrar-antes-de-montar) | Altura, profundidade e distância, decididas antes |
| [Escopo transversal](#escopo-transversal) | O todo primeiro, com o recorte destacado |
| [Figura desenha, tabela ordena](#figura-desenha-tabela-ordena) | Tabela de frases não é figura |
| [Resposta copiável leva a origem](#resposta-copiável-leva-a-origem) | O texto colado se entende sem a página |
| [Produto durável](#produto-durável) | O estado leva data; a forma de explicar dura |

## A forma segue o conteúdo

**A regra.** O que a parte precisa mostrar escolhe a forma dela. O par "texto de um lado, figura do outro" é uma das formas, e não o padrão: preencher o molde parte por parte produz um documento arrumado que não ensina. Antes da forma vem a profundidade: o que o leitor precisa saber de base para a pergunta fazer sentido, relido na fonte.

| O conteúdo é | A forma é | No kit |
|---|---|---|
| Uma tela do produto | A tela real inteira, uma por linha, em largura de desktop, com o estado dito: main, dev com o commit, proposto | `<d-part desk>` com `<w-fig state="…">`; o print real em `w-shot`, ou a tela no design system do produto ([Design](visual/design.md#o-produto-de-quem-pede)) |
| Uma regra que é transição: um modo, um gesto, antes e depois | Uma peça que o leitor mexe e vê trocar | `<w-states>` |
| Uma regra que é conta | Uma conta com as entradas do caso, que o leitor altera | `<w-sim>`, com a fórmula copiada da fonte e a fonte no `d-src` |
| Uma comparação entre opções, modos ou versões | A matriz com todas as situações possíveis, gerada da fonte | `w-matrix` ou tabela de valores curtos, com o `d-src` dizendo o script, o commit e a data |
| Um caminho, uma ordem, uma causa | Um esquema | `w-flow`, `w-layers`, `w-timeline` |
| Um conceito de quem pediu | O desenho dele como ele é no projeto real, sem pô-lo em dúvida | A fonte do projeto dá os nomes e as partes |

- **A menor forma.** Uma dúvida é uma página; não vira aula porque a conversa foi longa. "Aula" é o nome do que foi pedido como aula.
- **As abas seguem o pedido e o material.** Abas servem quando separam trabalhos diferentes do leitor: aprender (Aula), testar (Na tela, limpa), responder (Dúvidas) e consultar o que já vale (Leis). Não servem para fatiar uma resposta única nem para dar volume. Uma pergunta, uma página, sem barra de abas.
- **Um caso atravessa a página.** A mesma pessoa e os mesmos números do começo ao fim. Número de figura vem do sistema (o motor, o script, o registro), com a origem dita; número digitado de cabeça não entra.
- **Nunca um exemplo só numa comparação.** Com um caso não dá para ver se a regra é coerente; a matriz mostra todos, e o caso do pedido fica marcado nela.
- **Tela de produto não é fragmento.** Um card entra inteiro. Dado solto, wireframe genérico e layout que o produto não tem fazem quem conhece o produto parar de ler. Lado a lado só o que é pequeno de verdade: três versões de um botão, o cabeçalho de um documento.
- **Esquema só quando há fluxo.** Um fluxograma de coisas que não acontecem em sequência é enfeite; destacar um pedaço de um todo que o leitor não entendeu não ajuda.

**O caso.** Numa sessão de uma semana sobre regras de energia, a aula saiu com todas as seções no par texto e figura: "você está se apegando demais ao pattern, eu queria que tivesse se apegado à profundidade do ensinamento". As telas eram fragmentos sem estado: "layout inexistente, não reconheço", "se for usar o card, usar ele na íntegra", "deixa cada card em uma linha", e não dava para saber se a figura era main, dev ou o proposto. Uma transição descrita em texto: "me dá um componente e deixa eu mexer, isso seria mil vezes melhor". Uma decisão com um caso: "se não colocar todos os cenários possíveis, não vamos saber se tem congruência". O que destravou foi o contrário de cada uma: a matriz de 16 situações nos três modos, gerada pelo motor, decidiu na hora; três versões de um botão lado a lado, em minutos; os recortes do PDF real em três estados (dev, branch, proposto) permitiram uma decisão com nuance que o texto não tinha permitido. No mesmo período, uma aula em abas foi reprovada onde a pergunta pedia uma página, e as abas Aula, Na tela, Dúvidas e Leis funcionaram onde havia os quatro trabalhos.

**Onde é cumprida.** Na [espinha](conteudo.md#3-espinha), que escolhe a representação de cada pergunta; no [roteamento](roteamento.md), que escolhe o tamanho; no kit, pelos componentes da tabela acima.

**O check.** Reprova conta de `<w-sim>` com erro e estado de `<w-states>` que não aparece. Avisa tela de produto sem `state` numa decisão, numa maquete ou na aba Na tela; print de produto com menos de 560px de largura no desktop; aula ou explicação com cinco partes ou mais, todas no par texto e figura; e matriz de comparação sem `d-src`.

## Três segundos

**A regra.** Quem abre a página entende, numa passada de olho, de que se trata e o que ela responde. Se não entende, para na segunda linha, e o material inteiro se perde.

- **A página responde à pergunta de quem pediu,** com o que foi lido no sistema. Recontar a conversa não é resposta, e refazer um documento reaproveitando os fatos do anterior repete o defeito: volte à fonte.
- **Toda frase tem um objeto concreto.** "Isolar a falha", "a regra vigente", "as duas versões", "a integração" não dizem qual falha, qual regra, quais versões. Escreva o nome da coisa e o dado do caso.
- **Estado vem com a consequência.** "O lint parou" e "o servidor recusaria salvar" não servem a quem lê: diga o que aquilo protege e o que muda para ele.
- **Termo técnico vem com o que ele protege ou faz,** em poucas palavras, na primeira aparição.
- **O desenho fala uma vez.** O que o ícone, a cor ou a figura já mostra não se repete em texto ao lado.
- **A página é o lugar.** Nada de "veja em", "leia em": o fato aparece aqui, e a fonte vai em uma linha no `d-src`.
- **Menos texto.** Depois de pronto, corte de 30% a 40% da prosa; o que sobra é o que a figura não diz.

**O caso.** Uma aula sobre os testes de um módulo foi devolvida com 23 anotações. A versão refeita cumpria a forma (origem, sem tabela de frases, termos definidos), passou no check e foi rejeitada do mesmo jeito: recontava a conversa em vez de responder à pergunta com o que está no repositório. As anotações apontavam frases sem objeto, estados sem consequência, texto repetindo o desenho e links mandando ler em outro lugar.

**Onde é cumprida.** No [Núcleo](nucleo.md#fontes-e-limites), que manda reler o fato na fonte; em [Conteúdo](conteudo.md), na revisão de frase; e na leitura final de [Antes de entregar](nucleo.md#antes-de-entregar): cinco segundos olhando só a primeira tela, e depois dizer de que se trata.

**O check.** Avisa link para fora do documento, fora do `d-src`. O resto é leitura: cumprir a forma não prova que a página responde.

## Página vista antes da entrega

**A regra.** Nenhum HTML é entregue sem ter sido aberto e usado: renderizado no desktop e no celular, no tema claro e no escuro, com cada controle clicado. Quem pediu não é o primeiro a descobrir que a aba troca sozinha ou que o tema escuro apaga a figura.

**O caso.** Na mesma semana: "quando eu clico nos controladores, ele muda de tab, tá inusável"; um board com o tema escuro quebrado, "não consegui visualizar nada"; e quinze comentários de layout que uma olhada na página teria evitado. "Layout é importante para mim, sem isso eu não vou revisar."

**Onde é cumprida.** No [check](../scripts/check.mjs), que roda em toda entrega em HTML: três larguras, os dois temas e os controles, um a um. Depois dele, olhe os screenshots que ele grava (390, 1280 e o escuro) antes de responder. O kit tem os dois temas nos tokens: cor fora de token é o que quebra no escuro.

**O check.** Reprova contraste abaixo do mínimo no tema escuro, controle que troca a aba aberta, aba que não abre o próprio painel, erro de script ao clicar e rolagem horizontal. Informa quantos controles clicou.

## Resposta copiável leva a origem

**A regra.** Todo texto que a página entrega para ser colado em outro lugar se entende sem abrir a página. Cada resposta copiada é um bloco autossuficiente:

```
<identificador> · <pergunta completa, como aparece na página>
Resposta: <rótulo da opção> [<código>]
Comentário: <texto>
```

- O comentário só entra quando existe, em linha própria.
- Item com comentário e sem opção marcada também sai, com `Resposta: nenhuma opção marcada`.
- Vários itens saem na ordem da página, separados por uma linha em branco.
- A prévia "o que vai ser copiado" mostra exatamente o texto que o botão copia.
- O botão de cada decisão copia o bloco inteiro, nunca só o código.

**O caso.** Uma página de decisões copiava só o código de cada opção, um por linha: `pode deploy DEV`, `dias segunda`. Quem recebeu não sabia a que pergunta cada linha respondia, e o autor teve de reformatar tudo à mão.

**Onde é cumprida.** No kit, e só nele: `<d-answer>` (a resposta de uma decisão, com as opções, o comentário, a prévia e o botão) e `<d-answers>` (todas as respostas da página num texto só). O formato sai de uma única função do `kit.js` (`HD.bloco`), usada pelos dois. Vale na aba de cada decisão do Decidir, na tab Dúvidas da Aula, nos boards do canvas e na pergunta da Maquete. Página com resposta escreve os componentes; ninguém escreve botão de copiar à mão. Veja [os componentes](kit/componentes.md#d-answer).

- `ref` é o identificador que a página mostra. Sem ele, o kit usa "Decisão N" na aba `duvida-N`, "Dúvida N" dentro da tab Dúvidas e "Pergunta N" fora delas.
- `q` é a pergunta completa. Sem ele, o kit usa o título da primeira parte da aba, que em Decisão é a própria pergunta.
- Cada opção é um `li` com `code` ("1A") e `label` ("A · Sem teto"); a recomendada leva `rec`.

**O limite.** Sem script (o board pré-renderizado no canvas de Design), a resposta mostra a tabela e os códigos e esconde comentário, prévia e botão; quem decide responde digitando no chat, onde o board já está.

**O check.** Reprova dúvida (`duvida-N`) sem `<d-answer>`, opção sem `code` ou `label` e cópia escrita à mão fora do kit (`navigator.clipboard`, `execCommand('copy')`).

## Abertura ancorada

**A regra.** Toda entrega começa pela origem que situa quem chega sem ter visto a conversa: onde estamos, a pergunta real em jogo e o que se pede de quem lê. A origem fica na altura do assunto. Ela não recua para o fundamento genérico quando o tema não é esse, e não começa no meio, pelo último estado da conversa.

- **Teste do estranho.** Título, caso e origem fazem sentido para quem abre a página daqui a um mês, sem a conversa. Se a frase só se entende com a memória do chat ("o último Full parou no lint"), ela ainda não é origem.
- **Título objetivo.** O título diz do que o documento trata. Slogan, metáfora e chamada de efeito ("O 5,5 aparece. A linha não mente.") envelhecem e não dizem o assunto.
- **Termo interno definido na primeira aparição.** Nome de suíte, de módulo, de gate ou de comando que só existe no projeto ganha uma frase na primeira vez que aparece, de preferência na figura que o mostra; o que sobra vai para os termos da origem.
- **O fundamento entra quando é o tema.** Uma aula sobre testes começa pelo que é um teste e pelos tipos; uma conversa sobre rodar os testes de um módulo em construção começa por esse módulo, essa suíte e essa dúvida, e resume o resto em uma linha.

**O caso.** Marco pediu um HTML didático sobre os testes do DietFlow. A pergunta real era: dá para rodar os testes do módulo com features ainda intermediárias sem afrouxar teste para passar e sem deixar a feature regredir? O Full cobre tudo? Os proofs de módulo e o de contexto clínico estão alinhados com a arquitetura? A aula abriu com "Do erro ao merge" e "O último Full parou no lint. Uma ficha de Dieta ainda precisa passar pelo Save.", com abas Full, Casos, Falhas e Provas. Era o meio da conversa, com jargão sem origem: lida um mês depois, não dizia de que se tratava. O conserto também não era abrir com "o que é um teste", porque o tema não era esse. A origem certa era: DietFlow, testes do módulo Dieta com a ficha em construção, na data; a pergunta acima; e o que se pede, conferir o recorte e decidir o que entra na rodada.

**Onde é cumprida.** No kit, pelo `<d-origin>`, logo abaixo da capa: `where` (onde estamos), `q` (a pergunta real), `ask` (o que se pede) e um `li term` por termo interno. Veja [os componentes](kit/componentes.md#d-origin). No cartão, a capa é a origem: a pergunta é o título, o caso é o `sub` e o `subject` diz onde estamos. Nos boards, a origem mora no mapa (`MAPA.onde` e `MAPA.pergunta`, em [formato](decisoes/formato.md)), e cada board herda dele. Em Explicar, as duas primeiras frases fazem o papel da origem. Toda base de `montar.mjs --novo` já traz a peça.

**O check.** Reprova documento com capa, fora do cartão e dos boards de uma série, sem `<d-origin>`; origem depois da primeira parte; origem sem `where` ou sem `q`; quatro ou mais termos internos sem definição (sigla ou código como E2E, FlowUI, m6, fora dos `li term` e das siglas de uso geral); e parte cuja pergunta é aberta ("O que…?", "Quais…?") respondida com "Sim." ou "Não.", sinal de que a frase responde à conversa e não ao título. Avisa origem com mais de 80 palavras (o glossário de termos fica fora da conta) e de um a três termos sem definição.

## Calibrar antes de montar

**A regra.** Antes de montar, a entrega fixa três medidas e as escreve para si, em uma linha cada. Elas não vão para o documento; vão para o trabalho, e a distância volta no fim como conferência.

| Medida | A pergunta | Padrão |
|---|---|---|
| **Altura** | Até que nível de pergunta ou decisão a entrega sobe? | A pergunta que quem pediu fez, com a decisão que ela destrava. Nem o fundamento do tema, nem só o último passo |
| **Profundidade** | Até onde cada coisa é explicada? | O que um dev olha para verificar se o trabalho está certo e enxergar o repositório de forma transversal: quem é dono, o que roda, o que cobre, o que fica de fora. Sem entrar em código, salvo quando a linha de código é a prova |
| **Distância** | Que temas a entrega percorre até dar o assunto por elucidado? | A lista de perguntas que precisam de resposta para a pergunta da altura fechar. Tema fora da lista fica fora; tema da lista sem parte é buraco |

**O caso.** No caso dos testes do DietFlow, a altura é a decisão de rodar os testes do módulo agora, e como, sem afrouxar teste e sem regressão. A profundidade é o que um dev confere: quais testes rodaram, se o Full contém todos, o que cada proof de módulo cobre, onde o proof de contexto clínico atravessa os módulos. A distância é a lista: o que o Full contém; quais proofs tocam o módulo; o que um teste vermelho significa com a feature em curso (defeito da feature ou expectativa velha); como ajustar sem generalizar que o teste está errado; se os proofs estão alinhados com a arquitetura além do módulo.

**Onde é cumprida.** No [Núcleo](nucleo.md#calibrar), entre achar o nó e escolher as figuras, e em [Antes de entregar](nucleo.md#antes-de-entregar), onde cada tema da distância é procurado na entrega.

**O check.** Não mede: a calibragem é leitura. A conferência é a lista da distância contra as partes.

## Escopo transversal

**A regra.** Quando a pergunta é sobre um recorte de um conjunto (alguns proofs entre todos, um módulo entre os módulos, uma camada entre as camadas), a primeira figura mostra o conjunto inteiro e destaca o recorte em outra cor. As partes seguintes abrem profundidade só no recorte. Quem lê vê o tamanho do todo, o lugar do recorte e o que ficou de fora, antes de entrar no detalhe.

**O caso.** Nos testes do DietFlow, o mapa certo põe todos os proofs juntos, com os do módulo em questão e o de contexto clínico destacados. Assim se vê se o Full contém todos, quais o recorte toca e quais ficam fora da rodada. Depois, cada proof do recorte ganha a sua parte.

**Onde é cumprida.** Na figura, com a caneta do kit: o conjunto em traço e o recorte com `mark`, que vale em `w-item`, `w-file`, `w-cell`, `w-layer`, `w-kv` e nos outros componentes listados em [componentes](kit/componentes.md). A legenda diz quantos são o todo e o recorte.

```html
<!-- Ilustração da forma: os nomes e a contagem vêm da fonte do projeto. -->
<w-fig cap="Os proofs do Full; os dois que a Dieta toca, em destaque">
  <w-list>
    <w-item title="Antropometria"></w-item>
    <w-item title="Dieta · ficha" mark></w-item>
    <w-item title="Contexto clínico" meta="atravessa os módulos" mark></w-item>
  </w-list>
</w-fig>
```

**O check.** Não mede o recorte; a [leitura pela figura](visual/design.md#leitura-pela-figura) confere se o todo e o destaque se veem sem a prosa.

## Produto durável

**A regra.** Um HTML didático é salvo, citado e canonizado; ele é feito para servir de referência sobre o assunto. O estado que ele mostra pode envelhecer rápido; a forma de explicar, não. Por isso o estado leva data e revisão (a data da capa, o commit, a branch, o run), e a explicação não depende de nada que só existia na conversa.

**O caso.** A aula dos testes do DietFlow descrevia um estado que ia mudar na semana seguinte. O que devia durar era o como: a pergunta, o mapa do todo com o recorte, o que um teste vermelho significa com a feature em curso. Sem origem e com a data só na conversa, nada disso durou.

**Onde é cumprida.** Na capa (`date`, e `ref` quando há revisão), na origem e no [acervo](acervo.md): a forma de explicar que funcionou vira candidata a padrão, fora do ciclo de release.

**O check.** Reprova capa sem data.

## Figura desenha, tabela ordena

**A regra.** A pergunta de cada parte se responde com um desenho feito de componentes (`w-*`): cena do produto ou esquema. Tabela é ficha: ordena valores curtos que já foram explicados, como a regra inteira no fecho, as Leis e o Roadmap. Tabela cujas células carregam frases é texto fingindo layout, e não conta como figura.

- **Célula curta.** Uma célula diz um valor, um estado ou um nome: "sim", "versão anterior", "16 de 16". A frase que explica o valor vai para a figura (o `sub` de um nó, o `meta` de um item) ou para a legenda.
- **Cada aba tem um desenho.** Fora de Leis e Roadmap, toda aba tem ao menos uma figura feita de componentes, além das tabelas.
- **A maioria é desenho.** Com três figuras ou mais, as desenhadas são maioria.
- **O que vira o quê.** Uma lista de casos com o mesmo atributo vira `w-list` com `tag`; uma comparação de casos contra critérios vira `w-matrix` com a coluna `who`; o que contém o quê vira `w-box`; uma escala de alcance ou de maturidade vira `w-layers`; um antes e depois vira `w-flow`.

**O caso.** A segunda versão da aula de testes do DietFlow tinha nove figuras; seis eram tabelas com células de 15 a 30 palavras, embrulhadas em `w-fig`. O "mapa transversal" pedido virou uma tabela com `mark` em algumas células: o todo e o recorte não apareciam. O check da época isentava tabela da conta de palavras por figura e contava tabela como figura, e a aula passou sem nenhum aviso.

**Onde é cumprida.** No playbook [Aula](playbooks/aula.md#aula-de-verificação), que traz a receita de figuras para testes, provas e CI, e nos componentes do kit. A `w-matrix` com coluna `who` deixa de ter células quadradas e aceita uma palavra por célula.

**O check.** Reprova tabela com três células ou mais acima de 15 palavras, aba sem figura desenhada e documento com mais figuras-tabela que figuras desenhadas (a tabela de `<d-answer>` e as abas Leis e Roadmap ficam fora da conta). Avisa célula isolada acima de 15 palavras.
