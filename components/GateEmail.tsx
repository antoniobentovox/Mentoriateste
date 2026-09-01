'use client'

import { useState } from 'react'
import { validarFormulario, type ErrosDoFormulario } from '@/lib/validacao'
import { Botao } from '@/components/ui/Botao'
import { Campo } from '@/components/ui/Campo'

export interface DadosDoProfessor {
  nome: string
  email: string
  serieDisciplina: string
}

interface GateEmailProps {
  enviando: boolean
  onEnviar: (dados: DadosDoProfessor) => void
  onVoltar: () => void
}

export function GateEmail({ enviando, onEnviar, onVoltar }: GateEmailProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [serieDisciplina, setSerieDisciplina] = useState('')
  const [consentimento, setConsentimento] = useState(false)
  const [erros, setErros] = useState<ErrosDoFormulario>({})

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const encontrados = validarFormulario({ nome, email, consentimento })
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return
    onEnviar({ nome: nome.trim(), email: email.trim(), serieDisciplina: serieDisciplina.trim() })
  }

  return (
    <section className="animate-surgir flex flex-col gap-7">
      <div className="flex flex-col gap-3 text-center">
        <span className="mx-auto rounded-full bg-roxo-claro/30 px-4 py-1.5 text-sm font-semibold text-roxo-escuro">
          Diagnóstico concluído
        </span>
        <h2 className="font-titulo text-3xl leading-snug font-semibold text-roxo-escuro sm:text-4xl">
          Seu resultado está pronto.
        </h2>
        <p className="mx-auto max-w-md text-base leading-relaxed text-texto">
          Diga para onde eu mando. Você vê o resultado aqui na tela agora e recebe uma cópia por
          e-mail para reler com calma.
        </p>
      </div>

      <form onSubmit={enviar} noValidate className="flex flex-col gap-5">
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

        <Campo
          etiqueta="Série e disciplina"
          dica="(opcional)"
          name="serieDisciplina"
          type="text"
          placeholder="6º ano, Ciências"
          value={serieDisciplina}
          onChange={(evento) => setSerieDisciplina(evento.target.value)}
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

        <Botao type="submit" larguraTotal disabled={enviando}>
          {enviando ? 'Preparando seu resultado...' : 'Ver meu resultado'}
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
