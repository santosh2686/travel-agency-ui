import React, { memo } from 'react'
import {
  bool, func, node, string, object,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import Icon from '../Icon/Icon.jsx'

const Chip = ({
  tag: Tag, children, color, classes, attributes, closable, removeHandler,
}) => {
  const eltClass = ClassNames('show-inline-block pad-tb-5 pad-lr-10 bor-gray-light bg-gray-lighter bor-radius-5 text-center chip', {
    [`color-${color}`]: color,
    [classes]: classes,
  })

  return (
    <Tag styleName={eltClass} {...attributes}>
      {children}
      {closable && (
        <Icon
          name="times-circle"
          classes="mar-l-10 cur-pointer hover-color-primary"
          attributes={{
            onClick: removeHandler,
          }}
        />
      )}
    </Tag>
  )
}

Chip.propTypes = {
  tag: string,
  children: node.isRequired,
  color: string,
  classes: string,
  attributes: object,
  closable: bool,
  removeHandler: func,
}

Chip.defaultProps = {
  tag: 'span',
  color: 'gray-dark',
  classes: '',
  attributes: {},
  closable: true,
  removeHandler: () => {},
}

export default memo(MapCssModules(Chip))
