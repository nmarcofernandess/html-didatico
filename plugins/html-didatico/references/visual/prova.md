# Receita visual · prova

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 10. Anatomia C — Prova Final / Wireframe de Verificação

Delta sobre a [anatomia manual](anatomia-manual.md) — reusa `.doc-plate`, `.rail`, `.step-num`, `.ia` e
os [tokens de manual](tokens-manual.md) sem alteração. O que é próprio do gênero:

**Doc-plate com convenção de revisão** (o rótulo de versão É o estado do
documento — Rev. 0 significa "vazio por desenho", não "rascunho qualquer"):

```html
<div class="doc-plate">
  <span>Prova final de operação <b>PF-054-001</b></span>
  <span>Rev. 0 · WIREFRAME · jul / 2026</span>
</div>
```

**Banner de wireframe** (declara o estado + a regra de validade do projeto —
adaptar o texto da regra pro projeto real, não deixar genérico):

```html
<div class="wire-banner">
  <b>isto é um wireframe.</b> Nenhum slot abaixo está preenchido — cada ▢ vira
  print real (PNG + JSON status=passed) quando a rodada de prova rodar. Regra
  de validade: print sem JSON não conta; falha não gera screenshot válido.
</div>
```
```css
.wire-banner { margin: 26px 0 0; border: 2px dashed var(--signal); background: var(--signal-soft);
  padding: 14px 18px; font-family: var(--mono); font-size: 12px; letter-spacing: .06em;
  color: var(--ink); text-transform: uppercase; }
.wire-banner b { color: var(--signal); }
```

**Card `.prova`** — o primitivo central do gênero. Cabeçalho com id curto e
status vazio, corpo em grid 2 colunas (texto+comando+aceite de um lado,
print-slot do outro):

```html
<div class="prova">
  <div class="prova-head">
    <span class="pid"><b>676-A</b> · pack visual completo re-capturado</span>
    <span class="status-slot">status ▢</span>
  </div>
  <div class="prova-body">
    <div class="prova-text">
      <p class="what">Re-rodar o proof de readiness/lifecycle inteiro contra o
      dev server — os três estados de Food, dirty-close inline, Flow A.</p>
      <div class="cmd">DIETFLOW_PROOF_BASE_URL=http://localhost:3020 \
npm run proof:readiness-lifecycle   <span># 14 shots + logs</span></div>
      <div class="where"><span>aceite →</span> 15/15 JSONs com status=passed</div>
    </div>
    <div class="print-slot">
      <div class="ph"><span><b>▢ 15 prints</b><br>grade-resumo do pack</span></div>
    </div>
  </div>
</div>
```
```css
.prova { border: 1.5px solid var(--ink); background: #fff;
  box-shadow: 4px 4px 0 rgba(25,22,19,.1); margin-bottom: 18px; }
.prova-head { display: flex; justify-content: space-between; align-items: center; gap: 10px;
  border-bottom: 1.5px solid var(--ink); padding: 10px 14px; flex-wrap: wrap; }
.prova-head .pid { font-family: var(--mono); font-size: 11px; letter-spacing: .1em;
  text-transform: uppercase; }
.prova-head .pid b { color: var(--signal); }
.status-slot { font-family: var(--mono); font-size: 9.5px; letter-spacing: .1em; text-transform: uppercase;
  border: 1.5px dashed var(--ink-faint); color: var(--ink-faint); padding: 4px 10px; }
.prova-body { display: grid; grid-template-columns: 1fr 220px; gap: 0; }
.prova-text { padding: 14px 16px; font-size: 14.5px; color: var(--ink-soft); }
.prova-text .what b { color: var(--ink); }
.cmd { margin-top: 10px; font-family: var(--mono); font-size: 11px; background: var(--paper-2);
  border-left: 3px solid var(--signal); padding: 8px 12px; color: var(--ink); overflow-x: auto; white-space: pre; }
.cmd span { color: var(--ink-faint); }
.print-slot { border-left: 1.5px dashed var(--ink-faint); display: grid; place-items: center;
  min-height: 130px; padding: 14px; }
.print-slot .ph { border: 2px dashed var(--ink-faint); color: var(--ink-faint); width: 100%;
  height: 100%; min-height: 100px; display: grid; place-items: center; text-align: center;
  font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase;
  line-height: 1.9; padding: 10px; }
.print-slot .ph b { color: var(--signal); font-size: 13px; }
@media (max-width: 760px) {
  .prova-body { grid-template-columns: 1fr; }
  .print-slot { border-left: none; border-top: 1.5px dashed var(--ink-faint); }
}
```

**Preenchimento (Rev. 1)** — quando a prova real é capturada, o mesmo card muda
de estado no lugar: `.status-slot` recebe uma classe de resultado
(ex. `passed`/`failed`, reusando as cores de `.tag.ok`/`.tag.err` do catálogo
[catálogo de dioramas](dioramas.md)) e o `.print-slot` recebe a imagem real:

```html
<span class="status-slot passed">passed ✓</span>
...
<div class="print-slot">
  <img src="proofs/676-a-grid.png" alt="grade-resumo do pack 676-A" style="width:100%;height:100%;object-fit:contain">
</div>
```
```css
.status-slot.passed { border-style: solid; border-color: var(--ok); color: var(--ok); }
.status-slot.failed { border-style: solid; border-color: var(--alert, #C2493F); color: var(--alert, #C2493F); }
```

**Organização da página**: 1 seção `.step`-numerada (reusa `.step-num` de A)
por PR/merge, cada uma citando o pack de prova anterior antes de listar
`.prova`s novos; depois, uma seção "Gates transversais" para critérios do
branch/entrega inteira (não por PR); fechamento em `.ia` (mesmo primitivo de
A) listando literalmente os slots que faltam preencher pra virar Rev. 1.


---
