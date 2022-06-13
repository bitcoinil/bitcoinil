import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import AlternatingTwoColumnRow from './AlternatingTwoColumnRow'
import { HowItWorksProps } from './Interfaces'

import NewUser from './img/new-user.svg'
import BlockChain from './img/blockchain.svg'
import PrivateKeys from './img/private-keys.svg'
import Mining from './img/mining.svg'
import Paper from './img/paper.svg'

interface HowItWorksItem {
  index: number
  imgSrc: string
  titleText: JSX.Element
  bodyText: JSX.Element
}

const howItWorksItems: HowItWorksItem[] = [
  {
    index: 0,
    imgSrc: NewUser,
    titleText: (
      <FormattedMessage
        id={`howitworks-basics-title`}
        defaultMessage={'The basics for a new user'}
        description={`howitworks-basics-title`}
      />
    ),
    bodyText: (
      <FormattedMessage
        id={`howitworks-basics-subtitle`}
        defaultMessage={
          "As a new user, you can get started with Bitcoin without understanding the technical details. Once you've installed a Bitcoin wallet on your computer or mobile phone, it will generate your first Bitcoin address and you can create more whenever you need one. You can disclose your addresses to your friends so that they can pay you or vice versa. In fact, this is pretty similar to how email works, except that Bitcoin addresses should be used only once."
        }
        description={`howitworks-basics-tsubitle`}
      />
    )
  },
  {
    index: 0,
    imgSrc: BlockChain,
    titleText: (
      <FormattedMessage
        id={`howitworks-balances-title`}
        defaultMessage={'Balances - How It Works'}
        description={`howitworks-XXXX-title`}
      />
    ),
    bodyText: (
      <FormattedMessage
        id={`howitworks-balances-subtitle`}
        defaultMessage={
          "The block chain is a shared public ledger on which the entire Bitcoin network relies. All confirmed transactions are included in the block chain. It allows Bitcoin wallets to calculate their spendable balance so that new transactions can be verified thereby ensuring they're actually owned by the spender. The integrity and the chronological order of the block chain are enforced with cryptography."
        }
        description={`howitworks-balances-title`}
      />
    )
  },
  {
    index: 0,
    imgSrc: PrivateKeys,
    titleText: (
      <FormattedMessage
        id={`howitworks-transactions-title`}
        defaultMessage={'Transactions - private keys'}
        description={`howitworks-transaction-title`}
      />
    ),
    bodyText: (
      <FormattedMessage
        id={`howitworks-transactions-subtitle`}
        defaultMessage={
          'A transaction is a transfer of value between Bitcoin wallets that gets included in the block chain. Bitcoin wallets keep a secret piece of data called a private key or seed, which is used to sign transactions, providing a mathematical proof that they have come from the owner of the wallet. The signature also prevents the transaction from being altered by anybody once it has been issued. All transactions are broadcast to the network and usually begin to be confirmed within 10-20 minutes, through a process called mining.'
        }
        description={`howitworks-transactions-subtitle`}
      />
    )
  },
  {
    index: 0,
    imgSrc: Mining,
    titleText: (
      <FormattedMessage
        id={`howitworks-processing-title`}
        defaultMessage={'Processing - mining'}
        description={`howitworks-processing-title`}
      />
    ),
    bodyText: (
      <FormattedMessage
        id={`howitworks-processing-subtitle`}
        defaultMessage={
          'Mining is a distributed consensus system that is used to confirm pending transactions by including them in the block chain. It enforces a chronological order in the block chain, protects the neutrality of the network, and allows different computers to agree on the state of the system. To be confirmed, transactions must be packed in a block that fits very strict cryptographic rules that will be verified by the network. These rules prevent previous blocks from being modified because doing so would invalidate all the subsequent blocks. Mining also creates the equivalent of a competitive lottery that prevents any individual from easily adding new blocks consecutively to the block chain. In this way, no group or individuals can control what is included in the block chain or replace parts of the block chain to roll back their own spends.'
        }
        description={`howitworks-processing-subtitle`}
      />
    )
  },
  {
    index: 0,
    imgSrc: Paper,
    titleText: (
      <FormattedMessage
        id={`howitworks-rabbit-hole-title`}
        defaultMessage={'Going down the rabbit hole'}
        description={`howitworks-rabbit-hole-title`}
      />
    ),
    bodyText: (
      <FormattedMessage
        id={`howitworks-rabbit-hole-subtitle`}
        defaultMessage={
          'This is just a short summary of Bitcoin. If you want to learn more of the details, you can read the original paper that describes its design, the developer documentation, or explore the Bitcoin wiki.'
        }
        description={`howitworks-rabbit-hole-subtitle`}
      />
    )
  }
]

const HowItWorks: React.FC<HowItWorksProps> = ({}) => {
  return (
    <StyledHowItWorks id="HowItWorks">
      <h1>
        <FormattedMessage
          id={`page.home.title`}
          defaultMessage={`HowItWorks`}
          description={`HowItWorks`}
        />
        {howItWorksItems.map((item, i) => {
          console.log(item)
          return (
            <AlternatingTwoColumnRow
              index={i}
              imgSrc={item.imgSrc}
              titleText={item.titleText}
              bodyText={item.bodyText}
            />
          )
        })}
      </h1>
    </StyledHowItWorks>
  )
}

export default HowItWorks

const StyledHowItWorks = styled.div``
