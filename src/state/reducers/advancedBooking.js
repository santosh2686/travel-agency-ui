import update from 'immutability-helper'
import { FETCH_ADVANCED_BOOKING_SUCCESS } from '../constants/advancedBooking'

const initialState = {
  data: [],
  total: 0,
  currentPage: 0,
  totalPages: 0,
}

const advancedBooking = (state = initialState, action = {}) => {
  const { type, response = [] } = action
  const {
    data, total, currentPage, totalPages,
  } = response

  if (type === FETCH_ADVANCED_BOOKING_SUCCESS) {
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

export default advancedBooking
