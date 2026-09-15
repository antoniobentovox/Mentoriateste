'use client'

import { useEffect, useState } from 'react'
import { gerarCartaoPng, type DadosDoCartao } from '@/lib/cartaoPng'

interface CompartilharProps {
  cartao: DadosDoCartao
}

type Situacao = 'parado' | 'gerando' | 'baixado' | 'falhou'

export function Compartilhar({ cartao }: CompartilharProps) {
  const [situacao, setSituacao] = useState<Situacao>('parado')

  useEffect(() => {
    if (situacao !== 'baixado' && situacao !== 'falhou') return
    const tempo = setTimeout(() => setSituacao('parado'), 4500)
    return () => clearTimeout(tempo)
  }, [situacao])

  async function baixar() {
    setSituacao('gerando')

    try {
      const png = await gerarCartaoPng(cartao)
      if (!png) {
        setSituacao('falhou')
        return
      }

      const arquivo = new File([png], 'meu-nivel-de-ia.png', { type: 'image/png' })

      // No celular o download por link costuma ser bloqueado; a folha de
      // compartilhamento entrega o mesmo PNG e ainda abre as redes.
      if (navigator.canShare?.({ files: [arquivo] })) {
        try {
          await navigator.share({ files: [arquivo] })
          setSituacao('parado')
          return
        } catch {
          // Cancelado: seguimos para o download.
        }
      }

      const endereco = URL.createObjectURL(png)
      const link = document.createElement('a')
      link.href = endereco
      link.download = 'meu-nivel-de-ia.png'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(endereco)
      setSituacao('baixado')
    } catch (erro) {
      console.error('Falha ao gerar o PNG do resultado:', erro)
      setSituacao('falhou')
    }
  }

  const gerando = situacao === 'gerando'

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={baixar}
        disabled={gerando}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-lavanda-forte/80 bg-white px-6 py-3 text-sm leading-none font-semibold text-roxo-escuro transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-roxo-vivo hover:text-roxo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxo active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {gerando ? (
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-roxo/30 border-t-roxo"
          />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path
              d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {gerando ? 'Gerando sua imagem...' : 'Baixar meu resultado em PNG'}
      </button>

      <p
        aria-live="polite"
        className={[
          'min-h-[1.25rem] text-center text-xs transition-opacity duration-300',
          situacao === 'baixado' || situacao === 'falhou' ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        {situacao === 'baixado' ? (
          <span className="text-roxo">Imagem salva. É só postar onde você quiser.</span>
        ) : null}
        {situacao === 'falhou' ? (
          <span className="text-texto-suave">
            Não consegui gerar a imagem agora. Tente de novo em instantes.
          </span>
        ) : null}
      </p>
    </div>
  )
}
