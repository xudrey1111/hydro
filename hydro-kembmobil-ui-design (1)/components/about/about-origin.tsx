export function AboutOrigin() {
  return (
    <section className="px-8 py-16 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <h2 className="font-serif text-5xl font-bold text-foreground text-balance">
            Nuestro <span style={{ color: "#1a6b3c" }}>Origen</span>
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground/80">
            <p>
              HydroCore nace a partir de la identificación de varios problemas en la producción y consumo de alimentos,
              principalmente en la Ciudad de México: el desperdicio de comida, el alto consumo de agua en la
              agricultura, la contaminación por pesticidas y la dependencia del transporte de alimentos desde zonas
              rurales.
            </p>
            <p>
              A partir de esto se investigaron alternativas más eficientes, encontrando la hidroponía. Sin embargo, se
              identificó que pese a sus ventajas sobre la agricultura tradicional, uno de los principales problemas es
              lo difícil de monitorear y controlar las variables ambientales para obtener una buena cosecha,
              especialmente en gente sin experiencia.
            </p>
            <p className="font-semibold" style={{ color: "#1a6b3c" }}>
              Es aquí donde nace HydroCore: democratizando el acceso a la tecnología hidroponía de forma inteligente y
              accesible.
            </p>
          </div>
        </div>

        {/* Card visual */}
        <div
          className="flex items-center justify-center rounded-3xl p-16 aspect-square max-w-sm mx-auto lg:max-w-none"
          style={{ backgroundColor: "#d4ede1" }}
        >
          <div className="text-center">
            <p
              className="font-serif text-5xl font-bold tracking-wider"
              style={{ color: "#1a6b3c" }}
            >
              HYDRO
            </p>
            <p
              className="mt-3 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#2d5a27" }}
            >
              Inteligencia Hidroponía
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
