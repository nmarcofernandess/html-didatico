# HTML Didático

Plugin portátil para transformar explicação técnica em documento HTML que se
entende sem tradutor: manuais, murais, explicações de sistema, pranchas de
decisão e HTMLs de proof. Funciona em Claude Code, Codex e Cursor.

## O que o plugin exporta

| Skill | Responsabilidade |
|---|---|
| html-didatico | O desenho: HTML autocontido, anatomia visual própria em cinco direções (A manual, B editorial, C prova final, D prancha de decisão, E blueprint de composição), com primitivos para explicar sistemas e a referência de HTML de proof. |
| explain-clearly | O significado: reconstrói objetos, causas e consequências a partir das fontes, antes de qualquer frase. |
| writing-clearly-and-concisely | A frase: voz ativa, termos concretos, só as palavras necessárias. |

Um HTML real por direção fica em
`plugins/html-didatico/skills/html-didatico/references/exemplos/`. O primeiro,
o quickstart do EscalaFlow (10/06/2026), é o documento de onde o estilo nasceu.

## Blueprint de composição

A Direção E investiga mapas e patterns do projeto e mostra a montagem dos
primitivos ao consumidor específico. Componentes aninhados ficam à esquerda;
contratos, props e mods, à direita. Novas peças e props aparecem como propostas.

- [Playbook](plugins/html-didatico/skills/html-didatico/references/blueprint-componentes.md)
- [Receita HTML exemplar](plugins/html-didatico/skills/html-didatico/references/exemplos/E-blueprint-componentes.html)

O HTML é documentação visual, não código de produto nem prova de runtime.

## Instalação

Instale uma release identificada por tag. O repositório é privado: o host
precisa da sua credencial do GitHub. No Codex, use o endereço SSH.

Codex:

    codex plugin marketplace add git@github.com:nmarcofernandess/html-didatico.git --ref v1.1.0
    codex plugin add html-didatico@html-didatico

Claude Code:

    claude plugin marketplace add nmarcofernandess/html-didatico@v1.1.0
    claude plugin install html-didatico@html-didatico

Cursor:

    agent plugin marketplace add https://github.com/nmarcofernandess/html-didatico --git-ref v1.1.0

Depois, em `/plugin`, instale HTML Didático no escopo user.

Para atualizar: `codex plugin marketplace upgrade html-didatico`,
`claude plugin marketplace update html-didatico` seguido de
`claude plugin update html-didatico@html-didatico`, ou
`agent plugin marketplace update`. Abra uma nova task para recarregar as skills.

## Origem

As skills viveram no Superflow (`plugins/superflow/skills/`) de 06/07/2026 a
13/09/2026, quando o commit `04644e7` as removeu. Esta versão parte da última
revisão de lá e acrescenta a narrativa para explicar sistemas, os primitivos de
sistema, a referência de HTML de proof e as regras para HTML aberto por arquivo.

