# Verificação da 2.9.0

23/11/2026, a partir da 2.8.0. Motivo: Marco pediu que o plugin levasse o raciocínio da aula para todo documento e reconhecesse que nem todo pedido é resolver um problema; às vezes é apresentar o que já existe. O pedido veio depois de um exemplo que saiu de um resumo, afirmou o que a especificação não dizia e trocou o modelo do plugin por um vocabulário próprio.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.9.0, sete manifestos, links e âncoras resolvidos |
| `check.mjs` nos quatro exemplos-ouro e na folha de peças | Sem falhas; os avisos são os mesmos da 2.8.0, comparados arquivo a arquivo antes e depois da mudança |
| Revisão de congruência do plugin inteiro, por um leitor que não escreveu a mudança | 22 pontos apontados. Corrigidos: rota de um caso de teste, "o que prende" valendo para toda entrega, itens novos da revisão fora dos roteiros, regra com dois donos, frases que ainda davam a etapa de entender à aula, linhas fora da tabela em `tests/cases.md`, README da raiz desatualizado, dois limites do check |
| Cartão de teste feito pela 2.8.0 antes da mudança (Peso, 5000 kg) | Sem falhas no check da 2.9.0; ficou fora do pacote |
| Instalação local, depois da tag `v2.9.0` | Claude Code: `claude plugin list` mostra 2.9.0 habilitado, origem `nmarcofernandess/html-didatico@v2.9.0`, com as seis skills e a seção "Entender, antes de tudo" no cache; `montar.mjs --novo cartao` roda a partir do caminho instalado. Codex: `codex plugin list --marketplace html-didatico --json` mostra 2.9.0 instalado e habilitado, com as seis skills e a mesma seção. Cursor não foi conferido |

Limites: sessões já abertas não recarregam o catálogo; cada chat precisa ser reaberto. O app desktop do Claude ainda oferece, na sessão em que esta release foi feita, uma skill `html-didatico` antiga de um plugin próprio do app, e existe uma skill avulsa antiga em `~/.claude/skills/html-didatico`; as duas estão fora deste repositório e não foram alteradas. Nenhum documento novo foi escrito por outro agente com a 2.9.0, então o efeito das instruções em uso real não foi observado. A folga de 150 palavras na tela mais carregada ficou diferente da referência de cerca de 130. Os playbooks Blueprint, Proof e Wireframe e os arquivos de `visual/` e `decisoes/` foram conferidos por busca de termos, sem leitura inteira. O design system no Claude não foi republicado; o kit não mudou.
