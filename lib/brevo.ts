import { montarAssunto, montarEmailHtml, montarEmailTexto, type DadosDoEmail } from '@/lib/emailTemplate'

const ENDPOINT_BREVO = 'https://api.brevo.com/v3/smtp/email'

export interface ResultadoDoEnvio {
  enviado: boolean
  motivo?: string
}

/**
 * Envia o resultado do diagnóstico pela API transacional do Brevo.
 * Roda apenas no servidor: a BREVO_API_KEY nunca sai daqui.
 * Nunca lança erro, para o resultado na tela não depender do e-mail.
 */
export async function enviarResultadoPorEmail(
  destinatario: { nome: string; email: string },
  dados: DadosDoEmail,
): Promise<ResultadoDoEnvio> {
  const chave = process.env.BREVO_API_KEY
  const remetenteEmail = process.env.BREVO_SENDER_EMAIL
  const remetenteNome = process.env.BREVO_SENDER_NAME ?? 'Mentoria'

  if (!chave || !remetenteEmail) {
    const motivo = 'BREVO_API_KEY ou BREVO_SENDER_EMAIL não configurados'
    console.warn(`[lead] envio de e-mail ignorado: ${motivo}`)
    return { enviado: false, motivo }
  }

  try {
    const resposta = await fetch(ENDPOINT_BREVO, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': chave,
      },
      body: JSON.stringify({
        sender: { name: remetenteNome, email: remetenteEmail },
        to: [{ email: destinatario.email, name: destinatario.nome }],
        subject: montarAssunto(dados.nivel),
        htmlContent: montarEmailHtml(dados),
        textContent: montarEmailTexto(dados),
        tags: ['quiz-diagnostico-ia', `nivel-${dados.nivel}`],
      }),
      cache: 'no-store',
    })

    if (!resposta.ok) {
      const corpo = await resposta.text()
      console.error(`[lead] Brevo respondeu ${resposta.status}: ${corpo}`)
      return { enviado: false, motivo: `Brevo respondeu ${resposta.status}` }
    }

    return { enviado: true }
  } catch (erro) {
    console.error('[lead] falha ao chamar a API do Brevo:', erro)
    return { enviado: false, motivo: 'falha de rede ao chamar o Brevo' }
  }
}
