// Exemplo-ouro dos boards: duas decisões e as leis de Números e unidades, no formato do motor (formato.md).
// Fontes, sem fato novo: a maquete-ouro (kit/ouro/maquete.body.html, 27/08/2026) dá a decisão 1;
// o decidir-ouro (kit/ouro/decidir.body.html, 18/11/2026) dá a decisão 2 e as leis. A lei de 999 mcg diz que
// nenhum teto foi aplicado: por isso a decisão 2 é "fica" e o quadro do meio é a recomendação, sem teto. Copie a forma, nunca o conteúdo.
//
//   node ../gerar.mjs numeros-e-unidades.mjs --html /tmp/boards     HTML do kit, para o check
//   node ../gerar.mjs numeros-e-unidades.mjs <canvas>/project       os boards do canvas

export const PAGINA = { id: 'decisoes', nome: 'Decisões' }

export const MAPA = {
  arquivo: 'Decisoes.dc.html',
  titulo: 'Números e unidades: o que falta decidir',
  titulo_canvas: 'Decisões · como decidir',
  olho: 'DietFlow · Números e unidades',
  data: '18/11/2026',
  depois: 'A resposta vira lei, com data e origem, e sai da mesa. Nada muda no produto antes dela.',
}

export const DECISOES = [
  {
    short: 'Glicose em mmol/L na Evolução',
    kind: 'muda',
    q: 'Glicose de 5,5 mmol/L num cadastro com faixa só em mg/dL: o card mostra o papel, julga ou converte?',
    rec: 'Mostrar o papel no header e plotar só o que tem faixa.',
    quadros: [
      ['O que acontece',
        'Maria trouxe um laudo em mmol/L. Três coletas estão em mg/dL e <b>a de 27/08 veio em mmol/L</b>.',
        `<w-fig cap="Em Registrados, a coleta de 27/08 tem 5,5 mmol/L">
          <w-win title="Registrados · Maria">
            <w-list>
              <w-item title="Glicose 94 mg/dL" meta="03/06" tag="Adequado" tagtone="ok"></w-item>
              <w-item title="Glicose 102 mg/dL" meta="15/07" tag="Limítrofe alto" tagtone="warn"></w-item>
              <w-item title="Glicose 99 mg/dL" meta="02/08" tag="Adequado" tagtone="ok"></w-item>
              <w-item title="Glicose 5,5 mmol/L" meta="27/08" tag="Sem referência" tagtone="ink" on mark pin="1"></w-item>
            </w-list>
          </w-win>
          <w-callout pin="1" mark>a unidade que o cadastro não tem</w-callout>
        </w-fig>`],
      ['Com a recomendação',
        'O header mostra <b>5,5 mmol/L, Sem referência</b>; a linha plota as três coletas em mg/dL e 27/08 fica fora dela.',
        `<w-fig cap="A · O header fala o papel; a linha fala uma unidade">
          <w-win title="Evolução · Glicose">
            <w-stat n="5,5" unit="mmol/L" mark>27/08/2026 · última coleta</w-stat>
            <w-chip tone="ink">Sem referência</w-chip>
            <w-line band="70-99" unit="mg/dL" min="60" max="115">
              <w-pt n="94">03/06</w-pt>
              <w-pt n="102">15/07</w-pt>
              <w-pt n="99">02/08</w-pt>
              <w-pt off mark pin="1">27/08</w-pt>
            </w-line>
          </w-win>
          <w-callout pin="1" mark>27/08 não plota</w-callout>
        </w-fig>`],
      ['Se fosse julgar ou converter',
        'Julgado na faixa de mg/dL, o 5,5 vira <b>Baixo</b>; convertido, a tela mostra <b>99 mg/dL</b> e o papel dizia outra coisa.',
        `<d-cols n="2">
          <w-fig cap="B · Julgar na faixa de mg/dL">
            <w-win title="Evolução · Glicose">
              <w-stat n="5,5" unit="mmol/L">27/08/2026</w-stat>
              <w-chip tone="err">Baixo</w-chip>
              <w-callout label="Faixa">70–99 mg/dL</w-callout>
            </w-win>
          </w-fig>
          <w-fig cap="C · Converter na borda">
            <w-win title="Evolução · Glicose">
              <w-stat n="99" unit="mg/dL">27/08/2026</w-stat>
              <w-chip tone="ok">Adequado</w-chip>
              <w-callout label="Papel">dizia 5,5 mmol/L</w-callout>
            </w-win>
          </w-fig>
        </d-cols>`],
    ],
    opts: [
      ['A · Header fala o papel', 'O header guarda o 5,5 mmol/L sem julgar; a linha só plota o que tem faixa.'],
      ['B · Julgar na faixa de mg/dL', 'O 5,5 é comparado com 70–99 e sai como Baixo.'],
      ['C · Converter na borda', 'O 5,5 mmol/L vira 99 mg/dL antes de chegar à tela.'],
    ],
    pick: 0,
  },
  {
    short: 'Teto de 999 mcg na dose',
    kind: 'fica',
    q: 'B12 de 1.000 mcg: o campo aceita, avisa ou recusa?',
    rec: 'Aceitar como está, sem teto.',
    quadros: [
      ['O que acontece',
        'Ficou dito que 999 mcg é o máximo. Como teto de digitação, isso recusaria <b>doses que se prescrevem todos os dias</b>.',
        `<w-fig cap="Três doses comuns acima de 999 mcg">
          <w-win title="Doses em mcg">
            <w-list>
              <w-item title="Vitamina B12" meta="1.000 mcg" mark pin="1"></w-item>
              <w-item title="Vitamina A" meta="3.000 mcg RAE"></w-item>
              <w-item title="Biotina" meta="5.000 mcg"></w-item>
            </w-list>
          </w-win>
          <w-callout pin="1" mark>o caso desta decisão</w-callout>
        </w-fig>`],
      ['Sem teto, que é a recomendação',
        '1.000 mcg <b>entra como está</b>. O engano de mil vezes já tem duas proteções: o aviso “Lido como milhar” e o limite diário da substância.',
        `<w-fig cap="A · 1.000 mcg entra como está">
          <w-win title="Vitamina B12 · dose">
            <w-field label="Quantidade" value="1.000" unit="mcg" mark pin="1"></w-field>
          </w-win>
          <w-callout pin="1" mark>aceita</w-callout>
        </w-fig>`],
      ['Se fosse o teto',
        'O mesmo 1.000 mcg é <b>recusado</b>, e a B12 precisa ser reescrita como 1 mg.',
        `<w-fig cap="C · 1.000 mcg é recusado">
          <w-win title="Vitamina B12 · dose">
            <w-field label="Quantidade" value="1.000" unit="mcg" tone="err"></w-field>
            <w-msg tone="err" title="Máximo de 999 mcg">Escreva 1 mg.</w-msg>
          </w-win>
        </w-fig>`],
    ],
    opts: [
      ['A · Sem teto', 'mcg aceita qualquer quantidade; o limite diário e o aviso de milhar protegem.'],
      ['B · Aviso acima de 999 mcg', 'Aceita e mostra uma vez “Acima de 999 mcg: confira se não seria mg”.'],
      ['C · Teto na dose', 'Recusa acima de 999 mcg; B12 de 1.000 mcg precisa virar 1 mg.'],
    ],
    pick: 0,
  },
]

export const JA_DECIDIDO = [
  ['17/11/2026', '3000 e 3.000 são três mil; a leitura é 3.000. Copiar e colar preserva o valor.', 'Correção de Marco'],
  ['17/11/2026', '1.000 e 1.234 são milhar: ponto seguido de grupos de três dígitos agrupa. Qualquer outro ponto é decimal: 86.3 é 86,3.', 'Direção de Marco na decisão 5 da Prescrição'],
  ['17/11/2026', 'Sem conversão automática de unidade: o nutricionista digita e escolhe a unidade.', 'Diretriz de Marco'],
  ['17/11/2026', '999 mcg é o máximo no contexto da unidade menor. O alcance aguarda resposta na decisão 2; nenhum teto foi aplicado.', 'Fala de Marco'],
]

export const ALTURAS = { mapa: 1700, D01: 3100, D02: 2900 }
