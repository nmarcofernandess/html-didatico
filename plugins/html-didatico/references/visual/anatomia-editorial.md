# Receita visual · anatomia-editorial

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 5. Anatomia B — peças de página

**Capa serif** com itálico colorido:

```css
.cover h1 { font-family: var(--serif); font-weight: 400;
  font-size: clamp(52px, 8.5vw, 108px); line-height: 1; max-width: 14ch; }
.cover h1 em { font-style: italic; color: var(--accent); }
```

**Numeral fantasma** (marca d'água da seção):

```css
.slice .num { position: absolute; top: 3vh; right: 3vw; font-family: var(--serif);
  font-size: clamp(140px, 20vw, 270px); line-height: 1; color: transparent;
  -webkit-text-stroke: 1px var(--hair); user-select: none; pointer-events: none; }
.slice:nth-of-type(even) .num { right: auto; left: 3vw; }
```

**Kicker + labels** (mono/uppercase é o esqueleto informacional):

```css
.kicker { font-size: 12px; font-weight: 600; letter-spacing: .22em;
          text-transform: uppercase; color: var(--accent); }
```

**Faixa "na prática"** (a âncora didática — serif itálico sobre fundo accent suave):

```css
.pratica { border-left: 2px solid var(--accent); background: var(--accent-soft);
           padding: 22px 28px; }
.pratica p { font-family: var(--serif); font-style: italic; font-size: 23px;
             line-height: 1.35; max-width: 58ch; }
```
