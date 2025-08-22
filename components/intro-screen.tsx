"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface IntroScreenProps {
  onComplete: () => void
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleStart = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center transition-all duration-1000 ${isAnimating ? "scale-110 opacity-0" : "scale-100 opacity-100"}`}
    >
      <div className="text-center space-y-8 p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
        {/* Logo/Título */}
        <div className="space-y-4">
          <div className="text-8xl animate-bounce">🏐</div>
          <h1 className="text-6xl font-bold text-white drop-shadow-lg">LA RULETA</h1>
          <h2 className="text-4xl font-bold text-yellow-300 drop-shadow-lg">PATALETA</h2>
        </div>

        {/* Descripción */}
        <div className="space-y-3 text-white/90">
          <p className="text-xl font-medium">🎯 El juego que decide quién juega y quién se queda en el banquillo</p>
          <p className="text-lg">Sube las fotos de tus jugadoras y deja que la suerte decida</p>
        </div>

        {/* Botón de inicio */}
        <Button
          onClick={handleStart}
          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold px-12 py-4 rounded-full text-2xl shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse"
        >
          🚀 JUAGAR
        </Button>

        {/* Instrucciones */}
        <div className="text-sm text-white/70 space-y-1">
          <p>• Sube fotos de tus jugadoras</p>
          <p>• La ruleta decidirá quién está sana y quién está "tulli"</p>
          <p>• ¡Que la suerte esté de tu lado! 🍀</p>
        </div>
      </div>
    </div>
  )
}
