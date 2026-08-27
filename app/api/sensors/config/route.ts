import { NextResponse } from "next/server"
import { getAllSensorConfigs } from "@/lib/sensor-connection"

export async function GET() {
  try {
    const configs = getAllSensorConfigs()
    return NextResponse.json(configs)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener configuraciones" }, { status: 500 })
  }
}
