import dayJs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayJs.extend(utc)
dayJs.extend(timezone)
// .tz('Asia/Kolkata')
const toDate = (dateStr) => dayJs(dateStr || new Date())

const toISOString = (dateStr) => toDate(dateStr).toISOString()

const formatDate = (dateStr, format = 'DD-MMM-YYYY') => toDate(dateStr).format(format)

const formatTime = (dateStr, format = 'hh:mm:ss A') => toDate(dateStr).format(format)

const getDifference = (date1, date2, unit, exact = false) => toDate(date1).diff(date2, unit, exact)

const getDay = (dateStr) => toDate(dateStr).format('ddd')

const getMonth = (dateStr) => toDate(dateStr).format('MMM')

const getYear = (dateStr) => toDate(dateStr).format('YYYY')

const toUTCFormat = (dateStr) => dayJs(dateStr).utc().format()

const getCurrentYear = () => toDate().format('YYYY')

const getCurrentMonth = () => toDate().format('MMM')

export {
  toDate,
  toISOString,
  formatDate,
  formatTime,
  getDifference,
  getDay,
  getMonth,
  getYear,
  toUTCFormat,
  getCurrentYear,
  getCurrentMonth,
}
