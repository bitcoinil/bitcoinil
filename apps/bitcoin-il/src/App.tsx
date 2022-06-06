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

function App(): JSX.Element {
  const { language, messages, locale } = useIntl()

  return (
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
  )
}

export default App
