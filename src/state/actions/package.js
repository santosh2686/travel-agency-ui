import { packages } from '@api'
import { FETCH_PACKAGE_SUCCESS, EMPTY_PACKAGE_LIST } from '../constants/package'

import { getDataList, getDataItemById } from '../selectors/common'

const fetchPackageSuccess = (response, params) => ({
  type: FETCH_PACKAGE_SUCCESS,
  response,
  params,
})

const emptyPackageList = (params) => ({
  type: EMPTY_PACKAGE_LIST,
  params,
})

const getPackage = (params) => async (dispatch, getState) => {
  const { filterData } = params
  const { category } = filterData
  const state = getState()
  const options = {
    stateKey: 'packages',
    category,
  }
  const { total, data = [] } = await getDataList(state, options)
  if (data.length) {
    return {
      total,
      data,
    }
  }
  return packages.getAll(params).then((res) => {
    dispatch(fetchPackageSuccess(res.data, filterData))
    return res.data
  })
}

const getPackageById = (id, params) => async (_, getState) => {
  const { category } = params
  const state = getState()
  const options = {
    stateKey: 'packages',
    category,
    recordId: id,
  }
  const packageDetail = await getDataItemById(state, options)
  if (packageDetail) {
    return packageDetail
  }
  return packages.getById(id).then((res) => res.data)
}

const createPackage = (requestBody, params) => (dispatch) => {
  const { category } = params
  const updatedRequestBody = {
    ...requestBody,
    category,
  }
  return packages.create(updatedRequestBody).then((res) => {
    dispatch(emptyPackageList(params))
    return res
  })
}

const updatePackage = (id, requestBody, params) => (dispatch) => packages.update(id, requestBody)
  .then((res) => {
    dispatch(emptyPackageList(params))
    return res
  })

const deletePackage = (id, params) => (dispatch) => packages.delete(id).then((res) => {
  dispatch(emptyPackageList(params))
  return res
})

export {
  getPackage,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
}
