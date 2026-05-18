import Link from "next/link"
import Image from "next/image"
import { LoginForm } from "@/components/login-form"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
      <header className="flex items-center justify-between px-8 py-4 md:px-16 border-b border-border bg-card/50 backdrop-blur-sm">
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

      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary animate-pulse"
              style={{
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-md px-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
