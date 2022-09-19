import { validation, constants } from '@config'

const { emptyField, numberField, customField } = validation

const { REGEX_EMAIL, REGEX_CONTACT } = constants

const existingCustomerValidation = (model, value) => {
  const { customerType } = model
  return customerType === 'existing' ? !!value : true
}

const newCustomerValidation = (model, value) => {
  const { customerType } = model
  return customerType === 'new' ? !!value : true
}

const emailValidation = (model, value) => {
  const { customerType } = model
  if (customerType === 'new' && value) {
    return REGEX_EMAIL.test(value)
  }
  return true
}

const contactValidation = (model, value) => {
  const { customerType } = model
  if (customerType === 'new') {
    return value ? REGEX_CONTACT.test(value) : !!value
  }
  return true
}

const validationSchema = [
  emptyField('pickUpLocation'),
  emptyField('dropOffLocation'),
  emptyField('pickUpDateTime'),
  emptyField('vehicleType'),
  emptyField('noOfSeats'),
  numberField('noOfSeats'),
  customField({
    path: 'customerCategory',
    custom: existingCustomerValidation,
  }),
  customField({
    path: 'customer',
    custom: existingCustomerValidation,
  }),
  customField({
    path: 'customerDetails.name',
    custom: newCustomerValidation,
  }),
  customField({
    path: 'customerDetails.contact',
    message: 'Invalid contact.',
    custom: contactValidation,
  }),
  customField({
    path: 'customerDetails.email',
    message: 'Invalid email address.',
    custom: emailValidation,
  }),
]

export default validationSchema
