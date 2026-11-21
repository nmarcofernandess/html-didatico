# HTML Didático · instruções de manutenção

Skills públicas ficam em `plugins/html-didatico/skills/`: somente as seis
entradas documentadas no README. Recursos compartilhados e playbooks ficam em
`plugins/html-didatico/references/`, sem `SKILL.md` interno ou aliases públicos.
Cada regra tem um owner; carregue receitas e referências conforme a tarefa.

O manifesto portátil `plugin.json`, os três manifestos de compatibilidade
(`.claude-plugin`, `.codex-plugin`, `.cursor-plugin`) e os três marketplaces da
raiz declaram a mesma versão; mude os sete arquivos juntos. Metadados Codex de
cada skill usam `agents/openai.yaml` para o nome legível, mantendo IDs portáteis.

Toda atualização termina em release: sincronize versões, registre no CHANGELOG,
valide o pacote, faça a tag `vX.Y.Z` e publique a release. Depois atualize a
instalação local pelo fluxo suportado e confira separadamente versão efetiva,
origem e skills de cada host disponível. Não edite caches nem declare que uma
sessão aberta recarregou o catálogo sem observação. Relate hosts indisponíveis.

Exemplos em `references/exemplos/` são documentos históricos reais. Preserve
seus bytes; não os reescreva para ilustrar regra nova nem trate seus status como
fatos atuais. Acrescente exemplos de teste separados quando necessário.

O sistema visual de HTML Didático tem fonte única em
`plugins/html-didatico/references/kit/` (`kit.css`, `kit.js`, `sprite.svg`).
Depois de mudá-la, rode `node plugins/html-didatico/scripts/montar.mjs` para
regerar `starter.html` e `pecas.html`, atualize os exemplos-ouro com
`--atualizar` e rode `scripts/check.mjs` neles e na folha de peças. Os exemplos-ouro em
`references/kit/ouro/` são vivos e acompanham o kit; os históricos A–E não.

O design system "HTML Didático" no Claude é gerado do kit por
`tools/design-system/gerar.mjs` e nunca é fonte. O ciclo completo, incluindo o
caminho de volta de uma ideia aprovada lá, está em `docs/MANUTENCAO.md`.
