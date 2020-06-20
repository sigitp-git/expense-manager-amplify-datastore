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
    }
  }, [props.expense])

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
      <form onSubmit={(e) => onFormSubmit(e)}>
        {status && <p className='form__status'>{status}</p>}
        <DatePicker value={datePicker} onChange={onDatePickChange} />
        <div>
          <input
            autoFocus
            placeholder='description'
            value={description}
            onChange={(e) => onChangeDescription(e)}
          />
        </div>
        <div>
          <input
            placeholder='amount'
            value={amount}
            onChange={(e) => onChangeAmount(e)}
          />
        </div>
        <div>
          <textarea
            placeholder='note'
            value={note}
            onChange={(e) => onChangeNote(e)}
          ></textarea>
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>
      <button onClick={() => props.history.push('/')}>Cancel</button>
    </>
  )
}

export default Form
