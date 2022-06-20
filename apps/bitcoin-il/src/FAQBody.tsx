import { Divider } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { phoneDevices } from './breakpoints'
import { colors } from './colors'

export interface IndividualFAQ {
  categoryHeading: JSX.Element
  hasSubHeadings: boolean
  bodyWithoutSubheadings?: { title: JSX.Element; body: JSX.Element }[]
  subHeadings?: { subHeadingTitle: JSX.Element; subHeadingBody: JSX.Element }[]
}

const FAQ: IndividualFAQ[] = [
  {
    categoryHeading: (
      <FormattedMessage
        id={`faq.general`}
        defaultMessage={`General`}
        description={`general`}
      />
    ),
    hasSubHeadings: false,
    bodyWithoutSubheadings: [
      {
        title: (
          <FormattedMessage
            id={`faq.what-is`}
            defaultMessage={`What is BitCoin?`}
            description={`what-is`}
          />
        ),
        body: (
          <FormattedMessage
            id={`faq.what-is.body`}
            defaultMessage={`Bitcoin is a consensus network that enables a new payment system and a completely digital money. It is the first decentralized peer-to-peer payment network that is powered by its users with no central authority or middlemen. From a user perspective, Bitcoin is pretty much like cash for the Internet. Bitcoin can also be seen as the most prominent triple entry bookkeeping system in existence.`}
            description={`what-is.body`}
          />
        )
      }
    ]
  },
  {
    categoryHeading: (
      <FormattedMessage
        id={`faq.legal`}
        defaultMessage={`Legal`}
        description={`legal`}
      />
    ),
    hasSubHeadings: true,
    subHeadings: [
      {
        subHeadingTitle: (
          <FormattedMessage
            id={`faq.is-legal`}
            defaultMessage={`Is Bitcoin Legal?`}
            description={`is-legal`}
          />
        ),
        subHeadingBody: (
          <FormattedMessage
            id={`faq.is-legal.body`}
            defaultMessage={`To the best of our knowledge, Bitcoin has not been made illegal by legislation in most jurisdictions. However, some jurisdictions (such as Argentina and Russia) severely restrict or ban foreign currencies. Other jurisdictions (such as Thailand) may limit the licensing of certain entities such as Bitcoin exchanges.

        Regulators from various jurisdictions are taking steps to provide individuals and businesses with rules on how to integrate this new technology with the formal, regulated financial system. For example, the Financial Crimes Enforcement Network (FinCEN), a bureau in the United States Treasury Department, issued non-binding guidance on how it characterizes certain activities involving virtual currencies.
        
        `}
            description={`is-legal.body`}
          />
        )
      }
    ]
  }
]

export interface FAQBodyProps {}

const FAQBody: React.FC<FAQBodyProps> = ({}) => {
  return (
    <StyledFAQBody id="FAQBody">
      <div className="faq-left">
        <ul>
          {FAQ.map((faq, i) => {
            return (
              <li>
                {faq.categoryHeading}
                {faq.hasSubHeadings ? (
                  <ul>
                    {faq.subHeadings?.map((subHead, i) => {
                      return <li>{subHead.subHeadingTitle}</li>
                    })}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="faq-right">
        {FAQ.map((faq, i) => {
          console.log('🍔', faq)
          return (
            <>
              <h1 className="faq-category-heading faq-accented-header">
                {faq.categoryHeading}
              </h1>
              {faq.hasSubHeadings
                ? faq.subHeadings?.map((subH, i) => {
                    console.log(subH)
                    return (
                      <>
                        <h1 className="faq-subheading-title">
                          {subH.subHeadingTitle}
                        </h1>
                        <p>{subH.subHeadingBody}</p>
                      </>
                    )
                  })
                : null}
            </>
          )
        })}
        <Divider />
        <div className="faq-help">
          <h1 className="faq-help-title faq-accented-header">
            <FormattedMessage
              id={`faq.help-title`}
              defaultMessage={`Help`}
              description={`help-title`}
            />
          </h1>
          <p className="faq-help-subtitle">
            <FormattedMessage
              id={`faq.help-like-help`}
              defaultMessage={`I'd like to learn more. Where can I get help?`}
              description={`help-like-help`}
            />
          </p>
          <p className="faq-help-subtitle-small">
            <FormattedMessage
              id={`faq.help-wiki`}
              defaultMessage={`You can find more information`}
              description={`help-wiki`}
            />
            {'    '}
            <a href="google.com">
              <FormattedMessage
                id={`faq.help-subtitle-info-here`}
                defaultMessage={`here`}
                description={`help-subtitle-info-here`}
              />
            </a>
          </p>
        </div>
      </div>
    </StyledFAQBody>
  )
}

export default FAQBody

const StyledFAQBody = styled.div`
  padding: 30px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  .faq {
    &-accented-header {
      color: ${colors.accent};
      font-weight: bolder;
    }

    &-left {
      width: 30%;
      position: sticky;
      top: 0;

      ${phoneDevices} {
        display: none;
      }

      ul {
        list-style: none;
      }
    }

    &-help {
    }

    &-right {
      width: 70%;

      ${phoneDevices} {
        width: unset;
      }
    }

    &-category-heading {
    }

    &-subheading-title {
      color: black;
      font-weight: bolder;
      font-size: 22px;
    }

    &-help {
      &-subtitle {
        font-size: 22px;
        &-small {
          font-size: 19px;
        }
      }
    }
  }
`
