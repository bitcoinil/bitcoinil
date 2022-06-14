import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { NavLink } from 'react-router-dom'
import SiteButton from './BitcoinSiteButton'
import CardsDisplay from './CardsDisplay'
import anon from './img/ico_anon.svg'
import international from './img/ico_international.svg'
import lock from './img/ico_lock.svg'
import lowfee from './img/ico_lowfee.svg'
import mobile from './img/ico_mobile.svg'
import simple from './img/ico_simple.svg'
import { BodyCard, IndividualsBodyProps } from './Interfaces'

const individualCards: BodyCard[] = [
  {
    img: mobile,
    title: (
      <FormattedMessage
        id={`individualCards.mobile.title`}
        defaultMessage={'Mobile payments made easy'}
        description={`individuals card mobile title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`individualCard.mobile.text`}
        defaultMessage={`Bitcoin when used on a mobile device allows you to pay with a simple two-step scan-and-pay. There's no need to sign up, swipe your card, type a PIN, or sign anything. All you need to receive Bitcoin payments is to display the QR code in your Bitcoin wallet app and let the other party scan your mobile, or touch the two phones together (using NFC radio technology).`}
        description={`Description`}
      />
    ),

    id: 'mobile'
  },
  {
    img: lock,
    title: (
      <FormattedMessage
        id={`individualCards.lock.title`}
        defaultMessage={`Security and control over your money`}
        description={`individuals card lock title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`individualCard.lock.text`}
        defaultMessage={`Bitcoin transactions are secured by mathematics and energy. Cryptographic signatures prevent other people from spending your money. Energy spent by proof of work (PoW) prevents other people from undoing, rearranging or losing your transactions. So long as you take the required steps to protect your wallet, Bitcoin can give you control over your money and a strong level of protection against many types of fraud.`}
        description={`Description`}
      />
    ),

    id: `security-and-control`
  },
  {
    img: simple,
    title: (
      <FormattedMessage
        id={`individualCards.simple.title`}
        defaultMessage={`Works everywhere, anytime`}
        description={`individuals card simple title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`individualCard.simple.text`}
        defaultMessage={`Similarly to email, you don't need to ask recipients you're sending bitcoin to, to use the same software, wallets or service providers. You just need their bitcoin address and then you can transact with them anytime. The Bitcoin network is always running and never sleeps, even on weekends and holidays.`}
        description={`Description`}
      />
    ),

    id: `simple`
  },
  {
    img: international,
    title: (
      <FormattedMessage
        id={`individualCards.international.title`}
        defaultMessage={`Fast international payments`}
        description={`individuals card international title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`individualCard.international.text`}
        defaultMessage={`Sending bitcoins across borders is as easy as sending them across the street. There are no banks to make you wait three business days, no extra fees for making an international transfer, and no special limitations on the minimum or maximum amount you can send.`}
        description={`Description`}
      />
    ),
    id: `international`
  },
  {
    img: lowfee,
    title: (
      <FormattedMessage
        id={`individualCards.lowfee.title`}
        defaultMessage={`Choose your own fees`}
        description={`individuals card lowfee title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`individualCard.lowfee.text`}
        defaultMessage={`There is no fee to receive bitcoins, and many wallets let you control how large a fee to pay when spending. Most wallets have reasonable default fees, and higher fees can encourage faster confirmation of your transactions. Fees are unrelated to the amount transferred, so it's possible to send 100,000 bitcoins for the same fee it costs to send 1 bitcoin.`}
        description={`Description`}
      />
    ),

    id: `lowfee`
  },
  {
    img: anon,
    title: (
      <FormattedMessage
        id={`individualCards.anon.title`}
        defaultMessage={'Protect your identity'}
        description={`individuals card anon title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`individualCard.anon.text`}
        defaultMessage={`With Bitcoin, there's no credit card number that malicious actors can collect in order to steal from you. In fact, it's even possible in some cases to send a payment without revealing your identity, almost like with physical money. You should, however, take note that some effort can be required to protect your privacy.`}
        description={`Description`}
      />
    ),

    id: `anon`
  }
]

const IndividualsBody: React.FC<IndividualsBodyProps> = ({}) => {
  return (
    <StyledIndividualsBody id="IndividualsBody">
      <CardsDisplay cards={individualCards} />
      <div className="individuals-button">
        <NavLink to="/getting-started">
          <SiteButton type="primary">Get Started With BitCoin Il</SiteButton>
        </NavLink>
      </div>
    </StyledIndividualsBody>
  )
}

export default IndividualsBody

const StyledIndividualsBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  .individuals-button {
    margin: 50px;
    align-self: center;

    button {
      padding: 35px;
    }
  }
`
