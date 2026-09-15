import { IconeInstagram, IconeYoutube } from '@/components/ui/IconesSociais'
import { LINK_INSTAGRAM, LINK_YOUTUBE } from '@/lib/links'

const REDES = [
  {
    nome: 'Instagram',
    href: LINK_INSTAGRAM,
    Icone: IconeInstagram,
    aoPassar: 'hover:border-transparent hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]',
  },
  {
    nome: 'YouTube',
    href: LINK_YOUTUBE,
    Icone: IconeYoutube,
    aoPassar: 'hover:border-transparent hover:bg-[#FF0000]',
  },
]

export function RedesSociais() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-semibold text-roxo-escuro">Acompanhe o Mentoria</p>

      <ul className="flex items-center justify-center gap-3">
        {REDES.map(({ nome, href, Icone, aoPassar }) => (
          <li key={nome}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Mentoria no ${nome}`}
              title={nome}
              className={[
                'inline-flex h-12 w-12 items-center justify-center rounded-full border border-lavanda-forte/80 bg-white text-roxo-escuro',
                'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-white',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxo active:scale-95',
                aoPassar,
              ].join(' ')}
            >
              <Icone />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
