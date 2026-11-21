"""Decisões do cadastro de exames: dados para o motor da skill decisoes-em-boards.

Gerar (a partir de canvas/):
    python3 ~/.claude/skills/decisoes-em-boards/scripts/gerar.py gerador/decisoes.py project
"""

PAGINA = {'id': 'decisoes', 'nome': 'Decisões', 'depois_de': 'cadastro'}
MAPA = {
    'arquivo': 'CadastroDecisoes.dc.html',
    'titulo': 'Decisões do cadastro de exames',
    'titulo_canvas': 'Decisões · como decidir',
    'olho': 'Decisões do cadastro de exames · 15/11/2026',
    'links': [('Roadmap', 'Roadmap.dc.html'), ('Aula do cadastro', 'AulaCadastro.dc.html')],
    'depois': 'Com as respostas, eu desenho o cadastro do exame. É a etapa 2.2 do Roadmap.',
}
JA_DECIDIDO = [
    'A referência mora só na ficha do exame; o resultado relê a faixa ao abrir.',
    'Não há usuários: cadastros, registros e fixtures podem migrar.',
    'Exame do DietFlow abre só leitura e oferece Duplicar para editar.',
    'Condição diferente é exame diferente; um tipo de valor por exame; o preparo é calculado do cadastro.',
    'A implementação de Exames começa depois das seis minispecs da 154.',
]
ALTURAS = {"mapa": 2200, "D01": 3500, "D02": 3700, "D03": 3500, "D04": 2400, "D05": 2900, "D06": 2500, "D07": 2600, "D08": 2200, "D09": 2600, "D10": 2300, "D11": 2100}

LIP = '''
    const LIP = ['Colesterol Total', 'HDL-Colesterol', 'LDL-Colesterol', 'Triglicerídeos'];
'''

# Cada decisão: n, arquivo, título curto (canvas e mapa), tipo, pergunta (h1),
# recomendação curta (mapa), quadros (título, frase, buraco), opções (letra, texto),
# índice da recomendada e o JS que define os buracos.
DECISOES = [
  dict(short='Lipidograma: composto ou atalho', kind='muda',
    q='O Lipidograma é um exame com quatro itens ou um atalho para quatro exames?',
    rec='Atalho para os quatro exames avulsos.',
    quadros=[
      ('O que acontece', 'Você escolhe o Lipidograma no Em massa. Ele está em <b>Packs Sugeridos</b>.', 'f1'),
      ('Em dev', 'Entra como uma linha que abre em quatro itens, <b>sem faixa</b>. O mesmo HDL, 38 mg/dL, avulso dá Baixo.', 'f2'),
      ('Com a recomendação', 'Entram os quatro exames avulsos, <b>cada um com a sua faixa</b>. O Hemograma Completo continua composto: tem código TUSS próprio.', 'f3'),
    ],
    opts=[('A', 'Atalho. Sem código próprio, o conjunto só escolhe os exames avulsos de uma vez.'),
          ('B', 'Composto que lê as fichas avulsas: uma linha, itens com faixa.'),
          ('C', 'Como em dev, copiando as faixas para dentro do composto.')], pick=0,
    js=LIP + r'''
    const SEM = 'Sem referência no cadastro.';
    const V = [190, 38, 128, 120];
    const f1 = massa([
      ['Packs Sugeridos', [{ name: 'Lipidograma', pack: true }, { name: 'Hemograma Completo', pack: true }]],
      ['Exames Individuais', LIP.map((name) => ({ name })).concat([{ name: 'Glicemia de Jejum' }])],
    ], [{ name: 'Lipidograma', pack: true, kids: LIP }]);
    const f2 = card('R', [
      { name: 'Lipidograma', open: true, kids: LIP.map((name, i) => ({ name, val: V[i], unit: 'mg/dL', why: SEM })) },
      { name: 'HDL-Colesterol', val: 38, unit: 'mg/dL', ref: '50–59', stat: ['Baixo', 'danger'] },
    ]);
    const f3 = card('R', [
      { name: 'Colesterol Total', val: 190, unit: 'mg/dL', ref: '0–199', stat: ['Adequado', 'success'] },
      { name: 'HDL-Colesterol', val: 38, unit: 'mg/dL', ref: '50–59', stat: ['Baixo', 'danger'] },
      { name: 'LDL-Colesterol', val: 128, unit: 'mg/dL', ref: '0–99', stat: ['Limítrofe alto', 'warning'] },
      { name: 'Triglicerídeos', val: 120, unit: 'mg/dL', ref: '0–149', stat: ['Adequado', 'success'] },
    ]);
'''),
  dict(short='Os dados que a linha do resultado pede', kind='muda',
    q='A linha do resultado deixa de pedir dados da coleta?',
    rec='A linha não pede mais nada; cada dado vai para um lugar que já existe.',
    quadros=[
      ('O que acontece', 'Alguns laudos trazem dados da sessão. O do TOTG 75g traz a dose, as horas de jejum e se houve náusea.', 'f1'),
      ('Em dev', 'A linha abre e pede esses dados na seção <b>Coleta</b>.', 'f2'),
      ('Com a recomendação', 'A linha fica simples: valor, unidade, referência e status. Cada dado vai para um lugar que já existe; a gestação vem dos dados do paciente.', 'f3'),
    ],
    opts=[('A', 'A linha não pede mais nada. Cada dado vai para o seu lugar; os dos exames especiais, como alvo e genótipo, no recenso.'),
          ('B', 'A linha continua pedindo esses dados, só nos exames que os usam.')], pick=0,
    js=r'''
    const f1 = card('R', [{ name: 'TOTG 75g (Curva Glicêmica)', open: true, kids: [
      { name: 'Glicemia Jejum', val: 88, unit: 'mg/dL', quiet: true },
      { name: 'Glicemia 1h', val: 162, unit: 'mg/dL', quiet: true },
      { name: 'Glicemia 2h', val: 141, unit: 'mg/dL', quiet: true },
    ] }]);
    const f2 = stack(
      mini('R', [{ name: 'TOTG 75g (Curva Glicêmica)', open: true, kids: [] }]),
      h('div', { className: 'mini sum', style: { maxWidth: 'none' } }, h('div', { className: 'pv-stack' },
        h(DF.Section, { label: 'Comentário' }, h(DF.Input, { multiline: true, rows: 2, ariaLabel: 'Comentário', value: '', placeholder: 'Comentário sobre este resultado', onValueChange: noop })),
        h(DF.Section, { label: 'Coleta' }, h('div', { className: 'pv-stack' },
          h(DF.Section.Grid, { columns: 3 }, input('Amostra', 'Plasma'), input('Condição', 'Jejum 8h'), input('Referência do laudo', '')),
          h(DF.Section.Grid, { columns: 3 }, num('Jejum', 10, 'h'), num('Dose', 75, 'g'), select('Sintomas', 'Náusea')))))));
    const f3 = stack(
      two(
        lane('Dose', 'no nome do exame', busca('totg', [opt('TOTG 75g (Curva Glicêmica)', 'layers'), opt('TOTG75g na gestação — sessão relatada', 'layers')])),
        lane('Jejum informado', 'outro exame, quando muda a régua', busca('trig', [opt('Triglicerídeos'), opt('Triglicerídeos em jejum de 12h')]))),
      lane('Duração da coleta', 'no preparo do cadastro, que vira a Condição do pedido', mini('P', [{ name: 'Cortisol Urinário 24h', cond: 'Coleta de 24 h' }])),
      lane('Sintomas', 'no card de texto', textCard('Observações do laudo', 'TOTG: náusea aos 60 minutos.')));
'''),
  dict(short='Abas do cadastro do exame', kind='muda',
    q='O cadastro do exame ganha uma aba só para o preparo?',
    rec='Identidade, Preparo e Valores.',
    quadros=[
      ('O que acontece', 'No pedido, a Condição sai do preparo do cadastro: jejum, horário, repouso e duração.', 'f1'),
      ('Em dev', 'Duas abas. O preparo fica dentro da Identidade, em <b>Orientações ao paciente</b> e no acordeão <b>Contexto de coleta</b>.', 'f2'),
      ('Com a recomendação', 'Três abas. O preparo tem a dele, e a Condição aparece calculada. Na Substância, a aba Básico passa a se chamar Identidade.', 'f3'),
    ],
    opts=[('A', 'Três abas: Identidade, Preparo e Valores. Na Substância, Básico vira Identidade. Categoria e tags continuam fora do cadastro simples.'),
          ('B', 'Duas abas, como em dev: o preparo fica na Identidade.')], pick=0,
    js=r'''
    const f1 = mini('P', [{ name: 'GH Basal', cond: 'Jejum 8 h · Repouso 30 min' }, { name: 'Cortisol Matinal', cond: 'Coleta das 7 h às 9 h' }]);
    const idDev = h('div', { className: 'pv-stack', style: { gap: 24 } },
      h(DF.Section, { label: 'Identidade' }, h('div', { className: 'pv-stack' },
        input('Nome', 'GH Basal', { isRequired: true }), input('Sinônimos', 'Hormônio do crescimento', { description: 'Separe os nomes com ponto e vírgula.' }), select('Amostra', 'Soro'))),
      h(DF.Section, null, h(DF.Input, { multiline: true, rows: 2, label: 'Orientações ao paciente', ariaLabel: 'Orientações ao paciente', value: 'Jejum de 8 horas. Repouso de 30 minutos antes da coleta.', onValueChange: noop })),
      h('div', null, h(DF.Button, { variant: 'light', endContent: icon('chevron-down', 16) }, 'Contexto de coleta')));
    const f2 = modal([
      { key: 'identidade', title: 'Identidade', icon: 'lucide:file-text', content: idDev },
      { key: 'valores', title: 'Valores', icon: 'lucide:activity', content: null },
    ], 'identidade');
    const prep = h('div', { className: 'pv-stack', style: { gap: 24 } },
      h(DF.Section, { label: 'Preparo' }, h('div', { className: 'pv-stack' },
        h(DF.Section.Grid, { columns: 3 },
          num('Jejum', 8, 'h'), num('Horário, de', null, 'h'), num('Horário, até', null, 'h'),
          select('Coleta', '', 'Pontual'), num('Repouso', 30, 'min'), num('Duração', null, 'h')),
        input('Observação', ''))),
      h(DF.Section, { label: 'Condição' }, h('div', { className: 'prev' }, 'Jejum 8 h · Repouso 30 min')));
    const f3 = modal([
      { key: 'identidade', title: 'Identidade', icon: 'lucide:file-text', content: null },
      { key: 'preparo', title: 'Preparo', icon: 'lucide:clipboard-list', content: prep },
      { key: 'valores', title: 'Valores', icon: 'lucide:activity', content: null },
    ], 'preparo');
'''),
  dict(short='Faixa do Triglicerídeos sem jejum', kind='muda',
    q='Triglicerídeos sem jejum: desejável abaixo de 150 ou de 175 mg/dL?',
    rec='Desejável abaixo de 175 mg/dL.',
    quadros=[
      ('O que acontece', 'São dois exames: o Triglicerídeos, sem jejum, e o Triglicerídeos em jejum de 12h.', 'f1'),
      ('Em dev', 'Os dois usam a mesma faixa. 160 mg/dL dá <b>Limítrofe alto</b> nos dois.', 'f2'),
      ('Com a recomendação', 'Sem jejum, desejável abaixo de 175. O mesmo 160 dá <b>Adequado</b>; o de jejum não muda.', 'f3'),
    ],
    opts=[('A', 'Sem jejum, desejável abaixo de 175 mg/dL, pelo Consenso Brasileiro de 2016.'),
          ('B', 'Manter 150 nos dois até a curadoria revisar a faixa.')], pick=0,
    js=r'''
    const f1 = mini('P', [{ name: 'Triglicerídeos' }, { name: 'Triglicerídeos em jejum de 12h', cond: 'Jejum 12 h' }]);
    const tg12 = { name: 'Triglicerídeos em jejum de 12h', val: 160, unit: 'mg/dL', ref: '0–149', stat: ['Limítrofe alto', 'warning'] };
    const f2 = mini('R', [{ name: 'Triglicerídeos', val: 160, unit: 'mg/dL', ref: '0–149', stat: ['Limítrofe alto', 'warning'] }, tg12]);
    const f3 = mini('R', [{ name: 'Triglicerídeos', val: 160, unit: 'mg/dL', ref: '0–174', stat: ['Adequado', 'success'] }, tg12]);
'''),
  dict(short='hCG qualitativo na urina e no sangue', kind='muda',
    q='hCG qualitativo: um exame, ou um na urina e outro no sangue?',
    rec='Dois exames.',
    quadros=[
      ('O que acontece', 'O hCG qualitativo é feito na urina ou no sangue.', 'f1'),
      ('Em dev', 'Um exame, sem amostra. O card do pedido não diz o que o paciente leva.', 'f2'),
      ('Com a recomendação', 'Dois exames, <b>cada um com a sua amostra</b>. A curadoria confere o limiar de cada um.', 'f3'),
    ],
    opts=[('A', 'Dois exames: hCG qualitativo na urina e no sangue.'),
          ('B', 'Um exame; a amostra vai no card de texto.')], pick=0,
    js=r'''
    const f1 = busca('hcg', [opt('hCG qualitativo'), opt('Beta-hCG sérico quantitativo')]);
    const f2 = card('P', [{ name: 'hCG qualitativo' }], ['—', '—', '—']);
    const f3 = stack(
      busca('hcg', [opt('hCG qualitativo na urina'), opt('hCG qualitativo no sangue'), opt('Beta-hCG sérico quantitativo')]),
      card('P', [{ name: 'hCG qualitativo na urina' }], ['—', '—', 'Urina']));
'''),
  dict(short='Fase do ciclo do estradiol', kind='fica',
    q='Estradiol: onde se informa a fase do ciclo?',
    rec='Nenhum campo novo.',
    quadros=[
      ('O que acontece', 'A faixa do estradiol depende da fase do ciclo, e o laudo raramente diz a fase.', 'f1'),
      ('Em dev, que é a recomendação', 'O status não supõe uma fase: mostra <b>Por fase</b>, e a nota diz “Fase do ciclo não informada na coleta”.', 'f2'),
      ('Se fosse a outra opção', 'A linha pediria a fase. A linha simples passaria a abrir, e a fase seria digitada a cada coleta.', 'f3'),
    ],
    opts=[('A', 'Como em dev: nenhum campo novo; o status mostra as faixas por fase.'),
          ('B', 'A linha pede a fase da coleta.')], pick=0,
    js=r'''
    const f1 = simple(['Fase', 'Faixa'], [['Fase Folicular', '12,5–166 pg/mL'], ['Pico Ovulatório', '85,8–498 pg/mL'], ['Fase Lútea', '43,8–211 pg/mL']]);
    const f2 = mini('R', [{ name: 'Estradiol', val: 120, unit: 'pg/mL', ref: 'Por fase', stat: ['Por fase', 'default'] }]);
    const f3 = stack(
      mini('R', [{ name: 'Estradiol', opens: true, val: 120, unit: 'pg/mL', ref: '43,8–211', stat: ['Adequado', 'success'] }]),
      h('div', { className: 'mini sum', style: { maxWidth: 'none' } }, h(DF.Section, { label: 'Coleta' }, h(DF.Section.Grid, { columns: 3 }, select('Fase do ciclo', 'Fase Lútea')))));
'''),
  dict(short='Valor com sinal no gráfico', kind='fica',
    q='Um valor com sinal, como “&lt; 0,3”, entra no gráfico da Evolução?',
    rec='Fica na lista, fora do gráfico.',
    quadros=[
      ('O que acontece', 'O laudo da PCR ultrassensível às vezes traz só “&lt; 0,3 mg/L”.', 'f1'),
      ('Em dev, que é a recomendação', 'O gráfico só desenha valor exato. O “&lt; 0,3” fica na lista, com <b>Valor fora do gráfico.</b>', 'f2'),
      ('Se fosse a outra opção', 'Um ponto em 0,3 desenharia um número que o laboratório não deu.', 'f3'),
    ],
    opts=[('A', 'Como em dev: o valor com sinal fica na lista, fora do gráfico.'),
          ('B', 'Ponto no limite, com uma seta indicando o sentido.')], pick=0,
    js=r'''
    const S = [{ key: 'v', name: 'PCR Ultrassensível', unit: 'mg/L', stroke: 'primary' }];
    const f1 = mini('R', [{ name: 'PCR Ultrassensível', op: '<', val: 0.3, unit: 'mg/L', ref: '0–1,0', stat: ['Adequado', 'success'] }]);
    const f2 = two(
      chart('PCR Ultrassensível', [{ d: '03/2026', v: 1.2 }, { d: '07/2026', v: 0.8 }], S),
      readings('Valores', [['< 0,3 mg/L', '10/11/2026', 'Valor fora do gráfico.'], ['0,8 mg/L', '14/07/2026'], ['1,2 mg/L', '02/03/2026']]));
    const f3 = two(chart('PCR Ultrassensível', [{ d: '03/2026', v: 1.2 }, { d: '07/2026', v: 0.8 }, { d: '11/2026', v: 0.3 }], S), null);
'''),
  dict(short='Linha do tempo para exame de categoria', kind='fica',
    q='Um exame de categoria, como Negativo ou Positivo, ganha linha do tempo?',
    rec='A lista de valores, por agora.',
    quadros=[
      ('O que acontece', 'No Sangue Oculto Fecal, o valor é uma categoria, sem número para o gráfico.', 'f1'),
      ('Em dev, que é a recomendação', 'A Evolução lista os valores, com a data de cada coleta.', 'f2'),
      ('Se fosse a outra opção', 'Uma faixa no tempo, com a cor de cada resultado. É um componente novo.', 'f3'),
    ],
    opts=[('A', 'Como em dev: a lista de valores. A faixa no tempo volta quando houver exame de categoria repetido com frequência.'),
          ('B', 'Faixa no tempo, colorida pela categoria de cada coleta.')], pick=0,
    js=r'''
    const f1 = mini('R', [{ name: 'Sangue Oculto Fecal', cat: 'Positivo', ref: 'Negativo', stat: ['Alterado', 'danger'] }]);
    const f2 = two(readings('Sangue Oculto Fecal', [['Positivo', '10/11/2026'], ['Negativo', '12/05/2026'], ['Negativo', '03/11/2025']]), null);
    const f3 = h('div', { className: 'mini sum', style: { maxWidth: 'none' } }, h('div', { className: 'dz-time' },
      ...[['03/11/2025', 'Negativo', 'default'], ['12/05/2026', 'Negativo', 'default'], ['10/11/2026', 'Positivo', 'danger']].map((z) => h('div', { key: z[0] }, chip(z[1], z[2]), h('time', null, z[0])))));
'''),
  dict(short='Exames irmãos na Evolução', kind='fica',
    q='Triglicerídeos e Triglicerídeos em jejum de 12h dividem o mesmo gráfico?',
    rec='Itens separados.',
    quadros=[
      ('O que acontece', 'São dois exames, com faixas diferentes. Na busca, aparecem juntos.', 'f1'),
      ('Em dev, que é a recomendação', 'Cada um tem a sua curva. Pelo nome, ficam lado a lado na Evolução.', 'f2'),
      ('Se fosse a outra opção', 'Um gráfico com as duas curvas põe réguas diferentes no mesmo eixo.', 'f3'),
    ],
    opts=[('A', 'Como em dev: itens separados, vizinhos pelo nome.'),
          ('B', 'Um item com as duas curvas.')], pick=0,
    js=r'''
    const f1 = two(busca('trig', [opt('Triglicerídeos'), opt('Triglicerídeos em jejum de 12h')]), null);
    const s = (key, name) => [{ key, name, unit: 'mg/dL', stroke: 'primary' }];
    const f2 = two(
      chart('Triglicerídeos', [{ d: '03/2026', v: 160 }, { d: '07/2026', v: 142 }, { d: '11/2026', v: 155 }], s('v', 'Triglicerídeos')),
      chart('Triglicerídeos em jejum de 12h', [{ d: '03/2026', v: 131 }, { d: '07/2026', v: 124 }, { d: '11/2026', v: 118 }], s('v', 'Triglicerídeos em jejum de 12h')));
    const f3 = two(chart('Triglicerídeos', [{ d: '03/2026', a: 160, b: 131 }, { d: '07/2026', a: 142, b: 124 }, { d: '11/2026', a: 155, b: 118 }],
      [{ key: 'a', name: 'Triglicerídeos', unit: 'mg/dL', stroke: 'primary' }, { key: 'b', name: 'Triglicerídeos em jejum de 12h', unit: 'mg/dL', stroke: 'secondary' }]), null);
'''),
  dict(short='Exame dividido em dois: quem fica com o id', kind='arruma',
    q='Quando um exame vira dois, qual deles fica com o id antigo?',
    rec='O da condição usual.',
    quadros=[
      ('O que aconteceu', 'O Triglicerídeos tinha duas condições e virou dois exames.', 'f1'),
      ('Em dev', 'O de condição usual, sem jejum, manteve o id. O de jejum de 12 h nasceu com id novo.', 'f2'),
      ('Com a recomendação', 'A migração lê a condição gravada em cada resultado antigo e reaponta os de jejum de 12 h para o exame novo.', 'f3'),
    ],
    opts=[('A', 'O da condição usual fica com o id antigo; o outro nasce com id novo; a migração reaponta pela condição gravada.'),
          ('B', 'Os dois nascem com id novo, e o antigo é aposentado.')], pick=0,
    js=r'''
    const f1 = mini('P', [{ name: 'Triglicerídeos', cond: 'Sem jejum ou Jejum 12 h' }]);
    const f2 = simple(['Exame', 'Id'], [['Triglicerídeos', chip('id antigo')], ['Triglicerídeos em jejum de 12h', chip('id novo', 'primary')]]);
    const f3 = simple(['Coleta', 'Condição gravada', 'Fica em'], [
      ['02/03/2026', 'Sem jejum', 'Triglicerídeos'],
      ['14/07/2026', 'Jejum 12h', h('span', { style: { display: 'inline-flex', gap: 8, alignItems: 'center' } }, 'Triglicerídeos em jejum de 12h', chip('id novo', 'primary'))],
      ['10/11/2026', 'Sem jejum', 'Triglicerídeos']]);
'''),
  dict(short='Boards antigos de Exames', kind='arruma',
    q='Os boards antigos de Exames: atualizar ou aposentar?',
    rec='Aposentar com aviso.',
    quadros=[
      ('O que acontece', 'Dois lugares descrevem Exames com o modelo anterior: o canvas Resultados de Exames e as páginas de Exames do canvas da Prescrição.', 'f1'),
      ('Com a recomendação', 'Cada um ganha um aviso que aponta para este canvas. O recenso fica aqui.', 'f2'),
    ],
    opts=[('A', 'Aposentar com um aviso que aponta para este canvas, e registrar o recenso aqui.'),
          ('B', 'Atualizar cada board antigo para o modelo novo.')], pick=0,
    js=r'''
    const board = (title, description) => h(DF.BaseCard, { title, description, icon: 'lucide:layout-dashboard', surfaceKind: 'list' }, null);
    const f1 = two(board('Resultados de Exames', 'Descreve o que a spec 148 entregou.'), board('Prescrição · Exames', 'Anterior à Aula do exame.'));
    const f2 = two(stack(
      h(DF.SeverityBanner, { color: 'warning', title: 'Board aposentado' }, 'O modelo de Exames está no canvas O que é um exame.'),
      board('Resultados de Exames', 'Descreve o que a spec 148 entregou.')), null);
'''),
]
