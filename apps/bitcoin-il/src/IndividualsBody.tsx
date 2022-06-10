import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Card } from 'antd'

import anon from './img/ico_anon.svg'
import international from './img/ico_international.svg'
import lock from './img/ico_lock.svg'
import lowfee from './img/ico_lowfee.svg'
import mobile from './img/ico_mobile.svg'
import simple from './img/ico_simple.svg'
import { phoneDevices } from './breakpoints'
import SiteButton from './BitcoinSiteButton'
import { NavLink } from 'react-router-dom'
import { BodyCard, IndividualsBodyProps } from './Interfaces'
import CardsDisplay from './CardsDisplay'

const individualCards: BodyCard[] = [
  {
    img: mobile,
    title: 'Mobile payments made easy',
    text: `Bitcoin when used on a mobile device allows you to pay with a simple two-step scan-and-pay. There's no need to sign up, swipe your card, type a PIN, or sign anything. All you need to receive Bitcoin payments is to display the QR code in your Bitcoin wallet app and let the other party scan your mobile, or touch the two phones together (using NFC radio technology).`,
    id: 'mobile'
  },
  {
    img: lock,
    title: `Security and control over your money`,
    text: `Bitcoin transactions are secured by mathematics and energy. Cryptographic signatures prevent other people from spending your money. Energy spent by proof of work (PoW) prevents other people from undoing, rearranging or losing your transactions. So long as you take the required steps to protect your wallet, Bitcoin can give you control over your money and a strong level of protection against many types of fraud.`,
    id: `security-and-control`
  },
  {
    img: simple,
    title: `Works everywhere, anytime`,
    text: `Similarly to email, you don't need to ask recipients you're sending bitcoin to, to use the same software, wallets or service providers. You just need their bitcoin address and then you can transact with them anytime. The Bitcoin network is always running and never sleeps, even on weekends and holidays.`,
    id: `simple`
  },
  {
    img: international,
    title: `Fast international payments`,
    text: `Sending bitcoins across borders is as easy as sending them across the street. There are no banks to make you wait three business days, no extra fees for making an international transfer, and no special limitations on the minimum or maximum amount you can send.`,
    id: `international`
  },
  {
    img: lowfee,
    title: `Choose your own fees`,
    text: `There is no fee to receive bitcoins, and many wallets let you control how large a fee to pay when spending. Most wallets have reasonable default fees, and higher fees can encourage faster confirmation of your transactions. Fees are unrelated to the amount transferred, so it's possible to send 100,000 bitcoins for the same fee it costs to send 1 bitcoin.`,
    id: `lowfee`
  },
  {
    img: anon,
    title: 'Protect your identity',
    text: `With Bitcoin, there's no credit card number that malicious actors can collect in order to steal from you. In fact, it's even possible in some cases to send a payment without revealing your identity, almost like with physical money. You should, however, take note that some effort can be required to protect your privacy.`,
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
