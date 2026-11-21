#!/usr/bin/env python3
"""Motor dos boards de decisão: lê um arquivo de decisões e escreve, na pasta project/
de um canvas de Design, o mapa, um board por decisão, a folha decisoes.css e o canvas.json.

Uso:
    python3 gerar.py <arquivo-de-decisoes.py> <pasta project/ do canvas>

O arquivo de decisões é Python puro e define (veja formato.md, ao lado):
    PAGINA, MAPA, DECISOES, e opcionalmente JA_DECIDIDO, ALTURAS, PECAS_EXTRA, PREFIXO, LARGURA.

O canvas precisa ter o DietFlow DS instalado em project/ds/dietflow/ e registrado em
canvas.json#designSystems. O motor só escreve os arquivos que gera e as entradas
de canvas.json da página indicada; o resto do canvas fica como está.
"""
import json
import runpy
import shutil
import sys
from pathlib import Path

PASTA = Path(__file__).resolve().parent
PECAS = (PASTA / 'pecas.js').read_text()
CSS = PASTA / 'decisoes.css'

KIND = {'muda': 'Muda o sistema', 'fica': 'Fica como em dev', 'arruma': 'Arrumação'}
GROUPS = [('muda', 'Mudam o sistema', 'A recomendação troca algo que dev faz.'),
          ('fica', 'Ficam como em dev', 'A recomendação é manter. Dá para responder o grupo de uma vez.'),
          ('arruma', 'Arrumação', 'Regras de migração, de documentação ou de boards antigos.')]

HEAD = '''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>%%TITLE%%</title>
<script src="./support.js"></script>
<link rel="stylesheet" href="ds/dietflow/components/bundle.css">
<link rel="stylesheet" href="decisoes.css">
<script src="ds/dietflow/components/bundle.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=Instrument+Sans:wght@400;500;600;700&amp;family=Fira+Code:wght@400;500&amp;family=Inter:wght@100..900&amp;display=swap">
<style>body{margin:0;background:#FAF9F5}</style>
</helmet>
<div class="dz"><div class="dz-wrap">
'''

TAIL = '''</div></div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":%%W%%,"height":%%H%%}}'>
class Component extends DCLogic {
  renderVals() {
%%JS%%
  }
}
</script>
</body>
</html>
'''


def board(cfg, i):
    D, n, d = cfg['DECISOES'], i + 1, cfg['DECISOES'][i]
    pre, mapa = cfg['PREFIXO'], cfg['MAPA']['arquivo']
    prev_f = f'{pre}{n - 1:02d}' if i > 0 else None
    next_f = f'{pre}{n + 1:02d}' if n < len(D) else None
    nav = ['<nav class="dz-top" aria-label="Decisões">', f'<a href="{mapa}">Mapa</a>']
    if prev_f:
        nav.append(f'<a href="{prev_f}.dc.html">Anterior</a>')
    nav.append('<span class="sp"></span>')
    if next_f:
        nav.append(f'<a href="{next_f}.dc.html">Próxima</a>')
    nav.append('</nav>')
    body = ['\n'.join(nav), '<header class="dz-head">',
            f'<span class="dz-eye">Decisão {n} de {len(D)}</span>',
            f'<span class="dz-kind {d["kind"]}">{KIND[d["kind"]]}</span>',
            f'<h1>{d["q"]}</h1>', '</header>']
    holes = []
    for k, (title, line, hole) in enumerate(d['quadros']):
        body.append(f'<section class="dz-q"><span class="dz-n" aria-hidden="true">{k + 1}</span><h2>{title}</h2><p>{line}</p>'
                    f'<figure class="dz-fig"><div class="df-root dz-ds">{{{{ {hole} }}}}</div></figure></section>')
        holes.append(hole)
    opts = []
    for k, (letter, text) in enumerate(d['opts']):
        rec = k == d['pick']
        opts.append(f'<article class="dz-opt{" rec" if rec else ""}">' + ('<span class="tag">Recomendo</span>' if rec else '')
                    + f'<span class="k">{letter}</span><p>{text}</p></article>')
    letters = ', '.join(f'{n}{o[0]}' for o in d['opts'][:-1]) + f' ou {n}{d["opts"][-1][0]}'
    say = (f'<div class="dz-say"><span>Responda no chat</span><code>{letters}</code>'
           + (f'<a href="{next_f}.dc.html">Próxima decisão</a>' if next_f else f'<a href="{mapa}">Voltar ao mapa</a>') + '</div>')
    body.append(f'<section class="dz-q"><span class="dz-n" aria-hidden="true">{len(d["quadros"]) + 1}</span><h2>Sua resposta</h2>'
                f'<div class="dz-opts">{"".join(opts)}</div>{say}</section>')
    js = PECAS + cfg.get('PECAS_EXTRA', '') + d['js'] + '    return { ' + ', '.join(holes) + ' };'
    title = f'Decisão {n} · {d["short"]}'
    return title, HEAD.replace('%%TITLE%%', title) + '\n'.join(body) + '\n' + TAIL.replace('%%JS%%', js)


def mapa(cfg):
    M, pre, D = cfg['MAPA'], cfg['PREFIXO'], cfg['DECISOES']
    links = ''.join(f'<a href="{href}">{label}</a>' for label, href in M.get('links', []))
    body = [f'<nav class="dz-top" aria-label="Páginas">{links}<span class="sp"></span><a href="{pre}01.dc.html">Começar</a></nav>',
            f'<header class="dz-head"><span class="dz-eye">{M["olho"]}</span>', '<h1>Como decidir</h1></header>',
            '<div class="dz-steps">',
            '<article class="dz-step"><span class="k">1</span><h3>Abra uma decisão</h3><p>Cada uma conta a história em quadros: o que acontece, como está em dev, como fica com a recomendação e a sua resposta.</p></article>',
            '<article class="dz-step"><span class="k">2</span><h3>Responda no chat</h3><p>Número e letra: <code>1A</code>, <code>4B</code>. Um grupo inteiro de uma vez: <code>6 a 9 A</code>.</p></article>',
            f'<article class="dz-step"><span class="k">3</span><h3>Depois</h3><p>{M["depois"]}</p></article>',
            '</div>']
    for kind, title, sub in GROUPS:
        rows = [f'<a class="dz-row" href="{pre}{i + 1:02d}.dc.html"><span class="n">{i + 1}</span><span class="t">{d["short"]}</span>'
                f'<span class="r">Recomendo: {d["rec"]}</span><span class="go">Abrir</span></a>' for i, d in enumerate(D) if d['kind'] == kind]
        if rows:
            body.append(f'<section class="dz-group"><header><h2>{title}</h2><p>{sub}</p></header><div class="dz-list">{"".join(rows)}</div></section>')
    if cfg.get('JA_DECIDIDO'):
        body.append('<section class="dz-group"><header><h2>Já decidido</h2><p>Não volta à mesa.</p></header><ul class="dz-done">'
                    + ''.join(f'<li><span>{x}</span></li>' for x in cfg['JA_DECIDIDO']) + '</ul></section>')
    return HEAD.replace('%%TITLE%%', M['titulo']) + '\n'.join(body) + '\n' + TAIL.replace('%%JS%%', '    return {};')


def validate(cfg):
    kinds = set(KIND)
    for i, d in enumerate(cfg['DECISOES']):
        where = f'decisão {i + 1}'
        assert d['kind'] in kinds, f'{where}: kind deve ser muda, fica ou arruma'
        assert 0 <= d['pick'] < len(d['opts']) >= 2, f'{where}: pick fora das opções ou menos de duas opções'
        holes = [q[2] for q in d['quadros']]
        for hole in holes:
            assert f'const {hole} =' in d['js'], f'{where}: o js não define {hole}'
        assert 2 <= len(holes) <= 3, f'{where}: dois ou três quadros antes da resposta'


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    cfg = runpy.run_path(sys.argv[1])
    cfg.setdefault('PREFIXO', 'D')
    cfg.setdefault('LARGURA', 1400)
    validate(cfg)
    project = Path(sys.argv[2]).resolve()
    canvas_path = project / 'canvas.json'
    canvas = json.loads(canvas_path.read_text())
    if not any(s.get('namespace') == 'dietflow' for s in canvas.get('designSystems', [])):
        sys.exit('canvas.json sem o DietFlow DS em designSystems: instale o DS antes (canvas.md, ao lado deste motor).')
    W, pre, alt, P, M = cfg['LARGURA'], cfg['PREFIXO'], cfg.get('ALTURAS', {}), cfg['PAGINA'], cfg['MAPA']
    shutil.copyfile(CSS, project / 'decisoes.css')
    written = []
    for i, _ in enumerate(cfg['DECISOES']):
        f = f'{pre}{i + 1:02d}'
        title, html = board(cfg, i)
        hgt = alt.get(f, 3000)
        (project / f'{f}.dc.html').write_text(html.replace('%%W%%', str(W)).replace('%%H%%', str(hgt)))
        written.append((f'{f}.dc.html', title, hgt))
    mh = alt.get('mapa', 2200)
    (project / M['arquivo']).write_text(mapa(cfg).replace('%%W%%', str(W)).replace('%%H%%', str(mh)))

    boards = canvas['boards']
    stale = [k for k, v in boards.items() if v.get('page') == P['id'] and k.startswith(pre) and k[len(pre):len(pre) + 2].isdigit()]
    for k in stale:
        del boards[k]
    boards[M['arquivo']] = {'expand': 'fill', 'h': mh, 'page': P['id'], 'title': M['titulo_canvas'], 'w': W, 'x': 0, 'y': 0}
    for i, (name, title, hgt) in enumerate(written):
        boards[name] = {'expand': 'fill', 'h': hgt, 'page': P['id'], 'title': title, 'w': W, 'x': (W + 120) * (i + 1), 'y': 0}
    order = [o for o in canvas.get('order', []) if o not in stale and o in boards]
    order += [n for n in [M['arquivo']] + [w[0] for w in written] if n not in order]
    canvas['order'] = order
    if not any(p['id'] == P['id'] for p in canvas['pages']):
        ids = [p['id'] for p in canvas['pages']]
        at = ids.index(P['depois_de']) + 1 if P.get('depois_de') in ids else len(ids)
        canvas['pages'].insert(at, {'id': P['id'], 'name': P['nome']})
    canvas_path.write_text(json.dumps(canvas, ensure_ascii=False, indent=2, sort_keys=True) + '\n')
    print(f'ok: mapa + {len(written)} decisões em {project}')
    print('publicar:', ', '.join(['project/canvas.json', 'project/decisoes.css', f'project/{M["arquivo"]}'] + [f'project/{w[0]}' for w in written]))


if __name__ == '__main__':
    main()
