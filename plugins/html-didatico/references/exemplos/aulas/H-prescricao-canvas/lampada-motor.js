/* Lâmpada · dados de exemplo e a montagem do popover como foi decidido, para o board canônico (Prescricao.dc.html)
   e a aula "Tomada, limite e lâmpada" (canvas O que é uma fórmula magistral, cópia em canvas-aula/project).
   Anatomia de DoseSuggestion.tsx em dev bf094408e1 (PR #2103, 18/11/2026): cabeçalho com os tokens do PreviewHoverCard
   (D-394), faixa de colunas fixa, seções por forma e via só com referência restrita (D-387, D-298), título da seção do
   card inteiro na cor primária com “· do card” (decisão de Marco, 18/11/2026), fonte em linha única ou, no intervalo,
   título só de leitura com “Mínimo” e “Máximo” embaixo (D-303), para quem vale por inteiro (D-393), estados vazios com
   um ícone por significado (D-388) e “Outras referências” como consulta, uma linha por faixa, com o escopo no chip (D-304).
   A seção “Converter para” (convert) ainda não está em dev: é a fatia U1 da SPEC “campo, unidade, salvar e dados”
   (doc PRD: Unidade na Prescrição, 19/11/2026). Última seção, depois de um divisor; o item mostra só a quantidade e a
   unidade, na coluna da base da linha, com o equivalente pelo teor na outra (D-295) e a coluna Referência vazia; nome
   acessível “Converter para 50 mcg”.
   Magnésio, Vitamina D e Passiflora vêm de prisma/seeds/system/substancias/generated/substances
   (sys-sub-013, sys-sub-001, sys-sub-046). O caso misto e a rolagem de seis seções são sintéticos. */
(function () {
  var U = undefined;

  // ---------- Formatação pt-BR (Dose.format 'display': casas adaptativas, sem zero artificial) ----------
  function fmt(n) {
    if (n === null || n === U) return '';
    var a = Math.abs(n);
    return Number(n).toLocaleString('pt-BR', { maximumFractionDigits: a >= 0.01 ? 2 : a >= 0.0001 ? 4 : 6 });
  }

  // ---------- Faixas de população (REF_COLUMN_BANDS e formatPopulationScope) ----------
  // [chave, para quem vale por inteiro (quem · grupo etário · faixa, D-393)]
  var COLS = [
    ['bebe', 'Todos · Bebê · 0 a 11 meses'], ['crianca', 'Todos · Criança · 1 a 8 anos'],
    ['mAdol', 'Masculino · Adolescente · 9 a 18 anos'], ['fAdol', 'Feminino · Adolescente · 9 a 18 anos'],
    ['mAd', 'Masculino · Adulto · 19 a 50 anos'], ['fAd', 'Feminino · Adulto · 19 a 50 anos'],
    ['mId', 'Masculino · Idoso · 51+ anos'], ['fId', 'Feminino · Idoso · 51+ anos'],
    ['gest', 'Gestante · Todas as idades'], ['lact', 'Lactante · Todas as idades'],
  ];
  var BAND = {}; COLS.forEach(function (c) { BAND[c[0]] = c[1].split(' · '); });
  var GENERAL_SCOPE = 'Geral · Todas as idades';

  // Magnésio (sys-sub-013): base das referências = ativo, mg; ordem do cadastro.
  var MG_REFS = [
    { name: 'ANVISA IN', limit: true, comment: 'suplemento, ≥19a', geral: 350,
      cols: { bebe: null, crianca: [65, 110], mAdol: 350, fAdol: 350, mAd: 350, fAd: 350, mId: 350, fId: 350, gest: 350, lact: 350 } },
    { name: 'NIH UL', limit: true, comment: 'suplemento', geral: 350,
      cols: { bebe: null, crianca: 110, mAdol: 350, fAdol: 350, mAd: 350, fAd: 350, mId: 350, fId: 350, gest: 350, lact: 350 } },
    { name: 'NIH RDA', geral: 400,
      cols: { bebe: null, crianca: 130, mAdol: 410, fAdol: 360, mAd: 400, fAd: 310, mId: 420, fId: 320, gest: 350, lact: 310 } },
    { name: 'NIH EAR', geral: 330,
      cols: { bebe: null, crianca: 110, mAdol: 340, fAdol: 300, mAd: 350, fAd: 265, mId: 350, fId: 265, gest: 300, lact: 265 } },
    { name: 'EFSA UL', limit: true, comment: 'sais suplementares', geral: 250,
      cols: { bebe: null, crianca: null, mAdol: null, fAdol: null, mAd: 250, fAd: 250, mId: 250, fId: 250, gest: null, lact: null } },
    { name: 'NIH AI · 7–12 meses', comment: 'Ingestão adequada para 7–12 meses. Não é RDA nem dose suplementar; não cobre todo o grupo Bebê.',
      cols: { bebe: 75 } },
  ];

  // Outras referências (buildConsultationLines): uma linha por faixa de cada referência, e o Geral.
  function consultation(refs, un) {
    return refs.map(function (r) {
      var lines = [];
      COLS.forEach(function (c) {
        if (!(c[0] in r.cols)) return;
        var v = r.cols[c[0]];
        lines.push({ full: c[1], v: v === null ? null : Array.isArray(v) ? { min: v[0], max: v[1] } : v });
      });
      if (r.geral !== U) lines.push({ full: GENERAL_SCOPE, v: r.geral });
      return { ref: r, un: un, lines: lines };
    });
  }

  // Entradas da lâmpada por perfil (listLampEntries), já decididas pelo resolvedor: do Limite, só a vencedora
  // (empate de condição e largura, vence a ordem do cadastro: ANVISA IN), na posição dela no cadastro.
  var MG = {
    ident: 'Magnésio (Bisglicinato de Magnésio)', un: 'mg', pe: 0.14, refBasis: 'active',
    profiles: {
      m35: { label: 'Masculino · 35 anos', entries: [
        { name: 'ANVISA IN', limit: true, v: 350, band: BAND.mAd, comment: 'suplemento, ≥19a' }, { name: 'NIH RDA', v: 400, band: BAND.mAd }, { name: 'NIH EAR', v: 350, band: BAND.mAd }] },
      gest: { label: 'Gestante · 35 anos', entries: [
        { name: 'ANVISA IN', limit: true, v: 350, band: BAND.gest, comment: 'suplemento, ≥19a' }, { name: 'NIH RDA', v: 350, band: BAND.gest }, { name: 'NIH EAR', v: 300, band: BAND.gest }] },
      c6: { label: 'Masculino · 6 anos', entries: [
        { name: 'ANVISA IN', limit: true, v: { min: 65, max: 110 }, band: BAND.crianca, comment: 'suplemento, ≥19a' }, { name: 'NIH RDA', v: 130, band: BAND.crianca }, { name: 'NIH EAR', v: 110, band: BAND.crianca }] },
      ni: { label: 'Perfil não informado', entries: [] },
    },
    other: consultation(MG_REFS, 'mg'),
  };

  // Vitamina D (sys-sub-001): base das referências = forma (padrão), UI. Masculino 35: vence a ANVISA IN.
  var VD_ENTRIES = [
    { name: 'ANVISA IN', limit: true, v: 2000, band: BAND.mAd, comment: 'máx. 50 mcg/dia' },
    { name: 'NIH RDA', v: 600, band: BAND.mAd, comment: 'IOM 2011 — base do dri-complete' },
    { name: 'NIH EAR', v: 400, band: BAND.mAd, comment: 'IOM/NAM DRI — necessidade média estimada' },
    { name: 'ANVISA IDR histórica (RDC 269/2005)', v: 200, band: BAND.mAd, comment: 'IDR histórica, norma revogada. Projeção etária parcial; não é mínimo/máximo de suplemento.' },
  ];
  var VD3 = { ident: 'Vitamina D (Colecalciferol (D3))', un: 'UI', pe: 1, refBasis: 'molecule', entries: VD_ENTRIES };
  var VD2 = { ident: 'Vitamina D (Ergocalciferol (D2))', un: 'UI', pe: null, refBasis: 'molecule', entries: VD_ENTRIES };

  // Ordem do catálogo de formas (prisma/seeds/system/edqm/dose-forms.ts), para ordenar as seções de outros pares.
  var FORMS = ['Cápsula', 'Cápsula dura', 'Cápsula mole', 'Cápsula dura gastrorresistente', 'Cápsula dura lib. prolongada', 'Comprimido', 'Comprimido revestido',
    'Comprimido mastigável', 'Comprimido efervescente', 'Comprimido gastrorresistente', 'Comprimido sublingual', 'Comprimido orodispersível', 'Goma mastigável',
    'Pastilha', 'Goma de mascar', 'Bombom', 'Barrinha', 'Pó para solução oral', 'Sachê', 'Chá medicinal / Infusão', 'Gotas orais, solução', 'Solução oral',
    'Spray oromucoso', 'Tintura', 'Extrato fluido', 'Creme', 'Gel'];
  var catalogIndex = function (pair) { var f = pair.split(' · ')[0], i = FORMS.indexOf(f); return i === -1 ? 999 : i; };
  var NO_SCOPE = 'Sem restrição de apresentação';

  // Passiflora (sys-sub-046): só Geral, cada referência com escopo de apresentação. mL, teor 100%.
  // Identidade = describeSubstanceIdentity({ substancia, molecula }).label, o rótulo da busca do card (D-058).
  var PASS = {
    ident: 'Passiflora incarnata (Extrato Líquido) (Extrato líquido de passiflora)', un: 'mL', pe: 1, refBasis: 'molecule',
    ema: { name: 'EMA HMPC uso tradicional', general: true, v: { min: 2, max: 4 }, scope: 'Extrato fluido · Via oral', comment: 'Fonte EMA: preparação c, 1:8 em etanol 25%. Correspondência ao material cadastrado não comprovada.' },
    anvisa: { name: 'ANVISA Memento', general: true, v: { min: 0.5, max: 2 }, scope: 'Tintura · Via oral', comment: '0,5 a 2 mL, 3 vezes ao dia.' },
    extrato: 'Extrato fluido · Via oral', tintura: 'Tintura · Via oral', capsula: 'Cápsula · Via oral',
  };
  PASS.entries = [PASS.ema, PASS.anvisa];
  PASS.other = [
    { ref: { name: PASS.ema.name }, un: 'mL', lines: [{ full: GENERAL_SCOPE, v: PASS.ema.v }] },
    { ref: { name: PASS.anvisa.name }, un: 'mL', lines: [{ full: GENERAL_SCOPE, v: PASS.anvisa.v }] },
  ];

  // Caso misto · SINTÉTICO (o golden não tem): ordem do cadastro B, D (limite), A, C.
  var MIX = {
    ident: 'Substância sintética (Forma sintética)', un: 'mg', pe: 0.5, refBasis: 'molecule', defaultPair: 'Cápsula · Via oral',
    entries: [
      { name: 'Fonte B', v: 150, general: true, scope: null },
      { name: 'Limite D', limit: true, v: 400, band: BAND.mAd, scope: null },
      { name: 'Fonte A', v: 200, band: BAND.mAd, scope: 'Cápsula · Via oral' },
      { name: 'Fonte C', v: { min: 100, max: 300 }, general: true, scope: 'Comprimido · Via oral' },
    ],
  };

  // Rolagem · SINTÉTICA: seis seções, cada uma com uma referência em intervalo; o card em Cápsula.
  var SIX_PAIRS = ['Cápsula · Via oral', 'Cápsula mole · Via oral', 'Comprimido · Via oral', 'Comprimido revestido · Via oral', 'Sachê · Via oral', 'Gotas orais, solução · Via oral'];
  var SIX = {
    ident: 'Substância sintética (Forma sintética)', un: 'mg', pe: 0.5, refBasis: 'molecule', defaultPair: 'Cápsula · Via oral',
    entries: SIX_PAIRS.map(function (p, i) { return { name: 'Fonte ' + String.fromCharCode(69 + i), v: { min: 100 + 50 * i, max: 300 + 100 * i }, general: true, scope: p }; }),
  };

  /* As seções (D-387, D-298): sem nenhuma referência com escopo, lista plana. Com escopo: a seção do par do card,
     depois "Sem restrição de apresentação", depois os outros pares na ordem do catálogo; dentro, a ordem do cadastro.
     O limite efetivo vem do contexto real da linha: entra uma vez, na posição dele no cadastro, na seção sem restrição
     (ou na do card, se for restrito ao par do card); nunca numa seção de outro par (D-232, D-299). */
  function arrange(entries, cardPair) {
    var scoped = entries.some(function (e) { return e.scope; });
    if (!scoped) return { entries: entries };
    var card = [], free = [], others = {};
    entries.forEach(function (e) {
      if (!e.scope) free.push(e);
      else if (e.scope === cardPair) card.push(e);
      else if (!e.limit) (others[e.scope] = others[e.scope] || []).push(e);
    });
    var sections = [];
    if (card.length) sections.push({ title: cardPair, card: true, entries: card });
    if (free.length) sections.push({ title: NO_SCOPE, free: true, entries: free });
    Object.keys(others).sort(function (a, b) { return catalogIndex(a) - catalogIndex(b); }).forEach(function (p) { sections.push({ title: p, entries: others[p] }); });
    return { sections: sections, cardHasSection: card.length > 0 };
  }

  // ---------- Montagem ----------
  function make(R, DF) {
    var h = function (t, p) { var k = Array.prototype.slice.call(arguments, 2); return t ? R.createElement.apply(R, [t, p].concat(k)) : null; };
    var ICONS = DF.ICON_NAMES || [];
    var has = function (n) { return ICONS.indexOf(n) !== -1; };
    // Glifos lucide que o pacote do DS não embute: corpo de @iconify-json/lucide, nunca desenhado à mão.
    var LUCIDE = {
      'lightbulb-off': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5M2 2l20 20M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5m0 4h6m-5 4h4"/>',
      'cloud-off': '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057m-2.926 2.753A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78M2 2l20 20"/>',
    };
    var lucide = function (n, s, cls) { return h('svg', { className: 'df-icon' + (cls ? ' ' + cls : ''), width: s || '1em', height: s || '1em', viewBox: '0 0 24 24', 'aria-hidden': true, dangerouslySetInnerHTML: { __html: LUCIDE[n] } }); };
    var icon = function (n, s, cls) { return has(n) ? h(DF.Icon, { icon: 'lucide:' + n, size: s || 16, width: s || 16, className: cls, 'aria-hidden': true }) : LUCIDE[n] ? lucide(n, s || 16, cls) : null; };
    // Estado vazio do DS; glifo ausente no pacote entra no mesmo slot (pc-glyphslot, prescricao.css e aula.css).
    var empty = function (o) {
      var n = (o.icon || '').replace('lucide:', '');
      if (has(n) || !LUCIDE[n]) return h(DF.UnifiedEmptyState, Object.assign({ type: 'empty', size: 'small' }, o));
      return h('div', { className: 'pc-glyphslot', ref: function (el) {
        if (!el) return;
        var slot = el.querySelector('.df-empty > span:first-child');
        if (slot && slot.dataset.lucide !== n) {
          var old = slot.querySelector('svg[data-lucide]'); if (old) old.remove();
          slot.dataset.lucide = n;
          slot.insertAdjacentHTML('beforeend', '<svg data-lucide="' + n + '" class="df-icon" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">' + LUCIDE[n] + '</svg>');
        }
      } }, h(DF.UnifiedEmptyState, Object.assign({ type: 'empty', size: 'small' }, o, { icon: 'lucide:circle-dot' })));
    };

    var amountIn = function (sub, v, col) {
      if (col === sub.refBasis) return v;
      if (sub.pe === null) return null;
      return sub.refBasis === 'active' ? v / sub.pe : v * sub.pe;
    };
    var QL = { molecule: 'Qtd. forma', active: 'Qtd. ativo' };
    var ARIA = { molecule: 'qtd. forma', active: 'qtd. ativo' };

    // Número no eixo decimal: [≈][inteiro à direita][vírgula e decimais à esquerda][unidade]. A coluna inteira tem a mesma
    // unidade, então a borda direita do texto coincide com a do cabeçalho e a vírgula cai numa só vertical.
    var split = function (n) { var s = fmt(n), i = s.indexOf(','); return i === -1 ? [s, ''] : [s.slice(0, i), s.slice(i)]; };
    var numCell = function (parts, metrics, un, isBase, approx, key) {
      return h('span', { key: key, className: 'np-num ' + (isBase ? 'is-base' : 'is-eq'), 'aria-hidden': true, style: { gridTemplateColumns: '1.5ch ' + metrics.i + 'ch ' + metrics.f + 'ch auto' } },
        h('span', { className: 'ap' }, approx ? '≈' : ''), h('span', { className: 'i' }, parts[0]), h('span', { className: 'f' }, parts[1]), h('span', { className: 'u' }, ' ' + un));
    };
    // Caixa que rola com mais conteúdo abaixo da borda ganha o esmaecimento da base (lampada.css, is-more).
    var markMore = function (el) {
      var check = function () { if (el.scrollHeight - el.clientHeight - el.scrollTop > 2) el.classList.add('is-more'); else el.classList.remove('is-more'); };
      check();
      if (!el.dataset.more) { el.dataset.more = '1'; el.addEventListener('scroll', check, { passive: true }); }
    };

    /* sc: { col, profile, entries (lista do resolvedor, com scope), cardPair, compatible, onPick, state, blocked,
             bodyH, scrollTo, width, convert: [{ v, un }] (a seção “Converter para”, ainda não em dev) } */
    var newLamp = function (sub, sc) {
      var col = sc.col, hasEq = sub.pe !== null;
      var cols = [];
      if (hasEq || col === 'molecule') cols.push('molecule');
      if (hasEq || col === 'active') cols.push('active');
      var arr = sc.state ? { entries: [] } : arrange(sc.entries || [], sc.compatible === false ? null : sc.cardPair);
      var sections = arr.sections || [{ title: null, entries: arr.entries }];
      var met = {}; cols.forEach(function (c) { met[c] = { i: 1, f: 0 }; });
      var rows = [];
      sections.forEach(function (s, si) {
        s.entries.forEach(function (e, ei) {
          var ext = typeof e.v === 'object' ? [['min', e.v.min], ['max', e.v.max]] : [['one', e.v]];
          // Intervalo (D-303): o título só de leitura antes dos extremos.
          if (ext.length === 2) rows.push({ si: si, key: si + ':' + ei + ':title', e: e, kind: 'title', s: s });
          ext.forEach(function (x) { rows.push({ si: si, key: si + ':' + ei + ':' + x[0], e: e, kind: x[0], v: x[1], s: s }); });
        });
      });
      var valued = rows.filter(function (y) { return y.kind !== 'title'; });
      valued.forEach(function (y) { cols.forEach(function (c) { var p = split(amountIn(sub, y.v, c)); met[c].i = Math.max(met[c].i, p[0].length); met[c].f = Math.max(met[c].f, p[1].length); }); });
      var trackRem = function (c) { return Math.max(4.5, (1.5 + met[c].i + met[c].f + 1 + sub.un.length) * 0.46 + 0.4); };
      var grid = { gridTemplateColumns: ['minmax(0,1fr)'].concat(cols.map(function (c) { return trackRem(c) + 'rem'; })).join(' ') };
      // A fonte (D-303, D-393): o nome e, embaixo, para quem vale por inteiro (“Limite” antes na fonte de limite; nada no
      // “Limite da forma”); cada parte sem quebra, então a linha só quebra entre as partes. Sem chip na lista clicável (D-304).
      var scopeOf = function (e) { return e.band ? e.band : e.general ? GENERAL_SCOPE.split(' · ') : []; };
      var sourceOf = function (e) {
        var parts = (e.limit && !e.formLimit ? ['Limite'] : []).concat(scopeOf(e));
        return h('span', { className: 'np-name' },
          icon(e.limit ? 'shield-alert' : 'tag', 14, e.limit ? 'np-lim' : 'np-tag'),
          h('span', { className: 'np-namecol' },
            h(DF.Tooltip, { content: e.comment ? e.name + ' — ' + e.comment : e.name, wide: !!e.comment }, h('span', { className: 'np-nametxt' }, e.name)),
            parts.length ? h('span', { className: 'np-qual ts-bodySmall' }, parts.map(function (p, i) { return h(R.Fragment, { key: i }, i ? ' · ' : null, h('span', { className: 'np-nw' }, p)); })) : null));
      };
      // O nome acessível de cada extremo continua dizendo a fonte e para quem vale (D-389).
      var ariaOf = function (y) {
        var e = y.e, v = amountIn(sub, y.v, col);
        var act = y.kind === 'min' ? 'Selecionar dose mínima' : y.kind === 'max' ? 'Selecionar dose máxima' : 'Selecionar dose';
        return [[e.name].concat(scopeOf(e)).join(' · ') + ' — ' + act + ' ' + fmt(v) + ' ' + sub.un + ' ' + ARIA[col] + '.',
          y.s.title && !y.s.free ? y.s.title + '.' : null, e.limit ? 'Referência de limite.' : null].filter(Boolean).join(' ');
      };
      var pick = function (y) { return sc.onPick ? function () { sc.onPick({ v: amountIn(sub, y.v, col), section: y.s, entry: y.e, kind: y.kind }); } : U; };
      var rowEl = function (y) {
        if (y.kind === 'title') return h('div', { key: y.key, role: 'option', 'aria-disabled': true, className: 'np-rtitle' }, sourceOf(y.e));
        var cells = cols.map(function (c) { return numCell(split(amountIn(sub, y.v, c)), met[c], sub.un, c === col, c !== col, c); });
        var label = y.kind === 'one' ? sourceOf(y.e) : h('span', { className: 'np-extlabel' }, y.kind === 'min' ? 'Mínimo' : 'Máximo');
        return h('button', { key: y.key, type: 'button', role: 'option', 'aria-label': ariaOf(y), className: 'np-grid np-row' + (y.kind === 'one' ? '' : ' is-ext'), style: grid, onClick: pick(y) },
          label, cells);
      };
      // “Converter para” (SPEC da Unidade, U1): a última seção, depois do divisor; o item mostra só a quantidade e a
      // unidade, sem fonte nem frase; a ordem é a da ficha.
      var convertEl = sc.convert && sc.convert.length && !sc.state
        ? h('div', { key: 'conv', role: 'group', 'aria-label': 'Converter para', className: 'np-group np-conv' },
          h('div', { className: 'np-sec' }, h('span', { className: 'np-sectitle' }, 'Converter para')),
          sc.convert.map(function (c, i) {
            var text = fmt(c.v) + ' ' + c.un;
            return h('button', { key: i, type: 'button', role: 'option', 'aria-label': 'Converter para ' + text, className: 'np-grid np-row is-conv', style: grid,
              onClick: sc.onConvert ? function () { sc.onConvert(c); } : U },
            h('span', null), cols.map(function (k) {
              // A coluna da base da linha leva o número convertido; a outra, o equivalente pelo teor, com “≈” (D-295).
              var v = k === col ? c.v : col === 'molecule' ? c.v * sub.pe : c.v / sub.pe;
              return h('span', { key: k, className: 'np-num np-convnum ' + (k === col ? 'is-base' : 'is-eq'), 'aria-hidden': true }, (k === col ? '' : '≈ ') + fmt(v) + ' ' + c.un);
            }));
          }))
        : null;
      var ctx = [hasEq ? fmt(sub.pe * 100) + '% ativo' : null, sc.profile].filter(Boolean).join(' · ');
      // A apresentação do card aparece uma vez (D-296): no título da seção dela, quando essa seção existe; em todo outro
      // caso (lista plana ou seções sem a do card), numa linha do cabeçalho. Card sem forma: sem a linha.
      var pairLine = sc.cardPair && !(arr.sections && arr.cardHasSection)
        ? h('p', { className: 'np-pair ts-bodySmall' }, h('span', { className: 'fg-500' }, 'Apresentação do card · '), h('b', null, sc.cardPair)) : null;
      var head = h('div', { className: 'np-head' },
        h('p', { className: 'np-over ts-bodySmall' }, 'Referências de dose'),
        h('p', { className: 'np-title ts-titleSmall' }, sub.ident),
        h('p', { className: 'np-ctx ts-bodySmall' }, ctx),
        pairLine);
      var body;
      if (sc.state) body = h('div', { className: 'np-emptywrap' }, sc.state);
      else body = h('div', { className: 'np-body', style: sc.bodyH ? { maxHeight: sc.bodyH } : U,
        ref: function (el) {
          if (!el) return;
          if (sc.scrollTo && !el.dataset.done) { el.scrollTop = sc.scrollTo; el.dataset.done = '1'; }
          markMore(el);
        } },
        h('div', { className: 'np-grid np-cols', style: grid },
          h('span', { className: 'ts-labelSmall' }, 'Referência'),
          cols.map(function (c) { return h('span', { key: c, className: 'ts-labelSmall np-colnum' + (c === col ? ' is-dest' : '') }, QL[c]); })),
        h('div', { role: 'listbox', 'aria-label': 'Sugestões de dose', className: 'np-list' },
          sections.map(function (s, si) {
            var srows = rows.filter(function (y) { return y.si === si; });
            return h('div', { key: si, role: s.title ? 'group' : U, 'aria-label': s.title || U, className: 'np-group' },
              s.title ? h('div', { className: 'np-sec' + (s.card ? ' is-card' : '') }, h('span', { className: 'np-sectitle' }, s.card ? s.title + ' · do card' : s.title)) : null,
              srows.map(rowEl));
          }),
          convertEl));
      return h('div', { className: 'np', role: 'dialog', 'aria-label': 'Sugestões de dose', tabIndex: -1, style: sc.width ? { width: sc.width } : U }, head, body,
        sc.blocked ? h('p', { role: 'status', className: 'ts-bodySmall np-fb' }, sc.blocked) : null);
    };

    // Outras referências (ConsultationList): só consulta, uma linha por faixa de cada referência, o nome com o ícone e,
    // embaixo, o escopo por inteiro num chip, o único chip da lâmpada (D-304); o valor à direita.
    var newOther = function (other) {
      var lines = [];
      other.forEach(function (g) { g.lines.forEach(function (l, i) { lines.push({ g: g, l: l, k: g.ref.name + ':' + i }); }); });
      var val = function (g, v) { return v === null ? 'Não estabelecido' : typeof v === 'object' ? fmt(v.min) + '–' + fmt(v.max) + ' ' + g.un : fmt(v) + ' ' + g.un; };
      return h('div', { className: 'np-other', ref: function (el) { if (el) markMore(el); } }, h('p', { className: 'np-otherhead ts-labelSmall' }, 'Outras referências'),
        lines.map(function (x) {
          return h('div', { key: x.k, className: 'np-otherrow', role: 'option', 'aria-disabled': true },
            h('span', { className: 'np-othername' },
              h('span', { className: 'np-name' }, icon(x.g.ref.limit ? 'shield-alert' : 'tag', 14, x.g.ref.limit ? 'np-lim' : 'np-tag'), h('span', { className: 'np-nametxt' }, x.g.ref.name)),
              h('span', null, h(DF.Chip, { size: 'sm', variant: 'flat' }, x.l.full))),
            h('span', { className: 'np-otherval ts-bodySmall' }, val(x.g, x.l.v)));
        }));
    };

    return { h: h, icon: icon, empty: empty, newLamp: newLamp, newOther: newOther, fmt: fmt };
  }

  window.LampadaMotor = { make: make, MG: MG, VD3: VD3, VD2: VD2, PASS: PASS, MIX: MIX, SIX: SIX, BAND: BAND, GENERAL_SCOPE: GENERAL_SCOPE, arrange: arrange, fmt: fmt, NO_SCOPE: NO_SCOPE };
})();
