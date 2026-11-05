# HTML Didático · instruções de manutenção

O conteúdo das skills mora em `plugins/html-didatico/skills/`. Os três manifestos
do plugin (`.claude-plugin`, `.codex-plugin`, `.cursor-plugin`) e os três
marketplaces da raiz declaram a mesma versão; mude todos juntos.

Toda atualização termina em release: suba a versão nos seis arquivos, registre
no CHANGELOG, faça a tag `vX.Y.Z` e publique a release. Depois atualize a
instalação local e confira a versão efetiva em cada host.

Exemplos em `references/exemplos/` são documentos reais. Não os reescreva para
ilustrar uma regra nova; acrescente um exemplo novo quando a regra pedir.
