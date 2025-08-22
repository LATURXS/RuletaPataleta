"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface IntroScreenProps {
  onComplete: () => void
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            {["🏐", "⭐", "🎯", "🎲", "✨"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="text-center z-10 px-8">
        <div className="animate-bounce-in">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-4 drop-shadow-2xl">
            LA RULETA
          </h1>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-8 drop-shadow-2xl">
            PATALETA
          </h2>
        </div>

        <div className="text-2xl md:text-3xl text-white font-bold mb-8 animate-pulse">
          🏐 Juego de Volleyball Interactivo 🏐
        </div>

        <div className="text-lg md:text-xl text-pink-200 mb-12 max-w-2xl mx-auto">
          ¡Descubre quién juega y quién se queda en el banquillo!
          <br />
          Sube las fotos de tus jugadoras y deja que la ruleta decida su destino
        </div>

        {showButton && (
          <div className="animate-bounce-in">
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-2xl px-12 py-6 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 border-4 border-yellow-400"
            >
              <Play className="h-8 w-8 mr-4" />
              ¡JUAGAR!
            </Button>
          </div>
        )}
      </div>

      {/* Efectos adicionales */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70">
        Presiona el botón para comenzar la diversión
      </div>
    </div>
  )
}
