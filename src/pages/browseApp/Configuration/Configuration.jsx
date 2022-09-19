import React from 'react'
import { shape, string } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import BusinessSetting from './BusinessSetting/BusinessSetting.jsx'
import SystemUsers from './SystemUsers/SystemUsers.jsx'

const Configuration = ({
  match: {
    url,
  },
}) => (
  <Switch>
    <Route exact path={url} render={() => <Redirect to={`${url}/setting`} />} />
    <Route path={`${url}/setting`} component={BusinessSetting} />
    <Route path={`${url}/user`} component={SystemUsers} />
    <Route render={() => <Redirect to={`${url}/setting`} />} />
  </Switch>
)

Configuration.propTypes = {
  match: shape({
    url: string,
  }).isRequired,
}

export default Configuration
