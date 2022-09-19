import update from 'immutability-helper'
import { FETCH_EXPENSE_SUCCESS } from '../constants/expense'

const initialState = {}

const expense = (state = initialState, action = {}) => {
  const { type, response = [], params = {} } = action
  const { category } = params
  const {
    data, total, currentPage, totalPages,
  } = response

  if (type === FETCH_EXPENSE_SUCCESS) {
    return update(state, {
      $merge: {
        [category]: {
          total,
          currentPage,
          totalPages,
          data,
        },
      },
    })
  }
  return state
}

export default expense
