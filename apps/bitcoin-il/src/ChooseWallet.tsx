import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

export default function ChooseWallet(): JSX.Element {
  return (
    <StyledChooseYourWallet id="ChooseWallet">
      <h1>
        <FormattedMessage
          id={`page.choose-wallet.title`}
          defaultMessage={`Choose Your Wallet`}
          description={`Homepage Title`}
        />
      </h1>
    </StyledChooseYourWallet>
  )
}

const StyledChooseYourWallet = styled.div``
