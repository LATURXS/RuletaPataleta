"use client"

import type { ReactNode } from "react"

interface FieldComponentProps {
  children: ReactNode
  isSpinning?: boolean
}

export function FieldComponent({ children, isSpinning = false }: FieldComponentProps) {
  return (
    <div className="relative">
      {/* Campo de volleyball */}
      <svg
        width="450"
        height="360"
        viewBox="0 0 450 360"
        className="border-2 border-green-600 rounded-lg bg-gradient-to-b from-green-400 to-green-500 shadow-lg"
      >
        {/* Líneas del campo */}
        {/* Línea central */}
        <line x1="225" y1="20" x2="225" y2="340" stroke="white" strokeWidth="3" />

        {/* Líneas de ataque */}
        <line x1="20" y1="110" x2="430" y2="110" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="20" y1="250" x2="430" y2="250" stroke="white" strokeWidth="2" strokeDasharray="5,5" />

        {/* Líneas laterales */}
        <line x1="20" y1="20" x2="430" y2="20" stroke="white" strokeWidth="3" />
        <line x1="20" y1="340" x2="430" y2="340" stroke="white" strokeWidth="3" />
        <line x1="20" y1="20" x2="20" y2="340" stroke="white" strokeWidth="3" />
        <line x1="430" y1="20" x2="430" y2="340" stroke="white" strokeWidth="3" />

        {/* Red */}
        <rect x="220" y="15" width="10" height="330" fill="rgba(139, 69, 19, 0.8)" />
        <rect x="215" y="10" width="20" height="10" fill="rgba(139, 69, 19, 0.9)" />

        {/* Círculo central */}
        <circle cx="225" cy="180" r="30" fill="none" stroke="white" strokeWidth="2" />

        {/* Zonas de saque */}
        <rect x="425" y="160" width="20" height="40" fill="rgba(255,255,255,0.3)" />
        <rect x="5" y="160" width="20" height="40" fill="rgba(255,255,255,0.3)" />
      </svg>

      {/* Contenedor de jugadoras */}
      <div className={`absolute inset-0 ${isSpinning ? "animate-pulse" : ""}`}>{children}</div>
    </div>
  )
}
