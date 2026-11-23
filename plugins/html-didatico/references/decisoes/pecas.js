    // decidir · boards · peças compartilhadas, coladas no renderVals de cada board pelo motor.
    // Tudo aqui monta componentes do DietFlow DS (window.DietFlow); nada desenha controle próprio.
    const R = window.React;
    const DF = window.DietFlow || {};
    const h = (t, p, ...k) => (t ? R.createElement(t, p, ...k) : null);
    const noop = () => {};
    const icon = (n, s) => h(DF.Icon, { icon: 'lucide:' + n, size: s || 16, width: s || 16, 'aria-hidden': true });
    const chip = (t, c, v) => h(DF.Chip, { size: 'sm', variant: v || 'flat', color: c || 'default' }, t);
    const tip = (label, node) => h(DF.Tooltip, { content: label }, h('span', { style: { display: 'inline-flex' } }, node));
    const iconButton = (name, label, color) => tip(label, h(DF.Button, { isIconOnly: true, size: 'sm', variant: 'light', color: color || 'default', 'aria-label': label }, icon(name, 18)));
    const closed = (value, label, ro) => h(DF.SmartAutocomplete, { items: [], renderItem: (z) => z, inputValue: value, ariaLabel: label, placeholder: '', isOpen: false, size: 'sm', isReadOnly: !!ro });
    const dash = h('span', { className: 'dash' }, '—');
    // Glifo lucide que o bundle do DS não embute: o corpo vem de @iconify-json/lucide (icons.json), nunca desenhado à mão.
    const lucide = (body, s) => h('svg', { width: s || 16, height: s || 16, viewBox: '0 0 24 24', 'aria-hidden': true, dangerouslySetInnerHTML: { __html: body } });
    const corner = lucide('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m15 10l5 5l-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></g>', 14);
    const SIGNS = ['=', '<', '≤', '>', '≥'];
    const field = (label, value) => h('div', { className: 'pv' }, h('span', { className: 'pv-l' }, label), h('div', { className: 'pv-v' }, value));
    const lane = (tag, text, node) => h('div', { className: 'lane' }, h('p', { className: 'dz-cap' }, h('b', null, tag), text || null), node);
    const two = (...k) => h('div', { className: 'dz-two' }, ...k);
    const stack = (...k) => h('div', { className: 'dz-stack' }, ...k);

    // ---------- Exames: card, tabela, busca, Em massa, cadastro ----------
    // Linha de exame: { name, cond, val, op, unit, ref, stat: [texto, cor], why, cat, kids, open, quiet }
    const rowsOf = (list) => {
      const rows = [];
      list.forEach((e, i) => {
        rows.push({ id: 'e' + i, kind: 'exam', x: e });
        if (e.kids && e.open) e.kids.forEach((z, j) => rows.push({ id: 'e' + i + 'k' + j, kind: 'kid', x: z, isReorderable: false }));
      });
      return rows;
    };
    const nameCol = { id: 'name', header: 'Exame', cell: (r) => (r.kind === 'kid'
      ? h('span', { className: 'kid-name' }, corner, h('span', null, r.x.name))
      : h('span', { className: 'name-cell' },
        r.x.kids || r.x.opens ? iconButton(r.x.open || r.x.opens ? 'chevron-down' : 'chevron-right', r.x.open || r.x.opens ? 'Recolher exame' : 'Expandir exame') : h('span', { className: 'chev-space', 'aria-hidden': true }),
        h('span', { className: 'fill' }, closed(r.x.name, 'Exame')))) };
    const valueOf = (x) => {
      if (x.kids) return dash;
      if (x.cat !== undefined) return closed(x.cat, 'Categoria', true);
      return h('span', { className: 'valop' },
        h('span', { className: 'df-input df-input-sm sig' },
          h('select', { 'aria-label': 'Operador', value: x.op || '=', disabled: true, onChange: noop }, ...SIGNS.map((z) => h('option', { key: z, value: z }, z))),
          icon('chevron-down', 12)),
        h(DF.NumericField, { size: 'sm', ariaLabel: 'Valor do resultado', value: x.val === undefined ? null : x.val, isReadOnly: true, onValueChange: noop }));
    };
    const statOf = (x) => {
      if (x.kids || x.quiet) return null;
      if (x.stat) return h('span', { className: 'stat' }, chip(x.stat[0], x.stat[1]));
      const c = chip('—', 'default', 'bordered');
      return h('span', { className: 'stat' }, x.why
        ? h(DF.Tooltip, { content: x.why }, h('span', { style: { display: 'inline-flex' }, tabIndex: 0, 'aria-label': 'Sem status: ' + x.why }, c)) : c);
    };
    const COLS = {
      P: [nameCol, { id: 'cond', header: 'Condição', width: '32%', cell: (r) => (r.kind === 'kid' ? null : r.x.cond ? h('span', { className: 'cond' }, r.x.cond) : dash) }],
      R: [nameCol,
        { id: 'value', header: 'Valor', width: '9.5rem', cell: (r) => valueOf(r.x) },
        { id: 'unit', header: 'Unidade', width: '7.5rem', cell: (r) => (r.x.kids || r.x.cat !== undefined ? dash : closed(r.x.unit || '', 'Unidade do resultado', true)) },
        { id: 'ref', header: 'Referência', width: '6rem', cell: (r) => (r.x.kids ? null : r.x.ref ? h('span', { className: 'ref' }, r.x.ref) : dash) },
        { id: 'status', header: 'Status', width: '9rem', cell: (r) => statOf(r.x) }],
    };
    const table = (K, list) => h('div', { className: 'ut-scroll' + (K === 'R' ? ' tbl-r' : '') }, h(DF.UniversalTable, { cardless: true, cardlessBleed: false, cardlessPadding: 'none', enableDnD: true, columns: COLS[K], rows: rowsOf(list) }));
    const mini = (K, list) => h('div', { className: 'mini' + (K === 'R' ? ' res' : '') }, table(K, list));
    // O tipo do card é ícone no slot do cabeçalho, com o nome na dica (CardTypeIcon em dev desde 15/11/2026);
    // suffix fica para estado ou dado.
    const cardType = (ic, label) => tip(label, h('span', { role: 'img', 'aria-label': label, tabIndex: 0, style: { display: 'inline-flex', color: 'var(--default-500)' } }, icon(ic, 18)));
    // O card de exames do pedido ou do resultado, como em dev: grip, ícone de tipo, título, lixeira e chevron.
    // O pedido pode trazer o Preparo somado; `more` passa props do card (ex.: isExpanded: false).
    const card = (K, list, prep, title, more) => h(DF.BaseEditableCard, Object.assign({
      title: title || 'Exames de rotina', titlePlaceholder: 'Nome do grupo de exames', isCollapsible: true, dragHandleProps: {},
      icon: cardType('test-tube', 'Exames'), onDelete: noop,
    }, more || {}),
    h('div', { className: 'atb' },
      h('div', { className: 'addition' },
        h('div', { className: 'grow' }, h(DF.SmartAutocomplete, { items: [], renderItem: (z) => z, placeholder: 'Buscar exame para adicionar...', ariaLabel: 'Buscar exame para adicionar', isOpen: false, showSearchIcon: true, hideSelectorIcon: true })),
        h('div', { className: 'fixed' }, h(DF.Button, { variant: 'flat', startContent: icon('list-plus', 16) }, 'Em massa'))),
      table(K, list)),
    ...(prep ? [h(DF.Section, { key: 'p', label: 'Preparo', showDivider: true }, h('div', { className: 'pv-stack' },
      h(DF.Section.Grid, { columns: 3 }, field('Jejum', prep[0]), field('Repouso', prep[1])), field('Amostras', prep[2])))] : []));
    const textCard = (title, text) => h(DF.BaseEditableCard, { title, titlePlaceholder: 'Nome do texto', isCollapsible: true, dragHandleProps: {}, onDelete: noop,
      suffix: h(DF.Chip, { size: 'md', variant: 'flat', color: 'default' }, 'Texto') },
      h(DF.Input, { multiline: true, rows: 2, ariaLabel: 'Texto', value: text, onValueChange: noop }));

    // Busca do card: o item é ícone + nome; composto leva o ícone de camadas.
    const opt = (name, ic) => ({ title: name, icon: 'lucide:' + (ic || 'test-tube') });
    const busca = (q, items) => h(DF.SmartAutocomplete, { items, renderItem: (z) => z, inputValue: q, ariaLabel: 'Buscar exame para adicionar', placeholder: 'Buscar exame para adicionar...', isOpen: true, showSearchIcon: true, hideSelectorIcon: true, size: 'md' });

    // Em massa: compostos em Packs Sugeridos, como em dev.
    // e.off = motivo da linha bloqueada (BulkChoiceRow disabled-existing): marcada em cinza, sem clique, motivo no title.
    const emRow = (e, on) => h('div', { key: e.name, className: 'em-row' + (on ? ' is-selected' : '') + (e.off ? ' is-disabled' : ''), role: 'checkbox', 'aria-checked': !!on,
      ...(e.off ? { 'aria-disabled': true, title: e.off, 'aria-label': e.name + ' (' + e.off + ')' } : {}), tabIndex: e.off ? -1 : 0 },
      h('span', { className: 'em-check' }, on || e.off ? icon('check', 12) : null),
      h('span', { className: 'em-lead' + (e.pack ? '' : ' is-exam') }, icon(e.pack ? 'layers' : 'test-tube')),
      h('span', { className: 'em-text' }, e.name));
    const emPick = (e) => h('div', { key: e.name, className: 'em-pick' },
      h('div', { className: 'em-pick-h' }, h('span', { className: 't' }, e.name),
        e.kids ? iconButton('chevron-down', 'Recolher') : null, iconButton('x', 'Remover da seleção', 'danger')),
      e.kids ? h('div', { className: 'em-kids' }, ...e.kids.map((z) => h('span', { key: z }, z))) : null);
    const massa = (sections, picked) => h(DF.BaseSearchModal, {
      isOpen: true, contained: true, size: 'wide', height: 560, onClose: noop, onConfirm: noop,
      icon: 'lucide:test-tube', title: 'Adicionar Exames em Massa', searchPlaceholder: 'Buscar exames...', searchValue: '', onSearchChange: noop,
      leftContent: h('div', { className: 'em-list' }, ...sections.flatMap((s) => [h('div', { key: s[0], className: 'em-sec' }, s[0]), ...s[1].map((e) => emRow(e, picked.some((p) => p.name === e.name)))])),
      rightContent: h('div', { className: 'em-list' }, ...picked.map(emPick)),
      leftWidth: '50%', rightWidth: '50%', mobileRightLabel: 'Selecionados', mobileRightCount: picked.length, confirmLabel: 'Adicionar (' + picked.length + ')',
    });

    // Cadastro do exame em abas.
    const num = (label, value, unit) => h(DF.NumericField, { label, ariaLabel: label, value, unit, integer: true, size: 'sm', onValueChange: noop });
    const select = (label, value, placeholder) => h(DF.SmartAutocomplete, { items: [], renderItem: (z) => z, label, ariaLabel: label, inputValue: value, placeholder: placeholder || '', isOpen: false, size: 'sm' });
    const input = (label, value, more) => h(DF.Input, { label, ariaLabel: label, size: 'sm', value, onValueChange: noop, ...(more || {}) });
    const modalFooter = h('div', { style: { display: 'flex', gap: 8, justifyContent: 'flex-end' } }, h(DF.Button, { variant: 'light' }, 'Cancelar'), h(DF.Button, { color: 'primary' }, 'Salvar'));
    const modal = (tabs, sel) => h(DF.BaseTabbedModal, { isOpen: true, contained: true, size: 'wide', onClose: noop, icon: 'lucide:test-tube', title: 'Editar Exame',
      selectedKey: sel, onSelectedKeyChange: noop, tabs, defaultFooter: modalFooter });

    // Evolução.
    // Rótulo em pt-BR (vírgula decimal); o eixo Y do DS imprime o número cru, então fica oculto e o valor vai no ponto.
    const chart = (title, data, series, more) => h(DF.LineChartCard, { title, icon: 'lucide:test-tube', data, xKey: 'd', series, height: 220, showDots: true, showValueLabels: true, showYAxis: false,
      valueLabelFormatter: (n) => n.toLocaleString('pt-BR') + ' ' + series[0].unit, ...(more || {}) });
    const readings = (title, list) => h(DF.BaseCard, { title, icon: 'lucide:test-tube', surfaceKind: 'list' }, h('div', { className: 'pv-stack' },
      ...list.map((z, i) => h('div', { key: i, className: 'pv' },
        h('div', { className: 'pv-v' }, h('span', { style: { color: 'var(--foreground)', fontWeight: 500 } }, z[0]), h('span', null, z[1])),
        z[2] ? h('span', { className: 'pv-l' }, z[2]) : null))));
    const simple = (columns, rows) => h('div', { className: 'mini' }, h('div', { className: 'ut-scroll' }, h(DF.UniversalTable, { cardless: true, cardlessBleed: false, cardlessPadding: 'none', enableDnD: false,
      columns: columns.map((c, i) => ({ id: 'c' + i, header: c, cell: (r) => r.c[i] })), rows: rows.map((c, i) => ({ id: 'r' + i, c })) })));
