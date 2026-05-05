"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Droplet,
  Thermometer,
  TestTube,
  Sun,
  Waves,
  Sparkles,
  LogOut,
  Bell,
  Settings,
  BarChart3,
  Activity,
  Zap,
  MessageSquare,
  X,
  Leaf,
  BookOpen,
  ShoppingCart,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  Send,
  HelpCircle,
  Bug,
  Package,
} from "lucide-react"
import { SensorModal } from "@/components/sensor-modal"

const sensors = [
  {
    id: "humidity",
    name: "Humedad",
    icon: Droplet,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    unit: "%",
  },
  {
    id: "light",
    name: "Luz",
    icon: Sun,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    unit: "lux",
  },
  {
    id: "ambient-temp",
    name: "Temperatura Ambiente",
    icon: Thermometer,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    unit: "°C",
  },
  {
    id: "water-temp",
    name: "Temperatura del Agua",
    icon: Waves,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    unit: "°C",
  },
  {
    id: "ph",
    name: "pH del Agua",
    icon: TestTube,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    unit: "pH",
  },
  {
    id: "purity",
    name: "Pureza del Agua",
    icon: Sparkles,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    unit: "%",
  },
]

const navigationTabs = [
  { id: "panel", label: "Panel", icon: BarChart3 },
  { id: "sensores", label: "Sensores", icon: Activity },
  { id: "analisis", label: "Análisis", icon: Activity },
  { id: "control", label: "Control", icon: Zap },
  { id: "chat", label: "Chat", icon: MessageSquare },
]

const cropTypes = [
  { id: "lettuce", name: "Lechuga", icon: Leaf, description: "Cultivo de hojas verdes" },
  { id: "tomato", name: "Tomate", icon: Leaf, description: "Fruto rojo nutritivo" },
  { id: "strawberry", name: "Fresa", icon: Leaf, description: "Fruto dulce y jugoso" },
  { id: "basil", name: "Albahaca", icon: Leaf, description: "Hierba aromatica" },
  { id: "pepper", name: "Pimiento", icon: Leaf, description: "Vegetal colorido" },
  { id: "cucumber", name: "Pepino", icon: Leaf, description: "Vegetal refrescante" },
]

const chatOptions = [
  { id: "question", label: "Tengo una pregunta", icon: HelpCircle, color: "text-blue-500" },
  { id: "suggestion", label: "Quiero dar una sugerencia", icon: Lightbulb, color: "text-yellow-500" },
  { id: "failure", label: "Reportar una falla", icon: Bug, color: "text-red-500" },
  { id: "purchase", label: "Quiero comprar algo", icon: ShoppingCart, color: "text-emerald-500" },
]

const faqQuestions = [
  { q: "Como calibrar los sensores?", a: "Ve a Control > Manual de Uso > Seccion de Calibracion para instrucciones detalladas." },
  { q: "Cual es el pH optimo?", a: "El pH optimo para la mayoria de cultivos hidroponicos esta entre 5.5 y 6.5." },
  { q: "Como cambio el tipo de cultivo?", a: "En la seccion Panel puedes seleccionar el tipo de cultivo que estas cultivando." },
  { q: "Cada cuanto debo revisar el sistema?", a: "Recomendamos revisar los niveles de nutrientes cada 2-3 dias y el pH diariamente." },
]

const manualSections = [
  { 
    title: "Instalacion del Sistema", 
    content: "1. Conecte todos los sensores a sus respectivos puertos.\n2. Asegurese de que el sistema este conectado a internet.\n3. Encienda el controlador principal.\n4. Espere a que todos los LEDs se estabilicen en verde."
  },
  { 
    title: "Calibracion de Sensores", 
    content: "1. Sensor de pH: Use solucion buffer pH 7.0 y pH 4.0.\n2. Sensor de temperatura: Verifique con termometro de referencia.\n3. Sensor de luz: Calibre en ambiente controlado.\n4. Repita cada 30 dias para precision optima."
  },
  { 
    title: "Mantenimiento Preventivo", 
    content: "- Limpie los sensores semanalmente.\n- Revise conexiones cada mes.\n- Cambie filtros cada 3 meses.\n- Actualice el firmware cuando este disponible."
  },
  { 
    title: "Solucion de Problemas", 
    content: "- Lecturas erraticas: Verifique conexiones y calibre sensores.\n- Sin conexion: Reinicie el router y controlador.\n- Alertas constantes: Ajuste los umbrales en configuracion."
  },
]

const purchaseHistory = [
  { item: "Sensor de pH", date: "15 Nov 2024", tip: "Recuerda calibrar cada 30 dias para lecturas precisas." },
  { item: "Nutrientes A+B", date: "01 Nov 2024", tip: "Almacenar en lugar fresco y oscuro. Usar en proporcion 1:1." },
  { item: "Bomba de Agua", date: "20 Oct 2024", tip: "Limpiar filtro de entrada semanalmente para evitar obstrucciones." },
]

function getSensorStatus(
  sensorId: string,
  value: number,
): { label: string; variant: "default" | "destructive" | "secondary" } {
  if (sensorId === "ph") {
    if (value < 5.5 || value > 7.0) return { label: "Advertencia", variant: "destructive" }
    return { label: "Optimo", variant: "default" }
  }
  if (sensorId === "humidity") {
    if (value < 40 || value > 90) return { label: "Advertencia", variant: "destructive" }
    return { label: "Optimo", variant: "default" }
  }
  if (sensorId === "ambient-temp") {
    if (value < 18 || value > 30) return { label: "Advertencia", variant: "destructive" }
    return { label: "Optimo", variant: "default" }
  }
  if (sensorId === "water-temp") {
    if (value < 18 || value > 26) return { label: "Advertencia", variant: "destructive" }
    return { label: "Optimo", variant: "default" }
  }
  if (sensorId === "light") {
    if (value < 400 || value > 900) return { label: "Advertencia", variant: "destructive" }
    return { label: "Optimo", variant: "default" }
  }
  if (sensorId === "purity") {
    if (value < 80) return { label: "Advertencia", variant: "destructive" }
    return { label: "Optimo", variant: "default" }
  }
  return { label: "Normal", variant: "secondary" }
}

export function SensorDashboard() {
  const router = useRouter()
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null)
  const [sensorData, setSensorData] = useState<Record<string, number>>({})
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [user, setUser] = useState<string>("")
  const [activeTab, setActiveTab] = useState("panel")
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; time: string; type: string }>>([])
  const [analysisTimeRange, setAnalysisTimeRange] = useState("1d")
  const [chatStep, setChatStep] = useState<"menu" | "option" | "faq" | "form">("menu")
  const [chatOption, setChatOption] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState("")
  const [expandedManual, setExpandedManual] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/")
      return
    }
    setUser(storedUser)

    const storedCrop = localStorage.getItem("selectedCrop")
    if (storedCrop) {
      setSelectedCrop(storedCrop)
    }

    const fetchData = async () => {
      const data: Record<string, number> = {}
      const newNotifications: Array<{ id: string; message: string; time: string; type: string }> = []

      for (const sensor of sensors) {
        const response = await fetch(`/api/sensors/${sensor.id}`)
        const json = await response.json()
        data[sensor.id] = json.value

        const status = getSensorStatus(sensor.id, json.value)
        if (status.variant === "destructive") {
          const now = new Date()
          newNotifications.push({
            id: sensor.id,
            message: `${sensor.name} fuera de rango optimo: ${json.value.toFixed(sensor.id === "ph" ? 1 : 0)}${sensor.unit}`,
            time: now.toLocaleTimeString("es-ES"),
            type: "alert"
          })
        }
      }

      setSensorData(data)
      setLastUpdated(new Date())
      if (newNotifications.length > 0) {
        setNotifications(newNotifications)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 2000)
    return () => clearInterval(interval)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("selectedCrop")
    router.push("/")
  }

  const handleSelectCrop = (cropId: string) => {
    setSelectedCrop(cropId)
    localStorage.setItem("selectedCrop", cropId)
  }

  const selectedSensorData = sensors.find((s) => s.id === selectedSensor)
  const selectedCropData = cropTypes.find((c) => c.id === selectedCrop)

  const renderPanelContent = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Selecciona tu tipo de cultivo</h2>
        <p className="text-muted-foreground mb-6">Esto optimizara los parametros del sistema para tu cultivo especifico.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cropTypes.map((crop) => {
            const Icon = crop.icon
            const isSelected = selectedCrop === crop.id
            return (
              <Card
                key={crop.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? "border-2 border-cyan-500 bg-cyan-500/5" : "hover:border-primary/50"
                }`}
                onClick={() => handleSelectCrop(crop.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`mx-auto rounded-full p-3 w-fit mb-3 ${isSelected ? "bg-cyan-500/20" : "bg-muted"}`}>
                    <Icon className={`h-6 w-6 ${isSelected ? "text-cyan-500" : "text-muted-foreground"}`} />
                  </div>
                  <p className={`font-medium ${isSelected ? "text-cyan-500" : ""}`}>{crop.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{crop.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {selectedCropData && (
        <Card className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-cyan-500/20 p-4">
                <Leaf className="h-8 w-8 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Cultivo activo: {selectedCropData.name}</h3>
                <p className="text-muted-foreground">{selectedCropData.description}</p>
                <p className="text-sm text-cyan-600 mt-1">Los parametros del sistema estan optimizados para este cultivo.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderSensorsContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sensors.map((sensor) => {
        const Icon = sensor.icon
        const value = sensorData[sensor.id] ?? 0
        const status = getSensorStatus(sensor.id, value)

        return (
          <Card
            key={sensor.id}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50"
            onClick={() => setSelectedSensor(sensor.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className={`rounded-full p-3 ${sensor.bgColor}`}>
                <Icon className={`h-5 w-5 ${sensor.color}`} />
              </div>
              <Badge
                variant={status.variant}
                className={
                  status.variant === "default"
                    ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                    : status.variant === "destructive"
                      ? "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"
                      : ""
                }
              >
                {status.label}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-muted-foreground mb-1">{sensor.name}</p>
              <div className="text-3xl font-bold">
                {value.toFixed(
                  sensor.id === "ph" || sensor.id === "water-temp" || sensor.id === "ambient-temp" ? 1 : 0,
                )}
                <span className="text-lg ml-1 text-muted-foreground">{sensor.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Actualizado: {lastUpdated.toLocaleTimeString("es-ES")}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const renderAnalysisContent = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: "1d", label: "1 Dia" },
          { id: "7d", label: "7 Dias" },
          { id: "14d", label: "14 Dias" },
          { id: "30d", label: "1 Mes" },
        ].map((range) => (
          <Button
            key={range.id}
            variant={analysisTimeRange === range.id ? "default" : "outline"}
            onClick={() => setAnalysisTimeRange(range.id)}
            className={analysisTimeRange === range.id ? "bg-cyan-500 hover:bg-cyan-600" : ""}
          >
            {range.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sensors.map((sensor) => {
          const Icon = sensor.icon
          const currentValue = sensorData[sensor.id] ?? 0
          
          const generateHistoricalData = () => {
            const points = analysisTimeRange === "1d" ? 24 : analysisTimeRange === "7d" ? 7 : analysisTimeRange === "14d" ? 14 : 30
            return Array.from({ length: points }, () => currentValue + (Math.random() - 0.5) * 20)
          }
          
          const historicalData = generateHistoricalData()
          const minVal = Math.min(...historicalData)
          const maxVal = Math.max(...historicalData)
          const avgVal = historicalData.reduce((a, b) => a + b, 0) / historicalData.length

          return (
            <Card key={sensor.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${sensor.bgColor}`}>
                    <Icon className={`h-4 w-4 ${sensor.color}`} />
                  </div>
                  <CardTitle className="text-base">{sensor.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-24 flex items-end gap-1 mb-4">
                  {historicalData.map((val, i) => {
                    const range = maxVal - minVal || 1
                    const height = ((val - minVal) / range) * 100
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${sensor.bgColor} transition-all`}
                        style={{ height: `${Math.max(height, 10)}%` }}
                      />
                    )
                  })}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="text-muted-foreground">Min</p>
                    <p className="font-bold">{minVal.toFixed(1)}{sensor.unit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Promedio</p>
                    <p className="font-bold">{avgVal.toFixed(1)}{sensor.unit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Max</p>
                    <p className="font-bold">{maxVal.toFixed(1)}{sensor.unit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderControlContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-500" />
            Manual de Uso
          </CardTitle>
          <CardDescription>Guias y tutoriales para el sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {manualSections.map((section) => (
            <div key={section.title} className="border rounded-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedManual(expandedManual === section.title ? null : section.title)}
              >
                <span className="font-medium">{section.title}</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${expandedManual === section.title ? "rotate-90" : ""}`} />
              </button>
              {expandedManual === section.title && (
                <div className="px-4 py-3 bg-muted/30 border-t whitespace-pre-line text-sm text-muted-foreground">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-emerald-500" />
            Tips de Compras Anteriores
          </CardTitle>
          <CardDescription>Consejos basados en tus compras</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {purchaseHistory.map((purchase, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{purchase.item}</span>
                </div>
                <span className="text-xs text-muted-foreground">{purchase.date}</span>
              </div>
              <div className="flex items-start gap-2 text-sm bg-yellow-500/10 p-2 rounded">
                <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                <p className="text-yellow-800">{purchase.tip}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderChatContent = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-cyan-500" />
          Centro de Ayuda
        </CardTitle>
        <CardDescription>Selecciona tu consulta para asistirte</CardDescription>
      </CardHeader>
      <CardContent>
        {chatStep === "menu" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {chatOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  className="p-4 border rounded-lg flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
                  onClick={() => {
                    setChatOption(option.id)
                    setChatStep(option.id === "question" ? "faq" : "form")
                  }}
                >
                  <Icon className={`h-5 w-5 ${option.color}`} />
                  <span className="font-medium">{option.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {chatStep === "faq" && (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setChatStep("menu")}>
              Volver
            </Button>
            <p className="font-medium mb-3">Preguntas frecuentes:</p>
            <div className="space-y-3">
              {faqQuestions.map((faq, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <p className="font-medium text-cyan-600 mb-2">{faq.q}</p>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button onClick={() => setChatStep("form")} className="w-full">
                No encuentro mi pregunta
              </Button>
            </div>
          </div>
        )}

        {chatStep === "form" && (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setChatStep("menu")}>
              Volver
            </Button>
            <div className="space-y-4">
              <div>
                <Label htmlFor="chat-type">Tipo de consulta</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {chatOption === "suggestion" && "Sugerencia"}
                  {chatOption === "failure" && "Reporte de Falla"}
                  {chatOption === "purchase" && "Compras"}
                  {chatOption === "question" && "Pregunta"}
                </p>
              </div>
              <div>
                <Label htmlFor="chat-message">Tu mensaje</Label>
                <Textarea
                  id="chat-message"
                  placeholder="Escribe tu mensaje aqui..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600" onClick={() => {
                setChatMessage("")
                setChatStep("menu")
                setChatOption(null)
              }}>
                <Send className="h-4 w-4 mr-2" />
                Enviar mensaje
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/images/hydrocore-logo.png" 
              alt="HydroCore Logo" 
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-2xl font-bold">
              <span className="text-gray-900">HYDRO</span>
              <span className="text-cyan-500">CORE</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
              Sistema Activo
            </Badge>
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b flex items-center justify-between">
                    <h3 className="font-semibold">Notificaciones</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-center text-muted-foreground">Sin notificaciones</p>
                    ) : (
                      notifications.map((notif, index) => (
                        <div key={index} className="p-3 border-b last:border-0 hover:bg-muted/50">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <div>
                              <p className="text-sm">{notif.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  className={`flex items-center gap-2 rounded-none border-b-2 ${
                    activeTab === tab.id
                      ? "border-cyan-500 text-cyan-600 bg-cyan-500/5"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "panel" && renderPanelContent()}
        {activeTab === "sensores" && renderSensorsContent()}
        {activeTab === "analisis" && renderAnalysisContent()}
        {activeTab === "control" && renderControlContent()}
        {activeTab === "chat" && renderChatContent()}
      </main>

      {selectedSensor && selectedSensorData && (
        <SensorModal
          sensor={selectedSensorData}
          value={sensorData[selectedSensor] ?? 0}
          onClose={() => setSelectedSensor(null)}
        />
      )}
    </div>
  )
}
