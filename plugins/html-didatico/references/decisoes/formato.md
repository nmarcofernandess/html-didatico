# Arquivo de decisões

Python puro, lido pelo motor ([gerar.py](gerar.py)) com `runpy`. Dois exemplos reais
ficam em [exemplos/](exemplos/), com as fontes de cada um no cabeçalho do arquivo:

| Exemplo | O que mostra |
|---|---|
| [exames-modelo.py](exemplos/exames-modelo.py) | Onze decisões do cadastro de exames, com as peças `mini`, `card`, `busca`, `massa`, `modal` e `chart` ([canvas](https://claude.ai/artifact/RALy8oAZT5HeLevnGPMaiW)). |
| [prescricao-favoritos.py](exemplos/prescricao-favoritos.py) | Quatro decisões já respondidas, em outro domínio: `PECAS_EXTRA` compõe campos do DS (autocomplete, numérico, texto) em leitura, desabilitado e edição, e `JA_DECIDIDO` registra as respostas datadas. |

Os exemplos são registros históricos: seus fatos de dev valem para a data que
citam. Copie a forma, nunca o conteúdo.

## Variáveis

| Nome | Obrigatória | O que é |
|---|---|---|
| `PAGINA` | sim | `{'id', 'nome', 'depois_de'}`: página do canvas; criada depois da página `depois_de` se ainda não existir |
| `MAPA` | sim | `{'arquivo', 'titulo', 'titulo_canvas', 'olho', 'links', 'depois'}`: nome do arquivo do mapa, `<title>`, título no canvas, linha de cima (assunto · data absoluta), links `[(rótulo, arquivo)]` para outras páginas, frase do passo 3 ("o que acontece depois das respostas") |
| `DECISOES` | sim | Lista de decisões, na ordem do mapa (muda, fica, arruma) |
| `JA_DECIDIDO` | não | Frases do que não volta à mesa, cada uma com a origem implícita no texto |
| `ALTURAS` | não | `{'mapa': 2200, 'D01': 3500, …}`: altura de cada artboard no canvas (padrão 3000) |
| `PECAS_EXTRA` | não | JS colado depois das peças em todos os boards (constantes do domínio usadas por várias decisões) |
| `PREFIXO`, `LARGURA` | não | `'D'` e `1400` por padrão |

## Uma decisão

```python
dict(short='Faixa do Triglicerídeos sem jejum',            # linha do mapa e título no canvas
  kind='muda',                                             # muda | fica | arruma
  q='Triglicerídeos sem jejum: desejável abaixo de 150 ou de 175 mg/dL?',   # h1: pergunta com o caso
  rec='Desejável abaixo de 175 mg/dL.',                    # recomendação curta, no mapa
  quadros=[                                                # (título, frase, buraco); 2 ou 3 quadros
    ('O que acontece', 'São dois exames: o Triglicerídeos, sem jejum, e o Triglicerídeos em jejum de 12h.', 'f1'),
    ('Em dev', 'Os dois usam a mesma faixa. 160 mg/dL dá <b>Limítrofe alto</b> nos dois.', 'f2'),
    ('Com a recomendação', 'Sem jejum, desejável abaixo de 175. O mesmo 160 dá <b>Adequado</b>; o de jejum não muda.', 'f3'),
  ],
  opts=[('A', 'Sem jejum, desejável abaixo de 175 mg/dL, pelo Consenso Brasileiro de 2016.'),
        ('B', 'Manter 150 nos dois até a curadoria revisar a faixa.')],
  pick=0,                                                  # índice da recomendada
  js=r'''
    const f1 = mini('P', [{ name: 'Triglicerídeos' }, { name: 'Triglicerídeos em jejum de 12h', cond: 'Jejum 12 h' }]);
    const tg12 = { name: 'Triglicerídeos em jejum de 12h', val: 160, unit: 'mg/dL', ref: '0–149', stat: ['Limítrofe alto', 'warning'] };
    const f2 = mini('R', [{ name: 'Triglicerídeos', val: 160, unit: 'mg/dL', ref: '0–149', stat: ['Limítrofe alto', 'warning'] }, tg12]);
    const f3 = mini('R', [{ name: 'Triglicerídeos', val: 160, unit: 'mg/dL', ref: '0–174', stat: ['Adequado', 'success'] }, tg12]);
'''),
```

Regras que o motor confere: `kind` válido, ao menos duas opções, `pick` dentro
delas, 2 ou 3 quadros, e o `js` define (`const fN =`) cada buraco citado nos quadros.

O texto dos quadros e das opções é HTML: `<b>` para o líder, `&lt;` para o sinal
de menor. O `js` roda dentro do `renderVals()` depois de [pecas.js](pecas.js); tudo
o que as peças definem está disponível.

## Escrevendo bem

- `q` com o caso real e as duas saídas na própria pergunta.
- Frase do quadro com o líder em negrito e o número real: "160 mg/dL dá
  **Limítrofe alto**". Uma frase; duas no máximo.
- Valores de figura vêm do catálogo de dev (faixas, condições, nomes). Paciente de
  exemplo fixo quando a faixa depende da pessoa (ex.: mulher, 34 anos).
- Datas absolutas (dd/mm/aaaa) nas figuras; nada de "hoje".
- Opção sem justificativa longa: o porquê está nos quadros.
