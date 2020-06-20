import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Dashboard from '../components/Dashboard'
import Add from '../components/Add'
import Edit from '../components/Edit'
import NotFound from '../components/NotFound'

// history passed to all Components under Router Component below
// history@4.10.1, latest has bugs
const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history}>
    <>
      <Switch>
        <Route path='/' component={Dashboard} exact={true} />
        <Route path='/add' component={Add} />
        <Route path='/edit/:id' component={Edit} />
        <Route component={NotFound} />
      </Switch>
    </>
  </Router>
)

export { history, AppRouter as default }
