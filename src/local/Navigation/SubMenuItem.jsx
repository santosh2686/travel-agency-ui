/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import {
  bool, func, number, shape, string,
} from 'prop-types'
import ClassNames from 'classnames'
import { MapCssModules } from '@utils'
import { Icon } from '@base'

class SubMenuItem extends PureComponent {
  isActive = (path) => {
    const { pathname } = this.props
    return pathname.split('/')[1] === path
  };

  handleClick = () => {
    const { clickHandler, index } = this.props
    clickHandler(index)
  };

  render() {
    const {
      item: {
        active, icon, items = [], label,
      },
      expand,
    } = this.props
    const isActive = this.isActive(active)
    const eltClass = ClassNames('flex flex-space-between align-center hover-bg-theme-light pad-tb-15 pad-lr-10 cur-pointer', {
      'color-white': !isActive,
      'color-success': isActive,
    })
    const subNavClass = ClassNames('overflow-hidden sub-navigation', {
      open: expand,
    })

    return (
      <li styleName="bor-b-theme-light">
        <div styleName={eltClass} onClick={this.handleClick}>
          <div styleName="flex align-center">
            <Icon name={icon} color={isActive ? 'success' : 'white'} />
            <span styleName="font-bold no-wrap mar-l-10">{label}</span>
          </div>
          <Icon name={expand ? 'caret-up' : 'caret-down'} color="white" />
        </div>
        <ul styleName={subNavClass}>
          {items.map((listItem) => {
            const { label, route } = listItem
            return (
              <li key={label}>
                <NavLink
                  to={route}
                  styleName="show-block font-bold color-white no-wrap text-decoration-none
                  color-gray hover-bg-theme-light pad-10 pad-r-0 pad-l-30 capitalize"
                  activeClassName="bg-theme-light"
                >
                  {label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </li>
    )
  }
}

SubMenuItem.propTypes = {
  pathname: string.isRequired,
  clickHandler: func,
  index: number,
  expand: bool,
  item: shape({
    active: string,
    label: string,
  }).isRequired,
}

SubMenuItem.defaultProps = {
  clickHandler: () => {},
  index: 0,
  expand: false,
}

export default MapCssModules(SubMenuItem)
