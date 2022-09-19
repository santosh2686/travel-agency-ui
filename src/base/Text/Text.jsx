import React, { memo } from 'react'
import {
  bool, string, object, oneOfType,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules, formatBreakPointClasses } from '@utils'

const Text = ({
  tag: Tag,
  children,
  size,
  weight,
  transform,
  color,
  bgColor,
  align,
  italic,
  decoration,
  attributes,
  classes,
}) => {
  const eltClass = ClassNames({
    [`font-${size}`]: size,
    [`font-${weight}`]: weight,
    [transform]: transform,
    [`color-${color}`]: color,
    [`bg-${bgColor}`]: bgColor,
    [formatBreakPointClasses(align, 'text')]: align,
    'font-italic': italic,
    [`text-decoration-${decoration}`]: decoration,
    [classes]: classes,
  })
  return (
    <Tag styleName={eltClass} {...attributes}>
      { children }
    </Tag>
  )
}

Text.propTypes = {
  tag: string,
  size: string,
  weight: string,
  transform: string,
  color: string,
  bgColor: string,
  align: oneOfType([string, object]),
  italic: bool,
  decoration: string,
  classes: string,
}

Text.defaultProps = {
  tag: 'span',
  size: '',
  weight: '',
  transform: '',
  color: '',
  bgColor: '',
  align: '',
  italic: false,
  decoration: '',
  classes: '',
}

export default memo(MapCssModules(Text))
