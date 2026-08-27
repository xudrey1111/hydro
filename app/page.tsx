import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
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

      <div className="relative z-10 w-full max-w-md px-6 space-y-4">
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          ¿Quieres saber más sobre nosotros?{" "}
          <Link
            href="/conocenos"
            className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors underline underline-offset-2"
          >
            Conócenos
          </Link>
        </p>
      </div>
    </div>
  )
}
