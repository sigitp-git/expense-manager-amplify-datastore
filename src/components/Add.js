import React, { useContext } from 'react'
import Context from '../context/context'
import Form from './Form'
import Footer from './Footer'
import { v4 as uuidv4 } from 'uuid'
import Header from './Header'

const Add = (props) => {
  const { dispatchExpenses, DataStore, Expense } = useContext(Context)

  // Save expense to DataStore
  const saveExpenseToDS = async ({ createdAt, description, amount, note }) =>
    await DataStore.save(
      new Expense({
        createdAt,
        description,
        amount,
        note,
      })
    )

  return (
    <>
      <Header />
      <div className='page-header'>
        <div className='content-container'>
          <h1 className='page-header__title'>Add Expense</h1>
        </div>
      </div>
      <div className='content-container'>
        <Form
          // props.history passed from AppRouter.js Router Component, passed to Form.js for Cancel button redirect
          history={props.history}
          onSubmit={({ createdAt, description, amount, note }) => {
            dispatchExpenses({
              type: 'ADD_EXPENSE',
              expense: { id: uuidv4(), createdAt, description, amount, note },
            })
            // Save expense to DataStore
            saveExpenseToDS({ createdAt, description, amount, note }).then(() =>
              props.history.push('/')
            )
          }}
        />
      </div>
      <Footer />
    </>
  )
}

export default Add
