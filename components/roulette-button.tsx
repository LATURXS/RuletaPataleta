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
        relative px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl
        transition-all duration-300 transform hover:scale-105
        ${
          disabled || isSpinning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        }
      `}
    >
      {isSpinning ? (
        <span className="flex items-center gap-3">
          <div className="animate-spin text-3xl">🌪️</div>
          Redistribuyendo...
        </span>
      ) : (
        <span className="flex items-center gap-3">
          <span className="text-3xl">🎲</span>
          REDISTRIBUIR JUGADORAS
        </span>
      )}
    </Button>
  )
}
