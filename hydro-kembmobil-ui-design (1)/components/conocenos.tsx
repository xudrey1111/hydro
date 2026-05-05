import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  { id: 1, name: "Integrante 1", role: "Rol del equipo" },
  { id: 2, name: "Integrante 2", role: "Rol del equipo" },
  { id: 3, name: "Integrante 3", role: "Rol del equipo" },
  { id: 4, name: "Integrante 4", role: "Rol del equipo" },
  { id: 5, name: "Integrante 5", role: "Rol del equipo" },
  { id: 6, name: "Integrante 6", role: "Rol del equipo" },
  { id: 7, name: "Integrante 7", role: "Rol del equipo" },
  { id: 8, name: "Integrante 8", role: "Rol del equipo" },
  { id: 9, name: "Integrante 9", role: "Rol del equipo" },
]

export function Conocenos() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold font-serif">
              <span className="text-foreground">HYDRO</span>
              <span className="text-primary">CORE</span>
            </span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Inicio
            </Link>
            <span className="text-sm font-semibold text-primary">
              Conócenos
            </span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero section with large title */}
        <section className="py-20 lg:py-32 space-y-8">
          <div className="space-y-6">
            <h1 className="text-7xl lg:text-8xl font-serif font-black tracking-tight text-balance leading-none">
              <span className="text-foreground">Conó</span>
              <span className="text-primary">ce</span>
              <span className="text-foreground">nos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Descubre la historia detrás de HydroCore y conoce a los innovadores que transforman la agricultura en México.
            </p>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
        </section>

        {/* Origin story section */}
        <section className="py-20 space-y-8">
          <div className="space-y-2">
            <h2 className="text-5xl lg:text-6xl font-serif font-black text-balance">
              Nuestro <span className="text-primary">Origen</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                HydroCore nace a partir de la identificación de varios problemas en la producción y
                consumo de alimentos, principalmente en la Ciudad de México: el desperdicio de comida,
                el alto consumo de agua en la agricultura, la contaminación por pesticidas y la
                dependencia del transporte de alimentos desde zonas rurales.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                A partir de esto se investigaron alternativas más eficientes, encontrando la hidroponía.
                Sin embargo, se identificó que pese a sus ventajas sobre la agricultura tradicional, uno
                de los principales problemas es lo difícil de monitorear y controlar las variables
                ambientales para obtener una buena cosecha, especialmente en gente sin experiencia.
              </p>
              <p className="text-lg leading-relaxed text-primary font-semibold">
                Es aquí donde nace HydroCore: democratizando el acceso a la tecnología hidroponía de forma inteligente y accesible.
              </p>
            </div>

            {/* Visual element */}
            <div className="relative h-96 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-2xl border border-primary/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
              </div>
              <div className="relative text-center space-y-2">
                <div className="text-6xl font-serif font-black text-primary">HYDRO</div>
                <div className="text-sm font-semibold text-muted-foreground tracking-widest">INTELIGENCIA HIDROPONÍA</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="py-20 space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl lg:text-6xl font-serif font-black text-balance">
              Nuestro <span className="text-primary">Equipo</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              9 mentes brillantes trabajando juntas para revolucionar la forma en que producimos alimentos en México.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group border-border hover:border-primary/40 transition-all duration-300 bg-card/50 hover:bg-card backdrop-blur-sm overflow-hidden"
              >
                <CardContent className="p-6 flex flex-col items-center gap-5">
                  {/* Photo slot */}
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-3 border-border group-hover:border-primary/50 transition-all duration-300 flex-shrink-0 bg-muted">
                    <Image
                      src="/images/team-placeholder.jpg"
                      alt={`Foto de ${member.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="text-center space-y-2 w-full">
                    <p className="font-serif text-xl font-bold text-foreground">
                      {member.name}
                    </p>
                    <p className="text-sm text-primary font-semibold">
                      {member.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-4xl lg:text-5xl font-serif font-black">
              ¿Listo para transformar tu forma de <span className="text-primary">cultivar</span>?
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Únete a la revolución hidroponía y descubre cómo la inteligencia artificial te ayuda a obtener mejores cosechas.
            </p>
          </div>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Volver al inicio
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12 text-center bg-card/30">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} HydroCore &mdash; Donde el agua es la raíz de todo
        </p>
      </footer>
    </div>
  )
}
