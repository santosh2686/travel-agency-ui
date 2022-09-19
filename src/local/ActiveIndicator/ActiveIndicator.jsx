import React from 'react'
import { bool, string } from 'prop-types'
import ClassNames from 'classnames'

import { Layout } from '@base'

const ActiveIndicator = ({ isActive, classes }) => {
  const eltClass = ClassNames('active-indicator', {
    [classes]: !!classes,
    active: isActive,
    disabled: !isActive,
  })

  return (
    <Layout
      flex={{ align: 'center' }}
      pad={{ l: 15 }}
      position="relative"
      classes={eltClass}
    >
      {isActive ? 'Active' : 'Disabled'}
    </Layout>
  )
}

ActiveIndicator.propTypes = {
  isActive: bool,
  classes: string,
}

ActiveIndicator.defaultProps = {
  isActive: false,
  classes: '',
}

export default ActiveIndicator
