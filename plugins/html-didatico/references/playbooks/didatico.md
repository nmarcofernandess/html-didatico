# HTML Didático · manual e editorial

O documento deve se entender sem tradutor. Defina uma espinha de 3–6 seções,
cada uma com uma ideia, uma cena e seu efeito no uso. Ajuste o número ao assunto;
não corte uma explicação necessária para caber na receita.

## Escolha um modo interno

| Modo | Uso | Carregar antes de escrever CSS |
|---|---|---|
| Manual (A) | Operação, onboarding, quickstart, runbook | [Tokens](../visual/tokens-manual.md), [anatomia](../visual/anatomia-manual.md) e [exemplo A](../exemplos/A-manual-escalaflow-quickstart.html). |
| Editorial (B) | Problema, mecanismo, decisão e narrativa | [Tokens](../visual/tokens-editorial.md), [anatomia](../visual/anatomia-editorial.md) e [exemplo B](../exemplos/B-editorial-panorama-export-v2.html). |

Escolha uma dominante; combinar A/B é permitido quando mantém hierarquia clara.
Sistemas usam A ou B mais o [playbook de sistemas](sistemas.md). Nenhum desses
modos é uma nova entrada pública.

## Anatomia e figuras

Capa com metadata/revisão e título → navegação quando útil → seções com texto e
diorama alternados → destaque se necessário → efeito prático/checklist → fontes.
No manual, cada passo ancora a ação na localização real e no resultado esperado.
No editorial, cada seção liga causa, evidência e consequência.

Leia o [catálogo de dioramas](../visual/dioramas.md) e copie apenas os primitivos
pertinentes. Uma figura conta uma cena, com 3–6 elementos reconhecíveis,
conteúdo da fonte e plaquinha `Fig. N — nome` sequencial sobre grid de 22 px.
Use personagens concretos se o caso existir ou estiver rotulado hipotético.
Diorama não substitui screenshot de evidência: esse resultado usa HTML Proof.

A usa display geométrica e mono; B, serif editorial, sans e mono. Papel quente,
tinta quase preta e uma cor de sinal. Labels/metadata em mono; bordas duras,
sombras offset sólidas, numerais vazados como âncoras. Sem gradiente decorativo,
glassmorphism ou cards aninhados que não expliquem uma relação. Cores extras
só quando codificarem dados. Os snippets calibram valores; não são APIs de UI.

## Conferência do conteúdo

Cada título situa estado, decisão ou problema; o bloco explica a causa/evidência
e termina no efeito prático. Comandos, caminhos e mensagens conferem com as
fontes. O leitor consegue recontar o mecanismo. Preserve figuras úteis em revisão
de texto. Para portabilidade e inspeção real, use o contrato HTML compartilhado.
