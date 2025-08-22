"use client"

import { useTranslation } from "@/contexts/language-context"

interface RouletteButtonProps {
  onClick: () => void
  disabled: boolean
  isSpinning: boolean
}

export function RouletteButton({ onClick, disabled, isSpinning }: RouletteButtonProps) {
  const { t } = useTranslation()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-32 h-32 rounded-full shadow-2xl transition-all duration-300 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-110 active:scale-95"
      }`}
    >
      {/* Borde exterior */}
      <div className="absolute inset-0 rounded-full border-4 border-white shadow-inner"></div>

      {/* Sectores de la ruleta */}
      <div className="absolute inset-2 rounded-full overflow-hidden">
        {/* Sector 1 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-500"
          style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)" }}
        ></div>
        {/* Sector 2 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500"
          style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
        ></div>
        {/* Sector 3 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500"
          style={{ clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)" }}
        ></div>
        {/* Sector 4 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500"
          style={{ clipPath: "polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)" }}
        ></div>
      </div>

      {/* Centro de la ruleta */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-300">
          {isSpinning ? (
            <div className="animate-spin text-2xl">🌪️</div>
          ) : (
            <span className="text-2xl font-bold text-purple-600">🎯</span>
          )}
        </div>
      </div>

      {/* Texto */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-sm font-bold text-gray-700">
          {isSpinning ? t("roulette.spinning") : t("roulette.redistribute")}
        </span>
      </div>
    </button>
  )
}
