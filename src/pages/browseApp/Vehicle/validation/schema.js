import { validation } from '@config'

const { emptyField, customField } = validation

const monthlyFixedValidation = (model, value) => {
  const { isMonthlyFixed } = model
  return isMonthlyFixed ? !!value : true
}

const validationSchema = [
  emptyField('type'),
  emptyField('manufacturer'),
  emptyField('name'),
  emptyField('registrationNo'),
  emptyField('noOfSeats'),
  customField({
    path: 'monthlyFixedDetails.customerCategory',
    custom: monthlyFixedValidation,
  }),
  customField({
    path: 'monthlyFixedDetails.customer',
    custom: monthlyFixedValidation,
  }),
  customField({
    path: 'monthlyFixedDetails.packageCategory',
    custom: monthlyFixedValidation,
  }),
  customField({
    path: 'monthlyFixedDetails.package',
    custom: monthlyFixedValidation,
  }),
  customField({
    path: 'monthlyFixedDetails.staffCategory',
    custom: monthlyFixedValidation,
  }),
  customField({
    path: 'monthlyFixedDetails.staff',
    custom: monthlyFixedValidation,
  }),
  customField({
    path: 'monthlyFixedDetails.contractStartDate',
    custom: monthlyFixedValidation,
  }),
  customField({
    path: 'monthlyFixedDetails.contractEndDate',
    custom: monthlyFixedValidation,
  }),
]

export default validationSchema
