# Changelog

## 2.3.0 — 17/11/2026

- Verificar deixa de ser etapa obrigatória: o check, a inspeção visual e o teste de uma leitura rodam quando o usuário pede ou quando o risco só aparece no render. HTML Didático, Wireframe e Blueprint seguem essa regra; HTML Proof não muda.
- Nada de verificação fica junto da entrega: `scripts/check.mjs` grava screenshots e JSON numa pasta temporária do sistema, não mais em `.check/` ao lado do documento.
- Playbook Aula: a aula é um arquivo só; bancada, boards, censo e scripts de geração não ficam ao lado dela.
- Kit: a barra de abas não quebra o rótulo em duas linhas no celular; rola para o lado.

## 2.2.0 — 17/11/2026

- Playbook Aula em HTML Didático: um assunto em construção consolidado em um HTML, com as tabs que o pedido pede. Aula existe sempre, em quadros-pergunta; Na tela é um protótipo funcional do estado decidido; Dúvidas tem uma subtab por dúvida, com a comparação e a recomendada; Leis guarda só as decisões do usuário, datadas, contra regressão; Roadmap entra quando pedido ou quando uma lei muda o produto.
- Kit: abas dentro de abas (`tabs tabs--sub`) e endereço `#id` que abre as abas que contêm o alvo. A folha de peças mostra as subtabs.
- `scripts/check.mjs` lê todas as abas de um documento, uma abaixo da outra.
- `scripts/montar.mjs --atualizar` passa a reembutir também o `kit.js`.
- Roteamento, Conteúdo e casos de teste reconhecem a aula como modo de HTML Didático.

## 2.1.0 — 15/11/2026

- HTML Didático nasce de um kit: `references/kit/` traz tokens, dois looks (manual e editorial), peças de página, de cena e de esquema, o starter e a folha de peças. Espaço por função em escala de base 4; toda cor em token.
- Dois exemplos-ouro em `references/kit/ouro/`: passo a passo (o manual do EscalaFlow refeito no kit) e explicação.
- `references/conteudo.md` é dono da voz, da ordem e da quantidade do documento didático; `references/visual/design.md`, dos princípios de design e do método da figura.
- `scripts/check.mjs` renderiza em três larguras e mede; `scripts/montar.mjs` regera starter e folha de peças a partir de `kit.css`.
- Playbook didático reescrito como processo de sete passos. O modo sistemas usa as peças do kit.
- Saem `visual/sistemas.md`, `visual/tokens-editorial.md` e `visual/anatomia-editorial.md`, substituídos pelo kit. Tokens e anatomia de manual, dioramas, base e motion permanecem para HTML Proof.
- `tools/design-system/gerar.mjs` gera, a partir do kit, os arquivos do design system no Claude; `docs/MANUTENCAO.md` descreve o ciclo de atualização. Os dois ficam fora do pacote instalado.
- Mudanças visuais sobre a gramática do exemplo A: rótulos em caixa de frase, texto de 12px ou mais, contraste AA, texto sempre na mesma coluna, superfícies com fio no lugar da sombra deslocada, legenda sob a figura com numeração automática. Exemplos históricos A–E preservados.

## 2.0.0 — 09/11/2026

- Breaking: dez entradas públicas reorganizadas em cinco resultados: HTML Didático, HTML Wireframe, HTML Blueprint, HTML Proof e Explicar com Clareza. IDs antigos removidos, sem aliases.
- Manual, editorial e sistemas são modos internos; prova-final e proof-html têm um único contrato.
- Fontes, escrita e portabilidade extraídas; receitas divididas por uso e playbooks independentes, sem leitura integral da skill principal.
- Elements of Style vira recurso interno progressivo; texto e créditos preservados.
- Proof decide pelo renderer existente, mesmo quando o pack ainda não foi gerado.
- Exemplos históricos A–E preservados; novos casos separados para cada skill e ambiguidades.
- Manifesto portátil e metadados legíveis por skill; versões e marketplaces sincronizados.


## 1.2.0 — 08/11/2026

- Sete entradas diretas: `manual-operacao`, `editorial`, `prova-final`,
  `prancha-decisao`, `blueprint-componentes`, `explicar-sistema` e `proof-html`.
- Dez skills descobertas no plugin, incluindo as três anteriores.
- Entradas especializadas reutilizam os playbooks e receitas canônicos.
- Blueprint da 1.1.0 e exemplos A–E preservados; nenhum HTML de proof reescrito.
- Versão sincronizada nos três manifestos e nos três marketplaces.

## 1.1.0 — 07/11/2026

- Direção E: blueprint de composição com investigação em mapas, patterns,
  componentes, JSX e contratos.
- Playbook para árvore de arquivos, montagem progressiva dos primitivos ao
  consumidor, children/slots e contratos laterais.
- Receita HTML exemplar com deltas novos identificados como propostas.
- Roteamento e referências atualizados; exemplos A–D preservados.

## 1.0.1 — 05/11/2026

- README: o repositório é privado; o Codex instala pelo endereço SSH.

## 1.0.0 — 05/11/2026

- Plugin próprio, fora do Superflow, para Claude Code, Codex e Cursor.
- Recupera html-didatico (Direções A–D), explain-clearly e
  writing-clearly-and-concisely da última revisão no Superflow.
- Narrativa para explicar sistemas (§1.2) e primitivos de sistema
  (`receita.md` §12).
- `references/proof-html.md`: renderer oficial × wireframe manual, anatomia e
  leis da prova.
- Regras para HTML aberto por arquivo (`file://`).
- Exemplos reais por direção.

