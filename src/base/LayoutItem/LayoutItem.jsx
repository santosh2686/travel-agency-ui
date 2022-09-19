import React, { memo } from 'react'
import {
  oneOfType, string, element, arrayOf,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const LayoutItem = ({
  children, align, content, full, classes,
}) => {
  const eltClass = ClassNames({
    [`self-${align}`]: align,
    [`content-${content}`]: content,
    'flex-1': full,
    [classes]: classes,
  })
  return (
    <div styleName={eltClass}>
      {children}
    </div>
  )
}

LayoutItem.propTypes = {}

LayoutItem.defaultProps = {}

export default memo(MapCssModules(LayoutItem))
