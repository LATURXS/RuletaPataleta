"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, X, Camera } from "lucide-react"

interface PhotoUploaderComponentProps {
  onPhotosUploaded: (photos: { file: File; name: string }[]) => void
  onClose: () => void
}

export function PhotoUploaderComponent({ onPhotosUploaded, onClose }: PhotoUploaderComponentProps) {
  const [photos, setPhotos] = useState<{ file: File; name: string; preview: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const preview = e.target?.result as string
          const name = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "_")

          setPhotos((prev) => [
            ...prev,
            {
              file,
              name: name || `jugadora_${Date.now()}`,
              preview,
            },
          ])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const updateName = (index: number, newName: string) => {
    setPhotos((prev) => prev.map((photo, i) => (i === index ? { ...photo, name: newName } : photo)))
  }

  const handleUpload = () => {
    if (photos.length >= 1) {
      onPhotosUploaded(photos)
      onClose()
    }
  }

  const getDistributionText = () => {
    const count = photos.length
    if (count === 0) return "Sube al menos 1 foto para empezar"
    if (count <= 6) return `${count} sanas (con foto), ${6 - count} sanas (😊), 6 tullis (🤕)`
    if (count <= 12) return `6 sanas (con foto), ${count - 6} tullis (con foto), ${12 - count} tullis (🤕)`
    return `6 sanas + 6 tullis elegidas aleatoriamente de tus ${count} fotos`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">📸 Subir Fotos de Jugadoras</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-600 text-sm">Sube cualquier cantidad de fotos. La app se adapta automáticamente.</p>
          <p className="text-blue-600 text-sm font-medium">{getDistributionText()}</p>
        </CardHeader>

        <CardContent className="space-y-4 p-4">
          {/* Área de subida */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm font-medium mb-1">Selecciona las fotos de las jugadoras</p>
            <p className="text-gray-500 text-xs mb-3">Arrastra y suelta o haz clic para seleccionar</p>
            <Button size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-3 w-3 mr-1" />
              Seleccionar Fotos
            </Button>
          </div>

          {/* Vista previa de fotos */}
          {photos.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Fotos Subidas ({photos.length})</h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square rounded overflow-hidden border border-gray-200">
                      <img
                        src={photo.preview || "/placeholder.svg"}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                        style={{ height: "48px" }}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                    <div className="mt-1">
                      <Input
                        value={photo.name}
                        onChange={(e) => updateName(index, e.target.value)}
                        className="text-xs h-6 p-1"
                        style={{ fontSize: "10px" }}
                        placeholder="Nombre"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-between items-center pt-2 border-t">
            <p className="text-xs text-gray-500">
              {photos.length === 0 ? "Sube al menos 1 foto" : `¡Perfecto! Tienes ${photos.length} fotos`}
            </p>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={photos.length === 0}
                className="bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                USAR ESTAS FOTOS
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
