import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import SiteButton from './BitcoinSiteButton'
import { TimelineItemProps } from './Interfaces'

const TimelineItem: React.FC<TimelineItemProps> = ({
  key,
  title,
  body,
  buttonText,
  buttonOnClick
}) => {
  return (
    <StyledTimelineItem id="TimelineItem">
      <h1>
        <FormattedMessage
          id={`timeline.item.${key}.title`}
          defaultMessage={title}
          description={`TimelineItem Title`}
        />
      </h1>
      <p>
        <FormattedMessage
          id={`timeline.item.${key}.body`}
          defaultMessage={body}
          description={`timelineItem Body`}
        />
      </p>
      <SiteButton type="primary" onClick={buttonOnClick}>
        {buttonText}
      </SiteButton>
    </StyledTimelineItem>
  )
}

export default TimelineItem

const StyledTimelineItem = styled.div``
