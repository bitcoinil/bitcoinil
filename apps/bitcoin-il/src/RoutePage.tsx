import * as React from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'

import HeroBg from './img/hero-bg.svg'
import { RoutePageProps } from './Interfaces'

export default function RoutePage({
  title = 'title Prop',
  subtitle = 'subtitle Prop',
  body = <h1>body prop</h1>,
  id = ''
}: RoutePageProps): JSX.Element {
  console.log(id)

  return (
    <StyledRoutePage>
      <div className="page-title">
        <h1>
          {/* {title} */}
          <br />
          <FormattedMessage
            id={`page.${id}.title`}
            defaultMessage={`${title} (placeholder)`}
            description={`${id}'s title`}
          />
        </h1>
        <h3>
          <FormattedMessage
            id={`page.${id}.subtitle`}
            defaultMessage={`${subtitle} (placeholder)`}
            description={`${id}'s subhedading`}
          />
        </h3>
        <div className="trans-bel"></div>
      </div>
      <div className="body">{body}</div>
    </StyledRoutePage>
  )
}

const StyledRoutePage = styled.div`
  min-height: 100vh;

  .page-title {
    /* background: black; */
    background-image: url('${HeroBg}');
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;

    h1 {
      color: white;
      text-align: center;
    }

    h3 {
      color: #9d9d9d;
      max-width: 65vw;
    }

    .trans-bel {
      background: white;
    }
  }
`
