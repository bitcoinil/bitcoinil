import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { ExchangeLocation } from './Interfaces'

export const exhchanges: ExchangeLocation[] = [
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
            defaultMessage={`Some International Exchange ...`}
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
        countryCode: 'BH',
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
        countryCode: 'IL',
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
  },
  {
    location: (
      <FormattedMessage
        id={`exchange.menuItem.north-america.label`}
        defaultMessage={`North America`}
        description={`north-america.label`}
      />
    ),
    cities: [
      {
        city: (
          <FormattedMessage
            id={`exchange.menuItem.Canada`}
            defaultMessage={`Canada`}
            description={`Canada`}
          />
        ),
        countryCode: 'CA',
        exchanges: [
          {
            name: (
              <FormattedMessage
                id={`exchange.menuItem.canada.exhange.label`}
                defaultMessage={`Toronto`}
                description={`canada.exhange.label`}
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
            id={`exchange.menuItem.USA`}
            defaultMessage={`USA`}
            description={`USA`}
          />
        ),
        countryCode: 'US',
        exchanges: [
          {
            name: (
              <FormattedMessage
                id={`exchange.menuItem.USA.texas`}
                defaultMessage={`Texas`}
                description={`USA.texas`}
              />
            ),
            link: 'string'
          },
          {
            name: (
              <FormattedMessage
                id={`exchange.menuItem.USA.detroit`}
                defaultMessage={`Detroit`}
                description={`USA.detroit`}
              />
            ),
            link: 'string'
          },
          {
            name: (
              <FormattedMessage
                id={`exchange.menuItem.USA.Miami`}
                defaultMessage={`Miami`}
                description={`USA.Miami`}
              />
            ),
            link: 'string'
          },
          {
            name: (
              <FormattedMessage
                id={`exchange.menuItem.USA.New-York`}
                defaultMessage={`New York`}
                description={`USA.New York`}
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
