import { TOTAL_DE_PERGUNTAS } from '@/lib/perguntas'
import { Botao } from '@/components/ui/Botao'

interface AberturaProps {
  onComecar: () => void
}

const provas = [
  'Feito para a educação básica',
  'Alinhado à BNCC',
  'Sem cadastro para começar',
]

export function Abertura({ onComecar }: AberturaProps) {
  return (
    <section className="animate-surgir flex flex-col items-center gap-8 text-center">
      <span className="rounded-full bg-roxo-claro/30 px-4 py-1.5 text-sm font-semibold text-roxo-escuro">
        Diagnóstico para professores
      </span>

      <div className="flex flex-col gap-5">
        <h1 className="font-titulo text-4xl leading-[1.15] font-semibold text-roxo-escuro sm:text-5xl">
          Planejar aula, montar prova e corrigir tudo não cabe mais na sua semana.
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-texto">
          Descubra seu nível de IA na sala de aula em 2 minutos e veja o que já pode sair das suas
          costas hoje.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Botao onClick={onComecar} className="px-9 py-4 text-lg">
          Começar diagnóstico
        </Botao>
        <p className="text-sm text-texto-suave">
          {TOTAL_DE_PERGUNTAS} perguntas de múltipla escolha. O e-mail fica para o fim.
        </p>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-texto-suave">
        {provas.map((prova) => (
          <li key={prova} className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-roxo" />
            {prova}
          </li>
        ))}
      </ul>
    </section>
  )
}
