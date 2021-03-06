/**
 * Index file for running the app
 *
 * @module src/index
 * @requires react
 * @requires react-dom
 * @requires src/index.css
 * @requires src/App
 * @requires src/reportWebVitals
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

/**
 * Run the app
 *
 * @type {object}
 * @function
 * @memberof module:src/index
 * @inner
 * @param {object} JSXApp - pass the app to be rendered
 * @param {object} root - pass root to react
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
