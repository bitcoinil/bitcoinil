import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { phoneDevices } from './breakpoints'
import HomepageButtons from './HomepageButtons'
import QuickOverview from './QuickOverview'
import WhatIsBitcoin from './WhatIsBitcoin'

export default function HomePage(): JSX.Element {
  return (
    <StyledHomePage id="HomePage">
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`Bitcoin is an innovative payment network and a new kind of money.`}
          description={`Homepage Title`}
        />
      </h1>
      <HomepageButtons />
      <WhatIsBitcoin />
      <QuickOverview />
    </StyledHomePage>
  )
}

const StyledHomePage = styled.div`
  ${phoneDevices} {
    padding: 50px 30px 50px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 130px 30px 50px;

  .ant-btn {
    padding: 25px 50px;
  }

  h1 {
    ${phoneDevices} {
      font-size: 32px;
      margin: 0 0 20px 0;
    }

    font-size: 51px;
    text-align: center;
    margin: 0px 185px 45px;
    font-weight: bolder;
  }
`
