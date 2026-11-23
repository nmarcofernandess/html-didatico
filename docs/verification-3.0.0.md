# Verificação da 3.0.0

23/11/2026, a partir da 2.9.2. Motivo: Marco pediu a reorganização que tinha visto em desenho, com as entradas escolhidas pela pergunta de quem pede e não pelo formato do arquivo, e, no meio do trabalho, lembrou que a entrada `html-didatico` pura precisa existir como a automática: ele pede, ela lê a conversa, sabe o que ele precisa e monta, sem ele enviesar um tipo.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 3.0.0, sete skills (`html-didatico`, `cartao`, `aula`, `decidir`, `montagem`, `prova`, `explicar`), sete manifestos, 306 links e âncoras resolvidos |
| `claude plugin validate` no plugin e no marketplace | Passou nos dois, com `displayName` no manifesto do Claude Code |
| `check.mjs` nos cinco exemplos-ouro e na folha de peças | Sem falhas. O decidir-ouro, novo, tem um aviso: a tela mais carregada soma 199 palavras, porque o check lê as abas uma abaixo da outra; a aula-ouro, de onde a decisão veio, tem o mesmo aviso com 236. Os outros avisos não mudaram |
| `montar.mjs --novo decidir` | Cria o arquivo a partir do decidir-ouro; a mensagem de uso lista a base nova |
| Decidir-ouro no render de 1280 px | Capa, duas abas (a decisão e Leis), três opções lado a lado na mesma dose, tabela com a recomendada e "Responda no chat"; conferido no screenshot do check |
| Revisão de congruência do pacote inteiro, por um leitor que não escreveu a mudança | 20 pontos apontados, todos corrigidos. Os mais graves: a tabela de tabs da aula mandava "me explica" e "estou entre A e B" para a Aula, contra o roteamento; "board Foco" não tinha definição; canvas de Design sem o DietFlow DS não caía em nenhuma saída; a automática dizia que todo HTML nasce do kit, o que é falso para montagem, prova, maquete e boards; a regra das decisões já tomadas tinha dois donos; a maquete pedia recomendação por outra regra; as descrições da automática e das diretas disputavam os mesmos pedidos |

Limites: nenhuma das sete entradas foi exercitada por outro agente num pedido real; a escolha da forma pela automática foi revisada por leitura, não observada. Sessões já abertas não recarregam o catálogo: cada chat precisa ser reaberto. O mural continua como anatomia da Aula, sem exemplo-ouro próprio. Os exemplos de `tests/examples/` são de revisões anteriores e mantêm os nomes da época. O design system "HTML Didático" no Claude não foi republicado: o kit (`kit.css`, `kit.js`, sprite) não mudou. O Cursor não foi conferido.
