import '@djitsu/themes/dist/themes/main-theme/main-theme-main-light.css'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import DevTools from './DevTools'
import Header from './Header'
// import { useNavigate } from 'react-router-dom'
import { useIntl } from './hooks/useIntl'
import Support from './support'
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { mainMenuItems } from './mainMenuItems'
import HomePage from './HomePage'
import { nonMenuRoutes } from './nonMenuRoutes'

function App(): JSX.Element {
  const { language, messages, locale } = useIntl()

  const renderRoutes = () => (
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
          <Route key={i} path={`/${menuItem.key}`} element={menuItem.element} />
        )
      })}

      {nonMenuRoutes.map((route) => {
        console.log({ route })
        return (
          <Route
            key={route.key}
            path={`/${route.path}`}
            element={route.element}
          />
        )
      })}

      <Route path="*" element={<HomePage />} />
    </Routes>
  )

  return (
    <AppStyleWrap id="App">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <IntlProvider
        messages={messages[language]}
        locale={locale}
        defaultLocale="en"
      >
        <div className="App">
          {/* <DevTools /> */}
          <Support />
          <Header />
          {renderRoutes()}
        </div>
      </IntlProvider>
    </AppStyleWrap>
  )
}

export default App

const AppStyleWrap = styled.div`
  font-family: 'Titillium Web', sans-serif;
  font-weight: bolder;
  letter-spacing: 0.4px;
`
