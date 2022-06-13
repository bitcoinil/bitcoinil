import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

interface ResourcesBodyProps {}

const ResourcesBody: React.FC<ResourcesBodyProps> = ({}) => {
  return (
    <StyledResourcesBody id="ResourcesBody">
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`ResourcesBody`}
          description={`ResourcesBody`}
        />
      </h1>
    </StyledResourcesBody>
  )
}

export default ResourcesBody

const StyledResourcesBody = styled.div``
