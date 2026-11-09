# Verificação da reorganização 2.0.0

Autoria concluída em 09/11/2026; candidata baseada na `main` remota `01de1e4`.
Publicação e instalações têm estado próprio, registrado abaixo. A reorganização
remove nomes públicos antigos; a versão major sinaliza essa quebra.

## Estado encontrado

| Fonte | Estado observado na entrada |
|---|---|
| Checkout principal local | 1.0.1, três skills, limpo. |
| GitHub `main` | Commit `01de1e4`, manifestos 1.2.0, dez skills. |
| Releases/tags GitHub | Última release e tag 1.0.1; 1.1.0 e 1.2.0 só estavam em `main`. |
| Codex, marketplace Git `html-didatico` | 1.0.1 habilitada, referência fixa `v1.0.1`. |
| Codex, cópia `created-by-me-remote` | Cache 1.0.1 e três skills carregadas no catálogo deste chat. Origem independente do marketplace Git. |
| Claude Code | 1.0.0 habilitada, marketplace fixado em `v1.0.0`. |
| Cursor | Executável `agent` não encontrado; instalação não observada. |
| Skill avulsa | Existe `~/.agents/skills/html-didatico`, anterior ao plugin. Não foi alterada ou removida. |

## Composição e preservação

A [migração no README](../README.md#migração-da-120) mapeia as dez entradas para
as cinco saídas. Fontes/limites, significado, escrita e HTML portátil têm owners
compartilhados. Os playbooks visuais carregam receitas específicas, sem ler a
skill principal inteira. A referência de proof decide pela existência do renderer,
nunca pela existência de um pack gerado. Blueprint mantém investigação,
composição/slots, contratos, propostas locais, condições e fronteiras externas.

Os cinco HTMLs históricos A–E e o texto integral de *The Elements of Style*
foram comparados byte a byte com a base e permaneceram idênticos depois da mudança
de pasta. Os créditos de Strunk e a licença permanecem no pacote. O exemplo
semântico de UNIT Favorites foi preservado e identificado como ilustração
histórica, sem alegar estado atual do DietFlow. A referência Mermaid inexistente
na versão anterior foi retirada; a orientação agora é autossuficiente.

## Verificações executadas

- `python3 scripts/validate-package.py`: passou; exatamente cinco SKILL.md,
  IDs/nomes legíveis, sete versões concordantes e links Markdown internos resolvidos.
- YAML dos cinco frontmatters e dos cinco `agents/openai.yaml`: parse real com
  Ruby Psych, sem erro. O validador Python lê o subconjunto usado pelo pacote.
- `claude plugin validate plugins/html-didatico`: passou. Aviso não bloqueante
  de ícone ausente, anterior a esta reorganização; não foi criado um ícone fora
  do pedido. Esse comando não é revisão de segurança nem publicação em diretório.
- `git diff --check`: sem erro.
- [Cinco casos de autoria](../tests/cases.md): quatro HTMLs novos e uma explicação
  em texto, conferidos com suas fontes e os playbooks. A fixture Blueprint tem
  tipos JSDoc, children e defaults reais; a prop `size` permanece proposta.
- Casos de fronteira da mesma tabela conferidos por leitura das instruções:
  texto versus HTML, layout versus composição, planejamento de proof, renderer
  existente sem pack, renderer com erro, renderer não determinado e mural que
  cita prova. Isso é walkthrough semântico, não avaliação automatizada de outro modelo.
- Os quatro HTMLs foram abertos no navegador integrado por HTTP local associado
  a este checkout, em 1280×900 e 390×844. Capturas reais foram inspecionadas.
  Âncora “02 · Ler” navega para `#leitura`. Nenhum controle simula gravação real.
  Um caminho longo escapava da figura didática em 390 px; a quebra foi corrigida
  e a nova captura confirmou `scrollWidth = clientWidth = 390`.

Limites: a checagem de impressão foi interrompida e não foi repetida. Não houve
observação de abertura `file://` offline/de outra pasta; CSS e dados inline, ausência
de fetch/imports e dependências externas dos exemplos foram conferidos por leitura.
Não se declara aceite humano, runtime React da fixture ou comportamento de outro
modelo a partir desses resultados. Os exemplos históricos podem referenciar
assets externos não incluídos; não foram usados como evidência atual.

## Publicação e instalação

Pendente de execução no fechamento desta candidata. O checkout validado não
comprova release publicada nem catálogo de host atualizado.
