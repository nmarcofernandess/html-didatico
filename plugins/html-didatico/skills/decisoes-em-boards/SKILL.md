---
name: decisoes-em-boards
description: Use quando Marco precisa decidir questões de produto, modelo ou arquitetura que ainda estão em lista, cartão ou prosa (de spec, canvas, revisão, recenso ou recomendação) e ele não consegue percorrê-las — códigos como C-03 ou R-01, referências a notas de outras páginas, "confirma no desenho X", texto longo sem a tela. Também quando ele pedir "decisões didáticas", "um board por decisão", "mapa de como decidir", "quadros contando a história", "como está em dev e como ficaria", ou quiser decidir vendo os componentes reais do DietFlow DS.
---

# Decisões em Boards

Cada decisão vira um board de canvas de Design que conta a história em quadros,
com componentes reais do DietFlow DS; um mapa abre a página e diz como decidir.
Marco decide olhando a tela, não lendo código de nota.

Escolha visual pontual (dois ícones, duas palavras) não é isto: vai no board
Foco, uma por vez. Esta skill é para decisão que muda comportamento, dado ou
regra e precisa de contexto para ser respondida.

## O que se entrega

Uma página do canvas com:

1. **Mapa** (`CadastroDecisoes.dc.html` ou o nome dado em `MAPA['arquivo']`): como
   decidir em três passos e as decisões em grupos — **Mudam o sistema**, **Ficam
   como em dev**, **Arrumação** — cada linha com a recomendação em poucas palavras
   e o link para o board. Embaixo, "Já decidido" com o que não volta à mesa.
2. **Um board por decisão** (`D01` a `Dnn`), vertical, sempre na mesma gramática:

| Quadro | Título | Mostra |
|---|---|---|
| 1 | O que acontece | A situação concreta, com o caso real, que faz a pergunta existir |
| 2 | Em dev | Como o sistema faz em dev, na peça que a tela usa |
| 3 | Com a recomendação | Como fica se ele aceitar |
| 4 | Sua resposta | Opções A, B (C), a recomendada marcada, e "Responda no chat: 1A ou 1B" |

Quando a recomendação é **manter dev**, o quadro 2 se chama "Em dev, que é a
recomendação" e o 3 vira "Se fosse a outra opção": ele vê o que estaria recusando.
Decisão sem tela própria (arrumação de boards, por exemplo) pode ter dois quadros
antes da resposta.

Cada quadro é: título, **uma frase** que diz o líder (o status, o nome, a coluna
que muda), e uma figura com o componente do DS no estado que prova a frase. A
frase carrega o líder porque, no celular, a tabela rola para o lado.

## Como fazer

1. **Levantar as decisões.** Leia a fonte (spec, canvas, cartões). Uma decisão é
   uma pergunta com duas ou três opções e uma recomendação. Cartão que junta várias
   perguntas vira várias decisões; o que já foi decidido vai para "Já decidido".
2. **Apurar dev antes de desenhar.** Para cada decisão, confirme em `origin/dev`
   (só leitura: `git show origin/dev:<arquivo>`, `git grep … origin/dev`) a peça
   que a tela usa, os rótulos e os dados reais do catálogo (nomes, faixas,
   condições). O quadro "Em dev" mostra a forma de dev, não a do modelo. Um fato
   que você não confirmou não entra no board; vira lacuna dita no chat.
3. **Escrever cada decisão** no arquivo de decisões (formato e exemplos reais em
   [formato.md](../../references/decisoes/formato.md)):
   - Pergunta (`q`) concreta, com o caso: "O Lipidograma é um exame com quatro
     itens ou um atalho para quatro exames?", nunca "Composto ou atalho?".
   - Nenhum código (C-03, R-01, Q-04, "Aula 7", "desenho 2.2") no board. Se o fato
     vem de outra página, mostre o fato.
   - Opções em uma frase cada; a recomendada em `pick`.
   - Ordem: as que mudam o sistema primeiro, depois as que ficam, depois arrumação.
4. **Escolher a peça de cada figura** em [pecas.md](../../references/decisoes/pecas.md).
   Use a peça existente; para outro domínio, componha com os componentes do DS
   (README e `index.d.ts` do DS) e só crie peça nova em [pecas.js](../../references/decisoes/pecas.js) quando
   dois boards precisarem dela.
5. **Gerar:** `python3 <plugin>/references/decisoes/gerar.py <decisoes.py> <canvas>/project`,
   onde `<plugin>` é a pasta instalada deste plugin (a que contém `skills/` e
   `references/`; o [motor](../../references/decisoes/gerar.py) acha peças e CSS ao lado dele).
   O motor valida o arquivo, escreve mapa, boards, `decisoes.css` e o `canvas.json`
   da página, e imprime a lista de arquivos a publicar.
6. **Publicar e conferir** como em [canvas.md](../../references/decisoes/canvas.md):
   ler o artifact antes, publicar com `root`, abrir cada board no modo Play,
   passar o `olho-semicerrado`, corrigir e publicar de novo.
7. **Versionar as fontes** (arquivo de decisões e `project/`) na pasta da spec ou no
   devkit, com push, antes de encerrar.
8. **No chat:** o link, em uma linha como responder, o que mudou desde a versão
   anterior e o que não foi conferido. A decisão é dele: nada é aplicado antes da
   resposta.

## Armadilhas já vistas

| Sintoma | Causa | Faça |
|---|---|---|
| Status sumido atrás da lixeira | Coluna "Ações" fixa (`stickyEnd`) cobre a vizinha em tela estreita | Figura sem coluna de ações; a decisão nunca é sobre a lixeira |
| Coluna cortada numa figura lado a lado | Tabela em meia largura rola para o lado | Tabela sempre em largura inteira; lado a lado só busca, gráfico e card |
| Ícone vira bolinha | O bundle do DS não embute aquele glifo lucide | Confira em `components/src/icons.js` do DS; se faltar, use `lucide(corpo)` com o corpo de `node_modules/@iconify-json/lucide/icons.json`; nunca desenhe |
| "1.2 mg/L" no gráfico | Eixo Y e rótulo padrão do `LineChartCard` imprimem ponto | A peça `chart` já esconde o eixo Y e formata o rótulo em pt-BR |
| "Fig. 1" ao lado do número 1 | Plaqueta repete o número do quadro | Sem plaqueta; o número grande basta |
| Board cortado no canvas | Altura do artboard menor que o conteúdo | Ajuste `ALTURAS` e confira no modo canvas que a faixa "Responda no chat" aparece |
| Write negado no devkit | Hook do DietFlow bloqueia edição com a pasta em `main` | Trabalhe numa worktree do devkit (`.worktrees/<nome>`) e publique em `main` por fast-forward |

## Vizinhas

Uma decisão de layout sem DS real, com alternativas desenhadas, é HTML Wireframe.
Dúvidas dentro de uma aula ficam na tab Dúvidas do playbook Aula de HTML Didático.
Veja o [roteamento](../../references/roteamento.md).

## Limites

- Só leitura em `origin/dev` e no banco; nenhum código de produto muda aqui.
- Board não aplica decisão: ele pergunta. Depois do sim, a decisão vai para a spec,
  o plano ou o canvas dono, pelo fluxo daquele trabalho.
- Copy dos boards passa por `strings-safadas`: frase invariante ou estrutura, nunca
  prosa que só vale para a amostra.
