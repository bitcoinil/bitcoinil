import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import HomepageButtons from './HomepageButtons'

export default function HomePage(): JSX.Element {
  return (
    <StyledHomePage>
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`Bitcoin is an innovative payment network and a new kind of money.`}
          description={`Homepage Title`}
        />
      </h1>
      <HomepageButtons />
    </StyledHomePage>
  )
}

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 130px 30px 50px;

  .ant-btn {
    padding: 25px 50px;
  }

  h1 {
    font-size: 51px;
    text-align: center;
    margin: 0px 185px 45px;
    font-weight: bolder;
  }
`
