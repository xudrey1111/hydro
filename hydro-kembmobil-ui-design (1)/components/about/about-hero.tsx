export function AboutHero() {
  return (
    <section className="px-8 py-20 md:px-16 lg:px-24">
      <div className="max-w-4xl">
        <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground leading-tight text-balance">
          Conóc<span style={{ color: "#1a6b3c" }}>en</span>os
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
          Descubre la historia detrás de HydroCore y conoce a los innovadores que transforman la agricultura en México.
        </p>
        <div className="mt-8 h-1 w-24 rounded-full" style={{ backgroundColor: "#1a6b3c" }} />
      </div>
    </section>
  )
}
