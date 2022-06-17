import { Card } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

export interface BuyBodyProps {}

const BuyBody: React.FC<BuyBodyProps> = ({}) => {
  return (
    <StyledBuyBody id="BuyBody">
      <Card>
        <h1>**** THIS NEEDS TO BE A WIDGET TO BUY BTCIl</h1>
      </Card>
      <FormattedMessage
        id={`mainMenuItem.buy.body-message`}
        defaultMessage={`The above widget is provided by a third party provider (MoonPay) and is not associated with bitcoin.org. Fees may be higher than some other Bitcoin exchanges.
        `}
        description={`buy.body-message`}
      />
    </StyledBuyBody>
  )
}

export default BuyBody

const StyledBuyBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .ant-card {
    width: 40vw;
  }
`
