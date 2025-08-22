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
      className={`min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center transition-all duration-1000 ${isAnimating ? "scale-110 opacity-0" : "scale-100 opacity-100"}`}
    >
      <div className="text-center space-y-8 p-8 max-w-2xl">
        {/* Logo/Título principal */}
        <div className="space-y-4">
          <div className="text-8xl animate-bounce">🎯</div>
          <h1 className="text-6xl font-extrabold text-white drop-shadow-2xl animate-pulse">LA RULETA</h1>
          <h2 className="text-5xl font-bold text-yellow-300 drop-shadow-xl animate-bounce">PATALETA</h2>
        </div>

        {/* Subtítulo */}
        <div className="space-y-2">
          <p className="text-2xl text-white font-semibold drop-shadow-lg">
            🏐 El juego más divertido del volleyball 🏐
          </p>
          <p className="text-lg text-pink-100 drop-shadow">¿Quién jugará y quién se quedará en el banquillo?</p>
        </div>

        {/* Decoraciones */}
        <div className="flex justify-center space-x-8 text-4xl">
          <span className="animate-spin">⚡</span>
          <span className="animate-bounce">🏆</span>
          <span className="animate-pulse">🎉</span>
          <span className="animate-spin">⭐</span>
        </div>

        {/* Botón de inicio */}
        <div className="pt-8">
          <Button
            onClick={handleStart}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-extrabold text-2xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
          >
            <span className="mr-3 text-3xl">🚀</span>
            ¡JUAGAR!
            <span className="ml-3 text-3xl">🚀</span>
          </Button>
        </div>

        {/* Instrucciones */}
        <div className="text-sm text-pink-100 opacity-80 max-w-md mx-auto">
          <p>Sube las fotos de tus jugadoras y deja que la ruleta decida quién juega y quién descansa</p>
        </div>
      </div>

      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {["🏐", "⚡", "🎯", "🏆", "⭐"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
    </div>
  )
}
