interface BarraProgressoProps {
  /** Número da pergunta que está na tela, só para o rótulo. */
  atual: number
  /** Uma posição por pergunta: true quando ela já foi respondida. */
  respondidas: boolean[]
}

export function BarraProgresso({ atual, respondidas }: BarraProgressoProps) {
  const total = respondidas.length
  const quantas = respondidas.filter(Boolean).length
  // Cada resposta vale exatamente uma fatia. Sem resposta, a barra fica zerada.
  const percentual = total > 0 ? Math.round((quantas / total) * 100) : 0

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold text-roxo-escuro">
          Pergunta {atual} de {total}
        </span>
        <span className="font-titulo text-sm font-bold text-roxo tabular-nums">{percentual}%</span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={quantas}
        aria-valuetext={`${quantas} de ${total} perguntas respondidas`}
        aria-label="Progresso do diagnóstico"
        className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/70 inset-ring inset-ring-roxo/10"
      >
        <div
          className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-roxo via-roxo-vivo to-roxo-claro transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${percentual}%` }}
        >
          {/* Faixa de luz que atravessa o preenchimento e mantém a barra viva. */}
          <span
            aria-hidden
            className="animate-brilho absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
          />
        </div>
      </div>

      {/* Marcadores por pergunta: o avanço fica visível a cada resposta. */}
      <div aria-hidden className="flex items-center gap-1.5">
        {respondidas.map((respondida, indice) => {
          const emFoco = indice + 1 === atual
          return (
            <span
              key={indice}
              className={[
                'h-1 flex-1 rounded-full transition-all duration-500 ease-out',
                respondida
                  ? 'bg-roxo/70'
                  : emFoco
                    ? 'bg-roxo-vivo shadow-[0_0_10px_rgba(139,92,246,0.7)]'
                    : 'bg-white/70',
              ].join(' ')}
            />
          )
        })}
      </div>
    </div>
  )
}
