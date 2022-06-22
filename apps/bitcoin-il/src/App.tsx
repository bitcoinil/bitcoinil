import '@djitsu/themes/dist/themes/main-theme/main-theme-main-light.css'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import Header from './Header'
import { Helmet } from 'react-helmet'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { phoneDevices } from './breakpoints'
import Footer from './Footer'
import HomePage from './HomePage'
import { useIntl } from './hooks/useIntl'
import { mainMenuItems } from './mainMenuItems'
import { nonMenuRoutes } from './nonMenuRoutes'
import Support from './support'
import locales from '@bitil/locales'
import Theme from './themes'

function App(): JSX.Element {
  // const { language, messages, locale } = useIntl()
  const [ln, setLn] = React.useState('en')
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

  console.error = (e) => {
    if (typeof e === 'string') console.log('🛑🛑🛑 ', e)
    else {
      console.log('🛑🛑🛑 Supressed Error')
    }
  }

  return (
    <Theme>
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
          // @ts-ignore
          messages={locales[ln]}
          locale={ln}
          defaultLocale="en"
        >
          <div className="App">
            {/* <DevTools /> */}
            <Support />
            <Header setLanguage={setLn} />
            {renderRoutes()}
          </div>
          <Footer />
        </IntlProvider>
      </AppStyleWrap>
    </Theme>
  )
}

export default App

const AppStyleWrap = styled.div`
  font-family: 'Titillium Web', sans-serif;
  font-weight: bolder;
  letter-spacing: 0.4px;

  ${phoneDevices} {
    width: 100vw;
  }
`
