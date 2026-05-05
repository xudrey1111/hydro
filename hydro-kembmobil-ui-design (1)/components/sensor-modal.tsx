"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface SensorModalProps {
  sensor: {
    id: string
    name: string
    icon: LucideIcon
    color: string
    bgColor: string
    unit: string
  }
  value: number
  onClose: () => void
}

export function SensorModal({ sensor, value, onClose }: SensorModalProps) {
  const [currentValue, setCurrentValue] = useState(value)
  const [history, setHistory] = useState<number[]>([value])
  const Icon = sensor.icon

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(`/api/sensors/${sensor.id}`)
      const data = await response.json()
      setCurrentValue(data.value)
      setHistory((prev) => [...prev.slice(-9), data.value])
    }, 2000)

    return () => clearInterval(interval)
  }, [sensor.id])

  const formatValue = (val: number) => {
    if (sensor.id === "ph" || sensor.id === "water-temp" || sensor.id === "ambient-temp") {
      return val.toFixed(2)
    }
    return val.toFixed(0)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`rounded-full p-3 ${sensor.bgColor}`}>
              <Icon className={`h-6 w-6 ${sensor.color}`} />
            </div>
            <div>
              <DialogTitle className="text-2xl">{sensor.name}</DialogTitle>
              <DialogDescription>Monitoreo en tiempo real</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Valor actual</p>
            <p className="text-5xl font-bold">
              {formatValue(currentValue)}
              <span className="text-2xl ml-2 text-muted-foreground">{sensor.unit}</span>
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Historial reciente</p>
            <div className="flex items-end justify-between gap-2 h-24 bg-muted/30 rounded-lg p-4">
              {history.map((val, index) => {
                const maxVal = Math.max(...history)
                const minVal = Math.min(...history)
                const range = maxVal - minVal || 1
                const height = ((val - minVal) / range) * 100

                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full rounded-t ${sensor.bgColor} transition-all`}
                      style={{ height: `${height || 10}%` }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
