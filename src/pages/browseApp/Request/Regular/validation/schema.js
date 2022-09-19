/* eslint-disable no-debugger */
import { validation, constants } from '@config'

import commonValidationSchema from '../../common/validation/schema'

const {
  INVALID_EMAIL, INVALID_CONTACT,
} = constants

const {
  emptyField, customField, conditionalValidation,
  conditionalContactValidation, conditionalEmailValidation,
} = validation

const customerValidation = (model, value) => {
  const { customerType = '' } = model
  return conditionalValidation(customerType === 'existing', value)
}

const paymentValidation = (model, value) => {
  const { paymentDetails = {} } = model
  const { status } = paymentDetails
  return conditionalValidation(status === 'PAYMENT_RECEIVED', value)
}

const newCustomerValidation = (model, value) => {
  const { customerType } = model
  return conditionalValidation(customerType === 'new', value)
}

const newCustomerContactValidation = (model, value) => {
  const { customerType } = model
  return conditionalContactValidation(customerType === 'new', value)
}

const newCustomerEmailValidation = (model, value) => {
  const { customerType } = model
  return conditionalEmailValidation(customerType === 'new', value)
}

const validationSchema = [
  emptyField('requestType'),
  emptyField('pickUpLocation'),
  emptyField('dropOffLocation'),
  emptyField('packageCategory'),
  emptyField('package'),
  ...commonValidationSchema,
  customField({
    path: 'customerCategory',
    custom: customerValidation,
  }),
  customField({
    path: 'customer',
    custom: customerValidation,
  }),
  customField({
    path: 'paymentDetails.paymentDate',
    custom: paymentValidation,
  }),
  customField({
    path: 'paymentDetails.paymentMethod',
    custom: paymentValidation,
  }),
  customField({
    path: 'customerDetails.name',
    custom: newCustomerValidation,
  }),
  customField({
    path: 'customerDetails.email',
    custom: newCustomerEmailValidation,
    message: INVALID_EMAIL,
  }),
  customField({
    path: 'customerDetails.contact',
    custom: newCustomerContactValidation,
    message: INVALID_CONTACT,
  }),
]

export default validationSchema
