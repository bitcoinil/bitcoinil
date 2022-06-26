import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'

console.log('BASE_PATH:', import.meta.env.BASE_PATH || '/', {
  env: import.meta.env.BASE_PATH,
  def: '/'
})

ReactDOM.render(
  <Router basename={import.meta.env.BASE_PATH || '/'}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
)
