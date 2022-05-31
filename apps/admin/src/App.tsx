import * as React from 'react'
import logo from './logo.svg'
import './App.css'
import { CounterButton } from 'ui-next'
import { TestButton } from 'app-layout'

import styled from 'styled-components'

import '@djitsu/themes/dist/themes/main-theme/main-theme-main-light.css'

const TestB = styled.button`
  background: orange;
  border: 9px solid blue;
`

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Turborepo Admin</h1>
        <p>This app is powered by Vite. </p>
        <TestB>TEST B</TestB>
        <p>
          <CounterButton />
        </p>
        <p>
          <TestButton />
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
