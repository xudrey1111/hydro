"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function QuotationForm() {
  const [cultivo, setCultivo] = useState("")
  const [tamano, setTamano] = useState("")
  const [delegacion, setDelegacion] = useState("")
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleCotizar = () => {
    if (!cultivo || !tamano || !delegacion) {
      toast({
        title: "Campos incompletos",
        description: "Por favor selecciona todas las opciones",
        variant: "destructive"
      })
      return
    }
    
    toast({
      title: "Cotizacion enviada!",
      description: `Cultivo: ${cultivo}, Tamano: ${tamano}, Delegacion: ${delegacion}`,
    })
    setOpen(false)
    setCultivo("")
    setTamano("")
    setDelegacion("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-14 text-lg font-semibold border-2 hover:bg-primary hover:text-white transition-colors"
          style={{ borderColor: "#1a6b3c", color: "#1a6b3c" }}
        >
          Cotizar Sistema
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: "#f0f4f2" }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center" style={{ color: "#1e2d3d" }}>
            Cotizar Sistema
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: "#1e2d3d" }}>
              Tipo de Cultivo
            </label>
            <Select value={cultivo} onValueChange={setCultivo}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecciona Tipo de Cultivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lechuga">Lechuga</SelectItem>
                <SelectItem value="tomate">Tomate</SelectItem>
                <SelectItem value="fresa">Fresa</SelectItem>
                <SelectItem value="hierbas">Hierbas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: "#1e2d3d" }}>
              Tamano del Sistema
            </label>
            <Select value={tamano} onValueChange={setTamano}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecciona Tamano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chico">Chico</SelectItem>
                <SelectItem value="mediano">Mediano</SelectItem>
                <SelectItem value="grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: "#1e2d3d" }}>
              Delegacion
            </label>
            <Select value={delegacion} onValueChange={setDelegacion}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecciona Delegacion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cuauhtemoc">Cuauhtemoc</SelectItem>
                <SelectItem value="benito-juarez">Benito Juarez</SelectItem>
                <SelectItem value="coyoacan">Coyoacan</SelectItem>
                <SelectItem value="miguel-hidalgo">Miguel Hidalgo</SelectItem>
                <SelectItem value="tlalpan">Tlalpan</SelectItem>
                <SelectItem value="azcapotzalco">Azcapotzalco</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            onClick={handleCotizar}
            className="w-full h-12 text-lg font-semibold text-white mt-4"
            style={{ backgroundColor: "#1a6b3c" }}
          >
            Cotizar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
