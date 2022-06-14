import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import CardsDisplay from './CardsDisplay'
import { BodyCard } from './Interfaces'

import ico_forum from './img/ico_forum.svg'
import ico_social from './img/ico_social.svg'
import ico_meetups from './img/ico_meetups.svg'
import ico_conversation from './img/ico_conversation.svg'

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
      <ul className="list-of-links">
        <li>
          <a href="https://bitcoin.org/en/events">
            <FormattedMessage
              id={`community.conferences.text`}
              defaultMessage={`Bitcoin Conferences And Events`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://bitcoin.meetup.com/">
            <FormattedMessage
              id={`community.me.text`}
              defaultMessage={`Bitcoin Meetup Groups`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://bitcointalk.org/index.php?board=86.0">
            <FormattedMessage
              id={`community.meetups-bitcoin-talk.text`}
              defaultMessage={`Bitcoin Meetups On BitcoinTalk`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://en.bitcoin.it/wiki/Meetups">
            <FormattedMessage
              id={`community.meetups-wiki.text`}
              defaultMessage={`Bitcoin Meetups On The Wiki`}
              description={`Description`}
            />
          </a>
        </li>
      </ul>
    ),

    id: `meetups`
  },
  {
    // img: international,
    img: ico_conversation,
    title: (
      <FormattedMessage
        id={`communityCards.conversation.title`}
        defaultMessage={`IRC Chat`}
        description={`individuals card international title`}
      />
    ),

    text: (
      <ul className="list-of-links">
        <li>
          <a href="https://web.libera.chat/#bitcoin-core-dev">
            <FormattedMessage
              id={`community.irc-link.text`}
              defaultMessage={`IRC Channel #bitcoin-core-dev`}
              description={`Description`}
            />
          </a>
          <FormattedMessage
            id={`community.on-libera.text`}
            defaultMessage={` on Libera`}
            description={`community.on-libera.text`}
          />
          <p>
            <FormattedMessage
              id={`community.hash-bitcoin`}
              defaultMessage={`#bitcoin (General Bitcoin-related)`}
              description={`community.hash-bitcoin`}
            />
          </p>
          <p>
            <FormattedMessage
              id={`community.hash-core-dev`}
              defaultMessage={`#bitcoin-core-dev (Development and technical)`}
              description={`community.hash-bitcoin`}
            />
          </p>
          <p>
            <FormattedMessage
              id={`community.hash-otc`}
              defaultMessage={`#bitcoin-otc (Over The Counter exchange)`}
              description={`community.hash-otc`}
            />
          </p>
          <p>
            <FormattedMessage
              id={`community.hash-market`}
              defaultMessage={`#bitcoin-market (Live quotes from markets)`}
              description={`community.hash-market`}
            />
          </p>
          <p>
            <FormattedMessage
              id={`community.hash-mining`}
              defaultMessage={`#bitcoin-mining (Bitcoin mining related)`}
              description={`community.hash-mining`}
            />
          </p>
        </li>
      </ul>
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
