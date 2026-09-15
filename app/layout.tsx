import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import { TexturaDeFundo } from '@/components/TexturaDeFundo'
import './globals.css'

/**
 * Montserrat é a fonte de corpo da marca. A fonte de título, Garet, é
 * carregada por @font-face em globals.css a partir de public/fonts.
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--fonte-corpo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Qual o seu nível de IA na sala de aula? | Mentoria',
  description:
    'Diagnóstico rápido para professores da educação básica. Responda 8 perguntas e descubra o que já pode sair das suas costas no planejamento, na avaliação e na correção.',
  openGraph: {
    title: 'Qual o seu nível de IA na sala de aula?',
    description:
      'Oito perguntas, dois minutos, e um retrato do seu uso de IA em sala com o que fazer a seguir.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#2D1B4E',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        {/*
          Placeholder do Meta Pixel. Quando o pixel for configurado, troque este
          comentário pelo script oficial e mova o ID para NEXT_PUBLIC_META_PIXEL_ID.

          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){...}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', process.env.NEXT_PUBLIC_META_PIXEL_ID);
              fbq('track', 'PageView');`}
          </Script>

          Eventos sugeridos no fluxo: ViewContent na abertura,
          StartQuiz (custom) no início do quiz e Lead no envio do formulário.
        */}
      </head>
      <body>
        <TexturaDeFundo />
        {children}
      </body>
    </html>
  )
}
