import '@djitsu/themes/dist/themes/main-theme/main-theme-main-light.css'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import RenderRoutes from './RenderRoutes'
import DevTools from './DevTools'
import Header from './Header'
// import { useNavigate } from 'react-router-dom'
import { useIntl } from './hooks/useIntl'
import Support from './support'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

function App(): JSX.Element {
  const { language, messages, locale } = useIntl()

  return (
    <AppStyleWrap>
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
          <DevTools />
          <Support />
          <Header />
          {RenderRoutes()}
        </div>
      </IntlProvider>
    </AppStyleWrap>
  )
}

export default App

const AppStyleWrap = styled.div`
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
`
