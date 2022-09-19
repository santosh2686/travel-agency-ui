import { appConfig } from '@api'

// import appConfigMock from '../../mock/app-config'

import {
  FETCH_CONFIG_SUCCESS, CREATE_CONFIG_SUCCESS,
  UPDATE_CONFIG_SUCCESS, DELETE_CONFIG_SUCCESS,
} from '../constants/appConfig'

const fetchConfigSuccess = (data) => ({
  type: FETCH_CONFIG_SUCCESS,
  data,
})

const createConfigSuccess = (key, data) => ({
  type: CREATE_CONFIG_SUCCESS,
  key,
  data,
})

const updateConfigSuccess = (key, id, data) => ({
  type: UPDATE_CONFIG_SUCCESS,
  key,
  id,
  data,
})

const deleteConfigSuccess = (key, id) => ({
  type: DELETE_CONFIG_SUCCESS,
  key,
  id,
})

const getAppConfig = () => (dispatch) => appConfig.get().then((response) => {
  const { data } = response
  dispatch(fetchConfigSuccess(data))
  return data
})

/*
const getAppConfig = () => (dispatch) => {
  dispatch(fetchConfigSuccess(appConfigMock))
  return new Promise((resolve) => {
    resolve(appConfigMock)
  })
}
*/
const createAppConfig = (key, requestBody) => (dispatch) => {
  const updatedRequestBody = {
    ...requestBody,
    key,
  }
  return appConfig.create(updatedRequestBody).then((res) => {
    const { data } = res
    dispatch(createConfigSuccess(key, data.data))
    return res
  })
}

const updateAppConfig = (key, id, payload) => (dispatch) => appConfig.update(id, payload).then((res) => {
  dispatch(updateConfigSuccess(key, id, payload))
  return res
})

const deleteAppConfig = (key, id) => (dispatch) => appConfig.delete(id, { key }).then((res) => {
  dispatch(deleteConfigSuccess(key, id))
  return res
})

export {
  getAppConfig,
  createAppConfig,
  updateAppConfig,
  deleteAppConfig,
}
