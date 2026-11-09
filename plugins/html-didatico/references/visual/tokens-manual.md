# Receita visual · tokens-manual

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 1. Tokens — Direção A (manual de operação)

```css
:root {
  --paper: #f3efe6;        /* papel kraft claro */
  --paper-2: #ece7da;      /* papel sombreado */
  --ink: #191613;
  --ink-soft: #4f4a42;
  --ink-faint: #8a8377;
  --signal: #e84e0f;       /* laranja quente — trocar por 1 cor da marca */
  --signal-soft: #f9ddd0;
  --ok: #2c6e49;
  --rule: #d6cfc0;
  --display: 'Futura', 'Avenir Next', 'Century Gothic', 'Trebuchet MS', sans-serif;
  --mono: 'SF Mono', 'Menlo', 'Cascadia Code', 'Consolas', monospace;
}
body {
  font-family: var(--display);
  background: var(--paper);
  color: var(--ink);
  line-height: 1.5;
  /* textura de papel: scanlines + luz no topo */
  background-image:
    repeating-linear-gradient(0deg, transparent 0 2px, rgba(25,22,19,.012) 2px 4px),
    radial-gradient(ellipse 120% 90% at 50% -10%, rgba(255,255,255,.5), transparent 60%);
}
.page { max-width: 880px; margin: 0 auto; padding: 0 32px 96px; }
```
