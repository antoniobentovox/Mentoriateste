'use client'

import { useState } from 'react'

interface MascoteProps {
  className?: string
  /** Faz o polvo flutuar de leve. Desligue em contextos densos. */
  flutuando?: boolean
}

/**
 * Otto, o mascote. Some sem deixar buraco no layout se o arquivo
 * public/marca/otto.png ainda não estiver publicado.
 */
export function Mascote({ className = '', flutuando = true }: MascoteProps) {
  const [falhou, setFalhou] = useState(false)
  if (falhou) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/marca/otto.png"
      alt=""
      aria-hidden
      onError={() => setFalhou(true)}
      className={[
        'pointer-events-none select-none object-contain',
        flutuando ? 'animate-flutuar' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
