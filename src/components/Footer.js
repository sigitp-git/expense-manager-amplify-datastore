import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='content-container'>
        <div className='footer__content'>
          <p>
            <Link className='footer__title' to='/'>Home </Link>© sigitp {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
