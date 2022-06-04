import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// @ts-ignore
import HeaderMenu from './HeaderMenu'
// @ts-ignore
import LanguageSelect from './LanguageSelect'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  return (
    <StyledHeader>
      <div className="left">
        <p
          className="logo"
          onClick={() => {
            navigate('/')
          }}
        >
          Log
        </p>
      </div>
      <div className="middle">
        <HeaderMenu />
      </div>
      <div className="right">
        <LanguageSelect />
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
