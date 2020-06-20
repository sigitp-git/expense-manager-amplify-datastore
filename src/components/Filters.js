import React, { useContext, useState } from 'react'
import Context from '../context/context'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

const Filters = () => {
  const { filters, dispatchFilters } = useContext(Context)
  const datePickerStart =
    filters.startDate.getYear() === 70 ? null : filters.startDate
  const datePickerEnd =
    filters.endDate.getYear() === 3100 ? null : filters.endDate
  const [datePicker, setDatePicker] = useState([datePickerStart, datePickerEnd])

  const onDatePickChange = (datePicker) => {
    if (datePicker == null) {
      setDatePicker([null, null])
      dispatchFilters({
        type: 'SET_START_DATE',
        date: null,
      })
      dispatchFilters({
        type: 'SET_END_DATE',
        date: null,
      })
    } else {
      setDatePicker(datePicker)
      dispatchFilters({
        type: 'SET_START_DATE',
        date: datePicker[0],
      })
      dispatchFilters({
        type: 'SET_END_DATE',
        date: datePicker[1],
      })
    }
  }

  //console.log(filters)

  return (
    <div className='content-container'>
      <div className='input-group'>
        <div className='input-group__item'>
          <input
            className='text-input'
            type='text'
            placeholder='search...'
            value={filters.text}
            onChange={(e) =>
              dispatchFilters({
                type: 'SET_TEXT_FILTER',
                text: e.target.value,
              })
            }
          />
        </div>
        <div className='input-group__item'>
          <select
            className='select'
            value={filters.sortBy}
            onChange={(e) => {
              if (e.target.value === 'date') {
                dispatchFilters({
                  type: 'SORT_BY_DATE',
                })
              } else if (e.target.value === 'amount') {
                dispatchFilters({
                  type: 'SORT_BY_AMOUNT',
                })
              }
            }}
          >
            <option value='date'>Date</option>
            <option value='amount'>Amount</option>
          </select>
        </div>
        <div>
          <DateRangePicker
            className='date-picker'
            value={datePicker}
            onChange={onDatePickChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
