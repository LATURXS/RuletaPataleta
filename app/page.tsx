"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import { PlayerComponent } from "@/components/player-component"
import { FieldComponent } from "@/components/field-component"
import { ImprovedBench } from "@/components/improved-bench"
import { PhotoUploaderComponent } from "@/components/photo-uploader-component"
import { IntroScreen } from "@/components/intro-screen"
import { SpinningWheel } from "@/components/spinning-wheel"
import { RouletteButton } from "@/components/roulette-button"
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
  isVisible?: boolean
}

// Posiciones realistas del vóley (campo 9x9 metros)
const getVolleyballPositions = () => {
  return [
    // Línea de ataque (cerca de la red)
    { x: 120, y: 80 }, // Posición 4 (Punta izquierda)
    { x: 225, y: 80 }, // Posición 3 (Central)
    { x: 330, y: 80 }, // Posición 2 (Opuesta/Punta derecha)

    // Línea de fondo (zona de defensa)
    { x: 120, y: 280 }, // Posición 5 (Líbero/Defensa izquierda)
    { x: 225, y: 280 }, // Posición 6 (Defensa central)
    { x: 330, y: 280 }, // Posición 1 (Colocadora/Defensa derecha)
  ]
}

// Posiciones en el banquillo - 2 BANCOS con 3 JUGADORAS cada uno
const getBenchPositions = () => {
  return [
    // Banco superior - 3 jugadoras bien separadas
    { x: 120, y: 80 }, // Izquierda banco superior
    { x: 250, y: 80 }, // Centro banco superior
    { x: 380, y: 80 }, // Derecha banco superior

    // Banco inferior - 3 jugadoras bien separadas - MUY ABAJO
    { x: 120, y: 240 }, // Izquierda banco inferior
    { x: 250, y: 240 }, // Centro banco inferior
    { x: 380, y: 240 }, // Derecha banco inferior
  ]
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function VolleyballGame() {
  const [showIntro, setShowIntro] = useState(true)
  const [players, setPlayers] = useState<PlayerData[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [showUploader, setShowUploader] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<{ file: File; name: string }[]>([])
  const [photoUrls, setPhotoUrls] = useState<{ [key: string]: string }>({})
  const [showWheel, setShowWheel] = useState(false)
  const [wheelSize, setWheelSize] = useState<"large" | "small">("large")
  const [playersAppearing, setPlayersAppearing] = useState(false)

  const initializePlayers = useCallback(
    (photos?: { file: File; name: string }[]) => {
      const fieldPositions = getVolleyballPositions()
      const benchPositions = getBenchPositions()
      const positionKeys = shuffleArray(Object.keys(posicionesData))
      const injuryKeys = shuffleArray(Object.keys(lesionesData))
      const initialPlayers: PlayerData[] = []

      const playersData = photos || uploadedPhotos

      if (playersData.length > 0) {
        // Seleccionar fotos aleatoriamente si hay más de 12
        let selectedPhotos = playersData
        if (playersData.length > 12) {
          const shuffledIndices = shuffleArray([...Array(playersData.length).keys()])
          selectedPhotos = shuffledIndices.slice(0, 12).map((i) => playersData[i])
        }

        // Determinar cuántas van al campo (máximo 6) y cuántas al banquillo
        const healthyCount = Math.min(6, selectedPhotos.length)
        const injuredCount = Math.max(0, selectedPhotos.length - 6)

        // Mezclar las fotos seleccionadas para asignación aleatoria
        const shuffledPhotos = shuffleArray(selectedPhotos)

        // Jugadoras sanas (máximo 6)
        for (let i = 0; i < healthyCount; i++) {
          const positionKey = positionKeys[i % positionKeys.length]
          const photoData = shuffledPhotos[i]
          initialPlayers.push({
            id: i + 1,
            name: photoData.name.replace(/_/g, " "),
            faceImage: `uploaded_${playersData.indexOf(photoData)}`,
            isHealthy: true,
            position: fieldPositions[i],
            positionName: posicionesData[positionKey as keyof typeof posicionesData],
            isVisible: false,
          })
        }

        // Jugadoras lesionadas (el resto, máximo 6)
        for (let i = healthyCount; i < selectedPhotos.length && i < 12; i++) {
          const injuryKey = injuryKeys[(i - healthyCount) % injuryKeys.length]
          const photoData = shuffledPhotos[i]
          initialPlayers.push({
            id: i + 1,
            name: photoData.name.replace(/_/g, " "),
            faceImage: `uploaded_${playersData.indexOf(photoData)}`,
            isHealthy: false,
            position: benchPositions[i - healthyCount],
            injury: lesionesData[injuryKey as keyof typeof lesionesData],
            isVisible: false,
          })
        }

        // Completar con jugadoras sin foto si es necesario (hasta 12 total)
        const totalPlayers = initialPlayers.length
        const defaultNames = ["Raquel", "Rachel", "Queli", "Rak"]

        // Completar sanas hasta 6 si es necesario
        for (let i = healthyCount; i < 6 && totalPlayers + (i - healthyCount) < 12; i++) {
          const positionKey = positionKeys[i % positionKeys.length]
          initialPlayers.push({
            id: totalPlayers + (i - healthyCount) + 1,
            name: defaultNames[(totalPlayers + (i - healthyCount)) % 4],
            faceImage: `default_${totalPlayers + (i - healthyCount) + 1}`,
            isHealthy: true,
            position: fieldPositions[i],
            positionName: posicionesData[positionKey as keyof typeof posicionesData],
            isVisible: false,
          })
        }

        // Completar lesionadas hasta 12 total
        const currentTotal = initialPlayers.length
        for (let i = currentTotal; i < 12; i++) {
          const injuryKey = injuryKeys[(i - 6) % injuryKeys.length]
          initialPlayers.push({
            id: i + 1,
            name: defaultNames[i % 4],
            faceImage: `default_${i + 1}`,
            isHealthy: false,
            position: benchPositions[i - 6],
            injury: lesionesData[injuryKey as keyof typeof lesionesData],
            isVisible: false,
          })
        }
      } else {
        // Sin fotos: usar nombres por defecto
        const defaultNames = ["Raquel", "Rachel", "Queli", "Rak"]
        const repeatedNames = []
        for (let i = 0; i < 12; i++) {
          repeatedNames.push(defaultNames[i % 4])
        }

        for (let i = 0; i < 6; i++) {
          const positionKey = positionKeys[i]
          initialPlayers.push({
            id: i + 1,
            name: repeatedNames[i],
            faceImage: `default_${i + 1}`,
            isHealthy: true,
            position: fieldPositions[i],
            positionName: posicionesData[positionKey as keyof typeof posicionesData],
            isVisible: false,
          })
        }

        for (let i = 6; i < 12; i++) {
          const injuryKey = injuryKeys[i - 6]
          initialPlayers.push({
            id: i + 1,
            name: repeatedNames[i],
            faceImage: `default_${i + 1}`,
            isHealthy: false,
            position: benchPositions[i - 6],
            injury: lesionesData[injuryKey as keyof typeof lesionesData],
            isVisible: false,
          })
        }
      }

      setPlayers(initialPlayers)
    },
    [uploadedPhotos],
  )

  // Animación de aparición de jugadoras - memoizada para evitar recreación
  const animatePlayersAppearance = useCallback(() => {
    setPlayersAppearing(true)

    // Hacer aparecer jugadoras una por una
    players.forEach((_, index) => {
      setTimeout(() => {
        setPlayers((prev) => prev.map((player, i) => (i === index ? { ...player, isVisible: true } : player)))
      }, index * 250) // 0.25 segundos entre cada aparición
    })

    setTimeout(
      () => {
        setPlayersAppearing(false)
      },
      players.length * 250 + 500,
    )
  }, [players.length]) // Solo depende de la longitud del array

  useEffect(() => {
    if (!showIntro) {
      initializePlayers()
    }
  }, [showIntro, initializePlayers])

  const handlePhotosUploaded = useCallback((photos: { file: File; name: string }[]) => {
    setUploadedPhotos(photos)
    const urls: { [key: string]: string } = {}
    photos.forEach((photo, index) => {
      urls[`uploaded_${index}`] = URL.createObjectURL(photo.file)
    })
    setPhotoUrls(urls)

    // Mostrar animación de ruleta
    setShowWheel(true)
    setWheelSize("large")
    setIsSpinning(true)
  }, [])

  // Función memoizada para completar el spin
  const handleWheelSpinComplete = useCallback(() => {
    setIsSpinning(false)
    setWheelSize("small")
    initializePlayers(uploadedPhotos)

    // Iniciar animación de aparición después de un breve delay
    setTimeout(() => {
      animatePlayersAppearance()
    }, 500)
  }, [uploadedPhotos, initializePlayers, animatePlayersAppearance])

  const handleSpin = useCallback(() => {
    setShowWheel(true)
    setWheelSize("large")
    setIsSpinning(true)

    // Ocultar todas las jugadoras
    setPlayers((prev) => prev.map((player) => ({ ...player, isVisible: false })))
  }, [])

  const handleSmallWheelClick = useCallback(() => {
    handleSpin()
  }, [handleSpin])

  const shareApp = useCallback(() => {
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
  }, [])

  // Memoizar los jugadores filtrados
  const healthyPlayers = useMemo(() => players.filter((p) => p.isHealthy), [players])
  const injuredPlayers = useMemo(() => players.filter((p) => !p.isHealthy), [players])

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-4xl font-bold text-green-800">🎯 LA RULETA PATALETA</h1>
              {showWheel && wheelSize === "small" && (
                <SpinningWheel
                  isSpinning={false}
                  onSpinComplete={handleWheelSpinComplete}
                  isSmall={true}
                  onClick={handleSmallWheelClick}
                />
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowUploader(true)}
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-2xl shadow-lg"
              >
                <Camera className="h-4 w-4 mr-2" />
                SUBE LAS FOTOS
              </Button>
              <Button onClick={shareApp} variant="outline" className="rounded-2xl bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Ruleta grande centrada */}
      {showWheel && wheelSize === "large" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <SpinningWheel isSpinning={isSpinning} onSpinComplete={handleWheelSpinComplete} isSmall={false} />
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* 1. Campo con jugadoras sanas */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-green-700 text-center">
              🏐 Las Sanas - En el Campo
            </h2>
            <div className="flex justify-center">
              <FieldComponent isSpinning={playersAppearing}>
                {healthyPlayers.map((player) => (
                  <PlayerComponent
                    key={player.id}
                    player={player}
                    onClick={() => {}}
                    isSpinning={playersAppearing}
                    photoUrl={photoUrls[player.faceImage]}
                  />
                ))}
              </FieldComponent>
            </div>
            <div className="mt-4 text-center text-gray-600">Jugadoras sanas: {healthyPlayers.length}</div>
          </div>

          {/* 2. Lista de posiciones */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <h2 className="text-xl font-bold mb-4 text-green-700 text-center flex items-center justify-center gap-2">
              ⚡ Posiciones en Campo
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {healthyPlayers.map((player) => (
                <div key={player.id} className="bg-green-50 rounded-lg p-2 border-l-2 border-green-500 text-center">
                  <div className="font-bold text-green-800 text-sm">{player.name}</div>
                  <div className="text-green-600 bg-green-100 px-1 py-0.5 rounded-full text-xs inline-block mt-1">
                    {player.positionName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Banquillo con jugadoras lesionadas */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-red-700 text-center">
              🏥 Las Tullis - Regando Plantitas en el Banquillo
            </h2>
            <div className="flex justify-center">
              <ImprovedBench isSpinning={playersAppearing}>
                {injuredPlayers.map((player) => (
                  <PlayerComponent
                    key={player.id}
                    player={player}
                    onClick={() => {}}
                    isSpinning={playersAppearing}
                    photoUrl={photoUrls[player.faceImage]}
                  />
                ))}
              </ImprovedBench>
            </div>
            <div className="mt-4 text-center text-gray-600">Jugadoras lesionadas: {injuredPlayers.length}</div>
          </div>

          {/* 4. Lista de lesiones */}
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <h2 className="text-xl font-bold mb-4 text-red-700 text-center flex items-center justify-center gap-2">
              🏥 Parte de Lesiones
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {injuredPlayers.map((player) => (
                <div key={player.id} className="bg-red-50 rounded-lg p-2 border-l-2 border-red-500 text-center">
                  <div className="font-bold text-red-800 text-sm">{player.name}</div>
                  <div className="text-red-600 bg-red-100 px-1 py-0.5 rounded-full text-xs inline-block mt-1">
                    {player.injury}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón de redistribuir como ruleta */}
          {(!showWheel || wheelSize === "small") && (
            <div className="text-center">
              <RouletteButton
                onClick={handleSpin}
                disabled={isSpinning || playersAppearing}
                isSpinning={isSpinning || playersAppearing}
              />
            </div>
          )}
        </div>
      </div>

      {/* Photo Uploader Modal */}
      {showUploader && (
        <div className="fixed inset-0 bg-red-500/30 backdrop-blur-sm z-50">
          <PhotoUploaderComponent onPhotosUploaded={handlePhotosUploaded} onClose={() => setShowUploader(false)} />
        </div>
      )}
    </div>
  )
}
