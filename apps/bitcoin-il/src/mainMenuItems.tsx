import * as React from 'react'
import BusinessBody from './BusinessesBody'
import IndividualsBody from './IndividualsBody'
import { MainMenuItem } from './Interfaces'
import RoutePage from './RoutePage'

export const mainMenuItems: MainMenuItem[] = [
  {
    label: 'Introduction',
    key: 'intro-menu',
    submenu: [
      {
        label: 'Individuals',
        key: 'individuals',
        element: (
          <RoutePage
            id="individuals"
            title="Bitcoin for Individuals"
            subtitle="Bitcoin is the easiest way to transact at a very low cost."
            body={<IndividualsBody />}
          />
        )
      },
      {
        label: 'Businesses',
        key: 'businesses',
        element: (
          <RoutePage
            title="Business"
            id="business"
            subtitle="Bitcoin for Business"
            body={<BusinessBody />}
          />
        )
      },
      {
        label: 'Developers',
        key: 'developers',
        element: (
          <RoutePage
            id="developers"
            title="Developers"
            subtitle="Bitcoin for Developers"
            body={<h1>Developers Body</h1>}
          />
        )
      },
      {
        label: 'Getting Started',
        key: 'getting-started',
        element: (
          <RoutePage
            id="getting-started"
            title="Getting Started"
            subtitle="Bitcoin for Getting Started"
            body={<h1>Getting Started Body</h1>}
          />
        )
      },
      {
        label: 'How It Works',
        key: 'how-it-works',
        element: (
          <RoutePage
            id="how-it-works"
            title="How It Works"
            subtitle="Bitcoin for How It Works"
            body={<h1>How It Works Body</h1>}
          />
        )
      },
      {
        label: 'White Paper',
        key: 'white-paper',
        element: (
          <RoutePage
            id="white-paper"
            title="White Paper"
            subtitle="Bitcoin for White Paper"
            body={<h1>White Paper Body</h1>}
          />
        )
      }
    ]
  },
  {
    label: 'Resources',
    key: 'resources-menu',
    submenu: [
      {
        label: 'Resources',
        key: 'resources',
        element: (
          <RoutePage
            id="resources"
            title="Resources"
            subtitle="Useful websites and resources about Bitcoin."
            body={<h1>Individuals Body</h1>}
          />
        )
      },
      {
        label: 'Exchanges',
        key: 'exchanges',
        element: (
          <RoutePage
            title="Exchanges"
            id="exchanges"
            subtitle="Places to buy bitcoin in exchange for other currencies."
            body={<h1>Business Body</h1>}
          />
        )
      },
      {
        label: 'Community',
        key: 'community',
        element: (
          <RoutePage
            id="Community"
            title="community"
            subtitle="Bitcoin for Community"
            body={<h1>Developers Body</h1>}
          />
        )
      },
      {
        label: 'Documentation',
        key: 'documentation',
        element: (
          <RoutePage
            id="documentation"
            title="Documentation"
            subtitle="Learn Bitcoin and start building Bitcoin-based applications."
            body={<h1>Getting Started Body</h1>}
          />
        )
      },
      {
        label: 'Vocabulary',
        key: 'vocabulary',
        element: (
          <RoutePage
            id="vocabulary"
            title="Vocabulary"
            subtitle="Bitcoin provides a new approach to payments and, as such, there are some new words that might become a part of your vocabulary."
            body={<h1>How It Works Body</h1>}
          />
        )
      },
      {
        label: 'Events',
        key: 'events',
        element: (
          <RoutePage
            id="events"
            title="White Paper"
            subtitle="Find events, conferences and meetups all over the world. Subscribe to the RSS feed."
            body={<h1>White Paper Body</h1>}
          />
        )
      },
      {
        label: 'BitCoin Core',
        key: 'core',
        element: (
          <RoutePage
            id="core"
            title="BitCoin Core"
            subtitle="Helping you keep Bitcoin decentralized."
            body={<h1>White Paper Body</h1>}
          />
        )
      }
    ]
  },
  {
    label: 'Innovation',
    key: 'innovation',
    element: (
      <RoutePage
        id="innovation"
        title="Innovation"
        subtitle="Bitcoin for Innovation"
        body={<h1>Innovation Body</h1>}
      />
    )
  },
  {
    label: 'Participate',
    key: 'participate',
    submenu: [
      {
        label: 'Support BitCoin',
        key: 'support',
        element: (
          <RoutePage
            id="Support"
            title="Support"
            subtitle="Bitcoin for Support"
            body={<>Support</>}
          />
        )
      },
      {
        label: 'Buy BitCoin',
        key: 'Buy',
        element: (
          <RoutePage
            title="Buy"
            id="Buy"
            subtitle="Bitcoin - Buy"
            body={<>BUY</>}
          />
        )
      },
      {
        label: 'Running a full node',
        key: 'full-node',
        element: (
          <RoutePage
            id="full-node"
            title="full-node"
            subtitle="Bitcoin for full-node"
            body={<h1>Full Node</h1>}
          />
        )
      },
      {
        label: 'Development',
        key: 'development',
        element: (
          <RoutePage
            id="development"
            title="Development"
            subtitle="Bitcoin for Development"
            body={<h1>Development Body</h1>}
          />
        )
      }
    ]
  },
  {
    label: 'FAQ',
    key: 'FAQ',
    element: (
      <RoutePage
        id="FAQ"
        title="FAQ"
        subtitle="Bitcoin for FAQ"
        body={<h1>FAQ Body</h1>}
      />
    )
  }
]
