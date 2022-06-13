import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { AlternatingTwoColumnRowProps } from './Interfaces'

const AlternatingTwoColumnRow: React.FC<AlternatingTwoColumnRowProps> = ({
  index
}) => {
  console.log({ index })
  return (
    <StyledAlternatingTwoColumnRow id="AlternatingTwoColumnRow">
      <h1>
        {index}
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`AlternatingTwoColumnRow`}
          description={`AlternatingTwoColumnRow`}
        />
      </h1>
    </StyledAlternatingTwoColumnRow>
  )
}

export default AlternatingTwoColumnRow

const StyledAlternatingTwoColumnRow = styled.div``
