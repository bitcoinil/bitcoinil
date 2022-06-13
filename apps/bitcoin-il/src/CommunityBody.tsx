import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

interface CommunityBodyProps {}

const CommunityBody: React.FC<CommunityBodyProps> = ({}) => {
  return (
    <StyledCommunityBody id="CommunityBody">
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`CommunityBody`}
          description={`CommunityBody`}
        />
      </h1>
    </StyledCommunityBody>
  )
}

export default CommunityBody

const StyledCommunityBody = styled.div``
