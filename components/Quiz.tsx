'use client'

import { useEffect, useRef, useState } from 'react'
import { PERGUNTAS, TOTAL_DE_PERGUNTAS } from '@/lib/perguntas'
import { BarraProgresso } from '@/components/BarraProgresso'
import { Botao } from '@/components/ui/Botao'
import type { Respostas } from '@/types/quiz'

interface QuizProps {
  respostas: Respostas
  onResponder: (perguntaId: (typeof PERGUNTAS)[number]['id'], indice: number) => void
  onConcluir: () => void
  onVoltarParaAbertura: () => void
}

export function Quiz({ respostas, onResponder, onConcluir, onVoltarParaAbertura }: QuizProps) {
  const [indiceAtual, setIndiceAtual] = useState(0)
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current)
    }
  }, [])

  const pergunta = PERGUNTAS[indiceAtual]
  const escolhida = respostas[pergunta.id]
  const ehUltima = indiceAtual === TOTAL_DE_PERGUNTAS - 1

  function escolher(indiceDaAlternativa: number) {
    onResponder(pergunta.id, indiceDaAlternativa)

    if (temporizador.current) clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => {
      if (ehUltima) {
        onConcluir()
      } else {
        setIndiceAtual((indice) => Math.min(indice + 1, TOTAL_DE_PERGUNTAS - 1))
      }
    }, 260)
  }

  function voltar() {
    if (temporizador.current) clearTimeout(temporizador.current)
    if (indiceAtual === 0) {
      onVoltarParaAbertura()
      return
    }
    setIndiceAtual((indice) => indice - 1)
  }

  return (
    <section className="flex flex-col gap-8">
      <BarraProgresso atual={indiceAtual + 1} total={TOTAL_DE_PERGUNTAS} />

      <div key={pergunta.id} className="animate-surgir flex flex-col gap-6">
        <h2 className="font-titulo text-2xl leading-snug font-semibold text-roxo-escuro sm:text-3xl">
          {pergunta.enunciado}
        </h2>

        <div role="radiogroup" aria-label={pergunta.enunciado} className="flex flex-col gap-3">
          {pergunta.alternativas.map((alternativa, indice) => {
            const selecionada = escolhida === indice
            return (
              <button
                key={alternativa.texto}
                type="button"
                role="radio"
                aria-checked={selecionada}
                onClick={() => escolher(indice)}
                className={[
                  'group flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 text-left',
                  'transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxo',
                  selecionada
                    ? 'border-roxo bg-roxo/5 shadow-[0_8px_24px_-14px_rgba(107,63,216,0.6)]'
                    : 'border-roxo-claro/50 hover:border-roxo hover:bg-roxo/[0.03]',
                ].join(' ')}
              >
                <span
                  aria-hidden
                  className={[
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    selecionada ? 'border-roxo' : 'border-roxo-claro group-hover:border-roxo',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'h-2.5 w-2.5 rounded-full bg-roxo transition-transform duration-200',
                      selecionada ? 'scale-100' : 'scale-0',
                    ].join(' ')}
                  />
                </span>
                <span className="text-base leading-snug text-roxo-escuro">{alternativa.texto}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Botao variante="texto" onClick={voltar}>
          Voltar
        </Botao>
        {escolhida !== undefined && !ehUltima ? (
          <Botao
            variante="secundario"
            onClick={() => setIndiceAtual((indice) => Math.min(indice + 1, TOTAL_DE_PERGUNTAS - 1))}
          >
            Avançar
          </Botao>
        ) : null}
        {escolhida !== undefined && ehUltima ? (
          <Botao onClick={onConcluir}>Ver meu resultado</Botao>
        ) : null}
      </div>
    </section>
  )
}
