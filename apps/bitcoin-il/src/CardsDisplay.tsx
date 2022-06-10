import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { BodyCard } from './Interfaces'
import { Card } from 'antd'
import { phoneDevices } from './breakpoints'

interface CardsDisplayProps {
  cards: BodyCard[]
}

const CardsDisplay: React.FC<CardsDisplayProps> = ({ cards }) => {
  return (
    <StyledCardsDisplay id="CardsDisplay">
      <div className="body-cards">
        {cards.map((card: BodyCard, i: number) => {
          console.log(card)
          return (
            <Card>
              <img src={card.img} />
              <h1>
                <FormattedMessage
                  id={`page.individuals.${card.id}.title`}
                  defaultMessage={card.title}
                  description={card.title}
                />
              </h1>
              <p>
                <FormattedMessage
                  id={`page.individuals.${card.id}.text`}
                  defaultMessage={card.text}
                  description={card.text}
                />
              </p>
            </Card>
          )
        })}
      </div>
    </StyledCardsDisplay>
  )
}

export default CardsDisplay

const StyledCardsDisplay = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  .body-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .ant-card {
    width: 300px;
    margin: 20px;

    ${phoneDevices} {
      width: 95vw;
    }

    &-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`
