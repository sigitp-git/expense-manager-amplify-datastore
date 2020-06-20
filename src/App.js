import React, { useState, useReducer } from 'react'
import './App.css'
import Context from './context/context'
import AppRouter from './router/AppRouter'
import expenseReducer from './reducer/expense-reducer'
import filterReducer from './reducer/filter-reducer'

const App = () => {
  const defExpenses = [
    {
      id: '12345',
      createdAt: 1589998899999,
      description: 'Rent',
      note: 'apt',
      amount: 457566,
    },
    {
      id: '12356',
      createdAt: 1592178824000,
      description: 'Car',
      note: 'toyota',
      amount: 53354,
    },
  ]
  const [expenses, dispatchExpenses] = useReducer(expenseReducer, defExpenses)

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
  const [status, setStatus] = useState('Please add Expense below')

  return (
    <Context.Provider
      value={{
        expenses,
        dispatchExpenses,
        status,
        setStatus,
        filters,
        dispatchFilters,
      }}
    >
      <AppRouter />
    </Context.Provider>
  )
}

export default App
