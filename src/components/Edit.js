import React, { useContext } from 'react'
import Context from '../context/context'
import Form from './Form'
import Footer from './Footer'
import Header from './Header'
import { confirmAlert } from 'react-confirm-alert'
import '../styles/react-confirm-alert.css'

const Edit = (props) => {
  const { expenses, dispatchExpenses, DataStore, Expense } = useContext(Context)
  const expense = expenses.find(
    (expense) => expense.id === props.match.params.id
  )

  // Remove expense from DataStore
  const rmExpenseFrDS = async (id) => {
    const toDelete = await DataStore.query(Expense, id)
    DataStore.delete(toDelete)
  }

  // Save updated expense to DataStore
  const updateExpenseToDS = async ({
    id,
    createdAt,
    description,
    amount,
    note,
  }) => {
    const toUpdate = await DataStore.query(Expense, id)
    await DataStore.save(
      Expense.copyOf(toUpdate, (updated) => {
        updated.createdAt = parseFloat(createdAt)
        updated.description = description
        updated.amount = amount
        updated.note = note
      })
    )
  }

  const onHandleDelete = () => {
    dispatchExpenses({
      type: 'RM_EXPENSE',
      id: props.match.params.id,
    })
    // Save expense to Datastore
    rmExpenseFrDS(props.match.params.id).then(() => props.history.push('/'))
  }

  const onSubmitDelete = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete ${expense.description} note?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => onHandleDelete(),
        },
        {
          label: 'No',
          onClick: () => {
            props.history.push(`/edit/${props.match.params.id}`)
          },
        },
      ],
    })
  }

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
          // this props.expense is going to be used by useEffect to fill the reusable Form component during edit
          expense={expense}
          onSubmit={({ createdAt, description, amount, note }) => {
            dispatchExpenses({
              type: 'EDIT_EXPENSE',
              id: props.match.params.id,
              expense: { createdAt, description, amount, note },
            })
            updateExpenseToDS({
              id: props.match.params.id,
              createdAt,
              description,
              amount,
              note,
            }).then(() => props.history.push('/'))
          }}
        />
        <button
          className='button button--grey'
          onClick={() => onSubmitDelete()}
        >
          Remove
        </button>
      </div>
      <Footer />
    </>
  )
}

export default Edit
