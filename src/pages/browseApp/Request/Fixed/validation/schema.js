import { validation } from '@config'

import commonValidationSchema from '../../common/validation/schema'

const { emptyField } = validation

const validationSchema = [
  emptyField('requestType'),
  emptyField('pickUpLocation'),
  emptyField('dropOffLocation'),
  emptyField('customerCategory'),
  emptyField('customer'),
  ...commonValidationSchema,
]

export default validationSchema
