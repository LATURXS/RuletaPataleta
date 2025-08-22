import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PlayerData {
  id: number
  name: string
  faceImage: string
  isHealthy: boolean
  position?: { x: number; y: number }
  positionName?: string
  injury?: string
}

interface PlayerSummaryProps {
  players: PlayerData[]
}

export function PlayerSummary({ players }: PlayerSummaryProps) {
  const healthyPlayers = players.filter((p) => p.isHealthy)
  const injuredPlayers = players.filter((p) => !p.isHealthy)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Jugadoras Sanas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 flex items-center gap-2">
            🏐 Jugadoras Sanas ({healthyPlayers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {healthyPlayers.map((player) => (
              <div key={player.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium">{player.name}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {player.positionName}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Jugadoras Lesionadas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center gap-2">
            🏥 Jugadoras Lesionadas ({injuredPlayers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {injuredPlayers.map((player) => (
              <div key={player.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="font-medium">{player.name}</span>
                <Badge variant="destructive" className="bg-red-100 text-red-800">
                  {player.injury}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
