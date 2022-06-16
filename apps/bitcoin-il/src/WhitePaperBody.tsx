import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

export interface WhitePaperBodyProps {}

const WhitePaperBody: React.FC<WhitePaperBodyProps> = ({}) => {
  return (
    <StyledWhitePaperBody id="WhitePaperBody">
      <h1>
        <FormattedMessage
          id={`white-paper.intro`}
          defaultMessage={`Satoshi Nakamoto's original paper is still recommended reading for anyone studying how Bitcoin works. Choose which translation of the paper you want to read:`}
          description={`intro`}
        />
      </h1>
      <div className="papers">PAPERS HERE</div>
      <h1>
        <FormattedMessage
          id={`white-paper.do-you-want-translate`}
          defaultMessage={`Do you want to translate the paper into your language? Visit the Bitcoin white paper repository on GitHub for instructions and open an issue if you have any questions.`}
          description={`do-you-want-translate`}
        />
      </h1>
    </StyledWhitePaperBody>
  )
}

export default WhitePaperBody

const StyledWhitePaperBody = styled.div`
  padding: 100px;

  h1 {
    font-weight: bolder;
  }
`
