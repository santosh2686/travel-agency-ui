import { validation } from '@config'

import commonValidationSchema from '../../common/validation/schema'

const { emptyField, customField } = validation

const kilometerValidation = (_, value) => !!value

const calculateTotalValidationSchema = [
  emptyField('pickUpDateTime'),
  emptyField('dropDateTime'),
  customField({
    path: 'openingKm',
    custom: kilometerValidation,
    message: 'Should be greater than 0',
  }),
  customField({
    path: 'closingKm',
    custom: kilometerValidation,
    message: 'Should be greater than 0',
  }),
  ...commonValidationSchema,
]

export default calculateTotalValidationSchema
