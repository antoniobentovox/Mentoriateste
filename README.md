# Quiz de diagnóstico de IA na sala de aula | Mentoria

Landing page de captura de lead para professores da educação básica. O professor
chega por um anúncio, responde 8 perguntas sobre o uso de IA no dia a dia, informa
o e-mail para ver o resultado e recebe o mesmo diagnóstico na caixa de entrada,
com a ponte para as ferramentas do Mentoria que atendem as dores detectadas.

## Stack

- Next.js 16 (App Router) e TypeScript
- Tailwind CSS 4
- Garet (títulos, self-hosted em `public/fonts`) e Montserrat (corpo, via `next/font`)
- Envio de e-mail transacional pela API do Brevo, dentro da Route Handler `/api/lead`
- Deploy alvo: Vercel

## Como rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # build de produção
npm start          # sobe o build de produção
npm run typecheck  # checagem de tipos
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha. Nenhuma delas tem prefixo
`NEXT_PUBLIC_`, então todas ficam apenas no servidor.

| Variável | Obrigatória | Para que serve |
| --- | --- | --- |
| `BREVO_API_KEY` | sim, para o e-mail sair | Chave da API transacional do Brevo |
| `BREVO_SENDER_EMAIL` | sim, para o e-mail sair | Remetente verificado no Brevo |
| `BREVO_SENDER_NAME` | não | Nome que aparece no remetente. Padrão: `Mentoria` |
| `MENTORIA_URL` | não | Destino do CTA "Conhecer o Mentoria", na tela e no e-mail. Padrão: o endereço com UTMs definido em `lib/links.ts`. |

### Onde pegar a chave do Brevo

1. Entre no painel do Brevo e vá em **SMTP & API > API Keys**.
2. Clique em **Generate a new API key** e copie o valor para `BREVO_API_KEY`.
3. Em **Senders, Domains & Dedicated IPs > Senders**, cadastre e verifique o
   remetente que você vai usar em `BREVO_SENDER_EMAIL`. E-mail de remetente não
   verificado faz a API recusar o envio.

A chave é lida somente dentro de `lib/brevo.ts`, que roda no servidor. Ela nunca
chega ao navegador.

### Deploy na Vercel

Cadastre as quatro variáveis em **Settings > Environment Variables** do projeto.
A home é gerada estaticamente e lê `MENTORIA_URL` no momento do build, então
mudar essa variável pede um novo deploy para valer na página. O e-mail lê as
variáveis a cada requisição.

## Estrutura

```
app/
  layout.tsx            fontes, metadata e o placeholder comentado do Meta Pixel
  globals.css           Tailwind e os tokens da paleta
  page.tsx              server component, injeta MENTORIA_URL no fluxo
  api/lead/route.ts     POST do lead e disparo do e-mail pelo Brevo

components/
  FluxoQuiz.tsx         estado das 4 etapas em single page
  Abertura.tsx          etapa 1
  Quiz.tsx              etapa 2
  BarraProgresso.tsx
  GateEmail.tsx         etapa 3
  Resultado.tsx         etapa 4
  ui/Botao.tsx
  ui/Campo.tsx

lib/
  perguntas.ts          as 8 perguntas com pesos e o mapa de dores
  niveis.ts             copy dos 3 níveis e as faixas de pontuação
  pontuacao.ts          soma, classificação e detecção de dores
  validacao.ts          validação de nome, e-mail e consentimento
  brevo.ts              cliente da API do Brevo
  emailTemplate.ts      HTML e texto do e-mail

types/quiz.ts
```

## O fluxo

1. **Abertura**: headline sobre a rotina do professor e o CTA "Começar
   diagnóstico". Nenhum campo de e-mail aqui.
2. **Quiz**: 8 perguntas de múltipla escolha com barra de progresso, navegação
   para frente e para trás e avanço automático ao escolher a alternativa.
3. **Gate de e-mail**: nome e e-mail obrigatórios, série e disciplina opcionais,
   checkbox de consentimento LGPD. O resultado só aparece depois do envio.
4. **Resultado**: nível classificado, leitura das respostas e a ponte com as
   ferramentas do Mentoria, com o CTA "Conhecer o Mentoria".

## Pontuação

Cada pergunta tem 4 alternativas com peso de 0 a 3, num total de 24 pontos.
Peso maior significa maturidade maior no uso de IA.

| Nível | Faixa | Direção da mensagem |
| --- | --- | --- |
| Explorador | 0 a 8 | Plano de aula, prova e correção alinhados à BNCC para devolver tempo |
| Praticante | 9 a 16 | Tudo num só ambiente pensado para a educação básica |
| Estrategista | 17 a 24 | Supervisão e alertas, PEI e PDI, assistentes personalizados e Otto |

Além do nível, as perguntas respondidas com peso 0 ou 1 viram pontos de atenção
nomeados na tela e no e-mail, cada um ligado à ferramenta do Mentoria que atende
aquela dor. Ajuste as perguntas e os pesos em `lib/perguntas.ts` e as faixas em
`lib/niveis.ts`.

## Envio de e-mail

`POST /api/lead` recebe:

```json
{
  "nome": "Ana Paula",
  "email": "ana@escola.com.br",
  "turmas": ["Fundamental II (6º ao 9º)", "Ensino Médio"],
  "nivel": "explorador",
  "pontuacao": 6,
  "dores": ["tempo", "correcao", "bncc"]
}
```

A rota valida os campos, monta o HTML do e-mail e chama a API do Brevo. Se o
envio falhar, por chave ausente, erro do Brevo ou falha de rede, o erro vai para
o log do servidor e a resposta continua sendo `200` com
`{ "ok": true, "emailEnviado": false }`. O professor vê o resultado na tela do
mesmo jeito e a tela avisa que a cópia por e-mail não saiu.

## Meta Pixel

O placeholder está comentado no `<head>` de `app/layout.tsx`, junto com os
eventos sugeridos para este fluxo. Nada foi instalado ainda. Para ativar, coloque
o ID em `NEXT_PUBLIC_META_PIXEL_ID` e troque o comentário pelo `next/script`.

## Identidade visual

Os tokens ficam em `app/globals.css`:

| Token | Cor |
| --- | --- |
| `--color-roxo-escuro` | `#2D1B4E` |
| `--color-roxo` | `#6B3FD8` |
| `--color-roxo-claro` | `#B8A2E3` |
| `--color-creme` | `#FAF8F3` |
