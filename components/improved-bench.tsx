"use client"

import type { ReactNode } from "react"

interface ImprovedBenchProps {
  children: ReactNode
  isSpinning?: boolean
}

export function ImprovedBench({ children, isSpinning = false }: ImprovedBenchProps) {
  return (
    <div className="relative">
      {/* Contenedor del banquillo */}
      <div
        className={`relative bg-gradient-to-b from-green-200 to-green-300 rounded-lg shadow-2xl transition-all duration-500 ${
          isSpinning ? "animate-pulse" : ""
        }`}
        style={{ width: "500px", height: "400px" }}
      >
        {/* Banco superior */}
        <div className="absolute left-8 right-8 top-24 h-3 bg-amber-700 rounded-lg shadow-md">
          {/* Patas del banco superior */}
          <div className="absolute left-8 -bottom-4 w-1 h-6 bg-amber-800"></div>
          <div className="absolute left-1/4 -bottom-4 w-1 h-6 bg-amber-800"></div>
          <div className="absolute left-1/2 -bottom-4 w-1 h-6 bg-amber-800 transform -translate-x-1/2"></div>
          <div className="absolute right-1/4 -bottom-4 w-1 h-6 bg-amber-800"></div>
          <div className="absolute right-8 -bottom-4 w-1 h-6 bg-amber-800"></div>
        </div>

        {/* Banco inferior */}
        <div className="absolute left-8 right-8 top-64 h-3 bg-amber-700 rounded-lg shadow-md">
          {/* Patas del banco inferior */}
          <div className="absolute left-8 -bottom-4 w-1 h-6 bg-amber-800"></div>
          <div className="absolute left-1/4 -bottom-4 w-1 h-6 bg-amber-800"></div>
          <div className="absolute left-1/2 -bottom-4 w-1 h-6 bg-amber-800 transform -translate-x-1/2"></div>
          <div className="absolute right-1/4 -bottom-4 w-1 h-6 bg-amber-800"></div>
          <div className="absolute right-8 -bottom-4 w-1 h-6 bg-amber-800"></div>
        </div>

        {/* Decoraciones del banquillo */}
        <div className="absolute top-4 left-4 text-2xl">🌸</div>
        <div className="absolute top-4 right-4 text-2xl">🌺</div>
        <div className="absolute bottom-4 left-4 text-2xl">🌿</div>
        <div className="absolute bottom-4 right-4 text-2xl">🍀</div>
        <div className="absolute top-1/2 left-2 text-xl transform -translate-y-1/2">🌱</div>
        <div className="absolute top-1/2 right-2 text-xl transform -translate-y-1/2">🌻</div>

        {/* Jugadoras */}
        {children}
      </div>
    </div>
  )
}
