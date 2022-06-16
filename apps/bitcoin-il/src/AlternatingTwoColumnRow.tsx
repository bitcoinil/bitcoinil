import * as React from 'react'
import styled from 'styled-components'
import { AlternatingTwoColumnRowProps } from './Interfaces'
import { phoneDevices } from './breakpoints'

const AlternatingTwoColumnRow: React.FC<AlternatingTwoColumnRowProps> = ({
  index,
  imgSrc,
  titleText,
  bodyText
}) => {
  const even = index % 2 === 0

  return (
    <StyledAlternatingTwoColumnRow
      className={`${even ? 'even' : 'odd'}`}
      id="AlternatingTwoColumnRow"
    >
      <div className="img-side">
        <img src={imgSrc} />
      </div>
      <div className="text-side">
        <h1>{titleText}</h1>
        <p>{bodyText}</p>
      </div>
    </StyledAlternatingTwoColumnRow>
  )
}

export default AlternatingTwoColumnRow

const StyledAlternatingTwoColumnRow = styled.div`
  display: flex;
  padding: 65px;
  margin-top: 50px;

  ${phoneDevices} {
    flex-direction: column;
    padding: 0;

    img {
      max-width: 75vw;
    }
  }

  &.even {
    flex-direction: row-reverse;

    ${phoneDevices} {
      flex-direction: column;
    }
  }

  &.odd {
  }

  .text-side {
    margin: 0 50px;
  }

  .img-side {
    margin: 0 50px;
  }
`
