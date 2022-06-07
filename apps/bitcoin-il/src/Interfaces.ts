import * as React from 'react'
export interface ClickedMenuItemData {
  key: string
  keyPath: [string]
}

export interface MainMenuItem {
  key: string
  label: string
  submenu: [MainMenuItem]
}

export interface RoutePageProps {
  title: string
  subtitle: string
  body: JSX.Element
  id: string
}

export interface AvailableLanguageData {
  icon: string | JSX.Element
  locale: string
  name: string
}

export interface SiteButtonProps {
  onClick?: Function
  type?: any
  children: React.ReactNode
}

export interface TranslationDictionary {
  [key: string]: string
}

export interface StyledSupportProps {
  onClick: Function
  isExtended: boolean
}

export interface Messages {
  [key: string]: TranslationDictionary
}
