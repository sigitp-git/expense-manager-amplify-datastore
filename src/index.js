import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import Loading from './components/Loading'
// AWS Amplify
import Amplify from '@aws-amplify/core'
import { DataStore, Predicates } from '@aws-amplify/datastore'
import { Expense } from './models'
import awsConfig from './aws-exports'

Amplify.configure(awsConfig)

let expensesDS
const fetchExpenses = async () => {
  expensesDS = await DataStore.query(Expense, Predicates.ALL)
}

ReactDOM.render(<Loading />, document.getElementById('root'))

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
        <App expenses={expensesDS} />
      </React.StrictMode>,
      document.getElementById('root')
    )
    hasRendered = true
  }
}

fetchExpenses().then(() => renderApp())

//setTimeout(() => renderApp(), 500)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
