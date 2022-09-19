import { validation, constants } from '@config'

const {
  INVALID_EMAIL, INVALID_CONTACT,
} = constants

const {
  customField, conditionalValidation,
  conditionalContactValidation, conditionalEmailValidation,
} = validation

const vehicleValidation = (model, value) => {
  const { vehicleType = '' } = model
  return conditionalValidation(vehicleType === 'existing', value)
}

const staffValidation = (model, value) => {
  const { staffType = '' } = model
  return conditionalValidation(staffType === 'existing', value)
}

const newStaffValidation = (model, value) => {
  const { staffType } = model
  return conditionalValidation(staffType === 'new', value)
}

const newStaffContactValidation = (model, value) => {
  const { staffType } = model
  return conditionalContactValidation(staffType === 'new', value)
}

const newStaffEmailValidation = (model, value) => {
  const { staffType } = model
  return conditionalEmailValidation(staffType === 'new', value)
}

const newVehicleValidation = (model, value) => {
  const { vehicleType = '' } = model
  return conditionalValidation(vehicleType === 'new', value)
}

const newVehicleContactValidation = (model, value) => {
  const { vehicleType } = model
  return conditionalContactValidation(vehicleType === 'new', value)
}

const newVehicleEmailValidation = (model, value) => {
  const { vehicleType } = model
  return conditionalEmailValidation(vehicleType === 'new', value)
}

const packageFromProvidedVehicleValidation = (model, value) => {
  const { vehicleType = '', isOtherVehicleSelected } = model
  if (vehicleType === 'new' || isOtherVehicleSelected) {
    return !!value
  }
  return true
}

const commonValidationSchema = [
  customField({
    path: 'packageFromProvidedVehicle.packageCategory',
    custom: packageFromProvidedVehicleValidation,
  }),
  customField({
    path: 'packageFromProvidedVehicle.package',
    custom: packageFromProvidedVehicleValidation,
  }),
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
  customField({
    path: 'vehicleDetails.ownerName',
    custom: newVehicleValidation,
  }),
  customField({
    path: 'vehicleDetails.ownerEmail',
    custom: newVehicleEmailValidation,
    message: INVALID_EMAIL,
  }),
  customField({
    path: 'vehicleDetails.ownerContact',
    custom: newVehicleContactValidation,
    message: INVALID_CONTACT,
  }),
  customField({
    path: 'vehicleDetails.manufacturer',
    custom: newVehicleValidation,
  }),
  customField({
    path: 'vehicleDetails.name',
    custom: newVehicleValidation,
  }),
  customField({
    path: 'vehicleDetails.registrationNo',
    custom: newVehicleValidation,
  }),
  customField({
    path: 'staffDetails.name',
    custom: newStaffValidation,
  }),
  customField({
    path: 'staffDetails.email',
    custom: newStaffEmailValidation,
    message: INVALID_EMAIL,
  }),
  customField({
    path: 'staffDetails.contact',
    custom: newStaffContactValidation,
    message: INVALID_CONTACT,
  }),
]

export default commonValidationSchema
