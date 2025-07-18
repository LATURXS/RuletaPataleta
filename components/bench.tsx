import type { ReactNode } from "react"

interface BenchProps {
  children: ReactNode
  isSpinning?: boolean
}

export function Bench({ children, isSpinning = false }: BenchProps) {
  return (
    <div
      className={`relative w-[250px] h-[450px] bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg border-4 border-gray-400 shadow-inner overflow-hidden ${isSpinning ? "animate-pulse" : ""}`}
    >
      {/* Bancos */}
      <div className="absolute top-16 left-4 right-4 h-8 bg-brown-600 rounded shadow-md"></div>
      <div className="absolute top-32 left-4 right-4 h-8 bg-brown-600 rounded shadow-md"></div>
      <div className="absolute top-48 left-4 right-4 h-8 bg-brown-600 rounded shadow-md"></div>

      {children}

      <div className="absolute bottom-4 right-4 text-2xl">🏥</div>
    </div>
  )
}
