import React from 'react'
import { string } from 'prop-types'

const DateFormat = ({
  data,
  locale,
}) => {
  const formattedDate = new Date(data).toLocaleDateString(locale,
    { month: 'short', year: 'numeric', day: 'numeric' })
  return (
    <span>
      {formattedDate.split(' ').join('-')}
    </span>
  )
}

DateFormat.propTypes = {
  data: string.isRequired,
  locale: string,
}

DateFormat.defaultProps = {
  locale: 'en-IN'
}

export default DateFormat
