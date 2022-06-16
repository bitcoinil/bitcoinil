import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

export interface CoreBodyProps {}

const CoreBody: React.FC<CoreBodyProps> = ({}) => {
  return (
    <StyledCoreBody id="CoreBody">
      <h1>CoreBody</h1>
    </StyledCoreBody>
  )
}

export default CoreBody

const StyledCoreBody = styled.div``
