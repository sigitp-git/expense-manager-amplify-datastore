import React, { useState, useReducer } from 'react'
import './App.css'
import Context from './context/context'
import AppRouter from './router/AppRouter'
import expensesReducer from './reducer/expense-reducer'

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
  const [expenses, dispatchExpenses] = useReducer(expensesReducer, defExpenses)
  const [status, setStatus] = useState('Please add Expense below')

  return (
    <Context.Provider value={{ expenses, dispatchExpenses, status, setStatus }}>
      <AppRouter />
    </Context.Provider>
  )
}

export default App
