import update from 'immutability-helper'
import {
  FETCH_CONFIG_SUCCESS, CREATE_CONFIG_SUCCESS,
  UPDATE_CONFIG_SUCCESS, DELETE_CONFIG_SUCCESS,
} from '../constants/appConfig'

const initialState = {}

const appConfig = (state = initialState, action = {}) => {
  const {
    type, key, id, data = {},
  } = action
  switch (type) {
  case FETCH_CONFIG_SUCCESS: {
    return data
  }

  case CREATE_CONFIG_SUCCESS: {
    return update(state, {
      [key]: {
        $push: [data],
      },
    })
  }

  case UPDATE_CONFIG_SUCCESS: {
    const model = state[key]
    const recordIndex = model.findIndex(({ _id }) => _id === id)
    return update(state, {
      [key]: {
        [recordIndex]: {
          $merge: data,
        },
      },
    })
  }

  case DELETE_CONFIG_SUCCESS: {
    const model = state[key]
    const recordIndex = model.findIndex(({ _id }) => _id === id)
    return update(state, {
      [key]: {
        $splice: [[recordIndex, 1]],
      },
    })
  }

  default:
    return state
  }
}

export default appConfig
