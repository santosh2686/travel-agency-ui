import React, { memo } from 'react'
import { string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const Image = ({ name, src, classes }) => {
  const eltClass = ClassNames({
    [classes]: classes,
  })
  return (
    <img
      src={src}
      styleName={eltClass}
      alt={name}
    />
  )
}

Image.propTypes = {
  name: string,
  src: string.isRequired,
  classes: string,
}

Image.defaultProps = {
  name: '',
  classes: '',
}

export default memo(MapCssModules(Image))
