import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from '../pages/authentication/Login/Login.jsx'
import Register from '../pages/authentication/Register/Register.jsx'
import ForgotPassword from '../pages/authentication/ForgotPassword/ForgotPassword.jsx'

const Authentication = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgot" component={ForgotPassword} />
    <Route render={() => <Redirect to="/login" />} />
  </Switch>
)
export default Authentication
