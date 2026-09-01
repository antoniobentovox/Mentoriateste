import type { ButtonHTMLAttributes } from 'react'

type Variante = 'primario' | 'secundario' | 'texto'

const estilos: Record<Variante, string> = {
  primario:
    'bg-roxo text-white shadow-[0_10px_30px_-12px_rgba(107,63,216,0.7)] hover:bg-roxo-escuro',
  secundario: 'bg-white text-roxo-escuro border border-roxo-claro/70 hover:border-roxo',
  texto: 'text-texto-suave hover:text-roxo px-2',
}

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  larguraTotal?: boolean
}

export function Botao({
  variante = 'primario',
  larguraTotal = false,
  className = '',
  ...props
}: BotaoProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold',
        'transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxo',
        'disabled:cursor-not-allowed disabled:opacity-50',
        estilos[variante],
        larguraTotal ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
