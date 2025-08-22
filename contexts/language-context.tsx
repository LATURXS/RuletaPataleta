"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  getPositions: () => Record<string, string>
  getInjuries: () => Record<string, string>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traducciones cargadas dinámicamente
const translations: Record<Language, any> = {
  es: {},
  en: {},
}

const positions: Record<Language, any> = {
  es: {},
  en: {},
}

const injuries: Record<Language, any> = {
  es: {},
  en: {},
}

// Función para interpolar parámetros en las traducciones
const interpolate = (text: string, params?: Record<string, string | number>): string => {
  if (!params) return text

  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`{${key}}`, "g"), String(value))
  }, text)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar traducciones al inicializar
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Cargar traducciones principales
        const [esMain, enMain] = await Promise.all([
          import("@/data/translations/es.json"),
          import("@/data/translations/en.json"),
        ])

        translations.es = esMain.default
        translations.en = enMain.default

        // Cargar posiciones
        const [esPos, enPos] = await Promise.all([
          import("@/data/translations/posiciones-es.json"),
          import("@/data/translations/posiciones-en.json"),
        ])

        positions.es = esPos.default
        positions.en = enPos.default

        // Cargar lesiones
        const [esInj, enInj] = await Promise.all([
          import("@/data/translations/lesiones-es.json"),
          import("@/data/translations/lesiones-en.json"),
        ])

        injuries.es = esInj.default
        injuries.en = enInj.default

        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading translations:", error)
        setIsLoaded(true) // Continuar aunque haya error
      }
    }

    loadTranslations()
  }, [])

  // Función de traducción
  const t = (key: string, params?: Record<string, string | number>): string => {
    if (!isLoaded) return key

    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }

    if (value === undefined) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`)
      return key
    }

    return interpolate(value, params)
  }

  const getPositions = () => positions[language] || {}
  const getInjuries = () => injuries[language] || {}

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getPositions,
        getInjuries,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
