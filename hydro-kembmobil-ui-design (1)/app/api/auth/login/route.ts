import { NextResponse } from "next/server"
import { userStorage } from "@/lib/user-storage"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Usuario y contraseña requeridos" }, { status: 400 })
    }

    const isValid = userStorage.login(username, password)

    if (!isValid) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
    }

    return NextResponse.json({ success: true, username })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}
