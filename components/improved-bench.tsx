"use client"

import type { ReactNode } from "react"

interface ImprovedBenchProps {
  children: ReactNode
  isSpinning?: boolean
}

export function ImprovedBench({ children, isSpinning = false }: ImprovedBenchProps) {
  return (
    <div className={`relative bench-container ${isSpinning ? "animate-pulse" : ""}`}>
      {/* Área del banquillo */}
      <div className="relative w-[500px] h-[320px] bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-2xl border-4 border-green-300 overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-green-100/50" />

        {/* Bancos de madera - 2 bancos horizontales */}

        {/* Banco superior */}
        <div className="absolute top-16 left-8 right-8 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg shadow-xl border-2 border-amber-700">
          {/* Vetas de la madera */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700/20 to-transparent rounded-lg" />
          <div className="absolute top-1 left-2 right-2 h-1 bg-amber-500/30 rounded-full" />
          <div className="absolute bottom-1 left-2 right-2 h-1 bg-amber-900/30 rounded-full" />

          {/* Patas del banco */}
          <div className="absolute -bottom-4 left-4 w-3 h-4 bg-amber-700 rounded-b" />
          <div className="absolute -bottom-4 right-4 w-3 h-4 bg-amber-700 rounded-b" />
        </div>

        {/* Banco inferior */}
        <div className="absolute bottom-16 left-8 right-8 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg shadow-xl border-2 border-amber-700">
          {/* Vetas de la madera */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700/20 to-transparent rounded-lg" />
          <div className="absolute top-1 left-2 right-2 h-1 bg-amber-500/30 rounded-full" />
          <div className="absolute bottom-1 left-2 right-2 h-1 bg-amber-900/30 rounded-full" />

          {/* Patas del banco */}
          <div className="absolute -bottom-4 left-4 w-3 h-4 bg-amber-700 rounded-b" />
          <div className="absolute -bottom-4 right-4 w-3 h-4 bg-amber-700 rounded-b" />
        </div>

        {/* Decoraciones del banquillo */}
        <div className="absolute top-2 left-4 text-green-700 font-bold text-sm opacity-70">BANQUILLO TULLIS</div>

        {/* Plantas decorativas */}
        <div className="absolute bottom-2 left-2 text-2xl decoration-bounce">🌱</div>
        <div className="absolute bottom-2 right-2 text-2xl decoration-bounce" style={{ animationDelay: "0.5s" }}>
          🌿
        </div>
        <div className="absolute top-2 right-2 text-2xl decoration-bounce" style={{ animationDelay: "1s" }}>
          🍃
        </div>

        {/* Regadera decorativa */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl decoration-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          🪴
        </div>

        {/* Jugadoras lesionadas */}
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  )
}
