import constants from './constant'

const {
  REGEX_EMPTY, REGEX_CONTACT, REGEX_EMAIL, REGEX_NUMBER, REGEX_PIN_CODE,
  REQUIRED, INVALID_PIN_CODE, INVALID_EMAIL, INVALID_CONTACT, INVALID_NUMBER,
} = constants

const emptyField = (path) => ({
  path,
  pattern: REGEX_EMPTY,
  message: REQUIRED,
  emptyCheck: true,
})

const numberField = (path) => ({
  path,
  pattern: REGEX_NUMBER,
  message: INVALID_NUMBER,
})

const mobileField = (path) => ({
  path,
  pattern: REGEX_CONTACT,
  message: INVALID_CONTACT,
})

const emailField = (path) => ({
  path,
  pattern: REGEX_EMAIL,
  message: INVALID_EMAIL,
})

const pinCodeField = (path) => ({
  path,
  pattern: REGEX_PIN_CODE,
  message: INVALID_PIN_CODE,
})

const customField = ({ path, message = REQUIRED, custom }) => ({
  path,
  custom,
  message,
})

const conditionalValidation = (condition, value) => {
  if (condition) {
    return !!value
  }
  return true
}

const conditionalContactValidation = (condition, value) => {
  if (condition) {
    return value ? REGEX_CONTACT.test(value) : !!value
  }
  return true
}

const conditionalEmailValidation = (condition, value, isMandatory = false) => {
  const emptyCheck = isMandatory ? !!value : true
  if (condition) {
    return value ? REGEX_EMAIL.test(value) : emptyCheck
  }
  return true
}

export default {
  emptyField,
  emailField,
  numberField,
  mobileField,
  pinCodeField,
  customField,
  conditionalValidation,
  conditionalContactValidation,
  conditionalEmailValidation,
}
