# Receita visual · dioramas

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 6. O canvas de diorama

Todo diorama vive nisto. O quadriculado + a plaquinha Fig. são o que transformam
divs soltas em "figura de manual":

```css
.fig {
  position: relative;
  border: 1px solid var(--ink);
  background:
    linear-gradient(rgba(22,24,21,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(22,24,21,.04) 1px, transparent 1px);
  background-size: 22px 22px;
  background-color: #FFFFFC;               /* papel mais claro que a página */
  padding: 30px 28px;
  display: flex; flex-direction: column; justify-content: center; gap: 14px;
  min-height: 240px;
}
.fig::after {
  content: attr(data-fig);                  /* <figure class="fig" data-fig="Fig. 1 — cadastro"> */
  position: absolute; bottom: -1px; right: -1px;
  font-family: var(--mono); font-size: 9.5px; letter-spacing: .1em;
  text-transform: uppercase;
  background: var(--ink); color: var(--paper); padding: 4px 12px;
}
```

## 7. Catálogo de primitivos de diorama

Sombra-assinatura de todos os elementos "vivos": `box-shadow: 4px 4px 0 rgba(ink, .1)`.
Elementos mortos/fantasma: borda `dashed`, sem sombra, cor muted.

**Card de UI genérico + input com caret piscando:**

```css
.ui-card { background: #fff; border: 1.5px solid var(--ink);
           box-shadow: 4px 4px 0 rgba(25,22,19,.12); padding: 14px 16px; }
.ui-label { font-family: var(--mono); font-size: 9.5px; letter-spacing: .14em;
            text-transform: uppercase; color: var(--ink-faint); margin-bottom: 6px; }
.ui-input { border-bottom: 2px solid var(--ink); font-size: 16px; font-weight: 600; }
.ui-input .caret { display: inline-block; width: 2px; height: 16px;
  background: var(--signal); vertical-align: -2px; animation: blink 1.1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0 } }
```

**Botão e pills de opção:**

```css
.ui-btn { display: inline-block; background: var(--ink); color: var(--paper);
  font-family: var(--mono); font-size: 11px; letter-spacing: .12em;
  text-transform: uppercase; padding: 9px 18px; }
.ui-btn.primary { background: var(--signal); color: #fff; }
.pill { font-family: var(--mono); font-size: 11px; border: 1.5px solid var(--ink);
        padding: 6px 14px; background: #fff; }
.pill.on { background: var(--signal); border-color: var(--signal); color: #fff; }
```

**Ficha de pessoa/registro (avatar + nome + tag de estado):**

```html
<div class="ficha">
  <div class="who">
    <div class="avatar">MS</div>
    <div><b>Maria Souza</b><small>CPF 111.222.333-44</small></div>
  </div>
  <span class="tag ok">ativa</span>
</div>
<div class="ficha ghost"><!-- mesma pessoa, excluída --></div>
```
```css
.ficha { background: #fff; border: 1.5px solid var(--ink);
  box-shadow: 4px 4px 0 rgba(22,24,21,.1); padding: 13px 16px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.ficha .who { display: flex; align-items: center; gap: 12px; }
.avatar { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--ink);
  background: var(--paper-2); display: grid; place-items: center;
  font-size: 12px; font-weight: 700; }
.ficha b { font-size: 15px; display: block; line-height: 1.2; }
.ficha small { font-family: var(--mono); font-size: 10.5px; color: var(--muted); }
.ficha.ghost { border-style: dashed; box-shadow: none; background: transparent;
               color: var(--muted); }
.ficha.ghost .avatar { border-style: dashed; background: transparent; }
```

**Tags de estado:**

```css
.tag { font-family: var(--mono); font-size: 9.5px; letter-spacing: .06em;
  text-transform: uppercase; border: 1px solid var(--hair); background: var(--paper-2);
  padding: 4px 9px; white-space: nowrap; }
.tag.ok  { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
.tag.err { border-color: var(--alert);  color: var(--alert);  background: #F9E5E2; }
.tag.off { border-color: var(--muted);  color: var(--muted);  background: transparent; }
```

**Toast de erro (usar a mensagem literal do sistema):**

```css
.toast { display: flex; align-items: center; gap: 10px; border: 1.5px solid var(--alert);
  background: #F9E5E2; padding: 11px 14px; font-family: var(--mono); font-size: 12px;
  color: var(--alert); box-shadow: 4px 4px 0 rgba(194,73,63,.12); }
.toast .x { width: 18px; height: 18px; border: 1.5px solid var(--alert);
  border-radius: 50%; display: grid; place-items: center; font-size: 11px; }
```

**Fluxo (nós + setas tracejadas):**

```html
<div class="fluxo">
  <span class="no">admin devolve</span><span class="seta"></span>
  <span class="no">arquivado</span><span class="seta"></span>
  <span class="no">você reativa</span>
</div>
```
```css
.fluxo { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; }
.fluxo .no { border: 1.5px solid var(--ink); background: #fff; padding: 7px 12px;
             letter-spacing: .06em; text-transform: uppercase; white-space: nowrap; }
.fluxo .seta { flex: 1; min-width: 20px; height: 1.5px;
  background: repeating-linear-gradient(90deg, var(--ink) 0 6px, transparent 6px 11px); }
```

**Mini-modal (título, corpo, botões):**

```css
.modal { background: #fff; border: 1.5px solid var(--ink);
         box-shadow: 6px 6px 0 rgba(22,24,21,.12); }
.modal .mhead { display: flex; align-items: center; gap: 8px;
  border-bottom: 1.5px solid var(--ink); padding: 9px 14px; font-family: var(--mono);
  font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
.modal .mhead i { width: 9px; height: 9px; border-radius: 50%; border: 1.5px solid var(--ink); }
.modal .mbody { padding: 16px; }
.modal .mfoot { display: flex; gap: 10px; justify-content: flex-end; padding: 0 16px 16px; }
.btn { font-family: var(--mono); font-size: 10.5px; letter-spacing: .1em;
  text-transform: uppercase; padding: 8px 14px; border: 1.5px solid var(--ink);
  background: #fff; }
.btn.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
```

**Legenda de estados (dot + termo + significado):**

```css
.estado { display: flex; align-items: center; gap: 14px; background: #fff;
  border: 1.5px solid var(--ink); box-shadow: 4px 4px 0 rgba(22,24,21,.08);
  padding: 11px 16px; }
.estado .dot { width: 11px; height: 11px; border-radius: 50%; }
.estado b { font-family: var(--mono); font-size: 12px; letter-spacing: .1em; min-width: 96px; }
.estado span { font-size: 14px; color: var(--muted); }
```

**Toggle/switch ligado:**

```css
.switch { width: 40px; height: 22px; border: 1.5px solid var(--accent);
  background: var(--accent); border-radius: 99px; position: relative; }
.switch::after { content: ''; position: absolute; top: 2px; right: 2px;
  width: 14px; height: 14px; background: #fff; border-radius: 50%; }
```

**Barra de faixa (horário/progresso com hachura):**

```css
.hours-track { flex: 1; height: 14px; border: 1.5px solid var(--ink); background: #fff;
               position: relative; }
.hours-fill { position: absolute; left: 28%; right: 12%; top: 2px; bottom: 2px;
  background: repeating-linear-gradient(45deg, var(--ink) 0 4px, transparent 4px 8px); }
```

**Mini-gráfico de barras:**

```css
.bars { display: flex; align-items: flex-end; gap: 10px; height: 120px; }
.bar { flex: 1; display: flex; flex-direction: column; justify-content: flex-end;
       align-items: center; gap: 6px; height: 100%; }
.bar i { width: 100%; background: #fff; border: 1.5px solid var(--ink);
         border-bottom-width: 3px; display: block; }
.bar.hot i { background: var(--signal-soft); border-color: var(--signal); }
```

**Mini-calendário 7 colunas (célula marcada = folga/evento):**

```css
.grid7 { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.cell { aspect-ratio: 1; border: 1.5px solid var(--ink); background: #fff;
  display: grid; place-items: center; font-family: var(--mono); font-size: 10.5px;
  font-weight: 700; }
.cell.f { background: var(--signal); border-color: var(--signal); color: #fff; }
```

**Conexão pessoa → destino (avatar + linha tracejada + caixinha):**

```css
.person { display: flex; align-items: center; gap: 12px; }
.person .link { flex: 1; height: 1.5px;
  background: repeating-linear-gradient(90deg, var(--ink) 0 6px, transparent 6px 11px); }
.person .dest { font-family: var(--mono); font-size: 10.5px; background: #fff;
                border: 1.5px solid var(--ink); padding: 5px 10px; }
```

**Item morto/oculto que some em loop (didática de "ocultou, sumiu"):**

```css
.morto { background: #fff; border: 1.5px dashed var(--muted); padding: 13px 16px;
         color: var(--muted); animation: sumiu 3.2s ease-in-out infinite; }
.morto b { text-decoration: line-through; text-decoration-color: var(--alert); }
@keyframes sumiu { 0%, 55% { opacity: 1 } 75%, 85% { opacity: .15 } 100% { opacity: 1 } }
```
