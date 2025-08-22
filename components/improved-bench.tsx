"use client"

import type React from "react"

interface ImprovedBenchProps {
  children: React.ReactNode
  isSpinning?: boolean
}

export function ImprovedBench({ children, isSpinning }: ImprovedBenchProps) {
  return (
    <div className="relative">
      {/* Área del banquillo */}
      <div className="relative bg-gradient-to-b from-amber-600 to-amber-800 rounded-2xl shadow-2xl p-8 min-h-[320px] border-4 border-amber-900">
        {/* Banco superior */}
        <div className="absolute top-6 left-6 right-6 h-16 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg shadow-inner border-2 border-amber-800">
          <div className="absolute inset-x-4 top-2 h-2 bg-amber-600 rounded-full opacity-60"></div>
          <div className="absolute inset-x-4 bottom-2 h-2 bg-amber-900 rounded-full opacity-40"></div>
        </div>

        {/* Banco inferior */}
        <div className="absolute bottom-6 left-6 right-6 h-16 bg-gradient-to-b from-amber-700 to-amber-900 rounded-lg shadow-inner border-2 border-amber-800">
          <div className="absolute inset-x-4 top-2 h-2 bg-amber-600 rounded-full opacity-60"></div>
          <div className="absolute inset-x-4 bottom-2 h-2 bg-amber-900 rounded-full opacity-40"></div>
        </div>

        {/* Jugadoras lesionadas */}
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="w-full h-full relative">{children}</div>
        </div>

        {/* Decoraciones */}
        <div className="absolute -top-3 left-8 text-2xl">🪑</div>
        <div className="absolute -top-3 right-8 text-2xl">🪑</div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-700 font-bold bg-white px-3 py-1 rounded-full shadow-lg">
          Banquillo de las Tullis
        </div>

        {/* Plantas decorativas */}
        <div className="absolute top-2 left-2 text-green-500 text-lg opacity-70">🌱</div>
        <div className="absolute top-2 right-2 text-green-500 text-lg opacity-70">🌿</div>
        <div className="absolute bottom-2 left-2 text-green-500 text-lg opacity-70">🍀</div>
        <div className="absolute bottom-2 right-2 text-green-500 text-lg opacity-70">🌺</div>

        {/* Regadera */}
        <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-3xl opacity-60">🪴</div>
      </div>
    </div>
  )
}
