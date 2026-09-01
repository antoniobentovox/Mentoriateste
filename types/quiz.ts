export type DorId =
  | 'tempo'
  | 'usoDeIa'
  | 'provas'
  | 'correcao'
  | 'bncc'
  | 'personalizacao'
  | 'inclusao'
  | 'alunos'

export type NivelId = 'explorador' | 'praticante' | 'estrategista'

export interface Alternativa {
  texto: string
  peso: number
}

export interface Pergunta {
  id: DorId
  enunciado: string
  alternativas: Alternativa[]
}

/** Mapa de pergunta para o índice da alternativa escolhida. */
export type Respostas = Partial<Record<DorId, number>>

export interface Dor {
  /** O que a resposta baixa revela, escrito para o professor ler sobre si. */
  atencao: string
  /** A ferramenta do Mentoria que responde a essa dor. */
  ponte: string
}

export interface Nivel {
  id: NivelId
  nome: string
  chamada: string
  leitura: string
  fecho: string
  /** Usado quando o quiz não apontou dores específicas. */
  destaques: string[]
}

export interface Lead {
  nome: string
  email: string
  serieDisciplina?: string
  nivel: NivelId
  pontuacao: number
}
