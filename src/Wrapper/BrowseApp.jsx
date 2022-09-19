import React, { PureComponent } from 'react'
import {
  arrayOf, func, shape, string,
} from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ClassNames from 'classnames'

import { Spinner, Layout } from '@base'

import { Navigation, Header } from '@local'

import Dashboard from '../pages/browseApp/Dashboard/Dashboard.jsx'

import Request from '../pages/browseApp/Request/Request.jsx'
import Package from '../pages/browseApp/Package/Package.jsx'
import Vehicle from '../pages/browseApp/Vehicle/Vehicle.jsx'
import Staff from '../pages/browseApp/Staff/Staff.jsx'
import Customer from '../pages/browseApp/Customer/Customer.jsx'
import Expense from '../pages/browseApp/Expense/Expense.jsx'

import AdvancedBooking from '../pages/browseApp/AdvancedBooking/AdvancedBooking.jsx'
import AdvancedPayment from '../pages/browseApp/AdvancedPayment/AdvancedPayment.jsx'

import Payment from '../pages/browseApp/Payment/Payment.jsx'
import Report from '../pages/browseApp/Report/Report.jsx'
import Configuration from '../pages/browseApp/Configuration/Configuration.jsx'

import { mapStateToProps, actions } from './browseApp.conf'

class BrowseApp extends PureComponent {
  state = {
    isToggle: false,
    isLoading: true,
  }

  componentDidMount() {
    const { getAppConfig } = this.props
    getAppConfig().then(() => {
      this.setState({ isLoading: false })
    })
  }

  toggleNavigation = () => {
    this.setState(({ isToggle }) => ({ isToggle: !isToggle }))
  }

  render() {
    const { isToggle, isLoading } = this.state

    if (isLoading) {
      return (
        <Layout flex={{ align: 'center', justify: 'center' }} classes="height-100">
          <Spinner />
        </Layout>
      )
    }

    const { navigationMenu } = this.props

    const toggleClass = ClassNames({
      'side-nav-toggle': isToggle,
    })
    return (
      <>
        <Header classes={toggleClass} clickHandler={this.toggleNavigation} />
        <Layout flex classes="flex-1 overflow-hidden">
          <Navigation navigationMenu={navigationMenu} classes={toggleClass} />
          <Layout flex={{ direction: 'column' }} border={{ t: 'gray-light' }} classes="flex-1 overflow-hidden">
            <Layout flex={{ direction: 'column' }} pad="15" classes="flex-1 overflow-auto">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route path="/request" component={Request} />
                <Route path="/package" component={Package} />
                <Route path="/vehicle" component={Vehicle} />
                <Route path="/staff" component={Staff} />
                <Route path="/customer" component={Customer} />
                <Route path="/expense" component={Expense} />
                <Route path="/expense" component={Expense} />
                <Route path="/payment" component={Payment} />
                <Route path="/report" component={Report} />
                <Route path="/advanced-booking" component={AdvancedBooking} />
                <Route path="/advanced-payment" component={AdvancedPayment} />
                <Route path="/business" component={Configuration} />
                <Route render={() => <Redirect to="/dashboard" />} />
              </Switch>
            </Layout>
            <Layout pad={{ tb: 10, lr: 20 }} bgColor="white" border={{ t: 'gray-light' }} classes="text-right font-12">
              Copyright © 2020 travel agency. All rights reserved.
            </Layout>
          </Layout>
        </Layout>
      </>
    )
  }
}

BrowseApp.propTypes = {
  getAppConfig: func.isRequired,
  navigationMenu: arrayOf(shape({
    label: string,
  })),
}

BrowseApp.defaultProps = {
  navigationMenu: [],
}

const BrowseAppWithConnect = connect(mapStateToProps, actions)(BrowseApp)

export {
  BrowseAppWithConnect as default,
  BrowseApp,
}
