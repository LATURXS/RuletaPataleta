"use client"

import { useState, useEffect, useRef } from "react"

interface SpinningWheelProps {
  isSpinning: boolean
  onSpinComplete: () => void
  isSmall?: boolean
  onClick?: () => void
}

export function SpinningWheel({ isSpinning, onSpinComplete, isSmall = false, onClick }: SpinningWheelProps) {
  const [rotation, setRotation] = useState(0)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (isSpinning && !hasCompletedRef.current) {
      hasCompletedRef.current = true
      const finalRotation = rotation + 1080 + Math.random() * 720 // 3-5 vueltas
      setRotation(finalRotation)

      const timer = setTimeout(() => {
        onSpinComplete()
        hasCompletedRef.current = false
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isSpinning]) // Solo depende de isSpinning

  const size = isSmall ? "w-16 h-16" : "w-32 h-32"
  const textSize = isSmall ? "text-2xl" : "text-4xl"

  return (
    <div
      className={`${size} ${onClick ? "cursor-pointer hover:scale-110" : ""} transition-all duration-300`}
      onClick={onClick}
    >
      <div
        className={`${size} rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg flex items-center justify-center border-4 border-white`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
        }}
      >
        <span className={`${textSize} animate-pulse`}>🎯</span>
      </div>
    </div>
  )
}
