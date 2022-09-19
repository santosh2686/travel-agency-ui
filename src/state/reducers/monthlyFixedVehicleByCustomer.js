// monthlyFixedVehicle

import update from 'immutability-helper'

import { FETCH_MONTHLY_FIXED_VEHICLE_SUCCESS, EMPTY_VEHICLE_LIST } from '../constants/vehicle'

const initialState = {}

const monthlyFixedVehicleByCustomer = (state = initialState, action = {}) => {
  const { type, response = [], params = {} } = action
  const { customer } = params
  const { data, total } = response

  if (type === FETCH_MONTHLY_FIXED_VEHICLE_SUCCESS) {
    return update(state, {
      $merge: {
        [customer]: {
          total,
          data,
        },
      },
    })
  }

  if (type === EMPTY_VEHICLE_LIST) {
    return update(state, {
      $set: {},
    })
  }

  return state
}

export default monthlyFixedVehicleByCustomer
