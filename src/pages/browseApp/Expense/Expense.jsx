import React from 'react'
import { shape, string } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import Search from './Search/Search.jsx'
import Create from './Create/Create.jsx'
import Detail from './Detail/Detail.jsx'

const Expense = ({
  match: {
    url,
  },
  location: {
    pathname,
  },
}) => (
  <Switch>
    <Route exact path={url} render={() => <Redirect to={`${url}/:category/search`} />} />
    <Route path={`${url}/:category/search`} component={Search} key={pathname} />
    <Route path={`${url}/:category/:id/detail`} component={Detail} />
    <Route path={`${url}/:category/:id?/:action`} component={Create} />
    <Route render={() => <Redirect to={`${url}/:category/search`} />} />
  </Switch>
)

Expense.propTypes = {
  match: shape({
    url: string,
  }).isRequired,
  location: shape({
    url: string,
  }).isRequired,
}

export default Expense
