import '@djitsu/themes/dist/themes/main-theme/main-theme-main-light.css'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { Route, Routes } from 'react-router-dom'
import DevTools from './DevTools'
import Header from './Header'
// import { useNavigate } from 'react-router-dom'
import { useIntl } from './hooks/useIntl'
import { mainMenuItems } from './mainMenuItems'
import Support from './support'

function App(): JSX.Element {
  const { language, messages, setLanguage, locale } = useIntl()

  const renderRoutes = () => {
    return (
      <Routes>
        {mainMenuItems.map((menuItem, i) => {
          const { submenu } = menuItem

          if (submenu) {
            return submenu.map((subMenuItem, ii) => {
              return (
                <Route
                  key={`submenu-item-${ii}`}
                  path={`/${subMenuItem.key}`}
                  element={subMenuItem.element}
                />
              )
            })
          }

          return (
            <Route
              key={i}
              path={`/${menuItem.key}`}
              element={menuItem.element}
            />
          )
        })}

        <Route path="*" element={<Home />} />
      </Routes>
    )
  }

  return (
    <IntlProvider
      // @ts-ignore
      messages={messages[language]}
      locale={locale}
      defaultLocale="en"
    >
      <div className="App">
        <DevTools />
        <Support />
        <Header />
        {renderRoutes()}
      </div>
    </IntlProvider>
  )
}

export default App

const Home = () => {
  return <p>Home Page Here</p>
}
