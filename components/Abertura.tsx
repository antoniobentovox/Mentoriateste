'use client'

import { useState } from 'react'
import { TOTAL_DE_PERGUNTAS } from '@/lib/perguntas'
import { Botao } from '@/components/ui/Botao'
import { Logo } from '@/components/ui/Logo'

interface AberturaProps {
  onComecar: () => void
}

const provas = [
  'Feito por educadores para educadores',
  'Alinhado à BNCC',
  'Sem cadastro para começar',
]

export function Abertura({ onComecar }: AberturaProps) {
  const [semArte, setSemArte] = useState(false)

  return (
    // O fundo lavanda e a textura vêm do layout, iguais às demais telas.
    <section className="relative flex min-h-dvh w-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 sm:px-10 lg:px-14">
        <header className="animate-surgir">
          <Logo className="h-14 sm:h-16" />
        </header>

        {/* Duas colunas a partir de lg: texto à esquerda, arte à direita.
            Abaixo disso a arte desce para o fim, sem competir com a leitura. */}
        <div className="flex flex-1 items-center py-8 sm:py-12">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-14">
            <div className="animate-surgir-lateral flex max-w-xl flex-col items-start text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-sm font-semibold text-roxo-escuro shadow-[0_6px_20px_-12px_rgba(45,27,78,0.5)] backdrop-blur-sm">
                <span
                  aria-hidden
                  className="animate-pulso-suave h-2 w-2 rounded-full bg-roxo-vivo"
                />
                Diagnóstico para professores
              </span>

              <h1 className="mt-6 font-titulo text-[1.68rem] leading-[1.1] font-bold text-balance text-roxo-escuro sm:text-[2.4rem] lg:text-[2.72rem]">
                Planejar aula, montar prova e corrigir tudo{' '}
                <span className="bg-gradient-to-r from-roxo to-roxo-vivo bg-clip-text text-transparent">
                  não cabe mais
                </span>{' '}
                na sua semana.
              </h1>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-texto sm:text-lg">
                Descubra seu nível de IA na sala de aula em 2 minutos e veja o que já pode sair das
                suas costas hoje.
              </p>

              {/* O botão sobe para perto do parágrafo: 20px acima, 16px até a
                  legenda que ele comanda, e 32px fecham o bloco. */}
              <Botao onClick={onComecar} tamanho="grande" className="mt-5" comSeta>
                Começar diagnóstico
              </Botao>

              <p className="mt-4 text-sm text-texto-suave">
                {TOTAL_DE_PERGUNTAS} perguntas de múltipla escolha. O e-mail fica para o fim.
              </p>

              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-texto-suave">
                {provas.map((prova) => (
                  <li key={prova} className="flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-roxo" />
                    {prova}
                  </li>
                ))}
              </ul>
            </div>

            {!semArte ? (
              <div className="relative order-last mx-auto w-full max-w-md lg:max-w-none">
                {/* Halo roxo que assenta o recorte sobre o fundo lavanda. */}
                <span
                  aria-hidden
                  className="animate-pulso-suave absolute inset-x-4 top-[12%] bottom-[8%] -z-10 rounded-[40%] bg-roxo-vivo/25 blur-3xl"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/marca/imagem-homepage.png"
                  alt="Professora sorrindo com um notebook, cercada por telas do Mentoria: plano de aula, calendário e apresentações."
                  onError={() => {
                    console.warn(
                      '[abertura] /marca/imagem-homepage.png não encontrado. ' +
                        'Coloque a arte em public/marca/ para a coluna da direita aparecer.',
                    )
                    setSemArte(true)
                  }}
                  className="animate-flutuar h-auto w-full object-contain"
                />
              </div>
            ) : null}
          </div>
        </div>

        <footer className="animate-surgir pb-2 text-sm text-texto-suave">
          O ecossistema pedagógico de IA para professores da educação básica.
        </footer>
      </div>
    </section>
  )
}
