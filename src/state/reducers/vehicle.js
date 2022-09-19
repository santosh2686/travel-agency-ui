import update from 'immutability-helper'

import { FETCH_VEHICLE_SUCCESS, EMPTY_VEHICLE_LIST } from '../constants/vehicle'

const initialState = {}

const vehicle = (state = initialState, action = {}) => {
  const { type, response = [], params = {} } = action
  const { category } = params
  const { data, total } = response

  if (type === FETCH_VEHICLE_SUCCESS) {
    return update(state, {
      $merge: {
        [category]: {
          total,
          data,
        },
      },
    })
  }

  if (type === EMPTY_VEHICLE_LIST) {
    return update(state, {
      $unset: [category],
    })
  }

  return state
}

export default vehicle
