/* eslint-disable no-unreachable */

import { useState, useEffect } from "react"
import { messages_en } from "../translations/en"
import { messages_il } from "../translations/il"

export const useIntl = () => {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    console.log("🍄", language)
  }, [language])

  const messages = {
    il: messages_il,
    en: messages_en,
  }

  const availableLanguages = [
    { name: "en", icon: "🇬🇧" },
    { name: "il", icon: "🇮🇱" },
  ]
  return {
    language,
    setLanguage,
    messages,
    availableLanguages,
  }
}
