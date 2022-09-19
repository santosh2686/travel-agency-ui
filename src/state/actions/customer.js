import { customer } from '@api'
import { FETCH_CUSTOMER_SUCCESS, EMPTY_CUSTOMER_LIST } from '../constants/customer'

import { getDataList, getDataItemById } from '../selectors/common'

const fetchCustomerSuccess = (response, params) => ({
  type: FETCH_CUSTOMER_SUCCESS,
  response,
  params,
})

const emptyCustomerList = (params) => ({
  type: EMPTY_CUSTOMER_LIST,
  params,
})

const getCustomer = (params) => async (dispatch, getState) => {
  const { filterData } = params
  const { category } = filterData
  const state = getState()
  const options = {
    stateKey: 'customer',
    category,
  }
  const { total, data = [] } = await getDataList(state, options)
  if (data.length) {
    return {
      total,
      data,
    }
  }
  return customer.getAll(params).then((res) => {
    dispatch(fetchCustomerSuccess(res.data, filterData))
    return res.data
  })
}

const getCustomerById = (id, params) => async (_, getState) => {
  const { category } = params
  const state = getState()
  const options = {
    stateKey: 'customer',
    category,
    recordId: id,
  }
  const customerDetail = await getDataItemById(state, options)
  if (customerDetail) {
    return customerDetail
  }
  return customer.getById(id).then((res) => res.data)
}

const createCustomer = (requestBody, params) => (dispatch) => {
  const { category } = params
  const updatedRequestBody = {
    ...requestBody,
    category,
  }
  return customer.create(updatedRequestBody).then((res) => {
    dispatch(emptyCustomerList(params))
    return res
  })
}

const updateCustomer = (id, requestBody, params) => (dispatch) => customer.update(id, requestBody)
  .then((res) => {
    dispatch(emptyCustomerList(params))
    return res
  })

const deleteCustomer = (id, params) => (dispatch) => customer.delete(id).then((res) => {
  dispatch(emptyCustomerList(params))
  return res
})

export {
  getCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}
