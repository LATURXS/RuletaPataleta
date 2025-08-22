"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface RouletteButtonProps {
  onClick: () => void
  disabled?: boolean
  isSpinning?: boolean
}

export function RouletteButton({ onClick, disabled, isSpinning }: RouletteButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
        text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl
        transform transition-all duration-300 hover:scale-110 hover:shadow-3xl
        ${isSpinning ? "animate-pulse" : "animate-bounce"}
        border-4 border-yellow-400
      `}
    >
      <RotateCcw className={`h-6 w-6 mr-3 ${isSpinning ? "animate-spin" : ""}`} />
      {isSpinning ? "¡Girando!" : "🎲 ¡REDISTRIBUIR!"}
    </Button>
  )
}
