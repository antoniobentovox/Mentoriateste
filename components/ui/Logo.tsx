'use client'

import { useState } from 'react'

interface LogoProps {
  /**
   * 'clara' é para fundos escuros. Em vez de inverter a arte, que apagaria o
   * roxo do "ia" e transformaria o polvo num vulto branco, a logo original
   * entra sobre uma placa clara e mantém as cores da marca.
   */
  tom?: 'escura' | 'clara'
  /** Controla a altura da arte, ex.: "h-12 sm:h-14". */
  className?: string
}

export function Logo({ tom = 'escura', className = '' }: LogoProps) {
  const [falhou, setFalhou] = useState(false)

  const marca = falhou ? (
    <span
      className={['inline-flex items-center font-titulo font-bold', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-[1.6em] leading-none tracking-tight text-roxo-escuro">
        mentor<span className="text-roxo-vivo">ia</span>
      </span>
    </span>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/marca/mentoria-logo.png"
      alt="Mentoria, educação que transforma"
      onError={() => setFalhou(true)}
      className={['w-auto object-contain', className].filter(Boolean).join(' ')}
    />
  )

  if (tom === 'clara') {
    return (
      <span className="inline-flex items-center rounded-2xl bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.8)]">
        {marca}
      </span>
    )
  }

  return marca
}
