import { FluxoQuiz } from '@/components/FluxoQuiz'
import { LINK_MENTORIA } from '@/lib/links'

export default function Pagina() {
  const mentoriaUrl = process.env.MENTORIA_URL ?? LINK_MENTORIA

  return <FluxoQuiz mentoriaUrl={mentoriaUrl} />
}
