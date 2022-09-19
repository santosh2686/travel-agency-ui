import React, { memo } from 'react'
import {
  string, bool, object, oneOfType,
} from 'prop-types'
import ClassNames from 'classnames'
import {
  MapCssModules, formatMarginPaddingClass, formatFlexClasses, formatBreakPointClasses,
} from '@utils'

const Layout = ({
  tag: Tag,
  display,
  flex,
  mar,
  pad,
  border,
  hidden,
  position,
  color,
  bgColor,
  children,
  attributes,
  classes,
}) => {
  const eltClass = ClassNames({
    [formatFlexClasses(flex)]: flex,
    [formatMarginPaddingClass(mar, 'mar')]: mar,
    [formatMarginPaddingClass(pad, 'pad')]: pad,
    [formatBreakPointClasses(border, 'bor')]: border,
    [`color-${color}`]: color,
    [`bg-${bgColor}`]: bgColor,
    [`show-${display}`]: display,
    invisible: hidden,
    [position]: position,
    [classes]: classes,
  })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Tag {...attributes} styleName={eltClass}>
      {children}
    </Tag>
  )
}

Layout.propTypes = {
  tag: string,
  display: string,
  flex: oneOfType([bool, object]),
}

Layout.defaultProps = {
  tag: 'div',
  flex: false,
}

export default memo(MapCssModules(Layout))
