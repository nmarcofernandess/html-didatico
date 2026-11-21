# Verificação da 2.5.0

21/11/2026, a partir da 2.4.0 (`c7406c7`). Motivo: um chat disse a Marco que o plugin não tinha exemplo de aula. As aulas existiam no Devkit e no Desktop, mas nada no plugin apontava para elas.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.5.0 |
| `check.mjs` em Números e unidades (G) | Sem falhas; antes da correção, 12 avisos de “pergunta respondida na hora” vinham dos títulos-pergunta dos quadros, e depois dela nenhum |
| `check.mjs` em O que é um exame (F) | Renderiza inteiro sozinho; 10 falhas de tela estreita, letra e contraste, registradas no README dos exemplos como limite de um documento anterior ao kit |
| Regressão do check em explicação-ouro, passo a passo-ouro e folha de peças | Sem falhas; o passo a passo continua acusando as três perguntas respondidas dentro do mesmo parágrafo |

Limites: as páginas de Prescrição (H) não foram renderizadas, porque dependem do runtime do canvas e do DietFlow DS, que não vêm no pacote.
