import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

export default function QuickOverview(): JSX.Element {
  return (
    <StyledQuickOverview id="QuickOverview">
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`QuickOverview`}
          description={`QuickOverview`}
        />
      </h1>
    </StyledQuickOverview>
  )
}

const StyledQuickOverview = styled.div``
