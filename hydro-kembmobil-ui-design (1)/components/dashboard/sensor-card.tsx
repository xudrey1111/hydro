"use client"

interface SensorCardProps {
  sensorName: string
  sensorValue: string
}

export function SensorCard({ sensorName, sensorValue }: SensorCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-card shadow-lg overflow-hidden border border-border">
      {/* Header */}
      <div 
        className="px-4 py-3 text-center"
        style={{ backgroundColor: "#1a6b3c" }}
      >
        <h3 className="text-lg font-bold text-white">{sensorName}</h3>
      </div>
      
      {/* Value */}
      <div className="p-6 flex items-center justify-center min-h-[80px]">
        <p className="text-2xl font-semibold text-foreground">
          Valor: <span className="text-primary">{sensorValue}</span>
        </p>
      </div>
    </div>
  )
}
