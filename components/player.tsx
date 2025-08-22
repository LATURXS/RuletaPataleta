"use client"
import { Card, CardContent } from "@/components/ui/card"

interface PlayerData {
  id: number
  name: string
  faceImage: string
  isHealthy: boolean
  position?: { x: number; y: number }
  positionName?: string
  injury?: string
}

interface PlayerProps {
  player: PlayerData
  onClick: () => void
  isSpinning?: boolean
  photoUrl?: string
}

export function Player({ player, onClick, isSpinning, photoUrl }: PlayerProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
        isSpinning ? "animate-bounce-in" : ""
      } ${player.isHealthy ? "border-green-500" : "border-red-500"}`}
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        {/* Foto de la jugadora */}
        <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-200">
          {photoUrl ? (
            <img src={photoUrl || "/placeholder.svg"} alt={player.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
          )}
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-sm mb-1">{player.name}</h3>

        {/* Estado */}
        {player.isHealthy ? (
          <div className="text-green-600 text-xs">✅ {player.positionName}</div>
        ) : (
          <div className="text-red-600 text-xs">🏥 {player.injury}</div>
        )}
      </CardContent>
    </Card>
  )
}
