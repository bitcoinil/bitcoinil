import React from 'react'
import RoutePage from './RoutePage'

export const mainMenuItems = [
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
            title="Individuals"
            subtitle="Bitcoin for Individuals"
            body={<h1>Individuals Body</h1>}
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
            body={<h1>Business Body</h1>}
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
  }
]
