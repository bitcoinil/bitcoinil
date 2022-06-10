import * as React from 'react'
import styled from 'styled-components'

import CardsDisplay from './CardsDisplay'
import donate from './img/ico_donate.svg'
import decentralization from './img/ico_decentralization.svg'
import develop from './img/ico_develop.svg'
import docs from './img/ico_docs.svg'
import mining from './img/ico_mining.svg'
import law from './img/ico_law.svg'
import spread from './img/ico_spread.svg'
import translate from './img/ico_translate.svg'
import trust from './img/ico_trust.svg'
import using from './img/ico_using.svg'
import chat from './img/ico_chat.svg'
import network from './img/ico_network.svg'
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
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'
// import efficiency from './img/ico_efficiency.svg'

import { BodyCard, SupportBodyProps } from './Interfaces'

const supportCards: BodyCard[] = [
  {
    img: using,
    title: `Using BitCoin Il`,
    text: `Using Bitcoin is the first thing you can do to support Bitcoin. There are probably many cases where it can make your life easier. You can accept payments and make purchases with Bitcoin.`,
    id: `using`
  },
  {
    img: network,
    title: 'Be the network',
    text: `If you have a good Internet connection, you can strengthen the Bitcoin network by keeping full node software running on your computer or server with port 8333 open. Full nodes are securing and relaying all transactions.`,
    id: `network`
  },
  {
    img: mining,
    title: 'Mining',
    text: `You can start mining bitcoins to help processing transactions. In order to protect the network, you should join smaller mining pools and prefer decentralized pools like P2Pool or pools with getblocktemplate (GBT) support.`,
    id: 'network'
  },
  {
    img: translate,
    title: `Translate`,
    text: `You can help spread Bitcoin awareness by translating or improving translations inside important parts of the Bitcoin ecosystem. Just pick a project you would like to help with.

    Bitcoin Core - Bitcoin.org - Bitcoin Wiki - Bitcoin Wallet (Android) - Electrum`,
    id: `translate`
  },
  {
    img: develop,
    title: `Devlopment`,
    text: `Bitcoin is free software. If you are a developer, you can use your superpowers to do good and improve Bitcoin. Or you can build amazing new services or software that use Bitcoin.`,
    id: `develop`
  },
  {
    img: donate,
    title: `Donation`,
    text: `The easiest way to help is to donate some bitcoin to BitGive. Or you can help directly fund any project related to Bitcoin that you believe will be helpful in the future.`,
    id: `donate`
  },
  {
    img: law,
    title: 'Organizations',
    text: `Many non-profit organizations are dedicated to protecting and promoting Bitcoin. You can help these groups by joining them and taking part in their projects, discussions and events.`,
    id: `law`
  },
  {
    img: spread,
    title: 'Spread',
    text: `Speak about Bitcoin to interested people. Write about it on your blog. Tell your favorite shops you would like to pay with Bitcoin. Help to keep merchant directories up to date. Or be creative and make yourself a nice Bitcoin T-shirt.`,
    id: `spread`
  },
  {
    img: docs,
    title: 'Documentation',
    text: `Bitcoin.org and the Bitcoin wiki provide useful documentation and we are constantly improving the information they contain. You can help to improve these resources and keep them up to date.`,
    id: `docs`
  },
  {
    img: chat,
    title: 'Meet the communities',
    text: `You can join Bitcoin communities and talk with other Bitcoin enthusiasts. You can learn more about Bitcoin every day, give help to new users and get involved in interesting projects.`,
    id: `chat`
  }
]

const SupportBody: React.FC<SupportBodyProps> = ({}) => {
  return (
    <StyledSupportBody id="IndividualsBody">
      <CardsDisplay cards={supportCards} />
    </StyledSupportBody>
  )
}

export default SupportBody

const StyledSupportBody = styled.div`
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
