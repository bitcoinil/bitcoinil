import * as React from 'react'
import BusinessBody from './BusinessesBody'
import GettingStartedBody from './GettingStartedBody'
import HowItWorks from './HowItWorks'
import IndividualsBody from './IndividualsBody'
import InnovationBody from './InnovationBody'
import { MainMenuItem } from './Interfaces'
import RoutePage from './RoutePage'
import SupportBody from './SupportBody'
import { FormattedMessage } from 'react-intl'
import ResourcesBody from './ResourcesBody'
import CommunityBody from './CommunityBody'
import VocabularyBody from './VocabularyBody'
import ExchangesBody from './ExchangesBody'
import EventsBody from './EventsBody'
import CoreBody from './CoreBody'
import WhitePaperBody from './WhitePaperBody'
import BuyBody from './BuyBody'
import FAQBody from './FAQBody'

export const mainMenuItems: MainMenuItem[] = [
  {
    label: (
      <FormattedMessage
        id={`mainMenu.intro.label`}
        defaultMessage={'Introduction'}
        description={`mainMenu item intro`}
      />
    ),
    key: 'intro-menu',
    submenu: [
      {
        label: (
          <FormattedMessage
            id={`mainMenu.individuals.label`}
            defaultMessage={'Individuals'}
            description={`mainMenu item intro`}
          />
        ),
        key: 'individuals',
        element: (
          <RoutePage
            id="individuals"
            title={
              <FormattedMessage
                id={`mainMenuItem.individuals.title`}
                defaultMessage={`Bitcoin for Individuals`}
                description={`individuals.title`}
              />
            }
            // "Bitcoin for Individuals"
            // "Bitcoin is the easiest way to transact at a very low cost."
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.individuals.subtitle`}
                defaultMessage={`Bitcoin is the easiest way to transact at a very low cost.`}
                description={`individuals.subtitle`}
              />
            }
            body={<IndividualsBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.businesses.label`}
            defaultMessage={'Businesses'}
            description={`mainMenu Business Label`}
          />
        ),
        key: 'businesses',
        element: (
          <RoutePage
            title={
              <FormattedMessage
                id={`mainMenuItem.business.title`}
                defaultMessage={`Business`}
                description={`business.title`}
              />
            }
            // "Business"
            id="business"
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.business.subtitle`}
                defaultMessage={`Bitcoin is a very secure and inexpensive way to handle payments.`}
                description={`business.subtitle`}
              />
            }
            body={<BusinessBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.devs.label`}
            defaultMessage={'Developers'}
            description={`mainMenu Devs Label`}
          />
        ),
        key: 'developers',
        element: (
          <RoutePage
            id="developers"
            title={
              <FormattedMessage
                id={`mainMenuItem.developers.title`}
                defaultMessage={`Developers`}
                description={`developers`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.devleopers.subtitle`}
                defaultMessage={`Bitcoin for Developers`}
                description={`devleopers.subtitle`}
              />
            }
            body={<h1>Developers Body</h1>}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.gettings-started.label`}
            defaultMessage={`Getting Started`}
            description={`mainMenu getting started label`}
          />
        ),
        key: 'getting-started',
        element: (
          <RoutePage
            id="getting-started"
            title={
              <FormattedMessage
                id={`mainMenuItem.getting-started.title`}
                defaultMessage={`Getting started with Bitcoin Il`}
                description={`getting-started`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.getting-started.subtitle`}
                defaultMessage={`Using Bitcoin to transact is easy and accessible to everyone.`}
                description={`getting-started.subtitle`}
              />
            }
            body={<GettingStartedBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.how-it-works.label`}
            defaultMessage={'How does Bitcoin work?'}
            description={`mainMenu how it works`}
          />
        ),
        key: 'how-it-works',
        element: (
          <RoutePage
            id="how-it-works"
            title={
              <FormattedMessage
                id={`mainMenuItem.how-it-works.title`}
                defaultMessage={`How It Works`}
                description={`how-it-works.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.how-it-works.subtitle`}
                defaultMessage={`This is a question often surrounded by confusion, so here's a quick explanation!`}
                description={`how-it-works.subtitle`}
              />
            }
            body={<HowItWorks />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.white-paper.label`}
            defaultMessage={`White Paper`}
            description={`mainMenu white paper label`}
          />
        ),
        key: 'white-paper',
        element: (
          <RoutePage
            id="white-paper"
            title={
              <FormattedMessage
                id={`mainMenuItem.white-paper.title`}
                defaultMessage={`Bitcoin: A Peer-to-Peer Electronic Cash System`}
                description={`white-paper`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.white-paper.subtitle`}
                defaultMessage={`The paper that first introduced Bitcoin`}
                description={`white-paper.subtitle`}
              />
            }
            body={<WhitePaperBody />}
          />
        )
      }
    ]
  },
  {
    label: (
      <FormattedMessage
        id={`mainMenu.resources.label`}
        defaultMessage={'Resources'}
        description={`mainMenu resources label`}
      />
    ),
    key: 'resources-menu',
    submenu: [
      {
        label: (
          <FormattedMessage
            id={`mainMenu.resources.submenu.label`}
            defaultMessage={'Resources'}
            description={`mainMenu.resources.submenu-label`}
          />
        ),
        key: 'resources',
        element: (
          <RoutePage
            id="resources"
            title={
              <FormattedMessage
                id={`mainMenuItem.resources.title`}
                defaultMessage={`Resources`}
                description={`resources.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.resources.subtitle`}
                defaultMessage={`Useful websites and resources about Bitcoin.`}
                description={`resources.subtitle`}
              />
            }
            body={<ResourcesBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.exchanges.label`}
            defaultMessage={'Exchanges'}
            description={`mainMenu.exchanges.label`}
          />
        ),
        key: 'exchanges',
        element: (
          <RoutePage
            title={
              <FormattedMessage
                id={`mainMenuItem.exhanges.title`}
                defaultMessage={`Exchanges`}
                description={`exhanges.title`}
              />
            }
            id="exchanges"
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.exhanges.subtitle`}
                defaultMessage={`Places to buy bitcoin in exchange for other currencies.`}
                description={`exhanges.subtitle`}
              />
            }
            body={<ExchangesBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.community.label`}
            defaultMessage={`Community`}
            description={`mainMenu.community.label`}
          />
        ),
        key: 'community',
        element: (
          <RoutePage
            id="Community"
            title={
              <FormattedMessage
                id={`mainMenuItem.communities.title`}
                defaultMessage={`Bitcoin Communities`}
                description={`communities.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.communities.subtitle`}
                defaultMessage={`Find interesting people, groups and communities related to Bitcoin.`}
                description={`communities.subtitle`}
              />
            }
            body={<CommunityBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.docs.label`}
            defaultMessage={`Documentation`}
            description={`mainMenu.docs.label`}
          />
        ),
        key: 'documentation',
        element: (
          <RoutePage
            id="documentation"
            title={
              <FormattedMessage
                id={`mainMenuItem.Documentation.title`}
                defaultMessage={`Documentation`}
                description={`Documentation.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.documentation.subtitle`}
                defaultMessage={`Learn Bitcoin and start building Bitcoin-based applications.`}
                description={`documentation.subtitle`}
              />
            }
            body={<h1>Getting Started Body</h1>}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.vocab.label`}
            defaultMessage={`Vocabulary`}
            description={`mainMenu.vocab.label`}
          />
        ),
        key: 'vocabulary',
        element: (
          <RoutePage
            id="vocabulary"
            title={
              <FormattedMessage
                id={`mainMenuItem.vocab.title`}
                defaultMessage={`"Some Bitcoin words you might hear"`}
                description={`vocab.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.vocab.subtitle`}
                defaultMessage={`Bitcoin provides a new approach to payments and, as such, there are some new words that might become a part of your vocabulary.`}
                description={`vocab.subtitle`}
              />
            }
            body={<VocabularyBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.events.label`}
            defaultMessage={`Events`}
            description={`mainMenu.events.label`}
          />
        ),

        key: 'events',
        element: (
          <RoutePage
            id="events"
            title={
              <FormattedMessage
                id={`mainMenuItem.conferences.title`}
                defaultMessage={`Conferences and Events`}
                description={`conferences.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.conferences.subtitle`}
                defaultMessage={`Find events, conferences and meetups all over the world. Subscribe to the RSS feed.`}
                description={`conferences.subtitle`}
              />
            }
            body={<EventsBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.core.label`}
            defaultMessage={`BitCoin Il Core`}
            description={`mainMenu.core.label`}
          />
        ),
        key: 'core',
        element: (
          <RoutePage
            id="core"
            title={
              <FormattedMessage
                id={`mainMenuItem.core.title`}
                defaultMessage={`BitCoin Core`}
                description={`core.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.core.subtitle`}
                defaultMessage={`Helping you keep Bitcoin decentralized.`}
                description={`core.subtitle`}
              />
            }
            body={<CoreBody />}
          />
        )
      }
    ]
  },
  {
    label: (
      <FormattedMessage
        id={`mainMenu.innovation.label`}
        defaultMessage={`Innovation`}
        description={`mainMenu.innovation.label`}
      />
    ),
    key: 'innovation',
    element: (
      <RoutePage
        id="innovation"
        title={
          <FormattedMessage
            id={`mainMenuItem.innovation.title`}
            defaultMessage={`Innovation in Payment Systems`}
            description={`innovation.title`}
          />
        }
        subtitle={
          <FormattedMessage
            id={`mainMenuItem.innovation.subtitle`}
            defaultMessage={`Bitcoin isn't just about sending money. It has many features and opens many possibilities that the community is still exploring. Here are some of the technologies currently being researched, and in some cases, being turned into real products and services. The most interesting uses of Bitcoin are probably still to be discovered.`}
            description={`innovation.subtitle`}
          />
        }
        body={<InnovationBody />}
      />
    )
  },
  {
    label: (
      <FormattedMessage
        id={`mainMenu.participate.label`}
        defaultMessage={`Participate`}
        description={`mainMenu.participate.label`}
      />
    ),
    key: 'participate',
    submenu: [
      {
        label: (
          <FormattedMessage
            id={`mainMenu.cupport.label`}
            defaultMessage={`Support BitCoin Il`}
            description={`mainMenu.cupport.label`}
          />
        ),

        key: 'support',
        element: (
          <RoutePage
            id="Support"
            title={
              <FormattedMessage
                id={`mainMenuItem.support.title`}
                defaultMessage={`Support Bitcoin Il`}
                description={`support.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.support.subtitle`}
                defaultMessage={`Bitcoin Il was born from a small community and has grown fast. There are a lot of things you can do to support it and help others learn more.`}
                description={`support.subtitle`}
              />
            }
            body={<SupportBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.buy.label`}
            defaultMessage={`Buy BitCoin Il`}
            description={`mainMenu.buy.label`}
          />
        ),

        key: 'Buy',
        element: (
          <RoutePage
            title={
              <FormattedMessage
                id={`mainMenuItem.buy.title`}
                defaultMessage={`How to buy bitcoin`}
                description={`buy.title`}
              />
            }
            id="Buy"
            subtitle={null}
            body={<BuyBody />}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.run-node.label`}
            defaultMessage={`Running a full Node`}
            description={`mainMenu.run-node.label`}
          />
        ),

        key: 'full-node',
        element: (
          <RoutePage
            id="full-node"
            title={
              <FormattedMessage
                id={`mainMenuItem.full-node.title`}
                defaultMessage={`Running a Full Node`}
                description={`full-node.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.full-node.subtitle`}
                defaultMessage={`Message`}
                description={`full-node.subtitle`}
              />
            }
            body={<h1>Full Node</h1>}
          />
        )
      },
      {
        label: (
          <FormattedMessage
            id={`mainMenu.development.label`}
            defaultMessage={`Development`}
            description={`mainMenu.development.label`}
          />
        ),
        key: 'development',
        element: (
          <RoutePage
            id="development"
            title={
              <FormattedMessage
                id={`mainMenuItem.development.title`}
                defaultMessage={`Development`}
                description={`development.title`}
              />
            }
            subtitle={
              <FormattedMessage
                id={`mainMenuItem.development.subtitle`}
                defaultMessage={`Bitcoin for Development`}
                description={`development.subtitle`}
              />
            }
            body={<h1>Development Body</h1>}
          />
        )
      }
    ]
  },
  {
    label: (
      <FormattedMessage
        id={`mainMenu.faq.label`}
        defaultMessage={`FAQ`}
        description={`mainMenu.faq.label`}
      />
    ),

    key: 'FAQ',
    element: (
      <RoutePage
        id="FAQ"
        title={
          <FormattedMessage
            id={`mainMenuItem.faq.title`}
            defaultMessage={`Frequently Asked Questions`}
            description={`faq.title`}
          />
        }
        subtitle={
          <FormattedMessage
            id={`mainMenuItem.faq.subtitle`}
            defaultMessage={`Find answers to recurring questions and myths about Bitcoin.`}
            description={`faq.subtitle`}
          />
        }
        body={<FAQBody />}
      />
    )
  }
]
