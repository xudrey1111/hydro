import { NextResponse } from "next/server"

// Simulated sensor readings (replace with actual sensor IP connections)
function getSensorValue(sensorId: string): number {
  switch (sensorId) {
    case "water-level":
      return Math.random() * 100
    case "ambient-temp":
      return 15 + Math.random() * 20
    case "water-temp":
      return 18 + Math.random() * 12
    case "ph":
      return 5.5 + Math.random() * 3
    case "light":
      return Math.random() * 1000
    case "purity":
      return 70 + Math.random() * 30
    default:
      return 0
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const value = getSensorValue(id)

    return NextResponse.json({ sensorId: id, value, timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ error: "Error al leer el sensor" }, { status: 500 })
  }
}
