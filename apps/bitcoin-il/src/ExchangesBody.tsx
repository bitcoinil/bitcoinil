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
  const [isAtEnd, setIsAtEnd] = React.useState(0)

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
        className={`exchanges-columns ${isBelowZero ? 'sticky' : 'unsticky'}`}
      >
        <div className={`exchanges-left `}>
          <ul>
            {exhchanges.map((exchange, i) => {
              // console.log(exchange.location)
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
                      // console.log({ city })
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
        {/* )} */}
        {/* </Sticky> */}
        {/* </StickyContainer> */}
        <div className="right">
          <div className="exchanges-right-mobile">
            <ul>
              {exhchanges.map((exchange: ExchangeLocation, i: number) => {
                // console.log(exchange.cities)
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
              // console.log(exchange.cities)
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
      <ReactScrollDetect
        // index={section}
        triggerPoint="bottom"
        onChange={setIsAtEnd}
      >
        <DetectSection>
          <div className="scroll-end-detect">DETECT END OF SCROLLLL</div>
        </DetectSection>
      </ReactScrollDetect>
    </StyledExchangesBody>
  )
}

export default ExchangesBody

const StyledExchangesBody = styled.div`
  justify-content: center;
  display: flex;

  .sticky .exchanges-left {
    background: red;
    position: fixed;
    top: 0;
    overflow: scroll;
    height: 100vh;
  }

  .sticky .exchanges-right-desktop {
    margin-left: 500px;
  }

  .unsticky {
    background: green;
  }

  /* ${phoneDevices} { */
  flex-direction: column;
  /* } */

  li {
    list-style: none;
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
  }
`

function useIsInViewport(ref: Element) {
  console.log(ref)
  // if (!ref) return null
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  const observer = React.useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  )

  React.useEffect(() => {
    // if (!ref) return null
    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, observer])

  return isIntersecting
}
