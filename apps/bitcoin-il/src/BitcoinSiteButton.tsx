import * as React from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import { SiteButtonProps } from './Interfaces'

export default function SiteButton({
  onClick = () => {},
  children
}: SiteButtonProps) {
  return <StyledButton onClick={() => onClick}>{children}</StyledButton>
}

const StyledButton = styled.button`
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
