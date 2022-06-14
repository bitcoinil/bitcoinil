import * as React from 'react'
export interface ClickedMenuItemData {
  key: string
  keyPath: [string]
}
export interface MainMenuItem {
  label: JSX.Element
  key: string
  submenu?: MainMenuItem[]
  element?: React.ReactNode
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
  className?: any
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

export interface BurgerMenuMenuProps {
  setMenuOpen: Function
}

export interface QuickOverviewBox {
  index: Number
  imgSrc: string
  id: string
  titleDefaultMessage: JSX.Element
  titleDescription: string
  subtitleDefaultMessage: JSX.Element
  subtitleDescription: string
  baseFormattedMessage?: String
  link: string
}

export interface IndividualsBodyProps {}

export interface InnovationBodyProps {}

export interface BusinessBodyProps {}

export interface SupportBodyProps {}

export interface BodyCard {
  img: string
  title: JSX.Element
  text: JSX.Element
  id: string
}

export interface TimelineCompProps {
  items: React.ReactNode[]
}

export interface GettingStartedBodyProps {}

export interface TimelineItemProps {
  key: string
  title: string
  body: string
  buttonText: string
  buttonOnClick: Function
}

export interface HowItWorksProps {}

export interface AlternatingTwoColumnRowProps {
  index: number
  imgSrc: string
  titleText: JSX.Element
  bodyText: JSX.Element
}

export interface HeaderProps {
  setLanguage: Function
}

export interface LanguageSelectProps {
  setLanguage: Function
}

export interface VocabularyProps {}

export interface VocabularyTerm {
  word: JSX.Element
  definition: JSX.Element
}
