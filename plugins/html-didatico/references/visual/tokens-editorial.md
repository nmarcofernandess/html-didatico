# Receita visual · tokens-editorial

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 2. Tokens — Direção B (editorial serif)

```css
/* Google Fonts: Instrument Serif (ital) + Instrument Sans — ou Fraunces + Archivo */
:root {
  --paper: #FAF9F5;
  --paper-2: #F2F0E9;
  --ink: #161815;
  --ink-soft: #2E332F;
  --muted: #6E7A72;
  --hair: #E3E2DA;
  --accent: #0E9F6E;                        /* 1 cor de sinal */
  --accent-soft: rgba(14,159,110,.07);
  --alert: #C2493F;                         /* só para erro DENTRO de diorama */
  --serif: "Instrument Serif", Georgia, serif;
  --sans: "Instrument Sans", "Helvetica Neue", sans-serif;
  --mono: "SF Mono", ui-monospace, Menlo, monospace;
}
body { background: var(--paper); color: var(--ink); font-family: var(--sans);
       font-size: 17px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
/* B usa página larga (6vw de margem) em vez de coluna central */
```
