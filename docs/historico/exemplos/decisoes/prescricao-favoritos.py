# Decisões que destravam as frentes do board "Prescrição e Favoritos". Fatos conferidos em origin/dev b831b0e173 (17/11/2026).
PAGINA = {'id': 'decisoes', 'nome': 'Decisões', 'depois_de': 'problemas'}
MAPA = {
    'arquivo': 'Decisoes.dc.html',
    'titulo': 'Decisões · Prescrição e Favoritos',
    'titulo_canvas': 'Decisões · como decidir',
    'olho': 'Prescrição e Favoritos · as quatro respondidas em 17/11/2026',
    'links': [('Problemas relatados', 'Main.dc.html')],
    'depois': 'Cada resposta vira instrução do chat que executa. A 1 e a 2 destravam a segunda passada da leitura; a 3 e a 4 fecham a coluna Forma.',
}
ALTURAS = {'mapa': 1900, 'D01': 2350, 'D02': 1750, 'D03': 2300, 'D04': 2400}
JA_DECIDIDO = [
    'Decisão 1, respondida em 17/11/2026: A. Campo em leitura fica legível em todos; a "Forma farmacêutica" deixa de esmaecer.',
    'Decisão 2, respondida em 17/11/2026: A. O texto de fundo da coluna Forma passa a dizer "Forma".',
    'Decisão 3, respondida em 17/11/2026: A. O valor que vira campo só no clique continua texto em leitura.',
    'Decisão 4, respondida em 17/11/2026: A. A chave "Molécula química definida" continua com o nutricionista.',
    'Proof fica todo para o final, com um chat só: ele revisa as entregas, atualiza os testes e roda os proofs. Decidido em 17/11/2026.',
    'O ícone torto antes do título do card já tem um chat trabalhando.',
    'Tabela em leitura mostra os campos da edição, travados, e não texto solto. Em dev desde 16/11/2026.',
    'O aviso da linha de substância mora em Ações e aparece em qualquer largura. Em dev desde 16/11/2026.',
    'A coluna Forma continua campo livre quando a substância não tem molécula no cadastro.',
    'Lista de itens ativos não reserva coluna para o Restaurar.',
]
PECAS_EXTRA = r'''
    const md = (m) => ({ isReadOnly: m === 'ro', isDisabled: m === 'dis' });
    // O autocomplete desabilitado do DS só muda o fundo; em dev o HeroUI aplica opacidade 0,5 no campo desabilitado.
    const ac = (v, l, m, more) => { const n = h(DF.SmartAutocomplete, { items: [], renderItem: (z) => z, inputValue: v, ariaLabel: l, placeholder: '', isOpen: false, size: 'sm', ...md(m), ...(more || {}) }); return m === 'dis' ? h('div', { style: { opacity: 0.5 } }, n) : n; };
    const nf = (v, l, m, more) => h(DF.NumericField, { size: 'sm', ariaLabel: l, value: v, onValueChange: noop, ...md(m), ...(more || {}) });
    const tx = (v, l, m, more) => h(DF.Input, { size: 'sm', ariaLabel: l, value: v, onValueChange: noop, ...md(m), ...(more || {}) });
    const txt = (v) => h('span', { className: 'cond' }, v);
    const linha = (m) => simple(['Ativo', 'Forma', 'Qtd. ativo', 'Un.'], [[ac('Magnésio', 'Ativo', m), ac('Bisglicinato', 'Forma', m), nf(300, 'Quantidade do ativo', m), ac('mg', 'Unidade', m)]]);
    const baixo = (mForma, mPos) => h(DF.Section.Grid, { columns: 2 },
      ac('Cápsula', 'Forma farmacêutica', mForma, { label: 'Forma farmacêutica' }),
      tx('1 cápsula à noite', 'Posologia', mPos, { label: 'Posologia' }));
    const chave = (on, dis) => h(DF.Switch, { isSelected: on, isDisabled: !!dis, size: 'sm', onValueChange: noop }, 'Molécula química definida');
'''
DECISOES = [
  dict(short='Aparência do campo em leitura', kind='muda',
    q='Em leitura, o campo fica legível como na edição ou esmaecido como desabilitado?',
    rec='Legível em todos; a "Forma farmacêutica" deixa de esmaecer.',
    quadros=[
      ('Em dev', 'No card de Fórmula em leitura, a tabela fica <b>legível</b> e a "Forma farmacêutica" fica <b>esmaecida</b>. São duas aparências no mesmo card.', 'f1'),
      ('Com a recomendação', 'Todo campo em leitura fica <b>legível</b> e não aceita digitação. Quem avisa a leitura é a lixeira desabilitada, com o motivo na dica.', 'f2'),
      ('Se fosse a outra opção', 'Todo campo fica <b>esmaecido</b>. O valor prescrito perde contraste na tela em que só resta ler.', 'f3'),
    ],
    opts=[('A', 'Legível em todos os campos. Só a "Forma farmacêutica" muda, para acompanhar os outros.'),
          ('B', 'Esmaecido em todos os campos, como você pediu em 16/11/2026. Muda a tabela, a posologia e a regra de leitura clínica.')],
    pick=0,
    js=r'''
    const f1 = stack(linha('ro'), baixo('dis', 'ro'));
    const f2 = stack(linha('ro'), baixo('ro', 'ro'));
    const f3 = stack(linha('dis'), baixo('dis', 'dis'));
'''),
  dict(short='Texto de fundo da coluna Forma', kind='muda',
    q='A coluna se chama Forma e o campo vazio diz "Molécula". O texto de fundo passa a dizer "Forma"?',
    rec='O fundo passa a dizer "Forma".',
    quadros=[
      ('Em dev', 'Substância digitada sem cadastro: o campo da coluna <b>Forma</b> aparece vazio, com <b>"Molécula"</b> ao fundo.', 'f1'),
      ('Com a recomendação', 'O fundo usa o mesmo nome da coluna: <b>"Forma"</b>.', 'f2'),
    ],
    opts=[('A', 'O texto de fundo passa a dizer "Forma".'),
          ('B', 'Fica "Molécula".'),
          ('C', 'O campo vazio fica sem texto de fundo.')],
    pick=0,
    js=r'''
    const sem = (ph) => simple(['Ativo', 'Forma', 'Qtd. ativo', 'Un.'], [[ac('Extrato de açafrão', 'Ativo'), tx('', 'Forma', '', { placeholder: ph }), nf(30, 'Quantidade do ativo'), ac('mg', 'Unidade')]]);
    const f1 = sem('Molécula');
    const f2 = sem('Forma');
'''),
  dict(short='Valor que vira campo só no clique', kind='fica',
    q='Na Dieta, a quantidade do alimento é texto até o clique. Em leitura, ela continua texto ou vira campo travado?',
    rec='Continua texto, igual ao repouso da edição.',
    quadros=[
      ('O que acontece', 'Na edição, a quantidade aparece como <b>texto</b> e vira campo só enquanto se digita.', 'f1'),
      ('Em dev, que é a recomendação', 'Em leitura, a linha fica igual ao repouso da edição: <b>texto</b>, sem o clique.', 'f2'),
      ('Se fosse a outra opção', 'Em leitura a quantidade vira <b>campo travado</b>, uma forma que a edição só mostra durante a digitação.', 'f3'),
    ],
    opts=[('A', 'Continua texto. Vale para a quantidade da Dieta, o peso da Gestação e as metas do Planejamento.'),
          ('B', 'Vira campo travado nesses três lugares, para toda leitura mostrar campo.')],
    pick=0,
    js=r'''
    const ref = (q) => simple(['Alimento', 'Quantidade'], [[txt('Arroz branco cozido'), q]]);
    const campo = (m) => nf(120, 'Quantidade', m, { unit: 'g' });
    const f1 = stack(lane('Em repouso', null, ref(txt('120 g'))), lane('Durante a digitação', null, ref(campo())));
    const f2 = ref(txt('120 g'));
    const f3 = ref(campo('ro'));
'''),
  dict(short='Quem liga a chave "Molécula química definida"', kind='fica',
    q='A chave "Molécula química definida" continua com o nutricionista nas substâncias dele, ou só a curadoria mexe?',
    rec='Continua com o nutricionista, nas substâncias dele.',
    quadros=[
      ('O que acontece', 'A chave fica na aba Composição do cadastro. Desligada, a substância não tem forma, e a coluna Forma mostra <b>—</b> na prescrição.', 'f1'),
      ('Em dev, que é a recomendação', 'Substância do DietFlow abre em leitura, com a chave <b>travada</b>. Na substância do nutricionista, <b>ele liga e desliga</b>.', 'f2'),
      ('Se fosse a outra opção', 'Na substância do nutricionista a chave fica <b>travada e ligada</b>: todo cadastro dele exige ao menos uma molécula.', 'f3'),
    ],
    opts=[('A', 'Continua com o nutricionista. Extrato, probiótico e fitoterápico que ele cadastra não têm molécula isolada.'),
          ('B', 'Só a curadoria mexe. Substância do nutricionista sempre exige molécula.')],
    pick=0,
    js=r'''
    const semForma = simple(['Ativo', 'Forma', 'Qtd. ativo', 'Un.'], [[ac('Extrato de açafrão', 'Ativo'), dash, nf(30, 'Quantidade do ativo'), ac('mg', 'Unidade')]]);
    const f1 = stack(lane('No cadastro', null, chave(false)), lane('Na prescrição', null, semForma));
    const f2 = stack(lane('Substância do DietFlow', null, chave(true, true)), lane('Substância do nutricionista', null, chave(false)));
    const f3 = lane('Substância do nutricionista', null, chave(true, true));
'''),
]
