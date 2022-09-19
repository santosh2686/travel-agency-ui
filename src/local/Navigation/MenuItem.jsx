import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { shape, string } from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'

import { Icon } from '@base'

const MenuItem = ({ item, pathname }) => {
  const { route, icon, label } = item
  const isActive = route === pathname
  const eltClass = ClassNames('flex align-center hover-bg-theme-light text-decoration-none pad-tb-15 pad-lr-10', {
    'color-white': !isActive,
    'color-success': isActive,
  })
  return (
    <li styleName="bor-b-theme-light">
      <NavLink
        to={route}
        styleName={eltClass}
      >
        <Icon name={icon} color={isActive ? 'success' : 'white'} />
        <span styleName="font-bold no-wrap mar-l-10">{label}</span>
      </NavLink>
    </li>
  )
}

MenuItem.propTypes = {
  item: shape({
    route: string,
    icon: string,
    label: string,
  }).isRequired,
  pathname: string.isRequired,
}

export default memo(MapCssModules(MenuItem))
