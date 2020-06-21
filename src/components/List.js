import React, { useContext } from 'react'
import Context from '../context/context'
import Item from './Item'
import numeral from 'numeral'
import { unixToStringNoTime } from './UnixTStoString'

const List = () => {
  const { expenses, filters } = useContext(Context)

  const getFiltered = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses
      .filter((exp) => {
        const textMatch =
          exp.description.toLowerCase().includes(text.toLowerCase()) ||
          exp.note.toLowerCase().includes(text.toLowerCase())

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

  const totalFilteredAmount = filteredExpenses.reduce((acc, cur) => {
    return (acc = acc + cur.amount)
  }, 0)

  const timeRange =
    filters.startDate.getYear() === 70 && filters.endDate.getYear() === 3100
      ? ''
      : `between ${unixToStringNoTime(
          filters.startDate.getTime()
        )} - ${unixToStringNoTime(filters.endDate.getTime())}`

  //console.log(filteredExpenses)

  return (
    <div className='content-container'>
      <div className='list-body'>
        <h2 className='page-header__title'>
          Viewing <span>{filteredExpenses.length}</span> expenses, total{' '}
          <span>{numeral(totalFilteredAmount / 100).format('$0,0.00')}</span>{' '}
          {timeRange}
        </h2>
      </div>
      <div className='list-header'>
        <div className='show-for-mobile'>Expenses</div>
        <div className='show-for-desktop'>Expense</div>
        <div className='show-for-desktop'>Amount</div>
      </div>
      <div className='list-body'>
        {filteredExpenses.length === 0 ? (
          <div className='list-item list-item--empty'>
            <span>No expenses entered</span>
          </div>
        ) : (
          filteredExpenses.map((expense, i) => <Item key={i} {...expense} />)
        )}
      </div>
    </div>
  )
}

export default List
