import update from 'immutability-helper'
import { FETCH_CUSTOMER_SUCCESS, EMPTY_CUSTOMER_LIST } from '../constants/customer'

const initialState = {}

const customer = (state = initialState, action = {}) => {
  const { type, response = [], params = {} } = action
  const { category } = params
  const { data, total } = response

  if (type === FETCH_CUSTOMER_SUCCESS) {
    return update(state, {
      $merge: {
        [category]: {
          total,
          data,
        },
      },
    })
  }

  if (type === EMPTY_CUSTOMER_LIST) {
    return update(state, {
      $unset: [category],
    })
  }

  return state
}

export default customer
