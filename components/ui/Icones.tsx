/**
 * Setas e check como SVG, não como caractere.
 *
 * O subset latin da Montserrat não traz →, ← nem ✓: esses glifos caíam numa
 * fonte do sistema, com métricas próprias, e a caixa de linha resultante
 * desalinhava verticalmente o rótulo dentro dos botões. Em SVG a altura é
 * sempre a do `em` do texto ao lado.
 */

interface IconeProps {
  className?: string
}

export function IconeSetaDireita({ className = 'h-[1em] w-[1em]' }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 12h15m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconeSetaEsquerda({ className = 'h-[1em] w-[1em]' }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M20 12H5m0 0 6-6m-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconeCheck({ className = 'h-[1em] w-[1em]' }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="m5 13 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
