'use client'

import { PONTUACAO_MAXIMA } from '@/lib/perguntas'
import { AnelDePontuacao } from '@/components/ui/AnelDePontuacao'
import { Botao } from '@/components/ui/Botao'
import { Compartilhar } from '@/components/Compartilhar'
import { IconeSetaDireita } from '@/components/ui/Icones'
import { Logo } from '@/components/ui/Logo'
import { RedesSociais } from '@/components/RedesSociais'
import { Mascote } from '@/components/ui/Mascote'
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

  const cartao = {
    nome,
    nivel: nivel.nome,
    pontuacao,
    pontuacaoMaxima: PONTUACAO_MAXIMA,
    chamada: nivel.chamada,
    site: 'mentoriaedu.com.br',
  }

  return (
    <section className="flex flex-col gap-8">
      {/* O card do resultado: é ele que vai para o print. */}
      <div className="animate-escala relative isolate overflow-hidden rounded-[2rem] bg-roxo-escuro px-6 py-8 text-white shadow-[0_40px_80px_-40px_rgba(45,27,78,0.9)] sm:px-10 sm:py-10">
        {/* Camadas de luz que dão profundidade ao fundo roxo. */}
        <span
          aria-hidden
          className="absolute -top-24 -right-16 -z-10 h-72 w-72 rounded-full bg-roxo-vivo/40 blur-3xl"
        />
        <span
          aria-hidden
          className="absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full bg-roxo/40 blur-3xl"
        />
        <span
          aria-hidden
          className="animate-girar-lento absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full border border-white/10"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
        />

        <div className="flex items-center justify-between gap-4">
          <Logo tom="clara" className="h-8 sm:h-10" />
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] uppercase backdrop-blur-sm">
            Diagnóstico de IA
          </span>
        </div>

        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-7">
          <AnelDePontuacao pontuacao={pontuacao} maxima={PONTUACAO_MAXIMA} />

          {/* min-w-0 deixa esta coluna encolher: sem ele, um nível de nome
              longo empurra o conteúdo para fora do card. */}
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <span className="text-sm tracking-wide text-lavanda-forte">
              <strong className="font-bold text-white">{primeiroNome}</strong>, seu nível é
            </span>
            <h2 className="font-titulo text-[clamp(2rem,7.5vw,3.25rem)] leading-[1.05] font-bold [overflow-wrap:anywhere]">
              <span className="bg-gradient-to-r from-white via-lavanda-forte to-ouro bg-clip-text text-transparent">
                {nivel.nome}
              </span>
            </h2>
            <p className="text-sm text-lavanda-forte">
              {pontuacao} de {PONTUACAO_MAXIMA} pontos no diagnóstico
            </p>
          </div>
        </div>

        {/* A reserva à direita mantém o texto longe do mascote. */}
        <p className="mt-7 max-w-lg text-lg leading-relaxed font-medium text-white/95 sm:pr-36">
          {nivel.chamada}
        </p>

        <Mascote className="absolute -bottom-3 -right-1 h-24 w-24 opacity-90 sm:right-4 sm:h-32 sm:w-32" />
      </div>

      <Compartilhar cartao={cartao} />

      {/* Leitura das respostas. */}
      <div className="flex flex-col gap-4 rounded-3xl border border-lavanda-forte/70 bg-white px-7 py-7 shadow-[0_20px_50px_-40px_rgba(45,27,78,0.6)] sm:px-9">
        <h3 className="font-titulo text-xl font-bold text-roxo-escuro">
          O que suas respostas mostram
        </h3>
        <p className="text-base leading-relaxed text-texto">{nivel.leitura}</p>
      </div>

      {/* Ponte para o produto. */}
      <div className="flex flex-col gap-5">
        <h3 className="font-titulo text-xl font-bold text-roxo-escuro">
          {dores.length > 0
            ? 'O que o Mentoria resolve no seu caso'
            : 'Onde o Mentoria te leva mais longe'}
        </h3>

        <ul className="cascata flex flex-col gap-3">
          {dores.length > 0
            ? dores.map((dor) => (
                <li
                  key={dor.id}
                  className="relative flex flex-col gap-1.5 overflow-hidden rounded-2xl border border-lavanda-forte/70 bg-white px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-roxo-vivo hover:shadow-[0_18px_40px_-28px_rgba(107,63,216,0.8)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-roxo to-roxo-vivo"
                  />
                  <p className="font-semibold text-roxo-escuro">{dor.atencao}</p>
                  <p className="text-base leading-relaxed text-texto">{dor.ponte}</p>
                </li>
              ))
            : nivel.destaques.map((destaque) => (
                <li
                  key={destaque}
                  className="relative flex items-start gap-3 overflow-hidden rounded-2xl border border-lavanda-forte/70 bg-white px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-roxo-vivo hover:shadow-[0_18px_40px_-28px_rgba(107,63,216,0.8)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-roxo to-roxo-vivo"
                  />
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-roxo to-roxo-vivo"
                  />
                  <p className="text-base leading-relaxed text-texto">{destaque}</p>
                </li>
              ))}
        </ul>
      </div>

      {/* Chamada final. */}
      <div className="relative isolate flex flex-col items-center gap-5 overflow-hidden rounded-3xl bg-gradient-to-br from-lavanda to-lavanda-forte/70 px-7 py-9 text-center sm:px-9">
        <span
          aria-hidden
          className="animate-pulso-suave absolute -top-16 left-1/2 -z-10 h-48 w-48 -translate-x-1/2 rounded-full bg-white/60 blur-3xl"
        />
        <p className="max-w-lg text-base leading-relaxed text-roxo-escuro">{nivel.fecho}</p>
        <a
          href={mentoriaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-roxo to-roxo-vivo px-9 py-4 text-lg leading-none font-semibold text-white shadow-[0_16px_38px_-16px_rgba(107,63,216,0.9)] transition-all duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxo active:scale-[0.98]"
        >
          Conhecer o Mentoria
          <IconeSetaDireita className="h-[1.05em] w-[1.05em] transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>

      <RedesSociais />

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
