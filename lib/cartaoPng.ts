/**
 * Desenha o card de resultado como PNG, para o professor baixar e postar.
 *
 * É um desenho próprio em canvas, não uma captura da tela: assim o arquivo sai
 * sempre em 1080x1350 (4:5, o formato de feed), com a mesma composição em
 * qualquer aparelho, e sem trazer biblioteca nova para o projeto.
 */

const LARGURA = 1080
const ALTURA = 1350
const MARGEM = 80

const ROXO_ESCURO = '#2D1B4E'
const ROXO_PROFUNDO = '#1B1030'
const ROXO_VIVO = '#8B5CF6'
const LAVANDA_FORTE = '#D9C9F7'
const OURO = '#F5C451'

export interface DadosDoCartao {
  nome: string
  nivel: string
  pontuacao: number
  pontuacaoMaxima: number
  chamada: string
  site: string
}

/** Lê as famílias reais aplicadas na página, já resolvidas pelo next/font. */
function familias() {
  if (typeof document === 'undefined') {
    return { titulo: 'sans-serif', corpo: 'sans-serif' }
  }
  const corpo = getComputedStyle(document.body).fontFamily || 'sans-serif'
  const sonda = document.createElement('span')
  sonda.className = 'font-titulo'
  sonda.style.position = 'absolute'
  sonda.style.visibility = 'hidden'
  document.body.appendChild(sonda)
  const titulo = getComputedStyle(sonda).fontFamily || corpo
  sonda.remove()
  return { titulo, corpo }
}

function carregarImagem(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolver) => {
    const imagem = new Image()
    imagem.onload = () => resolver(imagem)
    imagem.onerror = () => resolver(null) // arquivo ausente não impede o PNG
    imagem.src = src
  })
}

/** Quebra o texto em linhas que cabem na largura dada. */
function quebrar(ctx: CanvasRenderingContext2D, texto: string, limite: number): string[] {
  const palavras = texto.split(/\s+/)
  const linhas: string[] = []
  let atual = ''

  for (const palavra of palavras) {
    const tentativa = atual ? `${atual} ${palavra}` : palavra
    if (ctx.measureText(tentativa).width > limite && atual) {
      linhas.push(atual)
      atual = palavra
    } else {
      atual = tentativa
    }
  }
  if (atual) linhas.push(atual)
  return linhas
}

/** Reduz o corpo até o texto caber na largura disponível. */
function corpoQueCabe(
  ctx: CanvasRenderingContext2D,
  texto: string,
  familia: string,
  peso: string,
  inicial: number,
  limite: number,
  minimo: number,
): number {
  let tamanho = inicial
  while (tamanho > minimo) {
    ctx.font = `${peso} ${tamanho}px ${familia}`
    if (ctx.measureText(texto).width <= limite) break
    tamanho -= 2
  }
  return tamanho
}

function retanguloArredondado(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  largura: number,
  altura: number,
  raio: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + raio, y)
  ctx.arcTo(x + largura, y, x + largura, y + altura, raio)
  ctx.arcTo(x + largura, y + altura, x, y + altura, raio)
  ctx.arcTo(x, y + altura, x, y, raio)
  ctx.arcTo(x, y, x + largura, y, raio)
  ctx.closePath()
}

export async function gerarCartaoPng(dados: DadosDoCartao): Promise<Blob | null> {
  const canvas = document.createElement('canvas')
  canvas.width = LARGURA
  canvas.height = ALTURA
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // Sem isto o canvas desenha na fonte de fallback, não na da marca.
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready
    } catch {
      // Seguimos com o que estiver carregado.
    }
  }

  const { titulo, corpo } = familias()
  const [logo, otto] = await Promise.all([
    carregarImagem('/marca/mentoria-logo.png'),
    carregarImagem('/marca/otto.png'),
  ])

  // ---- Fundo ----
  const fundo = ctx.createLinearGradient(0, 0, LARGURA, ALTURA)
  fundo.addColorStop(0, ROXO_ESCURO)
  fundo.addColorStop(0.55, '#3A2168')
  fundo.addColorStop(1, ROXO_PROFUNDO)
  ctx.fillStyle = fundo
  ctx.fillRect(0, 0, LARGURA, ALTURA)

  const brilhoA = ctx.createRadialGradient(880, 180, 0, 880, 180, 520)
  brilhoA.addColorStop(0, 'rgba(139,92,246,0.55)')
  brilhoA.addColorStop(1, 'rgba(139,92,246,0)')
  ctx.fillStyle = brilhoA
  ctx.fillRect(0, 0, LARGURA, ALTURA)

  const brilhoB = ctx.createRadialGradient(140, 1180, 0, 140, 1180, 520)
  brilhoB.addColorStop(0, 'rgba(107,63,216,0.45)')
  brilhoB.addColorStop(1, 'rgba(107,63,216,0)')
  ctx.fillStyle = brilhoB
  ctx.fillRect(0, 0, LARGURA, ALTURA)

  ctx.strokeStyle = 'rgba(255,255,255,0.09)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(940, 120, 360, 0, Math.PI * 2)
  ctx.stroke()

  // ---- Logo numa placa clara, para as cores da marca ficarem corretas ----
  if (logo) {
    const alturaDaLogo = 72
    const larguraDaLogo = (logo.width / logo.height) * alturaDaLogo
    const folga = 24
    ctx.fillStyle = '#FFFFFF'
    retanguloArredondado(
      ctx,
      MARGEM,
      MARGEM,
      larguraDaLogo + folga * 2,
      alturaDaLogo + folga * 1.4,
      28,
    )
    ctx.fill()
    ctx.drawImage(logo, MARGEM + folga, MARGEM + folga * 0.7, larguraDaLogo, alturaDaLogo)
  }

  // ---- Selo ----
  ctx.font = `600 26px ${corpo}`
  const selo = 'DIAGNÓSTICO DE IA'
  const larguraDoSelo = ctx.measureText(selo).width + 56
  const alturaDoSelo = 62
  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  retanguloArredondado(
    ctx,
    LARGURA - MARGEM - larguraDoSelo,
    MARGEM + 20,
    larguraDoSelo,
    alturaDoSelo,
    alturaDoSelo / 2,
  )
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.28)'
  ctx.lineWidth = 2
  retanguloArredondado(
    ctx,
    LARGURA - MARGEM - larguraDoSelo,
    MARGEM + 20,
    larguraDoSelo,
    alturaDoSelo,
    alturaDoSelo / 2,
  )
  ctx.stroke()
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(selo, LARGURA - MARGEM - larguraDoSelo / 2, MARGEM + 20 + alturaDoSelo / 2)

  // ---- Anel de pontuação ----
  const centroX = LARGURA / 2
  const centroY = 470
  const raio = 138
  const percentual =
    dados.pontuacaoMaxima > 0 ? dados.pontuacao / dados.pontuacaoMaxima : 0

  ctx.lineWidth = 28
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'rgba(255,255,255,0.16)'
  ctx.beginPath()
  ctx.arc(centroX, centroY, raio, 0, Math.PI * 2)
  ctx.stroke()

  const gradienteDoAnel = ctx.createLinearGradient(
    centroX - raio,
    centroY - raio,
    centroX + raio,
    centroY + raio,
  )
  gradienteDoAnel.addColorStop(0, LAVANDA_FORTE)
  gradienteDoAnel.addColorStop(0.55, ROXO_VIVO)
  gradienteDoAnel.addColorStop(1, OURO)
  ctx.strokeStyle = gradienteDoAnel
  ctx.beginPath()
  ctx.arc(centroX, centroY, raio, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * percentual)
  ctx.stroke()

  ctx.fillStyle = '#FFFFFF'
  ctx.font = `700 76px ${titulo}`
  ctx.fillText(`${Math.round(percentual * 100)}%`, centroX, centroY - 12)
  ctx.fillStyle = LAVANDA_FORTE
  ctx.font = `600 22px ${corpo}`
  ctx.fillText('MATURIDADE', centroX, centroY + 48)

  // ---- Nome e nível ----
  const primeiroNome = dados.nome.trim().split(/\s+/)[0] ?? dados.nome
  ctx.font = `700 34px ${corpo}`
  const larguraDoNome = ctx.measureText(primeiroNome).width
  ctx.font = `400 34px ${corpo}`
  const larguraDoResto = ctx.measureText(', seu nível é').width
  let cursor = centroX - (larguraDoNome + larguraDoResto) / 2

  ctx.textAlign = 'left'
  ctx.fillStyle = '#FFFFFF'
  ctx.font = `700 34px ${corpo}`
  ctx.fillText(primeiroNome, cursor, 690)
  cursor += larguraDoNome
  ctx.fillStyle = LAVANDA_FORTE
  ctx.font = `400 34px ${corpo}`
  ctx.fillText(', seu nível é', cursor, 690)

  ctx.textAlign = 'center'
  const corpoDoNivel = corpoQueCabe(
    ctx,
    dados.nivel,
    titulo,
    '700',
    112,
    LARGURA - MARGEM * 2,
    56,
  )
  const gradienteDoNivel = ctx.createLinearGradient(
    MARGEM,
    0,
    LARGURA - MARGEM,
    0,
  )
  gradienteDoNivel.addColorStop(0, '#FFFFFF')
  gradienteDoNivel.addColorStop(0.55, LAVANDA_FORTE)
  gradienteDoNivel.addColorStop(1, OURO)
  ctx.fillStyle = gradienteDoNivel
  ctx.font = `700 ${corpoDoNivel}px ${titulo}`
  ctx.fillText(dados.nivel, centroX, 700 + corpoDoNivel * 0.62)

  ctx.fillStyle = LAVANDA_FORTE
  ctx.font = `400 28px ${corpo}`
  ctx.fillText(
    `${dados.pontuacao} de ${dados.pontuacaoMaxima} pontos no diagnóstico`,
    centroX,
    700 + corpoDoNivel * 0.62 + 60,
  )

  // ---- Chamada ----
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = `500 38px ${corpo}`
  const linhas = quebrar(ctx, dados.chamada, LARGURA - MARGEM * 2 - 220)
  let y = 960
  for (const linha of linhas.slice(0, 3)) {
    ctx.fillText(linha, centroX - 100, y)
    y += 52
  }

  // ---- Mascote ----
  if (otto) {
    const lado = 260
    ctx.drawImage(otto, LARGURA - MARGEM - lado + 40, ALTURA - 400, lado, lado)
  }

  // ---- Rodapé ----
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.font = `500 26px ${corpo}`
  ctx.textAlign = 'center'
  ctx.fillText(dados.site, centroX, ALTURA - MARGEM)

  return new Promise((resolver) => canvas.toBlob((blob) => resolver(blob), 'image/png'))
}
