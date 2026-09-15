/**
 * Textura de fundo do projeto inteiro: poucas formas roxas, opacidade baixa e
 * deriva lenta. Fica fixa atrás de tudo e não intercepta clique nenhum.
 *
 * Vive no layout, então acompanha abertura, quiz, formulário e resultado.
 */
export function TexturaDeFundo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Brilhos difusos que tiram o fundo do chapado. */}
      <span className="animate-derivar-c absolute -top-40 -right-32 h-[26rem] w-[26rem] rounded-full bg-roxo-vivo/10 blur-3xl" />
      <span className="animate-derivar-b absolute -bottom-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-roxo/10 blur-3xl" />

      {/* Círculos vazados, o mesmo traço da identidade. */}
      <span className="animate-derivar-a absolute top-[12%] left-[-4%] h-56 w-56 rounded-full border border-roxo/15" />
      <span className="animate-derivar-b absolute top-[58%] right-[-6%] h-72 w-72 rounded-full border border-roxo/12" />
      <span className="animate-derivar-c absolute top-[34%] right-[14%] h-28 w-28 rounded-full border border-roxo/15" />

      {/* Losangos soltos. */}
      <span className="animate-derivar-b absolute top-[22%] left-[18%] h-5 w-5 rotate-45 rounded-[6px] bg-roxo/12" />
      <span className="animate-derivar-a absolute top-[72%] left-[10%] h-8 w-8 rotate-45 rounded-[8px] bg-roxo-vivo/10" />
      <span className="animate-derivar-c absolute top-[46%] left-[46%] h-4 w-4 rotate-45 rounded-[5px] bg-roxo/10" />
      <span className="animate-derivar-a absolute top-[86%] right-[22%] h-6 w-6 rotate-45 rounded-[6px] bg-roxo/12" />
    </div>
  )
}
