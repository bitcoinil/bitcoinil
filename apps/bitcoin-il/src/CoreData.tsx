import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { CoreBox, CoreShortcutBox, Link } from './Interfaces'
import ico_features from './img/ico_features.svg'
import ico_help from './img/ico_help.svg'
import ico_contribute from './img/ico_contribute.svg'
import ico_news from './img/ico_news.svg'
import ico_rss from './img/ico_rss.svg'
import ico_decentralized from './img/ico_decentralized.svg'
import ico_no_voting from './img/ico_no_voting.svg'

export const links: Link[] = [
  {
    linkText: 'Better security',
    link: 'https://bitcoin.org/en/bitcoin-core/features/validation',
    postLinkText: 'for their bitcoins'
  },
  {
    linkText: 'Privacy features',
    link: 'https://bitcoin.org/en/bitcoin-core/features/privacy',
    postLinkText: 'not available in other wallets'
  },
  {
    linkText: 'User interfaces',
    link: 'https://bitcoin.org/en/bitcoin-core/features/user-interface',
    postLinkText: 'and other powerful features'
  }
]
export const coreShortcuts: CoreShortcutBox[] = [
  {
    title: (
      <FormattedMessage
        id={`core.shortcuts.features.title`}
        defaultMessage={`Features`}
        description={`features`}
      />
    ),
    subtitle: (
      <FormattedMessage
        id={`core.shortcuts.features.subtitle`}
        defaultMessage={`Discover what Bitcoin Core offers`}
        description={`features`}
      />
    ),
    link: 'string',
    image: ico_features
  },
  {
    title: (
      <FormattedMessage
        id={`core.shortcuts.get-help.title`}
        defaultMessage={`Get Help`}
        description={`get-help`}
      />
    ),
    subtitle: (
      <FormattedMessage
        id={`core.shortcuts.get-help.subtitle`}
        defaultMessage={`Documentation, forums, chat rooms`}
        description={`get-help`}
      />
    ),
    link: 'string',
    image: ico_help
  },
  {
    title: (
      <FormattedMessage
        id={`core.shortcuts.contribute.title`}
        defaultMessage={`Contribute`}
        description={`contribute`}
      />
    ),
    subtitle: (
      <FormattedMessage
        id={`core.shortcuts.contribute.subtitle`}
        defaultMessage={`Code, translations, and more`}
        description={`contribute`}
      />
    ),
    link: 'string',
    image: ico_contribute
  }
]

export const newsCards: CoreShortcutBox[] = [
  {
    title: (
      <FormattedMessage
        id={`core.shortcuts.releases.title`}
        defaultMessage={`Bitcoin Core Releases`}
        description={`releases`}
      />
    ),
    subtitle: (
      <FormattedMessage
        id={`core.shortcuts.releases.subtitle`}
        defaultMessage={`For more News, see the complete list`}
        description={`releases`}
      />
    ),
    link: 'string',
    image: ico_news
  },
  {
    title: (
      <FormattedMessage
        id={`core.shortcuts.rss.title`}
        defaultMessage={`Subscribe to the RSS feed`}
        description={`rss`}
      />
    ),
    subtitle: (
      <FormattedMessage
        id={`core.shortcuts.rss.subtitle`}
        defaultMessage={`For more notifications of new releases`}
        description={`rss`}
      />
    ),
    link: 'string',
    image: ico_rss
  }
]

export const mainBoxes: CoreBox[] = [
  {
    img: ico_decentralized,
    title: (
      <FormattedMessage
        id={`core.main.decentralized.title`}
        defaultMessage={`Decentralized`}
        description={`id`}
      />
    ),
    mainText: (
      <FormattedMessage
        id={`core.main.decentralized.mainText`}
        defaultMessage={`It is these users who keep Bitcoin decentralized. They individually run their own Bitcoin Core full nodes, and each of those full nodes separately follows the exact same rules to decide which block chain is valid.`}
        description={`decentralized.mainText `}
      />
    )
  },
  {
    img: ico_no_voting,
    title: (
      <FormattedMessage
        id={`core.main.no-voting.title`}
        defaultMessage={`No Voting`}
        description={`id`}
      />
    ),
    mainText: (
      <FormattedMessage
        id={`core.main.no-voting.mainText`}
        defaultMessage={`There's no voting or other corruptible process involved: there's just individual software following identical rules—"math"—to evaluate identical blocks and coming to identical conclusions about which block chain is valid.`}
        description={`no-voting.mainText`}
      />
    )
  }
]
