# Decisão · uma gramática, a saída conforme o host

Uma decisão é uma pergunta de quem pede, com duas ou três saídas, cuja resposta muda o comportamento, o dado, a regra ou a tela. Ela se decide olhando o caso, e não lendo código de nota.

Este arquivo é dono da gramática. A tab Dúvidas da [Aula](playbooks/aula.md#dúvidas), os [boards](decisoes/boards.md) do canvas de Design, o HTML com uma aba por decisão e a comparação da [maquete](playbooks/maquete.md) são saídas dela: mudam a moldura e as peças, e a gramática fica.

## A gramática

| Parte | Mostra |
|---|---|
| A pergunta | O caso real e as saídas, na própria pergunta: "Triglicerídeos sem jejum: desejável abaixo de 150 ou de 175 mg/dL?" |
| O que acontece | A situação concreta que faz a pergunta existir |
| Comparando | As saídas no mesmo caso, cada uma com a figura e o resultado. O estado atual do produto é uma delas, conferido na fonte. A evidência mora aqui: a fonte, os números, como o mercado faz |
| Sua resposta | As opções A, B e, se houver, C, uma frase cada; a recomendada marcada; "Responda no chat: 2A ou 2B"; o comentário e o botão que copia a resposta com a pergunta junto, num `<d-answer>` ([Padrões](padroes.md#resposta-copiável-leva-a-origem)) |

- **A pergunta traz o caso.** "O Lipidograma é um exame com quatro itens ou um atalho para quatro exames?", nunca "Composto ou atalho?".
- **Nenhum código de nota** (C-03, R-01, D04, "quadro 18", "desenho 2.2"). Se o fato vem de outra página, mostre o fato, ou leve a ele por link.
- **A opção se chama pelo que faz:** "A · Sem teto", nunca "Uma possibilidade".
- **Uma figura por opção, todas com o mesmo caso e o mesmo número.** O porquê está nas figuras; a opção cabe em uma frase.
- **Regra que vale para muitas situações se decide na matriz inteira.** Um caso só não mostra se a regra é coerente: gere da fonte todas as situações (as 16 combinações, os três modos) e marque nela o caso da pergunta. O `d-src` diz o script, o commit e a data.
- **Cada tela diz de que estado é:** `state` em `w-fig`, com main, dev e o commit, ou proposto. Tela inteira vai uma por linha (`d-part desk`); lado a lado só a peça pequena, como três versões de um botão.
- **Regra que é transição ou conta entra mexível** (`w-states`, `w-sim`): quem decide experimenta em vez de ler a descrição.
- **A recomendação escolhe uma opção.** "Confrontar em bancada" ou "comparar antes de propor" não é recomendação: se a fonte ainda não deixa escolher, a decisão não está pronta e entra na resposta do chat como pendência, fora do documento.
- **Quando a recomendação é manter o que existe,** o estado atual vem primeiro e diz isso; a outra opção mostra o que quem decide estaria recusando.
- **A decisão é de quem pede.** Nada é aplicado antes da resposta.

## Levantar e apurar

1. **Levante as decisões.** Leia a fonte: a spec, o canvas, os cartões, a conversa. Cartão que junta várias perguntas vira várias decisões.
2. **Classifique cada pergunta antes de desenhar opções.** A forma boa não salva o enquadramento errado.

   | A pergunta é | Sinal | O que sai |
   |---|---|---|
   | Já respondida | Quem decide já disse, na conversa ou numa lei | Nada na mesa: vai para Leis, com data e origem |
   | Técnica ou de produto | As saídas são todas defensáveis; escolher é preferência, custo ou risco | A gramática inteira: opções no mesmo caso, com a recomendada |
   | Científica | Existe resposta na evidência: literatura, diretriz, norma, medição | Um estudo: o que a evidência diz, a fonte, a conclusão e o que muda no sistema. Quem decide aceita ou contesta |

   Pergunta científica não vira cardápio: opções A, B e C com "recomendada" tratam como gosto o que tem resposta. O estudo usa `<d-answer study>`, com as opções "Aceito a conclusão" e "Contesto", sem recomendada, e a fonte num `d-src`.
3. **Apure o estado atual antes de desenhar.** Para cada decisão, confirme na fonte a peça que a tela usa, os rótulos e os dados reais (nomes, faixas, condições). A fonte é o código e os dados da versão que o produto usa, só leitura (por exemplo, `git show <branch>:<arquivo>` e `git grep … <branch>`). A tela entra remontada em wireframe, como em [O produto de quem pede](visual/design.md#o-produto-de-quem-pede). Fato não confirmado fica fora e vira lacuna dita no chat.
4. **Ordene.** Primeiro as que mudam o sistema, depois as que ficam como estão, depois arrumação.

## A saída

| Situação | Saída | Como |
|---|---|---|
| Canvas de Design do Claude | Um mapa e um board por decisão, com os componentes do kit | [Boards](decisoes/boards.md) |
| Sem canvas: Codex, Cursor, terminal, outro produto | Um HTML com uma aba por decisão e a aba Leis | [Abaixo](#html-com-uma-aba-por-decisão) |
| A decisão nasce dentro de uma aula | A tab Dúvidas da aula | [Playbook Aula](playbooks/aula.md#dúvidas) |
| A pergunta é de layout: onde fica, como se organiza, como ficaria a tela | Maquete, com as alternativas lado a lado quando há mais de uma | [Playbook Maquete](playbooks/maquete.md) |

Em "Comparando", o HTML põe as opções lado a lado. O board, vertical, mostra as mesmas saídas em quadros seguidos, "Hoje" e "Com a recomendação". A maquete mantém o mesmo esqueleto nas alternativas e destaca só a diferença.

Fora do canvas de Design, não monte boards em HTML próprio: a saída é o HTML do kit. Os dois saem dos mesmos componentes.

## HTML com uma aba por decisão

Crie o arquivo pela cópia do [decidir-ouro](kit/ouro/decidir.html), a partir da raiz do plugin, e troque o conteúdo:

```
node scripts/montar.mjs --novo decidir <destino.html>
```

- **Uma aba por decisão** (`d-tabs` com um `d-tab` por decisão), numeradas de 1 a n, com o nome curto da decisão. Cada painel tem `id="duvida-n"`, para o link e para a resposta "2A". Com uma decisão só e nenhuma lei, a página é a decisão, sem barra de abas.
- **Dentro da aba,** a pergunta como título da primeira `d-part` e três partes: "O que acontece"; "Comparando", com uma `w-fig` por opção, cada uma com o `state`, a recomendada com a caneta: em `<d-cols n="3">` quando a peça é pequena, uma por linha em `<d-part desk>` quando é a tela inteira; "Sua resposta", com um `<d-answer>`: um `li` por opção, com `code` ("2A"), `label` ("A · Sem teto") e `rec` na recomendada. O componente monta a tabela, o chip "Recomendada", "Responda no chat", o comentário e o botão que copia o bloco com a pergunta.
- **Depois das abas,** um `<d-answers>` junta as respostas marcadas num texto só, com a prévia exata do que vai ser copiado.
- **A aba Leis** fecha a barra quando algo já foi decidido: uma tabela **Data | Lei | Origem**, como na [Aula](playbooks/aula.md#leis).
- **Quando a decisão é sobre a tela,** o produto em uso entra como print, ao lado da proposta.
- Os componentes são os do [kit](kit/componentes.md) e o desenho segue [Design](visual/design.md); o arquivo cumpre o [contrato HTML](html-portatil.md).

Quando o [check](../scripts/check.mjs) roda, ele reprova página fora do kit, código de nota, opção sem nome, decisão sem recomendada (fora do estudo), estudo sem fonte, decisão sem "Responda no chat" ou sem `<d-answer>`, e botão de copiar escrito à mão; e avisa tela sem `state`.

## O ciclo

Quando quem pede responde:

1. A decisão sai da mesa.
2. A resposta vira lei, com data e origem.
3. A aula do assunto, quando existe, passa a mostrar a decisão, como manda [o ciclo da Aula](playbooks/aula.md#o-ciclo).

A entrega pergunta e não aplica. Depois do sim, a decisão vai para a spec, o plano ou o canvas dono, pelo fluxo daquele trabalho.

## Na resposta do chat

O arquivo ou o link, em uma linha como responder, a recomendação de cada decisão, o que mudou desde a versão anterior e o que o [Núcleo](nucleo.md#antes-de-entregar) pede de toda entrega: o que foi visto rodando, o que foi lido e a objeção mais forte. O que não foi conferido na fonte entra como limite.
