import { Modal } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import SiteButton from './BitcoinSiteButton'
import { colors } from './colors'

const Support = (): JSX.Element => {
  const [isExtended, setIsExtended] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)

  return (
    <>
      <StyledSupport
        onClick={() => {
          setIsExtended(!isExtended)
        }}
        className={isExtended ? 'extended' : 'minimized'}
      >
        {!isExtended ? (
          <p>Bitcoin.Il Needs Your Support</p>
        ) : (
          <>
            <span onClick={() => setIsExtended(false)} className="close">
              X
            </span>
            <p className="margin-bottom">
              Bitcoin Il is a community funded project, donations are
              appreciated and used to improve the website.
            </p>
            <SiteButton onClick={() => setShowModal(true)}>
              <p>Make a Donation</p>
            </SiteButton>
            {showModal ? (
              <StyledModal
                title={null}
                visible={showModal}
                footer={null}
                onCancel={() => setShowModal(false)}
              >
                <h1 className="modal-title">Donate to Bitcoin Il</h1>
                <p>Use this QR code or address below</p>
                <p>ADD QR CODE</p>
                <p>Add address</p>
                <div className="buttons-container">
                  <SiteButton>
                    <p className="button-top">$5.00</p>
                  </SiteButton>
                  <SiteButton>
                    <p className="button-top">$10.00</p>
                  </SiteButton>
                  <SiteButton>
                    <p className="button-top">$20.00</p>
                  </SiteButton>
                </div>
                <div className="input-container">
                  <div className="two-inputs">
                    <input placeholder="Or custom amount? (BTC)" />
                    <input placeholder="Or custom amount (USD)" />
                  </div>
                  <div className="single-input">
                    <input placeholder="Optional Message For Your Wallet" />
                  </div>
                </div>
              </StyledModal>
            ) : null}
          </>
        )}
      </StyledSupport>
    </>
  )
}

export default Support

const StyledModal = styled(Modal)`
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;

    h1 {
      font-size: 18px;
      color: ${colors.accent};
    }

    .buttons-container {
      display: flex;

      button {
        margin-left: 20px;
        padding: 15px 25px;
      }
    }

    .button-top {
      font-size: 10px;
      margin: 0;
    }

    .button-bottom {
      font-size: 6px;
    }

    .input-container {
      input {
        padding: 10px;
      }
      .two-inputs {
        margin-top: 30px;
        input:nth-child(1) {
          margin-right: 10px;
        }
      }
      .single-input {
        margin-top: 10px;

        input {
          width: 100%;
        }
      }
    }
  }
`

const StyledSupport = styled.div`
  transition: all 300ms;
  font-size: 11.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.extended {
    height: 133px;
    color: #000000;
    background: ${colors.dullAccent};
  }

  &.minimized {
    cursor: pointer;
    height: 38px;
    ${colors.whiteText};
    background: ${colors.accent};
  }

  p {
    margin: 0;
  }

  .margin-bottom {
    margin-bottom: 22px;
  }

  .close {
    position: absolute;
    top: 15px;
    right: 30px;
    cursor: pointer;
  }
`
