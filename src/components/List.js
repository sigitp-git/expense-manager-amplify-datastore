import React, { useContext } from 'react'
import Context from '../context/context'
import Item from './Item'

const List = () => {
  const { expenses, filters } = useContext(Context)

  const getFiltered = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses
      .filter((exp) => {
        const textMatch =
          exp.description.toLowerCase().includes(text) ||
          exp.note.toLowerCase().includes(text)

        // startDate and endDate is in date format, change to Unix timestamp by using .getTime()
        // exp.createdAt is in Unix Timestamp
        const startDateMatch = exp.createdAt >= startDate.getTime()
        const endDateMatch = exp.createdAt <= endDate.getTime()

        return textMatch && startDateMatch && endDateMatch
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return a.createdAt > b.createdAt ? -1 : 1
        } else if (sortBy === 'amount') {
          return a.amount > b.amount ? -1 : 1
        } else {
          return 0
        }
      })
  }

  const filteredExpenses = getFiltered(expenses, filters)

  //console.log(filteredExpenses)

  return (
    <div>
      {filteredExpenses.length === 0 ? (
        <div className='list-item list-item--empty'>
          <span>No expenses entered</span>
        </div>
      ) : (
        filteredExpenses.map((expense, i) => <Item key={i} {...expense} />)
      )}
    </div>
  )
}

export default List
