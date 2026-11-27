# Acervo · a forma de explicar que merece virar padrão

O plugin cresce pelo que funcionou nas entregas reais. Quando uma entrega acerta uma forma de explicar que vale além do caso, ela é registrada como candidata no acervo do repositório. A curadoria decide depois se vira padrão, exemplo-ouro ou componente; até lá, nada muda no plugin.

Este arquivo é dono do registro de candidatas: quando registrar, o que escrever e para onde vai. O que já virou regra mora em [Padrões](padroes.md); a pergunta que dispara o registro está em [Antes de entregar](nucleo.md#antes-de-entregar).

## Quando registrar

Registre só quando as três valem:

1. **Destravou.** Quem pediu entendeu ou decidiu por causa da forma, não apesar dela: disse que entendeu, decidiu na hora ou parou de repetir a pergunta.
2. **Serve a outro assunto.** A forma (a figura, a ordem, a régua, o componente) explicaria um caso de outro produto; o que é só conteúdo do caso fica de fora.
3. **Ainda não existe.** Nenhum padrão, exemplo-ouro ou componente do kit já faz isso. Leia [Padrões](padroes.md) e a lista de [componentes](kit/componentes.md) antes.

No máximo uma candidata por entrega. Na dúvida, não registre: o acervo vale pelo que tem de raro.

## O que escrever

Um arquivo curto, `AAAA-MM-DD-<assunto-em-kebab>.md`:

```markdown
---
data: 2026-11-27
forma: aula
assunto: DietFlow · testes do módulo Dieta
artifact: https://claude.ai/artifact/…   # ou o caminho do arquivo; "sem link" se não houver
plugin: html-didatico 4.2.0
---

# <o que a entrega explicou, em uma linha objetiva>

**A pergunta.** A pergunta real de quem pediu, com o caso.
**O que funcionou.** A forma, descrita para outra pessoa reproduzir: a figura, a ordem das partes, a régua, o componente.
**Por que funcionou.** O que ficou visível que antes não ficava.
**Regra candidata.** Uma frase, no formato de Padrões: o que toda entrega parecida deveria fazer.
**Onde entraria.** Padrões, um playbook, um exemplo-ouro ou um componente novo do kit.
```

Sem dado pessoal, de paciente ou de cliente, sem segredo e sem trecho de código privado: descreva a forma, cite o caso pelo assunto.

## Para onde vai

O acervo mora no repositório do plugin, fora do pacote: [`acervo/candidatos/`](https://github.com/nmarcofernandess/html-didatico/tree/acervo/acervo/candidatos), na branch `acervo`. Ele não entra no release, não pede versão nem PR. Use o primeiro caminho que o ambiente permitir:

1. **Git com acesso de escrita ao repositório.** Clone ou atualize `nmarcofernandess/html-didatico`, vá para a branch `acervo` (se ela ainda não existir, crie a partir de `main`), adicione o arquivo em `acervo/candidatos/`, faça um commit `acervo: <assunto>` e `git push origin acervo`. Só esse arquivo, nada mais.
2. **API do GitHub** (um conector ou MCP com escrita no repositório): crie o arquivo no mesmo caminho, na branch `acervo`, com a mesma mensagem.
3. **Sem escrita no repositório:** entregue o arquivo inteiro num bloco no fim da resposta, com a linha "Candidata ao acervo do html-didático", para quem pediu levar.

Na resposta do chat, uma linha só: o que foi registrado e onde. O registro nunca atrasa nem substitui a entrega.
