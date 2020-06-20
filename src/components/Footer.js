import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <p><Link to='/'>Home </Link>© sigitp {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
