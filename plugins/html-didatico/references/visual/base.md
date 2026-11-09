# Receita visual · base

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 3. Base comum

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

/* reveal no load (direção A usa classes de delay) */
@keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.r  { animation: rise .7s cubic-bezier(.2,.7,.2,1) both; }
.d1 { animation-delay: .05s } .d2 { animation-delay: .15s } .d3 { animation-delay: .25s }
.d4 { animation-delay: .35s } .d5 { animation-delay: .45s }

@media print {
  .r, .reveal, .stamp { animation: none !important; opacity: 1 !important; transform: none !important; }
  section { break-inside: avoid; }
  body { background: #fff; }
}
```

Todo destaque que aplica um fundo deve definir também a cor do texto. Fundo
claro usa tinta escura; fundo escuro usa tinta clara. Nunca dependa da cor
herdada do container:

```css
.inline-mark { background: var(--paper-2); color: var(--ink); padding: 2px 5px; }
```

Movimento reduzido mantém o conteúdo imediatamente legível:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .r, .reveal { opacity: 1 !important; transform: none !important; }
}
```
