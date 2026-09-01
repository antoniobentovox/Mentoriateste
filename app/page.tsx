import { FluxoQuiz } from '@/components/FluxoQuiz'

export default function Pagina() {
  const mentoriaUrl = process.env.MENTORIA_URL ?? 'https://mentoria.com.br'

  return <FluxoQuiz mentoriaUrl={mentoriaUrl} />
}
