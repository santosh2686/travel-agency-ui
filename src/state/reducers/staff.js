import update from 'immutability-helper'
import { FETCH_STAFF_SUCCESS, EMPTY_STAFF_LIST } from '../constants/staff'

const initialState = {}

const staff = (state = initialState, action = {}) => {
  const { type, response = [], params = {} } = action
  const { category } = params
  const { data, total } = response

  if (type === FETCH_STAFF_SUCCESS) {
    return update(state, {
      $merge: {
        [category]: {
          total,
          data,
        },
      },
    })
  }

  if (type === EMPTY_STAFF_LIST) {
    return update(state, {
      $unset: [category],
    })
  }

  return state
}

export default staff
