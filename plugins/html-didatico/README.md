# HTML Didático

Uma entrada automática e seis diretas, pela pergunta de quem pede:

| Nome | Entrada |
|---|---|
| HTML Didático | [html-didatico](skills/html-didatico/SKILL.md): automática. Lê o pedido e a conversa, escolhe a forma e monta. |
| Cartão | [cartao](skills/cartao/SKILL.md): "me mostra". Uma dúvida em uma página, com as telas do caso. |
| Aula | [aula](skills/aula/SKILL.md): "me ensina". Explicação, passo a passo, mural, sistemas e aula em quadros. |
| Decidir | [decidir](skills/decidir/SKILL.md): "estou entre A e B". Boards no canvas de Design, HTML com uma aba por decisão fora dele, ou maquete; todos com os componentes do kit. |
| Montagem | [montagem](skills/montagem/SKILL.md): "como isso se monta". Árvore, children, slots e contratos. |
| Prova | [prova](skills/prova/SKILL.md): "funciona mesmo?". Evidência e renderer oficial, ou fluxo manual permitido. |
| Explicar | [explicar](skills/explicar/SKILL.md): "me explica". Texto no chat, sem arquivo. |

Use o namespace `html-didatico` seguido do ID. Nomes legíveis dependem do host;
os metadados Codex estão em `agents/openai.yaml` de cada entrada.

O [núcleo](references/nucleo.md) vale para as sete: entender na fonte, achar o
nó, reler cada fato. [Roteamento](references/roteamento.md),
[decisão](references/decisao.md), [HTML portátil](references/html-portatil.md) e
[escrita interna](references/escrita/guia.md) são recursos compartilhados.
Playbooks e receitas ficam em `references/`, fora da descoberta de skills.
Carregue só a forma pertinente. Não existem aliases públicos para os modos ou
para `writing-clearly-and-concisely`.

Todo HTML do plugin usa um design system só: tokens compartilhados e uma
biblioteca de componentes, `d-*` para o documento e `w-*` para o wireframe e o
blueprint da figura ([referência](references/kit/componentes.md),
[folha de peças](references/kit/pecas.html)). A página é uma aula impressa em papel
quadriculado: tinta preta desenha o produto, magenta é a caneta de quem
explica. Cria-se o arquivo por cópia
(`node scripts/montar.mjs --novo <cartao|aula|decidir|prova|montagem|maquete|starter> <destino.html>`),
escreve-se só o corpo com componentes e roda-se o [check](scripts/check.mjs), que renderiza nos dois temas e clica cada controle.
[Conteúdo](references/conteudo.md) e [design](references/visual/design.md) dizem o que
escrever e como desenhar; os [exemplos-ouro](references/kit/ouro/) são o padrão de qualidade.

O [playbook Prova](references/playbooks/prova.md) governa provas: pack ainda não
gerado não demonstra ausência de renderer. Nunca edite à mão saída oficial.
Os exemplos históricos (A–H), de antes do design system, saíram do pacote e
ficam no repositório, em `docs/historico/exemplos/`, só como registro.

Na 3.0.0 os IDs mudam, sem aliases: html-wireframe e decisoes-em-boards viram
`decidir`; html-blueprint vira `montagem`; html-proof vira `prova`;
explain-clearly vira `explicar`; `html-didatico` continua, como entrada
automática, e ganha `cartao` e `aula` como entradas diretas.

Instale pela tag `v4.0.0` do repositório
[nmarcofernandess/html-didatico](https://github.com/nmarcofernandess/html-didatico),
usando o marketplace suportado pelo host; o repositório é público. Confira versão,
origem e sete skills instaladas, e recarregue a sessão; o checkout sozinho não
comprova atualização do catálogo.

Origem: Superflow, `plugins/superflow/skills/` (06/07/2026–13/09/2026, remoção
`04644e7`); gramática visual do manual EscalaFlow (10/06/2026). William Strunk Jr.,
*The Elements of Style* (1918), domínio público, permanece integral em
[references/escrita/elements-of-style.md](references/escrita/elements-of-style.md).
