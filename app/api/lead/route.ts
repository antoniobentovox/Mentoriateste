import { NextResponse } from 'next/server'
import { enviarResultadoPorEmail } from '@/lib/brevo'
import { DORES } from '@/lib/perguntas'
import { ehNivelValido } from '@/lib/pontuacao'
import { emailValido, nomeValido } from '@/lib/validacao'
import type { Dor, DorId } from '@/types/quiz'

export const runtime = 'nodejs'

interface CorpoDaRequisicao {
  nome?: unknown
  email?: unknown
  serieDisciplina?: unknown
  nivel?: unknown
  pontuacao?: unknown
  dores?: unknown
}

function textoLimpo(valor: unknown, limite: number): string {
  return typeof valor === 'string' ? valor.trim().slice(0, limite) : ''
}

function doresRecebidas(valor: unknown): (Dor & { id: DorId })[] {
  if (!Array.isArray(valor)) return []
  return valor
    .filter((id): id is DorId => typeof id === 'string' && id in DORES)
    .slice(0, 3)
    .map((id) => ({ id, ...DORES[id] }))
}

export async function POST(requisicao: Request) {
  let corpo: CorpoDaRequisicao

  try {
    corpo = (await requisicao.json()) as CorpoDaRequisicao
  } catch {
    return NextResponse.json({ ok: false, erro: 'Corpo da requisição inválido.' }, { status: 400 })
  }

  const nome = textoLimpo(corpo.nome, 120)
  const email = textoLimpo(corpo.email, 180).toLowerCase()
  const serieDisciplina = textoLimpo(corpo.serieDisciplina, 160)
  const pontuacao = Number(corpo.pontuacao)

  if (!nomeValido(nome) || !emailValido(email)) {
    return NextResponse.json({ ok: false, erro: 'Nome ou e-mail inválidos.' }, { status: 400 })
  }

  if (!ehNivelValido(corpo.nivel)) {
    return NextResponse.json({ ok: false, erro: 'Nível não reconhecido.' }, { status: 400 })
  }

  if (!Number.isFinite(pontuacao) || pontuacao < 0 || pontuacao > 100) {
    return NextResponse.json({ ok: false, erro: 'Pontuação inválida.' }, { status: 400 })
  }

  const mentoriaUrl = process.env.MENTORIA_URL ?? 'https://mentoria.com.br'

  const { enviado, motivo } = await enviarResultadoPorEmail(
    { nome, email },
    {
      nome,
      nivel: corpo.nivel,
      pontuacao,
      serieDisciplina: serieDisciplina || undefined,
      dores: doresRecebidas(corpo.dores),
      mentoriaUrl,
    },
  )

  if (!enviado) {
    // O professor continua vendo o resultado na tela. O erro fica registrado no log.
    console.error(`[lead] resultado não enviado para ${email}: ${motivo ?? 'motivo desconhecido'}`)
  }

  return NextResponse.json({ ok: true, emailEnviado: enviado })
}
