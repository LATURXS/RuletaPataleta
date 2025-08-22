import type React from "react"

interface BenchProps {
  children: React.ReactNode
  isSpinning?: boolean
}

export function Bench({ children, isSpinning }: BenchProps) {
  return (
    <div className="relative">
      {/* Banquillo de madera */}
      <div className="bg-brown-600 rounded-lg shadow-lg p-4 min-h-[200px] flex items-center justify-center">
        <div className="flex flex-wrap gap-4 justify-center">{children}</div>
      </div>

      {/* Decoraciones del banquillo */}
      <div className="absolute -top-2 left-4 text-2xl">🪑</div>
      <div className="absolute -top-2 right-4 text-2xl">🪑</div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">Banquillo</div>
    </div>
  )
}
