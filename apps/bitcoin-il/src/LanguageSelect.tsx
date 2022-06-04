import { Select } from 'antd'
import * as React from 'react'
// import { FormattedMessage, IntlProvider } from "react-intl"
import styled from 'styled-components'
// @ts-ignore
import { useIntl } from './hooks/useIntl'
import { AvailableLanguageData } from './Interfaces'

export default function LanguageSelect(): JSX.Element {
  const intl = useIntl()
  const { setLanguage, availableLanguages } = intl

  return (
    <StyledLanguageSelect>
      <Select
        onChange={(e) => {
          setLanguage(e)
        }}
        defaultValue={availableLanguages[0].icon}
      >
        {availableLanguages.map((avLang: AvailableLanguageData) => {
          return (
            <Select.Option
              key={`select-language-${avLang.name}`}
              value={avLang.name}
            >
              {avLang.icon}
            </Select.Option>
          )
        })}
      </Select>
    </StyledLanguageSelect>
  )
}

const StyledLanguageSelect = styled.div``
