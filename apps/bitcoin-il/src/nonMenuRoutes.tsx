import * as React from 'react'
import ChooseWallet from './ChooseWallet'
import RoutePage from './RoutePage'

export const nonMenuRoutes = [
  {
    key: 'choose-your-wallet',
    path: 'choose-your-wallet',
    element: (
      <RoutePage
        id="choose-your-wallet"
        title="Choose Your Wallet"
        subtitle="Which Wallet Is For You?"
        body={<ChooseWallet />}
      />
    )
  },
  {
    key: 'buy',
    path: 'buy',
    element: (
      <RoutePage
        id="buy"
        title="Buy BitCoin"
        subtitle="Buy BitCoin"
        body={<h1>Buy Body</h1>}
      />
    )
  }
]
