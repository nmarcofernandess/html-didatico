# Receita visual · sistemas

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 12. Primitivos de sistema

Para explicar **como um sistema se organiza** (pastas, chaves, camadas, quem
contém quem). Mesma tinta, mesma borda dura, mesma sombra sólida. Nada de emoji:
ícone é CSS ou SVG de traço.

**Explorer de IDE** (onde as coisas moram; uma cor de fundo por papel):

```html
<div class="ide">
  <div class="bar"><i></i><i></i><i></i><span>projeto — explorer</span></div>
  <div class="exp">
    <div class="row"><span class="ic">▾</span><span class="fd"></span>projeto</div>
    <div class="row i1 hl"><span class="ic">▸</span><span class="fd"></span>miniapp<span class="note">testes de módulo · sempre ligados</span></div>
    <div class="row i1 hlr"><span class="ic">▾</span><span class="fd"></span>golden<span class="note">chave desligada</span></div>
    <div class="row i2 hlr"><span class="ic">·</span>favoritos-flow.spec.ts</div>
  </div>
</div>
```
```css
.ide { border: 1.5px solid var(--ink); box-shadow: 6px 6px 0 rgba(22,24,21,.12);
  background: #fff; font-family: var(--mono); font-size: 13px; overflow: hidden; }
.ide .bar { display: flex; align-items: center; gap: 8px; border-bottom: 1.5px solid var(--ink);
  padding: 8px 12px; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase;
  color: var(--muted); background: var(--paper-2); }
.ide .bar i { width: 10px; height: 10px; border-radius: 50%; border: 1.5px solid var(--ink); }
.exp { padding: 10px 0; }
.row { display: flex; align-items: center; gap: 8px; padding: 3px 12px; white-space: nowrap; }
.row .ic { width: 14px; text-align: center; color: var(--muted); flex: none; }
.row .note { margin-left: auto; font-family: var(--sans); font-size: 12px; color: var(--muted);
  white-space: normal; text-align: right; }
.row.hl { background: var(--accent-soft); } .row.hlr { background: #F9E5E2; }
.i1 { padding-left: 28px } .i2 { padding-left: 44px } .i3 { padding-left: 60px }
.fd { width: 15px; height: 11px; border: 1.5px solid #B08A2E; background: #F6E2A8;
  border-radius: 1px 3px 2px 2px; position: relative; flex: none; margin-top: 2px; }
.fd::before { content: ""; position: absolute; top: -4px; left: -1.5px; width: 7px; height: 3px;
  border: 1.5px solid #B08A2E; border-bottom: none; background: #F6E2A8; border-radius: 2px 2px 0 0; }
@media (max-width: 700px) { .row .note { display: none; } }
```

A nota da linha diz **para que serve**, não o que é. Mostre só os caminhos que a
explicação usa; "… mais 12" resume o resto.

**Editor de código** (o trecho real, com as linhas que importam marcadas):

```html
<div class="ide">
  <div class="bar"><i></i><i></i><i></i><span>golden/favoritos-flow.spec.ts</span></div>
  <div class="ed">
    <div class="ln"><s>3</s><span>test.skip(</span></div>
    <div class="ln mark"><s>4</s><span>  process.env.<b>CI</b> &amp;&amp;</span></div>
  </div>
</div>
```
```css
.ed { padding: 10px 0; font-size: 13px; line-height: 1.75; background: #FCFCFA; }
.ln { display: flex; }
.ln s { text-decoration: none; width: 40px; text-align: right; padding-right: 12px;
  color: #a3a39a; flex: none; }
.ln.mark { background: #FFF3D6; }
.k { color: #7a3e9d } .st { color: var(--accent) } .cm { color: #8a8a80; font-style: italic }
```

Copie o código **literal** do repositório. Encurte com `…`, nunca reescreva.

**Chave que liga e desliga** (a micro-delícia de um documento sobre flags):

```html
<div class="sw"><span class="switch on"></span><span>CI</span>
  <span class="switch anim"></span><span>RUN_GOLDEN_FLOW</span><span class="result anim"></span></div>
```
```css
.sw { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.switch { width: 44px; height: 24px; border-radius: 99px; position: relative;
  border: 1.5px solid var(--ink); background: #fff; flex: none; }
.switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: 15px; height: 15px;
  border-radius: 50%; background: var(--ink); }
.switch.on { background: var(--accent); border-color: var(--accent); }
.switch.on::after { left: auto; right: 3px; background: #fff; }
.switch.anim { animation: swBg 4s steps(1) infinite; }
.switch.anim::after { animation: swKnob 4s steps(1) infinite; }
@keyframes swBg { 0%,49% { background: #fff; border-color: var(--ink) }
                  50%,100% { background: var(--accent); border-color: var(--accent) } }
@keyframes swKnob { 0%,49% { left: 3px; background: var(--ink) } 50%,100% { left: 22px; background: #fff } }
.result { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
  padding: 4px 10px; border: 1.5px solid var(--ink); margin-left: auto; }
.result.anim::after { content: "pula"; animation: swTxt 4s steps(1) infinite; }
@keyframes swTxt { 0%,49% { content: "pula" } 50%,100% { content: "roda" } }
```

**Árvore** (quem contém quem; o tracejado é o que existe mas não roda):

```html
<div class="tree" data-fig="Fig. 1 — catálogo">
  <ul><li><span class="node root">CI Queue <small>71 receitas</small></span>
    <ul>
      <li><span class="node">macros</span>
        <ul><li><span class="node skip">golden/ <span class="tag off">pula</span></span></li></ul>
      </li>
    </ul>
  </li></ul>
</div>
```
```css
.tree { font-family: var(--mono); font-size: 13px; position: relative; padding: 28px 28px 44px;
  border: 1px solid var(--ink); background-color: #FFFFFC;
  background-image: linear-gradient(rgba(22,24,21,.035) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(22,24,21,.035) 1px, transparent 1px);
  background-size: 22px 22px; }
.tree::after { content: attr(data-fig); position: absolute; bottom: -1px; right: -1px;
  font-size: 9.5px; letter-spacing: .1em; text-transform: uppercase;
  background: var(--ink); color: var(--paper); padding: 4px 12px; }
.tree ul { list-style: none; margin: 0 0 0 8px; padding: 0 0 0 22px; border-left: 1.5px solid var(--ink); }
.tree > ul { border-left: none; padding-left: 0; margin-left: 0; }
.tree li { position: relative; padding: 5px 0 5px 14px; }
.tree ul ul li::before { content: ""; position: absolute; left: -22px; top: 17px; width: 30px;
  border-top: 1.5px solid var(--ink); }
.node { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; background: #fff;
  border: 1.5px solid var(--ink); box-shadow: 3px 3px 0 rgba(22,24,21,.1); padding: 5px 10px; }
.node.root { background: var(--ink); color: var(--paper); }
.node.skip { border-style: dashed; box-shadow: none; background: transparent; color: var(--muted); }
```

**Pilha de camadas** (o que acontece antes de quê; a de baixo apoia a de cima):

```css
.stack { display: flex; flex-direction: column; font-family: var(--mono); font-size: 12px; }
.layer { border: 1.5px solid var(--ink); border-bottom: none; padding: 12px 16px;
  display: flex; align-items: center; gap: 12px; background: #fff; }
.layer:last-child { border-bottom: 1.5px solid var(--ink); }
.layer b { font-family: var(--serif); font-size: 20px; font-weight: 400; min-width: 28px; }
.layer .w { margin-left: auto; }
```

Numere as camadas (①②③④) e escreva em cada uma uma etiqueta de estado
(`banco vazio`, `tudo`, `sob medida`).

**Barras com contagem real** — use os números do repositório. Se um número for
aproximado, diga isso no texto ao lado. Base: `.bars`/`.bar` do [catálogo de dioramas](dioramas.md), com o número
em serif em cima de cada barra e o rótulo mono embaixo. Barra que representa
"existe mas não roda" usa borda tracejada.

**Linha do tempo colorida** (o caso real em datas absolutas):

```css
.tl { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  border: 1px solid var(--ink); background: #fff; }
.tl div { padding: 14px 14px 16px; border-right: 1px solid var(--hair); border-top: 4px solid var(--hair); }
.tl div b { display: block; font-family: var(--mono); font-size: 11.5px; margin-bottom: 4px; }
.tl .r { border-top-color: var(--alert) } .tl .g { border-top-color: var(--accent) }
.tl .y { border-top-color: #E0A800 }      .tl .n { border-top-color: #C9C7BD }
```

A cor da borda é o dado: vermelho = o erro nasce, verde = último bom, amarelo = o
gatilho, cinza = o silêncio, azul = a descoberta. Datas sempre `dd/mm/aaaa`.
