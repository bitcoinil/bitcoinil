import React from "react"
import styled from "styled-components"

export default function RoutePage({
  title = "title Prop",
  subtitle = "subtitle Prop",
  body = <h1>body prop</h1>,
}) {
  return (
    <StyledRoutePage>
      <div className="page-title">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
      <div className="body">{body}</div>
    </StyledRoutePage>
  )
}

const StyledRoutePage = styled.div`
  min-height: 100vh;

  .page-title {
    background: black;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      color: white;
    }

    h3 {
      color: #9d9d9d;
    }
  }
`
