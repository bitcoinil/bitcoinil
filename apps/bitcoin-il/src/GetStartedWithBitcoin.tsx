import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

interface GetStartedWithBitcoinProps {}

const GetStartedWithBitcoin: React.FC<GetStartedWithBitcoinProps> = ({}) => {
  return (
    <StyledGetStartedWithBitcoin id="GetStartedWithBitcoin">
      <h1>
        <FormattedMessage
          id={`page.home.get-started-title`}
          defaultMessage={`Get Started With Bitcoin`}
          description={`GetStartedWithBitcoin`}
        />
      </h1>
    </StyledGetStartedWithBitcoin>
  )
}

export default GetStartedWithBitcoin

const StyledGetStartedWithBitcoin = styled.div``
