# Padrões · o que vale em todas as formas

Um padrão é uma regra que atravessa as formas: vale no cartão, na aula, na decisão, na montagem, na prova e na explicação, e não pertence a nenhuma delas. Cada um nasceu de uma entrega real que falhou e diz onde a regra é cumprida, para que nenhuma forma a reescreva por conta própria. Padrão novo pode nascer como candidato no [acervo](acervo.md) antes de entrar aqui.

Este arquivo é dono só dos padrões. O caminho de toda entrega (fontes, o nó, antes de entregar) é do [Núcleo](nucleo.md); voz e quantidade são de [Conteúdo](conteudo.md); a gramática da decisão é de [Decisão](decisao.md). Regra que só vale numa forma mora no playbook dela.

Cada padrão tem a mesma forma: a regra, o caso que a criou, onde ela é cumprida e como o check confere.

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

**O check.** Reprova documento com capa, fora do cartão e dos boards de uma série, sem `<d-origin>`; origem depois da primeira parte; origem sem `where` ou sem `q`. Avisa origem com mais de 80 palavras.

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
