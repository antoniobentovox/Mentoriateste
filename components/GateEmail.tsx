'use client'

import { useState } from 'react'
import { validarFormulario, type ErrosDoFormulario } from '@/lib/validacao'
import { Botao } from '@/components/ui/Botao'
import { IconeCheck } from '@/components/ui/Icones'
import { Campo } from '@/components/ui/Campo'
import { SeletorDeTurmas } from '@/components/ui/SeletorDeTurmas'

export interface DadosDoProfessor {
  nome: string
  email: string
  turmas: string[]
}

interface GateEmailProps {
  enviando: boolean
  onEnviar: (dados: DadosDoProfessor) => void
  onVoltar: () => void
}

export function GateEmail({ enviando, onEnviar, onVoltar }: GateEmailProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [turmas, setTurmas] = useState<string[]>([])
  const [consentimento, setConsentimento] = useState(false)
  const [erros, setErros] = useState<ErrosDoFormulario>({})

  function alternarTurma(turma: string) {
    setTurmas((atuais) =>
      atuais.includes(turma) ? atuais.filter((item) => item !== turma) : [...atuais, turma],
    )
  }

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const encontrados = validarFormulario({ nome, email, consentimento })
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return
    onEnviar({ nome: nome.trim(), email: email.trim(), turmas })
  }

  return (
    <section className="animate-surgir flex flex-col gap-7">
      <div className="flex flex-col gap-3 text-center">
        <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-roxo to-roxo-vivo px-4 py-1.5 text-sm font-semibold text-white shadow-[0_12px_26px_-16px_rgba(107,63,216,0.9)]">
          <IconeCheck className="h-3.5 w-3.5" />
          Diagnóstico concluído
        </span>
        <h2 className="font-titulo text-3xl leading-snug font-bold text-roxo-escuro sm:text-4xl">
          Seu resultado está pronto.
        </h2>
        <p className="mx-auto max-w-md text-base leading-relaxed text-balance text-texto">
          Deixe seu e-mail: o resultado aparece aqui na tela agora e uma cópia vai para a sua caixa
          de entrada, para reler com calma.
        </p>
      </div>

      <form
        onSubmit={enviar}
        noValidate
        className="flex flex-col gap-5 rounded-3xl border border-lavanda-forte/70 bg-white px-6 py-7 shadow-[0_24px_60px_-45px_rgba(45,27,78,0.8)] sm:px-8"
      >
        <Campo
          etiqueta="Seu nome"
          name="nome"
          type="text"
          autoComplete="name"
          placeholder="Como você quer ser chamado"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          erro={erros.nome}
          disabled={enviando}
        />

        <Campo
          etiqueta="Seu e-mail"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="professor@escola.com.br"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          erro={erros.email}
          disabled={enviando}
        />

        <SeletorDeTurmas
          etiqueta="Quais turmas você atende?"
          dica="(pode marcar mais de uma)"
          selecionadas={turmas}
          onAlternar={alternarTurma}
          disabled={enviando}
        />

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-texto">
            <input
              type="checkbox"
              name="consentimento"
              checked={consentimento}
              onChange={(evento) => setConsentimento(evento.target.checked)}
              disabled={enviando}
              aria-invalid={erros.consentimento ? true : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 accent-roxo"
            />
            <span>
              Autorizo o Mentoria a usar meu nome e e-mail para enviar o resultado deste diagnóstico
              e conteúdos sobre IA na educação. Posso pedir a remoção dos meus dados quando quiser.
            </span>
          </label>
          {erros.consentimento ? (
            <p className="pl-8 text-sm text-red-600">{erros.consentimento}</p>
          ) : null}
        </div>

        <Botao type="submit" larguraTotal disabled={enviando} comSeta={!enviando}>
          {enviando ? (
            <>
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
              Preparando seu resultado...
            </>
          ) : (
            'Ver meu resultado'
          )}
        </Botao>

        <div className="flex justify-center">
          <Botao type="button" variante="texto" onClick={onVoltar} disabled={enviando}>
            Rever minhas respostas
          </Botao>
        </div>
      </form>
    </section>
  )
}
