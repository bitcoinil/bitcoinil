import * as React from 'react'

import { BodyCard } from './Interfaces'

import control from './img/ico_control.svg'
import international from './img/ico_international.svg'
import lowfee from './img/ico_lowfee.svg'
import multi from './img/ico_multi.svg'
import pci from './img/ico_pci.svg'
import transparency from './img/ico_transparency.svg'
import visib from './img/ico_visib.svg'
import { FormattedMessage } from 'react-intl'

export const businessCards: BodyCard[] = [
  {
    img: lowfee,
    title: (
      <FormattedMessage
        id={`businessCards.lowfee.title`}
        defaultMessage={`Choose your own fees`}
        description={`business cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`businessCard.lowfee.text`}
        defaultMessage={`There is no fee to receive bitcoins, and many wallets let you control how large a fee to pay when spending. Most wallets have reasonable default fees, and higher fees can encourage faster confirmation of your transactions. Fees are unrelated to the amount transferred, so it's possible to send 100,000 bitcoins for the same fee it costs to send 1 bitcoin.`}
        description={`business cards text`}
      />
    ),
    id: `lowfee`
  },
  {
    img: control,
    title: (
      <FormattedMessage
        id={`businessCards.control.title`}
        defaultMessage={'Protection against fraud'}
        description={`business cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`businessCard.control.text`}
        defaultMessage={`Any business that accepts credit cards or PayPal knows the problem of payments that are later reversed. Chargeback frauds result in limited market reach and increased prices, which in turn penalizes customers. Bitcoin payments are irreversible and secure, meaning that the cost of fraud is no longer pushed onto the shoulders of the merchants.`}
        description={`business cards text`}
      />
    ),
    id: 'control'
  },
  {
    img: international,
    title: (
      <FormattedMessage
        id={`businessCards.international.title`}
        defaultMessage={`Fast international payments`}
        description={`business cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`businessCard.international.text`}
        defaultMessage={`Sending bitcoins across borders is as easy as sending them across the street. There are no banks to make you wait three business days, no extra fees for making an international transfer, and no special limitations on the minimum or maximum amount you can send.`}
        description={`business cards text`}
      />
    ),
    id: `international`
  },
  {
    img: pci,
    title: (
      <FormattedMessage
        id={`businessCards.pci.title`}
        defaultMessage={`No PCI compliance required`}
        description={`business cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`businessCard.pci.text`}
        defaultMessage={`Accepting credit cards online typically requires extensive security checks in order to comply with the PCI standard. Bitcoin still requires you to secure your wallet and your payment requests, however, you do not carry the costs and responsibilities that come with processing sensitive information from your customers like with credit card numbers.`}
        description={`business cards text`}
      />
    ),
    id: `visib`
  },
  {
    img: visib,
    title: (
      <FormattedMessage
        id={`businessCards.visib.title`}
        defaultMessage={`Get some free visibility`}
        description={`business cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`businessCard.visib.text`}
        defaultMessage={`Bitcoin is an emerging market of new customers who are searching for ways to spend their bitcoins. Accepting them is a good way to get new customers and give your business some new visibility. Accepting a new payment method has often shown to be a clever practice for online businesses.`}
        description={`business cards text`}
      />
    ),
    id: `visib`
  },
  {
    img: multi,
    title: (
      <FormattedMessage
        id={`businessCards.multi-sig.title`}
        defaultMessage={'Multi-signature'}
        description={`business cards title`}
      />
    ),

    text: (
      <FormattedMessage
        id={`businessCard.multi-sig.text`}
        defaultMessage={`Bitcoin also includes a multi-signature feature which allows bitcoins to be spent only if a subset of a group of people authorize the transaction. This can be used by a board of directors, for example, to prevent members from making expenditures without enough consent from other members, as well as to track which members permitted particular transactions.`}
        description={`business cards text`}
      />
    ),
    id: `multi`
  },
  {
    img: transparency,
    title: (
      <FormattedMessage
        id={`businessCards.transparency.title`}
        defaultMessage={'Accounting Transparency'}
        description={`business cards title`}
      />
    ),
    text: (
      <FormattedMessage
        id={`businessCard.transparency.text`}
        defaultMessage={`Many organizations are required to produce accounting documents about their activity. Using Bitcoin allows you to offer the highest level of transparency since you can provide information to verify balances and transactions through the block chain. For example, non-profit organizations can allow the public to see how much they receive in donations.`}
        description={`business cards text`}
      />
    ),
    id: `transparency`
  }
]
