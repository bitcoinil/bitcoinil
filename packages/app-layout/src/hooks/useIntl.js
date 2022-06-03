/* eslint-disable no-unreachable */

import { useState } from "react"
import { messages_en } from "../translations/en"
import { messages_il } from "../translations/il"

export const useIntl = () => {
  const [language, setLanguage] = useState("en")

  const messages = {
    il: messages_il,
    en: messages_en,
  }

  const availableLanguages = ["en", "il"]
  return {
    language,
    setLanguage,
    messages,
    availableLanguages,
  }
}
