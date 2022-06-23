import * as React from 'react'
import styled from 'styled-components'
import CardsDisplay from './CardsDisplay'

import { phoneDevices } from './breakpoints'
import { communityCards } from './CommunityBodyData'

interface CommunityBodyProps {}

const CommunityBody: React.FC<CommunityBodyProps> = ({}) => {
  return (
    <StyledCommunityBody id="CommunityBody">
      <CardsDisplay cards={communityCards} />
    </StyledCommunityBody>
  )
}

export default CommunityBody

const StyledCommunityBody = styled.div`
  .list-of-links {
    display: flex;
    flex-direction: column;
    text-align: center;
    list-style: none;

    ${phoneDevices} {
      padding: 0;
    }
  }
`
