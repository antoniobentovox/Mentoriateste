'use client'

import { useEffect, useRef, useState } from 'react'
import { PERGUNTAS, TOTAL_DE_PERGUNTAS } from '@/lib/perguntas'
import { BarraProgresso } from '@/components/BarraProgresso'
import { Botao } from '@/components/ui/Botao'
import { IconeCheck, IconeSetaEsquerda } from '@/components/ui/Icones'
import type { Respostas } from '@/types/quiz'

interface QuizProps {
  respostas: Respostas
  onResponder: (perguntaId: (typeof PERGUNTAS)[number]['id'], indice: number) => void
  onConcluir: () => void
  onVoltarParaAbertura: () => void
}

const LETRAS = ['A', 'B', 'C', 'D', 'E']

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
  // Uma posição por pergunta: a barra cresce 1/8 a cada resposta, não a cada tela.
  const respondidas = PERGUNTAS.map((item) => respostas[item.id] !== undefined)

  function escolher(indiceDaAlternativa: number) {
    onResponder(pergunta.id, indiceDaAlternativa)

    if (temporizador.current) clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => {
      if (ehUltima) {
        onConcluir()
      } else {
        setIndiceAtual((indice) => Math.min(indice + 1, TOTAL_DE_PERGUNTAS - 1))
      }
    }, 320)
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
      <BarraProgresso atual={indiceAtual + 1} respondidas={respondidas} />

      <div key={pergunta.id} className="flex flex-col gap-6">
        <h2 className="animate-surgir font-titulo text-2xl leading-snug font-bold text-balance text-roxo-escuro sm:text-[2rem]">
          {pergunta.enunciado}
        </h2>

        <div role="radiogroup" aria-label={pergunta.enunciado} className="cascata flex flex-col gap-3">
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
                  'group relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-white px-5 py-4 text-left',
                  'transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxo',
                  selecionada
                    ? 'border-roxo shadow-[0_16px_36px_-18px_rgba(107,63,216,0.85)]'
                    : 'border-lavanda-forte/70 hover:-translate-y-0.5 hover:border-roxo-vivo hover:shadow-[0_14px_30px_-20px_rgba(107,63,216,0.7)]',
                ].join(' ')}
              >
                {/* Preenchimento em gradiente que entra da esquerda ao selecionar. */}
                <span
                  aria-hidden
                  className={[
                    'absolute inset-y-0 left-0 bg-gradient-to-r from-roxo/10 to-roxo-vivo/[0.03] transition-all duration-300 ease-out',
                    selecionada ? 'w-full' : 'w-0',
                  ].join(' ')}
                />

                <span
                  aria-hidden
                  className={[
                    'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-bold transition-all duration-200',
                    selecionada
                      ? 'scale-110 border-transparent bg-gradient-to-br from-roxo to-roxo-vivo text-white'
                      : 'border-lavanda-forte bg-lavanda/60 text-roxo group-hover:border-roxo-vivo',
                  ].join(' ')}
                >
                  {selecionada ? <IconeCheck className="h-4 w-4" /> : LETRAS[indice]}
                </span>

                <span className="relative text-base leading-snug text-roxo-escuro">
                  {alternativa.texto}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* -ml-2 anula o padding do botão de texto: a borda óptica fica
            alinhada com o enunciado e com os cards de alternativa. */}
        <Botao variante="texto" onClick={voltar} className="-ml-2">
          <IconeSetaEsquerda />
          Voltar
        </Botao>
        {escolhida !== undefined && !ehUltima ? (
          <Botao
            variante="secundario"
            comSeta
            onClick={() => setIndiceAtual((indice) => Math.min(indice + 1, TOTAL_DE_PERGUNTAS - 1))}
          >
            Avançar
          </Botao>
        ) : null}
        {escolhida !== undefined && ehUltima ? (
          <Botao onClick={onConcluir} comSeta>
            Ver meu resultado
          </Botao>
        ) : null}
      </div>
    </section>
  )
}
