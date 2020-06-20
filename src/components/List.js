import React, { useContext } from 'react'
import Context from '../context/context'
import Item from './Item'

const List = () => {
  const { expenses } = useContext(Context)
  return (
    <div>
      {expenses.map((expense, i) => (
        <Item key={i} {...expense}/>
      ))}
    </div>
  )
}

export default List
