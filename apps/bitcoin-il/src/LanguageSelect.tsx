import { Menu } from 'antd'
import * as React from 'react'
// import { FormattedMessage, IntlProvider } from "react-intl"
import styled from 'styled-components'
import { phoneDevices } from './breakpoints'
import { useIntl } from './hooks/useIntl'
import { LanguageSelectProps, LongNamesForLanguageType } from './Interfaces'
import ico_angle from './img/ico_angle.svg'

const longNamesForLanguages: LongNamesForLanguageType = {
  he: 'עִברִית',
  en: 'English'
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ setLanguage }) => {
  const intl = useIntl()
  const { availableLanguages } = intl
  const [current, setCurrent] = React.useState('en')

  const onClick = (e: any) => {
    setLanguage(e.key)
    setCurrent(e.key)
  }

  return (
    <StyledLanguageSelect id="LanguageSelect">
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.SubMenu
          key={'lang'}
          title={
            <p className="collapsable-menu">
              {longNamesForLanguages[current]}{' '}
              <img className="language-select-down-arrow" src={ico_angle} />
            </p>
          }
        >
          {availableLanguages.map((avLang) => {
            return (
              <Menu.Item key={avLang.name}>
                <p>{longNamesForLanguages[avLang.name] || 'English'}</p>
              </Menu.Item>
            )
          })}
        </Menu.SubMenu>
      </Menu>
    </StyledLanguageSelect>
  )
}

const StyledLanguageSelect = styled.div`
  ${phoneDevices} {
    display: none;
  }

  .collapsable-menu {
    &:hover .language-select-down-arrow {
      transition: all 200ms;
      transform: rotate(180deg);
    }
    .language-select-down-arrow {
      transition: all 200ms;
    }
  }

  .ant-menu {
    width: 80px;
    &.ant-menu {
      background: transparent;
      border-bottom: none;
    }

    &-item {
    }

    p {
      margin: 0;
    }

    > li {
      &::after {
        width: 0;
        height: 0;
      }
      &.ant-menu-item {
        &::after {
          width: 0;
          height: 0;
        }
      }
    }
  }
`

export default LanguageSelect
