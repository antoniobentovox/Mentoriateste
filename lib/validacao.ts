const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function nomeValido(nome: string): boolean {
  return nome.trim().length >= 2
}

export function emailValido(email: string): boolean {
  return PADRAO_EMAIL.test(email.trim())
}

export interface ErrosDoFormulario {
  nome?: string
  email?: string
  consentimento?: string
}

export function validarFormulario(dados: {
  nome: string
  email: string
  consentimento: boolean
}): ErrosDoFormulario {
  const erros: ErrosDoFormulario = {}
  if (!nomeValido(dados.nome)) erros.nome = 'Escreva seu nome para eu personalizar o resultado.'
  if (!emailValido(dados.email)) erros.email = 'Confira o e-mail, algo ficou faltando.'
  if (!dados.consentimento) erros.consentimento = 'Preciso da sua autorização para enviar o e-mail.'
  return erros
}
