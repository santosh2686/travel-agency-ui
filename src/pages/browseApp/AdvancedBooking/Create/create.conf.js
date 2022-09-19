import { getAdvancedBookingById, createAdvancedBooking, updateAdvancedBooking } from '@state/actions/advancedBooking'
import { getConfigListByKey } from '@state/selectors/appConfig'

const mapStateToProps = (state) => ({
  vehicleTypes: getConfigListByKey(state, 'vehicleType'),
})

const actions = {
  getAdvancedBookingById,
  createAdvancedBooking,
  updateAdvancedBooking,
}

export {
  mapStateToProps,
  actions,
}
