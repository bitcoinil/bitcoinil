import React from "react"
import styled from "styled-components"
import { colors } from "./colors"

export default function BitcoinButton({ onClick, children }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

const StyledButton = styled.button`
  background: red;
  border: none;
  background: ${colors.accent};
  color: ${colors.whiteText};
  font-weight: 600;
  cursor: pointer;
  padding: 2px 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
  }
`
