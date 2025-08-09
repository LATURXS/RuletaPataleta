"use client"

import type { PlayerData } from "@/app/page"

interface PlayerComponentProps {
  player: PlayerData
  onClick: () => void
  isSpinning?: boolean
  photoUrl?: string
}

export function PlayerComponent({ player, onClick, isSpinning = false, photoUrl }: PlayerComponentProps) {
  const getImageSrc = () => {
    if (photoUrl) return photoUrl
    if (player.faceImage.startsWith("default_")) {
      return player.isHealthy ? "😊" : "🤕"
    }
    if (player.faceImage.startsWith("uploaded_")) {
      return player.isHealthy ? "😊" : "🤕"
    }
    return `/caras_jugadoras/${player.faceImage}`
  }

  const isEmoji = !photoUrl && player.faceImage.startsWith("default_")

  return (
    <div
      className={`absolute cursor-pointer transform transition-all duration-700 ease-in-out hover:scale-110 ${
        isSpinning ? "animate-spin" : ""
      } ${player.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
      style={{
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <div className="relative flex flex-col items-center">
        {/* Gota de sudor para jugadoras lesionadas */}
        {!player.isHealthy && <div className="absolute -left-4 top-2 text-lg animate-bounce z-10">💧</div>}

        {/* Cara circular con foto */}
        <div className="relative">
          <div
            className={`w-12 h-12 rounded-full border-4 overflow-hidden transition-all duration-500 flex items-center justify-center ${
              player.isHealthy ? "border-green-400 shadow-lg bg-white" : "border-red-500 shadow-lg bg-red-100"
            }`}
          >
            {isEmoji ? (
              <span className="text-2xl">{getImageSrc()}</span>
            ) : (
              <img
                src={getImageSrc() || "/placeholder.svg"}
                alt={player.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  !player.isHealthy ? "grayscale opacity-75" : ""
                }`}
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  e.currentTarget.parentElement!.innerHTML =
                    `<span class="text-2xl">${player.isHealthy ? "😊" : "🤕"}</span>`
                }}
              />
            )}
          </div>
        </div>

        {/* Cuerpo de palitos */}
        <div className="mt-0 -translate-y-1">
          {player.isHealthy ? (
            // Jugadora sana: sentadilla con brazos extendidos
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
            // Jugadora lesionada sentada (todas sentadas)
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

        {/* Nombre de la jugadora */}
        <div
          className={`text-xs font-bold px-2 py-1 rounded text-center ${
            player.isHealthy ? "text-green-800 bg-green-100 min-w-16 mt-2" : "text-red-800 bg-red-100 max-w-20 -mt-2"
          }`}
        >
          {player.isHealthy ? player.name : player.name.split(" ")[0]}
        </div>
      </div>
    </div>
  )
}
