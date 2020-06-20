import React from 'react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

const Filters = () => {
  return (
    <div>
      <input type='text' placeholder='search...' />
      <select name='' id=''>
        <option value='date'>Date</option>
        <option value='amount'>Amount</option>
      </select>
      <DateRangePicker />
    </div>
  )
}

export default Filters
