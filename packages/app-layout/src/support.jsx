import { Modal } from "antd"
import React, { useState } from "react"
import styled from "styled-components"
import BitcoinButton from "./BitcoinSiteButton"
import { colors } from "./colors"

const Support = () => {
  const [isExtended, setIsExtended] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <StyledSupport
      onClick={!isExtended ? () => setIsExtended(true) : null}
      isExtended={isExtended}
    >
      {!isExtended ? (
        <p>Bitcoin.Il Needs Your Support</p>
      ) : (
        <>
          <span onClick={() => setIsExtended(false)} className="close">
            X
          </span>
          <p className="margin-bottom">
            Bitcoin Il is a community funded project, donations are appreciated
            and used to improve the website.
          </p>
          <BitcoinButton onClick={() => setShowModal(true)}>
            Make a Donation
          </BitcoinButton>
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
                <BitcoinButton>
                  <p className="button-top">$5.00</p>
                </BitcoinButton>
                <BitcoinButton>
                  <p className="button-top">$10.00</p>
                </BitcoinButton>
                <BitcoinButton>
                  <p className="button-top">$20.00</p>
                </BitcoinButton>
              </div>
              <div className="input-container">
                <div className="two-inputs">
                  <input placeholder="Or custom amount? (BTC)" />
                  <input placeholder="Or custom amount (USD)" />
                </div>
                <div className="single-input">
                  <input placeHolder="Optional Message For Your Wallet" />
                </div>
              </div>
            </StyledModal>
          ) : null}
        </>
      )}
    </StyledSupport>
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
  cursor: ${(props) => (props.isExtended ? null : "pointer")};
  height: ${(props) => (props.isExtended ? "133px" : "38px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isExtended ? "#0000000" : colors.whiteText)};
  background: ${(props) =>
    props.isExtended ? colors.dullAccent : colors.accent};

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
