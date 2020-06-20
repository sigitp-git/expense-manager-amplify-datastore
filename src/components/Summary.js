import React, { useContext } from 'react'
import Context from '../context/context'
import numeral from 'numeral'

const Summary = () => {
    const { expenses } = useContext(Context)
    const totalAmount = expenses.reduce((acc, cur) => {
        return acc = acc + cur.amount
    }, 0)

    return (
        <div>
            <h1>Viewing {expenses.length} Expenses, total {numeral(totalAmount / 100).format('$0,0.00')}</h1>
        </div>
    )
}

export default Summary 