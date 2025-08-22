"use client"

import { useTranslation } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation()

  const languages = [
    { code: "es" as const, name: "🇪🇸 ES", flag: "🇪🇸" },
    { code: "en" as const, name: "🇬🇧 EN", flag: "🇬🇧" },
    { code: "ca" as const, name: "🏴󠁥󠁳󠁣󠁴󠁿 CA", flag: "🏴󠁥󠁳󠁣󠁴󠁿" },
  ]

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-gray-600" />
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          variant={language === lang.code ? "default" : "ghost"}
          size="sm"
          className={`px-2 py-1 text-xs ${
            language === lang.code ? "bg-green-600 text-white" : "bg-transparent text-gray-600 hover:bg-gray-100"
          }`}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  )
}
