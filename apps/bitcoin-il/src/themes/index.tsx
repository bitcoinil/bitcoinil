import * as React from 'react'
import { themes } from '@djitsu/themes'
import type { CompiledTheme, CompiledVariant } from '@djitsu/themes'
import { Helmet } from 'react-helmet'
import { createGlobalStyle } from 'styled-components'
import { Button } from 'antd'

const { createContext, useContext, useMemo, useState } = React

export type ThemeContextValue = [ThemeContextState, ThemeContextActions]
export interface ThemeContextState {
  themes: CompiledTheme[]
  active: {
    theme: string
    variant?: string
    isDark: boolean
  }
  debug: {
    hrefLight?: string
    hrefDark?: string
  }
}
export interface ThemeContextActions {
  setTheme: (theme: string, variant?: string) => void
}
const defaultThemeContext: ThemeContextValue = [
  { themes: [], active: { theme: '', variant: '', isDark: false }, debug: {} },
  { setTheme: () => {} }
]
const ThemeContext = createContext(defaultThemeContext)

type Props = {
  children: JSX.Element
}
const Theme = ({ children }: Props) => {
  const [selectedTheme, selectedVariant] = ['main-theme', '']
  const [activeState, setActiveState] = useState({
    theme: selectedTheme,
    variant: selectedVariant,
    isDark: false
  })

  const state = {
    themes,
    active: activeState,
    debug: {}
  }

  const actions = {
    setTheme: (theme: string, variant?: string) => {
      setActiveState((v) => ({ ...v, theme, variant: variant || '' }))
    }
  }

  const [hrefLight, hrefDark] =
    useMemo(() => {
      const theme = themes.find(
        ({ name }: CompiledTheme) => state.active.theme === name
      )
      if (!theme) return null

      if (!state.active.variant) {
        const variantLight = theme.variants.find(
          ({ isDark }: CompiledVariant) => !isDark
        )
        const variantDark = theme.variants.find(
          ({ isDark }: CompiledVariant) => isDark
        )
        return [
          variantLight && `./themes/${variantLight.css}`,
          variantDark && `./themes/${variantDark.css}`
        ]
      }
      const variant = theme?.variants.find(
        ({ name }: CompiledVariant) => state.active.variant === name
      )

      if (!variant) return null

      return [`./themes/${variant.css}`]
    }, [state.active.variant, state.active.theme]) || []

  const fontHref = useMemo(() => {
    const theme = themes.find(
      ({ name }: CompiledTheme) => state.active.theme === name
    )
    if (!theme) return null

    return theme.fontStylesheet
  }, [state.active.theme])

  state.debug = { hrefLight, hrefDark, fontHref }

  return (
    <ThemeContext.Provider value={[state, actions]}>
      <Helmet>
        {hrefLight && (
          <link
            rel="stylesheet"
            href={hrefLight}
            media={hrefDark && '(prefers-color-scheme: light)'}
          />
        )}
        {hrefDark && (
          <link
            rel="stylesheet"
            href={hrefDark}
            media="(prefers-color-scheme: dark)"
          />
        )}
        {fontHref && <link rel="stylesheet" href={fontHref} />}
      </Helmet>
      <GlobalStyle />
      <div className='themer'>
        <h2>This is theme stuff</h2>
        <Button type='primary'>IMMA BUTTON</Button>

        <pre>{JSON.stringify(themes, null, 2)}</pre>
        <Button
          onClick={() => {
            actions.setTheme('ayu-and-one-theme', 'one-darker')
          }}
        >
          Change to Dark
        </Button>
      </div>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

const GlobalStyle = createGlobalStyle`
  html body {
    background: none;
  }
`

export default Theme
