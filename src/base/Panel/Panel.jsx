import React, { memo } from 'react'
import { node, string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

const Panel = ({ title, children, classes }) => {
  const eltClass = ClassNames('pad-t-15 pad-lr-15 bg-white', {
    [classes]: classes,
  })
  return (
    <div styleName={eltClass}>
      <div styleName="bor-b-gray-light pad-b-5 mar-b-15 font-16">
        {title}
      </div>
      {children}
    </div>
  )
}

Panel.propTypes = {
  title: string,
  classes: string,
  children: node.isRequired,
}

Panel.defaultProps = {
  title: '',
  classes: '',
}

export default memo(MapCssModules(Panel))
