export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Site Mentoria</h1>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:text-primary">Inicio</a>
          <a href="#" className="hover:text-primary">Sobre</a>
          <a href="#" className="hover:text-primary">Mentoria</a>
          <a href="#" className="hover:text-primary">Contato</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h2 className="text-5xl font-bold tracking-tight mb-4">
          Transforme sua carreira com mentoria
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-8">
          Conectamos voce aos melhores mentores para acelerar seu crescimento profissional.
        </p>
        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition">
          Comece agora
        </button>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-16 max-w-6xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">Mentores Experientes</h3>
          <p className="text-muted-foreground text-sm">
            Profissionais com anos de experiencia prontos para guiar voce.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">Sessoes Personalizadas</h3>
          <p className="text-muted-foreground text-sm">
            Cada sessao e adaptada ao seu nivel e objetivos.
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">Resultados Reais</h3>
          <p className="text-muted-foreground text-sm">
            Acompanhe seu progresso com metricas claras.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        &copy; 2026 Site Mentoria. Todos os direitos reservados.
      </footer>
    </div>
  );
}
