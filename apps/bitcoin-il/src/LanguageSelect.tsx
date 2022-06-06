import { Menu } from 'antd'
import * as React from 'react'
// import { FormattedMessage, IntlProvider } from "react-intl"
import styled from 'styled-components'
import { useIntl } from './hooks/useIntl'

export default function LanguageSelect(): JSX.Element {
  const intl = useIntl()
  const { setLanguage, availableLanguages } = intl
  const [current, setCurrent] = React.useState('en')

  const onClick = (e: any) => {
    setLanguage(e.key)
    setCurrent(e.key)
  }

  return (
    <StyledLanguageSelect
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Menu.SubMenu
        key={'lang'}
        title={<p className="collapsable-menu">{current}</p>}
      >
        {availableLanguages.map((avLang) => {
          return (
            <Menu.Item key={avLang.name} onClick={() => console.log(avLang)}>
              <p>{avLang.name}</p>
            </Menu.Item>
          )
        })}
      </Menu.SubMenu>
    </StyledLanguageSelect>
  )
}

const StyledLanguageSelect = styled(Menu)`
  width: 400px;
`
