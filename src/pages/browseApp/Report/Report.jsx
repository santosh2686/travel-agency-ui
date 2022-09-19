import React from 'react'
import { shape, string } from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

import BusinessReport from './BusinessReport/BusinessReport.jsx'
import VehicleReport from './VehicleReport/VehicleReport.jsx'

const Report = ({
  match: {
    url,
  },
}) => (
  <Switch>
    <Route exact path={url} render={() => <Redirect to={`${url}/business`} />} />
    <Route path={`${url}/business`} component={BusinessReport} />
    <Route path={`${url}/vehicle`} component={VehicleReport} />
    <Route render={() => <Redirect to={`${url}/business`} />} />
  </Switch>
)

Report.propTypes = {
  match: shape({
    url: string,
  }).isRequired,
}

export default Report
