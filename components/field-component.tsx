"use client"

import type { ReactNode } from "react"

interface FieldComponentProps {
  children: ReactNode
  isSpinning?: boolean
}

export function FieldComponent({ children, isSpinning = false }: FieldComponentProps) {
  return (
    <div className="relative">
      {/* Campo de vóley realista */}
      <div
        className={`relative bg-gradient-to-b from-orange-200 to-orange-300 rounded-lg shadow-2xl transition-all duration-500 ${
          isSpinning ? "animate-pulse" : ""
        }`}
        style={{ width: "450px", height: "350px" }}
      >
        {/* Líneas del campo */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 350" style={{ pointerEvents: "none" }}>
          {/* Borde del campo */}
          <rect x="10" y="10" width="430" height="330" fill="none" stroke="white" strokeWidth="3" />

          {/* Línea central (red) */}
          <line x1="10" y1="175" x2="440" y2="175" stroke="white" strokeWidth="4" />

          {/* Líneas de ataque (3 metros de la red) */}
          <line x1="10" y1="115" x2="440" y2="115" stroke="white" strokeWidth="2" strokeDasharray="10,5" />
          <line x1="10" y1="235" x2="440" y2="235" stroke="white" strokeWidth="2" strokeDasharray="10,5" />

          {/* Red */}
          <rect x="220" y="170" width="10" height="10" fill="white" opacity="0.8" />
          <line x1="225" y1="10" x2="225" y2="340" stroke="white" strokeWidth="2" opacity="0.6" />

          {/* Círculo central */}
          <circle cx="225" cy="175" r="15" fill="none" stroke="white" strokeWidth="2" />
        </svg>

        {/* Decoraciones del campo */}
        <div className="absolute top-2 left-2 text-xs text-white font-bold opacity-70">CAMPO DE VÓLEY</div>
        <div className="absolute bottom-2 right-2 text-xs text-white font-bold opacity-70">🏐</div>

        {/* Jugadoras */}
        {children}
      </div>
    </div>
  )
}
