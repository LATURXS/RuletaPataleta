"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"

interface PhotoUploaderProps {
  onPhotosUploaded: (photos: { file: File; name: string }[]) => void
  onClose: () => void
}

export function PhotoUploader({ onPhotosUploaded, onClose }: PhotoUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(files)

    // Crear previews
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews(newPreviews)
  }, [])

  const handleUpload = useCallback(() => {
    if (selectedFiles.length > 0) {
      const photosWithNames = selectedFiles.map((file) => ({
        file,
        name: file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
      }))
      onPhotosUploaded(photosWithNames)
      onClose()
    }
  }, [selectedFiles, onPhotosUploaded, onClose])

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index)
      const newPreviews = previews.filter((_, i) => i !== index)
      setSelectedFiles(newFiles)
      setPreviews(newPreviews)
    },
    [selectedFiles, previews],
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-green-700">📸 Subir Fotos de Jugadoras</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Área de subida */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Haz clic para seleccionar fotos</p>
              <p className="text-sm text-gray-500">Puedes subir múltiples fotos a la vez</p>
            </label>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Fotos seleccionadas ({previews.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 rounded-b-lg truncate">
                      {selectedFiles[index]?.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Usar Fotos ({selectedFiles.length})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
