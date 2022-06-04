import * as React from 'react'
import * as ReactDOM from 'react-dom'
// @ts-ignore
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
)
