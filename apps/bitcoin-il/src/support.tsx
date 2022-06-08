import { Modal } from 'antd'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import SiteButton from './BitcoinSiteButton'
import { phoneDevices } from './breakpoints'
import { colors } from './colors'
import CloseButton from './img/ico_close.svg'

const Support = (): JSX.Element => {
  const [isExtended, setIsExtended] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)

  return (
    <>
      <StyledSupport
        id="Support"
        onClick={() => {
          setIsExtended(!isExtended)
        }}
        className={isExtended ? 'extended' : 'minimized'}
      >
        {!isExtended ? (
          <p>
            <FormattedMessage
              id={`support.cta`}
              defaultMessage={`Bitcoin.Il Needs Your Support`}
              description={`CTA`}
            />
          </p>
        ) : (
          <>
            <span onClick={() => setIsExtended(false)} className="close">
              <img src={CloseButton} />
            </span>
            <p className="margin-bottom">
              <FormattedMessage
                id={`support.title`}
                defaultMessage={`Bitcoin Il is a community funded project, donations are appreciated and used to improve the website.`}
                description={`Homepage Title`}
              />
            </p>

            <SiteButton
              onClick={() => {
                setShowModal(true)
              }}
            >
              <p>Make a Donation</p>
            </SiteButton>
            {showModal ? (
              <StyledModal
                id="StyledModal-Supports"
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
  ${phoneDevices} {
    display: none;
  }

  transition: all 300ms;
  font-size: 11.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.extended {
    height: 205px;
    color: #000000;
    background: ${colors.dullAccent};
    font-size: 16px;
  }

  &.minimized {
    cursor: pointer;
    height: 55px;
    color: ${colors.whiteText};
    background: ${colors.accent};
    font-size: 16px;
    font-weight: bolder;
  }

  p {
    margin: 0;
  }

  .margin-bottom {
    margin-bottom: 45px;
  }

  .close {
    position: absolute;
    top: 40px;
    right: 80px;
    cursor: pointer;
    font-weight: bolder;
  }
`
