# HTML Didático

Plugin portátil para transformar explicação técnica em documento HTML que se
entende sem tradutor: manuais, murais, explicações de sistema, pranchas de
decisão e HTMLs de proof. Funciona em Claude Code, Codex e Cursor.

## O que o plugin exporta

| Skill | Responsabilidade |
|---|---|
| [html-didatico](plugins/html-didatico/skills/html-didatico/SKILL.md) | Entrada geral: escolhe a direção adequada ao pedido. |
| [manual-operacao](plugins/html-didatico/skills/manual-operacao/SKILL.md) | Direção A: manuais, onboarding, quickstarts e runbooks. |
| [editorial](plugins/html-didatico/skills/editorial/SKILL.md) | Direção B: narrativa técnica, problema e decisão. |
| [prova-final](plugins/html-didatico/skills/prova-final/SKILL.md) | Direção C: wireframe Rev. 0 e evidência real na Rev. 1. |
| [prancha-decisao](plugins/html-didatico/skills/prancha-decisao/SKILL.md) | Direção D: alternativas da mesma estrutura e seus custos. |
| [blueprint-componentes](plugins/html-didatico/skills/blueprint-componentes/SKILL.md) | Direção E: árvore, montagem dos primitivos ao específico e contratos laterais. |
| [explicar-sistema](plugins/html-didatico/skills/explicar-sistema/SKILL.md) | Onde mora, como funciona, por que existe e quem usa; primitivos de sistema. |
| [proof-html](plugins/html-didatico/skills/proof-html/SKILL.md) | Renderer oficial ou prova manual; anatomia e integridade das evidências. |
| [explain-clearly](plugins/html-didatico/skills/explain-clearly/SKILL.md) | Reconstrução de significado, causas e consequências a partir das fontes. |
| [writing-clearly-and-concisely](plugins/html-didatico/skills/writing-clearly-and-concisely/SKILL.md) | Revisão de frases, títulos, labels e legendas. |

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

## Chamada direta

No Codex, selecione a skill pelo `$` e pelo nome do plugin. Exemplos:

    $html-didatico:blueprint-componentes Mostre como este componente é montado.
    $html-didatico:proof-html Revise a apresentação do renderer deste pack.
    $html-didatico:prancha-decisao Compare estas duas estruturas.
    $html-didatico:explicar-sistema Explique a organização dos testes deste projeto.

Os demais nomes da tabela seguem o mesmo namespace `html-didatico`.
No Claude Code, use `/html-didatico:nome-da-skill`. A apresentação do seletor
pode variar por host. As entradas diretas usam os mesmos playbooks e receitas;
não são cópias independentes. `html-didatico` continua disponível como entrada geral.

## Instalação

Os comandos abaixo instalam a tag `v1.2.0` depois de ela ser publicada.
O número nos manifestos e o commit em `main` não criam essa tag automaticamente.
O repositório é privado: o host precisa da sua credencial do GitHub. No Codex,
use o endereço SSH já autorizado para sua conta (incluindo seu alias, se houver).

Codex:

    codex plugin marketplace add git@github.com:nmarcofernandess/html-didatico.git --ref v1.2.0
    codex plugin add html-didatico@html-didatico

Claude Code:

    claude plugin marketplace add nmarcofernandess/html-didatico@v1.2.0
    claude plugin install html-didatico@html-didatico

Cursor:

    agent plugin marketplace add https://github.com/nmarcofernandess/html-didatico --git-ref v1.2.0

Depois, em `/plugin`, instale HTML Didático no escopo user.

## Atualizar uma instalação existente

Confira a referência registrada no marketplace antes de atualizar. Uma instalação
fixada em `v1.0.0` ou `v1.0.1` continua nessa tag mesmo que `main` já tenha versão
nova. Um bump de versão não move tags antigas.

Para passar a uma nova release, mude a referência do marketplace para a tag
publicada usando o fluxo suportado pelo host, preservando o remoto e o escopo.
Depois atualize o marketplace e o plugin:

- Codex: `codex plugin marketplace upgrade html-didatico`.
- Claude Code: `claude plugin marketplace update html-didatico` e
  `claude plugin update html-didatico@html-didatico`.
- Cursor: `agent plugin marketplace update` e a atualização em `/plugin`.

Confira a versão efetiva do plugin e as dez skills do catálogo, não apenas o
README do checkout. Abra uma nova task/sessão para recarregar o catálogo.
Uma skill avulsa antiga com o mesmo nome pode coexistir com o plugin: confira
qual caminho o seletor usa antes de editar ou remover qualquer cópia.

## Origem

As skills viveram no Superflow (`plugins/superflow/skills/`) de 06/07/2026 a
13/09/2026, quando o commit `04644e7` as removeu. Esta versão parte da última
revisão de lá e acrescenta a narrativa para explicar sistemas, os primitivos de
sistema, a referência de HTML de proof e as regras para HTML aberto por arquivo.

