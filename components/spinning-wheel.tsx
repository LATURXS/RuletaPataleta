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
      const finalRotation = rotation + 1800 + Math.random() * 1800 // 5-10 vueltas
      setRotation(finalRotation)

      const timer = setTimeout(() => {
        onSpinComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isSpinning, onSpinComplete, rotation])

  const size = isSmall ? "w-16 h-16" : "w-64 h-64"
  const textSize = isSmall ? "text-xs" : "text-lg"

  return (
    <div
      className={`${size} relative ${isSmall ? "cursor-pointer hover:scale-110" : ""} transition-transform`}
      onClick={onClick}
    >
      {/* Ruleta */}
      <div
        className={`${size} rounded-full border-8 border-yellow-400 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 shadow-2xl relative overflow-hidden`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
        }}
      >
        {/* Sectores de la ruleta */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{
              transform: `rotate(${i * 45}deg)`,
              clipPath: "polygon(50% 50%, 50% 0%, 85.35% 14.65%)",
            }}
          >
            <div className={`w-full h-full ${i % 2 === 0 ? "bg-red-500" : "bg-yellow-400"} opacity-80`} />
          </div>
        ))}

        {/* Centro de la ruleta */}
        <div className={`absolute inset-0 flex items-center justify-center`}>
          <div
            className={`${isSmall ? "w-8 h-8" : "w-20 h-20"} bg-white rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-lg`}
          >
            <span className={`${textSize} font-bold text-gray-800`}>{isSmall ? "🎯" : "🏐"}</span>
          </div>
        </div>
      </div>

      {/* Flecha indicadora */}
      <div
        className={`absolute ${isSmall ? "top-0 -translate-y-1" : "top-0 -translate-y-2"} left-1/2 -translate-x-1/2`}
      >
        <div
          className={`${isSmall ? "w-0 h-0 border-l-2 border-r-2 border-b-4" : "w-0 h-0 border-l-4 border-r-4 border-b-8"} border-l-transparent border-r-transparent border-b-red-600`}
        />
      </div>

      {/* Texto para ruleta pequeña */}
      {isSmall && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600 whitespace-nowrap">
          Clic para girar
        </div>
      )}
    </div>
  )
}
