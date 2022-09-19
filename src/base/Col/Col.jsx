import React, { memo } from 'react'
import {
  any, string, shape, object,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const Col = ({
  tag: Tag, children, col, offset, classes, attributes,
}) => {
  const {
    lg, md, sm, xs,
  } = col
  const {
    lg: offsetLg, md: offsetMd, sm: offsetSm, xs: offsetXs,
  } = offset

  const eltClass = ClassNames('pad-l-15', {
    [`col-xs-${xs}`]: xs,
    [`col-sm-${sm}`]: sm,
    [`col-md-${md}`]: md,
    [`col-lg-${lg}`]: lg,

    [`offset-xs-${offsetXs}`]: offsetXs,
    [`offset-md-${offsetMd}`]: offsetMd,
    [`offset-sm-${offsetSm}`]: offsetSm,
    [`offset-lg-${offsetLg}`]: offsetLg,
    [classes]: classes,
  })
  return (
    <Tag
      styleName={eltClass}
      {...attributes}
    >
      {children}
    </Tag>
  )
}

Col.propTypes = {
  col: object,
  offset: object,
  classes: string,
  tag: string,
  attributes: shape({}),
}

Col.defaultProps = {
  col: {},
  offset: {},
  classes: '',
  tag: 'div',
  attributes: {},
}

export default memo(MapCssModules(Col))
