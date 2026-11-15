# HTML portátil e verificação visual

Este é o contrato comum dos quatro formatos HTML. A anatomia e os tokens vêm
do playbook escolhido; o estilo de manual não governa Blueprint ou Wireframe.
Renderer oficial mantém o contrato do projeto quando sua publicação distribui
HTML e assets como pacote. Não altere saída gerada para satisfazer esta receita.

## Arquivo e dependências

- HTML com `lang`, UTF-8, viewport, título descritivo e CSS inline no `head`.
- JS mínimo, clássico e inline; dados inline. Sem build, fetch/XHR local,
  imports de módulos, iframe local, bibliotecas ou CSS de CDN.
- Fontes externas são opcionais, sempre com fallback legível. O documento
  deve continuar útil sem rede; não dependa de baixá-las para compreender.
- Prefira SVG/CSS e imagens embutidas. Prints de proof podem ser assets relativos
  do pacote: entregue-os juntos. Caminhos absolutos do computador ou `/img/...`
  não são portáteis; links de fonte publicados podem usar HTTPS.
- Cabeçalhos semânticos, links descritivos, foco visível e teclado nos controles.
  Cor acompanha rótulo/forma; cada fundo define cor legível do texto.
- Movimento é opcional: no máximo uma microanimação narrativa além das entradas.
  Conteúdo permanece visível sem JS. Respeite `prefers-reduced-motion`; na impressão,
  desligue animações/reveal e preserve figuras, contratos e legendas essenciais.

## Verificação finita

1. Abra o exemplo do formato antes de desenhar e o resultado real depois.
   Exemplos antigos documentam a gramática, não o estado atual de seus projetos;
   prints/JSON irmãos podem não acompanhar o exemplo arquivado.
2. Inspecione desktop e largura próxima de 390 px, com conteúdo representativo:
   cortes, sobreposição, contraste, labels longos, figuras e ordem de leitura.
   Reorganize colunas; não encolha o documento inteiro até ficar ilegível.
3. Exercite os controles oferecidos, âncoras, foco e teclado; confira impressão.
   Não crie interações sem utilidade para o resultado.
4. Confirme funcionamento local/offline por `file://`, de outra pasta. Quando
   o ambiente só permitir HTTP local, confira os recursos e registre esse limite;
   HTTP sozinho não comprova `file://` nem ausência de dependências externas.
5. Relate o que foi lido, renderizado e observado, com ambiente/revisão e limites.
   Checagem estrutural não é inspeção visual nem aceite humano. Não execute testes
   de produto apenas para revisar apresentação: a seleção segue a propriedade
   e o contrato do projeto.

Em HTML Didático, o [check](../scripts/check.mjs) executa a parte mensurável dos
passos 1 e 2: renderiza em 390, 768 e 1280 px, salva os screenshots e mede texto
pequeno, contraste, cortes, vazamentos e densidade. Olhar os screenshots continua
sendo trabalho do autor.

A [base visual](visual/base.md) e o [motion](visual/motion.md) oferecem snippets
opcionais para os formatos que ainda não usam o [kit](kit/pecas.html). Adapte reveal para manter a leitura sem JS e em movimento reduzido.
