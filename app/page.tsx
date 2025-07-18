"use client"

import { useState, useCallback, useEffect } from "react"
import { Player } from "@/components/player"
import { Field } from "@/components/field"
import { Bench } from "@/components/bench"
import { PlayerSummary } from "@/components/player-summary"
import { PhotoUploader } from "@/components/photo-uploader"
import { Button } from "@/components/ui/button"
import { Camera, Share2 } from "lucide-react"
import posicionesData from "@/data/posiciones.json"
import lesionesData from "@/data/lesiones.json"

export interface PlayerData {
  id: number
  name: string
  faceImage: string
  isHealthy: boolean
  position: { x: number; y: number }
  positionName?: string
  injury?: string
}

// Posiciones específicas del vóley (ajustadas - más cerca de la red para 4,3,2)
const getVolleyballPositions = () => {
  return [
    // Línea de ataque (más cerca de la red) - posiciones 2, 3, 4
    { x: 100, y: 80 }, // Posición 4 (Punta) - más espacio para nombres
    { x: 225, y: 80 }, // Posición 3 (Central) - más espacio para nombres
    { x: 350, y: 80 }, // Posición 2 (Opuesta) - más espacio para nombres

    // Línea de fondo - posiciones 5, 6, 1
    { x: 100, y: 250 }, // Posición 5 (Colocadora) - más separación
    { x: 225, y: 250 }, // Posición 6 (Líbero) - más separación
    { x: 350, y: 250 }, // Posición 1 (Punta) - más separación
  ]
}

// Posiciones en el banquillo
const getBenchPositions = () => {
  return [
    { x: 30, y: 80 },
    { x: 130, y: 80 },
    { x: 30, y: 180 },
    { x: 130, y: 180 },
    { x: 30, y: 280 }, // Estas dos de abajo estarán sentadas
    { x: 130, y: 280 }, // Estas dos de abajo estarán sentadas
  ]
}

// Función para mezclar array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function VolleyballGame() {
  const [players, setPlayers] = useState<PlayerData[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [showUploader, setShowUploader] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<{ file: File; name: string }[]>([])
  const [photoUrls, setPhotoUrls] = useState<{ [key: string]: string }>({})

  // Inicializar jugadoras con fotos por defecto o subidas
  const initializePlayers = useCallback(
    (photos?: { file: File; name: string }[]) => {
      const fieldPositions = getVolleyballPositions()
      const benchPositions = getBenchPositions()

      // Mezclar posiciones y lesiones
      const positionKeys = shuffleArray(Object.keys(posicionesData))
      const injuryKeys = shuffleArray(Object.keys(lesionesData))

      const initialPlayers: PlayerData[] = []

      // Si hay fotos subidas, usar esas
      const playersData = photos || uploadedPhotos

      if (playersData.length >= 12) {
        // Crear índices mezclados para seleccionar fotos aleatoriamente
        const photoIndices = shuffleArray([...Array(playersData.length).keys()]).slice(0, 12)

        // 6 jugadoras sanas
        for (let i = 0; i < 6; i++) {
          const positionKey = positionKeys[i]
          const photoIndex = photoIndices[i]
          const photoData = playersData[photoIndex]

          initialPlayers.push({
            id: i + 1,
            name: photoData.name.replace(/_/g, " "),
            faceImage: `uploaded_${photoIndex}`, // Usar el índice real del array original
            isHealthy: true,
            position: fieldPositions[i],
            positionName: posicionesData[positionKey as keyof typeof posicionesData],
          })
        }

        // 6 jugadoras lesionadas
        for (let i = 6; i < 12; i++) {
          const injuryKey = injuryKeys[i - 6]
          const photoIndex = photoIndices[i]
          const photoData = playersData[photoIndex]

          initialPlayers.push({
            id: i + 1,
            name: photoData.name.replace(/_/g, " "),
            faceImage: `uploaded_${photoIndex}`, // Usar el índice real del array original
            isHealthy: false,
            position: benchPositions[i - 6],
            injury: lesionesData[injuryKey as keyof typeof lesionesData],
          })
        }
      } else {
        // Usar fotos por defecto
        const defaultNames = [
          "Ana García",
          "María López",
          "Carmen Ruiz",
          "Laura Martín",
          "Sofía Torres",
          "Elena Vega",
          "Isabel Moreno",
          "Cristina Silva",
          "Patricia Ramos",
          "Andrea Jiménez",
          "Lucía Fernández",
          "Marta Díaz",
        ]

        for (let i = 0; i < 6; i++) {
          const positionKey = positionKeys[i]
          initialPlayers.push({
            id: i + 1,
            name: defaultNames[i],
            faceImage: `default_${i + 1}`,
            isHealthy: true,
            position: fieldPositions[i],
            positionName: posicionesData[positionKey as keyof typeof posicionesData],
          })
        }

        for (let i = 6; i < 12; i++) {
          const injuryKey = injuryKeys[i - 6]
          initialPlayers.push({
            id: i + 1,
            name: defaultNames[i],
            faceImage: `default_${i + 1}`,
            isHealthy: false,
            position: benchPositions[i - 6],
            injury: lesionesData[injuryKey as keyof typeof lesionesData],
          })
        }
      }

      setPlayers(initialPlayers)
    },
    [uploadedPhotos],
  )

  useEffect(() => {
    initializePlayers()
  }, [initializePlayers])

  const handlePhotosUploaded = useCallback(
    (photos: { file: File; name: string }[]) => {
      setUploadedPhotos(photos)

      // Crear URLs para las fotos usando el índice correcto
      const urls: { [key: string]: string } = {}
      photos.forEach((photo, index) => {
        urls[`uploaded_${index}`] = URL.createObjectURL(photo.file)
      })
      setPhotoUrls(urls)

      // Reinicializar jugadoras con las nuevas fotos
      initializePlayers(photos)
    },
    [initializePlayers],
  )

  const handleSpin = useCallback(() => {
    setIsSpinning(true)

    setTimeout(() => {
      initializePlayers()
      setIsSpinning(false)
    }, 2500)
  }, [initializePlayers])

  const handlePlayerClick = useCallback(
    (playerId: number) => {
      if (isSpinning) return

      setPlayers((prevPlayers) => {
        const fieldPositions = getVolleyballPositions()
        const benchPositions = getBenchPositions()
        const positionKeys = Object.keys(posicionesData)
        const injuryKeys = Object.keys(lesionesData)

        return prevPlayers.map((player) => {
          if (player.id === playerId) {
            const newIsHealthy = !player.isHealthy

            if (newIsHealthy) {
              // Mover al campo
              const healthyPlayers = prevPlayers.filter((p) => p.isHealthy && p.id !== playerId)
              const availableFieldPositions = fieldPositions.filter(
                (pos) => !healthyPlayers.some((p) => p.position.x === pos.x && p.position.y === pos.y),
              )
              const newPosition = availableFieldPositions[0] || fieldPositions[0]
              const randomPositionKey = positionKeys[Math.floor(Math.random() * positionKeys.length)]

              return {
                ...player,
                isHealthy: newIsHealthy,
                position: newPosition,
                positionName: posicionesData[randomPositionKey as keyof typeof posicionesData],
                injury: undefined,
              }
            } else {
              // Mover al banquillo
              const injuredPlayers = prevPlayers.filter((p) => !p.isHealthy && p.id !== playerId)
              const availableBenchPositions = benchPositions.filter(
                (pos) => !injuredPlayers.some((p) => p.position.x === pos.x && p.position.y === pos.y),
              )
              const newPosition = availableBenchPositions[0] || benchPositions[0]
              const randomInjuryKey = injuryKeys[Math.floor(Math.random() * injuryKeys.length)]

              return {
                ...player,
                isHealthy: newIsHealthy,
                position: newPosition,
                positionName: undefined,
                injury: lesionesData[randomInjuryKey as keyof typeof lesionesData],
              }
            }
          }
          return player
        })
      })
    },
    [isSpinning],
  )

  const shareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: "LA RULETA PATALETA",
        text: "¡Juega con nosotras a La Ruleta Pataleta! 🏐",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("¡Enlace copiado! Compártelo con tus amigas 🏐")
    }
  }

  const healthyPlayers = players.filter((p) => p.isHealthy)
  const injuredPlayers = players.filter((p) => !p.isHealthy)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">🎯 LA RULETA PATALETA</h1>
          <div className="flex gap-2">
            <Button onClick={() => setShowUploader(true)} className="bg-blue-600 hover:bg-blue-700">
              <Camera className="h-4 w-4 mr-2" />
              Subir Fotos
            </Button>
            <Button onClick={shareApp} variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6 relative overflow-hidden">
          {/* Botón de remolino */}
          <div className="text-center mb-6">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`px-8 py-4 text-xl font-bold rounded-lg shadow-lg transition-all duration-300 ${
                isSpinning
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white hover:scale-105"
              }`}
            >
              {isSpinning ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin text-2xl">🌪️</div>
                  Redistribuyendo...
                </span>
              ) : (
                "🎲 Redistribuir Jugadoras"
              )}
            </button>
          </div>

          <div className="flex gap-6">
            {/* Campo de Vóley */}
            <div className="relative">
              <h2 className="text-2xl font-semibold mb-4 text-green-700">Las sanas</h2>
              <Field isSpinning={isSpinning}>
                {healthyPlayers.map((player) => (
                  <Player
                    key={player.id}
                    player={player}
                    onClick={() => handlePlayerClick(player.id)}
                    isSpinning={isSpinning}
                    photoUrl={photoUrls[player.faceImage]}
                  />
                ))}
              </Field>
              <div className="mt-2 text-sm text-gray-600">Jugadoras sanas: {healthyPlayers.length}</div>
            </div>

            {/* Banquillo */}
            <div className="relative">
              <h2 className="text-2xl font-semibold mb-4 text-red-700">Las tullis</h2>
              <Bench isSpinning={isSpinning}>
                {injuredPlayers.map((player) => (
                  <Player
                    key={player.id}
                    player={player}
                    onClick={() => handlePlayerClick(player.id)}
                    isSpinning={isSpinning}
                    photoUrl={photoUrls[player.faceImage]}
                  />
                ))}
              </Bench>
              <div className="mt-2 text-sm text-gray-600">Jugadoras lesionadas: {injuredPlayers.length}</div>
            </div>
          </div>

          {/* Resumen de jugadoras */}
          <PlayerSummary healthyPlayers={healthyPlayers} injuredPlayers={injuredPlayers} />
        </div>

        {/* Uploader Modal */}
        {showUploader && (
          <PhotoUploader onPhotosUploaded={handlePhotosUploaded} onClose={() => setShowUploader(false)} />
        )}
      </div>
    </div>
  )
}
