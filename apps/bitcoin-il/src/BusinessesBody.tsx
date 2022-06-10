import * as React from 'react'
import styled from 'styled-components'

import { NavLink } from 'react-router-dom'
import SiteButton from './BitcoinSiteButton'
import CardsDisplay from './CardsDisplay'
import control from './img/ico_control.svg'
import international from './img/ico_international.svg'
import lowfee from './img/ico_lowfee.svg'
import multi from './img/ico_multi.svg'
import pci from './img/ico_pci.svg'
import transparency from './img/ico_transparency.svg'
import visib from './img/ico_visib.svg'

import { BodyCard, IndividualsBodyProps } from './Interfaces'

const businessCards: BodyCard[] = [
  {
    img: lowfee,
    title: `Choose your own fees`,
    text: `There is no fee to receive bitcoins, and many wallets let you control how large a fee to pay when spending. Most wallets have reasonable default fees, and higher fees can encourage faster confirmation of your transactions. Fees are unrelated to the amount transferred, so it's possible to send 100,000 bitcoins for the same fee it costs to send 1 bitcoin.`,
    id: `lowfee`
  },
  {
    img: control,
    title: 'Protection against fraud',
    text: `Any business that accepts credit cards or PayPal knows the problem of payments that are later reversed. Chargeback frauds result in limited market reach and increased prices, which in turn penalizes customers. Bitcoin payments are irreversible and secure, meaning that the cost of fraud is no longer pushed onto the shoulders of the merchants.`,
    id: 'control'
  },
  {
    img: international,
    title: `Fast international payments`,
    text: `Sending bitcoins across borders is as easy as sending them across the street. There are no banks to make you wait three business days, no extra fees for making an international transfer, and no special limitations on the minimum or maximum amount you can send.`,
    id: `international`
  },
  {
    img: pci,
    title: `No PCI compliance required`,
    text: `Accepting credit cards online typically requires extensive security checks in order to comply with the PCI standard. Bitcoin still requires you to secure your wallet and your payment requests, however, you do not carry the costs and responsibilities that come with processing sensitive information from your customers like with credit card numbers.`,
    id: `visib`
  },
  {
    img: visib,
    title: `Get some free visibility`,
    text: `Bitcoin is an emerging market of new customers who are searching for ways to spend their bitcoins. Accepting them is a good way to get new customers and give your business some new visibility. Accepting a new payment method has often shown to be a clever practice for online businesses.`,
    id: `visib`
  },
  {
    img: multi,
    title: 'Multi-signature',
    text: `Bitcoin also includes a multi-signature feature which allows bitcoins to be spent only if a subset of a group of people authorize the transaction. This can be used by a board of directors, for example, to prevent members from making expenditures without enough consent from other members, as well as to track which members permitted particular transactions.`,
    id: `multi`
  },
  {
    img: transparency,
    title: 'Accounting Transparency',
    text: `Many organizations are required to produce accounting documents about their activity. Using Bitcoin allows you to offer the highest level of transparency since you can provide information to verify balances and transactions through the block chain. For example, non-profit organizations can allow the public to see how much they receive in donations.`,
    id: `transparency`
  }
]

const BusinessBody: React.FC<IndividualsBodyProps> = ({}) => {
  return (
    <StyledIndividualsBody id="IndividualsBody">
      <CardsDisplay cards={businessCards} />
      <div className="individuals-button">
        <NavLink to="/getting-started">
          <SiteButton type="primary">Get Started With BitCoin Il</SiteButton>
        </NavLink>
      </div>
    </StyledIndividualsBody>
  )
}

export default BusinessBody

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
