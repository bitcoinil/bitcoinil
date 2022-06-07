import * as React from 'react'
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
        body={<h1>Choose Wallet Body</h1>}
      />
    )
  }
]
