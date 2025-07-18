"use client"

import type { PlayerData } from "@/app/page"

interface PlayerProps {
  player: PlayerData
  onClick: () => void
  isSpinning?: boolean
  photoUrl?: string
}

export function Player({ player, onClick, isSpinning = false, photoUrl }: PlayerProps) {
  const getImageSrc = () => {
    // Si hay una URL de foto subida, usarla
    if (photoUrl) return photoUrl

    // Si es una foto por defecto
    if (player.faceImage.startsWith("default_")) {
      return `/placeholder.svg?height=64&width=64&text=${player.name.charAt(0)}`
    }

    // Si es una foto subida pero no se encontró la URL, usar placeholder
    if (player.faceImage.startsWith("uploaded_")) {
      return `/placeholder.svg?height=64&width=64&text=${player.name.charAt(0)}`
    }

    // Fotos originales de la carpeta
    return `/caras_jugadoras/${player.faceImage}`
  }

  return (
    <div
      className={`absolute cursor-pointer transform transition-all duration-700 ease-in-out hover:scale-110 ${
        isSpinning ? "animate-spin" : ""
      }`}
      style={{
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <div className="relative flex flex-col items-center">
        {/* Gota de dolor para jugadoras lesionadas */}
        {!player.isHealthy && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">💧</div>
        )}

        {/* Cara circular con foto */}
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-full border-4 overflow-hidden transition-all duration-500 ${
              player.isHealthy ? "border-green-400 shadow-lg" : "border-red-500 shadow-lg bg-red-100"
            }`}
          >
            <img
              src={getImageSrc() || "/placeholder.svg"}
              alt={player.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                !player.isHealthy ? "grayscale opacity-75" : ""
              }`}
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg?height=64&width=64&text=${player.name.charAt(0)}`
              }}
            />
          </div>

          {/* Indicador de estado */}
          <div
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
              player.isHealthy ? "bg-green-500 text-white" : "bg-red-600 text-white"
            }`}
          >
            {player.isHealthy ? "✓" : "✗"}
          </div>
        </div>

        {/* Cuerpo de palitos */}
        <div className="mt-0">
          {player.isHealthy ? (
            // Jugadora sana: sentadilla con brazos extendidos
            <svg width="60" height="80" viewBox="0 0 60 80" className="transition-all duration-500">
              <line x1="30" y1="10" x2="30" y2="40" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="20" x2="50" y2="25" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="20" x2="10" y2="25" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="25" x2="55" y2="30" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <line x1="10" y1="25" x2="5" y2="30" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="40" x2="20" y2="60" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="40" x2="40" y2="60" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <line x1="20" y1="60" x2="15" y2="75" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="60" x2="45" y2="75" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="15" cy="75" rx="8" ry="3" fill="#2d3748" />
              <ellipse cx="45" cy="75" rx="8" ry="3" fill="#2d3748" />
              <circle cx="55" cy="30" r="3" fill="#f7fafc" stroke="#4a5568" strokeWidth="1" />
              <circle cx="5" cy="30" r="3" fill="#f7fafc" stroke="#4a5568" strokeWidth="1" />
            </svg>
          ) : // Solo sentadas si están en posiciones inferiores del banquillo
          player.position.y > 250 ? (
            // Jugadora lesionada sentada
            <svg width="60" height="70" viewBox="0 0 60 70" className="transition-all duration-500">
              <rect x="5" y="45" width="50" height="6" fill="#8b4513" rx="3" />
              <rect x="8" y="51" width="4" height="15" fill="#654321" />
              <rect x="48" y="51" width="4" height="15" fill="#654321" />
              <line x1="30" y1="10" x2="25" y2="35" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="20" x2="15" y2="40" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="20" x2="35" y2="40" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="15" y1="40" x2="12" y2="48" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="35" y1="40" x2="38" y2="48" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="35" x2="20" y2="45" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="35" x2="35" y2="45" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="20" y1="45" x2="18" y2="60" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="35" y1="45" x2="37" y2="60" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="18" cy="60" rx="6" ry="3" fill="#991b1b" />
              <ellipse cx="37" cy="60" rx="6" ry="3" fill="#991b1b" />
              <circle cx="12" cy="48" r="3" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
              <circle cx="38" cy="48" r="3" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
            </svg>
          ) : (
            // Jugadora lesionada de pie con postura de dolor
            <svg width="60" height="80" viewBox="0 0 60 80" className="transition-all duration-500">
              <line x1="30" y1="10" x2="30" y2="40" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="20" x2="50" y2="25" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="20" x2="10" y2="25" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="25" x2="55" y2="30" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="10" y1="25" x2="5" y2="30" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="40" x2="20" y2="60" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="40" x2="40" y2="60" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="20" y1="60" x2="15" y2="75" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="60" x2="45" y2="75" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="15" cy="75" rx="8" ry="3" fill="#991b1b" />
              <ellipse cx="45" cy="75" rx="8" ry="3" fill="#991b1b" />
              <circle cx="55" cy="30" r="3" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
              <circle cx="5" cy="30" r="3" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
            </svg>
          )}
        </div>

        {/* Nombre de la jugadora - SIEMPRE VISIBLE para jugadoras sanas */}
        <div
          className={`mt-1 text-xs font-bold px-2 py-1 rounded text-center ${
            player.isHealthy ? "text-green-800 bg-green-100 min-w-16" : "text-red-800 bg-red-100 max-w-20"
          }`}
        >
          {player.isHealthy ? player.name : player.name.split(" ")[0]}
        </div>
      </div>
    </div>
  )
}
