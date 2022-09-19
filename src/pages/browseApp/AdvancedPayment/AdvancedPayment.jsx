import React from 'react'
import { shape, string } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import Search from './Search/Search.jsx'
import Create from './Create/Create.jsx'
import Detail from './Detail/Detail.jsx'

const AdvancedPayment = ({
  match: {
    url,
  },
}) => (
  <Switch>
    <Route exact path={url} render={() => <Redirect to={`${url}/search`} />} />
    <Route path={`${url}/search`} component={Search} />
    <Route path={`${url}/:id/detail`} component={Detail} />
    <Route path={`${url}/:id?/:action`} component={Create} />
    <Route render={() => <Redirect to={`${url}/search`} />} />
  </Switch>
)

AdvancedPayment.propTypes = {
  match: shape({
    url: string,
  }).isRequired,
}

export default AdvancedPayment
