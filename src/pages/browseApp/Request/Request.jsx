import React from 'react'
import { shape, string } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import Regular from './Regular/Regular.jsx'
import Fixed from './Fixed/Fixed.jsx'

const Request = ({
  match: {
    url,
  },
}) => (
  <Switch>
    <Route exact path={url} render={() => <Redirect to={`${url}/regular`} />} />
    <Route path={`${url}/regular`} component={Regular} />
    <Route path={`${url}/fixed`} component={Fixed} />
    <Route render={() => <Redirect to={`${url}/regular`} />} />
  </Switch>
)

Request.propTypes = {
  match: shape({
    url: string,
  }).isRequired,
}

export default Request
