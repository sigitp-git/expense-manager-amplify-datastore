const expenseReducer = (expenses, action) => {
  switch (action.type) {
    case 'FETCH_EXPENSES':
      return action.expenses
    case 'ADD_EXPENSE':
      return [...expenses, action.expense]
    case 'EDIT_EXPENSE':
      return expenses.map((expense) => {
        if (expense.id === action.id) {
          return { ...expense, ...action.expense }
        } else {
          return expense
        }
      })
    case 'RM_EXPENSE':
      return expenses.filter((expense) => expense.id !== action.id)
    default:
      return expenses
  }
}

export default expenseReducer
