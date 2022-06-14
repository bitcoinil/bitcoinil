import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { phoneDevices } from './breakpoints'
import BurgerMenu from './BurgerMenu'
import HeaderMenu from './HeaderMenu'
import { HeaderProps } from './Interfaces'
import LanguageSelect from './LanguageSelect'

const Header: React.FC<HeaderProps> = ({ setLanguage }) => {
  const navigate = useNavigate()
  return (
    <StyledHeader id="Header">
      <div className="left">
        <p
          className="logo"
          onClick={() => {
            navigate('/')
          }}
        >
          LogoHere
        </p>
      </div>
      <div className="header-middle">
        <HeaderMenu />
      </div>
      <div className="header-right">
        <LanguageSelect setLanguage={setLanguage} />
        <BurgerMenu />
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  ${phoneDevices} {
    justify-content: space-between;
    padding: 0 25px;
  }

  display: flex;
  height: 60px;
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

  ${phoneDevices} {
    .header-middle {
      display: none;
    }
  }
`

export default Header
