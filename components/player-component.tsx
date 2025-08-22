"use client"

import type { PlayerData } from "@/app/page"

interface PlayerComponentProps {
  player: PlayerData
  onClick: () => void
  isSpinning?: boolean
  photoUrl?: string
}

export function PlayerComponent({ player, onClick, isSpinning = false, photoUrl }: PlayerComponentProps) {
  if (!player.isVisible) return null

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
        isSpinning ? "animate-spin" : "hover:scale-110"
      } player-appear`}
      style={{
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        animationDelay: `${Math.random() * 0.5}s`,
      }}
      onClick={onClick}
    >
      {/* Figura de palitos SVG */}
      <div className="relative">
        <svg width="40" height="60" viewBox="0 0 40 60" className="drop-shadow-lg">
          {/* Cuerpo */}
          <line x1="20" y1="20" x2="20" y2="40" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

          {/* Brazos */}
          {player.isHealthy ? (
            // Brazos arriba (jugando)
            <>
              <line x1="20" y1="25" x2="12" y2="15" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="25" x2="28" y2="15" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            // Brazos abajo (sentada)
            <>
              <line x1="20" y1="25" x2="15" y2="35" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="25" x2="25" y2="35" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Piernas */}
          {player.isHealthy ? (
            // Piernas de pie
            <>
              <line x1="20" y1="40" x2="15" y2="55" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="40" x2="25" y2="55" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            // Piernas sentadas (horizontales)
            <>
              <line x1="20" y1="40" x2="10" y2="45" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="40" x2="30" y2="45" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>

        {/* Cara - foto o círculo por defecto */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          {photoUrl ? (
            <img
              src={photoUrl || "/placeholder.svg"}
              alt={player.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 border-2 border-white shadow-lg flex items-center justify-center">
              <span className="text-xs">😊</span>
            </div>
          )}
        </div>

        {/* Gota de sudor (solo para las sanas, fuera del círculo de la cara) */}
        {player.isHealthy && (
          <div className="absolute -top-1 left-8 animate-bounce">
            <div
              className="w-2 h-3 bg-blue-400 rounded-full opacity-70 shadow-sm"
              style={{ borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }}
            />
          </div>
        )}

        {/* Nombre pegado a los pies */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg border border-gray-200">
            <span className="text-xs font-bold text-gray-800 whitespace-nowrap">{player.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
