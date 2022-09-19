import React, { memo } from 'react'
import { string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules, formatBreakPointClasses } from '@utils'

const Tooltip = ({
  tag: Tag, content, children, position, classes,
}) => {
  const eltClass = ClassNames('relative show-inline-block tooltip', {
    [formatBreakPointClasses(position, 'pos')]: position,
    [classes]: classes,
  })

  return (
    <Tag data-tooltip={content} styleName={eltClass}>
      {children}
    </Tag>
  )
}

Tooltip.propTypes = {
  tag: string,
  content: string,
  classes: string,
}

Tooltip.defaultProps = {
  tag: 'span',
  position: 'top',
  classes: '',
}

export default memo(MapCssModules(Tooltip))
