const defFirstDay = new Date('01/01/1970')
const defLastDay = new Date('01/01/5000')

const filterReducer = (filters, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...filters, text: action.text }
    case 'SORT_BY_AMOUNT':
      return { ...filters, sortBy: 'amount' }
    case 'SORT_BY_DATE':
      return { ...filters, sortBy: 'date' }
    case 'SET_START_DATE':
      if (action.date === null) {
        return { ...filters, startDate: defFirstDay }
      } else {
        return { ...filters, startDate: action.date }
      }
    case 'SET_END_DATE':
      if (action.date === null) {
        return { ...filters, endDate: defLastDay }
      } else {
        return { ...filters, endDate: action.date }
      }
    default:
      return filters
  }
}

export default filterReducer
