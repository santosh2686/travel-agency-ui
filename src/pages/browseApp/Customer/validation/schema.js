import { validation } from '@config'

const {
  emptyField, emailField, mobileField, pinCodeField,
} = validation

const validationSchema = [
  emptyField('name'),
  emptyField('contact'),
  mobileField('contact'),
  mobileField('whatsAppNumber'),
  emailField('email'),

  emptyField('address.addressLine1'),
  emptyField('address.addressLine2'),
  emptyField('address.city'),
  emptyField('address.state'),
  emptyField('address.pinCode'),
  pinCodeField('address.pinCode'),
]

export default validationSchema
