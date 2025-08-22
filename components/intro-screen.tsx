"use client"

import { useTranslation } from "@/contexts/language-context"

interface IntroScreenProps {
  onComplete: () => void
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center z-50 p-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Pelota como botón de inicio con texto JUGAR */}
        <div className="mb-8">
          <button
            onClick={onComplete}
            className="relative animate-bounce hover:scale-110 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/50 rounded-full p-4"
            aria-label={t("intro.play")}
          >
            <div className="relative">
              <span className="text-9xl">🏐</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white bg-black/70 px-3 py-1 rounded-full shadow-lg">
                  {t("intro.play")}
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Título en una línea */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 animate-pulse whitespace-nowrap">
          {t("intro.title")}
        </h1>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-800 mb-4 md:mb-6">
            {t("intro.subtitle")}
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4">{t("intro.description")}</p>

          <p className="text-xl md:text-2xl font-bold text-green-600 animate-pulse">{t("intro.funnyText")}</p>
        </div>
      </div>
    </div>
  )
}
