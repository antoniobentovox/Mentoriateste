# Arquivos da marca

| Arquivo               | Onde aparece                                                      |
| --------------------- | ----------------------------------------------------------------- |
| `mentoria-logo.png`   | topo da abertura, topo do quiz e do formulário, card do resultado, e dentro do PNG que o professor baixa |
| `imagem-homepage.png` | coluna da direita da primeira tela                                 |
| `otto.png`            | canto do card de resultado e do PNG baixado                        |

## Sobre o recorte

Os originais enviados vinham numa moldura de 1600x1080 com margem
transparente em volta da arte. No caso da logo, o desenho ocupava só 30% da
altura do arquivo, então pedir `h-12` no CSS entregava um lettering de ~11px:
era por isso que a logo aparecia minúscula.

Os arquivos em uso foram recortados na caixa da arte, com 6px de folga para
preservar a antisserrilha:

- `mentoria-logo.png`: 1600x1080 → 1450x338
- `otto.png`: 1600x1080 → 998x993

Os arquivos como chegaram estão em `originais/`. Se um dia a logo for
substituída, vale repetir o recorte — caso contrário as alturas do CSS voltam
a valer sobre a moldura, e não sobre o desenho.

## Se precisar repor os arquivos

O caminho completo desta pasta nesta máquina:

```
C:\Users\anton\Mentoriateste\public\marca\
```

Fundo transparente nos três. Sem eles a página não quebra: a logo cai para um
lettering, a primeira tela fica em uma coluna só e o polvo não aparece.
