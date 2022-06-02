import React from "react"
import styled from "styled-components"
export default function ClearConsoleButton() {
  return (
    <StyledClearConsoleButton onClick={() => console.clear()}>
      Clear Console
    </StyledClearConsoleButton>
  )
}

const StyledClearConsoleButton = styled.button`
  position: absolute;
  top: 50vh;
  right: 0vh;
  border: 0;
  padding: 25px;
  cursor: pointer;

  &:hover {
    opacity: 0.1;
  }
`
