import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <h1>Expense Manager</h1>
      <div>
        <Link to='/add'>Add</Link>
      </div>
      <div>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Header
