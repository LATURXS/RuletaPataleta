import type React from "react"

interface FieldProps {
  children: React.ReactNode
  isSpinning?: boolean
}

export function Field({ children, isSpinning }: FieldProps) {
  return (
    <div className="relative bg-green-400 rounded-lg shadow-lg p-8 min-h-[400px]">
      {/* Líneas del campo */}
      <div className="absolute inset-4 border-2 border-white rounded"></div>
      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white"></div>

      {/* Red en el centro */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-16 bg-white"></div>

      {/* Jugadoras */}
      <div className="relative h-full flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8">{children}</div>
      </div>

      {/* Decoraciones */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-2xl">🏐</div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-700">
        Campo de Volleyball
      </div>
    </div>
  )
}
