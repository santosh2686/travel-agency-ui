import {
  getAdvancedPaymentById,
  createAdvancedPayment,
  updateAdvancedPayment,
} from '@state/actions/advancedPayment'

import { getConfigListByKey } from '@state/selectors/appConfig'

const mapStateToProps = (state) => ({
  paymentMethods: getConfigListByKey(state, 'paymentMethod'),
})

const actions = {
  getAdvancedPaymentById,
  createAdvancedPayment,
  updateAdvancedPayment,
}

export {
  mapStateToProps,
  actions,
}
