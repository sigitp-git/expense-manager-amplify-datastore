import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <div className='content-container'>
        <div className='header__content'>
          <Link className='header__title' to='/'>
            <h1>Expense Manager</h1>
          </Link>
          <button className='button button--link'>Logout</button>
        </div>
      </div>
    </header>
  )
}

export default Header
