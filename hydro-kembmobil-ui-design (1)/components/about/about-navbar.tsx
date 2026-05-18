import Link from "next/link"
import Image from "next/image"

export function AboutNavbar() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 md:px-16"
      style={{ backgroundColor: "#f7faf8", borderBottom: "1px solid #c2d9cc" }}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/hydrocore-logo.png"
          alt="HydroCore Logo"
          width={48}
          height={48}
          className="h-12 w-12"
        />
        <span className="font-serif text-xl font-bold text-foreground tracking-tight hidden sm:inline">HYDRO</span>
        <span className="font-serif text-xl font-bold tracking-tight hidden sm:inline" style={{ color: "#1a6b3c" }}>
          CORE
        </span>
      </Link>

      <nav className="flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
          Inicio
        </Link>
        <Link
          href="/conocenos"
          className="font-semibold transition-colors"
          style={{ color: "#1a6b3c" }}
        >
          Conócenos
        </Link>
      </nav>
    </header>
  )
}
