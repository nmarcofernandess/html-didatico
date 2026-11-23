# HTML Didático

Uma entrada automática e seis diretas, pela pergunta de quem pede:

| Nome | Entrada |
|---|---|
| HTML Didático | [html-didatico](skills/html-didatico/SKILL.md): automática. Lê o pedido e a conversa, escolhe a forma e monta. |
| Cartão | [cartao](skills/cartao/SKILL.md): "me mostra". Uma dúvida em uma página, com as telas do caso. |
| Aula | [aula](skills/aula/SKILL.md): "me ensina". Explicação, passo a passo, mural, sistemas e aula em quadros. |
| Decidir | [decidir](skills/decidir/SKILL.md): "estou entre A e B". Boards no canvas de Design com o DietFlow DS, HTML com uma aba por decisão fora dele, ou maquete. |
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

Cartão, Aula e o HTML de Decidir nascem do [kit](references/kit/pecas.html): cria-se o arquivo por cópia
(`node scripts/montar.mjs --novo <cartao|passo-a-passo|explicacao|aula|decidir|starter> <destino.html>`),
escreve-se só a página e, quando pedido, roda-se o [check](scripts/check.mjs). [Conteúdo](references/conteudo.md)
e [design](references/visual/design.md) dizem o que escrever e como desenhar; os
[exemplos-ouro](references/kit/ouro/) são o padrão de qualidade.

O [playbook Prova](references/playbooks/prova.md) governa provas: pack ainda não
gerado não demonstra ausência de renderer. Nunca edite à mão saída oficial.
Os [exemplos A–E](references/exemplos/) são históricos, preservados sem alterações;
seus assets externos e status não comprovam o estado atual dos projetos.

Na 3.0.0 os IDs mudam, sem aliases: html-wireframe e decisoes-em-boards viram
`decidir`; html-blueprint vira `montagem`; html-proof vira `prova`;
explain-clearly vira `explicar`; `html-didatico` continua, como entrada
automática, e ganha `cartao` e `aula` como entradas diretas.

Instale pela tag `v3.0.0` do repositório
[nmarcofernandess/html-didatico](https://github.com/nmarcofernandess/html-didatico),
usando o marketplace suportado pelo host; o repositório é público. Confira versão,
origem e sete skills instaladas, e recarregue a sessão; o checkout sozinho não
comprova atualização do catálogo.

Origem: Superflow, `plugins/superflow/skills/` (06/07/2026–13/09/2026, remoção
`04644e7`); gramática visual do manual EscalaFlow (10/06/2026). William Strunk Jr.,
*The Elements of Style* (1918), domínio público, permanece integral em
[references/escrita/elements-of-style.md](references/escrita/elements-of-style.md).
