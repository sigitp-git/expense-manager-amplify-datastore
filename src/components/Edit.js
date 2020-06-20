import React, { useContext } from 'react'
import Context from '../context/context'
import Form from './Form'
import Footer from './Footer'

const Edit = (props) => {
  const { expenses, dispatchExpenses } = useContext(Context)

  return (
    <>
      <h1>Edit Expense</h1>
      <Form
        // props.history passed from AppRouter.js Router Component, passed to Form.js for Cancel button redirect
        history={props.history}
        // this props.expense is going to be used by useEffect on the Form component
        expense={expenses.find(
          (expense) => expense.id === props.match.params.id
        )}
        onSubmit={({ createdAt, description, amount, note }) => {
          dispatchExpenses({
            type: 'EDIT_EXPENSE',
            id: props.match.params.id,
            expense: { createdAt, description, amount, note },
          })
          props.history.push('/')
        }}
      />
      <button
        onClick={() => {
          dispatchExpenses({
            type: 'RM_EXPENSE',
            id: props.match.params.id,
          })
          props.history.push('/')
        }}
      >
        Remove
      </button>
      <Footer />
    </>
  )
}

export default Edit
