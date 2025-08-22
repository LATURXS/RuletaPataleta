"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { X, Upload, Camera, Trash2 } from "lucide-react"

interface PhotoUploaderComponentProps {
  onPhotosUploaded: (photos: { file: File; name: string }[]) => void
  onClose: () => void
}

export function PhotoUploaderComponent({ onPhotosUploaded, onClose }: PhotoUploaderComponentProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<{ file: File; name: string; preview: string }[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return

    const newPhotos: { file: File; name: string; preview: string }[] = []

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const name = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ")
        const preview = URL.createObjectURL(file)
        newPhotos.push({ file, name, preview })
      }
    })

    setSelectedPhotos((prev) => [...prev, ...newPhotos])
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removePhoto = (index: number) => {
    setSelectedPhotos((prev) => {
      const newPhotos = [...prev]
      URL.revokeObjectURL(newPhotos[index].preview)
      newPhotos.splice(index, 1)
      return newPhotos
    })
  }

  const updatePhotoName = (index: number, newName: string) => {
    setSelectedPhotos((prev) => prev.map((photo, i) => (i === index ? { ...photo, name: newName } : photo)))
  }

  const handleSubmit = () => {
    if (selectedPhotos.length === 0) return

    const photosData = selectedPhotos.map(({ file, name }) => ({ file, name }))
    onPhotosUploaded(photosData)
    onClose()
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">📸 Sube las Fotos de las Jugadoras</h2>
            <p className="text-blue-100 mt-1">Arrastra las fotos o haz clic para seleccionar</p>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Zona de arrastrar y soltar */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              isDragging
                ? "border-blue-500 bg-blue-50 scale-105"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="space-y-4">
              <div className="text-6xl">{isDragging ? "📥" : "📷"}</div>
              <div>
                <p className="text-xl font-semibold text-gray-700">
                  {isDragging ? "¡Suelta las fotos aquí!" : "Arrastra las fotos aquí"}
                </p>
                <p className="text-gray-500 mt-2">O haz clic en el botón para seleccionar archivos</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="photo-input"
              />
              <label htmlFor="photo-input">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer">
                  <Upload className="h-5 w-5 mr-2" />
                  Seleccionar Fotos
                </Button>
              </label>
            </div>
          </div>

          {/* Fotos seleccionadas */}
          {selectedPhotos.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Fotos Seleccionadas ({selectedPhotos.length})
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all duration-300">
                      {/* Imagen */}
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={photo.preview || "/placeholder.svg"}
                          alt={photo.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Botón eliminar */}
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Nombre editable */}
                      <div className="p-3">
                        <input
                          type="text"
                          value={photo.name}
                          onChange={(e) => updatePhotoName(index, e.target.value)}
                          className="w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2 py-1"
                          placeholder="Nombre de la jugadora"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {selectedPhotos.length > 0 && (
                <span>
                  {selectedPhotos.length} foto{selectedPhotos.length !== 1 ? "s" : ""} seleccionada
                  {selectedPhotos.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <Button onClick={onClose} variant="outline" className="px-6 py-2 rounded-xl bg-transparent">
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={selectedPhotos.length === 0}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-2 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🎯 ¡Empezar Pataleta!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
