"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("user", username)
          router.push("/dashboard")
        } else {
          toast({
            title: "Registro exitoso",
            description: `Usuario ${username} registrado correctamente`,
          })
          setIsLogin(true)
          setPassword("")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Ocurrio un error",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error de conexion",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-primary/20 shadow-2xl backdrop-blur-sm bg-card/95">
      <CardHeader className="space-y-4 pb-8 text-center">
        <div className="flex justify-center">
          <img 
            src="/images/hydrocore-logo.png" 
            alt="HydroCore Logo" 
            className="h-32 w-32 object-contain"
          />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-4xl font-bold">
            <span className="text-foreground">HYDRO</span>
            <span className="text-cyan-500">CORE</span>
          </CardTitle>
          <CardDescription className="text-lg italic text-muted-foreground">
            "Donde el agua es la raíz de todo"
          </CardDescription>
          <p className="text-sm text-muted-foreground pt-2">Control total sobre tu cultivo</p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Usuario
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="space-y-3">
            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
              {isLoading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base bg-transparent"
              onClick={() => {
                setIsLogin(!isLogin)
                setPassword("")
              }}
            >
              {isLogin ? "Crear una cuenta" : "Ya tengo una cuenta"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
