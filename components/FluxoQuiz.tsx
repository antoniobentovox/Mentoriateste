'use client'

import { useEffect, useMemo, useState } from 'react'
import { Abertura } from '@/components/Abertura'
import { Fogos } from '@/components/Fogos'
import { GateEmail, type DadosDoProfessor } from '@/components/GateEmail'
import { Quiz } from '@/components/Quiz'
import { Resultado } from '@/components/Resultado'
import { Logo } from '@/components/ui/Logo'
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
  const [festejando, setFestejando] = useState(false)

  const resultado = useMemo(() => montarResultado(respostas), [respostas])

  // Os fogos param sozinhos: a tela de resultado não fica coberta.
  useEffect(() => {
    if (!festejando) return
    const tempo = setTimeout(() => setFestejando(false), 3400)
    return () => clearTimeout(tempo)
  }, [festejando])

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
          turmas: dados.turmas,
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
      setFestejando(true)
    }
  }

  function refazer() {
    setRespostas({})
    setProfessor(null)
    setEmailEnviado(false)
    setFestejando(false)
    setEtapa('abertura')
  }

  if (etapa === 'abertura') {
    return <Abertura onComecar={() => setEtapa('quiz')} />
  }

  return (
    <>
      <Fogos ativo={festejando} />

      {/* O fundo lavanda e a textura vêm do layout, iguais aos da abertura. */}
      <main className="relative min-h-dvh w-full">
        <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 py-8 sm:px-8 sm:py-12">
          <header className="animate-surgir mb-10 flex justify-center">
            <Logo className="h-12 sm:h-14" />
          </header>

          <div className="flex flex-1 flex-col justify-center">
            {etapa === 'quiz' ? (
              <Quiz
                respostas={respostas}
                onResponder={responder}
                onConcluir={() => setEtapa('gate')}
                onVoltarParaAbertura={() => setEtapa('abertura')}
              />
            ) : null}

            {etapa === 'gate' ? (
              <GateEmail
                enviando={enviando}
                onEnviar={enviarLead}
                onVoltar={() => setEtapa('quiz')}
              />
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
          </div>

          <footer className="mt-14 text-center text-xs text-texto-suave">
            Mentoria, o ecossistema pedagógico de IA para professores da educação básica.
          </footer>
        </div>
      </main>
    </>
  )
}
