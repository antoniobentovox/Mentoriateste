# Garet

A fonte de título da marca é carregada por `@font-face` em `app/globals.css`.
Coloque nesta pasta:

- `Garet-Book.woff2` (peso 400)
- `Garet-Heavy.woff2` (peso 700)

Enquanto os arquivos não estiverem aqui, os títulos caem para Montserrat sem
quebrar o layout. Se a licença vier em `.otf` ou `.ttf`, converta para `woff2`
antes de publicar: o arquivo fica bem menor e o carregamento não trava a página.
