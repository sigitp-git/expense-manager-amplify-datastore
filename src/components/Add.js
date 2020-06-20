import React, { useContext } from 'react'
import Context from '../context/context'
import Form from './Form'
import Footer from './Footer'
import { v4 as uuidv4 } from 'uuid'

const Add = (props) => {
  const { dispatchExpenses } = useContext(Context)

  return (
    <>
      <h1>Add Expense</h1>
      <Form
        onSubmit={({ createdAt, description, amount, note }) => {
          dispatchExpenses({
            type: 'ADD_EXPENSE',
            expense: { id: uuidv4(), createdAt, description, amount, note },
          })
          props.history.push('/')
        }}
      />
      <Footer />
    </>
  )
}

export default Add
