import { Button } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { SiteButtonProps } from './Interfaces'

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

const StyledButton = styled(Button)`
  &.ant-btn {
    padding: 25px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
