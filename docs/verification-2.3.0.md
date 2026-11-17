# Verificação da 2.3.0

17/11/2026, a partir da 2.2.0 (`5ab7b4b`). Motivo: Marco pediu que o HTML Didático não force verificação nem salve prints junto da entrega, depois de encontrar a pasta de Números e unidades do Devkit cheia de provas, bancada e boards que ele não pediu.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.3.0 |
| `check.mjs` na explicação-ouro | Sem falhas; screenshots e JSON gravados na pasta temporária do sistema, nada em `references/kit/ouro/` |
| Abas no celular | A aula de Números e unidades (Devkit `310e78e`) mostrou "Na tela" quebrado em duas linhas em 390 px; com `nowrap` e rolagem lateral na lista, o rótulo fica numa linha |
