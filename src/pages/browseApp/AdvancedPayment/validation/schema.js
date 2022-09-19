import { validation } from '@config'

const { emptyField, numberField } = validation

const validationSchema = [
  emptyField('paymentMethod'),
  emptyField('staff'),
  emptyField('staffCategory'),
  emptyField('amount'),
  numberField('amount'),
]

export default validationSchema
