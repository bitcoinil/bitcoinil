import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { GettingStartedBodyProps } from './Interfaces'
import TimelineComp from './Timeline'

const firstTimelineItems: React.ReactNode[] = [<>Hi</>, <h1>There</h1>]

const GettingStartedBody: React.FC<GettingStartedBodyProps> = ({}) => {
  return (
    <StyledGettingStartedBody id="GettingStartedBody">
      <h1>
        <FormattedMessage
          id={`page.getting-started-how-to`}
          defaultMessage={`How To Get Started`}
          description={`How To Start`}
        />
      </h1>
      <TimelineComp items={firstTimelineItems} />
    </StyledGettingStartedBody>
  )
}

export default GettingStartedBody

const StyledGettingStartedBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 105px;
  flex-direction: column;
`
