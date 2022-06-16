import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Card } from 'antd'
import { phoneDevices } from './breakpoints'

import ico_download from './img/ico_download.svg'

interface WhitePaperTranslation {
  link: string
  language: JSX.Element
  translatedBy?: {
    author: JSX.Element
    link: string
  }[]
}

const whitePaperTranslations: WhitePaperTranslation[] = [
  {
    link: 'https://bitcoin.org/bitcoin.pdf',
    language: (
      <FormattedMessage
        id={`white-paper.english.label`}
        defaultMessage={`English (Original)`}
        description={`english.label`}
      />
    )
  },
  {
    link: 'https://bitcoin.org/files/bitcoin-paper/bitcoin_iw.pdf',
    language: (
      <FormattedMessage
        id={`white-paper.hebrew.label`}
        defaultMessage={`עברית`}
        description={`hebrew.label`}
      />
    ),
    translatedBy: [
      {
        author: (
          <FormattedMessage
            id={`white-paper.hebrew.translator0`}
            defaultMessage={`Meni Rosenfeld`}
            description={`hebrew.translator0`}
          />
        ),
        link: 'https://twitter.com/MeniRosenfeld'
      }
    ]
  }
]

export interface WhitePaperBodyProps {}

const WhitePaperBody: React.FC<WhitePaperBodyProps> = ({}) => {
  return (
    <StyledWhitePaperBody id="WhitePaperBody">
      <h1>
        <FormattedMessage
          id={`white-paper.intro`}
          defaultMessage={`Satoshi Nakamoto's original paper is still recommended reading for anyone studying how Bitcoin works. Choose which translation of the paper you want to read:`}
          description={`intro`}
        />
      </h1>
      <div className="papers">
        {whitePaperTranslations.map((translation, i) => {
          console.log(translation)
          return (
            <a key={i} href={translation.link}>
              <Card>
                <h1>
                  <img src={ico_download} />
                  {translation.language}
                </h1>
                {translation.translatedBy ? (
                  <p>
                    Translated: by{' '}
                    {translation.translatedBy.map((tranny, i) => {
                      return <a href={tranny.link}>{tranny.author}</a>
                    })}
                  </p>
                ) : (
                  <p style={{ visibility: 'hidden' }}>spacer</p>
                )}
              </Card>
            </a>
          )
        })}
      </div>
      <h1>
        <FormattedMessage
          id={`white-paper.do-you-want-translate`}
          defaultMessage={`Do you want to translate the paper into your language? Visit the Bitcoin white paper repository on GitHub for instructions and open an issue if you have any questions.`}
          description={`do-you-want-translate`}
        />
      </h1>
    </StyledWhitePaperBody>
  )
}

export default WhitePaperBody

const StyledWhitePaperBody = styled.div`
  padding: 100px;

  ${phoneDevices} {
    padding: 40px;

    h1 {
      font-size: 15px;
    }
  }

  h1 {
    font-weight: bolder;
  }

  .papers {
    display: flex;
    ${phoneDevices} {
      flex-direction: column;
    }
    margin: 50px 0;
    .ant-card {
      padding: 60px;
      height: 200px;
      margin-left: 15px;
      ${phoneDevices} {
        margin-bottom: 25px;
        margin-left: 0;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      h1 {
        margin: 0;
      }

      img {
        height: 20px;
        margin-right: 20px;
      }
    }
  }
`
