import type { ReactNode } from "react"

interface FieldProps {
  children: ReactNode
  isSpinning?: boolean
}

export function Field({ children, isSpinning = false }: FieldProps) {
  return (
    <div
      className={`relative w-[550px] h-[500px] bg-gradient-to-b from-green-300 to-green-400 rounded-lg border-4 border-white shadow-inner overflow-hidden ${isSpinning ? "animate-pulse" : ""}`}
    >
      {/* Medio campo de vóley */}
      <div className="absolute inset-0">
        {/* Perímetro del medio campo */}
        <div className="absolute left-8 top-8 right-8 bottom-8 border-4 border-white rounded-sm"></div>

        {/* Red de vóley */}
        <div className="absolute left-8 right-8 top-6 h-4 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800 shadow-lg rounded-sm">
          <div className="absolute inset-0 opacity-60">
            <div className="grid grid-cols-8 h-full gap-px">
              {[...Array(32)].map((_, i) => (
                <div key={i} className="bg-gray-400 opacity-30"></div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-white"></div>
        </div>

        {/* Línea de ataque (3 metros) */}
        <div className="absolute left-8 right-8 h-1 bg-white" style={{ top: "calc(8px + 150px)" }}></div>

        {/* Línea de fondo */}
        <div className="absolute left-8 bottom-8 right-8 h-1 bg-white"></div>

        {/* Líneas laterales */}
        <div className="absolute left-8 top-8 bottom-8 w-1 bg-white"></div>
        <div className="absolute right-8 top-8 bottom-8 w-1 bg-white"></div>

        {/* Zona de saque */}
        <div className="absolute right-8 bottom-8 w-20 h-1 bg-yellow-300"></div>
      </div>

      {children}
    </div>
  )
}
