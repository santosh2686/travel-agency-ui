import { combineReducers } from 'redux'

import regularRequest from './regularRequest'
import fixedRequest from './fixedRequest'

import user from './user'
import appConfig from './appConfig'
import packages from './package'
import staff from './staff'
import vehicle from './vehicle'
import monthlyFixedVehicleByCustomer from './monthlyFixedVehicleByCustomer'
import customer from './customer'
import expense from './expense'
import advancedBooking from './advancedBooking'
import advancedPayment from './advancedPayment'

export default combineReducers({
  appConfig,
  regularRequest,
  fixedRequest,
  user,
  packages,
  staff,
  vehicle,
  monthlyFixedVehicleByCustomer,
  customer,
  expense,
  advancedBooking,
  advancedPayment,
})
