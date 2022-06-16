import { AppleOutlined, WindowsOutlined } from '@ant-design/icons'
import { Card, Divider } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import SiteButton from './BitcoinSiteButton'
import ico_news from './img/ico_news.svg'
import { colors } from './colors'

import { coreShortcuts, links, mainBoxes, newsCards } from './CoreData'
import { CoreBodyProps } from './Interfaces'

const CoreBody: React.FC<CoreBodyProps> = ({}) => {
  return (
    <StyledCoreBody id="CoreBody">
      <div className="core-left">
        <div>
          <SiteButton type="primary">Download Bitcoin Core</SiteButton>
          <div className="core-left-version">
            <p>BitCoin Il Core XX.X</p>
            <p>
              <WindowsOutlined />
              <AppleOutlined />
            </p>
          </div>
          <Divider />
          <div className="core-left-shortcuts">
            <p>Shortcut:</p>
            <ul>
              {coreShortcuts.map((shortcut, i) => {
                return (
                  <li>
                    <a href={shortcut.link}>
                      <Card>
                        <img src={shortcut.image} />
                        <div className="shortcut-text-wrap">
                          <h1>{shortcut.title}</h1>
                          <p>{shortcut.subtitle}</p>
                        </div>
                      </Card>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="core-left-shortcuts">
          <ul>
            {newsCards.map((shortcut, i) => {
              return (
                <li>
                  <a href={shortcut.link}>
                    <Card>
                      <img src={shortcut.image} />
                      <div className="shortcut-text-wrap">
                        <h1>{shortcut.title}</h1>
                        <p>{shortcut.subtitle}</p>
                      </div>
                    </Card>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="core-right">
        <h1>
          <FormattedMessage
            id={`core.shortcuts.mainTitle`}
            defaultMessage={`Bitcoin Core is programmed to decide which block chain contains valid transactions. The users of Bitcoin Core only accept transactions for that block chain, making it the Bitcoin block chain that everyone else wants to use. For the latest developments related to Bitcoin Core, be sure to visit the project’s official website.`}
            description={`mainTitle`}
          />
        </h1>
        <div className="core-right-main-boxes">
          {mainBoxes.map((box, i) => {
            console.log(box)
            return (
              <Card>
                <img src={box.img} />
                <h1>{box.title}</h1>
                <h1>{box.mainText}</h1>
              </Card>
            )
          })}
        </div>
        <h1>
          <FormattedMessage
            id={`core.shortcuts.shared-agreement`}
            defaultMessage={`This shared agreement (called consensus) allows people like you to only accept valid bitcoins, enforcing Bitcoin's rules against even the most powerful miners.In addition to improving Bitcoin's decentralization, Bitcoin Core users get:`}
            description={`shared-agreement`}
          />
        </h1>
        <ul className="core-right-links">
          {links.map((link, i) => {
            console.log(link)
            return (
              <li key={i}>
                <a href={link.link}>{link.linkText}</a>
                {'  '}
                {link.postLinkText}
              </li>
            )
          })}
        </ul>
        <Divider />
        <div className="news">
          <h1 className="news-title">News</h1>
          <a className="news-link" href="">
            <img src={ico_news} /> Some News Here
          </a>
        </div>
      </div>
    </StyledCoreBody>
  )
}

export default CoreBody

const StyledCoreBody = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;

  .core {
    &-left {
      border-right: 1px solid #e8e8ed;
      padding-right: 20px;
      padding: 50px;
      width: 30vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      button {
        width: 100%;
      }

      &-version {
        display: flex;
        justify-content: space-between;
      }

      &-shortcuts {
        ul {
          list-style: none;
          margin: 0;
          padding: 0;

          .ant-card {
            transition: all 400ms;
            margin-bottom: 10px;

            &:hover {
              opacity: 0.5;

              transition: all 400ms;
            }
            &-body {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 24px 0;

              h1 {
                font-size: 20px;
                margin: 0;
              }

              p {
                margin: 0;
              }
            }
          }
        }
      }
    }
    &-right {
      width: 50vw;
      padding: 50px;

      &-links {
        li {
          margin-bottom: 25px;
          font-size: 25px;
        }
      }

      &-main-boxes {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-evenly;

        .ant-card {
          width: 45%;
          display: flex;
          align-items: center;
        }
      }
      .news {
        &-title {
          color: ${colors.accent};
          font-weight: bolder;
        }

        &-link {
          font-size: 25px;
          color: black;

          &:hover {
            opacity: 0.5;
          }
        }
      }
    }
  }

  .shortcut-text-wrap {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
`
