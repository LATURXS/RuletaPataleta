"use client"

import { useEffect, useState } from "react"

interface SpinningWheelProps {
  isSpinning: boolean
  onSpinComplete: () => void
  isSmall?: boolean
  onClick?: () => void
}

export function SpinningWheel({ isSpinning, onSpinComplete, isSmall = false, onClick }: SpinningWheelProps) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (isSpinning) {
      const finalRotation = rotation + 1800 + Math.random() * 720 // 5-7 vueltas
      setRotation(finalRotation)

      const timer = setTimeout(() => {
        onSpinComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isSpinning, onSpinComplete, rotation])

  const size = isSmall ? "w-12 h-12" : "w-64 h-64"
  const textSize = isSmall ? "text-xs" : "text-lg"

  return (
    <div
      className={`${size} relative ${isSmall && onClick ? "cursor-pointer hover:scale-110" : ""} transition-transform`}
      onClick={onClick}
    >
      {/* Ruleta */}
      <div
        className={`${size} rounded-full border-8 border-yellow-400 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 shadow-2xl flex items-center justify-center transition-transform duration-3000 ease-out`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Sectores de la ruleta */}
        <div className="absolute inset-2 rounded-full overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${i * 45}deg)`,
                clipPath: "polygon(50% 50%, 50% 0%, 85.35% 14.65%)",
              }}
            >
              <div className={`w-full h-full ${i % 2 === 0 ? "bg-pink-400" : "bg-purple-400"} opacity-80`} />
            </div>
          ))}
        </div>

        {/* Centro de la ruleta */}
        <div
          className={`${isSmall ? "w-6 h-6" : "w-16 h-16"} bg-white rounded-full border-4 border-yellow-400 flex items-center justify-center z-10`}
        >
          <span className={`${textSize} font-bold text-purple-600`}>{isSmall ? "🎯" : "🎲"}</span>
        </div>
      </div>

      {/* Flecha indicadora */}
      <div
        className={`absolute ${isSmall ? "top-0 -translate-y-1" : "top-0 -translate-y-2"} left-1/2 transform -translate-x-1/2 z-20`}
      >
        <div
          className={`${isSmall ? "w-0 h-0 border-l-2 border-r-2 border-b-4" : "w-0 h-0 border-l-4 border-r-4 border-b-8"} border-l-transparent border-r-transparent border-b-red-600`}
        />
      </div>

      {!isSmall && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white font-bold text-xl drop-shadow-lg">
            {isSpinning ? "¡Girando!" : "¡Ruleta Pataleta!"}
          </p>
        </div>
      )}
    </div>
  )
}
