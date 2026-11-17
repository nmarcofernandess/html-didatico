# Verificação da 2.2.0

Registro do que foi executado e observado ao preparar a 2.2.0, em 17/11/2026, a
partir da 2.1.0 (`964e476`).

## O que mudou

HTML Didático ganha o playbook Aula (`references/playbooks/aula.md`). A estrutura
foi alinhada com Marco em dois wireframes: a primeira revisão, com cinco tabs fixas,
foi recusada por gerar documento grande para pergunta pequena; a segunda, com tabs
abertas pelo pedido, foi aprovada. O kit ganhou subtabs e endereço por `#id`; o
check passou a ler todas as abas; o `montar --atualizar` passou a reembutir o
`kit.js`.

## Verificações executadas

Ambiente: macOS 26.6.2, Node 24.20, Playwright 1.65.1 com Chromium Headless Shell 159.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.2.0, cinco skills, sete manifestos |
| Abas e subtabs na folha de peças | A aba de fora não mexe nas subtabs; clicar numa subtab não fecha a aba de fora; o link `#duvida-2` e a URL `pecas.html#duvida-1` abrem a aba Dúvidas e a subtab certa. Sem erro de script |
| Abas da explicação-ouro com o `kit.js` novo | Produto e Arquitetura alternam como antes |
| `check.mjs` em `ouro/passo-a-passo.html` | Sem falhas. O aviso já aceito das três perguntas respondidas na hora |
| `check.mjs` em `ouro/explicacao.html` | Sem falhas. Com a aba Arquitetura agora lida, um aviso de caixa apertada em 390 px em três linhas da árvore de arquivos: o texto da árvore quebra rente à coluna, sem caixa visível. Mesmo falso positivo já registrado na 2.1.0 para a folha de peças |
| `check.mjs` em `kit/pecas.html` | Sem falhas. O aviso de caixa apertada já registrado na 2.1.0. O de mono caiu para 11,4% com o texto novo das subtabs e deixou de disparar |

## Sem verificação

- **Exemplo-ouro de aula.** O playbook não tem um documento completo de referência;
  a referência visual são os wireframes da conversa. Fazer uma aula real e promovê-la
  a ouro é o próximo passo natural.
- **Teste de uma leitura** do playbook com leitor de contexto limpo.
