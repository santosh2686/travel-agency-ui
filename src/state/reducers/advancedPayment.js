import update from 'immutability-helper'
import { FETCH_ADVANCED_PAYMENT_SUCCESS } from '../constants/advancedPayment'

const initialState = {
  data: [],
  total: 0,
  currentPage: 0,
  totalPages: 0,
}

const advancedPayment = (state = initialState, action = {}) => {
  const { type, response = [] } = action
  const {
    data, total, currentPage, totalPages,
  } = response

  if (type === FETCH_ADVANCED_PAYMENT_SUCCESS) {
    return update(state, {
      $merge: {
        total,
        currentPage,
        totalPages,
        data,
      },
    })
  }
  return state
}

export default advancedPayment
