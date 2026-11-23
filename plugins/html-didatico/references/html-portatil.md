# HTML portátil e verificação visual

Este é o contrato comum dos HTML do plugin: Cartão, Aula, Decidir, Montagem e a
Prova sem renderer. Todos usam o mesmo kit: tokens, componentes e o exemplo-ouro
da forma.
Renderer oficial mantém o contrato do projeto quando sua publicação distribui
HTML e assets como pacote. Não altere saída gerada para satisfazer esta receita.

## Arquivo e dependências

- HTML com `lang`, UTF-8, viewport, título descritivo e CSS inline no `head`.
- JS clássico e inline; dados inline. O `kit.js` embutido monta os componentes
  (`d-*`, `w-*`) ao abrir a página; além dele, só o script de um protótipo. Sem
  build, fetch/XHR local, imports de módulos, iframe local, bibliotecas ou CSS de CDN.
- Fontes do sistema (a Helvetica Neue do kit, com fallback). Nada de fonte externa:
  o documento é igual com ou sem rede.
- Prefira SVG/CSS e imagens embutidas. Prints de proof podem ser assets relativos
  do pacote: entregue-os juntos. Caminhos absolutos do computador ou `/img/...`
  não são portáteis; links de fonte publicados podem usar HTTPS.
- Cabeçalhos semânticos, links descritivos, foco visível e teclado nos controles.
  Cor acompanha rótulo/forma; cada fundo define cor legível do texto.
- Movimento é opcional: no máximo uma microanimação narrativa além das entradas.
  A prosa permanece legível sem JS; as figuras precisam do kit.js, que vem
  embutido. Respeite `prefers-reduced-motion`; na impressão,
  desligue animações/reveal e preserve figuras, contratos e legendas essenciais.

## Verificação, quando pedida ou necessária

Verificar não é etapa obrigatória de toda entrega. Verifique quando o usuário
pedir, ou quando o risco só aparece no render: layout novo, protótipo com
comportamento, conteúdo que pode cortar no celular. Escolha só o passo que
responde ao risco. Screenshots, JSON e relatórios de verificação ficam fora da
pasta da entrega, salvo pedido; o documento entregue é o HTML.

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
passos 1 e 2: renderiza em 390, 768 e 1280 px, salva os screenshots numa pasta temporária e
mede texto pequeno, contraste, cortes, vazamentos e densidade, quando rodado.

Todo formato usa o [kit](kit/pecas.html). O check também reprova componente que
não existe no kit e erro de script, e avisa quando o corpo tem peça desenhada à
mão no lugar do componente.
