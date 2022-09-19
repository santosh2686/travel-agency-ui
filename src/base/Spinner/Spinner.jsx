import React, { memo } from 'react'
import { string } from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'

const Spinner = ({
  size,
  type,
  classes,
}) => {
  const spinnerClasses = ClassNames('spinner center circle bor-gray-light', {
    [size]: size,
    [`bor-r-${type}`]: type,
    [classes]: classes,
  })

  return (
    <div styleName={spinnerClasses} />
  )
}

Spinner.propTypes = {
  size: string,
  type: string,
  classes: string,
}

Spinner.defaultProps = {
  size: 'medium',
  type: 'primary',
  classes: '',
}

export default memo(MapCssModules(Spinner))
