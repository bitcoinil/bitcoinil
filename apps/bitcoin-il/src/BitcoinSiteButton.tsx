import * as React from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import { SiteButtonProps } from './Interfaces'
import { Button } from 'antd'
export default function SiteButton({
  onClick = () => {},
  children,
  type = 'default',
  background,
  color
}: SiteButtonProps) {
  return (
    <StyledButton
      id="SiteButton"
      style={{
        color: color ? color : '',
        background: background ? background : '',
        border: background ? `2px solid ${background}` : ''
      }}
      type={type}
      onClick={() => onClick()}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(Button)``
