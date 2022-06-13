import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import CardsDisplay from './CardsDisplay'
import { BodyCard } from './Interfaces'
import { NavLink } from 'react-router-dom'

import ico_solve from './img/ico_solve.svg'
import ico_invoice from './img/ico_invoice.svg'
import ico_market from './img/ico_market.svg'
import ico_doc from './img/ico_doc.svg'
import ico_voucher from './img/ico_voucher.svg'

interface ResourcesBodyProps {}

const resourceCards: BodyCard[] = [
  {
    img: ico_solve,
    title: (
      <FormattedMessage
        id={`resourceCards.learn-res.title`}
        defaultMessage={'Learning Resources'}
        description={`individuals card mobile title`}
      />
    ),

    text: (
      <ul className="list-of-links">
        <li>
          <a href="https://en.bitcoin.it">
            <FormattedMessage
              id={`resources.wiki.text`}
              defaultMessage={`BitCoin Wiki`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://www.khanacademy.org/economics-finance-domain/core-finance/money-and-banking/bitcoin/v/bitcoin-what-is-it">
            <FormattedMessage
              id={`resources.khan.text`}
              defaultMessage={`Khan Academy`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="http://letstalkbitcoin.com/">
            <FormattedMessage
              id={`resources.talk.text`}
              defaultMessage={'Lets Talk BitCoin'}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="http://www.bitcoin.kn/">
            <FormattedMessage
              id={`resources.podcast.text`}
              defaultMessage={`BitCoin Knowledge Podcast`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://www.weusecoins.com/">
            <FormattedMessage
              id={`resources.weusecoins.text`}
              defaultMessage={`We Use Coins`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://www.bitcoinmining.com/">
            <FormattedMessage
              id={`resources.mining.text`}
              defaultMessage={`BitCoinMining.com`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="http://www.iamsatoshi.com/category/video-archive/">
            <FormattedMessage
              id={`resources.satoshi.text`}
              defaultMessage={`IamSatoshi`}
              description={`Description`}
            />
          </a>
        </li>
        <li>
          <a href="https://www.lopp.net/bitcoin-information.html">
            <FormattedMessage
              id={`resources.resources.text`}
              defaultMessage={`Resources`}
              description={`Description`}
            />
          </a>
        </li>
      </ul>
    ),
    id: 'learning-resources'
  },
  {
    img: ico_invoice,
    title: (
      <FormattedMessage
        id={`resourceCards.directories.title`}
        defaultMessage={`Directories`}
        description={`individuals card lock title`}
      />
    ),

    text: (
      <ul className="list-of-links">
        <li>
          <a href="https://bitcoinwide.com/">
            <FormattedMessage
              id={`resourceCards.directories.wallets`}
              defaultMessage={`Wallets`}
              description={`resourceCards.directories.wallets`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.wallets.post-link-text`}
            defaultMessage={`bitcoin.org`}
            description={`resourceCards.directories.wallets.post-link-text`}
          />
        </li>
        <li>
          <a href="https://bitcoinwide.com/">
            <FormattedMessage
              id={`resourceCards.directories.merchants-wide`}
              defaultMessage={`Merchants`}
              description={`resourceCards.directories.merchants-wide`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.merchants-wide.post-link-text`}
            defaultMessage={`BitCoinWide.com`}
            description={`resourceCards.directories.merchants-wide.post-link-text`}
          />
        </li>
        <li>
          <a href="https://coinmap.org/">
            <FormattedMessage
              id={`resourceCards.directories.merchants-coinMap`}
              defaultMessage={`Merchants`}
              description={`resourceCards.directories.merchants-coinMap`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.merchants-coinMap.post-link-text`}
            defaultMessage={`CoinMap.org`}
            description={`resourceCards.directories.merchants-coinMap.post-link-text`}
          />
        </li>
        <li>
          <a href="https://spendabit.co/">
            <FormattedMessage
              id={`resourceCards.directories.merchants-spend`}
              defaultMessage={`Merchants`}
              description={`resourceCards.directories.merchants-spend`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.merchants-spend.post-link-text`}
            defaultMessage={`SpendABit.io`}
            description={`resourceCards.directories.merchants-spend.post-link-text`}
          />
        </li>
        <li>
          <a href="https://spendabit.co/">
            <FormattedMessage
              id={`resourceCards.directories.merchants-spend`}
              defaultMessage={`Merchants`}
              description={`resourceCards.directories.merchants-spend`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.merchants-spend.post-link-text`}
            defaultMessage={`SpendABit.io`}
            description={`resourceCards.directories.merchants-spend.post-link-text`}
          />
        </li>
        <li>
          <a href="https://99bitcoins.com/who-accepts-bitcoins-payment-companies-stores-take-bitcoins/">
            <FormattedMessage
              id={`resourceCards.directories.merchants-99`}
              defaultMessage={`Merchants`}
              description={`resourceCards.directories.merchants-99`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.merchants-99.post-link-text`}
            defaultMessage={`99BitCoins.com`}
            description={`resourceCards.directories.merchants-99.post-link-text`}
          />
        </li>
        <li>
          <a href="https://www.buybitcoinworldwide.com/">
            <FormattedMessage
              id={`resourceCards.directories.exchanges`}
              defaultMessage={`Exchanges`}
              description={`resourceCards.directories.exchanges`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.exchanges.post-link-text`}
            defaultMessage={`buybitcoinworldwide.com`}
            description={`resourceCards.directories.exchanges.post-link-text`}
          />
        </li>
        <li>
          <a href="https://www.bitrawr.com/">
            <FormattedMessage
              id={`resourceCards.directories.exchanges-bitrawr`}
              defaultMessage={`Exchanges`}
              description={`resourceCards.directories.exchanges-bitrawr`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.exchanges-bitrawr.post-link-text`}
            defaultMessage={`bitrawr.com`}
            description={`resourceCards.directories.exchanges-bitrawr.post-link-text`}
          />
        </li>
        <li>
          <a href="https://en.bitcoin.it/wiki/Category:Shopping_Cart_Interfaces">
            <FormattedMessage
              id={`resourceCards.directories.merchant-tools`}
              defaultMessage={`Merchant Tools`}
              description={`resourceCards.directories.merchant-tools`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.merchant-tools.post-link-text`}
            defaultMessage={`en.bitcoin.it`}
            description={`resourceCards.directories.merchant-tools.post-link-text`}
          />
        </li>
        <li>
          <a href="http://www.bitcoinprojects.net/">
            <FormattedMessage
              id={`resourceCards.directories.projects`}
              defaultMessage={`Projects`}
              description={`resourceCards.directories.projects`}
            />
          </a>
          {'  '}-{'  '}
          <FormattedMessage
            id={`resourceCards.directories.projects.post-link-text`}
            defaultMessage={`BitcoinProjects.net`}
            description={`resourceCards.directories.projects.post-link-text`}
          />
        </li>
      </ul>
    ),

    id: `security-and-control`
  },
  {
    img: ico_market,
    title: (
      <FormattedMessage
        id={`resourceCards.charts.title`}
        defaultMessage={`Charts and Statistics`}
        description={`individuals card charts title`}
      />
    ),
    text: (
      <ul className="list-of-links">
        <li>
          <a href="https://statoshi.info/">
            <FormattedMessage
              id={`resourceCards.charts.satoshi`}
              defaultMessage={`Statoshi.info`}
              description={`resourceCards.charts.satoshi`}
            />
          </a>
        </li>
        {/*  */}
        <li>
          <a href="https://bitaps.com/">
            <FormattedMessage
              id={`resourceCards.charts.bitaps`}
              defaultMessage={`bitaps.com`}
              description={`resourceCards.charts.bitaps`}
            />
          </a>
        </li>
        <li>
          <a href="https://live.blockcypher.com/btc">
            <FormattedMessage
              id={`resourceCards.charts.blockcypher`}
              defaultMessage={`blockcypher`}
              description={`resourceCards.charts.blockcypher`}
            />
          </a>
        </li>
        {/*  */}
        <li>
          <a href="https://mempool.space/">
            <FormattedMessage
              id={`resourceCards.charts.mempool`}
              defaultMessage={`mempool.space`}
              description={`resourceCards.charts.mempool`}
            />
          </a>
        </li>
        <li>
          <a href="https://tradeblock.com/bitcoin">
            <FormattedMessage
              id={`resourceCards.charts.tradeblock`}
              defaultMessage={`TradeBlock`}
              description={`resourceCards.charts.tradeblock`}
            />
          </a>
        </li>
        {/*  */}
        <li>
          <a href="https://bitcoincharts.com/charts/">
            <FormattedMessage
              id={`resourceCards.charts.tradeblock`}
              defaultMessage={`BitCoinCharts.com`}
              description={`resourceCards.charts.tradeblock`}
            />
          </a>
        </li>
        <li>
          <a
            href="        https://gobitcoin.io/en/
"
          >
            <FormattedMessage
              id={`resourceCards.charts.go-bitcoin`}
              defaultMessage={`GoBitCoin.io`}
              description={`resourceCards.charts.go-bitcoin`}
            />
          </a>
        </li>

        <li>
          <a href="https://bitcoinaverage.com/en/bitcoin-price/btc-to-usd">
            <FormattedMessage
              id={`resourceCards.charts.go-bitcoin`}
              defaultMessage={`BitCoinAverage`}
              description={`resourceCards.charts.bitcoin-average`}
            />
          </a>
        </li>
      </ul>
    ),

    id: `simple`
  },
  {
    img: ico_doc,
    title: (
      <FormattedMessage
        id={`resourceCards.docus.title`}
        defaultMessage={`Documentaries`}
        description={`individuals card international title`}
      />
    ),

    text: (
      <ul className="list-of-links">
        <li>
          <a href="http://iamsatoshi.com/">
            <FormattedMessage
              id={`resourceCards.docus.ulterior`}
              defaultMessage={`Ulterior States`}
              description={`resourceCards.charts.ulterior`}
            />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=6pWblf8COH4">
            <FormattedMessage
              id={`resourceCards.docus.phenom`}
              defaultMessage={`The BitCoin Phenomenon`}
              description={`resourceCards.charts.phenom`}
            />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=LszOt51OjXU">
            <FormattedMessage
              id={`resourceCards.docus.bubble`}
              defaultMessage={`BitCoin Beyond The Bubble`}
              description={`resourceCards.charts.bubble`}
            />
          </a>
        </li>
        <li>
          <a
            href="        https://www.youtube.com/watch?v=PVo5wCSnmSs
"
          >
            <FormattedMessage
              id={`resourceCards.docus.magic-money`}
              defaultMessage={`Magic Money: The Bitcoin Revolution`}
              description={`resourceCards.charts.magic-money`}
            />
          </a>
        </li>

        <li>
          <a href="https://www.youtube.com/watch?v=HUpGHOLkoXs">
            <FormattedMessage
              id={`resourceCards.docus.evolution`}
              defaultMessage={`Evolution of BitCoin`}
              description={`resourceCards.charts.evolution`}
            />
          </a>
        </li>
      </ul>
    ),
    id: `documentaries`
  },
  {
    img: ico_voucher,
    title: (
      <FormattedMessage
        id={`resourceCards.lowfee.title`}
        defaultMessage={`Vouchers`}
        description={`individuals card lowfee title`}
      />
    ),
    text: (
      <ul className="list-of-links">
        <li>
          <a href="https://www.bitrefill.com/">
            <FormattedMessage
              id={`resourceCards.vouchers.bitrefill`}
              defaultMessage={`Bitrefill`}
              description={`resourceCards.vouchers.bitrefill`}
            />
          </a>
        </li>
        <li>
          <a href="https://foldapp.com/">
            <FormattedMessage
              id={`resourceCards.vouchers.phenom`}
              defaultMessage={`Fold`}
              description={`resourceCards.vouchers.fold`}
            />
          </a>
        </li>
        <li>
          <a href="https://gyft.com/bitcoin/">
            <FormattedMessage
              id={`resourceCards.vouchers.Gyft`}
              defaultMessage={`Gyft`}
              description={`resourceCards.vouchers.Gyft`}
            />
          </a>
        </li>
        <li>
          <a href="https://opendime.com/">
            <FormattedMessage
              id={`resourceCards.vouchers.opendime`}
              defaultMessage={`OpenDime`}
              description={`resourceCards.vouchers.opendime`}
            />
          </a>
        </li>
      </ul>
    ),

    id: `vouchers`
  },
  {
    img: ico_invoice,
    title: (
      <FormattedMessage
        id={`resourceCards.guides.title`}
        defaultMessage={'Guides'}
        description={`Guides`}
      />
    ),

    text: (
      <ul className="list-of-links">
        <li>
          <a href="https://mattodell.keybase.pub/coldcard.html">
            <FormattedMessage
              id={`resourceCards.guides.coldcard`}
              defaultMessage={`Coldcard`}
              description={`resourceCards.guides.coldcard`}
            />
          </a>
        </li>
        <li>
          <a href="https://bitcoiner.guide/">
            <FormattedMessage
              id={`resourceCards.guides.bitcoiner`}
              defaultMessage={`Bitcoiner.Guide`}
              description={`resourceCards.guides.bitcoiner`}
            />
          </a>
        </li>
        <li>
          <a href="http://node.guide/">
            <FormattedMessage
              id={`resourceCards.guides.node`}
              defaultMessage={`Node.guide`}
              description={`resourceCards.guides.node`}
            />
          </a>
        </li>
      </ul>
    ),

    id: `anon`
  }
]

const ResourcesBody: React.FC<ResourcesBodyProps> = ({}) => {
  return (
    <StyledResourcesBody id="ResourcesBody">
      <CardsDisplay cards={resourceCards} />
    </StyledResourcesBody>
  )
}

export default ResourcesBody

const StyledResourcesBody = styled.div`
  .list-of-links {
    display: flex;
    flex-direction: column;
    text-align: center;
    list-style: none;
  }
`
