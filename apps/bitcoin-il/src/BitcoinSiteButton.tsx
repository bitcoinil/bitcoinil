import * as React from 'react'
import styled from 'styled-components'
import { colors } from './colors'
import { SiteButtonProps } from './Interfaces'
import * as Ant from 'antd'

export default function SiteButton({
  onClick = () => {},
  children,
  type = 'default'
}: SiteButtonProps) {
  console.log({ type })
  return (
    <StyledButton>
      <Ant.Button type={type} onClick={() => onClick}>
        {children}
      </Ant.Button>
    </StyledButton>
  )
}

const StyledButton = styled.div`
  .ant-btn {
    color: ${colors.whiteText};
    font-weight: 600;
    cursor: pointer;
    padding: 6px 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: ${colors.accent};
    border: 2px solid ${colors.accent};

    &:hover {
      border: none;
      border: 2px solid ${colors.accent};
      opacity: 0.6;
    }

    &-primary {
      background: ${colors.accent};
      color: white;
    }

    p {
      margin: 0;
    }
  }
`
