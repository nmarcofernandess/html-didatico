# Uma tag nova não move a instalação antiga

O marketplace guarda a referência que deve baixar. Se ela é `v1.0.1`, publicar
`v2.0.0` cria outra referência no repositório; a tag anterior continua apontando
para o mesmo conteúdo. Por isso, atualizar o marketplace ainda pode trazer a
versão antiga: ele consulta o endereço que ficou registrado.

A atualização precisa trocar a referência para a nova tag e atualizar o plugin
pelo fluxo do host. Depois se confere o caminho e a versão instalada. Uma sessão
já aberta pode continuar com as skills que carregou no início; recarregar o
catálogo é uma verificação separada.

Este exemplo descreve a relação entre referências fixas e atualização. O
registro da reorganização informa quais instalações foram efetivamente observadas.
