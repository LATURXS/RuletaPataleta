"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Upload, Check } from "lucide-react"

interface PhotoUploaderComponentProps {
  onPhotosUploaded: (photos: { file: File; name: string }[]) => void
  onClose: () => void
}

export function PhotoUploaderComponent({ onPhotosUploaded, onClose }: PhotoUploaderComponentProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<{ file: File; name: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const photoData = files.map((file) => ({
      file,
      name: file.name.replace(/\.[^/.]+$/, ""), // Remover extensión
    }))
    setSelectedPhotos(photoData)
  }

  const handleUsePhotos = () => {
    if (selectedPhotos.length > 0) {
      onPhotosUploaded(selectedPhotos)
      onClose()
    } else {
      alert("Necesitas subir al menos 1 foto para jugar")
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">📸 Sube las Fotos de tus Jugadoras</h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-600 mb-4 text-sm">
            Sube las fotos de tus jugadoras. Los nombres de los archivos se usarán como nombres de las jugadoras.
            {selectedPhotos.length < 12 && selectedPhotos.length > 0 && (
              <span className="block mt-1 text-orange-600 font-medium">
                📝 Con {selectedPhotos.length} fotos: {Math.min(6, selectedPhotos.length)} sanas,{" "}
                {Math.max(0, selectedPhotos.length - 6)} tullis
              </span>
            )}
            {selectedPhotos.length >= 12 && (
              <span className="block mt-1 text-green-600 font-medium">
                ✅ Con {selectedPhotos.length} fotos: Se elegirán 12 al azar (6 sanas, 6 tullis)
              </span>
            )}
          </p>

          {/* File Input */}
          <div className="mb-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-2xl"
            >
              <Upload className="h-4 w-4 mr-2" />
              SELECCIONAR FOTOS
            </Button>
          </div>

          {/* Selected Photos - MÁS PEQUEÑAS */}
          {selectedPhotos.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-base mb-2">
                Fotos seleccionadas: {selectedPhotos.length}
                {selectedPhotos.length > 0 && <span className="text-green-600 ml-2">✅</span>}
              </h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-40 overflow-y-auto">
                {selectedPhotos.map((photo, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={URL.createObjectURL(photo.file) || "/placeholder.svg"}
                      alt={photo.name}
                      className="w-full h-12 object-cover rounded border border-gray-200"
                    />
                    <p className="text-xs mt-1 truncate text-gray-600" style={{ fontSize: "10px" }}>
                      {photo.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button
              onClick={handleUsePhotos}
              disabled={selectedPhotos.length === 0}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              <Check className="h-4 w-4 mr-2" />
              USAR ESTAS FOTOS ({selectedPhotos.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
