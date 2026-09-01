import { DORES, PERGUNTAS, PONTUACAO_MAXIMA } from '@/lib/perguntas'
import { FAIXAS, NIVEIS } from '@/lib/niveis'
import type { Dor, DorId, NivelId, Respostas } from '@/types/quiz'

/** Soma os pesos das alternativas escolhidas. Respostas ausentes valem zero. */
export function calcularPontuacao(respostas: Respostas): number {
  return PERGUNTAS.reduce((total, pergunta) => {
    const escolhida = respostas[pergunta.id]
    if (escolhida === undefined) return total
    const alternativa = pergunta.alternativas[escolhida]
    return total + (alternativa?.peso ?? 0)
  }, 0)
}

export function classificar(pontuacao: number): NivelId {
  const faixa = FAIXAS.find((f) => pontuacao >= f.minimo && pontuacao <= f.maximo)
  return faixa?.nivel ?? 'explorador'
}

/** Dores em que o professor respondeu com peso 0 ou 1, na ordem das perguntas. */
export function detectarDores(respostas: Respostas, limite = 3): (Dor & { id: DorId })[] {
  return PERGUNTAS.filter((pergunta) => {
    const escolhida = respostas[pergunta.id]
    if (escolhida === undefined) return false
    const peso = pergunta.alternativas[escolhida]?.peso ?? 0
    return peso <= 1
  })
    .slice(0, limite)
    .map((pergunta) => ({ id: pergunta.id, ...DORES[pergunta.id] }))
}

export function montarResultado(respostas: Respostas) {
  const pontuacao = calcularPontuacao(respostas)
  const nivelId = classificar(pontuacao)
  return {
    pontuacao,
    pontuacaoMaxima: PONTUACAO_MAXIMA,
    nivel: NIVEIS[nivelId],
    dores: detectarDores(respostas),
  }
}

export function ehNivelValido(valor: unknown): valor is NivelId {
  return typeof valor === 'string' && valor in NIVEIS
}
