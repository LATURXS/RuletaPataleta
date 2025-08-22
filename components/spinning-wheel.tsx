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
      const finalRotation = 360 * 5 + Math.random() * 360 // 5 vueltas + random
      setRotation(finalRotation)

      const timer = setTimeout(() => {
        onSpinComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isSpinning, onSpinComplete])

  const size = isSmall ? "w-12 h-12" : "w-32 h-32"
  const textSize = isSmall ? "text-xs" : "text-lg"

  return (
    <div
      className={`${size} relative ${isSmall ? "cursor-pointer hover:scale-110" : ""} transition-transform`}
      onClick={onClick}
    >
      {/* Ruleta */}
      <div
        className={`${size} rounded-full border-4 border-yellow-400 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 flex items-center justify-center shadow-lg`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
        }}
      >
        {/* Sectores de la ruleta */}
        <div className="absolute inset-1 rounded-full overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${i * 45}deg)`,
                background: `conic-gradient(from ${i * 45}deg, ${
                  ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"][i]
                } 0deg, transparent 45deg)`,
              }}
            />
          ))}
        </div>

        {/* Centro */}
        <div
          className={`${isSmall ? "w-6 h-6" : "w-12 h-12"} bg-white rounded-full flex items-center justify-center z-10 shadow-inner`}
        >
          <span className={`${textSize} font-bold text-gray-800`}>{isSmall ? "🎯" : "🏐"}</span>
        </div>
      </div>

      {/* Flecha indicadora */}
      <div className={`absolute ${isSmall ? "-top-1 left-1/2 -translate-x-1/2" : "-top-2 left-1/2 -translate-x-1/2"}`}>
        <div
          className={`${isSmall ? "w-2 h-3" : "w-4 h-6"} bg-red-600 clip-path-triangle shadow-lg`}
          style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }}
        />
      </div>
    </div>
  )
}
