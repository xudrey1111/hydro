"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hola! En que puedo ayudarte hoy?", sender: "bot" }
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user"
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput("")
    
    // Simulated bot response
    setTimeout(() => {
      const botResponses = [
        "Gracias por tu mensaje. Estoy aqui para ayudarte con tu sistema hidroponico.",
        "Puedo ayudarte con informacion sobre sensores, riego y mantenimiento.",
        "Si tienes dudas sobre los valores de tus sensores, no dudes en preguntar.",
        "El sistema esta funcionando correctamente. Hay algo mas en lo que pueda ayudarte?"
      ]
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot"
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="w-full max-w-sm rounded-2xl bg-card shadow-lg overflow-hidden border border-border flex flex-col h-[350px]">
      {/* Header */}
      <div 
        className="px-4 py-3 text-center shrink-0"
        style={{ backgroundColor: "#1a6b3c" }}
      >
        <h3 className="text-lg font-bold text-white">Chatbot</h3>
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" style={{ backgroundColor: "#f0f4f2" }}>
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-white text-foreground border border-border"
                }`}
              >
                {msg.sender === "user" && <span className="font-bold">Tu: </span>}
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Input Area */}
      <div className="p-3 border-t border-border flex gap-2 shrink-0 bg-card">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe un mensaje..."
          className="flex-1"
        />
        <Button 
          onClick={sendMessage}
          size="icon"
          style={{ backgroundColor: "#1a6b3c" }}
          className="hover:opacity-90"
        >
          <Send className="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  )
}
