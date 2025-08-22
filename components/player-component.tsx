"use client"

import type { PlayerData } from "@/app/page"

interface PlayerComponentProps {
  player: PlayerData
  onClick: () => void
  isSpinning: boolean
  photoUrl?: string
}

export function PlayerComponent({ player, onClick, isSpinning, photoUrl }: PlayerComponentProps) {
  return (
    <div
      className={`absolute cursor-pointer transition-all duration-500 ${
        player.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } ${isSpinning ? "animate-pulse" : "hover:scale-110"}`}
      style={{
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        {/* Figura de palitos */}
        <div className="relative flex flex-col items-center">
          {/* Cabeza (círculo para la foto) */}
          <div
            className={`w-14 h-14 rounded-full border-3 ${
              player.isHealthy ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"
            } flex items-center justify-center shadow-lg relative overflow-hidden`}
          >
            {photoUrl ? (
              <img
                src={photoUrl || "/placeholder.svg"}
                alt={player.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xl">{player.isHealthy ? "😊" : "🤕"}</span>
            )}
          </div>

          {/* Gota de sudor FUERA del círculo para jugadoras lesionadas */}
          {!player.isHealthy && (
            <div className="absolute -left-4 top-2 text-blue-400 text-lg animate-bounce z-10">💧</div>
          )}

          {/* Cuerpo de palitos - PEGADO al círculo */}
          <div className="mt-0 -translate-y-1">
            {player.isHealthy ? (
              // Jugadora sana: sentadilla con brazos extendidos - PEGADO
              <svg width="60" height="80" viewBox="0 0 60 80" className="transition-all duration-500">
                <line x1="30" y1="0" x2="30" y2="30" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <line x1="30" y1="10" x2="50" y2="15" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <line x1="30" y1="10" x2="10" y2="15" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="15" x2="55" y2="20" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <line x1="10" y1="15" x2="5" y2="20" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <line x1="30" y1="30" x2="20" y2="50" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <line x1="30" y1="30" x2="40" y2="50" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <line x1="20" y1="50" x2="15" y2="65" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <line x1="40" y1="50" x2="45" y2="65" stroke="#4a5568" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="15" cy="65" rx="8" ry="3" fill="#2d3748" />
                <ellipse cx="45" cy="65" rx="8" ry="3" fill="#2d3748" />
                <circle cx="55" cy="20" r="3" fill="#f7fafc" stroke="#4a5568" strokeWidth="1" />
                <circle cx="5" cy="20" r="3" fill="#f7fafc" stroke="#4a5568" strokeWidth="1" />
              </svg>
            ) : (
              // TODAS las jugadoras lesionadas están sentadas - SIN BANCO y PEGADO
              <svg width="60" height="60" viewBox="0 0 60 60" className="transition-all duration-500">
                <line x1="30" y1="0" x2="25" y2="25" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="25" y1="10" x2="15" y2="30" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="25" y1="10" x2="35" y2="30" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="15" y1="30" x2="12" y2="38" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="35" y1="30" x2="38" y2="38" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="25" y1="25" x2="20" y2="35" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="25" y1="25" x2="35" y2="35" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="20" y1="35" x2="18" y2="50" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <line x1="35" y1="35" x2="37" y2="50" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="18" cy="50" rx="6" ry="3" fill="#991b1b" />
                <ellipse cx="37" cy="50" rx="6" ry="3" fill="#991b1b" />
                <circle cx="12" cy="38" r="3" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
                <circle cx="38" cy="38" r="3" fill="#fecaca" stroke="#dc2626" strokeWidth="1" />
              </svg>
            )}
          </div>
        </div>

        {/* Nombre de la jugadora - Tullis MÁS ARRIBA para no taparse */}
        <div
          className={`${
            player.isHealthy ? "mt-2" : "-mt-2"
          } px-2 py-1 rounded text-xs font-bold text-center min-w-[60px] shadow-sm ${
            player.isHealthy ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {player.name}
        </div>
      </div>
    </div>
  )
}
