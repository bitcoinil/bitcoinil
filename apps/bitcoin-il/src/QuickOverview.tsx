import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import QuickOverviewBox from './QuickOverviewBox'
import IndividualImage from './img/ico_individuals.svg'
import BusinessImage from './img/ico_business.svg'
import DevelopersImage from './img/ico_developers.svg'
import OverviewBG from './img/overview-bg.svg'
import { phoneDevices } from './breakpoints'

export interface QuickOverviewBox {
  index: Number
  imgSrc: string
  id: string
  titleDefaultMessage: string
  titleDescription: string
  subtitleDefaultMessage: string
  subtitleDescription: string
  baseFormattedMessage?: String
  link: string
}

// @ts-ignore
const boxes: any = [
  {
    index: 0,
    imgSrc: IndividualImage,
    id: 'individuals',
    titleDefaultMessage: 'Individuals',
    titleDescription: 'individuals',
    subtitleDefaultMessage: 'Learn More',
    subtitleDescription: 'learn more',
    link: '/individuals'
  },
  {
    index: 0,
    imgSrc: BusinessImage,
    id: 'businesses',
    titleDefaultMessage: 'Businesses',
    titleDescription: 'businesses',
    subtitleDefaultMessage: 'Learn More',
    subtitleDescription: 'learn more',
    link: '/businesses'
  },
  {
    index: 0,
    imgSrc: DevelopersImage,
    id: 'developers',
    titleDefaultMessage: 'Developers',
    titleDescription: 'developers',
    subtitleDefaultMessage: 'Learn More',
    subtitleDescription: 'learn more',
    link: '/developers'
  }
]

export default function QuickOverview(): JSX.Element {
  const baseFormattedMessageId: String = 'page.home.quick-overview'
  return (
    <StyledQuickOverview id="QuickOverview">
      <h1>
        <FormattedMessage
          id={`${baseFormattedMessageId}.title`}
          defaultMessage={`Get A Quick Overview For`}
          description={`QuickOverview`}
        />
      </h1>
      <div className="boxes">
        {boxes.map((boxInfo: QuickOverviewBox, i: number) => {
          const {
            imgSrc,
            index,
            id,
            titleDefaultMessage,
            titleDescription,
            subtitleDefaultMessage,
            subtitleDescription,
            link
          } = boxInfo
          return (
            <QuickOverviewBox
              key={i}
              index={index}
              imgSrc={imgSrc}
              id={id}
              titleDefaultMessage={titleDefaultMessage}
              titleDescription={titleDescription}
              subtitleDefaultMessage={subtitleDefaultMessage}
              subtitleDescription={subtitleDescription}
              baseFormattedMessage={baseFormattedMessageId}
              link={link}
            />
          )
        })}
      </div>
    </StyledQuickOverview>
  )
}

const StyledQuickOverview = styled.div`
  /* background-color: grey; */
  margin-top: 50px;
  padding: 300px 0;
  background: url(${OverviewBG}) top no-repeat;
  background-size: cover;

  h1 {
    color: white;
  }

  .boxes {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    ${phoneDevices} {
      flex-direction: column;
    }
  }

  width: 100vw;
`
