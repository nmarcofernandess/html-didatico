# Receita visual · maquete

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 11. Anatomia D — Prancha de Decisão

Gênero autônomo (não é delta de A). O mundo visual é **planta baixa**: papel
técnico, grafite, linha de construção fina, e a cor do marcador de revisão —
que é literalmente o que o leitor vai fazer no documento.

### 11.1 Tokens

```css
:root{
  --paper:#F7F7F5;      /* papel técnico, levemente quente */
  --ink:#23262B;        /* grafite azulado, não preto puro */
  --ink-soft:#5C626B;
  --rule:#C4C8CE;       /* linha de construção */
  --rule-hard:#9AA0A8;  /* contorno de peça */
  --ghost:#EAECEF;      /* preenchimento de caixa vazia */
  --ghost-2:#DFE2E6;    /* linha de texto simulada */
  --mark:#C2352B;       /* A cor. Só a região em disputa. */
  --mark-soft:rgba(194,53,43,.10);
  --mark-mid:rgba(194,53,43,.34);
  --mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;
  --sans:"IBM Plex Sans",-apple-system,"Segoe UI",sans-serif;
}
```

**Tema escuro vira cianotipia** — não é inversão naive, é o que uma planta faz:
`--paper:#0E2137; --ink:#DCE7F3; --rule:#2E4E73; --ghost:#152D48;
--mark:#FF9585`. Redefina só os tokens, nos três estados (`:root`,
`@media (prefers-color-scheme:dark)` guardado com `:not([data-theme="light"])`,
e `:root[data-theme="dark"]`).

**Sem sombra, sem raio, sem gradiente decorativo.** Prancha que fica bonita
demais faz o leitor avaliar a estética em vez da estrutura.

### 11.2 A mini-tela (`.win`)

O primitivo central: o esqueleto do documento sendo decidido, em cinza.

```html
<div class="win">
  <div class="tabs">
    <div class="tab">1</div><div class="tab on">2 SPECS</div><div class="tab">3</div>
  </div>
  <div class="body-area">
    <div class="zone">
      <span class="zone-lbl">o que está em disputa</span>
      <div class="lane w85"></div><div class="lane w70"></div>
    </div>
    <div class="row w92"></div><div class="row w60"></div>
  </div>
</div>
```

```css
.win{ border:1px solid var(--rule-hard); background:var(--ghost); }
.tabs{ display:flex; border-bottom:1px solid var(--rule-hard); }
.tab{ flex:1; font-family:var(--mono); font-size:8.5px; text-align:center;
      padding:6px 2px; color:var(--ink-soft); border-right:1px solid var(--rule); }
.tab:last-child{ border-right:0 }
.tab.on{ background:var(--paper); color:var(--ink); font-weight:600 }
.body-area{ background:var(--paper); padding:10px; min-height:118px }
.row{ height:9px; background:var(--ghost-2); margin-bottom:6px }  /* texto simulado */
.w92{width:92%} .w80{width:80%} .w60{width:60%} .w45{width:45%}

/* a região em disputa — hachura de revisão */
.zone{
  border:1.5px solid var(--mark);
  background:repeating-linear-gradient(135deg,transparent 0 5px,var(--mark-soft) 5px 10px);
  padding:7px 8px; margin-bottom:8px;
}
.zone-lbl{ font-family:var(--mono); font-size:8.5px; letter-spacing:.1em;
           text-transform:uppercase; color:var(--mark); font-weight:600;
           display:block; margin-bottom:5px }
.lane{ height:7px; background:var(--mark); opacity:.34; margin-bottom:4px }
```

### 11.3 A prancha (`.plan`) — moldura, cota e custo

```html
<article class="plan rec">
  <div class="plan-cap"><span>FIG. 1B</span><span>★ FAIXA FIXA</span></div>
  <div class="draw"> <!-- a .win aqui --> </div>
  <div class="dim">acima das abas — visível de qualquer uma</div>
  <div class="verdict">
    Uma frase do que muda para quem usa.
    <span class="cost">custo · zero clique</span>
  </div>
</article>
```

```css
.plan{ border:1px solid var(--rule-hard); background:var(--paper);
       display:flex; flex-direction:column }
.plan.rec{ border-color:var(--mark); border-width:1.5px }   /* a recomendação, UMA só */
.plan-cap{ font-family:var(--mono); font-size:10px; letter-spacing:.14em;
           text-transform:uppercase; color:var(--ink-soft); padding:7px 10px;
           border-bottom:1px solid var(--rule); display:flex;
           justify-content:space-between; gap:10px }
.plan.rec .plan-cap{ color:var(--mark) }
.draw{ padding:14px 14px 4px; flex:1 }
.dim{ font-family:var(--mono); font-size:10px; color:var(--ink-soft);
      padding:0 14px 12px; display:flex; gap:6px; align-items:baseline }
.dim::before{ content:"↳"; color:var(--mark) }
.verdict{ border-top:1px solid var(--rule); padding:11px 14px 13px;
          font-size:13.5px; color:var(--ink-soft) }
.verdict .cost{ font-family:var(--mono); font-size:10.5px; letter-spacing:.06em;
                text-transform:uppercase; display:block; margin-top:7px; color:var(--mark) }
```

Grid: `.plan-grid{display:grid;gap:22px}` + `@media (min-width:820px){
.plan-grid.three{grid-template-columns:repeat(3,1fr)} }` (e `.two` em 720px).

### 11.4 O jeito errado, riscado

Quando existe um modo óbvio e ruim de fazer, desenhe-o. Vale mais que a regra.

```html
<div class="limit">
  <b>Teto: ~110 caracteres.</b> Passou disso vira parágrafo e ninguém lê.
  <div class="bad">
    <s>AGORA · 105/07 (28 commits, sem PR, teste RED não commitado) e 105/08…</s><br>
    ↑ isso é o detalhe da aba, não da faixa.
  </div>
</div>
```

```css
.limit{ border:1px dashed var(--rule-hard); padding:10px 12px;
        font-family:var(--mono); font-size:11px; color:var(--ink-soft) }
.bad{ margin-top:9px; padding:8px 10px; border-left:2px solid var(--rule-hard);
      font-size:10.5px; line-height:1.65 }
.bad s{ opacity:.65 }
```

### 11.5 Linha do tempo com retorno (`.line` + `.closing`)

Quando a decisão envolve **ordem** e a ordem de fechamento é inversa à de
criação — caso comum em campanha de specs, onde a mais nova destrava a mais
velha. A linha corre `▶`; a barra de fechamento corre `◀` embaixo.

```css
.line{ display:grid; grid-auto-flow:column; grid-auto-columns:1fr; align-items:stretch }
.node{ border:1px solid var(--rule-hard); border-right:0; background:var(--ghost);
       padding:8px 6px 9px; text-align:center }
.node:last-child{ border-right:1px solid var(--rule-hard) }
.node.now{ background:var(--mark-soft); border:1.5px solid var(--mark) }
.node.hold{ background:repeating-linear-gradient(135deg,transparent 0 4px,var(--ghost-2) 4px 8px) }
.node.dest{ border:1.5px solid var(--ink); background:var(--paper) }
.closing{ display:grid; grid-auto-flow:column; grid-auto-columns:1fr }
.cl{ height:26px; position:relative }
.cl-bar{ position:absolute; left:0; right:0; top:9px; height:2px; background:var(--mark-mid) }
.cl-bar.head::before{ content:"◀"; position:absolute; left:-2px; top:-6px;
                      color:var(--mark); font-size:11px }
```

Embrulhe em `.track-wrap{overflow-x:auto}` com `.track{min-width:900px}` — a
linha é larga por natureza e o body nunca deve rolar de lado.

### 11.6 O fechamento — a pergunta

```css
.ask{ border:1.5px solid var(--ink); padding:18px 20px }
.ask h3{ font-family:var(--mono); font-size:11px; letter-spacing:.16em;
         text-transform:uppercase; margin:0 0 12px; color:var(--mark) }
.ask ol{ margin:0; padding-left:20px; font-size:14.5px }
```

Conteúdo, quando houver decisões pendentes: um item por decisão, recomendação
sustentada e lacunas que impeçam desenhar. Se não houver pendência, registre o
resultado e o limite; não fabrique uma pergunta. O playbook Maquete governa o uso.
