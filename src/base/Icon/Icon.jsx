import React, { memo } from 'react'
import { string, oneOf, object } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const Icon = ({
  tag: Tag, name, classes, color, size, spin, attributes, iconScale,
}) => {
  const eltClass = ClassNames('vertical-middle  ', {
    [`color-${color}`]: color,
    [`font-${size}`]: size,
    [classes]: classes,
  })
  const iconClass = ClassNames('fa', {
    [`fa-${name}`]: name,
    'fa-spin': spin,
    [`fa-${iconScale}`]: iconScale,
  })
  return (
    <Tag styleName={eltClass} {...attributes}>
      <i className={iconClass} />
    </Tag>
  )
}

Icon.propTypes = {
  name: string.isRequired,
  classes: string,
  tag: string,
  color: string,
  size: oneOf(['8', '14', '16', '22', '30']),
  attributes: object,
  iconScale: string,
}

Icon.defaultProps = {
  classes: '',
  tag: 'span',
  color: 'gray',
  size: '14',
  attributes: {},
  iconScale: '1x'
}

export default memo(MapCssModules(Icon))
