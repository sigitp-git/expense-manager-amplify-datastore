import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../context/context'
import numeral from 'numeral'

const Summary = () => {
  const { expenses } = useContext(Context)
  const totalAmount = expenses.reduce((acc, cur) => {
    return (acc = acc + cur.amount)
  }, 0)

  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>
          There are <span>{expenses.length}</span> expenses recorded, total:{' '}
          <span>{numeral(totalAmount / 100).format('$0,0.00')}</span>
        </h1>
        <div className='page-header__actions'>
          <Link className='button button--dark' to='/add'>
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Summary
