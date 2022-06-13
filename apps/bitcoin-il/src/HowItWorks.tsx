import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import AlternatingTwoColumnRow from './AlternatingTwoColumnRow'
import { HowItWorksProps } from './Interfaces'

const HowItWorks: React.FC<HowItWorksProps> = ({}) => {
  return (
    <StyledHowItWorks id="HowItWorks">
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`HowItWorks`}
          description={`HowItWorks`}
        />
        <AlternatingTwoColumnRow index={2} />
        <AlternatingTwoColumnRow index={1} />
      </h1>
    </StyledHowItWorks>
  )
}

export default HowItWorks

const StyledHowItWorks = styled.div``
