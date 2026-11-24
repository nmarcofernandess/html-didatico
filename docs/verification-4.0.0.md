# Verificação da 4.0.0

24/11/2026, a partir da 3.0.0. Motivo: Marco viu que cada exemplo tinha um estilo e que não havia design system, pediu um design único com tokens compartilhados, exemplos-ouro refeitos e peças que fossem componentes (base de uma futura versão React, para vídeo no Remotion). Depois pediu que os boards do Decidir deixassem de depender do DietFlow DS.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 4.0.0, sete skills, sete manifestos, 330 links e âncoras resolvidos |
| `claude plugin validate` no plugin e no marketplace | Passou nos dois |
| `check.mjs` nos oito exemplos-ouro e na folha de peças | Sem falhas. Avisos justificados: densidade de prosa na aula (236 palavras) e no decidir (158); caixa apertada e figura com 30 palavras na explicação; figuras com props literais na montagem; figura de 84 palavras na prova |
| Render dos exemplos-ouro em 1280 e 390 px | Cartão, maquete, passo a passo, explicação, aula, prova, montagem e decidir conferidos nos screenshots |
| Revisão independente do kit (leitor que não escreveu a mudança) | Dez pontos, todos corrigidos: escape em `d-part` e `d-band`, `slot` em componentes, ids duplicados na folha de peças, rolagem e abas com inserção tardia, `num()` e `min="0"`, `value=""`, blocos do `paragrafo`, `mark` em todo `w-*`, números da explicação, magenta fora de "Responda no chat". Cada caso reproduzido num teste de navegador antes e depois |
| `montar.mjs` sobre `scripts/kit.mjs` | Saída byte a byte igual à anterior; a única diferença nos gerados é o `d-pager` novo |
| Boards do Decidir: `gerar.mjs --html` com o exemplo-ouro | Mapa e dois boards; o check passa nos três (um aviso de densidade na tabela "Já decidido") |
| Boards do Decidir num canvas de Design de teste | O design system HTML Didático instalado em `project/ds/hd/`; os artboards pré-renderizados aparecem com figuras, pinos e o gráfico de linha (variáveis CSS preservadas pelo runtime); Começar, Próxima e Mapa navegam no Play; a tabela das opções empilha no celular |
| Revisão independente do motor dos boards | Nove pontos, corrigidos e testados: colisão com board de outra página, `{{` no texto, tag desconhecida, campos sem validação, ordem do `canvas.json`, escape do nome curto, rótulos do `d-pager`, mensagens de erro e uma afirmação sem fonte no exemplo |
| Design system "HTML Didático" no Claude | Republicado a partir do kit, com 53 componentes, um cartão e uma prévia cada |

Limites: as entradas não foram exercitadas por outro agente num pedido real. O canvas de exames continua com os boards antigos do DietFlow DS; convertê-los é trabalho à parte. O ícone e a cor do plugin seguem os da 2.9.2. Os exemplos de `tests/examples/` mantêm o estilo da época. O Cursor não foi conferido.
