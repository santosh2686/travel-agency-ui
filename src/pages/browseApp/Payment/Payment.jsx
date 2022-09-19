import React from 'react'
import { shape, string } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import Vehicle from './Vehicle/Vehicle.jsx'
import Staff from './Staff/Staff.jsx'

const Payment = ({
  match: {
    url,
  },
}) => (
  <Switch>
    <Route exact path={url} render={() => <Redirect to={`${url}/vehicle`} />} />
    <Route path={`${url}/vehicle`} component={Vehicle} />
    <Route path={`${url}/staff`} component={Staff} />
    <Route render={() => <Redirect to={`${url}/vehicle`} />} />
  </Switch>
)

Payment.propTypes = {
  match: shape({
    url: string,
  }).isRequired,
}

export default Payment
