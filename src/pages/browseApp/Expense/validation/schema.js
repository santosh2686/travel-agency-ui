import { validation } from '@config'

const { emptyField, customField } = validation

const fieldValidation = (categoryName = '', value, categoryValue) => {
  if (categoryName.toLowerCase() === categoryValue) {
    return !!value
  }
  return true
}

const vehicleValidation = (model, value, params) => {
  const { categoryName = '' } = params
  return fieldValidation(categoryName, value, 'vehicle')
}

const staffValidation = (model, value, params) => {
  const { categoryName = '' } = params
  return fieldValidation(categoryName, value, 'staff')
}

const validationSchema = [
  emptyField('type'),
  emptyField('date'),
  emptyField('paymentMethod'),
  emptyField('amount'),
  customField({
    path: 'vehicleCategory',
    custom: vehicleValidation,
  }),
  customField({
    path: 'vehicle',
    custom: vehicleValidation,
  }),
  customField({
    path: 'staffCategory',
    custom: staffValidation,
  }),
  customField({
    path: 'staff',
    custom: staffValidation,
  }),
]

export default validationSchema
