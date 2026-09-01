import type { Nivel, NivelId } from '@/types/quiz'

export const NIVEIS: Record<NivelId, Nivel> = {
  explorador: {
    id: 'explorador',
    nome: 'Explorador',
    chamada: 'Você faz quase tudo no braço, e isso custa suas noites e seus fins de semana.',
    leitura:
      'Suas respostas mostram um trabalho manual do começo ao fim, do plano de aula até a correção. O ganho mais rápido para você está em recuperar horas da semana em tarefas que já podem sair prontas e só serem revisadas.',
    fecho:
      'No Mentoria, plano de aula, prova e correção saem alinhados à BNCC e voltam para você já formatados. O tempo que sobra volta para a sala de aula e para a sua vida fora dela.',
    destaques: [
      'Planos de aula gerados a partir da turma e do objetivo que você descreve',
      'Provas, avaliações e listas de exercícios prontas para revisar e aplicar',
      'Correção apoiada por IA, com o desempenho da turma organizado',
    ],
  },
  praticante: {
    id: 'praticante',
    nome: 'Praticante',
    chamada: 'Você já usa IA, mas ela ainda trabalha solta.',
    leitura:
      'Você recorre à IA quando o tempo aperta, e isso já ajuda bastante. O que falta é um lugar onde plano, slide, lista, prova e correção conversem entre si, com a BNCC no meio do caminho e sem você reescrever o contexto da sua turma a cada nova conversa.',
    fecho:
      'O Mentoria junta essas peças em um ambiente feito para a educação básica. Você trabalha em um fluxo só, do planejamento à devolutiva para o aluno.',
    destaques: [
      'Planos, slides, listas e avaliações no mesmo ambiente, alinhados à BNCC',
      'Materiais que já nascem com o contexto da sua série e da sua disciplina',
      'Assistentes de IA personalizados para o seu jeito de dar aula',
    ],
  },
  estrategista: {
    id: 'estrategista',
    nome: 'Estrategista',
    chamada: 'Você já tem método. Dá para ir mais fundo.',
    leitura:
      'Você usa IA com critério e já colhe resultado no dia a dia. O próximo passo está em acompanhar de perto quem precisa de você, dar conta da educação inclusiva sem virar noite na documentação e oferecer aos alunos um espaço próprio de estudo.',
    fecho:
      'É onde entram os recursos mais avançados do Mentoria: supervisão e alertas de alunos, planejamento de PEI e PDI, assistentes de IA personalizados e o Otto, o chat de IA para os alunos.',
    destaques: [
      'Supervisão e alertas para agir antes de o aluno ficar para trás',
      'Planejamento de PEI e PDI com acompanhamento da evolução',
      'Assistentes de IA personalizados e Otto para os alunos estudarem',
    ],
  },
}

/** Faixas sobre um total de 24 pontos. */
export const FAIXAS: { nivel: NivelId; minimo: number; maximo: number }[] = [
  { nivel: 'explorador', minimo: 0, maximo: 8 },
  { nivel: 'praticante', minimo: 9, maximo: 16 },
  { nivel: 'estrategista', minimo: 17, maximo: 24 },
]
