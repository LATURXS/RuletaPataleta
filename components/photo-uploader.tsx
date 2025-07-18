"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Camera } from "lucide-react"

interface PhotoUploaderProps {
  onPhotosUploaded: (photos: { file: File; name: string }[]) => void
  onClose: () => void
}

export function PhotoUploader({ onPhotosUploaded, onClose }: PhotoUploaderProps) {
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
    if (photos.length >= 12) {
      onPhotosUploaded(photos.slice(0, 12))
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">📸 Subir Fotos de Jugadoras</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-600">
            Sube al menos 12 fotos de las jugadoras. Puedes editar los nombres antes de confirmar.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Área de subida */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">Selecciona las fotos de las jugadoras</p>
            <p className="text-gray-500 mb-4">Arrastra y suelta o haz clic para seleccionar</p>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Seleccionar Fotos
            </Button>
          </div>

          {/* Vista previa de fotos */}
          {photos.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Fotos Subidas ({photos.length}/12 mínimo)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={photo.preview || "/placeholder.svg"}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <div className="mt-2">
                      <Label htmlFor={`name-${index}`} className="text-xs">
                        Nombre:
                      </Label>
                      <Input
                        id={`name-${index}`}
                        value={photo.name}
                        onChange={(e) => updateName(index, e.target.value)}
                        className="text-xs h-8"
                        placeholder="Nombre de la jugadora"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              {photos.length < 12
                ? `Necesitas ${12 - photos.length} fotos más`
                : `¡Perfecto! Tienes ${photos.length} fotos`}
            </p>
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={photos.length < 12}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Usar Estas Fotos ({Math.min(photos.length, 12)})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
