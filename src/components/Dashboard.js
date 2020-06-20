import React from 'react'
import Header from './Header'
import Summary from './Summary'
import Filters from './Filters'
import List from './List'
import Footer from './Footer'

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Summary />
      <Filters />
      <List />
      <Footer />
    </div>
  )
}

export default Dashboard
