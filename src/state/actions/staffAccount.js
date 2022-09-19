import { staffAccount } from '@api'

const getStaffAccount = (params) => () => staffAccount.getAll(params).then((res) => res.data)

export {
  getStaffAccount,
}
