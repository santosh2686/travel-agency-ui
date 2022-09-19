import React, { memo } from 'react'
import { string } from 'prop-types'
import ClassNames from 'classnames'
import { computeValue, MapCssModules } from '@utils'

const TableCell = ({ item, column, expand }) => {
  const { custom, map, classes } = column
  const eltClass = ClassNames('pad-tb-10 pad-lr-15 bor-b-gray-light', {
    [classes]: classes,
    expand,
  })
  if (custom) {
    return (
      <td
        styleName={eltClass}
      >
        {custom(item)}
      </td>
    )
  }

  return (
    <td
      styleName={eltClass}
    >
      {computeValue(item, map)}
    </td>
  )
}

export default memo(MapCssModules(TableCell))
