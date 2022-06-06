import * as React from 'react'
import { messages_en } from '../translations/en'
import { messages_he } from '../translations/he'

export const useIntl = () => {
  const [language, setLanguage] = React.useState('en')
  const [locale, setLocale] = React.useState('en')

  const messages = {
    he: messages_he,
    en: messages_en
  }

  React.useEffect(() => {
    if (language === 'he') setLocale('il')
    setLocale(language)
  }, [language])

  const availableLanguages = [
    { name: 'en', icon: '🇬🇧', locale: 'en' },
    { name: 'he', icon: '🇮🇱', locale: 'il' }
  ]
  return {
    language,
    setLanguage,
    messages,
    availableLanguages,
    locale
  }
}
