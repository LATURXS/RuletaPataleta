"use client"

import type { ReactNode } from "react"

interface ImprovedBenchProps {
  children: ReactNode
  isSpinning?: boolean
}

export function ImprovedBench({ children, isSpinning = false }: ImprovedBenchProps) {
  return (
    <div className="relative">
      {/* Decoraciones con plantas y flores POR ENCIMA del marco */}
      <div className="absolute -top-8 left-8 text-3xl animate-bounce z-20" style={{ animationDelay: "0s" }}>
        🌸
      </div>
      <div className="absolute -top-8 right-8 text-3xl animate-bounce z-20" style={{ animationDelay: "0.5s" }}>
        🌺
      </div>
      <div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce z-20"
        style={{ animationDelay: "1s" }}
      >
        🌻
      </div>
      <div className="absolute -top-6 left-20 text-2xl animate-bounce z-20" style={{ animationDelay: "1.5s" }}>
        🌿
      </div>
      <div className="absolute -top-6 right-20 text-2xl animate-bounce z-20" style={{ animationDelay: "2s" }}>
        🌷
      </div>
      <div className="absolute -top-6 left-32 text-xl animate-bounce z-20" style={{ animationDelay: "2.5s" }}>
        🌱
      </div>

      {/* Marco del banquillo - AJUSTADO para 2 bancos */}
      <div
        className={`relative bg-gradient-to-br from-red-100 to-red-200 border-4 border-red-400 rounded-2xl shadow-xl transition-all duration-500 ${
          isSpinning ? "animate-pulse" : ""
        }`}
        style={{
          width: "500px", // Más ancho para 3 jugadoras por banco
          height: "400px", // Más bajo ya que solo hay 2 bancos
          padding: "25px",
        }}
      >
        {/* Fondo del banquillo */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-red-100/50 rounded-2xl"></div>

        {/* Solo 2 bancos - AJUSTADOS a la mitad del cuerpo */}
        <div className="absolute inset-6">
          {/* Banco superior - A la mitad del cuerpo de la primera fila */}
          <div className="absolute top-24 left-6 right-6 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg shadow-lg border-2 border-amber-700">
            {/* Patas del banco */}
            <div className="absolute -bottom-2 left-8 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute -bottom-2 right-8 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute -bottom-2 left-1/4 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute -bottom-2 right-1/4 w-2 h-4 bg-amber-800 rounded-b"></div>
            {/* Superficie del banco */}
            <div className="absolute inset-1 bg-amber-500 rounded opacity-50"></div>
          </div>

          {/* Banco inferior - A la mitad del cuerpo de la segunda fila */}
          <div className="absolute top-64 left-6 right-6 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg shadow-lg border-2 border-amber-700">
            <div className="absolute -bottom-2 left-8 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute -bottom-2 right-8 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute -bottom-2 left-1/4 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute -bottom-2 right-1/4 w-2 h-4 bg-amber-800 rounded-b"></div>
            <div className="absolute inset-1 bg-amber-500 rounded opacity-50"></div>
          </div>
        </div>

        {/* Contenedor de jugadoras (por encima de los bancos) */}
        <div className="relative z-10 h-full">{children}</div>

        {/* Decoración de regadera y plantas en el suelo */}
        <div className="absolute bottom-3 right-3 text-2xl animate-pulse">🪴</div>
        <div className="absolute bottom-3 left-3 text-xl">💧</div>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-lg">🌿</div>
      </div>
    </div>
  )
}
