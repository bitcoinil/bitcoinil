import * as React from 'react'
import styled from 'styled-components'
import { AlternatingTwoColumnRowProps } from './Interfaces'

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

  &.even {
    flex-direction: row-reverse;
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
