import React, { useState, useReducer, useEffect } from 'react'
import './styles/styles.scss'
import Context from './context/context'
import AppRouter from './router/AppRouter'
import expenseReducer from './reducer/expense-reducer'
import filterReducer from './reducer/filter-reducer'
// AWS Amplify
import Amplify from '@aws-amplify/core'
import { DataStore, Predicates } from '@aws-amplify/datastore'
import { Expense } from './models'
import awsConfig from './aws-exports'

Amplify.configure(awsConfig)


const App = () => {
  // Expenses state
  const [expenses, dispatchExpenses] = useReducer(expenseReducer, [])

  const fetchExpenses = async () => {
    const expensesDS = await DataStore.query(Expense, Predicates.ALL)
    if (!!expensesDS) {
      dispatchExpenses({
        type: 'FETCH_EXPENSES',
        expenses: expensesDS,
      })
    }
  }

  // Fetch expenses from DataStore, put into expenses state, just once during initial mount
  useEffect(() => {
    fetchExpenses()
  }, [])

  // Filters state
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)

  const defFilters = {
    text: '',
    sortBy: 'date',
    startDate: firstDay,
    endDate: lastDay,
  }

  const [filters, dispatchFilters] = useReducer(filterReducer, defFilters)

  // Status state
  const [status, setStatus] = useState('Please add Expense below')

  // Return Context.Provider -> AppRouter Components (including DataStore object and Expense model)
  return (
    <Context.Provider
      value={{
        expenses,
        dispatchExpenses,
        status,
        setStatus,
        filters,
        dispatchFilters,
        DataStore,
        Expense
      }}
    >
      <AppRouter />
    </Context.Provider>
  )
}

export default App
