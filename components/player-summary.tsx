import type { PlayerData } from "@/app/page"

interface PlayerSummaryProps {
  healthyPlayers: PlayerData[]
  injuredPlayers: PlayerData[]
}

export function PlayerSummary({ healthyPlayers, injuredPlayers }: PlayerSummaryProps) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Posiciones */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-green-800 mb-4 text-center">⚡ POSICIONES</h3>
        <div className="space-y-2">
          {healthyPlayers.map((player) => (
            <div key={player.id} className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
              <span className="font-medium text-green-700">{player.name}</span>
              <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm font-bold">
                {player.positionName}
              </span>
            </div>
          ))}
        </div>
        {healthyPlayers.length === 0 && <p className="text-green-600 text-center italic">No hay jugadoras sanas</p>}
      </div>

      {/* Parte de lesiones */}
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-red-800 mb-4 text-center">🏥 PARTE DE LESIONES</h3>
        <div className="space-y-2">
          {injuredPlayers.map((player) => (
            <div key={player.id} className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
              <span className="font-medium text-red-700">{player.name}</span>
              <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm font-bold">{player.injury}</span>
            </div>
          ))}
        </div>
        {injuredPlayers.length === 0 && <p className="text-red-600 text-center italic">No hay jugadoras lesionadas</p>}
      </div>
    </div>
  )
}
