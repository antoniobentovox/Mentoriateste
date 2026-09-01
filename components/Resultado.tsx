import { PONTUACAO_MAXIMA } from '@/lib/perguntas'
import { Botao } from '@/components/ui/Botao'
import type { Dor, DorId, Nivel } from '@/types/quiz'

interface ResultadoProps {
  nome: string
  nivel: Nivel
  pontuacao: number
  dores: (Dor & { id: DorId })[]
  emailEnviado: boolean
  mentoriaUrl: string
  onRefazer: () => void
}

export function Resultado({
  nome,
  nivel,
  pontuacao,
  dores,
  emailEnviado,
  mentoriaUrl,
  onRefazer,
}: ResultadoProps) {
  const primeiroNome = nome.trim().split(/\s+/)[0] ?? nome
  const percentual = Math.round((pontuacao / PONTUACAO_MAXIMA) * 100)

  return (
    <section className="animate-surgir flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-3xl bg-roxo-escuro px-7 py-8 text-white sm:px-9">
        <span className="text-sm font-semibold tracking-wide text-roxo-claro uppercase">
          {primeiroNome}, seu nível é
        </span>
        <h2 className="font-titulo text-4xl leading-tight font-semibold sm:text-5xl">
          {nivel.nome}
        </h2>

        <div className="flex flex-col gap-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-roxo-claro" style={{ width: `${percentual}%` }} />
          </div>
          <p className="text-sm text-roxo-claro">
            {pontuacao} de {PONTUACAO_MAXIMA} pontos no diagnóstico
          </p>
        </div>

        <p className="text-lg leading-relaxed font-medium text-white/95">{nivel.chamada}</p>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-roxo-claro/50 bg-white px-7 py-7 sm:px-9">
        <h3 className="font-titulo text-xl font-semibold text-roxo-escuro">
          O que suas respostas mostram
        </h3>
        <p className="text-base leading-relaxed text-texto">{nivel.leitura}</p>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="font-titulo text-xl font-semibold text-roxo-escuro">
          {dores.length > 0
            ? 'O que o Mentoria resolve no seu caso'
            : 'Onde o Mentoria te leva mais longe'}
        </h3>

        <ul className="flex flex-col gap-3">
          {dores.length > 0
            ? dores.map((dor) => (
                <li
                  key={dor.id}
                  className="flex flex-col gap-1.5 rounded-2xl border border-roxo-claro/50 bg-white px-6 py-5"
                >
                  <p className="font-semibold text-roxo-escuro">{dor.atencao}</p>
                  <p className="text-base leading-relaxed text-texto">{dor.ponte}</p>
                </li>
              ))
            : nivel.destaques.map((destaque) => (
                <li
                  key={destaque}
                  className="flex items-start gap-3 rounded-2xl border border-roxo-claro/50 bg-white px-6 py-5"
                >
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-roxo" />
                  <p className="text-base leading-relaxed text-texto">{destaque}</p>
                </li>
              ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-5 rounded-3xl bg-roxo-claro/25 px-7 py-8 text-center sm:px-9">
        <p className="max-w-lg text-base leading-relaxed text-roxo-escuro">{nivel.fecho}</p>
        <a
          href={mentoriaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-roxo px-9 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_-12px_rgba(107,63,216,0.7)] transition-colors duration-200 hover:bg-roxo-escuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxo"
        >
          Conhecer o Mentoria
        </a>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-texto-suave">
          {emailEnviado
            ? 'Mandei uma cópia deste resultado para o seu e-mail. Se não aparecer, dê uma olhada na caixa de promoções.'
            : 'O envio do e-mail falhou desta vez, mas seu resultado está aqui e você pode guardar esta página.'}
        </p>
        <Botao variante="texto" onClick={onRefazer}>
          Refazer o diagnóstico
        </Botao>
      </div>
    </section>
  )
}
