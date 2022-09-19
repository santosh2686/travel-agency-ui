import { regularRequest } from '@api'

import { FETCH_REGULAR_REQUEST_SUCCESS } from '../constants/regularRequest'

import { getDataItemById } from '../selectors/common'

const fetchRegularRequestSuccess = (response, params) => ({
  type: FETCH_REGULAR_REQUEST_SUCCESS,
  response,
  params,
})

const getRegularRequest = (params) => async (dispatch) => regularRequest.getAll(params).then((res) => {
  dispatch(fetchRegularRequestSuccess(res.data, params))
  return res.data
})

const getRegularRequestById = (id, params) => async (_, getState) => {
  const { category } = params
  const state = getState()
  const options = {
    stateKey: 'regularRequest',
    category,
    recordId: id,
  }
  const requestDetail = await getDataItemById(state, options)
  if (requestDetail) {
    return requestDetail
  }
  return regularRequest.getById(id).then((res) => res.data)
}

const createRegularRequest = (requestBody, params) => () => {
  const { category } = params
  const updatedRequestBody = {
    ...requestBody,
    category,
  }

  return regularRequest.create(updatedRequestBody).then((res) => res)
}

const updateRegularRequest = (id, requestBody) => () => regularRequest.update(id, requestBody)
  .then((res) => res)

const deleteRegularRequest = (id) => () => regularRequest.delete(id).then((res) => res)

export {
  getRegularRequest,
  getRegularRequestById,
  createRegularRequest,
  updateRegularRequest,
  deleteRegularRequest,
}
