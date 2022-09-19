import { getDataList } from '@state/selectors/common'

const mapStateToProps = (state, ownProps) => {
  const { model = {} } = ownProps
  const { customer } = model
  // eslint-disable-next-line dot-notation
  const customerId = (customer && customer['_id']) || customer

  const params = {
    stateKey: 'monthlyFixedVehicleByCustomer',
    category: customerId,
  }

  const regularVehicleStaffDetails = getDataList(state, params)
  return {
    regularVehicleStaffDetails,
  }
}

export {
  mapStateToProps,
}
