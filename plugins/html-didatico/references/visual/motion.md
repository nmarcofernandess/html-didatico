# Receita visual · motion

Snippets de apresentação; contratos e conteúdo vêm do playbook do formato.

## 8. Micro-delícias

**Carimbo circular** (fechamento do documento — estampa com overshoot):

```html
<div class="stamp" aria-label="Piloto B validado em julho de 2026">
  <span>piloto B</span><strong>validado</strong><small>jul 2026</small>
</div>
```
```css
.stamp { flex: 0 0 200px; width: 200px; aspect-ratio: 1; display: flex;
  flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  border-radius: 50%; border: 3px double var(--accent); color: var(--accent);
  transform: rotate(-8deg); font-family: var(--mono); font-size: 11px;
  letter-spacing: .12em; text-transform: uppercase; text-align: center; }
.stamp strong { font-size: 16px; }
.stamp small { font: inherit; letter-spacing: .06em; }
@keyframes stampIn { from { opacity: 0; transform: rotate(-8deg) scale(1.7); }
                     to   { opacity: 1; transform: rotate(-8deg) scale(1); } }
/* disparar quando o container ganhar .in (reveal por scroll) */
.reveal.in .stamp { animation: stampIn .6s cubic-bezier(.2,1.6,.4,1) .35s both; }
```

## 9. Reveal por scroll (JS inteiro do documento)

```html
<script>
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }
</script>
```

```css
.js-reveal .reveal { opacity: 0; transform: translateY(22px);
  transition: opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1); }
.js-reveal .reveal.in { opacity: 1; transform: none; }
```
