---
name: blueprint-componentes
description: "Investiga e desenha em HTML one-page a montagem de um componente, dos primitivos ao específico, com árvore de arquivos, children, slots, types, props e deltas propostos."
---

# Blueprint de componentes · Direção E

Entrada direta para o playbook e a receita de composição já existentes no plugin.

1. Leia o [playbook completo](../html-didatico/references/blueprint-componentes.md)
   e leia e abra a [receita HTML exemplar](../html-didatico/references/exemplos/E-blueprint-componentes.html).
   Eles definem a investigação, a anatomia e os critérios de verificação de E.
2. Investigue do consumidor específico para os primitivos reais: mapas de
   `.context`, patterns, imports, JSX, tipos e consumidores. Registre a revisão
   das fontes e marque o que não pôde confirmar.
3. Apresente de dentro para fora, numa folha contínua: árvore de arquivos,
   montagem progressiva à esquerda, contratos e valores do uso à direita.
   Contenção visual precisa corresponder a renderização/children/slots, não
   apenas a um import. Não transforme hooks e helpers em caixas de UI.
4. Marque o delta proposto em verde com rótulo explícito. Verde não é evidência
   de implementação nem de teste. Valide o resultado conforme o playbook.

E tem anatomia própria. A [skill principal](../html-didatico/SKILL.md) fornece
as regras compartilhadas de clareza e HTML autocontido; narrativa, decoração e
zigue-zague de A/B não substituem o playbook. Não copie a arquitetura do exemplo
sem demonstrá-la no projeto de destino e não implemente o produto por consequência.
