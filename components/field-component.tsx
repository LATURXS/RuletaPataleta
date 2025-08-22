"use client"

import type React from "react"

interface FieldComponentProps {
  children: React.ReactNode
  isSpinning?: boolean
}

export function FieldComponent({ children, isSpinning }: FieldComponentProps) {
  return (
    <div className="relative">
      {/* Campo de volleyball */}
      <div className="relative bg-gradient-to-b from-green-400 to-green-500 rounded-2xl shadow-2xl p-8 min-h-[400px] border-4 border-white">
        {/* Líneas del campo */}
        <div className="absolute inset-6 border-2 border-white rounded-lg opacity-80"></div>

        {/* Línea central */}
        <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-white transform -translate-y-0.5"></div>

        {/* Red en el centro */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-20 bg-white rounded-full shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-white rounded-full -mt-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-white rounded-full mt-10"></div>

        {/* Áreas de ataque */}
        <div className="absolute top-6 left-6 right-6 h-20 border-b-2 border-white border-dashed opacity-60"></div>
        <div className="absolute bottom-6 left-6 right-6 h-20 border-t-2 border-white border-dashed opacity-60"></div>

        {/* Jugadoras */}
        <div className="relative h-full flex items-center justify-center z-10">
          <div className="grid grid-cols-3 gap-8 w-full max-w-md">{children}</div>
        </div>

        {/* Decoraciones */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce">🏐</div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-700 font-bold bg-white px-3 py-1 rounded-full shadow-lg">
          Campo de Volleyball
        </div>

        {/* Efectos adicionales */}
        <div className="absolute top-4 left-4 text-yellow-300 text-xl opacity-70">⭐</div>
        <div className="absolute top-4 right-4 text-yellow-300 text-xl opacity-70">⭐</div>
        <div className="absolute bottom-4 left-4 text-yellow-300 text-xl opacity-70">⭐</div>
        <div className="absolute bottom-4 right-4 text-yellow-300 text-xl opacity-70">⭐</div>
      </div>
    </div>
  )
}
