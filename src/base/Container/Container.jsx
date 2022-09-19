import React, { memo } from 'react'
import { string, any } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const Container = ({ children, classes }) => {
  const eltClass = ClassNames('container center', {
    [classes]: classes,
  })
  return (
    <div styleName={eltClass}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: any.isRequired,
  classes: string,
}

Container.defaultProps = {
  classes: '',
}

export default memo(MapCssModules(Container))
