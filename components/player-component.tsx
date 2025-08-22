"use client"

interface PlayerData {
  id: number
  name: string
  faceImage: string
  isHealthy: boolean
  position: { x: number; y: number }
  positionName?: string
  injury?: string
  isVisible?: boolean
}

interface PlayerComponentProps {
  player: PlayerData
  onClick: () => void
  isSpinning?: boolean
  photoUrl?: string
}

export function PlayerComponent({ player, onClick, isSpinning, photoUrl }: PlayerComponentProps) {
  if (!player.isVisible) {
    return null
  }

  return (
    <div
      className={`
        relative cursor-pointer transition-all duration-500 transform
        ${isSpinning ? "animate-bounce-in" : "hover:scale-110"}
        ${player.isHealthy ? "hover:shadow-green-400" : "hover:shadow-red-400"}
        hover:shadow-lg
      `}
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${player.position.x}px`,
        top: `${player.position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Figura de palitos SVG */}
      <div className="relative">
        <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
          {/* Cuerpo */}
          <line x1="30" y1="25" x2="30" y2="50" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />

          {/* Cabeza */}
          <circle cx="30" cy="15" r="8" fill="#FFE4C4" stroke="#8B4513" strokeWidth="2" />

          {/* Brazos */}
          {player.isHealthy ? (
            <>
              <line x1="30" y1="30" x2="15" y2="40" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="30" x2="45" y2="40" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="30" y1="30" x2="20" y2="35" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="30" x2="40" y2="35" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Piernas */}
          {player.isHealthy ? (
            <>
              <line x1="30" y1="50" x2="20" y2="70" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="50" x2="40" y2="70" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="30" y1="50" x2="25" y2="65" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="50" x2="35" y2="65" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Cara en la cabeza */}
          {photoUrl ? (
            <defs>
              <pattern id={`photo-${player.id}`} patternUnits="objectBoundingBox" width="1" height="1">
                <image href={photoUrl} x="0" y="0" width="16" height="16" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
          ) : null}

          {photoUrl ? (
            <circle cx="30" cy="15" r="7" fill={`url(#photo-${player.id})`} />
          ) : (
            <>
              <circle cx="27" cy="12" r="1" fill="#000" />
              <circle cx="33" cy="12" r="1" fill="#000" />
              <path d="M 26 17 Q 30 19 34 17" stroke="#000" strokeWidth="1" fill="none" />
            </>
          )}
        </svg>

        {/* Gota de sudor para las lesionadas - FUERA del círculo */}
        {!player.isHealthy && <div className="absolute -top-2 -right-2 text-blue-400 text-lg animate-bounce">💧</div>}
      </div>

      {/* Nombre pegado a los pies */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
        <div
          className={`
          text-xs font-bold px-2 py-1 rounded-full shadow-lg
          ${
            player.isHealthy
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }
        `}
        >
          {player.name}
        </div>
      </div>
    </div>
  )
}
