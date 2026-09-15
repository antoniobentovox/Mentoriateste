'use client'

import { useEffect, useState } from 'react'

interface AnelDePontuacaoProps {
  pontuacao: number
  maxima: number
  /** Espera antes de começar a preencher, para entrar depois do card. */
  atraso?: number
}

const RAIO = 54
const CIRCUNFERENCIA = 2 * Math.PI * RAIO

/** Suaviza o fim da contagem, como um ponteiro que assenta. */
function suavizar(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function AnelDePontuacao({ pontuacao, maxima, atraso = 350 }: AnelDePontuacaoProps) {
  const alvo = maxima > 0 ? Math.round((pontuacao / maxima) * 100) : 0
  const [mostrado, setMostrado] = useState(0)

  useEffect(() => {
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (menosMovimento) {
      setMostrado(alvo)
      return
    }

    let quadro = 0
    const duracao = 1400
    const inicio = performance.now() + atraso

    function animar(agora: number) {
      const t = Math.min(Math.max((agora - inicio) / duracao, 0), 1)
      setMostrado(Math.round(alvo * suavizar(t)))
      if (t < 1) quadro = requestAnimationFrame(animar)
    }

    quadro = requestAnimationFrame(animar)
    return () => cancelAnimationFrame(quadro)
  }, [alvo, atraso])

  const preenchido = (mostrado / 100) * CIRCUNFERENCIA

  return (
    <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
      {/* Halo que respira atrás do anel. */}
      <span
        aria-hidden
        className="animate-pulso-suave absolute inset-2 rounded-full bg-roxo-vivo/30 blur-xl"
      />

      <svg viewBox="0 0 128 128" className="relative h-full w-full -rotate-90">
        <defs>
          <linearGradient id="anel-pontuacao" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B8A2E3" />
            <stop offset="55%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#F5C451" />
          </linearGradient>
        </defs>

        <circle
          cx="64"
          cy="64"
          r={RAIO}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={RAIO}
          fill="none"
          stroke="url(#anel-pontuacao)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${preenchido} ${CIRCUNFERENCIA}`}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-titulo text-3xl leading-none font-bold text-white tabular-nums sm:text-4xl">
          {mostrado}%
        </span>
        <span className="mt-1 text-[0.65rem] font-semibold tracking-[0.14em] text-lavanda-forte uppercase">
          maturidade
        </span>
      </div>
    </div>
  )
}
