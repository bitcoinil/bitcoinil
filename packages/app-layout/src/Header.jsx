import { Button, Menu } from "antd"
import React from "react"
import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import LanguageSelect from "./LanguageSelect"
// import { useNavigate } from "react-router-dom"

export default function Header({ navigate, FormattedMessage, setLanguage }) {
  console.log("What is Headers setLang?", setLanguage)
  return (
    <StyledHeader>
      <div className="left">
        <p
          className="logo"
          onClick={() => {
            navigate("/")
          }}
        >
          TODO: Logo
        </p>
      </div>
      <div className="middle">
        <HeaderMenu navigate={navigate} />
      </div>
      <div className="right">
        <LanguageSelect
          setLanguage={setLanguage}
          FormattedMessage={FormattedMessage}
        />
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  display: flex;
  height: 40px;
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
