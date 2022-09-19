import React, { memo } from 'react'
import { number, string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const Progress = ({ data, classes }) => {
  const eltClass = ClassNames('flex bg-gray-light bor-radius-4 overflow-hidden progress-bar', {
    [classes]: classes,
  })
  return (
    <div styleName={eltClass}>
      <div styleName="bg-primary" style={{ width: `${data}%` }} />
    </div>
  )
}

Progress.propTypes = {
  data: number.isRequired,
  classes: string,
}

Progress.defaultProps = {
  classes: '',
}

export default memo(MapCssModules(Progress))
