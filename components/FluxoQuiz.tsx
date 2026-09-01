'use client'

import { useMemo, useState } from 'react'
import { Abertura } from '@/components/Abertura'
import { GateEmail, type DadosDoProfessor } from '@/components/GateEmail'
import { Quiz } from '@/components/Quiz'
import { Resultado } from '@/components/Resultado'
import { montarResultado } from '@/lib/pontuacao'
import type { DorId, Respostas } from '@/types/quiz'

type Etapa = 'abertura' | 'quiz' | 'gate' | 'resultado'

interface FluxoQuizProps {
  mentoriaUrl: string
}

export function FluxoQuiz({ mentoriaUrl }: FluxoQuizProps) {
  const [etapa, setEtapa] = useState<Etapa>('abertura')
  const [respostas, setRespostas] = useState<Respostas>({})
  const [professor, setProfessor] = useState<DadosDoProfessor | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [emailEnviado, setEmailEnviado] = useState(false)

  const resultado = useMemo(() => montarResultado(respostas), [respostas])

  function responder(perguntaId: DorId, indice: number) {
    setRespostas((anteriores) => ({ ...anteriores, [perguntaId]: indice }))
  }

  async function enviarLead(dados: DadosDoProfessor) {
    setProfessor(dados)
    setEnviando(true)

    try {
      const resposta = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nome: dados.nome,
          email: dados.email,
          serieDisciplina: dados.serieDisciplina || undefined,
          nivel: resultado.nivel.id,
          pontuacao: resultado.pontuacao,
          dores: resultado.dores.map((dor) => dor.id),
        }),
      })

      const corpo = (await resposta.json().catch(() => null)) as { emailEnviado?: boolean } | null
      setEmailEnviado(Boolean(corpo?.emailEnviado))
    } catch (erro) {
      // O resultado não pode ficar preso a uma falha de envio.
      console.error('Falha ao registrar o lead:', erro)
      setEmailEnviado(false)
    } finally {
      setEnviando(false)
      setEtapa('resultado')
    }
  }

  function refazer() {
    setRespostas({})
    setProfessor(null)
    setEmailEnviado(false)
    setEtapa('abertura')
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-5 py-12 sm:px-8 sm:py-16">
      {etapa === 'abertura' ? <Abertura onComecar={() => setEtapa('quiz')} /> : null}

      {etapa === 'quiz' ? (
        <Quiz
          respostas={respostas}
          onResponder={responder}
          onConcluir={() => setEtapa('gate')}
          onVoltarParaAbertura={() => setEtapa('abertura')}
        />
      ) : null}

      {etapa === 'gate' ? (
        <GateEmail enviando={enviando} onEnviar={enviarLead} onVoltar={() => setEtapa('quiz')} />
      ) : null}

      {etapa === 'resultado' && professor ? (
        <Resultado
          nome={professor.nome}
          nivel={resultado.nivel}
          pontuacao={resultado.pontuacao}
          dores={resultado.dores}
          emailEnviado={emailEnviado}
          mentoriaUrl={mentoriaUrl}
          onRefazer={refazer}
        />
      ) : null}

      <footer className="mt-14 text-center text-xs text-texto-suave">
        Mentoria, o ecossistema pedagógico de IA para professores da educação básica.
      </footer>
    </main>
  )
}
