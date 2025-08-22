"use client"

import type { ReactNode } from "react"

interface FieldComponentProps {
  children: ReactNode
  isSpinning?: boolean
}

export function FieldComponent({ children, isSpinning = false }: FieldComponentProps) {
  return (
    <div className={`relative field-container ${isSpinning ? "animate-pulse" : ""}`}>
      {/* Campo de volleyball realista */}
      <div className="relative w-[450px] h-[360px] bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg shadow-2xl border-4 border-white overflow-hidden">
        {/* Líneas del campo */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 360">
          {/* Línea central (red) */}
          <line x1="225" y1="0" x2="225" y2="360" stroke="white" strokeWidth="4" />

          {/* Líneas laterales */}
          <line x1="0" y1="0" x2="450" y2="0" stroke="white" strokeWidth="3" />
          <line x1="0" y1="360" x2="450" y2="360" stroke="white" strokeWidth="3" />
          <line x1="0" y1="0" x2="0" y2="360" stroke="white" strokeWidth="3" />
          <line x1="450" y1="0" x2="450" y2="360" stroke="white" strokeWidth="3" />

          {/* Líneas de ataque (3 metros de la red) */}
          <line x1="0" y1="108" x2="225" y2="108" stroke="white" strokeWidth="2" strokeDasharray="10,5" />
          <line x1="225" y1="108" x2="450" y2="108" stroke="white" strokeWidth="2" strokeDasharray="10,5" />
          <line x1="0" y1="252" x2="225" y2="252" stroke="white" strokeWidth="2" strokeDasharray="10,5" />
          <line x1="225" y1="252" x2="450" y2="252" stroke="white" strokeWidth="2" strokeDasharray="10,5" />

          {/* Círculos de saque */}
          <circle cx="450" cy="180" r="8" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="0" cy="180" r="8" fill="none" stroke="white" strokeWidth="2" />
        </svg>

        {/* Red del volleyball */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform -translate-x-1/2 z-10">
          {/* Postes de la red */}
          <div className="absolute -top-4 left-1/2 w-2 h-4 bg-gray-700 transform -translate-x-1/2 rounded-t" />
          <div className="absolute -bottom-4 left-1/2 w-2 h-4 bg-gray-700 transform -translate-x-1/2 rounded-b" />

          {/* Malla de la red */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px),
                                  repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 10px)`,
            }}
          />
        </div>

        {/* Decoraciones del campo */}
        <div className="absolute top-2 left-2 text-orange-600 font-bold text-sm opacity-70">CAMPO PATALETA</div>

        {/* Pelota decorativa */}
        <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-blue-500 decoration-bounce">
          <div className="absolute inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-30" />
        </div>

        {/* Jugadoras */}
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  )
}
