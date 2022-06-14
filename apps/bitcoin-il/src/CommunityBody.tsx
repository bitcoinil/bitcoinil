import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import CardsDisplay from './CardsDisplay'
import { BodyCard } from './Interfaces'

import ico_forum from './img/ico_forum.svg'
import ico_social from './img/ico_social.svg'
import ico_meetups from './img/ico_meetups.svg'

interface CommunityBodyProps {}

const communityCards: BodyCard[] = [
  {
    img: ico_forum,
    title: (
      <FormattedMessage
        id={`communityCards.forum.title`}
        defaultMessage={'Forums'}
        description={`individuals card forum title`}
      />
    ),

    text: (
      <ul className="list-of-links">
        <li>
          <a href="https://bitcointalk.org/">
            <FormattedMessage
              id={`community.bitcointalk.text`}
              defaultMessage={`BitcoinTalk Forum`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://reddit.com/r/Bitcoin/">
            <FormattedMessage
              id={`community.reddit.text`}
              defaultMessage={`Reddit's BitCoin Community`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://bitcoin.stackexchange.com/">
            <FormattedMessage
              id={`community.reddit.text`}
              defaultMessage={`BitCoin Stack Exchange (Q&A)`}
              description={`Description`}
            />
          </a>
        </li>
      </ul>
    ),

    id: 'mobile'
  },
  {
    img: ico_social,
    title: (
      <FormattedMessage
        id={`communityCards.social.title`}
        defaultMessage={`Social Networks`}
        description={`individuals card social title`}
      />
    ),

    text: (
      <ul className="list-of-links">
        <li>
          <a href="twitter.com">
            <FormattedMessage
              id={`community.twitter.text`}
              defaultMessage={`Twitter - MUST ADD PROPER ADDRESS`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="facebook.com">
            <FormattedMessage
              id={`community.facebook.text`}
              defaultMessage={`Facebook - MUST ADD PROPER ADDRESS`}
              description={`Description`}
            />
          </a>
        </li>
      </ul>
    ),

    id: `security-and-control`
  },
  {
    img: ico_meetups,
    title: (
      <FormattedMessage
        id={`communityCards.meetups.title`}
        defaultMessage={`Meetups`}
        description={`individuals card meetups title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`communityCard.meetups.text`}
        defaultMessage={`Similarly to email, you don't need to ask recipients you're sending bitcoin to, to use the same software, wallets or service providers. You just need their bitcoin address and then you can transact with them anytime. The Bitcoin network is always running and never sleeps, even on weekends and holidays.`}
        description={`Description`}
      />
    ),

    id: `simple`
  },
  {
    // img: international,
    img: '',
    title: (
      <FormattedMessage
        id={`communityCards.international.title`}
        defaultMessage={`Fast international payments`}
        description={`individuals card international title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`communityCard.X.text`}
        defaultMessage={`Sending bitcoins across borders is as easy as sending them across the street. There are no banks to make you wait three business days, no extra fees for making an international transfer, and no special limitations on the minimum or maximum amount you can send.`}
        description={`Description`}
      />
    ),
    id: `international`
  }
]

const CommunityBody: React.FC<CommunityBodyProps> = ({}) => {
  return (
    <StyledCommunityBody id="CommunityBody">
      <CardsDisplay cards={communityCards} />
    </StyledCommunityBody>
  )
}

export default CommunityBody

const StyledCommunityBody = styled.div`
  .list-of-links {
    display: flex;
    flex-direction: column;
    text-align: center;
    list-style: none;
  }
`
