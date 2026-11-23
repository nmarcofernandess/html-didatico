# HTML Didático

Plugin portátil para pôr um assunto na mesa: mostrar, ensinar, decidir, montar,
provar e explicar. Você diz o que precisa e a entrada automática escolhe a
forma; seis entradas diretas servem a quem quer nomeá-la. Funciona em Codex,
Claude Code e Cursor, conforme o suporte do host.

## Peça, ou escolha pela pergunta

| Nome no seletor | ID da skill | A pergunta que ela atende | O que sai |
|---|---|---|---|
| **HTML Didático** | [html-didatico](plugins/html-didatico/skills/html-didatico/SKILL.md) | Qualquer uma, sem dizer o formato | A entrada automática lê o pedido e a conversa, inclusive o que já foi decidido nela, escolhe uma das formas abaixo e monta. |
| **Cartão** | [cartao](plugins/html-didatico/skills/cartao/SKILL.md) | "Me mostra" | Uma dúvida da conversa em uma página: a pergunta, o caso em uma linha e até três telas do produto. |
| **Aula** | [aula](plugins/html-didatico/skills/aula/SKILL.md) | "Me ensina" | Um assunto inteiro: explicação, passo a passo, mural, narrativa de sistema ou aula em quadros, com Na tela, Dúvidas, Leis e Roadmap quando o pedido pede. |
| **Decidir** | [decidir](plugins/html-didatico/skills/decidir/SKILL.md) | "Estou entre A e B" | As opções lado a lado no mesmo caso, a recomendada e "Responda no chat". No canvas de Design do Claude com o DietFlow DS, um board por decisão; fora dele, um HTML com uma aba por decisão; maquete quando a pergunta é de layout. |
| **Montagem** | [montagem](plugins/html-didatico/skills/montagem/SKILL.md) | "Como isso se monta" | A composição dos primitivos às features e consumidores: árvore, children, slots, types, props e contratos. |
| **Prova** | [prova](plugins/html-didatico/skills/prova/SKILL.md) | "Funciona mesmo?" | Evidências e resultados, respeitando o renderer oficial quando existir. |
| **Explicar** | [explicar](plugins/html-didatico/skills/explicar/SKILL.md) | "Me explica" | Texto no chat, sem arquivo: significado, causas e consequências. |

As sete passam pelo mesmo [núcleo](plugins/html-didatico/references/nucleo.md):
entender o assunto na fonte, achar o nó, reler cada fato, e entregar dizendo o
que foi visto rodando, o que foi lido e a objeção mais forte.

O pedido que não nomeia a forma ("me mostra", "me ensina", "faz um HTML
didático disso") entra pela automática. As diretas atendem quem nomeia a forma
ou invoca a skill; aí a escolha de quem pede governa.

O ciclo: um cartão que virou assunto pede uma aula; uma aula que abriu uma
escolha pede uma decisão; a resposta vira lei e volta para a aula.

No Codex, os nomes legíveis vêm de `agents/openai.yaml`; outros hosts podem
mostrar os IDs. São as mesmas sete skills, sem aliases adicionais.

```text
$html-didatico:html-didatico Faz um HTML didático do que a gente acabou de discutir.
$html-didatico:cartao Me mostra por que a idade deste Cálculo está errada.
$html-didatico:aula Me ensina como os testes se organizam.
$html-didatico:decidir Estou entre dois lugares para a ação de salvar.
$html-didatico:decidir Transforme as perguntas abertas desta spec em decisões.
$html-didatico:montagem Mostre a montagem deste componente e seus contratos.
$html-didatico:prova Apresente os resultados pelo renderer deste projeto.
$html-didatico:explicar Explique este relatório em texto para um iniciante.
```

No Claude Code, use `/html-didatico:nome-da-skill`. Para ambiguidade e pedidos
mistos, consulte o [roteamento pela pergunta](plugins/html-didatico/references/roteamento.md).

## Regras e leitura progressiva

Cada entrada tem seu fluxo e seu playbook, e nenhuma depende de ler outra
`SKILL.md`. Núcleo, escrita e portabilidade têm owners comuns; tokens, anatomias
e primitivos são carregados só para a forma em uso.

- [Núcleo](plugins/html-didatico/references/nucleo.md): fontes e limites, entender, o nó e o que toda entrega declara.
- [Roteamento](plugins/html-didatico/references/roteamento.md): a tabela pela qual a entrada automática escolhe a forma, o ciclo e as fronteiras.
- [Decisão](plugins/html-didatico/references/decisao.md): a gramática única de decisão e a saída conforme o host. Os [boards](plugins/html-didatico/references/decisoes/boards.md) trazem o motor (`gerar.py`), as peças do DietFlow DS (`pecas.js`, [catálogo](plugins/html-didatico/references/decisoes/pecas.md)), o [formato](plugins/html-didatico/references/decisoes/formato.md), a [publicação no canvas](plugins/html-didatico/references/decisoes/canvas.md) e dois arquivos de decisões reais em [exemplos/](plugins/html-didatico/references/decisoes/exemplos/); a [maquete](plugins/html-didatico/references/playbooks/maquete.md) atende a pergunta de layout.
- [HTML portátil e verificação visual](plugins/html-didatico/references/html-portatil.md).
- [Kit](plugins/html-didatico/references/kit/pecas.html): um design system só, com tokens compartilhados e a biblioteca de componentes `d-*`/`w-*` ([referência](plugins/html-didatico/references/kit/componentes.md)); [conteúdo](plugins/html-didatico/references/conteudo.md) e [design](plugins/html-didatico/references/visual/design.md) dizem como usá-lo, e os [exemplos-ouro](plugins/html-didatico/references/kit/ouro/) são o padrão de qualidade. Todo documento nasce de uma cópia: `node plugins/html-didatico/scripts/montar.mjs --novo <base> <destino.html>`.
- [Playbook Cartão](plugins/html-didatico/references/playbooks/cartao.md): a dúvida da conversa em uma página, com pouco texto. A [leitura pela figura](plugins/html-didatico/references/visual/design.md#leitura-pela-figura) confere, pergunta por pergunta, o que a figura e a legenda mostram sozinhas.
- [Playbook didático](plugins/html-didatico/references/playbooks/didatico.md) e [playbook Aula](plugins/html-didatico/references/playbooks/aula.md), com a anatomia do quadro e os padrões das aulas reais.
- [Playbook Montagem](plugins/html-didatico/references/playbooks/montagem.md): do primitivo ao consumidor, com os contratos.
- [Playbook Prova](plugins/html-didatico/references/playbooks/prova.md): pack ausente não significa renderer ausente. Nunca se fabrica prova ou edita saída oficial à mão.
- [Guia interno de escrita](plugins/html-didatico/references/escrita/guia.md): síntese e consulta progressiva ao texto de Strunk, sem entrada pública.

Os [exemplos históricos A–H](docs/historico/exemplos/README.md) mantêm sua origem
e seus bytes, fora do pacote do plugin. São de antes do design system: o estilo
deles é obsoleto e não deve ser copiado; seus status, comandos e APIs não
comprovam o estado atual de outros projetos.

## Migração da 2.x

A versão 3.0.0 troca os IDs públicos; atualize chamadas salvas. Não há aliases.

| Entrada na 2.x | Na 3.0.0 |
|---|---|
| html-didatico | Continua, como entrada automática: escolhe a forma sozinha. Para nomear, `cartao` ou `aula`. |
| html-wireframe | `decidir`, com a maquete como saída para pergunta de layout. |
| decisoes-em-boards | `decidir`: boards no canvas de Design com o DietFlow DS; fora dele, HTML com uma aba por decisão. |
| html-blueprint | `montagem`. |
| html-proof | `prova`. |
| explain-clearly | `explicar`. |

## Migração da 1.2.0

Histórico: a versão 2.0.0 removeu os nomes públicos da 1.x. Os destinos abaixo são os nomes da 2.x, trocados de novo na 3.0.0.

| Entrada anterior | Destino |
|---|---|
| html-didatico | HTML Didático, agora com escopo específico de explicação. |
| manual-operacao | Modo manual de HTML Didático. |
| editorial | Modo editorial de HTML Didático. |
| explicar-sistema | Modo sistemas de HTML Didático. |
| prancha-decisao | HTML Wireframe. |
| blueprint-componentes | HTML Blueprint. |
| prova-final | HTML Proof, fluxo manual somente sem renderer confirmado. |
| proof-html | HTML Proof, incluindo renderer oficial. |
| explain-clearly | Explicar com Clareza, preservando o ID. |
| writing-clearly-and-concisely | Recurso interno compartilhado; texto e créditos preservados. |

## Instalação da release 3.0.0

O repositório é público desde 23/11/2026: a leitura e a instalação por HTTPS
dispensam credencial. No SSH, use seu alias de conta quando necessário. Tag, versão em `main` e instalação são estados distintos.

Codex:

```sh
codex plugin marketplace add git@github.com:nmarcofernandess/html-didatico.git --ref v3.0.0
codex plugin add html-didatico@html-didatico
codex plugin list --marketplace html-didatico --json
```

Para trocar uma tag fixa em instalação existente, o CLI Codex usado na
verificação exige remover e adicionar novamente **a fonte desse marketplace**.
Preserve o mesmo remoto/alias e o escopo; não remova outros marketplaces:

```sh
codex plugin marketplace remove html-didatico
codex plugin marketplace add git@github.com:nmarcofernandess/html-didatico.git --ref v3.0.0
codex plugin marketplace upgrade html-didatico
codex plugin add html-didatico@html-didatico
```

Confira `codex plugin list --marketplace html-didatico --json` e os sete
`SKILL.md` no caminho instalado. Verifique o `--help` do host antes de adaptar
os comandos a outra versão.

Claude Code:

```sh
claude plugin marketplace add nmarcofernandess/html-didatico#v3.0.0
claude plugin install html-didatico@html-didatico
claude plugin list
```

Em instalação existente, confira a declaração do marketplace em
`extraKnownMarketplaces.html-didatico.source`, em `~/.claude/settings.json`. Se
ela fixar uma tag antiga em `ref`, mude somente essa referência para a tag nova
antes de adicionar a mesma origem, preservando remoto e escopo; sem `ref`, o
marketplace segue a branch padrão. Depois rode `claude plugin marketplace update html-didatico` e
`claude plugin update html-didatico@html-didatico`. Respeite declarações gerenciadas;
um erro de origem precisa ser resolvido na declaração responsável.

Cursor, quando disponível:

```sh
agent plugin marketplace add https://github.com/nmarcofernandess/html-didatico --git-ref v3.0.0
```

Depois instale/atualize em `/plugin`, no escopo user, e confira a versão efetiva.

Confira os caminhos e **as sete skills** da instalação, separadamente do Git.
Abra nova task/sessão para carregar o catálogo novo. Uma skill avulsa ou cópia
em outro marketplace pode coexistir: identifique sua origem e relate a diferença;
não apague nem substitua instalações independentes por suposição.

## Verificação e manutenção

Execute `python3 scripts/validate-package.py` para catálogo, versões e links.
Os [casos de uso](tests/cases.md) cobrem as sete entradas e roteamento ambíguo;
a [verificação da 2.0.0](docs/verification-2.0.0.md) a [da 2.1.0](docs/verification-2.1.0.md) a [da 2.2.0](docs/verification-2.2.0.md) a [da 2.3.0](docs/verification-2.3.0.md) a [da 2.4.0](docs/verification-2.4.0.md) a [da 2.5.0](docs/verification-2.5.0.md) a [da 2.6.0](docs/verification-2.6.0.md) a [da 2.7.0](docs/verification-2.7.0.md) a [da 2.8.0](docs/verification-2.8.0.md) a [da 2.9.0](docs/verification-2.9.0.md) e a [da 3.0.0](docs/verification-3.0.0.md) registram o que foi observado.
Para documento do kit, `node plugins/html-didatico/scripts/check.mjs <arquivo.html>` renderiza e mede;
depois de mudar `references/kit/kit.css` ou `kit.js`, rode `node plugins/html-didatico/scripts/montar.mjs`.
A validação estrutural não simula a resposta de outro modelo ou o seletor de um
host. A publicação segue [AGENTS.md](AGENTS.md).

## Origem e créditos

As três skills originais viveram em `nmarcofernandess/superflow`, em
`plugins/superflow/skills/`, de 06/07/2026 a 13/09/2026; o commit `04644e7` as
removeu. O manual EscalaFlow de 10/06/2026 originou a gramática visual.
A reorganização preserva os cinco exemplos e o material de escrita.
*The Elements of Style* (1918), de William Strunk Jr., é texto de domínio público
incluído com seus créditos em `references/escrita/elements-of-style.md` no plugin.
