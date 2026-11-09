# Casos de uso das cinco entradas

Walkthroughs de autoria e inspeção, não avaliações automatizadas de um modelo.
O validador estrutural verifica o pacote; estes casos verificam o significado
das instruções e as saídas produzidas nesta revisão.

| Skill | Pedido exercitado | Fonte e aceite |
|---|---|---|
| HTML Didático | “Explique em HTML como o plugin separa suas entradas e referências.” | Estrutura atual do pacote; [exemplo](examples/didatico.html) situa fontes, escolha e leitura progressiva sem copiar status de outro projeto. |
| HTML Wireframe | “Compare duas posições para a ação Salvar.” | Hipótese explicitamente proposta; [exemplo](examples/wireframe.html) usa mesmo esqueleto, custos e uma recomendação, sem alegar implementação. |
| HTML Blueprint | “Mostre como Summary compõe Panel e Status.” | [Fixture de código](fixtures/components.jsx); [exemplo](examples/blueprint.html) distingue prop de children, default de valor do uso e marca `size` como proposta ausente. |
| HTML Proof | “Apresente o resultado da validação deste pacote.” | `python3 scripts/validate-package.py`; [exemplo](examples/proof.html) apresenta saída de máquina observada, sem screenshot inventado e com limites do teste. |
| Explicar com Clareza | “Explique por que uma tag nova não atualiza uma instalação fixada na antiga, em texto.” | Referência fixa do marketplace; [resposta](examples/clareza.md) mantém cadeia causal e não gera HTML. |

## Casos de fronteira

| Pedido/contexto | Rota e resultado esperado |
|---|---|
| “Explique o sistema”, sem pedir visual | Explicar com Clareza, em texto. |
| “Explique o sistema em HTML” | HTML Didático, modo sistemas, com A ou B. |
| “Blueprint de onde fica o botão” | HTML Wireframe: o eixo é layout. |
| “Como este botão recebe children e props?” | HTML Blueprint: o eixo é composição/API. |
| “Wireframe do relatório de prova” | HTML Proof: planejamento de verificação. |
| Renderer oficial existe; nenhum pack foi gerado | HTML Proof segue contrato/renderer; não cria prova manual. |
| Renderer existe, mas falhou | Diagnóstico no owner; não usar modo manual como fallback oficial. |
| Existência de renderer não determinada | Registrar a lacuna; não fabricar prova oficial. |
| Projeto confirmado sem renderer, antes da execução | Planejamento Rev. 0, status não executado e slots vazios. |
| Mesmo projeto, resultado real obtido | Preencher o mesmo arquivo e atualizar revisão/veredito. |
| “Faça um mural e cite este pack” | HTML Didático, link para o pack; mural não vira proof. |
| “Revise só a pontuação” | Recurso interno de escrita; sem HTML obrigatório. |

Avalie as rotas contra `references/roteamento.md` no pacote. Exercite a regressão
do renderer com fontes que comprovem sua existência e ausência do pack; o título
de uma referência antiga não pode justificar fallback manual.
