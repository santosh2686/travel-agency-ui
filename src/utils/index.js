import CSSModules from 'react-css-modules'
import ClassNames from 'classnames'
import Style from '../app.scss'

import { getCurrentYear } from './date'

const MapCssModules = (Component) => CSSModules(Component, Style, {
  allowMultiple: true,
  handleNotFoundStyleName: 'ignore',
})

const isEmpty = (value) => value === undefined || value === null || value === ''

const formatMarginPaddingClass = (input, cssProp) => {
  if (!input) {
    return ''
  }
  const lookUp = {
    lg: true, md: true, sm: true, xs: true,
  }
  const parent = 'xs'
  let result = []

  const calculateClass = (inputObj, prefix) => {
    if (typeof inputObj !== 'object') {
      return (prefix === 'xs') ? [`${cssProp}-${inputObj}`] : [`${cssProp}-${prefix}-${inputObj}`]
    }
    // eslint-disable-next-line no-use-before-define
    return compute(inputObj, prefix)
  }

  const compute = (obj, pr) => Object.keys(obj).reduce((acc, next) => {
    if (lookUp[next]) {
      return acc.concat(calculateClass(obj[next], next))
    }
    const formClass = (pr === 'xs') ? `${cssProp}-${next}-${obj[next]}` : `${cssProp}-${pr}-${next}-${obj[next]}`
    acc.push(formClass)
    return acc
  }, [])

  result = result.concat(calculateClass(input, parent))
  return result.join(' ')
}

const formatBreakPointClasses = (input, prefix) => {
  if (!input) {
    return ''
  }
  if (typeof input !== 'object') {
    return `${prefix}-${input}`
  }

  return Object.keys(input).reduce((acc, next) => {
    if (next === 'xs') {
      return `${acc} ${prefix}-${input[next]}`
    }
    return `${acc} ${prefix}-${next}-${input[next]}`
  }, '')
}

const formatFlexClasses = (input) => {
  if (!input) {
    return ''
  }
  const {
    direction, reverse, align, justify, wrap, wrapReverse,
  } = input
  return ClassNames('flex', {
    'flex-wrap': wrap && !wrapReverse,
    'flex-wrap-reverse': wrap && wrapReverse,
    [`flex-${direction}`]: direction && !reverse,
    [`flex-${direction}-reverse`]: direction && reverse,
    [`align-${align}`]: align,
    [`flex-${justify}`]: justify,
  })
}

const computeValue = (obj, map) => !isEmpty(map) && map.split('.').reduce((a, b) => ((a && !isEmpty(a[b])) ? a[b] : ''), obj)

const validatePayload = (schema, model, params = {}) => {
  const errorMap = {}
  let count = 0
  schema.forEach(({
    path, custom, pattern, message, emptyCheck,
  }) => {
    const value = computeValue(model, path)
    const isInvalid = custom ? !custom(model, value, params) : (emptyCheck || value) && !pattern.test(value)
    if (!errorMap[path] && isInvalid) {
      count += 1
      errorMap[path] = message
    }
  })

  return {
    isValid: count === 0,
    errorMap,
  }
}

const numberToTime = (number) => {
  if (number < 0) {
    return '0:0'
  }
  const num = number * 60
  const hours = Math.floor(num / 60)
  const minutes = num % 60
  return `${hours}:${minutes}`
}

const getMonthList = () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const getMonthListMap = () => [
  { key: 'Jan', value: 'January' },
  { key: 'Feb', value: 'February' },
  { key: 'Mar', value: 'March' },
  { key: 'Apr', value: 'April' },
  { key: 'May', value: 'May' },
  { key: 'Jun', value: 'June' },
  { key: 'Jul', value: 'July' },
  { key: 'Aug', value: 'August' },
  { key: 'Sep', value: 'September' },
  { key: 'Oct', value: 'October' },
  { key: 'Nov', value: 'November' },
  { key: 'Dec', value: 'December' },
]
const getYearList = () => {
  const currentYear = Number(getCurrentYear())
  const userYear = 2015
  const yearList = []
  // eslint-disable-next-line no-plusplus
  for (let i = userYear; i < currentYear + 1; i++) {
    yearList.push({ key: i, value: i })
  }
  return yearList
}

export {
  MapCssModules,
  formatMarginPaddingClass,
  formatBreakPointClasses,
  formatFlexClasses,
  computeValue,
  validatePayload,
  numberToTime,
  getMonthList,
  getMonthListMap,
  getYearList,
}
