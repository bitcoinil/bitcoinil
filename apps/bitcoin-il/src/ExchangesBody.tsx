import * as React from 'react'
import styled from 'styled-components'
import { ExchangesBodyProps } from './Interfaces'

const ExchangesBody: React.FC<ExchangesBodyProps> = ({}) => {
  return (
    <StyledExchangesBody id="ExchangesBody">
      <h1>ExchangesBody</h1>
    </StyledExchangesBody>
  )
}

export default ExchangesBody

const StyledExchangesBody = styled.div``
