"use client"

import { Button } from "@/components/ui/button"

interface RouletteButtonProps {
  onClick: () => void
  disabled?: boolean
  isSpinning?: boolean
}

export function RouletteButton({ onClick, disabled = false, isSpinning = false }: RouletteButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        bg-gradient-to-r from-purple-600 to-pink-600 
        hover:from-purple-700 hover:to-pink-700
        text-white font-bold text-xl px-12 py-6 
        rounded-full shadow-2xl
        transform transition-all duration-300
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-3xl"}
        ${isSpinning ? "animate-pulse" : ""}
      `}
    >
      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Contenido del botón */}
      <div className="relative flex items-center gap-3">
        <span className="text-3xl animate-spin">🎯</span>
        <span className="font-extrabold tracking-wide">{isSpinning ? "GIRANDO..." : "¡NUEVA PATALETA!"}</span>
        <span className="text-3xl animate-bounce">🏐</span>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-ping animation-delay-300" />
    </Button>
  )
}
