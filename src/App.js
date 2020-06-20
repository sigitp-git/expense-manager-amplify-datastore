import React, { useState, useReducer, useEffect } from 'react'
import './styles/styles.scss'
import Context from './context/context'
import AppRouter from './router/AppRouter'
import expenseReducer from './reducer/expense-reducer'
import filterReducer from './reducer/filter-reducer'

const App = () => {
  // ------------------ Expenses State ------------------ //
  // -------------- initial development example state ------
  // const defExpenses = [
  //   {
  //     id: '12345',
  //     createdAt: 1589998899999,
  //     description: 'Rent',
  //     note: 'apt',
  //     amount: 457566,
  //   },
  //   {
  //     id: '12356',
  //     createdAt: 1592178824000,
  //     description: 'Car',
  //     note: 'toyota',
  //     amount: 53354,
  //   },
  // ]

  const [expenses, dispatchExpenses] = useReducer(expenseReducer, [])

  // fetch expenses from localStorage, put into expenses state, just once during initial mount
  useEffect(() => {
    console.log('fetching')
    const expensesLocalStorage = JSON.parse(localStorage.getItem('expenses'))
    if (!!expensesLocalStorage) {
      dispatchExpenses({
        type: 'FETCH_EXPENSES',
        expenses: expensesLocalStorage,
      })
    }
  }, [])

  // save expenses state (array of objects) change to localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // ------------------ Filters State ------------------ //
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

  // ------------------ Status State ------------------ //
  const [status, setStatus] = useState('Please add Expense below')

  // ------------------ Return Context.Provider -> AppRouter ------------------ //
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
