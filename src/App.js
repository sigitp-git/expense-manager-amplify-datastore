import React, { useState, useReducer, useEffect } from 'react'
import './styles/styles.scss'
import Context from './context/context'
import AppRouter from './router/AppRouter'
import expenseReducer from './reducer/expense-reducer'
import filterReducer from './reducer/filter-reducer'
// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore'
import { Expense } from './models'

const App = (props) => {
  // Expenses state
  const [expenses, dispatchExpenses] = useReducer(expenseReducer, [])

  // Fetch expenses from DataStore, put into expenses state, just once during initial mount
  useEffect(() => {
    if (!!props.expenses) {
      dispatchExpenses({
        type: 'FETCH_EXPENSES',
        expenses: props.expenses,
      })
    }
  }, [props.expenses])

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
        Expense,
      }}
    >
      <AppRouter />
    </Context.Provider>
  )
}

export default App
