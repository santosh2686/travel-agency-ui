import { validation } from '@config'

const { emptyField } = validation

const validationSchema = [
  emptyField('name'),
]

export default validationSchema
