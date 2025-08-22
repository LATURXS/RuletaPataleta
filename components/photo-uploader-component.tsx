"use client"

import type React from "react"
import { useTranslation } from "@/contexts/language-context"
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
  const { t } = useTranslation()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    // Limitar a máximo 16 fotos
    let finalFiles = files
    let showWarning = false

    if (files.length > 16) {
      finalFiles = files.slice(0, 16)
      showWarning = true
    }

    const photoData = finalFiles.map((file) => ({
      file,
      name: file.name.replace(/\.[^/.]+$/, ""), // Remover extensión
    }))

    setSelectedPhotos(photoData)

    // Mostrar mensaje de advertencia si se intentaron subir más de 16
    if (showWarning) {
      alert(t("photoUploader.maxPhotosWarning"))
    }
  }

  const handleUsePhotos = () => {
    if (selectedPhotos.length >= 2) {
      onPhotosUploaded(selectedPhotos)
      onClose()
    } else {
      alert(t("photoUploader.minPhotosError"))
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{t("photoUploader.title")}</h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-600 mb-4 text-sm">
            {t("photoUploader.description")}
            {selectedPhotos.length < 12 && selectedPhotos.length >= 2 && (
              <span className="block mt-1 text-orange-600 font-medium">
                📝{" "}
                {t("photoUploader.photosInfo", {
                  count: selectedPhotos.length,
                  healthy: Math.min(6, selectedPhotos.length),
                  injured: Math.max(0, selectedPhotos.length - 6),
                })}
              </span>
            )}
            {selectedPhotos.length >= 12 && (
              <span className="block mt-1 text-green-600 font-medium">
                ✅ {t("photoUploader.randomSelection", { count: selectedPhotos.length })}
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
              {t("photoUploader.selectPhotos")}
            </Button>
          </div>

          {/* Selected Photos - MÁS PEQUEÑAS */}
          {selectedPhotos.length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold text-base mb-2">
                {t("photoUploader.selectedPhotos")} {selectedPhotos.length}
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
              {t("photoUploader.cancel")}
            </Button>
            <Button
              onClick={handleUsePhotos}
              disabled={selectedPhotos.length === 0}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              <Check className="h-4 w-4 mr-2" />
              {t("photoUploader.usePhotos", { count: selectedPhotos.length })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
