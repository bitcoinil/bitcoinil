import * as React from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import { ExchangesBodyProps } from './Interfaces'
import { Menu } from 'antd'
import { FormattedMessage } from 'react-intl'

export interface Exchange {
  name: JSX.Element
  link: string
}

export interface ExchangeCountry {
  city: JSX.Element
  exchanges: Exchange[]
  flag: string
}
export interface ExchangeLocation {
  location: JSX.Element
  exchanges?: Exchange[]
  cities?: ExchangeCountry[]
}

const exhchanges: ExchangeLocation[] = [
  {
    location: (
      <FormattedMessage
        id={`exchangeMenuItem.international.label`}
        defaultMessage={`International`}
        description={`exchangeMenuItem.international.label`}
      />
    ),
    exchanges: [
      {
        name: (
          <FormattedMessage
            id={`exchange.menuItem.someExchange`}
            defaultMessage={`Some Exchange ...`}
            description={`someExchange`}
          />
        ),
        link: 'string'
      }
    ]
  },
  {
    location: (
      <FormattedMessage
        id={`exchange.menuItem.peer2peer`}
        defaultMessage={`P2P`}
        description={`peer2peer`}
      />
    ),
    exchanges: [
      {
        name: (
          <FormattedMessage
            id={`exchange.menuItem.p2p.exchange.0.label`}
            defaultMessage={`Some Peer To Peer Excahnge`}
            description={`p2p.exchange.0.label`}
          />
        ),
        link: 'string'
      }
    ]
  },
  {
    location: (
      <FormattedMessage
        id={`exchange.menuItem.asia.label`}
        defaultMessage={`Asia`}
        description={`asia.label`}
      />
    ),
    cities: [
      {
        city: (
          <FormattedMessage
            id={`exchange.menuItem.bahrain`}
            defaultMessage={`Bahrain`}
            description={`bahrain`}
          />
        ),
        exchanges: [
          {
            name: (
              <FormattedMessage
                id={`exchange.menuItem.bahrain.exhange.label`}
                defaultMessage={`Some Bahrainian Exchange`}
                description={`bahrain.exhange.label`}
              />
            ),
            link: 'string'
          }
        ],
        flag: `TBD`
      },
      {
        city: (
          <FormattedMessage
            id={`exchange.menuItem.israel`}
            defaultMessage={`Israel`}
            description={`israel`}
          />
        ),
        exchanges: [
          {
            name: (
              <FormattedMessage
                id={`exchange.menuItem.israel.exchange`}
                defaultMessage={`Some Israeli Exchange`}
                description={`israel.exchange`}
              />
            ),
            link: 'string'
          }
        ],
        flag: 'TBD'
      }
    ]
  }
]

const renderCitiesList = (ex: ExchangeLocation) => {
  return ex?.cities?.map((city, i) => {
    return (
      <>
        <li>{city.city}</li>
        <ul>
          {city.exchanges.map((exc, i) => {
            console.log(exc)
            return <li>{exc.name}</li>
          })}
        </ul>
      </>
    )
  })
  return <h1>Rendering Citys</h1>
}

const ExchangesBody: React.FC<ExchangesBodyProps> = ({}) => {
  const [openTab, setOpenTab] = React.useState(null)

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
      {/* <h1>ExchangesBody</h1> */}
      <div>
        <div className={`left`}>
          <ul>
            {exhchanges.map((exchange, i) => {
              // console.log(exchange.location)
              if (!exchange.cities)
                return (
                  <li
                    className="dict-word-link"
                    onClick={() => {
                      document
                        .getElementById(`word-${i}`)
                        ?.scrollIntoView({ behavior: 'smooth' })
                      flashElement(document.getElementById(`word-${i}`))
                    }}
                    key={i}
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
                        <li>
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
      </div>
      <div className="right">
        {exhchanges.map((exchange: ExchangeLocation, i: number) => {
          console.log(exchange.cities)
          return (
            <li key={i} id={`word-${i}`}>
              {exchange.location}
              {exchange.cities ? renderCitiesList(exchange) : null}
            </li>
          )
        })}
      </div>
    </StyledExchangesBody>
  )
}

export default ExchangesBody

const StyledExchangesBody = styled.div`
  justify-content: center;
  display: flex;

  li {
    list-style: none;
  }

  .left {
    width: 35vw;
    font-size: 20px;
    border-right: 1px solid #b9b9c350;
    position: sticky;
    top: 0;
    left: 0;
    padding-top: 60px;

    li {
      margin-bottom: 10px;
    }
  }

  .right {
    width: 65vw;

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
`
