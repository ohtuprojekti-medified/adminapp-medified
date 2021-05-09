/**.
 * Index file for running the app
 *
 * @namespace Frontend_index
 * @requires react
 * @requires react-dom
 * @requires frontend/src/index.css
 * @requires frontend/src/App
 * @requires frontend/src/reportWebVitals
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

/**.
 * Run the app
 *
 *
 * @memberof Frontend_index
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
