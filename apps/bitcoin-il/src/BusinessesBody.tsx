import * as React from 'react'
import styled from 'styled-components'

import { NavLink } from 'react-router-dom'
import SiteButton from './BitcoinSiteButton'
import CardsDisplay from './CardsDisplay'
import { businessCards } from './BusinessesBodyData'
import { BusinessBodyProps } from './Interfaces'

const BusinessBody: React.FC<BusinessBodyProps> = ({}) => {
  return (
    <StyledBusinessBody id="IndividualsBody">
      <CardsDisplay cards={businessCards} />
      <div className="individuals-button">
        <NavLink to="/getting-started">
          <SiteButton type="primary">Get Started With BitCoin Il</SiteButton>
        </NavLink>
      </div>
    </StyledBusinessBody>
  )
}

export default BusinessBody

const StyledBusinessBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  .individuals-button {
    margin: 50px;
    align-self: center;
  }
`
