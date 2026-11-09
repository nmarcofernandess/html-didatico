# Receita visual · anatomia-manual

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 4. Anatomia A — peças de página

**Doc-plate** (metadata de documento — o "carimbo de registro" no topo):

```html
<div class="doc-plate">
  <span>Manual de operação <b>EF-QS-001</b></span>
  <span>Rev. 1.10 · 2026</span>
</div>
```
```css
.doc-plate { display: flex; justify-content: space-between; font-family: var(--mono);
  font-size: 11px; letter-spacing: .12em; color: var(--ink-soft); text-transform: uppercase;
  border: 1px solid var(--ink); padding: 8px 14px; margin-bottom: 48px; }
.doc-plate b { color: var(--signal); }
```

**Título de capa** — display caps gigante + subtítulo fino:

```css
h1 { font-size: clamp(44px, 8vw, 76px); font-weight: 700; letter-spacing: -.02em;
     line-height: .95; text-transform: uppercase; }
h1 .thin { font-weight: 400; display: block; font-size: .42em; letter-spacing: .14em;
           margin-top: 14px; color: var(--ink-soft); }
header { padding: 56px 0 40px; border-bottom: 3px solid var(--ink); }
```

**Rail de navegação** (grid de âncoras, hover invertido):

```css
.rail { display: grid; grid-template-columns: repeat(6, 1fr); border: 1px solid var(--ink);
  border-top: none; font-family: var(--mono); font-size: 10px; letter-spacing: .08em;
  text-transform: uppercase; }
.rail a { color: var(--ink-soft); text-decoration: none; padding: 10px 6px 12px;
  text-align: center; border-right: 1px solid var(--rule); transition: .15s; }
.rail a b { display: block; font-size: 15px; color: var(--ink); }
.rail a:hover { background: var(--ink); color: var(--paper); }
.rail a:hover b { color: var(--signal); }
```

**Step alternado** (texto ⇄ diorama em zigue-zague):

```css
.step { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 64px 0;
        border-bottom: 1px solid var(--rule); align-items: center; }
.step:nth-child(even) .step-text { order: 2; }
.step:nth-child(even) .step-vis  { order: 1; }
.step-num { font-size: 88px; font-weight: 700; line-height: 1; color: transparent;
            -webkit-text-stroke: 1.5px var(--ink); letter-spacing: -.03em; }
```

**Localizador "onde"** (ancora a instrução na UI real):

```html
<div class="where"><span>onde →</span> Menu lateral · topo · Empresa</div>
```
```css
.where { margin-top: 18px; font-family: var(--mono); font-size: 11.5px; color: var(--ink);
  background: var(--paper-2); border-left: 3px solid var(--signal); padding: 8px 12px;
  display: inline-block; }
.where span { color: var(--ink-faint); }
```

**Callout invertido** (bloco escuro de destaque, com quadriculado fantasma e
mensagens estilo terminal):

```css
.ia { margin: 72px 0; background: var(--ink); color: var(--paper); padding: 44px 40px;
      position: relative; overflow: hidden; }
.ia::before { content: ''; position: absolute; inset: 0;
  background: linear-gradient(rgba(243,239,230,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(243,239,230,.05) 1px, transparent 1px);
  background-size: 22px 22px; }
.ia > * { position: relative; }
.ia .msg { font-family: var(--mono); font-size: 12px; background: rgba(243,239,230,.08);
  border: 1px solid rgba(243,239,230,.18); border-left: 3px solid var(--signal);
  padding: 10px 14px; }
.ia .msg::before { content: '> '; color: var(--signal); }
```
