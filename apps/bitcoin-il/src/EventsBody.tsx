import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

export interface EventsBodyProps {}

const EventsBody: React.FC<EventsBodyProps> = ({}) => {
  return (
    <StyledEventsBody id="EventsBody">
      <h1>EventsBody</h1>
    </StyledEventsBody>
  )
}

export default EventsBody

const StyledEventsBody = styled.div``
