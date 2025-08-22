"use client"

import type { ReactNode } from "react"

interface ImprovedBenchProps {
  children: ReactNode
  isSpinning?: boolean
}

export function ImprovedBench({ children, isSpinning = false }: ImprovedBenchProps) {
  return (
    <div className="relative">
      {/* Área del banquillo */}
      <svg
        width="500"
        height="320"
        viewBox="0 0 500 320"
        className="border-2 border-red-400 rounded-lg bg-gradient-to-b from-red-100 to-red-200 shadow-lg"
      >
        {/* Banco superior */}
        <rect x="50" y="60" width="400" height="20" fill="#8B4513" rx="10" />
        <rect x="50" y="75" width="400" height="8" fill="#654321" rx="4" />

        {/* Banco inferior */}
        <rect x="50" y="220" width="400" height="20" fill="#8B4513" rx="10" />
        <rect x="50" y="235" width="400" height="8" fill="#654321" rx="4" />

        {/* Decoraciones del banquillo */}
        {/* Plantas en macetas */}
        <g>
          {/* Maceta 1 */}
          <rect x="20" y="100" width="15" height="20" fill="#CD853F" />
          <path d="M 22 100 Q 27.5 95 33 100" fill="#228B22" />
          <path d="M 25 98 Q 27.5 93 30 98" fill="#32CD32" />

          {/* Maceta 2 */}
          <rect x="465" y="100" width="15" height="20" fill="#CD853F" />
          <path d="M 467 100 Q 472.5 95 478 100" fill="#228B22" />
          <path d="M 470 98 Q 472.5 93 475 98" fill="#32CD32" />

          {/* Maceta 3 */}
          <rect x="20" y="260" width="15" height="20" fill="#CD853F" />
          <path d="M 22 260 Q 27.5 255 33 260" fill="#228B22" />
          <path d="M 25 258 Q 27.5 253 30 258" fill="#32CD32" />

          {/* Maceta 4 */}
          <rect x="465" y="260" width="15" height="20" fill="#CD853F" />
          <path d="M 467 260 Q 472.5 255 478 260" fill="#228B22" />
          <path d="M 470 258 Q 472.5 253 475 258" fill="#32CD32" />
        </g>

        {/* Texto decorativo */}
        <text x="250" y="30" textAnchor="middle" className="fill-red-600 text-lg font-bold">
          🏥 ZONA DE RECUPERACIÓN 🏥
        </text>

        {/* Líneas de separación entre espacios */}
        <line x1="180" y1="50" x2="180" y2="90" stroke="#999" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="320" y1="50" x2="320" y2="90" stroke="#999" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="180" y1="210" x2="180" y2="250" stroke="#999" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="320" y1="210" x2="320" y2="250" stroke="#999" strokeWidth="1" strokeDasharray="2,2" />
      </svg>

      {/* Contenedor de jugadoras */}
      <div className={`absolute inset-0 ${isSpinning ? "animate-pulse" : ""}`}>{children}</div>
    </div>
  )
}
