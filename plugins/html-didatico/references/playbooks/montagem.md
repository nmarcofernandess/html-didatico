# Montagem · playbook de composição

Uma folha técnica mostra a montagem do componente, dos elementos mais básicos
ao consumidor específico. O desenho fica à esquerda; seus contratos, à direita.
Ao descer, o leitor reconhece as mesmas peças dentro de uma composição maior.

Use para anatomia de componentes, composição com `children`/slots, mapa de
primitivos e features, ou investigação de uma interface antes de implementá-la.
O exemplo completo está em [E-blueprint-componentes.html](../exemplos/E-blueprint-componentes.html).
Leia seu HTML e abra-o antes de desenhar outro. Copie a gramática visual,
nunca nomes, props ou arquitetura sem conferir o projeto de destino.

## 1. Investigue de fora para dentro; apresente de dentro para fora

Comece pelo componente específico e siga seus imports, JSX e contratos até
as peças fundamentais. Depois desenhe a montagem no sentido inverso.

No DietFlow, leia primeiro o mapa de componentes em `.context`, os patterns
aplicáveis e as pastas `components`. Localize os caminhos reais: não suponha
que todo projeto usa a mesma árvore. Cruze mapa e patterns com os exports,
implementações, tipos e consumidores atuais. Registre branch, commit e data.
Um documento descreve intenção; um símbolo implementado comprova existência.

Para cada peça que aparece na folha, registre:

| Campo | Evidência necessária |
|---|---|
| Símbolo e origem | Arquivo que declara/exporta; pacote e versão se externo. |
| Papel nesta montagem | Primitivo, composição/feature, feature maior ou consumidor específico. |
| Conteúdo renderizado | JSX, slot nomeado, render prop ou `children`; inclua a condição. |
| Contrato | Declaração de tipos, props, mods/variants, defaults e valores usados. |
| Dados e comportamento | Hook, helper, adapter, callback, estado e dono da persistência quando relevantes. |
| Estado da evidência | Existe; alteração proposta; novo; não confirmado. |
| Fonte | Caminho, símbolo, linhas e revisão verificadas. |

Siga a cadeia até a fronteira real: elemento HTML, primitivo do design system
ou biblioteca externa. Se o código externo não puder ser lido, desenhe essa
fronteira como pacote/API e declare o limite. Não invente seus componentes
internos. Elementos de Recharts, HeroUI ou outra biblioteca só entram se a
composição investigada os usar.

**O papel é relativo.** Uma feature pode ser uma peça básica de outra feature.
Mostre o encaixe comprovado, sem criar wrappers nem mover arquivos para obter
uma pirâmide simétrica. Uma pasta chamada `shared` não comprova reutilização:
aponte os consumidores que realmente importam a peça.

## 2. Diferencie as relações antes de desenhá-las

| Relação | Como aparece na folha |
|---|---|
| A renderiza B | B fica dentro de A, no slot e na condição encontrados no código. |
| Consumidor passa B em `children` | O slot de A contém B; a cota identifica quem forneceu o conteúdo. |
| A importa B | Lista de dependências ou ligação rotulada `import`; não cria contenção visual. |
| Hook/helper/adapter alimenta A | Contrato lateral com entrada, saída e ligação curta; não vira caixa de UI. |
| Provider transmite contexto | Cota identifica provider, valor e leitor confirmados; não confundir com prop explícita. |

Um componente sem wrapper próprio pode receber um contorno de anotação,
rotulado `composição`, sem sugerir um nó DOM adicional. Portals, fragments,
render props e slots mantêm a topologia real, mesmo que ela não forme uma
árvore simples. Uma região invisível ou condicional continua identificada.

No exemplo `BaseModal → Section → Section.Grid → campos`, cada seta precisa
ser comprovada no JSX. Se `Section.Grid` não existir, mostre o layout real.
Se `density` chegar por prop, escreva `prop`; só escreva `herdado` quando o
provider e o consumidor forem encontrados. Não complete lacunas com a imagem
de referência.

## 3. Monte uma página contínua

One-page significa uma folha com rolagem vertical, não tudo comprimido numa
tela ou página A4. A leitura principal fica disponível sem abrir abas.

1. **Cabeçalho curto.** Nome do componente, recorte, revisão e legenda de estados.
2. **Árvore de arquivos.** Apenas os arquivos usados, com símbolos e IDs que
   reaparecem na montagem. Separe caminhos atuais de caminhos propostos.
3. **Montagem progressiva.** Primitivos → composição → feature maior →
   consumidor específico. Use quantas faixas a composição exigir.
4. **Registro de fontes.** Links e trechos necessários para auditar os encaixes,
   com lacunas e limites de verificação. Detalhes longos podem ficar em `details`.

Cada faixa é uma linha de duas colunas:

```text
03 · NomeDaFeature                           CONTRATO DESTA CAMADA
┌ NomeDaFeature · composição ─────────────┐  NomeDaFeatureProps
│ ┌ PrimitivoContainer ────────────────┐ │  • prop: tipo = valor deste uso
│ │ {children}                        │ │  • children ← consumidor
│ │ ┌ PeçaDaFaixaAnterior ──────────┐ │ │  • callback → dono do estado
│ │ └──────────────────────────────┘ │ │  + novaProp?: tipo · PROPOSTA
│ └──────────────────────────────────┘ │  origem · caminho:linhas
└──────────────────────────────────────┘
```

O desenho ocupa cerca de dois terços da largura. O contrato se alinha à peça
correspondente. Repita nomes e proporções reconhecíveis ao acrescentar camadas.
Faça o próximo encaixe visível; uma sequência de caixas vazias com títulos
diferentes não demonstra montagem. A árvore de arquivos também não substitui
o corte anatômico do componente.

Na coluna lateral, separe **contrato declarado**, **valor deste consumidor** e
**delta proposto**. Preserve os nomes exatos e os tipos relevantes, inclusive
unions, obrigatoriedade e callbacks. Se o tipo não foi encontrado, use
`tipo não confirmado`, não uma interface TypeScript inventada. Um trecho
abreviado deve ser marcado como recorte e apontar para a declaração completa.

Props de biblioteca, props do wrapper e mods do projeto não são a mesma API.
Mostre onde ocorre a tradução. Um novo valor de variant é delta do tipo e do
comportamento; o desenho precisa indicar ambos quando forem conhecidos.

## 4. Use cor para o delta, não para decorar

| Marca | Significado |
|---|---|
| Grafite + traço contínuo | Peça existente, sustentada pela fonte indicada. |
| Azul técnico, quando usado | Nome, fronteira ou ligação estrutural. |
| Verde + `+ NOVO` ou `+ PROPOSTA` | Arquivo, peça, prop ou valor adicionado à proposta. |
| Tracejado + `NÃO CONFIRMADO` | Relação ou contrato que ainda precisa de evidência. |

Ao adaptar algo existente, pinte apenas o delta de verde. O resto continua
neutro. Verde não significa implementado, aprovado nem teste passado. Uma peça
nova entra tracejada e identificada como proposta até haver código que a prove.
Não use somente cor: mantenha rótulo, sinal e estilo de linha legíveis na
impressão em preto e branco.

Mantenha papel off-white, traços finos, espaço consistente e tipografia técnica
legível. Nomes e tipos são monoespaçados. O vocabulário principal é contenção,
slot, alinhamento e cota curta. Sem sombra decorativa, capa gigante ou parágrafos
entre as peças. A didática está no encaixe. Use explicação curta apenas para
uma fronteira ou ambiguidade que o desenho não possa resolver sozinho.

## 5. Separe o mapa atual do projeto proposto

Uma montagem pode investigar o que existe ou propor uma composição futura.
O cabeçalho declara qual é o caso. Em proposta sobre base existente, preserve
os componentes comprovados e marque cada mudança localmente.

Quando houver dois consumidores, mostre o trecho compartilhado uma vez em
detalhe e depois seus encaixes específicos. Tipos, validação, permissões,
persistência e lifecycle continuam com seus donos reais. Aparência semelhante
não prova contrato compartilhável. Se a fronteira ainda for hipótese, mantenha
essa hipótese visível em vez de torná-la arquitetura aceita.

Esta receita produz documentação e desenhos. Não autoriza implementar o
produto, criar wrappers, mudar APIs, migrar dados, publicar ou alterar acessos.
Siga o pedido e as permissões vigentes para essas ações.

## 6. Verifique conteúdo, artefato e comportamento separadamente

- **Rastreabilidade:** cada componente, prop e relação principal aponta para
  fonte verificada ou tem estado de proposta/lacuna explícito. Caminhos da
  árvore correspondem aos símbolos desenhados.
- **Composição:** a peça anterior continua reconhecível na seguinte; slots,
  condições, origem de `children` e fronteiras externas estão corretos.
- **Contratos:** tipos e valores do uso não se confundem; o delta aparece
  somente onde muda, inclusive em callbacks e mods.
- **Artefato:** cumpra a [verificação HTML compartilhada](../html-portatil.md), incluindo contrato abaixo da própria peça no mobile e impressão sem cortes.
- **Limite de prova:** leitura de código comprova estrutura, não funcionamento.
  A montagem desenhada não é prova de runtime. Informe quais verificações foram feitas,
  quais falharam e quais não puderam ser executadas.

## Correções rápidas

| Se o resultado parece… | Ajuste concreto |
|---|---|
| Um mindmap de dependências | Refaça a figura com `children` e slots dentro de suas bordas. |
| Um catálogo de componentes | Acrescente a montagem que os reúne até o consumidor real. |
| Um tutorial cheio de parágrafos | Passe significado para nomes, encaixes, cotas e contratos. |
| Uma API perfeita sem fonte | Identifique o que é proposta e exponha o que falta verificar. |
| Uma prancha com várias opções de layout | Montagem se a pergunta é como monta; Decidir, com a maquete, se é qual layout escolher. |

**Saída:** um HTML one-page reutilizável, com árvore, composição progressiva,
contratos laterais, deltas locais e fontes. A receita exemplar define o rigor
da apresentação; a investigação de cada projeto define o conteúdo.
