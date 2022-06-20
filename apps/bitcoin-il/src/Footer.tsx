import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import SiteButton from './BitcoinSiteButton'
import { phoneDevices } from './breakpoints'
import { mainMenuItems } from './mainMenuItems'

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const renderSupport = () => {
    return (
      <>
        <span className="footer-main-body-left-title">
          <FormattedMessage
            id={`page.footer.support`}
            defaultMessage={`Support BitCoin Il`}
            description={`Support`}
          />
          <SiteButton type="primary">
            <FormattedMessage
              id={`footer.donate`}
              defaultMessage={`Donate`}
              description={`Donate`}
            />
          </SiteButton>
        </span>
        <p className="footer-main-body-left-link">
          <FormattedMessage
            id={`footer.support-message`}
            defaultMessage={`TODO: BITCOIN LINK FOR DONATIONS`}
            description={`BITCOIN LINK FOR DONATIONS`}
          />
        </p>
      </>
    )
  }

  const renderColumns = () => {
    return mainMenuItems.map((menuItem, i) => {
      if (!menuItem.submenu) return null
      return (
        <div key={i} className="footer-main-body-right-menu-column">
          <p className="title">{menuItem.label}</p>
          <ul>
            {menuItem.submenu.map((subMenuItem, ii) => {
              return (
                <NavLink key={ii} to={`/${subMenuItem.key}`}>
                  <li className="submenu-item">{subMenuItem.label}</li>
                </NavLink>
              )
            })}
          </ul>
        </div>
      )
    })
  }

  return (
    <StyledFooter id="Footer">
      <div className="logo">
        <h1>LOGO HERE</h1>
      </div>
      <div className="body-wrap">
        <div className="support">{renderSupport()}</div>
        <div className="columns-wrap">{renderColumns()}</div>
      </div>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.div`
  box-sizing: border-box;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  overflow: hidden;

  h1 {
    color: white;
  }

  .body-wrap {
    display: flex;
    width: 90vw;
    justify-content: space-evenly;

    ${phoneDevices} {
      flex-direction: column;
    }
  }

  .support {
    display: flex;
    flex-direction: column;
  }
  .columns-wrap,
  .support {
    ${phoneDevices} {
      width: 100%;
    }
  }

  .columns-wrap {
    display: flex;

    ${phoneDevices} {
      flex-direction: column;
    }
  }

  .submenu-item {
    color: grey;
  }

  .footer {
    &-main {
      &-title {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 150px;
      }
      &-body {
        display: flex;
        align-items: center;
        justify-content: space-around;
        &-left,
        &-right {
          width: 45vw;
        }
        &-left {
          &-title {
            display: flex;
            align-items: center;

            button {
              margin-left: 30px;
            }
          }
          &-link {
            color: blue;
          }
        }
        &-right {
          display: flex;
          &-menu-column {
            ${phoneDevices} {
              text-align: center;
              margin-top: 30px;
            }
            ul {
              padding: 0;
              list-style: none;
              margin-right: 50px;

              ${phoneDevices} {
                margin: 0;
              }

              li {
              }
            }
          }
        }
      }
    }
  }
`
