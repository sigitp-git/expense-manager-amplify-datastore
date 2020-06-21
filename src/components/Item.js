import React from 'react'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import unixToString from './UnixTStoString'

const Item = ({ id, createdAt, description, note, amount }) => {
  const stringTimeStamp = unixToString(createdAt)
  
  return (
    <Link className='list-item' to={`edit/${id}`}>
      <div>
        <h3 className='list-item__title'>{description}</h3>
        <span className='list-item__subtitle'>Created On: {stringTimeStamp}</span>
        <p className='list-item__subtitle'>Note: {note}</p>
      </div>
      <div>
        <h3 className='list-item__data'>
          {numeral(amount / 100).format('$0,0.00')}
        </h3>
      </div>
    </Link>
  )
}

export default Item
