# Casos de uso das sete entradas

Walkthroughs de autoria e inspeção, não avaliações automatizadas de um modelo.
O validador estrutural verifica o pacote; estes casos verificam o significado
das instruções. Os exemplos em `examples/` foram produzidos em revisões
anteriores, com os nomes e o estilo da época, e seguem só como registro; o
aceite visual atual são os exemplos-ouro do kit.

| Entrada | Pedido exercitado | Fonte e aceite |
|---|---|---|
| HTML Didático (automática) | “Faz um HTML didático do que a gente acabou de discutir.” | A conversa: a entrada passa pelo núcleo, recolhe a pergunta em pauta e o que já foi decidido, escolhe a forma pelo roteamento e diz, em uma linha, qual escolheu e por quê. Não devolve “cartão ou aula?”. |
| Cartão | “Me mostra por que a idade deste Cálculo está errada.” | O [cartão-ouro](../plugins/html-didatico/references/kit/ouro/cartao.html): a pergunta, o caso em uma linha e três telas do mesmo caso. |
| Aula | “Explique em HTML como o plugin separa suas entradas e referências.” | Estrutura do pacote; a [explicação-ouro](../plugins/html-didatico/references/kit/ouro/explicacao.html) situa fontes, escolha e leitura progressiva com componentes, sem copiar status de outro projeto. |
| Decidir, maquete | “Compare duas posições para a ação Salvar.” | Hipótese explicitamente proposta; a [maquete-ouro](../plugins/html-didatico/references/kit/ouro/maquete.html) usa o mesmo esqueleto em wireframe, a caneta só na região em disputa e uma recomendação, sem alegar implementação. |
| Decidir, boards | “Transforme as perguntas abertas de Números e unidades em boards.” | [Exemplo-ouro](../plugins/html-didatico/references/decisoes/exemplos/numeros-e-unidades.mjs); com `--html`, o motor escreve mapa e boards como documentos do kit que passam no check; com a pasta `project/`, escreve os artboards pré-renderizados e o `canvas.json`, e recusa canvas sem o design system HTML Didático. |
| Decidir, HTML | Codex, sem canvas: “decide comigo o teto de 999 mcg”. | O [decidir-ouro](../plugins/html-didatico/references/kit/ouro/decidir.html): uma aba por decisão, três opções com figura no mesmo caso, a recomendada, “Responda no chat” com `<d-answer>`, “Copiar respostas” e a aba Leis. Marcar duas respostas, uma com comentário, e colar: cada bloco traz a pergunta, o rótulo e o código e se entende sem a página. |
| Montagem | “Mostre como Summary compõe Panel e Status.” | [Fixture de código](fixtures/components.jsx); a [montagem-ouro](../plugins/html-didatico/references/kit/ouro/montagem.html) distingue prop de children com `w-box` (contínua, slot, proposta) e o recorte literal em `w-code`. |
| Prova | “Apresente o resultado da validação deste pacote.” | `python3 scripts/validate-package.py`; a [prova-ouro](../plugins/html-didatico/references/kit/ouro/prova.html) apresenta veredito, metadados e critérios observados, com `w-shot` vazio onde o print falta, sem screenshot inventado. |
| Explicar | “Explique por que uma tag nova não atualiza uma instalação fixada na antiga, em texto.” | Referência fixa do marketplace; [resposta](examples/clareza.md) mantém cadeia causal e não gera HTML. |

Os exemplos-ouro do kit, [cartão](../plugins/html-didatico/references/kit/ouro/cartao.html), [passo a passo](../plugins/html-didatico/references/kit/ouro/passo-a-passo.html),
[explicação](../plugins/html-didatico/references/kit/ouro/explicacao.html), [aula](../plugins/html-didatico/references/kit/ouro/aula.html), [decidir](../plugins/html-didatico/references/kit/ouro/decidir.html), [prova](../plugins/html-didatico/references/kit/ouro/prova.html), [montagem](../plugins/html-didatico/references/kit/ouro/montagem.html) e [maquete](../plugins/html-didatico/references/kit/ouro/maquete.html), são o caso de regressão visual:
`node plugins/html-didatico/scripts/check.mjs` termina sem falhas nos oito e na
[folha de peças](../plugins/html-didatico/references/kit/pecas.html).

## Casos de fronteira

| Pedido/contexto | Rota e resultado esperado |
|---|---|
| “Explique o sistema”, sem pedir visual | Explicar, em texto. |
| No meio de uma conversa sobre rodar os testes de um módulo com a feature em construção: “faz um HTML didático disso” | Aula ou prova, aberta por `<d-origin>` na altura da pergunta (o módulo, a suíte, a dúvida de afrouxar teste ou regredir a feature), sem abrir por “o que é um teste” nem pelo último estado (“o último Full parou no lint”). A primeira figura mostra todos os proofs com o recorte destacado; cada tema da distância tem a sua parte. |
| Uma entrega que destravou a conversa com uma forma que ainda não está no kit | Depois da entrega, uma candidata em `acervo/candidatos/` na branch `acervo`, pelo formato de [Acervo](../plugins/html-didatico/references/acervo.md); sem escrita no repositório, o bloco no fim da resposta. Nenhuma versão muda. |
| “Explique o sistema em HTML” | Aula, modo sistemas. |
| “Blueprint de onde fica o botão” | Decidir, como maquete: o eixo é layout. |
| “Como este botão recebe children e props?” | Montagem: o eixo é composição/API. |
| “Wireframe do relatório de prova” | Prova: planejamento de verificação. |
| Renderer oficial existe; nenhum pack foi gerado | Prova segue contrato/renderer; não cria prova manual. |
| Renderer existe, mas falhou | Diagnóstico no owner; não usar modo manual como fallback oficial. |
| Existência de renderer não determinada | Registrar a lacuna; não fabricar prova oficial. |
| Projeto confirmado sem renderer, antes da execução | Planejamento Rev. 0, status não executado e slots vazios. |
| Mesmo projeto, resultado real obtido | Preencher o mesmo arquivo e atualizar revisão/veredito. |
| “Faça um mural e cite este pack” | Aula, anatomia mural, com link para o pack; mural não vira prova. |
| “Revise só a pontuação” | Recurso interno de escrita; sem HTML obrigatório. |
| “Me mostra por que a idade deste Cálculo está errada”, no meio da conversa | Cartão, direto ou pela entrada automática: depois de entender e achar o nó, uma página a partir de `montar.mjs --novo cartao`, com a pergunta, o caso em uma linha e as telas que a explicação cita. O [cartão-ouro](../plugins/html-didatico/references/kit/ouro/cartao.html) é o caso. |
| Cartão pronto, antes de entregar | Duas leituras: sem a conversa (título, caso e primeira tela bastam) e só pela figura (cada frase da explicação aparece numa tela, na anotação ou na legenda). Até 90 palavras fora das figuras. |
| A dúvida pede mais de três telas ou dois casos | Aula, com uma parte por pergunta; não um cartão esticado. |
| O pedido traz uma explicação longa de quem domina o assunto | Aula: o raciocínio e os exemplos dela ficam, cada exemplo como figura. Não vira cartão nem resumo. |
| “Me mostra como o Peso se comporta”, sem defeito em pauta | Pedido de apresentação: o nó é a regra que gera os casos. Cartão se cabe em até três telas do mesmo caso, Aula se não. A entrega conta o que existe, com um caso do começo ao fim; não inventa dor, virada nem tentativa fracassada. |
| “Me mostra o que a outra IA fez e se foi a melhor saída” | Problema na mesa, em Cartão ou Aula conforme o tamanho: o que prendia, as tentativas com o caso em que cada uma quebra, a virada e a regra menor. A entrega separa o que foi visto rodando do que foi lido e traz a objeção mais forte, com o resultado da conferência. |
| O agente já tem um resumo do assunto, feito por ele ou por outro chat | O resumo é pista: cada fato que entra é relido no código, na spec, na decisão ou na tela. |
| “Me dá um exemplo de aula” | Aula, playbook Aula: aponta a [aula-ouro](../plugins/html-didatico/references/kit/ouro/aula.html); nunca responde que não há exemplo. |
| “Faça uma aula de como a dose é calculada” | Aula, playbook Aula: só a tab Aula, sem barra de tabs. |
| “Uma aula e um teste do pedido de exames” | Playbook Aula com Aula e Na tela; o protótipo funciona no clique e mostra só o decidido. |
| “Estou entre duas faixas para o Triglicerídeos” | Decidir: a pergunta com o caso, as duas faixas no mesmo resultado, a recomendada e “Responda no chat”. Se o assunto também precisa ser ensinado, Aula com as tabs Aula e Dúvidas, na mesma gramática. |
| Aula existente; o usuário respondeu “2A” | Mesmo documento: a dúvida sai, a lei entra datada, Aula e Na tela refletem; nada contradiz uma lei sem nova decisão. |
| “C-03 e R-01 da spec: decide comigo vendo a tela” | Decidir: os códigos saem da entrega; cada pergunta traz o caso e o fato de dev conferido. Boards com canvas de Design; HTML com uma aba por decisão sem ele. |
| “Ícone de lápis ou de engrenagem no cabeçalho?” | Decidir, como maquete: escolha visual pontual, as duas lado a lado; não um board por decisão. |
| Codex, sem canvas: “um board por decisão para a spec 162” | Decidir, HTML de `montar.mjs --novo decidir`: uma aba por decisão, opções com nome e figura no mesmo caso, recomendada e “Responda no chat”, sem código de nota. O check reprova HTML próprio, código de nota, “Uma possibilidade” e dúvida sem resposta. |
| “Faz um html didático disso”, depois de uma conversa sobre escolhas, em que duas ficaram abertas e três foram decididas | Entrada automática: Decidir. As duas abertas vão para a mesa, cada uma na gramática inteira; as três decididas entram em Leis, com a frase de quem decidiu e a data. |
| “Organiza isso pra mim”, depois de uma conversa longa sobre como um módulo funciona, sem escolha aberta | Entrada automática: Aula, pedido de apresentação. Não inventa dúvida nem dor. |
| “Faz um html didático”, e a conversa serve tanto a um cartão quanto a uma aula | Conta as perguntas e as telas: até três telas do mesmo caso, Cartão. Só pergunta se duas leituras mudam a entrega, e pergunta pelo resultado, não pelo formato. |
| "Como o modo muda os cenários?", com 16 situações de treino e três modos | Aula ou Decidir: a matriz inteira gerada do motor, com o `d-src` dizendo script e commit, e o caso do pedido marcado; nunca um exemplo só. A troca de modo entra em `w-states`. |
| "A gestante precisa de quanto a mais por trimestre?" numa fila de decisões | Decidir classifica como científica: um estudo com a fonte e `<d-answer study>` (aceito ou contesto), sem opções A, B e C com recomendada. |
| Aula com protótipo em que um botão do protótipo fecha a aba | O check clica cada controle e reprova "controle que troca a aba aberta". |
| Página com cor literal que some no tema escuro | O check mede o contraste no tema escuro e reprova. |
| O usuário chama `/html-didatico:aula` para o que caberia num cartão | A escolha dele governa: Aula, do tamanho que o conteúdo tem. |

Avalie as rotas contra `references/roteamento.md` no pacote. Exercite a regressão
do renderer com fontes que comprovem sua existência e ausência do pack; o título
de uma referência antiga não pode justificar fallback manual.
