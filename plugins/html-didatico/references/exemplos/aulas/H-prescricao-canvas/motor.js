// Motor da dose conhecida: o registro da fórmula e o que se lê dele. Fonte única: a aula, o engine-test, a sonda,
// a página Cadastrados e a bancada de decisão carregam este arquivo. Nada aqui conhece tela.
(function (root) {
    const U = undefined;
    const fmt = (n) => n.toLocaleString('pt-BR', { useGrouping: false, maximumFractionDigits: 2 });
    const plural = (n, one, many) => fmt(n) + ' ' + (n === 1 ? one : many);
    const joinE = (xs) => (xs.length <= 1 ? xs.join('') : xs.slice(0, -1).join(', ') + ' e ' + xs[xs.length - 1]);
    const lower1 = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
    // ---------- O registro e o que se lê dele. Tudo abaixo é conta sobre um registro; nada aqui conhece modo nem tela. ----------
    // Formas do exemplo. count: como se conta o que sai do balcão. unit: a unidade física de uma dose naquela forma.
    // flavor: a forma tem o campo Sabor, marcado no catálogo (item 95).
    const FORMS = {
      cap: { label: 'Cápsula', count: 'unit', unit: ['cápsula', 'cápsulas'] },
      capm: { label: 'Cápsula mole', count: 'unit', unit: ['cápsula', 'cápsulas'] },
      sache: { label: 'Sachê', count: 'unit', unit: ['sachê', 'sachês'], flavor: true },
      sol: { label: 'Solução oral', count: 'mL', unit: ['mL', 'mL'], flavor: true },
      po: { label: 'Pó para solução oral', count: 'g', unit: ['g', 'g'], flavor: true },
    };
    const isInt = (x) => Number.isInteger(x) && x >= 1;
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    const formOf = (rec) => FORMS[rec.forma] || FORMS.cap;
    // A dose conhecida: o número (eq.n), a unidade em que foi registrado (eq.u) e o interruptor (eq.usar). Ela vale na unidade em
    // que foi registrada; trocar para uma forma que conta outra unidade a tira do registro (item 155).
    const eqFits = (rec) => !!(rec.eq && isInt(rec.eq.n) && Array.isArray(rec.eq.u) && rec.eq.u[0] === formOf(rec).unit[0]);
    // A unidade é o dado (item 156): com a dose conhecida, ligada ou desligada, cada tomada guarda unidades inteiras; sem ela,
    // doses inteiras. A fração da dose é sempre conta, nunca guardada.
    const inUnits = (rec) => eqFits(rec);
    // O interruptor (item 157): desligada, a dose conhecida continua no registro e a conta continua valendo; só o papel muda.
    const eqOn = (rec) => eqFits(rec) && rec.eq.usar !== false;
    // Dois inteiros fazem a fração: 6 de 3 = 2 doses; 1 de 3 = 1/3 da dose; 4 de 3 = 1 dose e 1/3; 2 de 4 = 1/2 da dose.
    const fracOnly = (num, den) => { const r = num % den, g = gcd(r, den); return (r / g) + '/' + (den / g); };
    const fracText = (num, den) => {
      const w = Math.floor(num / den);
      if (!(num % den)) return plural(w, 'dose', 'doses');
      return w ? plural(w, 'dose', 'doses') + ' e ' + fracOnly(num, den) : fracOnly(num, den) + ' da dose';
    };
    // A dose abre, sempre. As unidades vão entre parênteses só com a dose conhecida ligada (itens 100 e 157).
    const qtyText = (rec, t) => {
      if (!inUnits(rec)) return plural(t.q, 'dose', 'doses');
      const u = rec.eq.u;
      return fracText(t.q, rec.eq.n) + (eqOn(rec) ? ' (' + plural(t.q, u[0], u[1]) + ')' : '');
    };
    const okT = (t) => isInt(t.q) && isInt(t.v);
    // Uma tomada na frase. O horário, quando existe, abre a tomada, como no canvas aceito em 14/11/2026 (item 161).
    const itemText = (rec, t) => {
      const m = (t.m || '').trim(), times = plural(t.v, 'vez', 'vezes') + ' ao dia';
      return (t.h ? 'às ' + t.h + ', ' : '') + qtyText(rec, t) + (t.v > 1 || (!m && !t.h) ? ' ' + times : '') + (m ? ' ' + lower1(m) : '');
    };
    const complete = (rec) => rec.tomadas.length > 0 && rec.tomadas.every(okT);
    // Com horário, as tomadas saem na ordem do dia, separadas por ponto e vírgula; a sem horário vem depois (item 161).
    const byHour = (a, b) => (a.h || '99').localeCompare(b.h || '99');
    // Linhas iguais, sem horário nem momento, são uma tomada repetida (item 159): a frase é a mesma nas duas vistas.
    const sameTake = (rec) => rec.tomadas.length > 1 && rec.tomadas.every((t) => t.q === rec.tomadas[0].q && !t.h && !(t.m || '').trim());
    const autoSay = (rec) => {
      if (!complete(rec)) return '';
      const one = sameTake(rec) ? [{ q: rec.tomadas[0].q, v: rec.tomadas.reduce((a, t) => a + t.v, 0) }] : null;
      const hours = rec.tomadas.some((t) => t.h), ts = one || (hours ? rec.tomadas.slice().sort(byHour) : rec.tomadas), xs = ts.map((t) => itemText(rec, t));
      return 'Tomar ' + (hours ? xs.join('; ') : joinE(xs)) + '.';
    };
    const sayOf = (rec) => (typeof rec.frase === 'string' ? rec.frase : autoSay(rec));
    // A base é um dado da fórmula: fica fora da frase e diz de onde vem o número (item 124). Sai junto com os parênteses.
    const baseOf = (rec) => (eqOn(rec) ? '1 dose = ' + plural(rec.eq.n, rec.eq.u[0], rec.eq.u[1]) + ', conforme rótulo de produto pronto' : '');
    const BASE_NOTE = 'Pode mudar se a fórmula for manipulada de novo.';
    // Aviar conta doses em toda forma; mililitro e grama ficam na linha (item 93).
    const aviarOf = (rec) => {
      const F = formOf(rec);
      if (rec.aviar === null || rec.aviar === U) return F.label;
      return F.label + ' · aviar ' + plural(rec.aviar, 'dose', 'doses') + (F.flavor && rec.sabor ? ' · sabor ' + rec.sabor : '');
    };
    // O dia de uso, em doses. Sem as duas respostas, não há conta do dia.
    const dayUnits = (rec) => (complete(rec) ? rec.tomadas.reduce((a, t) => a + t.q * t.v, 0) : null);
    const dayDoses = (rec) => { const x = dayUnits(rec); return x === null ? null : x / (inUnits(rec) ? rec.eq.n : 1); };
    // O resumo do dia, na ação da Section das tomadas: a mesma leitura da quantidade de uma tomada, sobre o total.
    const dayText = (rec) => { const x = dayUnits(rec); return 'No dia: ' + (x === null ? 'sem conta' : qtyText(rec, { q: x })); };
    // ---------- As duas colunas da tomada (item 156): Doses e a unidade da forma. Digitar em qualquer uma grava o dado. ----------
    // O campo de doses mostra o inteiro; quando a tomada não fecha dose inteira, fica sem valor e mostra a fração no lugar do vazio.
    const dosesOf = (rec, t) => (!isInt(t.q) ? null : !inUnits(rec) ? t.q : t.q % rec.eq.n === 0 ? t.q / rec.eq.n : null);
    const fracCell = (rec, t) => {
      if (!inUnits(rec) || !isInt(t.q) || t.q % rec.eq.n === 0) return null;
      const w = Math.floor(t.q / rec.eq.n);
      return (w ? w + ' e ' : '') + fracOnly(t.q, rec.eq.n);
    };
    // Digitar em doses grava o dado: 2 doses de 3 viram 6 cápsulas. Sem a dose conhecida, a dose é o próprio dado.
    const fromDoses = (rec, d) => (isInt(d) ? (inUnits(rec) ? d * rec.eq.n : d) : null);
    // ---------- Os gestos que mexem no número (item 158) ----------
    // Trocar o número, limpar e trocar a forma conservam a dose de cada tomada: a quantidade nova é q × n_novo / n_antigo quando
    // dá inteiro; senão, a tomada fica sem quantidade. O ativo de cada tomada nunca muda em silêncio. Nenhum gesto é recusado (item 131).
    const remapQ = (rec, n) => (q) => {
      if (!isInt(q)) return null;
      if (!inUnits(rec)) return isInt(n) ? q * n : q;
      const x = (q * (isInt(n) ? n : 1)) / rec.eq.n;
      return Number.isInteger(x) && x >= 1 ? x : null;
    };
    // Informar, trocar ou tirar o número. Informar liga o interruptor; trocar conserva o que ele estava.
    const withDose = (rec, n, u) => {
      const has = isInt(n);
      if (!has && !rec.eq) return rec;
      if (has && eqFits(rec) && n === rec.eq.n) return rec;
      const f = remapQ(rec, has ? n : null), usar = eqFits(rec) ? rec.eq.usar !== false : true;
      return Object.assign({}, rec, { eq: has ? { n, u: u || formOf(rec).unit, usar } : null, tomadas: rec.tomadas.map((t) => Object.assign({}, t, { q: f(t.q) })) });
    };
    // O interruptor (item 157): desligar guarda o número e não mexe nas tomadas; religar devolve tudo, porque nada foi apagado.
    const withUsar = (rec, on) => (eqFits(rec) && (rec.eq.usar !== false) !== !!on ? Object.assign({}, rec, { eq: Object.assign({}, rec.eq, { usar: !!on }) }) : rec);
    // Trocar a forma: se a forma nova conta outra unidade, a dose conhecida sai pela mesma conta de limpar (item 155).
    const withForm = (rec, forma) => {
      const out = Object.assign({}, rec, { forma });
      return rec.eq && !eqFits(out) ? Object.assign({}, withDose(rec, null), { forma }) : out;
    };
    // Quantas tomadas um gesto deixa sem quantidade: as que tinham e deixam de ter. Só com alguma, o gesto pede confirmação (item 158).
    const lostOf = (before, after) => before.tomadas.reduce((k, t, i) => k + (isInt(t.q) && !(after.tomadas[i] && isInt(after.tomadas[i].q)) ? 1 : 0), 0);
    // Registro válido: dose conhecida ausente ou contada pela forma, com interruptor booleano ou ausente; tomada sem quantidade ou
    // com inteiro.
    const validRec = (rec) => (rec.eq === null || rec.eq === U || (eqFits(rec) && (rec.eq.usar === U || typeof rec.eq.usar === 'boolean')))
      && rec.tomadas.every((t) => t.q === null || isInt(t.q));
    // ---------- O que os controles da dose conhecida leem do registro (popover e modais) ----------
    // A unidade da dose é a da forma.
    const dkUnit = (rec) => formOf(rec).unit;
    const dkN = (rec) => (eqFits(rec) ? rec.eq.n : null);
    // O que os controles mostram: o número e o interruptor. Sem número, o interruptor fica ligado e sem efeito.
    const dkFrom = (rec) => ({ n: dkN(rec), usar: eqFits(rec) ? rec.eq.usar !== false : true });
    // O pedido dos controles: o número pela conta dos gestos, e o interruptor por cima. Sem número antes e agora, nada muda.
    const dkApply = (rec, q) => {
      const out = q.n === dkN(rec) ? rec : withDose(rec, q.n, dkUnit(rec));
      return q.usar === U ? out : withUsar(out, q.usar);
    };
    // A palavra do que a tomada guarda: a unidade da dose conhecida, ou dose.
    const unitWord = (rec, n) => (inUnits(rec) ? (n === 1 ? rec.eq.u[0] : rec.eq.u[1]) : (n === 1 ? 'dose' : 'doses'));
    // Nome da unidade como título de coluna: palavra ganha maiúscula; símbolo (mL, g) fica como é.
    const unitTab = (u) => (u[0] === u[1] ? u[1] : u[1].charAt(0).toUpperCase() + u[1].slice(1));
    const api = { fmt, plural, joinE, lower1, FORMS, isInt, gcd, formOf, eqFits, inUnits, eqOn, fracText, qtyText, okT, itemText, complete, byHour, autoSay, sayOf, baseOf, BASE_NOTE, aviarOf, dayDoses, dayText, dosesOf, fracCell, fromDoses, remapQ, withDose, withUsar, withForm, lostOf, validRec, dkUnit, dkN, dkFrom, dkApply, unitWord, unitTab };
    root.DoseMotor = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
