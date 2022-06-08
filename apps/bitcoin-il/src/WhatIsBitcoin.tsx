import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import PlayBtn from './img/play-btn.svg'
import YouTube from 'react-youtube'
import { CloseCircleOutlined } from '@ant-design/icons'

export default function WhatIsBitcoin(): JSX.Element {
  const [showModal, setShowModal] = React.useState(false)

  React.useEffect(() => {
    console.log({ showModal })
  }, [showModal])

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }

  return (
    <StyledWhatIsBitcoin id="WhatIsBitcoin" onClick={() => setShowModal(true)}>
      <div className="play-area">
        <img src={PlayBtn} />
        <FormattedMessage
          id={`homepage.what-is-bitcoin`}
          defaultMessage={`What Is Bitcoin?`}
          description={`What Is Bitcoin?`}
        />
      </div>
      {showModal ? (
        <div
          onClick={(e) => {
            e.stopPropagation()
            console.log('CLICK')
            setShowModal(false)
          }}
          className="modal"
        >
          <div className="youtube-player">
            <CloseCircleOutlined />
            {/* I am not sure why this giving an error on TS. The types are installed */}
            {/* @ts-ignore */}
            <YouTube opts={opts} videoId="Gc2en3nHxA4" />
          </div>
        </div>
      ) : null}
    </StyledWhatIsBitcoin>
  )
}

const StyledWhatIsBitcoin = styled.div`
  margin-top: 80px;
  font-size: 16px;
  cursor: pointer;
  transition: all 400ms;

  img {
    height: 50px;
    margin-right: 20px;
  }

  .play-area:hover {
    opacity: 0.6;
  }

  .modal {
    &:hover {
      opacity: 1;
    }

    svg {
      font-size: 55px;
      fill: white;
      margin-bottom: 10px;
    }

    .youtube-player {
      display: flex;
      flex-direction: column;
      align-items: end;
    }
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000090;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }
`
