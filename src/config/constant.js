const constants = {
  REGEX_EMPTY: /\S+/,
  REGEX_CONTACT: /^([0-9]{10})+$/,
  REGEX_PIN_CODE: /^([0-9]{6})+$/,
  // eslint-disable-next-line no-useless-escape
  REGEX_EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  REGEX_NUMBER: /^[0-9]+$/,
  REQUIRED: 'Required.',
  INVALID_PIN_CODE: 'Invalid pin code.',
  INVALID_EMAIL: 'Invalid email Id.',
  INVALID_CONTACT: 'Invalid contact.',
  INVALID_NUMBER: 'Invalid number.',
  CASH: 'Cash',
  ONLINE_TRANSFER: 'Online transfer',
  CHEQUE: 'Cheque',
  OPEN: 'Open',
  CANCEL: 'Cancel',
  NOT_PAID: 'Not Paid',
  PARTIAL_PAID: 'Partial paid',
  FULL_PAID: 'Full paid',
  ADDED_TO_ACCOUNT: 'Added to account',
  BILL_GENERATED: 'Bill generated',
  BILL_SENT_TO_CUSTOMER: 'Send to customer',
  PAYMENT_RECEIVED: 'Payment received',
}

export default constants
