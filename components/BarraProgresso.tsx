interface BarraProgressoProps {
  atual: number
  total: number
}

export function BarraProgresso({ atual, total }: BarraProgressoProps) {
  const percentual = Math.round((atual / total) * 100)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between text-sm text-texto-suave">
        <span className="font-semibold text-roxo-escuro">
          Pergunta {atual} de {total}
        </span>
        <span>{percentual}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={atual}
        aria-label="Progresso do diagnóstico"
        className="h-2 w-full overflow-hidden rounded-full bg-roxo-claro/35"
      >
        <div
          className="h-full rounded-full bg-roxo transition-[width] duration-300 ease-out"
          style={{ width: `${percentual}%` }}
        />
      </div>
    </div>
  )
}
