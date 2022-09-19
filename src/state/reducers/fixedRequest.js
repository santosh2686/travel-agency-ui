import update from 'immutability-helper'
import { FETCH_FIXED_REQUEST_SUCCESS } from '../constants/fixedRequest'

const initialState = {
  data: [],
  total: 0,
  currentPage: 0,
  totalPages: 0,
}

const fixedRequest = (state = initialState, action = {}) => {
  const { type, response = [] } = action
  const {
    data, total, currentPage, totalPages,
  } = response

  if (type === FETCH_FIXED_REQUEST_SUCCESS) {
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

export default fixedRequest
