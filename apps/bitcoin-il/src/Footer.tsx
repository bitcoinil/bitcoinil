import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import SiteButton from './BitcoinSiteButton'
import FooterBg from './img/footer-bg.svg'
import { mainMenuItems } from './mainMenuItems'
import { NavLink } from 'react-router-dom'

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <StyledFooter id="Footer">
      <div className="footer-main">
        <div className="footer-main-title">
          <h1>LOGO HERE</h1>
        </div>
        <div className="footer-main-body">
          <div className="footer-main-body-left">
            <p className="footer-main-body-left-title">
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
            </p>
            <p className="footer-main-body-left-link">
              <FormattedMessage
                id={`footer.support-message`}
                defaultMessage={`TODO: BITCOIN LINK FOR DONATIONS`}
                description={`BITCOIN LINK FOR DONATIONS`}
              />
            </p>
          </div>
          <div className="footer-main-body-right">
            {mainMenuItems.map((menuItem) => {
              if (!menuItem.submenu) return null
              return (
                <div className="footer-main-body-right-menu-column">
                  <p className="title">
                    <FormattedMessage
                      id={`footer.menu-item.title-${menuItem.label}`}
                      defaultMessage={menuItem.label}
                      description={`Description`}
                    />
                  </p>
                  <ul>
                    {menuItem.submenu.map((subMenuItem, ii) => {
                      return (
                        <NavLink key={ii} to={`/${subMenuItem.key}`}>
                          <li>
                            <FormattedMessage
                              id={`footer.menu-item-${subMenuItem.key}`}
                              defaultMessage={subMenuItem.label}
                              description={subMenuItem.label}
                            />
                          </li>
                        </NavLink>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.div`
  background-color: black;
  color: white;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  overflow: hidden;
  h1 {
    color: white;
  }

  .footer {
    &-main {
      &-title {
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url(${FooterBg});
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
            ul {
              padding: 0;
              list-style: none;
              margin-right: 50px;

              li {
                color: white;
              }
            }
          }
        }
      }
    }
  }
`
