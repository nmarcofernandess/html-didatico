# HTML Didático

Plugin portátil para explicar, desenhar interfaces, mostrar composição e
apresentar evidências, e para decidir vendo a tela. Seis entradas públicas, escolhidas pelo resultado.
Funciona em Codex, Claude Code e Cursor, conforme o suporte do host.

## Escolha o resultado

| Nome no seletor | ID da skill | Use para |
|---|---|---|
| **HTML Didático** | [html-didatico](plugins/html-didatico/skills/html-didatico/SKILL.md) | Cartões de uma página para uma dúvida da conversa, explicações, manuais, quickstarts, aulas e narrativas de sistemas. Cartão, manual, editorial, sistemas e aula são modos internos. |
| **HTML Wireframe** | [html-wireframe](plugins/html-didatico/skills/html-wireframe/SKILL.md) | Maquetes e comparação de layouts/comportamentos, com propostas identificadas. |
| **HTML Blueprint** | [html-blueprint](plugins/html-didatico/skills/html-blueprint/SKILL.md) | Composição dos primitivos às features e consumidores: árvore, children, slots, types, props e contratos. |
| **HTML Proof** | [html-proof](plugins/html-didatico/skills/html-proof/SKILL.md) | Evidências e resultados, respeitando o renderer oficial quando existir. |
| **Explicar com Clareza** | [explain-clearly](plugins/html-didatico/skills/explain-clearly/SKILL.md) | Reconstruir significado e explicar causas/consequências em texto ou no meio pedido. HTML é opcional. |
| **Decisões em Boards** | [decisoes-em-boards](plugins/html-didatico/skills/decisoes-em-boards/SKILL.md) | Decisões de produto, modelo ou arquitetura presas em lista ou prosa: um mapa e um board por decisão no canvas de Design, com componentes reais do DietFlow DS. |

No Codex, os nomes legíveis vêm de `agents/openai.yaml`; outros hosts podem
mostrar os IDs. São as mesmas seis skills, sem aliases adicionais.

```text
$html-didatico:html-didatico Explique em HTML como os testes se organizam.
$html-didatico:html-didatico Me mostra num cartão por que a idade deste Cálculo está errada.
$html-didatico:html-wireframe Compare dois lugares para a ação de salvar.
$html-didatico:html-blueprint Mostre a montagem deste componente e seus contratos.
$html-didatico:html-proof Apresente os resultados pelo renderer deste projeto.
$html-didatico:explain-clearly Explique este relatório em texto para um iniciante.
$html-didatico:decisoes-em-boards Transforme as perguntas abertas desta spec em boards.
```

No Claude Code, use `/html-didatico:nome-da-skill`. Para ambiguidade e pedidos
mistos, consulte o [roteamento por resultado](plugins/html-didatico/references/roteamento.md).

## Regras e leitura progressiva

Cada entrada tem seu fluxo e playbook. Nenhuma depende de ler integralmente a
skill HTML Didático. Fontes/limites, escrita e portabilidade têm owners comuns;
tokens, anatomias e primitivos são carregados só para o formato em uso.

- [Fontes e limites](plugins/html-didatico/references/fundamentos.md).
- [HTML portátil e verificação visual](plugins/html-didatico/references/html-portatil.md).
- [Kit de HTML Didático](plugins/html-didatico/references/kit/pecas.html): tokens, dois looks e peças; [conteúdo](plugins/html-didatico/references/conteudo.md) e [design](plugins/html-didatico/references/visual/design.md) dizem como usá-lo, e os [exemplos-ouro](plugins/html-didatico/references/kit/ouro/) são o padrão de qualidade. Todo documento nasce de uma cópia: `node plugins/html-didatico/scripts/montar.mjs --novo <base> <destino.html>`.
- [Playbook Cartão](plugins/html-didatico/references/playbooks/cartao.md): a dúvida da conversa em uma página, com o Em pauta e uma figura por pergunta. A [leitura pela figura](plugins/html-didatico/references/visual/design.md#leitura-pela-figura) confere, pergunta por pergunta, o que a figura e a legenda mostram sozinhas.
- [Guia interno de escrita](plugins/html-didatico/references/escrita/guia.md): síntese e consulta progressiva ao texto de Strunk, sem entrada pública.
- [Aulas reais](plugins/html-didatico/references/exemplos/aulas/README.md): O que é um exame, Números e unidades e as três aulas do canvas de Prescrição (Fórmula magistral, Cadastrados, Tomada, limite e lâmpada), com a anatomia do quadro e os padrões que se repetem.
- [Decisões em boards](plugins/html-didatico/references/decisoes/formato.md): motor (`gerar.py`), peças do DietFlow DS (`pecas.js`, [catálogo](plugins/html-didatico/references/decisoes/pecas.md)), folha `decisoes.css`, [publicação no canvas](plugins/html-didatico/references/decisoes/canvas.md) e dois arquivos de decisões reais em [exemplos/](plugins/html-didatico/references/decisoes/exemplos/).
- [Contrato de proof](plugins/html-didatico/references/playbooks/proof.md): pack ausente não significa renderer ausente. Nunca se fabrica prova ou edita saída oficial à mão.

Os [exemplos históricos A–E](plugins/html-didatico/references/exemplos/) mantêm
sua origem e seus bytes. São referência de gramática visual; seus status,
comandos e APIs não comprovam o estado atual de outros projetos. Alguns citam
prints/JSON externos que não fazem parte deste repositório.

## Migração da 1.2.0

A versão 2.0.0 remove nomes públicos antigos; atualize chamadas salvas.

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

## Instalação da release 2.3.0

O repositório é privado. Use a credencial já autorizada e, no SSH, seu alias de
conta quando necessário. Tag, versão em `main` e instalação são estados distintos.

Codex:

```sh
codex plugin marketplace add git@github.com:nmarcofernandess/html-didatico.git --ref v2.7.0
codex plugin add html-didatico@html-didatico
codex plugin list --marketplace html-didatico --json
```

Para trocar uma tag fixa em instalação existente, o CLI Codex usado na
verificação exige remover e adicionar novamente **a fonte desse marketplace**.
Preserve o mesmo remoto/alias e o escopo; não remova outros marketplaces:

```sh
codex plugin marketplace remove html-didatico
codex plugin marketplace add git@github.com:nmarcofernandess/html-didatico.git --ref v2.7.0
codex plugin marketplace upgrade html-didatico
codex plugin add html-didatico@html-didatico
```

Confira `codex plugin list --marketplace html-didatico --json` e os seis
`SKILL.md` no caminho instalado. Verifique o `--help` do host antes de adaptar
os comandos a outra versão.

Claude Code:

```sh
claude plugin marketplace add nmarcofernandess/html-didatico#v2.7.0
claude plugin install html-didatico@html-didatico
claude plugin list
```

Em instalação existente, confira a referência e sua declaração. Na verificação,
`extraKnownMarketplaces.html-didatico.source.ref` em `~/.claude/settings.json`
fixava a tag antiga. Foi necessário mudar somente essa referência para `v2.0.0`
antes de adicionar a mesma origem com a tag nova, preservando remoto e escopo.
Depois rode `claude plugin marketplace update html-didatico` e
`claude plugin update html-didatico@html-didatico`. Respeite declarações gerenciadas;
um erro de origem precisa ser resolvido na declaração responsável.

Cursor, quando disponível:

```sh
agent plugin marketplace add https://github.com/nmarcofernandess/html-didatico --git-ref v2.7.0
```

Depois instale/atualize em `/plugin`, no escopo user, e confira a versão efetiva.

Confira os caminhos e **as seis skills** da instalação, separadamente do Git.
Abra nova task/sessão para carregar o catálogo novo. Uma skill avulsa ou cópia
em outro marketplace pode coexistir: identifique sua origem e relate a diferença;
não apague nem substitua instalações independentes por suposição.

## Verificação e manutenção

Execute `python3 scripts/validate-package.py` para catálogo, versões e links.
Os [casos de uso](tests/cases.md) cobrem as seis saídas e roteamento ambíguo;
a [verificação da 2.0.0](docs/verification-2.0.0.md) a [da 2.1.0](docs/verification-2.1.0.md) a [da 2.2.0](docs/verification-2.2.0.md) a [da 2.3.0](docs/verification-2.3.0.md) a [da 2.4.0](docs/verification-2.4.0.md) a [da 2.5.0](docs/verification-2.5.0.md) e a [da 2.6.0](docs/verification-2.6.0.md) registram o que foi observado.
Para HTML Didático, `node plugins/html-didatico/scripts/check.mjs <arquivo.html>` renderiza e mede um documento;
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
