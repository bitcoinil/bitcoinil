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
      <IntlProvider
        messages={messages[language]}
        locale={language}
        defaultLocale="en"
      >
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
          {/* <Route
          path="/individuals"
          element={
            <RoutePage
              title="Individuals"
              subtitle="Bitcoin for Individuals"
              body={<h1>Individual Body</h1>}
              />
            }
        />
        <Route
        path="/businesses"
        element={
          <RoutePage
          title="Businesses"
          subtitle="Bitcoin for Businesses"
          body={<h1>Businesses Body</h1>}
          />
        }
        />
        <Route
        path="/developers"
        element={
          <RoutePage
          title="Developers"
          subtitle="Developer Info"
          body={<h1>Developers Body</h1>}
          />
        }
        />
        <Route
        path="/getting-started"
        element={
          <RoutePage
          title="Getting Started"
          subtitle="Getting Started"
          body={<h1>Getting Started Body</h1>}
          />
        }
        />
        <Route
        path="/how-it-works"
        element={
          <RoutePage
          title="How It Works"
          subtitle="How It Works"
          body={<h1>How it Works Body</h1>}
          />
        }
        />
        <Route
          path="/white-paper"
          element={
            <RoutePage
            title="White Paper"
            subtitle="White Paper"
              body={<h1>White Paper Body</h1>}
              />
            }
            />
            <Route
            path="/innovation"
            element={
              <RoutePage
              title="Innovations"
              subtitle="Innovations"
              body={<h1>Innovations Body</h1>}
              />
            }
          /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </IntlProvider>
    )
  }

  return (
    <IntlProvider
      messages={messages[language]}
      locale={language}
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
