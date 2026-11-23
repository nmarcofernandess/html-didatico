# HTML Didático

Seis skills públicas por resultado:

| Nome | Entrada |
|---|---|
| HTML Didático | [html-didatico](skills/html-didatico/SKILL.md): explicações, manual, editorial, sistemas e aula. |
| HTML Wireframe | [html-wireframe](skills/html-wireframe/SKILL.md): maquetes e alternativas de interface. |
| HTML Blueprint | [html-blueprint](skills/html-blueprint/SKILL.md): montagem, árvore e contratos. |
| HTML Proof | [html-proof](skills/html-proof/SKILL.md): evidência e renderer oficial ou fluxo manual permitido. |
| Explicar com Clareza | [explain-clearly](skills/explain-clearly/SKILL.md): significado e explicação, inclusive em texto. |
| Decisões em Boards | [decisoes-em-boards](skills/decisoes-em-boards/SKILL.md): um mapa e um board por decisão, no canvas de Design, com componentes reais do DietFlow DS. |

Use o namespace `html-didatico` seguido do ID. Nomes legíveis dependem do host;
os metadados Codex estão em `agents/openai.yaml` de cada entrada.

[Roteamento](references/roteamento.md), [fontes](references/fundamentos.md),
[HTML portátil](references/html-portatil.md) e [escrita interna](references/escrita/guia.md)
são recursos compartilhados. Playbooks e receitas ficam em `references/`, fora
da descoberta de skills. Carregue só o formato pertinente. Não existem aliases
públicos para os modos ou para `writing-clearly-and-concisely`.

HTML Didático nasce do [kit](references/kit/pecas.html): cria-se o arquivo por cópia
(`node scripts/montar.mjs --novo <cartao|passo-a-passo|explicacao|aula|starter> <destino.html>`),
escreve-se só a página e, quando pedido, roda-se o [check](scripts/check.mjs). Uma dúvida da
conversa vira um [cartão](references/playbooks/cartao.md) de uma página. [Conteúdo](references/conteudo.md)
e [design](references/visual/design.md) dizem o que escrever e como desenhar; os
[exemplos-ouro](references/kit/ouro/) são o padrão de qualidade.

O [playbook Proof](references/playbooks/proof.md) governa provas: pack ainda não
gerado não demonstra ausência de renderer. Nunca edite à mão saída oficial.
Os [exemplos A–E](references/exemplos/) são históricos, preservados sem alterações;
seus assets externos e status não comprovam o estado atual dos projetos.

Na migração da 1.2.0, manual-operacao, editorial e explicar-sistema viram modos de
HTML Didático; prancha-decisao vira HTML Wireframe; blueprint-componentes vira
HTML Blueprint; prova-final e proof-html se unem em HTML Proof. O ID explain-clearly
permanece. A remoção dos antigos IDs motiva a versão 2.0.0.

Instale pela tag `v2.9.2` do repositório
[nmarcofernandess/html-didatico](https://github.com/nmarcofernandess/html-didatico),
usando o marketplace suportado pelo host e sua credencial. Confira versão,
origem e seis skills instaladas, e recarregue a sessão; o checkout sozinho não
comprova atualização do catálogo.

Origem: Superflow, `plugins/superflow/skills/` (06/07/2026–13/09/2026, remoção
`04644e7`); gramática visual do manual EscalaFlow (10/06/2026). William Strunk Jr.,
*The Elements of Style* (1918), domínio público, permanece integral em
[references/escrita/elements-of-style.md](references/escrita/elements-of-style.md).
