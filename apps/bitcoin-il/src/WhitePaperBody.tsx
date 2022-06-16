import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

export interface WhitePaperBodyProps {}

const WhitePaperBody: React.FC<WhitePaperBodyProps> = ({}) => {
  return (
    <StyledWhitePaperBody id="WhitePaperBody">
      <h1>WhitePaperBody</h1>
    </StyledWhitePaperBody>
  )
}

export default WhitePaperBody

const StyledWhitePaperBody = styled.div``
