import { Collapse } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { phoneDevices, smallDevices } from './breakpoints'
import { colors } from './colors'
import ico_badge from './img/ico_badge.svg'
import { ExchangeLocation, ExchangesBodyProps } from './Interfaces'
import { exhchanges } from './ExchangesBodyData'
import ReactScrollDetect, { DetectSection } from 'react-scroll-detect'

const { Panel } = Collapse

const renderCitiesList = (ex: ExchangeLocation) => {
  return ex?.cities?.map((city, i) => {
    return (
      <div key={i}>
        <span>{city.city}</span>
        <ul>
          {city.exchanges.map((exc, ii) => {
            return (
              <span key={ii}>
                <a href={exc.link}>{exc.name}</a>
              </span>
            )
          })}
        </ul>
      </div>
    )
  })
}

const ExchangesBody: React.FC<ExchangesBodyProps> = ({}) => {
  const [isBelowZero, setIsBelowZero] = React.useState(false)
  const [isAtEnd, setIsAtEnd] = React.useState(false)

  const columnsRef = React.createRef<HTMLDivElement>()
  const endRef = React.createRef<HTMLDivElement>()

  const scrollCheckMenuInView = () => {
    if (!columnsRef.current?.getBoundingClientRect().y) return null
    setIsBelowZero(columnsRef.current?.getBoundingClientRect()?.y <= 0)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollCheckMenuInView)

    return () => window.removeEventListener('scroll', scrollCheckMenuInView)
  })

  const scrollCheckEnderInView = () => {
    if (!endRef?.current) return
    setIsAtEnd(endRef.current?.getBoundingClientRect().y < window.innerHeight)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollCheckEnderInView)

    return () => window.removeEventListener('scroll', scrollCheckEnderInView)
  })

  const flashElement = (el: HTMLElement | null) => {
    if (!el) return

    const duration = 300

    el.style.opacity = '0.2'
    window.setTimeout(() => {
      el.style.opacity = '1'
    }, duration)
    window.setTimeout(() => {
      el.style.opacity = '0.2'
    }, duration * 2)
    window.setTimeout(() => {
      el.style.opacity = '1'
    }, duration * 3)
    window.setTimeout(() => {
      el.style.opacity = '0.2'
    }, duration * 4)
    window.setTimeout(() => {
      el.style.opacity = '1'
    }, duration * 5)
  }
  return (
    <StyledExchangesBody id="ExchangesBody">
      <div className="exchanges-warning">
        <img src={ico_badge} />
        <FormattedMessage
          id={`exchanges.warning`}
          defaultMessage={` Note: Exchanges provide highly varying degrees of safety, security,
         privacy, and control over your funds and information. Perform your own
         due diligence and choose a wallet where you will keep your bitcoin
         before selecting an exchange.`}
          description={`exhcnages-warning`}
        />
      </div>
      <div
        ref={columnsRef}
        className={`exchanges-columns ${
          isBelowZero && !isAtEnd ? 'sticky' : 'unsticky'
        }`}
      >
        <div className={`exchanges-left `} id="style-5">
          <ul>
            {exhchanges.map((exchange, i) => {
              if (!exchange.cities)
                return (
                  <li
                    key={i}
                    className="dict-word-link"
                    onClick={() => {
                      document
                        .getElementById(`word-${i}`)
                        ?.scrollIntoView({ behavior: 'smooth' })
                      flashElement(document.getElementById(`word-${i}`))
                    }}
                  >
                    {exchange.location}
                  </li>
                )
              return (
                <div key={i}>
                  <p
                    className="dict-word-link"
                    onClick={() => {
                      document
                        .getElementById(`word-${i}`)
                        ?.scrollIntoView({ behavior: 'smooth' })
                      flashElement(document.getElementById(`word-${i}`))
                    }}
                  >
                    {exchange.location}
                  </p>
                  <ul>
                    {exchange.cities.map((city, i) => {
                      return (
                        <li key={i}>
                          <p>{city.city}</p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </ul>
        </div>
        <div className="right">
          <div className="exchanges-right-mobile">
            <ul>
              {exhchanges.map((exchange: ExchangeLocation, i: number) => {
                return (
                  <Collapse key={i}>
                    <Panel key={i} header={exchange.location}>
                      <li key={i} id={`word-${i}`}>
                        {exchange.location}
                        {exchange.cities ? renderCitiesList(exchange) : null}
                      </li>
                    </Panel>
                  </Collapse>
                )
              })}
            </ul>
          </div>
          <div className="exchanges-right-desktop">
            {exhchanges.map((exchange: ExchangeLocation, i: number) => {
              return (
                <li key={i} id={`word-${i}`}>
                  {exchange.location}
                  {exchange.cities ? renderCitiesList(exchange) : null}
                </li>
              )
            })}
          </div>
        </div>
      </div>

      <div ref={endRef} className="scroll-end-detect">
        DETECT END OF SCROLLLL
      </div>
    </StyledExchangesBody>
  )
}

export default ExchangesBody

const StyledExchangesBody = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;

  .sticky .exchanges-left {
    position: fixed;
    top: 0;
    overflow-y: scroll;
    height: 100vh;
  }

  .sticky .exchanges-right-desktop {
    margin-left: 500px;
  }

  .unsticky {
  }

  li {
    list-style: none;
  }

  #style-5 {
    scrollbar-width: thin;
  }

  #style-5::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  #style-5::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  #style-5::-webkit-scrollbar-thumb {
    background-color: ${colors.accent};

    /* background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    ); */
  }

  .exchanges-columns {
    display: flex;
    margin-bottom: 40px;
  }

  .exchanges-right-desktop {
    width: calc(90vw - 500px);

    ${phoneDevices} {
      display: none;
    }
  }

  .exchanges-right-mobile {
    ${smallDevices} {
      display: none;
    }
  }

  .exchanges-warning {
    background: black;
    margin: 20px;
    display: flex;
    padding: 20px;
    font-size: 20px;

    img {
      margin-right: 30px;
    }
  }

  .exchanges-left {
    width: 35vw;
    font-size: 20px;
    border-right: 1px solid #b9b9c350;
    padding-top: 60px;

    li {
      margin-bottom: 10px;
    }

    ${phoneDevices} {
      display: none;
    }
  }

  .right {
    width: 65vw;

    ${phoneDevices} {
      width: 95vw;
    }

    li {
      padding: 50px;
      border-bottom: 1px solid #b9b9c350;
    }

    h3 {
      color: ${colors.accent};
      font-size: 25px;
      font-weight: bolder;
    }

    p {
      font-size: 18px;
    }
  }

  .dict-word-link {
    cursor: pointer;

    transition: opacity 400ms;
    &:hover {
      transition: opacity 400ms;
      opacity: 0.6;
    }
  }

  .scroll-end-detect {
    background: orange;
    z-index: 999999999999;
    width: 95vw;
    visibility: hidden;
  }
`
