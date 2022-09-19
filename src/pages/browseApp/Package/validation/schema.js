import { validation } from '@config'

const { emptyField } = validation

const validationSchema = [
  emptyField('packageCode'),
  emptyField('baseAmount'),
  emptyField('minimumKm'),
  emptyField('extraKmPerKmRate'),
  emptyField('minimumHr'),
  emptyField('extraHrPerHrRate'),
]

export default validationSchema
