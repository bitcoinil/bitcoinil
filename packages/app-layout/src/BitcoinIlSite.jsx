import "@djitsu/themes/dist/themes/main-theme/main-theme-main-light.css"
import "antd/dist/antd.css" // or 'antd/dist/antd.less'
// import { Header, mainMenuItems, Support } from "app-layout"
import * as React from "react"
// import { useNavigate } from 'react-router-dom'

import Header from "./Header"
import { mainMenuItems } from "./mainMenuItems"
import Support from "./support"
import { BrowserRouter as Router } from "react-router-dom"

import { useIntl } from "./hooks/useIntl"

// import { IntlProvider, FormattedMessage } from "react-intl"

import { Route, Routes } from "react-router-dom"
import ClearConsoleButton from "./ClearConsoleButton"

function BitCoinIlSite({ setLanguage, FormattedMessage }) {
  const { language, messages } = useIntl()

  React.useEffect(() => {
    console.log("🦀", language)
  }, [language])

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
    )
  }

  return (
    <>
      <h1>This is Test!</h1>
      <FormattedMessage
        id="app.text"
        defaultMessage="This is some text"
        description="Link on react page"
      />
      <ClearConsoleButton />
      {/* <FormattedMessage
        id="app.text"
        defaultMessage="This is some text"
        description="Link on react page"
      /> */}
      {/* <Router>
        <div className="App">
          <Support />
          <button
            onClick={() => {
              setLanguage("pp")
            }}
          >
            What is setLanguage
          </button>
          <Header setLanguage={() => setLanguage("pp")} />
          {renderRoutes()}
        </div>
      </Router> */}
    </>
  )
}

export default BitCoinIlSite

const Home = () => {
  return <p>Home Page Here</p>
}
