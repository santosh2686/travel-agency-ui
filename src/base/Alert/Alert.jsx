import React, { memo } from 'react'
import { oneOf, string } from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'

import Icon from '../Icon/Icon.jsx'
import Text from '../Text/Text.jsx'

const Alert = ({
  message,
  type,
  classes,
}) => {
  const eltClass = ClassNames('flex align-center pad-15 color-white bor-radius-2', {
    'bg-danger': type === 'error',
    'bg-success': type === 'success',
    'bg-info': type === 'info',
    'bg-warning': type === 'warning',
    [classes]: classes,
  })
  const iconMap = {
    error: 'exclamation-triangle',
    success: 'check-circle',
    info: 'info-circle',
    warning: 'exclamation-circle',
  }

  return (
    <div styleName={eltClass}>
      <Icon name={iconMap[type]} size="22" color="white" classes="mar-r-10" />
      <Text weight="bold">{message}</Text>
    </div>
  )
}

Alert.propTypes = {
  message: string.isRequired,
  type: oneOf(['success', 'error', 'info', 'warning']).isRequired,
  classes: string,
}

Alert.defaultProps = {
  classes: '',
}

export default memo(MapCssModules(Alert))
