import type { Dor, DorId, Pergunta } from '@/types/quiz'

/**
 * 8 perguntas, 4 alternativas cada, peso de 0 a 3.
 * Peso maior significa maturidade maior no uso de IA.
 * Total possível: 24 pontos.
 */
export const PERGUNTAS: Pergunta[] = [
  {
    id: 'tempo',
    enunciado: 'Quanto tempo você gasta por semana planejando aula e montando material?',
    alternativas: [
      { texto: 'Mais de 8 horas, quase todo fim de semana', peso: 0 },
      { texto: 'Entre 5 e 8 horas', peso: 1 },
      { texto: 'Entre 2 e 4 horas', peso: 2 },
      { texto: 'Menos de 2 horas, já tenho um processo que funciona', peso: 3 },
    ],
  },
  {
    id: 'usoDeIa',
    enunciado: 'Você usa alguma ferramenta de IA no seu trabalho hoje?',
    alternativas: [
      { texto: 'Nunca usei', peso: 0 },
      { texto: 'Já testei uma ou duas vezes, por curiosidade', peso: 1 },
      { texto: 'Uso o ChatGPT ou parecido toda semana', peso: 2 },
      { texto: 'Uso IA em várias frentes do meu trabalho, já virou rotina', peso: 3 },
    ],
  },
  {
    id: 'provas',
    enunciado: 'Como você monta suas provas e avaliações?',
    alternativas: [
      { texto: 'Escrevo tudo do zero, questão por questão', peso: 0 },
      { texto: 'Reaproveito as provas de anos anteriores', peso: 1 },
      { texto: 'Junto questões de sites e apostilas e adapto', peso: 2 },
      { texto: 'Gero com IA e reviso antes de aplicar', peso: 3 },
    ],
  },
  {
    id: 'correcao',
    enunciado: 'E a correção, como acontece?',
    alternativas: [
      { texto: 'Corrijo tudo à mão, uma prova por vez', peso: 0 },
      { texto: 'Corrijo à mão, com o gabarito ao lado', peso: 1 },
      { texto: 'Uso formulário ou planilha na parte objetiva', peso: 2 },
      { texto: 'Tenho correção automatizada e olho os dados da turma depois', peso: 3 },
    ],
  },
  {
    id: 'bncc',
    enunciado: 'Como você garante o alinhamento do seu material com a BNCC?',
    alternativas: [
      { texto: 'Não confiro, sigo o livro didático', peso: 0 },
      { texto: 'Abro o documento da BNCC e procuro a habilidade na mão', peso: 1 },
      { texto: 'Tenho uma planilha ou caderno com as habilidades que já mapeei', peso: 2 },
      { texto: 'Meu material já sai com a habilidade da BNCC indicada', peso: 3 },
    ],
  },
  {
    id: 'personalizacao',
    enunciado: 'Quando a turma tem níveis bem diferentes, você adapta a atividade?',
    alternativas: [
      { texto: 'Todo mundo recebe a mesma atividade, não dá tempo de mudar', peso: 0 },
      { texto: 'Adapto de vez em quando, nos casos mais graves', peso: 1 },
      { texto: 'Faço duas ou três versões da atividade quando consigo', peso: 2 },
      { texto: 'Gero versões por nível de aprendizagem com apoio de IA', peso: 3 },
    ],
  },
  {
    id: 'inclusao',
    enunciado: 'Você atende alunos com PEI ou PDI?',
    alternativas: [
      { texto: 'Atendo, mas fico perdido em como documentar', peso: 0 },
      { texto: 'Escrevo tudo do zero, no papel ou no Word', peso: 1 },
      { texto: 'Uso um modelo que adaptei e vou repetindo', peso: 2 },
      { texto: 'Tenho um fluxo que estrutura o plano e acompanha a evolução', peso: 3 },
    ],
  },
  {
    id: 'alunos',
    enunciado: 'E os seus alunos, usam IA?',
    alternativas: [
      { texto: 'Usam escondido e eu não sei bem como lidar', peso: 0 },
      { texto: 'O uso é proibido na minha aula', peso: 1 },
      { texto: 'Converso sobre uso responsável, mas sem ferramenta própria', peso: 2 },
      { texto: 'Já ofereço um ambiente de IA seguro para eles estudarem', peso: 3 },
    ],
  },
]

export const TOTAL_DE_PERGUNTAS = PERGUNTAS.length

export const PONTUACAO_MAXIMA = PERGUNTAS.reduce(
  (total, pergunta) => total + Math.max(...pergunta.alternativas.map((a) => a.peso)),
  0,
)

/**
 * Leitura de cada dor quando o professor responde com peso 0 ou 1,
 * com a ferramenta do Mentoria que atende aquele ponto.
 */
export const DORES: Record<DorId, Dor> = {
  tempo: {
    atencao: 'O planejamento está tomando boa parte da sua semana.',
    ponte:
      'Gerador de planos de aula: você descreve a turma e o objetivo, e o plano volta pronto para ajustar.',
  },
  usoDeIa: {
    atencao: 'A IA ainda não faz parte da sua rotina de trabalho.',
    ponte:
      'Assistentes de IA já configurados para o contexto pedagógico, sem você precisar aprender a escrever prompt.',
  },
  provas: {
    atencao: 'Montar avaliação ainda é trabalho braçal para você.',
    ponte:
      'Criação de provas e avaliações no formato que você já usa em sala, com gabarito junto.',
  },
  correcao: {
    atencao: 'A correção continua ocupando suas noites.',
    ponte:
      'Correção apoiada por IA, com o desempenho da turma organizado para você enxergar quem ficou para trás.',
  },
  bncc: {
    atencao: 'O alinhamento com a BNCC depende de você procurar habilidade por habilidade.',
    ponte: 'Cada material sai com a habilidade da BNCC indicada, sem consulta manual.',
  },
  personalizacao: {
    atencao: 'A turma recebe a mesma atividade, mesmo com níveis bem diferentes.',
    ponte: 'Listas de exercícios em vários níveis a partir do mesmo conteúdo.',
  },
  inclusao: {
    atencao: 'A documentação de PEI e PDI está pesando no seu tempo.',
    ponte:
      'Planejamento de PEI e PDI estruturado, com acompanhamento da evolução de cada aluno.',
  },
  alunos: {
    atencao: 'Seus alunos convivem com IA sem um ambiente seguro para estudar.',
    ponte: 'Otto, o chat de IA que os alunos usam dentro de um ambiente pensado para a escola.',
  },
}
