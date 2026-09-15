import type { InputHTMLAttributes } from 'react'

interface CampoProps extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta: string
  dica?: string
  erro?: string
}

export function Campo({ etiqueta, dica, erro, id, className = '', ...props }: CampoProps) {
  const idDoCampo = id ?? props.name ?? etiqueta
  const idDoErro = `${idDoCampo}-erro`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={idDoCampo} className="text-sm font-semibold text-roxo-escuro">
        {etiqueta}
        {dica ? <span className="ml-1.5 font-normal text-texto-suave">{dica}</span> : null}
      </label>
      <input
        id={idDoCampo}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? idDoErro : undefined}
        className={[
          'w-full rounded-xl border bg-white px-4 py-3 text-base text-roxo-escuro',
          'transition-all duration-200 ease-out placeholder:text-texto-suave/70',
          'focus:outline-2 focus:outline-offset-1 focus:outline-roxo',
          erro
            ? 'border-red-400'
            : 'border-lavanda-forte/80 hover:border-roxo-vivo/70',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {erro ? (
        <p id={idDoErro} className="text-sm text-red-600">
          {erro}
        </p>
      ) : null}
    </div>
  )
}
