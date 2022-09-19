import React, { memo } from 'react'

import { number } from 'prop-types'

const Currency = ({
  data,
}) => (
  <span>
    <i className="fa fa-inr color-gray vertical-middle" />
    &nbsp;
    {Number(data).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}
  </span>
)

Currency.propTypes = {
  data: number.isRequired,
}

export default memo(Currency)
