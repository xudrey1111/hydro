import { NextResponse } from "next/server"
import { userStorage } from "@/lib/user-storage"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Usuario y contraseña requeridos" }, { status: 400 })
    }

    const success = userStorage.register(username, password)

    if (!success) {
      return NextResponse.json({ error: "Usuario ya registrado" }, { status: 409 })
    }

    return NextResponse.json({ success: true, username })
  } catch (error) {
    console.error("[v0] Register error:", error)
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 })
  }
}
