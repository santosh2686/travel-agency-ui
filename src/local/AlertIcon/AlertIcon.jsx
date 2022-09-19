import React, { memo } from 'react'
import { string } from 'prop-types'
import ClassNames from 'classnames'

import { Layout } from '@base'

const AlertIcon = ({ type }) => {
  const eltClass = ClassNames('show-block center circle relative bor-width-2 alert-icon', {
    'bor-success icon-success': type === 'success',
    'bor-danger icon-error': type === 'error',
    'bor-warning icon-warning': type === 'warning',
  })
  return (
    <Layout classes={eltClass} />
  )
}

AlertIcon.propTypes = {
  type: string,
}

AlertIcon.defaultProps = {
  type: 'warning',
}

export default memo(AlertIcon)
