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
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-foreground">HYDRO</span>
              <span className="text-cyan-500">CORE</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Inicio
            </Link>
            <span className="text-sm font-medium text-cyan-500 border-b border-cyan-500 pb-0.5">
              Conócenos
            </span>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Hero title */}
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-balance">
            <span className="text-foreground">Conóce</span>
            <span className="text-cyan-500">nos</span>
          </h1>
          <div className="mx-auto w-16 h-0.5 bg-cyan-500 rounded-full" />
        </section>

        {/* Origin story */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-cyan-500 rounded-full" />
            <h2 className="text-2xl font-semibold text-foreground">Nuestro origen</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed text-base text-pretty">
              HydroCore nace a partir de la identificación de varios problemas en la producción y
              consumo de alimentos, principalmente en la Ciudad de México: el desperdicio de comida,
              el alto consumo de agua en la agricultura, la contaminación por pesticidas y la
              dependencia del transporte de alimentos desde zonas rurales.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base text-pretty mt-4">
              A partir de esto se investigaron alternativas más eficientes, encontrando la hidroponía,
              y se identificó que pese a sus ventajas sobre la agricultura tradicional, uno de los
              principales problemas es lo difícil de monitorear y controlar las variables ambientales
              para obtener una buena cosecha, especialmente en gente sin experiencia.
            </p>
          </div>
        </section>

        {/* Team section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-cyan-500 rounded-full" />
            <h2 className="text-2xl font-semibold text-foreground">Nuestro equipo</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group border-border hover:border-cyan-500/50 transition-colors bg-card"
              >
                <CardContent className="p-5 flex flex-col items-center gap-4">
                  {/* Photo slot */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-cyan-500/60 transition-colors flex-shrink-0">
                    <Image
                      src="/images/team-placeholder.jpg"
                      alt={`Foto de ${member.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-foreground text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} HydroCore &mdash; Donde el agua es la raíz de todo
        </p>
      </footer>
    </div>
  )
}
