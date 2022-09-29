import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { worker } from './graphql-server'

worker.start({ onUnhandledRequest: 'bypass' });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
