import '@djitsu/themes/dist/themes/main-theme/main-theme-main-light.css'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Header, mainMenuItems, Support } from 'app-layout'
import * as React from 'react'
// import { useNavigate } from 'react-router-dom'

import { useIntl } from 'app-layout'

import { FormattedMessage, IntlProvider } from 'react-intl'

import { Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const { language, messages, setLanguage } = useIntl()
  const navigate = useNavigate()

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
      messages={messages[language]}
      locale={language === 'il' ? 'he' : language}
      defaultLocale="en"
    >
      <button onClick={() => setLanguage('il')}>Switch To He</button>
      <p>
        YOYOYOYO{'          '}
        <FormattedMessage
          id="app.text"
          defaultMessage="This is some text"
          description="Link on react page"
        />
      </p>
      <div className="App">
        <Support />
        <Header
          setLanguage={setLanguage}
          FormattedMessage={FormattedMessage}
          navigate={navigate}
        />
        {renderRoutes()}
      </div>
    </IntlProvider>
  )
}

export default App

const Home = () => {
  return <p>Home Page Here</p>
}
