# HTML Didático · instruções de manutenção

Skills públicas ficam em `plugins/html-didatico/skills/`: somente as sete
entradas documentadas no README, a automática (`html-didatico`) e as seis
diretas. Recursos compartilhados e playbooks ficam em
`plugins/html-didatico/references/`, sem `SKILL.md` interno ou aliases públicos.
Cada regra tem um owner; carregue receitas e referências conforme a tarefa.
O núcleo comum (`references/nucleo.md`) é o primeiro passo de toda entrada; a
escolha da forma mora em `references/roteamento.md` e a gramática de decisão,
em `references/decisao.md`.

O manifesto portátil `plugin.json`, os três manifestos de compatibilidade
(`.claude-plugin`, `.codex-plugin`, `.cursor-plugin`) e os três marketplaces da
raiz declaram a mesma versão; mude os sete arquivos juntos. Metadados Codex de
cada skill usam `agents/openai.yaml` para o nome legível, mantendo IDs portáteis.

Toda atualização termina em release: sincronize versões, registre no CHANGELOG,
valide o pacote, faça a tag `vX.Y.Z` e publique a release. Depois atualize a
instalação local pelo fluxo suportado e confira separadamente versão efetiva,
origem e skills de cada host disponível. Não edite caches nem declare que uma
sessão aberta recarregou o catálogo sem observação. Relate hosts indisponíveis.

Exemplos históricos ficam em `docs/historico/exemplos/`, fora do pacote do
plugin, para não ensinarem estilo obsoleto. Preserve seus bytes; não os reescreva
para ilustrar regra nova nem trate seus status como fatos atuais. Exemplo novo é
exemplo-ouro, feito com componentes.

O sistema visual de HTML Didático é um design system único com fonte em
`plugins/html-didatico/references/kit/`: `kit.css` (tokens e aparência),
`kit.js` (a biblioteca de componentes `d-*`/`w-*`, cada um com grupo, resumo,
props e exemplo) e `sprite.svg`. Não existem looks. Depois de mudá-la, rode
`node plugins/html-didatico/scripts/montar.mjs`: ele regera `starter.html`,
`pecas.html`, `componentes.md` e cada exemplo-ouro a partir de
`ouro/<nome>.body.html`. Rode `scripts/check.mjs` nos exemplos-ouro e na folha de
peças. Documento novo nasce de `montar.mjs --novo <base> <destino>` ou
`--corpo <corpo.html> <destino>`; uma base nova entra na lista `BASES`. Figura é
feita de componentes; se falta um, ele entra no kit com exemplo, nunca como
marcação à mão no documento.

O design system "HTML Didático" no Claude é gerado do kit por
`tools/design-system/gerar.mjs` e nunca é fonte. O ciclo completo, incluindo o
caminho de volta de uma ideia aprovada lá, está em `docs/MANUTENCAO.md`.
