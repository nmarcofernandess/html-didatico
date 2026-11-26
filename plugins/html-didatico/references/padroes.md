# Padrões · o que vale em todas as formas

Um padrão é uma regra que atravessa as formas: vale no cartão, na aula, na decisão, na montagem, na prova e na explicação, e não pertence a nenhuma delas. Cada um nasceu de uma entrega real que falhou e diz onde a regra é cumprida, para que nenhuma forma a reescreva por conta própria.

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
