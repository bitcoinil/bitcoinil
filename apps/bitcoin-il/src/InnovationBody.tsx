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
import accessibility from './img/ico_accessibility.svg'
import efficiency from './img/ico_efficiency.svg'
import donation from './img/ico_donation.svg'
import crowdfunding from './img/ico_crowdfunding.svg'
import microPayments from './img/ico_micro-payments.svg'
import mediation from './img/ico_mediation.svg'
import multiSignature from './img/ico_multi-signature.svg'
import trust from './img/ico_trust.svg'
import decentralization from './img/ico_decentralization.svg'
import automatization from './img/ico_automatization.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'

import { BodyCard, InnovationBodyProps } from './Interfaces'

const innovationCards: BodyCard[] = [
  {
    img: control,
    title: `Control against fraud`,
    text: `An unprecedented level of security is possible with Bitcoin. The network provides users with protection against most prevalent types of fraud like chargebacks or unwanted charges, and bitcoins are impossible to counterfeit. Users can backup or encrypt their wallets. Hardware wallets make it very difficult to steal or lose money. Bitcoin is designed to allow its users to have complete control over their money.`,
    id: `control`
  },
  {
    img: accessibility,
    title: 'Global accessibility',
    text: `With Bitcoin, all payments in the world can be fully interoperable. Bitcoin allows any bank, business or individual to securely send and receive payments anywhere at any time, with or without a bank account. Bitcoin is available in a large number of countries that still remain out of reach for most payment systems due to their own limitations. Bitcoin increases global access to commerce and it can help international trades to flourish.`,
    id: 'accessibility'
  },
  {
    img: efficiency,
    title: `Cost efficiency`,
    text: `With the use of cryptography, secure payments are possible without slow and costly middlemen. A Bitcoin transaction can be much cheaper than its alternatives and be completed in a short time. This means Bitcoin holds some potential to become a common way to transfer any currency in the future. Bitcoin could also play a role in reducing poverty in many countries by cutting high transaction fees on workers' salary.`,
    id: `efficiency`
  },
  {
    img: donation,
    title: `Tips and Donations`,
    text: `Bitcoin has been a particularly efficient solution for tips and donations. Sending a payment only requires one click and receiving donations can be as simple as displaying a QR code. Donations can be visible for the public, giving increased transparency for non-profit organizations. In cases of emergencies such as natural disasters, Bitcoin donations could contribute to a faster international response.`,
    id: `donation`
  },
  {
    img: crowdfunding,
    title: `Crowdfunding`,
    text: `Bitcoin can be used to run Kickstarter-like crowdfunding campaigns, in which individuals pledge money to a project that is taken from them only if enough pledges are received to meet the target. Such assurance contracts are processed by the Bitcoin protocol, which prevents a transaction from taking place until all conditions have been met. Learn more about the technology behind crowdfunding.`,
    id: `crowdfunding`
  },
  {
    img: microPayments,
    title: 'Micro Payments',
    text: `Imagine listening to Internet radio paid by the second, viewing web pages with a small tip for each ad not shown, or buying bandwidth from a WiFi hotspot by the kilobyte. Bitcoin is efficient enough to make all of these ideas possible. Learn more about the technology behind Bitcoin micropayments or about future upgrades currently being designed and implemented to make micropayments more accessible.`,
    id: `micro-payments`
  },
  {
    img: mediation,
    title: 'Dispute Mediation',
    text: `Bitcoin can be used to develop innovative dispute mediation services using multiple signatures. Such services could make it possible for a third party to approve or reject a transaction in case of disagreement between the other parties without having control of their money. Since these services would be compatible with any user and merchant using Bitcoin, this would likely lead to free competition and higher quality standards.`,
    id: `mediation`
  },
  {
    img: multiSignature,
    title: 'Multi-signature Accounts',
    text: `Multiple signatures allow a transaction to be accepted by the network only if a certain number of a defined group of persons agree to sign the transaction. This could be used by a board of directors to prevent any member to spend parts of their treasury without other members' consent. This can also be used by banks to prevent theft by blocking payments above a threshold if the user does not provide additional credentials.`,
    id: `multi-signature`
  },
  {
    img: trust,
    title: 'Trust and integrity',
    text: `Bitcoin offers solutions to many of the trust problems that plague banks. With selective accounting transparency, digital contracts, and irreversible transactions, Bitcoin can be used as a ground to restore trust and agreement. Crooked banks cannot cheat the system to make a profit at the expense of other banks or the public. A future in which major banks would support Bitcoin could help to reinstate integrity and trust in financial institutions.`,
    id: `trust`
  },
  {
    img: decentralization,
    title: 'Resilience and decentralization',
    text: `By way of decentralization, Bitcoin created a different type of payment network with an increased level of resilience and redundancy. Bitcoin can handle millions of dollars in trades without requiring military protection. With no central point of failure such as a data center, attacking the network is difficult. Bitcoin could represent an interesting step forward in securing local and global financial systems.`,
    id: `decentralization`
  },
  {
    img: transparency,
    title: 'Flexible Transparency',
    text: `All Bitcoin transactions are public and transparent and the identity of the people behind transactions are private by default. This allows individuals and organizations to work with flexible transparency rules. For instance, a business can choose to reveal certain transactions and balances only to certain employees just like a non-profit organization is free to allow the public to see how much they receive in daily and monthly donations.`,
    id: `transparency`
  },
  {
    img: automatization,
    title: 'Automated solutions',
    text: `Automated services usually have to deal with costs and limitations of cash, or credit card payments. This includes all kinds of vending machines, from train tickets to soda machines. Bitcoin is suited to be used in a new generation of automated services to cut their operating costs. Imagine self-driving taxis or a store where you can pay for your purchases without waiting in line. Many ideas are possible.`,
    id: `automatization`
  }
]

const InnovationBody: React.FC<InnovationBodyProps> = ({}) => {
  return (
    <StyledInnovationBody id="IndividualsBody">
      <CardsDisplay cards={innovationCards} />
    </StyledInnovationBody>
  )
}

export default InnovationBody

const StyledInnovationBody = styled.div`
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
