'use client'

import { useEffect, useRef } from 'react'

interface FogosProps {
  /** Dispara a sequência quando vira true. */
  ativo: boolean
}

interface Particula {
  x: number
  y: number
  vx: number
  vy: number
  vida: number
}

const CORES = ['#8B5CF6', '#B8A2E3', '#F5C451', '#FFFFFF']
const DURACAO = 2600
const PARTICULAS_POR_ESTOURO = 26
const ESTOUROS = 4

/**
 * Comemoração leve em canvas.
 *
 * As escolhas aqui são todas de custo: resolução fixa em 1x (sem retina),
 * clearRect em vez de véu alfa por quadro, quadrados em vez de arcos, nenhuma
 * sombra e no máximo ~104 partículas na tela. Sombra por partícula e fillRect
 * de tela cheia em 2x eram o que pesava na versão anterior.
 */
export function Fogos({ ativo }: FogosProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ativo) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Metade da resolução da tela: o canvas é esticado por CSS e ninguém nota
    // a diferença em partículas de 4px, mas o custo de pintura cai muito.
    const largura = Math.ceil((canvas.clientWidth || window.innerWidth) / 2)
    const altura = Math.ceil((canvas.clientHeight || window.innerHeight) / 2)
    canvas.width = largura
    canvas.height = altura

    // Uma lista por cor: assim trocamos fillStyle 4 vezes por quadro, não 104.
    const porCor: Particula[][] = CORES.map(() => [])

    function estourar() {
      const x = largura * (0.2 + Math.random() * 0.6)
      const y = altura * (0.18 + Math.random() * 0.3)
      const indiceDaCor = Math.floor(Math.random() * CORES.length)

      for (let i = 0; i < PARTICULAS_POR_ESTOURO; i += 1) {
        const angulo = (Math.PI * 2 * i) / PARTICULAS_POR_ESTOURO
        const forca = 1.6 + Math.random() * 1.6
        // A maior parte sai na cor do estouro; algumas saem brancas.
        const lista = porCor[Math.random() < 0.2 ? 3 : indiceDaCor]
        lista.push({
          x,
          y,
          vx: Math.cos(angulo) * forca,
          vy: Math.sin(angulo) * forca,
          vida: 1,
        })
      }
    }

    const inicio = performance.now()
    let estourosFeitos = 0
    let quadro = 0

    function animar(agora: number) {
      if (!ctx) return
      const decorrido = agora - inicio

      // Os estouros são espaçados no tempo, nunca todos de uma vez.
      const previstos = Math.min(ESTOUROS, Math.floor(decorrido / 320) + 1)
      while (estourosFeitos < previstos) {
        estourar()
        estourosFeitos += 1
      }

      ctx.clearRect(0, 0, largura, altura)

      let vivas = 0
      for (let c = 0; c < porCor.length; c += 1) {
        const lista = porCor[c]
        if (lista.length === 0) continue

        ctx.fillStyle = CORES[c]
        for (let i = lista.length - 1; i >= 0; i -= 1) {
          const p = lista[i]
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.03
          p.vida -= 0.014

          if (p.vida <= 0) {
            lista.splice(i, 1)
            continue
          }

          ctx.globalAlpha = p.vida
          ctx.fillRect(p.x, p.y, 2.5, 2.5)
          vivas += 1
        }
      }
      ctx.globalAlpha = 1

      if (decorrido < DURACAO || vivas > 0) {
        quadro = requestAnimationFrame(animar)
      } else {
        ctx.clearRect(0, 0, largura, altura)
      }
    }

    quadro = requestAnimationFrame(animar)
    return () => cancelAnimationFrame(quadro)
  }, [ativo])

  if (!ativo) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  )
}
