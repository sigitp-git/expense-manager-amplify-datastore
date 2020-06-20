import React, { useState, useContext, useEffect } from 'react'
import Context from '../context/context'
import DatePicker from 'react-date-picker'

const Form = (props) => {
  const [datePicker, setDatePicker] = useState(new Date())
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const { status, setStatus } = useContext(Context)

  const onDatePickChange = (datePicker) => {
    if (datePicker) {
      setDatePicker(datePicker)
    }
  }

  const onChangeDescription = (e) => {
    if (e.target.value !== null) {
      setDescription(e.target.value)
    }
  }

  // !e.target.value for enabling empty amount field to edit
  const onChangeAmount = (e) => {
    if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setAmount(e.target.value)
    }
  }

  const onChangeNote = (e) => {
    if (e.target.value !== null) {
      setNote(e.target.value)
    }
  }

  // props.expense passed by Edit.js
  useEffect(() => {
    if (props.expense) {
      const dateObject = new Date(props.expense.createdAt)
      setDatePicker(dateObject)
      setDescription(props.expense.description)
      setAmount((props.expense.amount / 100).toString())
      setNote(props.expense.note)
      setStatus(`Editing ${props.expense.description} note`)
    }

    // unmount editing mode, clear status back to default
    return () => {
      setStatus('Please add Expense below')
    }
  }, [props.expense, setStatus])

  // Reusable onFormSubmit(), props.onSubmit passed by Add.js or Edit.js
  const onFormSubmit = (e) => {
    e.preventDefault()
    if (description && amount) {
      props.onSubmit({
        createdAt: datePicker.getTime(),
        description: description,
        amount: parseFloat(amount, 10) * 100,
        note: note,
      })
      setStatus(`Expense ${description} saved!`)
      setDescription('')
      setAmount('')
      setNote('')
    } else {
      setStatus('Description and Amount Required!')
    }
  }

  return (
    <>
      <form className='form' onSubmit={(e) => onFormSubmit(e)}>
        {status && <p className='form__status'>{status}</p>}
        <div>
          <DatePicker
            className='date-picker'
            value={datePicker}
            onChange={onDatePickChange}
          />
        </div>
        <input
          className='text-input'
          autoFocus
          placeholder='description'
          value={description}
          onChange={(e) => onChangeDescription(e)}
        />
        <input
          className='text-input'
          placeholder='amount'
          value={amount}
          onChange={(e) => onChangeAmount(e)}
        />
        <textarea
          className='textarea'
          placeholder='note'
          value={note}
          onChange={(e) => onChangeNote(e)}
        ></textarea>
        <div>
          <button className='button button--dark'>Save</button>
        </div>
      </form>
      {/* props.history from Add.js or Edit.js (both from AppRouter.js) */}
      <button
        className='button button--dark'
        onClick={() => props.history.push('/')}
      >
        Cancel
      </button>
    </>
  )
}

export default Form
