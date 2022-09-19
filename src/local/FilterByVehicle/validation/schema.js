import { validation } from '@config'

const { emptyField } = validation

const validationSchema = [
  emptyField('vehicleCategory'),
  emptyField('vehicle'),
]

export default validationSchema
