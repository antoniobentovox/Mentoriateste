'use client'

import { IconeCheck } from '@/components/ui/Icones'
import { TURMAS_DISPONIVEIS } from '@/lib/turmas'

interface SeletorDeTurmasProps {
  etiqueta: string
  dica?: string
  selecionadas: string[]
  onAlternar: (turma: string) => void
  disabled?: boolean
}

/**
 * Lista de segmentos que um professor da educação básica costuma atender.
 * Múltipla escolha: é comum a mesma pessoa atender mais de um segmento.
 */
export function SeletorDeTurmas({
  etiqueta,
  dica,
  selecionadas,
  onAlternar,
  disabled = false,
}: SeletorDeTurmasProps) {
  return (
    <fieldset className="flex flex-col gap-3" disabled={disabled}>
      <legend className="text-sm font-semibold text-roxo-escuro">
        {etiqueta}
        {dica ? <span className="ml-1.5 font-normal text-texto-suave">{dica}</span> : null}
      </legend>

      <div className="flex flex-wrap gap-2">
        {TURMAS_DISPONIVEIS.map((turma) => {
          const marcada = selecionadas.includes(turma)
          return (
            <label
              key={turma}
              className={[
                'group inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium',
                'transition-all duration-200 ease-out select-none',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-roxo',
                marcada
                  ? 'border-transparent bg-gradient-to-r from-roxo to-roxo-vivo text-white shadow-[0_12px_26px_-16px_rgba(107,63,216,0.9)]'
                  : 'border-lavanda-forte/80 bg-white text-roxo-escuro hover:border-roxo-vivo hover:bg-roxo/[0.04]',
                disabled ? 'cursor-not-allowed opacity-50' : 'active:scale-[0.98]',
              ].join(' ')}
            >
              <input
                type="checkbox"
                name="turmas"
                value={turma}
                checked={marcada}
                onChange={() => onAlternar(turma)}
                disabled={disabled}
                className="sr-only"
              />
              <span
                aria-hidden
                className={[
                  'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border text-[0.65rem] font-bold transition-all duration-200',
                  marcada
                    ? 'border-white bg-white text-roxo'
                    : 'border-roxo-claro text-transparent group-hover:border-roxo-vivo',
                ].join(' ')}
              >
                <IconeCheck className="h-3 w-3" />
              </span>
              {turma}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
