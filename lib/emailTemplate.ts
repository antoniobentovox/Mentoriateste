import { PONTUACAO_MAXIMA } from '@/lib/perguntas'
import { NIVEIS } from '@/lib/niveis'
import type { Dor, DorId, NivelId } from '@/types/quiz'

const ROXO_ESCURO = '#2D1B4E'
const ROXO = '#6B3FD8'
const ROXO_CLARO = '#B8A2E3'
const CREME = '#FAF8F3'

export function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export interface DadosDoEmail {
  nome: string
  nivel: NivelId
  pontuacao: number
  serieDisciplina?: string
  dores?: (Dor & { id: DorId })[]
  mentoriaUrl: string
}

export function montarAssunto(nivel: NivelId): string {
  return `Seu diagnóstico de IA na sala de aula: ${NIVEIS[nivel].nome}`
}

export function montarEmailHtml({
  nome,
  nivel,
  pontuacao,
  serieDisciplina,
  dores = [],
  mentoriaUrl,
}: DadosDoEmail): string {
  const dadosDoNivel = NIVEIS[nivel]
  const primeiroNome = escaparHtml(nome.trim().split(/\s+/)[0] ?? nome)
  const url = escaparHtml(mentoriaUrl)

  const listaDeDores = dores.length
    ? dores
        .map(
          (dor) => `
            <tr>
              <td style="padding:0 0 16px 0;">
                <p style="margin:0 0 4px 0;font-size:15px;line-height:1.5;color:${ROXO_ESCURO};font-weight:600;">
                  ${escaparHtml(dor.atencao)}
                </p>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#4b4459;">
                  ${escaparHtml(dor.ponte)}
                </p>
              </td>
            </tr>`,
        )
        .join('')
    : dadosDoNivel.destaques
        .map(
          (destaque) => `
            <tr>
              <td style="padding:0 0 12px 0;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#4b4459;">
                  ${escaparHtml(destaque)}
                </p>
              </td>
            </tr>`,
        )
        .join('')

  const linhaDaTurma = serieDisciplina?.trim()
    ? `<p style="margin:8px 0 0 0;font-size:14px;line-height:1.5;color:#6f6880;">
         Turma informada: ${escaparHtml(serieDisciplina.trim())}
       </p>`
    : ''

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escaparHtml(montarAssunto(nivel))}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${CREME};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${CREME};padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:${ROXO_ESCURO};padding:28px 32px;">
                <p style="margin:0;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:${ROXO_CLARO};">
                  Mentoria
                </p>
                <h1 style="margin:8px 0 0 0;font-size:24px;line-height:1.3;color:#ffffff;font-weight:600;">
                  ${primeiroNome}, seu nível é ${escaparHtml(dadosDoNivel.nome)}
                </h1>
                <p style="margin:8px 0 0 0;font-size:15px;line-height:1.5;color:${ROXO_CLARO};">
                  ${pontuacao} de ${PONTUACAO_MAXIMA} pontos no diagnóstico
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px 32px;">
                <p style="margin:0 0 16px 0;font-size:17px;line-height:1.5;color:${ROXO_ESCURO};font-weight:600;">
                  ${escaparHtml(dadosDoNivel.chamada)}
                </p>
                <p style="margin:0;font-size:15px;line-height:1.65;color:#4b4459;">
                  ${escaparHtml(dadosDoNivel.leitura)}
                </p>
                ${linhaDaTurma}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px 32px;">
                <p style="margin:0 0 16px 0;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:${ROXO};font-weight:600;">
                  O que o Mentoria resolve no seu caso
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${listaDeDores}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px 32px;">
                <p style="margin:0 0 24px 0;font-size:15px;line-height:1.65;color:#4b4459;">
                  ${escaparHtml(dadosDoNivel.fecho)}
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background-color:${ROXO};border-radius:999px;">
                      <a href="${url}" style="display:inline-block;padding:14px 28px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">
                        Conhecer o Mentoria
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background-color:${CREME};padding:20px 32px;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#6f6880;">
                  Você recebeu este e-mail porque pediu o resultado do diagnóstico de IA na sala de aula.
                  Se não quiser mais receber, é só responder esta mensagem pedindo para sair.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function montarEmailTexto({
  nome,
  nivel,
  pontuacao,
  dores = [],
  mentoriaUrl,
}: DadosDoEmail): string {
  const dadosDoNivel = NIVEIS[nivel]
  const primeiroNome = nome.trim().split(/\s+/)[0] ?? nome
  const itens = dores.length
    ? dores.map((dor) => `- ${dor.atencao}\n  ${dor.ponte}`)
    : dadosDoNivel.destaques.map((destaque) => `- ${destaque}`)

  return [
    `${primeiroNome}, seu nível é ${dadosDoNivel.nome}.`,
    `${pontuacao} de ${PONTUACAO_MAXIMA} pontos no diagnóstico.`,
    '',
    dadosDoNivel.chamada,
    dadosDoNivel.leitura,
    '',
    'O que o Mentoria resolve no seu caso:',
    ...itens,
    '',
    dadosDoNivel.fecho,
    '',
    `Conhecer o Mentoria: ${mentoriaUrl}`,
  ].join('\n')
}
