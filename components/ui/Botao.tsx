import type { ButtonHTMLAttributes } from 'react'
import { IconeSetaDireita } from '@/components/ui/Icones'

type Variante = 'primario' | 'secundario' | 'texto' | 'claro'
type Tamanho = 'medio' | 'grande'

const estilos: Record<Variante, string> = {
  primario:
    'bg-gradient-to-r from-roxo to-roxo-vivo text-white shadow-[0_14px_34px_-14px_rgba(107,63,216,0.85)] ' +
    'hover:shadow-[0_18px_40px_-14px_rgba(107,63,216,0.95)] hover:brightness-110 active:scale-[0.98]',
  secundario:
    'bg-white text-roxo-escuro border border-lavanda-forte/80 hover:border-roxo-vivo hover:bg-roxo/[0.04] active:scale-[0.98]',
  claro:
    'bg-white/15 text-white border border-white/35 backdrop-blur-sm hover:bg-white/25 active:scale-[0.98]',
  texto: 'text-texto-suave hover:text-roxo',
}

/**
 * O variante de texto tem medida própria: herdar o padding dos botões cheios
 * deixava "Voltar" com 28px de folga lateral e desalinhado do resto da coluna.
 */
const tamanhos: Record<Tamanho, string> = {
  medio: 'px-7 py-3.5 text-base',
  grande: 'px-9 py-4 text-lg',
}

// py generoso para o alvo de toque continuar confortável sem o padding cheio.
const TAMANHO_TEXTO = 'px-2 py-2.5 text-base'

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  tamanho?: Tamanho
  larguraTotal?: boolean
  /** Seta que avança um passo no hover, reforçando a sensação de progresso. */
  comSeta?: boolean
}

export function Botao({
  variante = 'primario',
  tamanho = 'medio',
  larguraTotal = false,
  comSeta = false,
  className = '',
  children,
  ...props
}: BotaoProps) {
  return (
    <button
      className={[
        'group inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none',
        'transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxo',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
        variante === 'texto' ? TAMANHO_TEXTO : tamanhos[tamanho],
        estilos[variante],
        larguraTotal ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
      {comSeta ? (
        <IconeSetaDireita className="h-[1.05em] w-[1.05em] transition-transform duration-200 ease-out group-hover:translate-x-1" />
      ) : null}
    </button>
  )
}
