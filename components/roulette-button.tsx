"use client"

interface RouletteButtonProps {
  onClick: () => void
  disabled: boolean
  isSpinning: boolean
}

export function RouletteButton({ onClick, disabled, isSpinning }: RouletteButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 text-xl font-bold rounded-2xl shadow-2xl transition-all duration-300 transform ${
        disabled
          ? "bg-gray-400 cursor-not-allowed opacity-50"
          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 active:scale-95"
      }`}
    >
      {isSpinning ? (
        <span className="flex items-center gap-3">
          <div className="animate-spin text-2xl">🌪️</div>
          Redistribuyendo...
        </span>
      ) : (
        <span className="flex items-center gap-3">
          <span className="text-2xl">🎲</span>
          REDISTRIBUIR JUGADORAS
        </span>
      )}
    </button>
  )
}
