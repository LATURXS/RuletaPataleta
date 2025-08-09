"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-500 to-green-600 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decoraciones de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🏐</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">⚡</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-spin">🎯</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-bounce">💧</div>
        <div className="absolute top-1/2 left-10 text-4xl animate-pulse">🏥</div>
        <div className="absolute top-1/3 right-10 text-5xl animate-bounce">🌪️</div>
      </div>

      {/* Contenido principal */}
      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-pulse">🎯 LA RULETA</h1>
        <h2 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-12 animate-bounce">PATALETA</h2>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">📋 INSTRUCCIONES</h3>
          <div className="text-white text-lg space-y-3 text-left">
            <p>
              🏐 <strong>6 jugadoras sanas</strong> van al campo
            </p>
            <p>
              🏥 <strong>6 jugadoras tullis</strong> van al banquillo
            </p>
            <p>
              📸 <strong>Sube fotos</strong> de tus jugadoras
            </p>
            <p>
              🎲 <strong>Redistribuye</strong> cuando quieras
            </p>
            <p>
              🎯 <strong>¡Que gane la mejor!</strong>
            </p>
          </div>
        </div>

        {showButton && (
          <Button
            onClick={onComplete}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-2xl px-12 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            🎮 JUAGAR
          </Button>
        )}
      </div>
    </div>
  )
}
