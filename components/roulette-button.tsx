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
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSpinning ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          REDISTRIBUYENDO...
        </>
      ) : (
        <>🎯 REDISTRIBUIR JUGADORAS</>
      )}
    </Button>
  )
}
