import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import {
  bool, func, node, string,
} from 'prop-types'
import ClassNames from 'classnames'

import { MapCssModules } from '@utils'

import Icon from '../Icon/Icon'

const Button = ({
  children,
  type,
  category,
  classes,
  size,
  disabled,
  block,
  rounded,
  outline,
  asAnchor,
  asLink,
  loading,
  href,
  clickHandler,
}) => {
  const eltClass = ClassNames('btn no-wrap no-select', {
    [`bg-${category} hover-bg-${category}-light`]: category && !outline,
    'color-white': (category !== 'default' && !outline),
    'color-black': (category === 'default' && !outline),
    [`btn-${size}`]: size,
    'show-block width-100 mar-l-0 mar-t-5': block,
    'show-inline-block': !block,
    disabled,
    'btn-rounded': rounded,
    'bor-none': !outline,
    [`bg-white color-${category} bor-${category}`]: !loading && outline,
    'text-center text-decoration-none': asAnchor || asLink,
    'relative overflow-hidden pointer-events-none': loading,
    [`color-white bor-${category}`]: loading && outline,
    [classes]: classes,
  })

  const loadingClass = ClassNames('absolute flex align-center flex-center btn-loading', {
    [`bg-${category} hover-bg-${category}-light`]: !outline,
    [`color-${category}`]: outline,
  })

  if (asLink) {
    return (<NavLink to={href} styleName={eltClass}>{children}</NavLink>)
  }

  if (asAnchor) {
    return (<a href={href} styleName={eltClass}>{children}</a>)
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      styleName={eltClass}
      disabled={disabled}
      onClick={clickHandler}
    >
      {loading && <Icon name="spinner" color="white" size="16" spin classes={loadingClass} />}
      {children}
    </button>
  )
}

Button.propTypes = {
  children: node.isRequired,
  type: string,
  category: string,
  size: string,
  disabled: bool,
  block: bool,
  rounded: bool,
  outline: bool,
  asAnchor: bool,
  asLink: bool,
  loading: bool,
  classes: string,
  href: string,
  clickHandler: func,
}

Button.defaultProps = {
  type: 'button',
  category: 'primary',
  size: '',
  disabled: false,
  block: false,
  rounded: false,
  outline: false,
  asAnchor: false,
  asLink: false,
  loading: false,
  classes: null,
  href: '/',
  clickHandler: () => {},
}

export default memo(MapCssModules(Button))
