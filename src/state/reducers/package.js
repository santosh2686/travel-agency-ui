import update from 'immutability-helper'
import { FETCH_PACKAGE_SUCCESS, EMPTY_PACKAGE_LIST } from '../constants/package'

const initialState = {}

const packages = (state = initialState, action = {}) => {
  const { type, response = [], params = {} } = action
  const { category } = params
  const { data, total } = response

  if (type === FETCH_PACKAGE_SUCCESS) {
    return update(state, {
      $merge: {
        [category]: {
          total,
          data,
        },
      },
    })
  }

  if (type === EMPTY_PACKAGE_LIST) {
    return update(state, {
      $unset: [category],
    })
  }

  return state
}

export default packages
