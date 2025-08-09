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

  const size = isSmall ? 60 : 200
  const segments = [
    { color: "#ef4444", emoji: "🏐" },
    { color: "#f97316", emoji: "⚡" },
    { color: "#eab308", emoji: "🎯" },
    { color: "#22c55e", emoji: "💧" },
    { color: "#3b82f6", emoji: "🏥" },
    { color: "#8b5cf6", emoji: "🌪️" },
    { color: "#ec4899", emoji: "🎲" },
    { color: "#06b6d4", emoji: "🔥" },
  ]

  return (
    <div
      className={`relative ${isSmall ? "cursor-pointer" : ""}`}
      onClick={isSmall ? onClick : undefined}
      style={{ width: size, height: size }}
    >
      {/* Ruleta */}
      <div
        className="relative w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "transform 3s cubic-bezier(0.23, 1, 0.32, 1)" : "none",
        }}
      >
        {segments.map((segment, index) => (
          <div
            key={index}
            className="absolute w-full h-full flex items-center justify-center"
            style={{
              background: `conic-gradient(from ${index * 45}deg, ${segment.color} 0deg, ${segment.color} 45deg, transparent 45deg)`,
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((index * 45 * Math.PI) / 180)}% ${
                50 + 50 * Math.sin((index * 45 * Math.PI) / 180)
              }%)`,
            }}
          >
            <span className={`${isSmall ? "text-lg" : "text-4xl"} absolute`} style={{ top: "20%" }}>
              {segment.emoji}
            </span>
          </div>
        ))}
      </div>

      {/* Puntero */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ width: 0, height: 0 }}
      >
        <div
          className="border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"
          style={{
            borderBottomWidth: isSmall ? "8px" : "20px",
            borderLeftWidth: isSmall ? "4px" : "10px",
            borderRightWidth: isSmall ? "4px" : "10px",
          }}
        />
      </div>

      {/* Centro */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center ${
          isSmall ? "w-4 h-4" : "w-12 h-12"
        }`}
      >
        <span className={isSmall ? "text-xs" : "text-xl"}>🎯</span>
      </div>
    </div>
  )
}
