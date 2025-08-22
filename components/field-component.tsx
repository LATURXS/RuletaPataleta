"use client"

import type { ReactNode } from "react"

interface FieldComponentProps {
  children: ReactNode
  isSpinning: boolean
}

export function FieldComponent({ children, isSpinning }: FieldComponentProps) {
  return (
    <div className="relative">
      {/* Campo de vóley realista - 9x9 metros (mi lado del campo) */}
      <div
        className={`relative bg-gradient-to-b from-orange-200 to-orange-300 border-4 border-orange-600 rounded-lg shadow-lg transition-all duration-500 ${
          isSpinning ? "animate-pulse" : ""
        }`}
        style={{
          width: "450px", // 9 metros de ancho
          height: "450px", // 9 metros de largo
          padding: "20px",
        }}
      >
        {/* Superficie del campo con textura */}
        <div className="absolute inset-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded opacity-50"></div>

        {/* Líneas del campo */}
        <div className="absolute inset-4">
          {/* Red (parte superior del campo) */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-white border-t-4 border-black shadow-lg"></div>
          <div className="absolute top-0 left-1/2 w-1 h-6 bg-gray-800 transform -translate-x-1/2 -translate-y-2"></div>

          {/* Línea de ataque (3 metros de la red) */}
          <div
            className="absolute left-0 right-0 h-1 bg-white shadow-sm"
            style={{ top: "33.33%" }} // 3 metros de 9 metros = 33.33%
          ></div>

          {/* Línea de fondo (línea de saque) */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white shadow-sm"></div>

          {/* Líneas laterales */}
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-white shadow-sm"></div>
          <div className="absolute top-0 bottom-0 right-0 w-1 bg-white shadow-sm"></div>

          {/* Línea central (opcional, para referencia) */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30 transform -translate-x-1/2"></div>
        </div>

        {/* Contenedor de jugadoras */}
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  )
}
