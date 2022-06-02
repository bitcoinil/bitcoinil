import { Button, Menu } from "antd"
import React from "react"
import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import LanguageSelect from "./LanguageSelect"
import { FormattedMessage, IntlProvider } from "react-intl"
import { useIntl } from "./hooks/useIntl"

import { useNavigate } from "react-router-dom"

export default function Header({ setLanguage }) {
  const navigate = useNavigate()
  // const { setLanguage } = useIntl()
  return (
    <IntlProvider>
      <StyledHeader>
        <div className="left">
          <button onClick={() => setLanguage("il")}>
            ******* In app-layout package
          </button>
          <p
            className="logo"
            onClick={() => {
              // navigate("/")
            }}
          >
            TODO: Logo
          </p>
          <FormattedMessage
            id="app.text"
            defaultMessage="This is some text"
            description="Link on react page"
          />
        </div>
        <div className="middle">
          <HeaderMenu
          // navigate={navigate} />
          />
        </div>
        <div className="right">
          <LanguageSelect />
        </div>
      </StyledHeader>
    </IntlProvider>
  )
}

const StyledHeader = styled.div`
  display: flex;
  /* height: 40px; */
  padding: 0 70px;
  align-items: center;
  justify-content: space-between;

  .logo {
    margin: 0;
    cursor: pointer;
    transition: all 200ms;
    &:hover {
      opacity: 0.5;
      transition: all 200ms;
    }
  }
`
