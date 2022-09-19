import React, { memo } from 'react'
import {
  oneOfType, string, element, arrayOf, shape, node,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const Row = ({
  tag: Tag, children, classes, attributes,
}) => {
  const eltClass = ClassNames('row', {
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

Row.propTypes = {
  children: oneOfType([
    element,
    arrayOf(element),
    node,
    arrayOf(node),
  ]).isRequired,
  classes: string,
  tag: string,
  attributes: shape({}),
}

Row.defaultProps = {
  classes: '',
  tag: 'div',
  attributes: {},
}

export default memo(MapCssModules(Row))
